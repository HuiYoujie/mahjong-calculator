const ALL_TILES = [
  '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
  '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
  'E', 'S', 'W', 'N', 'C', 'F', 'P'
];

const gbMahjongApi = require('gb-mahjong-js/lib/api');
const Handtiles = require('gb-mahjong-js/lib/core/handtiles');
const { Shanten } = require('gb-mahjong-js/lib/solver/shanten');
const GB_CONSTANTS = require('gb-mahjong-js/lib/core/constants');

const HONORS = new Set(['E', 'S', 'W', 'N', 'C', 'F', 'P']);

const GB_ID_TO_TILE = {
  [GB_CONSTANTS.TILE_E]: 'E', [GB_CONSTANTS.TILE_S]: 'S',
  [GB_CONSTANTS.TILE_W]: 'W', [GB_CONSTANTS.TILE_N]: 'N',
  [GB_CONSTANTS.TILE_C]: 'C', [GB_CONSTANTS.TILE_F]: 'F',
  [GB_CONSTANTS.TILE_P]: 'P'
};

function tileToGbToken(tileId) {
  return tileId;
}

function formatLooseTiles(tileIds) {
  const groups = { m: [], s: [], p: [] };
  const honors = [];

  tileIds.forEach(tileId => {
    if (HONORS.has(tileId)) {
      honors.push(tileId);
      return;
    }
    const suit = tileId[1];
    const value = tileId[0];
    if (groups[suit]) groups[suit].push(value);
  });

  const suitText = Object.entries(groups)
    .map(([suit, values]) => {
      const sortedValues = [...values].sort().join('');
      return sortedValues ? `${sortedValues}${suit}` : '';
    })
    .join('');

  return `${suitText}${honors.join('')}`;
}

function formatMeld(group) {
  const tiles = [...group.tiles];
  const body = tiles.every(tile => HONORS.has(tile))
    ? tiles.join('')
    : `${tiles.map(tile => tile[0]).sort((a, b) => Number(a) - Number(b)).join('')}${tiles[0][1]}`;
  const offer = group.type === 'angang' ? 0 : 1;
  return `[${body},${offer}]`;
}

function buildContext(context = {}) {
  const quanfeng = context.quanfeng || 'E';
  const menfeng = context.menfeng || 'E';
  return `|${quanfeng}${menfeng}${context.zimo ? 1 : 0}${context.juezhang ? 1 : 0}${context.haidi ? 1 : 0}${context.gang ? 1 : 0}`;
}

function toGbHandString({ tiles = [], packs = [], winningTile = null, context = {}, flowers = 0 }) {
  const packText = packs.map(formatMeld).join('');
  const handText = `${packText}${formatLooseTiles(tiles)}${winningTile ? tileToGbToken(winningTile) : ''}`;
  const flowerText = flowers > 0 ? `|${flowers}` : '';
  return `${handText}${buildContext(context)}${flowerText}`;
}

function fromGbTileId(tile) {
  const id = typeof tile?.GetId === 'function' ? tile.GetId() : tile;
  if (GB_ID_TO_TILE[id]) return GB_ID_TO_TILE[id];
  if (typeof id === 'number') {
    if (id >= GB_CONSTANTS.TILE_1m && id <= GB_CONSTANTS.TILE_9m) return `${id - GB_CONSTANTS.TILE_1m + 1}m`;
    if (id >= GB_CONSTANTS.TILE_1s && id <= GB_CONSTANTS.TILE_9s) return `${id - GB_CONSTANTS.TILE_1s + 1}s`;
    if (id >= GB_CONSTANTS.TILE_1p && id <= GB_CONSTANTS.TILE_9p) return `${id - GB_CONSTANTS.TILE_1p + 1}p`;
    return null;
  }
  if (typeof id !== 'string') return null;

  if (HONORS.has(id)) return id;

  const match = id.match(/^([1-9])([msp])$/) || id.match(/^([msp])([1-9])$/);
  if (!match) return null;

  if (['m', 's', 'p'].includes(match[2])) return `${match[1]}${match[2]}`;
  if (['m', 's', 'p'].includes(match[1])) return `${match[2]}${match[1]}`;
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
      tiles: payload.tiles,
      packs: payload.packs,
      winningTile: payload.winningTile,
      context: payload.context,
      flowers: payload.flowers
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
      tiles: payload.tiles,
      packs: payload.packs,
      context: payload.context,
      flowers: payload.flowers
    })) || [];

    return waitingTiles.map(tile => {
      const tileId = fromGbTileId(tile);
      if (!tileId) return null;
      const result = analyzeHand({ ...payload, winningTile: tileId });
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
      tiles: payload.tiles,
      packs: payload.packs,
      winningTile: payload.winningTile,
      context: payload.context,
      flowers: payload.flowers
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

export function buildHandPayload({ tiles, packs, winningTile, context, flowers }) {
  return {
    tiles,
    packs,
    winningTile,
    context,
    flowers
  };
}

export function getFallbackWaitingTiles({ tiles, packs, context, flowers }) {
  const used = [...tiles, ...packs.flatMap(pack => pack.tiles)];
  return ALL_TILES
    .filter(tileId => used.filter(tile => tile === tileId).length < 4)
    .map(tileId => {
      const payload = buildHandPayload({ tiles, packs, winningTile: tileId, context, flowers });
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
