import { TILES, TILE_TYPES, GREEN_TILES, REVERSIBLE_TILES, isNumberTile, isHonorTile, isTerminalOrHonor, isTerminal } from './tiles.js';

// 国标麻将番种分析器

// 番种"不计"规则表 - 当计了某番种时，不计哪些番种
const EXCLUSION_RULES = {
    '大四喜': ['圈风刻', '门风刻', '三风刻', '碰碰和', '幺九刻'],
    '大三元': ['箭刻', '双箭刻'],
    '绿一色': ['混一色'],
    '九莲宝灯': ['清一色', '门前清', '幺九刻'],
    '连七对': ['七对', '清一色', '单钓将', '不求人', '门前清', '平和', '一般高', '连六'],
    '十三幺': ['五门齐', '单钓将', '不求人', '门前清'],
    '四杠': ['碰碰和', '三杠', '双明杠', '明暗杠', '暗杠', '明杠'], // ？
    '清幺九': ['混幺九', '碰碰和', '双同刻', '无字', '全带幺', '幺九刻'],
    '小四喜': ['三风刻', '幺九刻'],
    '小三元': ['箭刻', '双箭刻'],
    '字一色': ['碰碰和', '全带幺', '幺九刻'],
    '四暗刻': ['三暗刻', '双暗刻', '碰碰和', '门前清'],
    '一色双龙会': ['七对', '清一色', '平和', '老少副', '一般高', '无字'],
    '一色四同顺': ['一色三节高', '一般高', '四归一', '一色三同顺'],
    '一色四节高': ['一色三同顺', '碰碰和', '一色三节高'],
    '一色四步高': ['连六', '老少副'],
    '三杠': ['明暗杠'],
    '混幺九': ['碰碰和', '全带幺', '幺九刻'],
    '七对': ['不求人', '门前清', '单钓将'],
    '七星不靠': ['全不靠', '五门齐', '不求人', '门前清', '单钓将'],
    '全双刻': ['碰碰和', '断幺'],
    '清一色': ['无字'],
    '一色三同顺': ['一色三节高', '一般高'],
    '一色三节高': ['一色三同顺'],
    '全大': ['大于五', '无字'],
    '全中': ['断幺', '无字'],
    '全小': ['小于五', '无字'],
    '清龙': ['连六', '老少副'],
    '三色双龙会': ['平和', '喜相逢', '老少副', '无字'],
    '全带五': ['断幺'],
    '三同刻': ['双同刻'],
    '三暗刻': ['双暗刻'],
    '全不靠': ['五门齐', '不求人', '门前清', '单钓将'],
    '大于五': ['无字'],
    '小于五': ['无字'],
    '推不倒': ['缺一门'],
    '妙手回春': ['自摸'],
    '杠上开花': ['自摸'],
    '抢杠和': ['和绝张'],
    '五门齐': ['幺九刻'],
    '全求人': ['单钓将'],
    '双箭刻': ['箭刻'],
    '双暗杠': ['暗杠', '双暗刻'],
    '明暗杠': ['明杠', '暗杠'],
    '不求人': ['门前清', '自摸'],
    '圈风刻': ['幺九刻'],
    '门风刻': ['幺九刻'],
    '平和': ['无字'],
    '断幺': ['无字'],
};

class MahjongAnalyzer {
    constructor() {
        this.reset();
    }

    reset() {
        this.hand = [];           // 手牌
        this.melds = [];          // 副露
        this.winTile = null;      // 和牌
        this.conditions = {
            isSelfDrawn: true,    // 自摸
            prevalentWind: 'east', // 圈风
            seatWind: 'east',     // 门风
            flowerCount: 0,       // 花牌数
            isLastTile: false,    // 海底/河底
            isKongDraw: false,    // 杠上开花/抢杠和
            isJuezhang: false     // 绝张
        };
    }

    // 设置手牌数据
    setHand(hand, melds, winTile, conditions) {
        this.hand = [...hand];
        this.melds = [...melds];
        this.winTile = winTile;
        this.conditions = { ...this.conditions, ...conditions };
    }

    // 分析番种并计算总分
    analyze() {
        const allTiles = this.getAllTiles();
        const decompositions = this.decomposeHand();

        if (decompositions.length === 0) {
            const specialResult = this.checkSpecialHands(allTiles);
            if (specialResult) {
                return specialResult;
            }
            return { valid: false, fans: [], totalScore: 0, message: '诈和' };
        }

        let bestResult = { valid: true, fans: [], totalScore: 0 };

        for (const decomp of decompositions) {
            const fans = this.detectFans(decomp, allTiles);
            let totalScore = fans.reduce((sum, f) => sum + f.score, 0);
            if (totalScore === 0) {
                fans.push({ name: '无番和', score: 8 });
                totalScore = 8;
            };

            if (totalScore > bestResult.totalScore) {
                bestResult = { valid: true, fans, totalScore };
            }
        }

        return bestResult;
    }

    // 获取所有牌（手牌+副露）
    getAllTiles() {
        const tiles = [...this.hand];
        for (const meld of this.melds) {
            tiles.push(...meld.tiles);
        }
        return tiles;
    }

    // 统计牌的数量
    countTiles(tiles) {
        const count = {};
        for (const tile of tiles) {
            count[tile] = (count[tile] || 0) + 1;
        }
        return count;
    }

    // 拆解手牌为面子+将
    decomposeHand() {
        const handTiles = [...this.hand];
        const tileCount = this.countTiles(handTiles);
        const decompositions = [];

        this._decompose(tileCount, [], null, decompositions);

        return decompositions;
    }

    _decompose(tileCount, sets, pair, results) {
        const remaining = Object.values(tileCount).reduce((a, b) => a + b, 0);

        if (remaining === 0 && pair) {
            results.push({ sets: [...sets], pair });
            return;
        }

        const sortedTiles = Object.keys(tileCount)
            .filter(t => tileCount[t] > 0)
            .sort((a, b) => {
                const typeOrder = { wan: 0, tiao: 1, bing: 2, wind: 3, dragon: 4 };
                const tileA = TILES[a];
                const tileB = TILES[b];
                if (!tileA || !tileB) return 0;
                if (tileA.type !== tileB.type) {
                    return typeOrder[tileA.type] - typeOrder[tileB.type];
                }
                if (typeof tileA.value === 'number' && typeof tileB.value === 'number') {
                    return tileA.value - tileB.value;
                }
                return 0;
            });

        if (sortedTiles.length === 0) return;

        const firstTile = sortedTiles[0];
        const tile = TILES[firstTile];

        if (!pair && tileCount[firstTile] >= 2) {
            const newCount = { ...tileCount };
            newCount[firstTile] -= 2;
            this._decompose(newCount, sets, firstTile, results);
        }

        if (tileCount[firstTile] >= 3) {
            const newCount = { ...tileCount };
            newCount[firstTile] -= 3;
            this._decompose(newCount, [...sets, { type: 'pong', tiles: [firstTile, firstTile, firstTile] }], pair, results);
        }

        if (tile && isNumberTile(firstTile) && tile.value <= 7) {
            const next1 = firstTile.charAt(0) + (tile.value + 1);
            const next2 = firstTile.charAt(0) + (tile.value + 2);

            if (tileCount[next1] > 0 && tileCount[next2] > 0) {
                const newCount = { ...tileCount };
                newCount[firstTile] -= 1;
                newCount[next1] -= 1;
                newCount[next2] -= 1;
                this._decompose(newCount, [...sets, { type: 'chi', tiles: [firstTile, next1, next2] }], pair, results);
            }
        }
    }

    // 检查特殊牌型（七对、十三幺、全不靠等）
    checkSpecialHands(allTiles) {
        const tileCount = this.countTiles(allTiles);
        const uniqueTiles = Object.keys(tileCount);

        // 检查十三幺
        if (this.melds.length === 0 && this.checkShiSanYao(tileCount)) {
            const fans = [{ name: '十三幺', score: 88 }];
            this.addConditionFans(fans);
            const filteredFans = this.applyExclusionRules(fans);
            return { valid: true, fans: filteredFans, totalScore: filteredFans.reduce((s, f) => s + f.score, 0) };
        }

        // 检查七星不靠
        if (this.melds.length === 0 && this.checkQiXingBuKao(tileCount)) {
            const fans = [{ name: '七星不靠', score: 24 }];
            this.addConditionFans(fans);
            const filteredFans = this.applyExclusionRules(fans);
            return { valid: true, fans: filteredFans, totalScore: filteredFans.reduce((s, f) => s + f.score, 0) };
        }

        // 检查全不靠
        if (this.melds.length === 0 && this.checkQuanBuKao(tileCount)) {
            const fans = [{ name: '全不靠', score: 12 }];
            this.addConditionFans(fans);
            const filteredFans = this.applyExclusionRules(fans);
            return { valid: true, fans: filteredFans, totalScore: filteredFans.reduce((s, f) => s + f.score, 0) };
        }

        // 检查七对
        if (this.melds.length === 0 && allTiles.length === 14) {
            const tileCount = this.countTiles(allTiles);
            const pairs = Object.values(tileCount).filter(c => c === 2 || c === 4);
            const totalPairs = Object.values(tileCount).reduce((sum, c) => sum + Math.floor(c / 2), 0);
            if (totalPairs === 7 && Object.values(tileCount).every(c => c === 2 || c === 4)) {
                const fans = this.detectQiduiFans(tileCount, allTiles);
                this.addConditionFans(fans);
                const filteredFans = this.applyExclusionRules(fans);
                return { valid: true, fans: filteredFans, totalScore: filteredFans.reduce((s, f) => s + f.score, 0) };
            }
        }

        return null;
    }

    // 检查十三幺
    checkShiSanYao(tileCount) {
        const yaoTiles = ['w1', 'w9', 't1', 't9', 'b1', 'b9', 'east', 'south', 'west', 'north', 'zhong', 'fa', 'bai'];
        let hasPair = false;

        for (const tile of yaoTiles) {
            const count = tileCount[tile] || 0;
            if (count === 0) return false;
            if (count === 2) hasPair = true;
            if (count > 2) return false;
        }

        return hasPair && Object.keys(tileCount).length === 13;
    }

    // 检查全不靠
    checkQuanBuKao(tileCount) {
        const tiles = Object.keys(tileCount);
        if (tiles.length !== 14) return false;

        if (!Object.values(tileCount).every(c => c === 1)) return false;

        const numberTiles = tiles.filter(t => isNumberTile(t));
        const honorTiles = tiles.filter(t => isHonorTile(t));

        return this.checkBuKaoPattern(numberTiles, honorTiles);
    }

    // 检查不靠牌型的序数牌模式
    checkBuKaoPattern(numberTiles, honorTiles) {
        const patterns = [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9]
        ];

        const suitValues = { w: [], t: [], b: [] };
        for (const tile of numberTiles) {
            const suit = tile.charAt(0);
            const value = parseInt(tile.charAt(1));
            suitValues[suit].push(value);
        }

        const suitPatternMap = {};

        for (const suit of ['w', 't', 'b']) {
            const values = suitValues[suit];
            if (values.length === 0) continue;

            let matchedPatternIdx = -1;
            for (let i = 0; i < patterns.length; i++) {
                if (values.every(v => patterns[i].includes(v))) {
                    matchedPatternIdx = i;
                    break;
                }
            }

            if (matchedPatternIdx === -1) return false;

            suitPatternMap[suit] = matchedPatternIdx;
        }

        const usedPatterns = new Set(Object.values(suitPatternMap));
        const suitsWithTiles = Object.keys(suitPatternMap).length;

        if (usedPatterns.size < suitsWithTiles) {
            return false;
        }

        return true;
    }

    // 检查七星不靠
    checkQiXingBuKao(tileCount) {
        const tiles = Object.keys(tileCount);
        if (tiles.length !== 14) return false;

        if (!Object.values(tileCount).every(c => c === 1)) return false;

        const honors = ['east', 'south', 'west', 'north', 'zhong', 'fa', 'bai'];
        if (!honors.every(h => tileCount[h] === 1)) return false;

        const numberTiles = tiles.filter(t => isNumberTile(t));
        if (numberTiles.length !== 7) return false;

        return this.checkQiXingPattern(numberTiles);
    }

    // 检查七星不靠的序数牌模式
    checkQiXingPattern(numberTiles) {
        const patterns = [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9]
        ];

        const suitValues = { w: [], t: [], b: [] };
        for (const tile of numberTiles) {
            const suit = tile.charAt(0);
            const value = parseInt(tile.charAt(1));
            suitValues[suit].push(value);
        }

        const usedPatterns = new Set();

        for (const suit of ['w', 't', 'b']) {
            const values = suitValues[suit];
            if (values.length === 0) continue;

            let matchedIdx = -1;
            for (let i = 0; i < patterns.length; i++) {
                if (values.every(v => patterns[i].includes(v))) {
                    matchedIdx = i;
                    break;
                }
            }

            if (matchedIdx === -1) return false;
            if (usedPatterns.has(matchedIdx)) return false;
            usedPatterns.add(matchedIdx);
        }

        return usedPatterns.size === 3;
    }

    // 检测七对的番种
    detectQiduiFans(tileCount, allTiles) {
        const fans = [{ name: '七对', score: 24 }];
        const tiles = Object.keys(tileCount);

        // 检查连七对
        const suitCounts = { w: [], t: [], b: [] };
        for (const tile of tiles) {
            if (isNumberTile(tile)) {
                const suit = tile.charAt(0);
                const value = parseInt(tile.charAt(1));
                suitCounts[suit].push(value);
            }
        }

        for (const suit of ['w', 't', 'b']) {
            const values = suitCounts[suit].sort((a, b) => a - b);
            if (values.length === 7) {
                let isConsecutive = true;
                for (let i = 1; i < 7; i++) {
                    if (values[i] !== values[i - 1] + 1) {
                        isConsecutive = false;
                        break;
                    }
                }
                if (isConsecutive) {
                    fans.length = 0;
                    fans.push({ name: '连七对', score: 88 });
                    break;
                }
            }
        }

        // 其他番种检查
        if (fans[0].name === '七对') {
            // 绿一色
            if (allTiles.every(t => GREEN_TILES.includes(t))) {
                fans.push({ name: '绿一色', score: 88 });
            }

            // 字一色
            if (allTiles.every(t => isHonorTile(t))) {
                fans.push({ name: '字一色', score: 64 });
            }

            // 清幺九
            if (allTiles.every(t => isTerminal(t))) {
                fans.push({ name: '清幺九', score: 64 });
            }

            // 混幺九
            if (allTiles.every(t => isTerminalOrHonor(t)) &&
                allTiles.some(t => isTerminal(t)) &&
                allTiles.some(t => isHonorTile(t))) {
                fans.push({ name: '混幺九', score: 32 });
            }

            // 清一色
            const types = new Set(tiles.map(t => TILES[t]?.type));
            if (types.size === 1 && !tiles.some(t => isHonorTile(t))) {
                fans.push({ name: '清一色', score: 24 });
            }

            // 全双刻
            if (tiles.every(t => {
                const tile = TILES[t];
                return isNumberTile(t) && tile.value % 2 === 0;
            })) {
                fans.push({ name: '全双刻', score: 24 });
            }

            // 全大
            if (allTiles.every(t => {
                const tile = TILES[t];
                return isNumberTile(t) && tile.value >= 7;
            })) {
                fans.push({ name: '全大', score: 24 });
            }

            // 全中
            if (allTiles.every(t => {
                const tile = TILES[t];
                return isNumberTile(t) && tile.value >= 4 && tile.value <= 6;
            })) {
                fans.push({ name: '全中', score: 24 });
            }

            // 全小
            if (allTiles.every(t => {
                const tile = TILES[t];
                return isNumberTile(t) && tile.value <= 3;
            })) {
                fans.push({ name: '全小', score: 24 });
            }

            // 大于五
            if (allTiles.every(t => {
                const tile = TILES[t];
                return isNumberTile(t) && tile.value >= 6;
            })) {
                fans.push({ name: '大于五', score: 12 });
            }

            // 小于五
            if (allTiles.every(t => {
                const tile = TILES[t];
                return isNumberTile(t) && tile.value <= 4;
            })) {
                fans.push({ name: '小于五', score: 12 });
            }

            // 推不倒
            if (allTiles.every(t => REVERSIBLE_TILES.includes(t))) {
                fans.push({ name: '推不倒', score: 8 });
            }

            // 五门齐
            if (this.checkWuMenQi(allTiles)) {
                fans.push({ name: '五门齐', score: 6 });
            }

            // 混一色
            const numberTypes = new Set(allTiles.filter(t => isNumberTile(t)).map(t => TILES[t].type));
            if (numberTypes.size === 1 && allTiles.some(t => isHonorTile(t))) {
                fans.push({ name: '混一色', score: 6 });
            }

            // 断幺
            if (tiles.every(t => !isTerminalOrHonor(t))) {
                fans.push({ name: '断幺', score: 2 });
            }

            // 四归一 七对的四归一只需要判断有几个4张一样的
            const siGuiYiCount = Object.values(tileCount).filter(c => c === 4).length;
            if (siGuiYiCount) {
                fans.push({ name: `四归一×${siGuiYiCount}`, score: 2 * siGuiYiCount });
            }

            // 缺一门
            const suits = new Set(allTiles.filter(t => isNumberTile(t)).map(t => TILES[t].type));
            if (suits.size === 2 && !allTiles.some(t => isHonorTile(t))) {
                fans.push({ name: '缺一门', score: 1 });
            }

            // 无字
            if (!allTiles.some(t => isHonorTile(t)) && allTiles.length > 0) {
                fans.push({ name: '无字', score: 1 });
            }
        }

        return fans;
    }

    // 主要番种检测
    detectFans(decomp, allTiles) {
        const fans = [];
        const { sets, pair } = decomp;
        const allSets = [...sets, ...this.melds];
        const tileCount = this.countTiles(allTiles);

        // 检查七对
        if (this.melds.length === 0 && allTiles.length === 14) {
            const tileCount = this.countTiles(allTiles);
            const pairs = Object.values(tileCount).filter(c => c === 2 || c === 4);
            const totalPairs = Object.values(tileCount).reduce((sum, c) => sum + Math.floor(c / 2), 0);
            if (totalPairs === 7 && Object.values(tileCount).every(c => c === 2 || c === 4)) {
                const fan = this.detectQiduiFans(tileCount, allTiles);
                fans.push(...fan);
            }
        }

        // === 88番 ===
        this.check88Fan(fans, allSets, pair, allTiles, tileCount);

        // === 64番 ===
        this.check64Fan(fans, allSets, pair, allTiles, tileCount);

        // === 48番 ===
        this.check48Fan(fans, allSets, pair, allTiles, tileCount);

        // === 32番 ===
        this.check32Fan(fans, allSets, pair, allTiles, tileCount);

        // === 24番 ===
        this.check24Fan(fans, allSets, pair, allTiles, tileCount);

        // === 16番及以下 ===
        this.checkLowerFans(fans, allSets, pair, allTiles, tileCount);

        // 添加条件相关番种
        this.addConditionFans(fans);

        // 添加和牌方式番种（边张、坎张、单钓将）
        this.addWinTypeFans(fans, decomp, allSets, pair);

        // 应用"不计"规则过滤重复番种
        return this.applyExclusionRules(fans);
    }

    // 检测和牌方式：边张、坎张、单钓将
    addWinTypeFans(fans, decomp, allSets, pair) {
        if (!this.winTile) return;

        const winTile = this.winTile;
        const winType = this.detectWinType(decomp, allSets, pair, winTile);

        if (winType === 'bian') {
            fans.push({ name: '边张', score: 1 });
        } else if (winType === 'kan') {
            fans.push({ name: '坎张', score: 1 });
        } else if (winType === 'dandiao') {
            fans.push({ name: '单钓将', score: 1 });
        }
    }

    // 检测和牌类型：边张、坎张、单钓将
    detectWinType(decomp, allSets, pair, winTile) {
        const { sets } = decomp;
        const tile = TILES[winTile];

        if (pair === winTile) {
            let countInSets = 0;
            for (const set of sets) {
                countInSets += set.tiles.filter(t => t === winTile).length;
            }

            const countInHand = this.hand.filter(t => t === winTile).length;
            if (countInSets === 0 || countInHand === 2) {
                return 'dandiao';
            }
        }

        if (!isNumberTile(winTile)) return null;

        const winValue = tile.value;

        for (const set of sets) {
            if (set.type !== 'chi') continue;
            if (!set.tiles.includes(winTile)) continue;

            const values = set.tiles.map(t => TILES[t].value).sort((a, b) => a - b);

            if (values[0] === 1 && values[2] === 3 && winValue === 3) {
                return 'bian';
            }
            if (values[0] === 7 && values[2] === 9 && winValue === 7) {
                return 'bian';
            }

            if (winValue === values[1]) {
                return 'kan';
            }
        }

        return null;
    }

    // 应用"不计"规则
    applyExclusionRules(fans) {
        const fanNames = new Set(fans.map(f => f.name));
        const excludedFans = new Set();

        for (const fan of fans) {
            const exclusions = EXCLUSION_RULES[fan.name];
            if (exclusions) {
                for (const excluded of exclusions) {
                    excludedFans.add(excluded);
                }
            }
        }

        return fans.filter(f => !excludedFans.has(f.name));
    }

    // 88番检测
    check88Fan(fans, allSets, pair, allTiles, tileCount) {
        const pongs = allSets.filter(s => s.type === 'pong' || s.type === 'minggang' || s.type === 'angang');

        // 大四喜
        const windPongs = pongs.filter(s => TILES[s.tiles[0]]?.type === TILE_TYPES.WIND);
        if (windPongs.length === 4) {
            fans.push({ name: '大四喜', score: 88 });
        }

        // 大三元
        const dragonPongs = pongs.filter(s => TILES[s.tiles[0]]?.type === TILE_TYPES.DRAGON);
        if (dragonPongs.length === 3) {
            fans.push({ name: '大三元', score: 88 });
        }

        // 绿一色
        if (allTiles.every(t => GREEN_TILES.includes(t))) {
            fans.push({ name: '绿一色', score: 88 });
        }

        // 九莲宝灯
        if (this.hand.length >= 13 && this.checkJiuLianBaoDeng(tileCount)) {
            fans.push({ name: '九莲宝灯', score: 88 });
        }

        // 四杠
        const gangs = allSets.filter(s => s.type === 'minggang' || s.type === 'angang');
        if (gangs.length === 4) {
            fans.push({ name: '四杠', score: 88 });
        }
    }

    // 64番检测
    check64Fan(fans, allSets, pair, allTiles, tileCount) {
        const pongs = allSets.filter(s => s.type === 'pong' || s.type === 'minggang' || s.type === 'angang');

        // 清幺九
        if (allTiles.every(t => isTerminal(t))) {
            fans.push({ name: '清幺九', score: 64 });
        }

        // 小四喜
        const windPongs = pongs.filter(s => TILES[s.tiles[0]]?.type === TILE_TYPES.WIND);
        const windPair = TILES[pair]?.type === TILE_TYPES.WIND;
        if (windPongs.length === 3 && windPair) {
            fans.push({ name: '小四喜', score: 64 });
        }

        // 小三元
        const dragonPongs = pongs.filter(s => TILES[s.tiles[0]]?.type === TILE_TYPES.DRAGON);
        const dragonPair = TILES[pair]?.type === TILE_TYPES.DRAGON;
        if (dragonPongs.length === 2 && dragonPair) {
            fans.push({ name: '小三元', score: 64 });
        }

        // 字一色
        if (allTiles.every(t => isHonorTile(t))) {
            fans.push({ name: '字一色', score: 64 });
        }

        // 四暗刻
        const anPongs = allSets.filter(s => {
            if (s.type === 'angang') return true;
            if (s.type === 'pong' && !this.melds.includes(s)) {
                if (!this.conditions.isSelfDrawn && this.winTile && s.tiles.includes(this.winTile)) {
                    return false;
                }
                return true;
            }
            return false;
        });
        if (anPongs.length === 4) {
            fans.push({ name: '四暗刻', score: 64 });
        }

        // 一色双龙会
        if (this.checkYiSeShuangLongHui(allSets, pair)) {
            fans.push({ name: '一色双龙会', score: 64 });
        }
    }

    // 48番检测
    check48Fan(fans, allSets, pair, allTiles, tileCount) {
        const chis = allSets.filter(s => s.type === 'chi');

        // 一色四同顺
        if (this.checkSameChiCount(chis, 4)) {
            fans.push({ name: '一色四同顺', score: 48 });
        }

        // 一色四节高
        if (this.checkSiJieGao(allSets)) {
            fans.push({ name: '一色四节高', score: 48 });
        }
    }

    // 32番检测
    check32Fan(fans, allSets, pair, allTiles, tileCount) {
        // 一色四步高
        if (this.checkYiSeSiBuGao(allSets)) {
            fans.push({ name: '一色四步高', score: 32 });
        }

        // 三杠
        const gangs = allSets.filter(s => s.type === 'minggang' || s.type === 'angang');
        if (gangs.length === 3) {
            fans.push({ name: '三杠', score: 32 });
        }

        // 混幺九
        if (allTiles.every(t => isTerminalOrHonor(t)) &&
            allTiles.some(t => isTerminal(t)) &&
            allTiles.some(t => isHonorTile(t))) {
            fans.push({ name: '混幺九', score: 32 });
        }
    }

    // 24番检测
    check24Fan(fans, allSets, pair, allTiles, tileCount) {
        // 清一色
        const types = new Set(allTiles.map(t => TILES[t]?.type));
        if (types.size === 1 && !allTiles.some(t => isHonorTile(t))) {
            fans.push({ name: '清一色', score: 24 });
        }

        // 全双刻
        const pongs = allSets.filter(s => s.type === 'pong' || s.type === 'minggang' || s.type === 'angang');
        if (pongs.length === 4 && allTiles.every(t => {
            const tile = TILES[t];
            return isNumberTile(t) && tile.value % 2 === 0;
        })) {
            fans.push({ name: '全双刻', score: 24 });
        }

        // 一色三同顺
        const chis = allSets.filter(s => s.type === 'chi');
        if (this.checkSameChiCount(chis, 3)) {
            fans.push({ name: '一色三同顺', score: 24 });
        }

        // 一色三节高
        if (this.checkSanJieGao(allSets)) {
            fans.push({ name: '一色三节高', score: 24 });
        }

        // 全大
        if (allTiles.every(t => {
            const tile = TILES[t];
            return isNumberTile(t) && tile.value >= 7;
        })) {
            fans.push({ name: '全大', score: 24 });
        }

        // 全中
        if (allTiles.every(t => {
            const tile = TILES[t];
            return isNumberTile(t) && tile.value >= 4 && tile.value <= 6;
        })) {
            fans.push({ name: '全中', score: 24 });
        }

        // 全小
        if (allTiles.every(t => {
            const tile = TILES[t];
            return isNumberTile(t) && tile.value <= 3;
        })) {
            fans.push({ name: '全小', score: 24 });
        }
    }

    // 16番及以下检测
    checkLowerFans(fans, allSets, pair, allTiles, tileCount) {
        const pongs = allSets.filter(s => s.type === 'pong' || s.type === 'minggang' || s.type === 'angang');
        const chis = allSets.filter(s => s.type === 'chi');
        const gangs = allSets.filter(s => s.type === 'minggang' || s.type === 'angang');

        // 16番
        // 清龙
        if (this.checkQingLong(allSets)) {
            fans.push({ name: '清龙', score: 16 });
        }

        // 三色双龙会
        if (this.checkSanSeShuangLongHui(allSets, pair)) {
            fans.push({ name: '三色双龙会', score: 16 });
        }

        // 一色三步高
        if (this.checkYiSeSanBuGao(chis)) {
            fans.push({ name: '一色三步高', score: 16 });
        }

        // 三同刻
        if (this.checkSanTongKe(pongs)) {
            fans.push({ name: '三同刻', score: 16 });
        }

        // 三暗刻
        const anPongs = allSets.filter(s => {
            if (s.type === 'angang') return true;
            if (s.type === 'pong' && !this.melds.includes(s)) {
                if (!this.conditions.isSelfDrawn && this.winTile && s.tiles.includes(this.winTile)) {
                    return false;
                }
                return true;
            }
            return false;
        });
        if (anPongs.length === 3) {
            fans.push({ name: '三暗刻', score: 16 });
        }

        // 全带五
        if (this.checkQuanDaiWu(allSets, pair)) {
            fans.push({ name: '全带五', score: 16 });
        }

        // 12番
        // 组合龙
        if (this.checkZuHeLong(allSets)) {
            fans.push({ name: '组合龙', score: 12 });
        }

        // 大于五
        if (allTiles.every(t => {
            const tile = TILES[t];
            return isNumberTile(t) && tile.value >= 6;
        })) {
            fans.push({ name: '大于五', score: 12 });
        }

        // 小于五
        if (allTiles.every(t => {
            const tile = TILES[t];
            return isNumberTile(t) && tile.value <= 4;
        })) {
            fans.push({ name: '小于五', score: 12 });
        }

        // 三风刻
        const windPongs = pongs.filter(s => TILES[s.tiles[0]]?.type === TILE_TYPES.WIND);
        if (windPongs.length === 3) {
            fans.push({ name: '三风刻', score: 12 });
        }

        // 8番
        // 花龙
        if (this.checkHuaLong(chis)) {
            fans.push({ name: '花龙', score: 8 });
        }

        // 推不倒
        if (allTiles.every(t => REVERSIBLE_TILES.includes(t))) {
            fans.push({ name: '推不倒', score: 8 });
        }

        // 三色三同顺
        if (this.checkSanSeSanTongShun(chis)) {
            fans.push({ name: '三色三同顺', score: 8 });
        }

        // 三色三节高
        if (this.checkSanSeSanJieGao(pongs)) {
            fans.push({ name: '三色三节高', score: 8 });
        }

        // 6番
        // 碰碰和
        if (pongs.length === 4) {
            fans.push({ name: '碰碰和', score: 6 });
        }

        // 混一色
        const numberTypes = new Set(allTiles.filter(t => isNumberTile(t)).map(t => TILES[t].type));
        if (numberTypes.size === 1 && allTiles.some(t => isHonorTile(t))) {
            fans.push({ name: '混一色', score: 6 });
        }

        // 三色三步高
        if (this.checkSanSeSanBuGao(chis)) {
            fans.push({ name: '三色三步高', score: 6 });
        }

        // 五门齐
        if (this.checkWuMenQi(allTiles)) {
            fans.push({ name: '五门齐', score: 6 });
        }

        // 全求人
        if (!this.conditions.isSelfDrawn && this.hand.length <= 2) {
            fans.push({ name: '全求人', score: 6 });
        }

        // 双箭刻
        const dragonPongs = pongs.filter(s => TILES[s.tiles[0]]?.type === TILE_TYPES.DRAGON);
        if (dragonPongs.length === 2) {
            fans.push({ name: '双箭刻', score: 6 });
        }

        // 双暗杠
        const anGangs = gangs.filter(s => s.type === 'angang');
        if (anGangs.length === 2) {
            fans.push({ name: '双暗杠', score: 6 });
        }

        // 5番
        // 明暗杠
        const anGang = gangs.filter(s => s.type === 'angang');
        const mingGang = gangs.filter(s => s.type === 'minggang');
        if (anGang.length && mingGang.length) {
            fans.push({ name: '明暗杠', score: 5 });
        }

        // 4番
        // 全带幺
        if (this.checkQuanDaiYao(allSets, pair)) {
            fans.push({ name: '全带幺', score: 4 });
        }

        // 双明杠
        const mingGangs = gangs.filter(s => s.type === 'minggang');
        if (mingGangs.length === 2) {
            fans.push({ name: '双明杠', score: 4 });
        }

        // 2番
        // 箭刻
        if (dragonPongs.length === 1) {
            fans.push({ name: '箭刻', score: 2 });
        }

        // 圈风刻
        const quanFengKe = pongs.find(s => s.tiles[0] === this.conditions.prevalentWind);
        if (quanFengKe) {
            fans.push({ name: '圈风刻', score: 2 });
        }

        // 门风刻
        const menFengKe = pongs.find(s => s.tiles[0] === this.conditions.seatWind);
        if (menFengKe && menFengKe !== quanFengKe) {
            fans.push({ name: '门风刻', score: 2 });
        }

        // 平和
        if (chis.length === 4 && isNumberTile(pair)) {
            fans.push({ name: '平和', score: 2 });
        }

        // 双暗刻
        if (anPongs.length === 2) {
            fans.push({ name: '双暗刻', score: 2 });
        }

        // 暗杠
        if (anGangs.length === 1) {
            fans.push({ name: '暗杠', score: 2 });
        }

        // 断幺
        if (allTiles.every(t => !isTerminalOrHonor(t))) {
            fans.push({ name: '断幺', score: 2 });
        }

        // 四归一
        const siGuiYiCount = this.checkSiGuiYi(allSets, pair, allTiles);
        if (siGuiYiCount) {
            fans.push({ name: `四归一×${siGuiYiCount}`, score: 2 * siGuiYiCount });
        }

        // 双同刻
        if (this.checkShuangTongKe(pongs)) {
            fans.push({ name: '双同刻', score: 2 });
        }

        // 1番
        // 一般高
        if (this.checkYiBanGao(chis)) {
            fans.push({ name: '一般高', score: 1 });
        }

        // 喜相逢
        if (this.checkXiXiangFeng(chis)) {
            fans.push({ name: '喜相逢', score: 1 });
        }

        // 连六
        if (this.checkLianLiu(chis)) {
            fans.push({ name: '连六', score: 1 });
        }

        // 老少副
        if (this.checkLaoShaoFu(chis)) {
            fans.push({ name: '老少副', score: 1 });
        }

        // 幺九刻
        const yaoKe = pongs.filter(s => isTerminal(s.tiles[0]));
        if (yaoKe.length > 0) {
            for (let i = 0; i < yaoKe.length; i++) {
                fans.push({ name: '幺九刻', score: 1 });
            }
        }

        // 明杠
        if (mingGangs.length === 1) {
            fans.push({ name: '明杠', score: 1 });
        }

        // 缺一门
        const suits = new Set(allTiles.filter(t => isNumberTile(t)).map(t => TILES[t].type));
        if (suits.size === 2 && !allTiles.some(t => isHonorTile(t))) {
            fans.push({ name: '缺一门', score: 1 });
        }

        // 无字
        if (!allTiles.some(t => isHonorTile(t)) && allTiles.length > 0) {
            fans.push({ name: '无字', score: 1 });
        }
    }

    // 添加条件相关番种
    addConditionFans(fans) {
        // 花牌
        if (this.conditions.flowerCount > 0) {
            fans.push({ name: `花牌×${this.conditions.flowerCount}`, score: this.conditions.flowerCount });
        }

        // 海底/河底
        if (this.conditions.isLastTile) {
            if (this.conditions.isSelfDrawn) {
                fans.push({ name: '妙手回春', score: 8 });
            } else {
                fans.push({ name: '海底捞月', score: 8 });
            }
        }

        // 杠上开花/抢杠和
        if (this.conditions.isKongDraw) {
            const hasGang = this.melds.some(m => m.type === 'minggang' || m.type === 'angang');
            const handHasWinTile = this.allTiles.includes(this.winTile);

            if (this.conditions.isSelfDrawn) {
                if (hasGang && !handHasWinTile) {
                    fans.push({ name: '杠上开花', score: 8 });
                }
            } else {
                if (!handHasWinTile) {
                    fans.push({ name: '抢杠和', score: 8 });
                }
            }
        }

        // 绝张
        if (this.conditions.isJuezhang && this.hand.filter(t => t === this.winTile).length === 1) {
            fans.push({ name: '和绝张', score: 4 });
        }

        // 不求人（4番）：门清自摸
        const fanNames = new Set(fans.map(f => f.name));
        const hasSpecialHand = fanNames.has('十三幺') || 
            fanNames.has('连七对') || 
            fanNames.has('七对') || 
            fanNames.has('七星不靠') || 
            fanNames.has('全不靠');

        if (this.melds.length === 0 && this.conditions.isSelfDrawn) {
            if (hasSpecialHand) {
                fans.push({ name: '自摸', score: 1 });
            } else {
                fans.push({ name: '不求人', score: 4 });
            }
        }
        // 门前清（2番）：门清点和
        else if (this.melds.length === 0 && !this.conditions.isSelfDrawn) {
            fans.push({ name: '门前清', score: 2 });
        }
        // 自摸（1番）：有副露时自摸
        else if (this.conditions.isSelfDrawn) {
            fans.push({ name: '自摸', score: 1 });
        }
    }

    // === 辅助检测函数 ===

    checkJiuLianBaoDeng(tileCount) {
        const suits = ['w', 't', 'b'];
        for (const suit of suits) {
            const pattern = [3, 1, 1, 1, 1, 1, 1, 1, 3];
            let matches = true;
            let extra = 0;

            for (let i = 1; i <= 9; i++) {
                const tileId = suit + i;
                const count = tileCount[tileId] || 0;
                const expected = pattern[i - 1];

                if (count < expected) {
                    matches = false;
                    break;
                }
                extra += count - expected;
            }

            if (matches && extra === 1) {
                const otherTiles = Object.keys(tileCount).filter(t => !t.startsWith(suit));
                if (otherTiles.length === 0) return true;
            }
        }
        return false;
    }

    checkYiSeShuangLongHui(allSets, pair) {
        const chis = allSets.filter(s => s.type === 'chi');
        if (chis.length !== 4) return false;

        const tile = TILES[pair];
        if (!tile || !isNumberTile(pair) || tile.value !== 5) return false;

        const suit = pair.charAt(0);
        const chi123 = chis.filter(c => c.tiles[0] === suit + '1');
        const chi789 = chis.filter(c => c.tiles[0] === suit + '7');

        return chi123.length === 2 && chi789.length === 2;
    }

    checkSameChiCount(chis, count) {
        const chiMap = {};
        for (const chi of chis) {
            const key = chi.tiles.join(',');
            chiMap[key] = (chiMap[key] || 0) + 1;
        }
        return Object.values(chiMap).some(c => c >= count);
    }

    checkSiJieGao(allSets) {
        const pongs = allSets.filter(s => s.type === 'pong' || s.type === 'minggang' || s.type === 'angang');
        if (pongs.length !== 4) return false;

        const tiles = pongs.map(p => p.tiles[0]).filter(t => isNumberTile(t));
        if (tiles.length !== 4) return false;

        const suit = tiles[0].charAt(0);
        if (!tiles.every(t => t.charAt(0) === suit)) return false;

        const values = tiles.map(t => parseInt(t.charAt(1))).sort((a, b) => a - b);
        for (let i = 1; i < 4; i++) {
            if (values[i] !== values[i - 1] + 1) return false;
        }
        return true;
    }

    checkSanJieGao(allSets) {
        const pongs = allSets.filter(s => s.type === 'pong' || s.type === 'minggang' || s.type === 'angang');

        for (const suit of ['w', 't', 'b']) {
            const suitPongs = pongs.filter(p => p.tiles[0].charAt(0) === suit);
            if (suitPongs.length >= 3) {
                const values = suitPongs.map(p => parseInt(p.tiles[0].charAt(1))).sort((a, b) => a - b);
                for (let i = 0; i <= values.length - 3; i++) {
                    if (values[i + 1] === values[i] + 1 && values[i + 2] === values[i] + 2) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkYiSeSiBuGao(allSets) {
        const chis = allSets.filter(s => s.type === 'chi');
        if (chis.length !== 4) return false;

        for (const suit of ['w', 't', 'b']) {
            const suitChis = chis.filter(c => c.tiles[0].charAt(0) === suit);
            if (suitChis.length === 4) {
                const starts = suitChis.map(c => parseInt(c.tiles[0].charAt(1))).sort((a, b) => a - b);
                // 检查递增1
                if (starts[1] === starts[0] + 1 && starts[2] === starts[0] + 2 && starts[3] === starts[0] + 3) {
                    return true;
                }
                // 检查递增2
                if (starts[1] === starts[0] + 2 && starts[2] === starts[0] + 4 && starts[3] === starts[0] + 6) {
                    return true;
                }
            }
        }
        return false;
    }

    checkYiSeSanBuGao(chis) {
        for (const suit of ['w', 't', 'b']) {
            const suitChis = chis.filter(c => c.tiles[0].charAt(0) === suit);
            if (suitChis.length >= 3) {
                const starts = suitChis.map(c => parseInt(c.tiles[0].charAt(1))).sort((a, b) => a - b);
                for (let i = 0; i <= starts.length - 3; i++) {
                    if (starts[i + 1] === starts[i] + 1 && starts[i + 2] === starts[i] + 2) return true;
                    if (starts[i + 1] === starts[i] + 2 && starts[i + 2] === starts[i] + 4) return true;
                }
            }
        }
        return false;
    }

    checkQingLong(allSets) {
        const chis = allSets.filter(s => s.type === 'chi');

        for (const suit of ['w', 't', 'b']) {
            const has123 = chis.some(c => c.tiles[0] === suit + '1');
            const has456 = chis.some(c => c.tiles[0] === suit + '4');
            const has789 = chis.some(c => c.tiles[0] === suit + '7');
            if (has123 && has456 && has789) return true;
        }
        return false;
    }

    checkHuaLong(chis) {
        const suits = ['w', 't', 'b'];
        const segments = [
            { start: 1, suits: [] },
            { start: 4, suits: [] },
            { start: 7, suits: [] }
        ];

        for (const chi of chis) {
            const suit = chi.tiles[0].charAt(0);
            const start = parseInt(chi.tiles[0].charAt(1));
            if (start === 1) segments[0].suits.push(suit);
            if (start === 4) segments[1].suits.push(suit);
            if (start === 7) segments[2].suits.push(suit);
        }

        for (const s1 of segments[0].suits) {
            for (const s2 of segments[1].suits) {
                for (const s3 of segments[2].suits) {
                    if (s1 !== s2 && s2 !== s3 && s1 !== s3) return true;
                }
            }
        }
        return false;
    }

    checkSanTongKe(pongs) {
        const valueMap = {};
        for (const pong of pongs) {
            const tile = TILES[pong.tiles[0]];
            if (tile && isNumberTile(pong.tiles[0])) {
                const value = tile.value;
                valueMap[value] = (valueMap[value] || 0) + 1;
            }
        }
        return Object.values(valueMap).some(c => c >= 3);
    }

    checkSanSeSanTongShun(chis) {
        const chiMap = {};
        for (const chi of chis) {
            const value = parseInt(chi.tiles[0].charAt(1));
            if (!chiMap[value]) chiMap[value] = new Set();
            chiMap[value].add(chi.tiles[0].charAt(0));
        }
        return Object.values(chiMap).some(suits => suits.size >= 3);
    }

    checkSanSeSanJieGao(pongs) {
        const numberPongs = pongs.filter(p => isNumberTile(p.tiles[0]));
        if (numberPongs.length < 3) return false;

        for (let startValue = 1; startValue <= 7; startValue++) {
            const suits = { w: false, t: false, b: false };
            let count = 0;

            for (const pong of numberPongs) {
                const tile = TILES[pong.tiles[0]];
                const suit = pong.tiles[0].charAt(0);
                if (tile.value >= startValue && tile.value <= startValue + 2) {
                    if (!suits[suit]) {
                        suits[suit] = tile.value;
                    }
                }
            }

            const values = Object.values(suits).filter(v => v !== false).sort((a, b) => a - b);
            if (values.length === 3 && values[1] === values[0] + 1 && values[2] === values[0] + 2) {
                return true;
            }
        }
        return false;
    }

    checkQuanDaiWu(allSets, pair) {
        const tile = TILES[pair];
        if (!tile || !isNumberTile(pair) || tile.value !== 5) return false;

        for (const set of allSets) {
            const hasFive = set.tiles.some(t => {
                const tile = TILES[t];
                return tile && isNumberTile(t) && tile.value === 5;
            });
            if (!hasFive) return false;
        }
        return true;
    }

    checkQuanDaiYao(allSets, pair) {
        if (!isTerminalOrHonor(pair)) return false;

        for (const set of allSets) {
            const hasYao = set.tiles.some(t => isTerminalOrHonor(t));
            if (!hasYao) return false;
        }
        return true;
    }

    checkYiBanGao(chis) {
        const chiSet = {};
        for (const chi of chis) {
            const key = chi.tiles.join(',');
            chiSet[key] = (chiSet[key] || 0) + 1;
        }
        return Object.values(chiSet).some(c => c >= 2);
    }

    checkLianLiu(chis) {
        for (const suit of ['w', 't', 'b']) {
            const suitChis = chis.filter(c => c.tiles[0].charAt(0) === suit);
            const starts = suitChis.map(c => parseInt(c.tiles[0].charAt(1)));

            for (let i = 0; i < starts.length; i++) {
                for (let j = i + 1; j < starts.length; j++) {
                    if (Math.abs(starts[i] - starts[j]) === 3) return true;
                }
            }
        }
        return false;
    }

    checkLaoShaoFu(chis) {
        for (const suit of ['w', 't', 'b']) {
            const has123 = chis.some(c => c.tiles[0] === suit + '1');
            const has789 = chis.some(c => c.tiles[0] === suit + '7');
            if (has123 && has789) return true;
        }
        return false;
    }

    // 检查组合龙
    checkZuHeLong(allSets) {
        const chis = allSets.filter(s => s.type === 'chi');
        const allChiTiles = [];
        for (const chi of chis) {
            allChiTiles.push(...chi.tiles);
        }

        const patterns = [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9]
        ];

        const hasSuits = { w: new Set(), t: new Set(), b: new Set() };
        for (const tile of allChiTiles) {
            if (isNumberTile(tile)) {
                const suit = tile.charAt(0);
                const value = parseInt(tile.charAt(1));
                hasSuits[suit].add(value);
            }
        }

        const suits = ['w', 't', 'b'];
        for (let i = 0; i < 6; i++) {
            const assignment = [
                suits[i % 3],
                suits[(i + 1) % 3],
                suits[(i + 2) % 3]
            ];

            let valid = true;
            for (let p = 0; p < 3; p++) {
                const suit = assignment[p];
                for (const val of patterns[p]) {
                    if (!hasSuits[suit].has(val)) {
                        valid = false;
                        break;
                    }
                }
                if (!valid) break;
            }
            if (valid) return true;
        }
        return false;
    }

    // 检查三色双龙会
    checkSanSeShuangLongHui(allSets, pair) {
        const chis = allSets.filter(s => s.type === 'chi');
        if (chis.length !== 4) return false;

        const tile = TILES[pair];
        if (!tile || !isNumberTile(pair) || tile.value !== 5) return false;

        const pairSuit = pair.charAt(0);
        const otherSuits = ['w', 't', 'b'].filter(s => s !== pairSuit);

        for (const suit of otherSuits) {
            const chi123 = chis.filter(c => c.tiles[0] === suit + '1').length;
            const chi789 = chis.filter(c => c.tiles[0] === suit + '7').length;
            if (chi123 !== 1 || chi789 !== 1) return false;
        }

        return true;
    }

    // 检查三色三步高
    checkSanSeSanBuGao(chis) {
        if (chis.length < 3) return false;

        const chisByStart = {};
        for (const chi of chis) {
            const suit = chi.tiles[0].charAt(0);
            const start = parseInt(chi.tiles[0].charAt(1));
            const key = `${suit}-${start}`;
            chisByStart[key] = true;
        }

        for (let startVal = 1; startVal <= 7; startVal++) {
            const suits = ['w', 't', 'b'];
            for (let i = 0; i < 6; i++) {
                const assignment = [
                    suits[i % 3],
                    suits[(i + 1) % 3],
                    suits[(i + 2) % 3]
                ];

                if (chisByStart[`${assignment[0]}-${startVal}`] &&
                    chisByStart[`${assignment[1]}-${startVal + 1}`] &&
                    chisByStart[`${assignment[2]}-${startVal + 2}`]) {
                    return true;
                }
            }
        }
        return false;
    }

    // 检查五门齐
    checkWuMenQi(allTiles) {
        const hasWan = allTiles.some(t => TILES[t]?.type === TILE_TYPES.WAN);
        const hasTiao = allTiles.some(t => TILES[t]?.type === TILE_TYPES.TIAO);
        const hasBing = allTiles.some(t => TILES[t]?.type === TILE_TYPES.BING);
        const hasWind = allTiles.some(t => TILES[t]?.type === TILE_TYPES.WIND);
        const hasDragon = allTiles.some(t => TILES[t]?.type === TILE_TYPES.DRAGON);

        return hasWan && hasTiao && hasBing && hasWind && hasDragon;
    }

    // 检查四归一
    checkSiGuiYi(allSets, pair, allTiles) {
        const tileCount = this.countTiles(allTiles);
        let count = 0;

        for (const [tileId, num] of Object.entries(tileCount)) {
            if (num !== 4) continue;

            const inGang = allSets.some(s =>
                (s.type === 'minggang' || s.type === 'angang') &&
                s.tiles[0] === tileId
            );

            if (!inGang) {
                count++;
            }
        }

        return count;
    }

    // 检查双同刻
    checkShuangTongKe(pongs) {
        const valueCount = {};
        for (const pong of pongs) {
            const tile = TILES[pong.tiles[0]];
            if (tile && isNumberTile(pong.tiles[0])) {
                const value = tile.value;
                valueCount[value] = (valueCount[value] || 0) + 1;
            }
        }
        return Object.values(valueCount).some(c => c >= 2);
    }

    // 检查喜相逢
    checkXiXiangFeng(chis) {
        const chiMap = {};
        for (const chi of chis) {
            const start = parseInt(chi.tiles[0].charAt(1));
            const suit = chi.tiles[0].charAt(0);
            if (!chiMap[start]) chiMap[start] = new Set();
            chiMap[start].add(suit);
        }
        return Object.values(chiMap).some(suits => suits.size >= 2);
    }

    // 计算听牌
    getWaitingTiles() {
        const waitingTiles = [];
        const currentHand = [...this.hand];
        const currentMelds = [...this.melds];

        for (const tileId in TILES) {
            const tile = TILES[tileId];
            if (!tile) continue;

            const currentCount = currentHand.filter(t => t === tileId).length +
                currentMelds.reduce((sum, m) => sum + m.tiles.filter(t => t === tileId).length, 0);
            if (currentCount >= 4) continue;

            const newHand = [...currentHand, tileId];

            this.setHand(newHand, currentMelds, tileId, this.conditions);
            const result = this.analyze();

            if (result.valid) {
                waitingTiles.push({
                    tileId,
                    tile,
                    fans: result.fans,
                    totalScore: result.totalScore
                });
            }
        }

        this.setHand(currentHand, currentMelds, this.winTile, this.conditions);

        return waitingTiles;
    }
}

export { MahjongAnalyzer };
