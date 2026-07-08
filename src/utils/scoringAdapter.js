import * as GBMahjong from 'gb-mahjong-js';

const ALL_TILES = [
  'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9',
  't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9',
  'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9',
  'east', 'south', 'west', 'north', 'zhong', 'fa', 'bai'
];

function normalizeFan(fan) {
  if (!fan) return null;
  if (typeof fan === 'string') return { name: fan, score: 0 };
  return {
    name: fan.name || fan.title || fan.fan || fan.label || '未知番型',
    score: Number(fan.score || fan.point || fan.points || fan.fanNumber || 0)
  };
}

function normalizeResult(result) {
  if (!result) return { valid: false, fans: [], totalScore: 0 };
  const fans = (result.fans || result.fanList || result.patterns || [])
    .map(normalizeFan)
    .filter(Boolean);
  const totalScore = Number(result.totalScore || result.score || result.points || fans.reduce((sum, fan) => sum + fan.score, 0));

  return {
    valid: result.valid !== false,
    fans,
    totalScore
  };
}

function callFirstExisting(methodNames, payload) {
  for (const name of methodNames) {
    const method = GBMahjong[name] || GBMahjong.default?.[name];
    if (typeof method === 'function') {
      return method(payload);
    }
  }
  return null;
}

export function analyzeHand(payload) {
  const result = callFirstExisting([
    'analyze',
    'analyzeHand',
    'calculate',
    'calculateFans',
    'score',
    'scoring'
  ], payload);

  return normalizeResult(result);
}

export function getWaitingTiles(payload) {
  const result = callFirstExisting([
    'getWaitingTiles',
    'waitingTiles',
    'ting',
    'calculateWaitingTiles'
  ], payload);

  if (Array.isArray(result)) {
    return result.map(item => {
      if (typeof item === 'string') {
        return { tileId: item, fans: [], totalScore: 0 };
      }
      return {
        tileId: item.tileId || item.tile || item.id,
        ...normalizeResult(item)
      };
    }).filter(item => item.tileId);
  }

  return [];
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
    .slice(0, 9)
    .map(tileId => {
      const payload = buildHandPayload({ concealedTiles: [...concealedTiles, tileId], meldGroups, winTile: tileId, options });
      const result = analyzeHand(payload);
      return {
        tileId,
        fans: result.fans,
        totalScore: result.totalScore
      };
    });
}
