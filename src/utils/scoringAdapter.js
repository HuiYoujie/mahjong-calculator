const ALL_TILES = [
  'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9',
  't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9',
  'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9',
  'east', 'south', 'west', 'north', 'zhong', 'fa', 'bai'
];

const gbMahjongApi = require('gb-mahjong-js/lib/api');
const Handtiles = require('gb-mahjong-js/lib/core/handtiles');
const { Shanten } = require('gb-mahjong-js/lib/solver/shanten');
const GB_CONSTANTS = require('gb-mahjong-js/lib/core/constants');

const HONOR_TO_GB = {
  east: 'E',
  south: 'S',
  west: 'W',
  north: 'N',
  zhong: 'C',
  fa: 'F',
  bai: 'P'
};

const GB_ID_TO_TILE = {
  [GB_CONSTANTS.TILE_E]: 'east',
  [GB_CONSTANTS.TILE_S]: 'south',
  [GB_CONSTANTS.TILE_W]: 'west',
  [GB_CONSTANTS.TILE_N]: 'north',
  [GB_CONSTANTS.TILE_C]: 'zhong',
  [GB_CONSTANTS.TILE_F]: 'fa',
  [GB_CONSTANTS.TILE_P]: 'bai'
};
const SUIT_TO_GB = { w: 'm', t: 's', b: 'p' };

function tileToGbToken(tileId) {
  if (HONOR_TO_GB[tileId]) return HONOR_TO_GB[tileId];
  return `${tileId.slice(1)}${SUIT_TO_GB[tileId[0]]}`;
}

function formatLooseTiles(tileIds) {
  const groups = { w: [], t: [], b: [] };
  const honors = [];

  tileIds.forEach(tileId => {
    if (HONOR_TO_GB[tileId]) {
      honors.push(HONOR_TO_GB[tileId]);
      return;
    }
    const suit = tileId[0];
    const value = tileId.slice(1);
    if (groups[suit]) groups[suit].push(value);
  });

  const suitText = Object.entries(groups)
    .map(([suit, values]) => {
      const sortedValues = [...values].sort().join('');
      return sortedValues ? `${sortedValues}${SUIT_TO_GB[suit]}` : '';
    })
    .join('');

  return `${suitText}${honors.join('')}`;
}

function formatMeld(group) {
  const tiles = [...group.tiles];
  const body = tiles.every(tile => HONOR_TO_GB[tile])
    ? tiles.map(tile => HONOR_TO_GB[tile]).join('')
    : `${tiles.map(tile => tile.slice(1)).sort((a, b) => Number(a) - Number(b)).join('')}${SUIT_TO_GB[tiles[0][0]]}`;
  const offer = group.type === 'angang' ? 0 : 1;
  return `[${body},${offer}]`;
}

function buildContext(options = {}) {
  const prevalentWind = HONOR_TO_GB[options.prevalentWind] || 'E';
  const seatWind = HONOR_TO_GB[options.seatWind] || 'E';
  const isSelfDrawn = options.isSelfDrawn || options.isMiaoshou || options.isGangshang;
  const isHaidi = options.isHaidilao || options.isMiaoshou;
  const isGang = options.isGangshang || options.isQianggang;
  return `|${prevalentWind}${seatWind}${isSelfDrawn ? 1 : 0}${options.isJuezhang ? 1 : 0}${isHaidi ? 1 : 0}${isGang ? 1 : 0}`;
}

function toGbHandString({ concealedTiles = [], melds = [], winTile = null, options = {} }) {
  const meldText = melds.map(formatMeld).join('');
  const handText = `${meldText}${formatLooseTiles(concealedTiles)}${winTile ? tileToGbToken(winTile) : ''}`;
  const flowerText = options.flowerCount > 0 ? `|${options.flowerCount}` : '';
  return `${handText}${buildContext(options)}${flowerText}`;
}

function fromGbTileId(tile) {
  const id = typeof tile?.GetId === 'function' ? tile.GetId() : tile;
  if (GB_ID_TO_TILE[id]) return GB_ID_TO_TILE[id];
  if (typeof id === 'number') {
    if (id >= GB_CONSTANTS.TILE_1m && id <= GB_CONSTANTS.TILE_9m) return `w${id - GB_CONSTANTS.TILE_1m + 1}`;
    if (id >= GB_CONSTANTS.TILE_1s && id <= GB_CONSTANTS.TILE_9s) return `t${id - GB_CONSTANTS.TILE_1s + 1}`;
    if (id >= GB_CONSTANTS.TILE_1p && id <= GB_CONSTANTS.TILE_9p) return `b${id - GB_CONSTANTS.TILE_1p + 1}`;
    return null;
  }
  if (typeof id !== 'string') return null;

  const honorId = Object.keys(HONOR_TO_GB).find(key => HONOR_TO_GB[key] === id);
  if (honorId) return honorId;

  const match = id.match(/^([1-9])([msp])$/) || id.match(/^([msp])([1-9])$/);
  if (!match) return null;

  const suitMap = { m: 'w', s: 't', p: 'b' };
  if (suitMap[match[2]]) return `${suitMap[match[2]]}${match[1]}`;
  if (suitMap[match[1]]) return `${suitMap[match[1]]}${match[2]}`;
  return null;
}

function createHandtiles(payload) {
  const handtiles = new Handtiles();
  const code = handtiles.StringToHandtiles(toGbHandString(payload));
  if (code !== 0) {
    throw new Error(`gb-mahjong-js parse failed with code ${code}`);
  }
  return handtiles;
}

function normalizeFanResult(item) {
  if (!item) return null;
  if (typeof item === 'string') return { name: item, score: 0 };
  if (Array.isArray(item)) return { name: item[0] || '未知番型', score: Number(item[1] || 0) };

  return {
    name: item.name || item.fan_name || item.fan || item.title || item.label || '未知番型',
    score: Number(item.score || item.fan_value || item.value || item.point || item.points || 0)
  };
}

function normalizeFanTable(fan) {
  const raw = fan.fans || [];
  const fans = raw.map(item => ({
    name: GB_CONSTANTS.FAN_NAME[item.fanId] || `番型${item.fanId}`,
    score: GB_CONSTANTS.FAN_SCORE[item.fanId] || 0
  }));

  return {
    valid: Boolean(fan.isHu),
    fans,
    totalScore: Number(fan.totalFan || fans.reduce((sum, item) => sum + item.score, 0))
  };
}

export function analyzeHand(payload) {
  try {
    const result = gbMahjongApi.countFan(toGbHandString({
      concealedTiles: payload.concealedTiles,
      melds: payload.melds,
      winTile: payload.winTile,
      options: payload.options
    }));
    if (!result.isHu) {
      return { valid: false, fans: [], totalScore: 0 };
    }
    return normalizeFanTable(result);
  } catch (error) {
    return { valid: false, fans: [], totalScore: 0, error: error.message };
  }
}

export function getWaitingTiles(payload) {
  try {
    const waitingTiles = gbMahjongApi.calcTing(toGbHandString({
      concealedTiles: payload.concealedTiles,
      melds: payload.melds,
      options: payload.options
    })) || [];

    return waitingTiles.map(tile => {
      const tileId = fromGbTileId(tile);
      if (!tileId) return null;
      const result = analyzeHand({ ...payload, winTile: tileId });
      return {
        tileId,
        fans: result.fans,
        totalScore: result.totalScore
      };
    }).filter(Boolean);
  } catch (error) {
    return [];
  }
}

export function getShanten(payload, opt) {
  try {
    const handtiles = createHandtiles({
      concealedTiles: payload.concealedTiles,
      melds: payload.melds,
      winTile: payload.winTile,
      options: payload.options
    });
    return Shanten.calcAll(handtiles, opt);
  } catch (error) {
    return {
      normal: null,
      qidui: null,
      shisanyao: null,
      quanbukao: null,
      zuhelong: null,
      waits: [],
      details: {},
      error: error.message
    };
  }
}

export function buildHandPayload({ concealedTiles, meldGroups, winTile, options }) {
  return {
    concealedTiles,
    melds: meldGroups,
    winTile,
    options,
    tiles: [...concealedTiles, ...meldGroups.flatMap(group => group.tiles)]
  };
}

export function getFallbackWaitingTiles({ concealedTiles, meldGroups, options }) {
  const used = [...concealedTiles, ...meldGroups.flatMap(group => group.tiles)];
  return ALL_TILES
    .filter(tileId => used.filter(tile => tile === tileId).length < 4)
    .map(tileId => {
      const payload = buildHandPayload({ concealedTiles, meldGroups, winTile: tileId, options });
      const result = analyzeHand(payload);
      return {
        tileId,
        fans: result.fans,
        totalScore: result.totalScore
      };
    })
    .filter(item => item.totalScore > 0)
    .slice(0, 9);
}
