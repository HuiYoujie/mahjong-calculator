import gbMahjong from '../gb-mahjong-js/browser.js';
import { TILES } from './tiles.js';

// 页面使用的牌 ID 与 gb-mahjong-js 的常量之间的适配层。
// 页面只依赖 MahjongAnalyzer 的 setHand/analyze/getWaitingTiles，因而 UI 无需改动。
const {
    Hand,
    Pack,
    Tile,
    WinContext,
    calcTing,
    countFan,
    constants
} = gbMahjong;

const HONOR_TILE_IDS = {
    east: constants.TILE_E,
    south: constants.TILE_S,
    west: constants.TILE_W,
    north: constants.TILE_N,
    zhong: constants.TILE_C,
    fa: constants.TILE_F,
    bai: constants.TILE_P
};

const WIND_TILE_IDS = {
    east: constants.TILE_E,
    south: constants.TILE_S,
    west: constants.TILE_W,
    north: constants.TILE_N
};

const TILE_ID_BY_LIBRARY_ID = Object.keys(TILES).reduce((result, tileId) => {
    const libraryId = toLibraryTileId(tileId);
    if (libraryId !== null) result[libraryId] = tileId;
    return result;
}, {});

function toLibraryTileId(tileId) {
    if (HONOR_TILE_IDS[tileId] !== undefined) return HONOR_TILE_IDS[tileId];
    if (!/^[wtb][1-9]$/.test(tileId || '')) return null;

    const rank = Number(tileId.charAt(1));
    const suitStart = {
        w: constants.TILE_1m,
        t: constants.TILE_1s,
        b: constants.TILE_1p
    }[tileId.charAt(0)];
    return suitStart + rank - 1;
}

function toTile(tileId) {
    const libraryId = toLibraryTileId(tileId);
    if (libraryId === null) throw new Error(`未知麻将牌：${tileId}`);
    return new Tile(libraryId);
}

function middleTileOf(meld) {
    if (meld.type === 'chi') {
        const ids = meld.tiles.map(toLibraryTileId).sort((a, b) => a - b);
        return new Tile(ids[1]);
    }
    return toTile(meld.tiles[0]);
}

function toPack(meld) {
    const type = {
        chi: constants.PACK_TYPE_SHUNZI,
        pong: constants.PACK_TYPE_KEZI,
        minggang: constants.PACK_TYPE_GANG,
        angang: constants.PACK_TYPE_GANG
    }[meld.type];

    if (!type || !Array.isArray(meld.tiles) || meld.tiles.length === 0) {
        throw new Error('无效的副露数据');
    }

    // offer=0 表示暗杠；其他副露只需标记为来自任意一家即可参与计番。
    const offer = meld.type === 'angang' ? 0 : 1;
    return new Pack(type, middleTileOf(meld), 0, offer);
}

function makeFlowers(count) {
    const safeCount = Math.max(0, Math.min(8, Number(count) || 0));
    return Array.from({ length: safeCount }, (_, index) =>
        new Tile(constants.TILE_MEI + index)
    );
}

function groupFans(fans) {
    const grouped = new Map();

    fans.forEach(fan => {
        const name = constants.FAN_NAME[fan.fanId] || `番种 ${fan.fanId}`;
        const key = `${fan.fanId}:${fan.score}`;
        const current = grouped.get(key);
        if (current) {
            current.count += 1;
            current.score += fan.score;
        } else {
            grouped.set(key, { name, score: fan.score, count: 1 });
        }
    });

    return Array.from(grouped.values()).map(fan => ({
        name: fan.count > 1 ? `${fan.name}×${fan.count}` : fan.name,
        score: fan.score
    }));
}

class MahjongAnalyzer {
    constructor() {
        this.reset();
    }

    reset() {
        this.hand = [];
        this.melds = [];
        this.winTile = null;
        this.conditions = {
            isSelfDrawn: true,
            prevalentWind: 'east',
            seatWind: 'east',
            flowerCount: 0,
            isHaidilao: false,
            isMiaoshou: false,
            isGangshang: false,
            isQianggang: false,
            isJuezhang: false
        };
    }

    setHand(hand, melds, winTile, conditions = {}) {
        this.hand = [...(hand || [])];
        this.melds = [...(melds || [])];
        this.winTile = winTile || null;
        this.conditions = { ...this.conditions, ...conditions };
    }

    buildHand(tiles, winningTile = null) {
        const isSelfDrawn = Boolean(this.conditions.isSelfDrawn);
        const hasOwnKong = this.melds.some(meld =>
            meld.type === 'minggang' || meld.type === 'angang'
        );
        const context = new WinContext({
            quanfeng: WIND_TILE_IDS[this.conditions.prevalentWind] ?? constants.TILE_E,
            menfeng: WIND_TILE_IDS[this.conditions.seatWind] ?? constants.TILE_E,
            zimo: isSelfDrawn,
            juezhang: Boolean(this.conditions.isJuezhang),
            haidi: isSelfDrawn
                ? Boolean(this.conditions.isMiaoshou)
                : Boolean(this.conditions.isHaidilao),
            gang: isSelfDrawn
                ? Boolean(this.conditions.isGangshang && hasOwnKong)
                : Boolean(this.conditions.isQianggang)
        });

        return new Hand({
            tiles: tiles.map(toTile),
            packs: this.melds.map(toPack),
            winningTile: winningTile ? toTile(winningTile) : null,
            flowers: makeFlowers(this.conditions.flowerCount),
            context
        });
    }

    analyze() {
        try {
            const result = countFan(this.buildHand(this.hand, this.winTile));
            if (!result.isHu) {
                return { valid: false, fans: [], totalScore: 0, message: '诈和' };
            }
            return {
                valid: true,
                fans: groupFans(result.fans),
                totalScore: result.totalFan
            };
        } catch (error) {
            console.error('gb-mahjong-js 计番失败', error);
            return { valid: false, fans: [], totalScore: 0, message: '牌型数据无效' };
        }
    }

    getWaitingTiles() {
        try {
            const baseHand = this.buildHand(this.hand);
            return calcTing(baseHand).map(tile => {
                const tileId = TILE_ID_BY_LIBRARY_ID[tile.GetId()];
                const scoringHand = [...this.hand, tileId];
                const result = countFan(this.buildHand(scoringHand, tileId));
                return {
                    tileId,
                    tile: TILES[tileId],
                    fans: groupFans(result.fans),
                    totalScore: result.totalFan
                };
            });
        } catch (error) {
            console.error('gb-mahjong-js 听牌计算失败', error);
            return [];
        }
    }
}

export { MahjongAnalyzer };
