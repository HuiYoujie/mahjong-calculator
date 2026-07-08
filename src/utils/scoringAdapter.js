import { Fan, Handtiles, Shanten } from 'gb-mahjong-js';

const ALL_TILES = [
  'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9',
  't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9',
  'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9',
  'east', 'south', 'west', 'north', 'zhong', 'fa', 'bai'
];

const HONOR_TO_GB = {
  east: 'E',
  south: 'S',
  west: 'W',
  north: 'N',
  zhong: 'C',
  fa: 'F',
  bai: 'P'
};

const GB_TO_HONOR = Object.fromEntries(Object.entries(HONOR_TO_GB).map(([key, value]) => [value, key]));
const SUIT_TO_GB = { w: 'm', t: 's', b: 'p' };
const GB_TO_SUIT = { m: 'w', s: 't', p: 'b' };

function toGbHandString(tileIds) {
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
    .map(([suit, values]) => values.sort().join('') ? `${values.sort().join('')}${SUIT_TO_GB[suit]}` : '')
    .join('');

  return `${suitText}${honors.join('')} `;
}

function fromGbTileId(tile) {
  const id = typeof tile?.GetId === 'function' ? tile.GetId() : tile;
  if (typeof id !== 'string') return null;

  if (GB_TO_HONOR[id]) return GB_TO_HONOR[id];

  const match = id.match(/^([1-9])([msp])$/) || id.match(/^([msp])([1-9])$/);
  if (!match) return null;

  if (GB_TO_SUIT[match[2]]) return `${GB_TO_SUIT[match[2]]}${match[1]}`;
  if (GB_TO_SUIT[match[1]]) return `${GB_TO_SUIT[match[1]]}${match[2]}`;
  return null;
}

function createHandtiles(tileIds) {
  const handtiles = new Handtiles();
  const code = handtiles.StringToHandtiles(toGbHandString(tileIds));
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
  const raw = fan.tot_fan_res || fan.fan_table_res || [];
  const fans = Array.isArray(raw)
    ? raw.map(normalizeFanResult).filter(Boolean)
    : Object.entries(raw).map(([name, score]) => ({ name, score: Number(score || 0) }));

  return {
    valid: true,
    fans,
    totalScore: fans.reduce((sum, item) => sum + item.score, 0)
  };
}

export function analyzeHand(payload) {
  try {
    const tiles = [...payload.concealedTiles, ...(payload.winTile ? [payload.winTile] : [])];
    const handtiles = createHandtiles(tiles);
    const fan = new Fan();

    if (typeof fan.JudgeHu === 'function' && !fan.JudgeHu(handtiles)) {
      return { valid: false, fans: [], totalScore: 0 };
    }

    fan.CountFan(handtiles);
    return normalizeFanTable(fan);
  } catch (error) {
    return { valid: false, fans: [], totalScore: 0, error: error.message };
  }
}

export function getWaitingTiles(payload) {
  try {
    const handtiles = createHandtiles(payload.concealedTiles);
    const fan = new Fan();
    const waitingTiles = fan.CalcTing(handtiles) || [];

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
    const handtiles = createHandtiles(payload.concealedTiles);
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
