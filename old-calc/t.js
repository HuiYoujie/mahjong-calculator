// 麻将牌数据定义

// 牌的类型
const TILE_TYPES = {
    WAN: 'wan',      // 万
    TIAO: 'tiao',    // 条
    BING: 'bing',    // 饼
    WIND: 'wind',    // 风
    DRAGON: 'dragon' // 箭
};

// 风牌
const WINDS = {
    EAST: 'east',
    SOUTH: 'south',
    WEST: 'west',
    NORTH: 'north'
};

// 箭牌
const DRAGONS = {
    ZHONG: 'zhong',  // 中
    FA: 'fa',        // 发
    BAI: 'bai'       // 白
};

// 所有麻将牌定义
const TILES = {
    // 万
    w1: { id: 'w1', type: TILE_TYPES.WAN, value: 1, name: '一万', unicode: '🀇', isTerminal: true },
    w2: { id: 'w2', type: TILE_TYPES.WAN, value: 2, name: '二万', unicode: '🀈', isTerminal: false },
    w3: { id: 'w3', type: TILE_TYPES.WAN, value: 3, name: '三万', unicode: '🀉', isTerminal: false },
    w4: { id: 'w4', type: TILE_TYPES.WAN, value: 4, name: '四万', unicode: '🀊', isTerminal: false },
    w5: { id: 'w5', type: TILE_TYPES.WAN, value: 5, name: '五万', unicode: '🀋', isTerminal: false },
    w6: { id: 'w6', type: TILE_TYPES.WAN, value: 6, name: '六万', unicode: '🀌', isTerminal: false },
    w7: { id: 'w7', type: TILE_TYPES.WAN, value: 7, name: '七万', unicode: '🀍', isTerminal: false },
    w8: { id: 'w8', type: TILE_TYPES.WAN, value: 8, name: '八万', unicode: '🀎', isTerminal: false },
    w9: { id: 'w9', type: TILE_TYPES.WAN, value: 9, name: '九万', unicode: '🀏', isTerminal: true },
    
    // 条
    t1: { id: 't1', type: TILE_TYPES.TIAO, value: 1, name: '一条', unicode: '🀐', isTerminal: true },
    t2: { id: 't2', type: TILE_TYPES.TIAO, value: 2, name: '二条', unicode: '🀑', isTerminal: false },
    t3: { id: 't3', type: TILE_TYPES.TIAO, value: 3, name: '三条', unicode: '🀒', isTerminal: false },
    t4: { id: 't4', type: TILE_TYPES.TIAO, value: 4, name: '四条', unicode: '🀓', isTerminal: false },
    t5: { id: 't5', type: TILE_TYPES.TIAO, value: 5, name: '五条', unicode: '🀔', isTerminal: false },
    t6: { id: 't6', type: TILE_TYPES.TIAO, value: 6, name: '六条', unicode: '🀕', isTerminal: false },
    t7: { id: 't7', type: TILE_TYPES.TIAO, value: 7, name: '七条', unicode: '🀖', isTerminal: false },
    t8: { id: 't8', type: TILE_TYPES.TIAO, value: 8, name: '八条', unicode: '🀗', isTerminal: false },
    t9: { id: 't9', type: TILE_TYPES.TIAO, value: 9, name: '九条', unicode: '🀘', isTerminal: true },
    
    // 饼
    b1: { id: 'b1', type: TILE_TYPES.BING, value: 1, name: '一饼', unicode: '🀙', isTerminal: true },
    b2: { id: 'b2', type: TILE_TYPES.BING, value: 2, name: '二饼', unicode: '🀚', isTerminal: false },
    b3: { id: 'b3', type: TILE_TYPES.BING, value: 3, name: '三饼', unicode: '🀛', isTerminal: false },
    b4: { id: 'b4', type: TILE_TYPES.BING, value: 4, name: '四饼', unicode: '🀜', isTerminal: false },
    b5: { id: 'b5', type: TILE_TYPES.BING, value: 5, name: '五饼', unicode: '🀝', isTerminal: false },
    b6: { id: 'b6', type: TILE_TYPES.BING, value: 6, name: '六饼', unicode: '🀞', isTerminal: false },
    b7: { id: 'b7', type: TILE_TYPES.BING, value: 7, name: '七饼', unicode: '🀟', isTerminal: false },
    b8: { id: 'b8', type: TILE_TYPES.BING, value: 8, name: '八饼', unicode: '🀠', isTerminal: false },
    b9: { id: 'b9', type: TILE_TYPES.BING, value: 9, name: '九饼', unicode: '🀡', isTerminal: true },
    
    // 风牌
    east: { id: 'east', type: TILE_TYPES.WIND, value: 'east', name: '东', unicode: '🀀', isHonor: true },
    south: { id: 'south', type: TILE_TYPES.WIND, value: 'south', name: '南', unicode: '🀁', isHonor: true },
    west: { id: 'west', type: TILE_TYPES.WIND, value: 'west', name: '西', unicode: '🀂', isHonor: true },
    north: { id: 'north', type: TILE_TYPES.WIND, value: 'north', name: '北', unicode: '🀃', isHonor: true },
    
    // 箭牌
    zhong: { id: 'zhong', type: TILE_TYPES.DRAGON, value: 'zhong', name: '中', unicode: '🀄', isHonor: true },
    fa: { id: 'fa', type: TILE_TYPES.DRAGON, value: 'fa', name: '发', unicode: '🀅', isHonor: true },
    bai: { id: 'bai', type: TILE_TYPES.DRAGON, value: 'bai', name: '白', unicode: '🀆', isHonor: true },
};

// 按类型分组的牌列表
const TILES_BY_TYPE = {
    wan: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9'],
    tiao: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9'],
    bing: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'],
    wind: ['east', 'south', 'west', 'north'],
    dragon: ['zhong', 'fa', 'bai']
};

// 绿一色的牌
const GREEN_TILES = ['t2', 't3', 't4', 't6', 't8', 'fa'];

// 推不倒的牌 (上下对称)
const REVERSIBLE_TILES = ['b1', 'b2', 'b3', 'b4', 'b5', 'b8', 'b9', 't2', 't4', 't5', 't6', 't8', 't9', 'bai'];

// 辅助函数：判断是否是序数牌
function isNumberTile(tileId) {
    const tile = TILES[tileId];
    return tile && (tile.type === TILE_TYPES.WAN || tile.type === TILE_TYPES.TIAO || tile.type === TILE_TYPES.BING);
}

// 辅助函数：判断是否是字牌
function isHonorTile(tileId) {
    const tile = TILES[tileId];
    return tile && (tile.type === TILE_TYPES.WIND || tile.type === TILE_TYPES.DRAGON);
}

// 辅助函数：判断是否是幺九牌
function isTerminalOrHonor(tileId) {
    const tile = TILES[tileId];
    if (!tile) return false;
    return tile.isTerminal || tile.isHonor;
}

// 辅助函数：判断是否是幺九序数牌
function isTerminal(tileId) {
    const tile = TILES[tileId];
    return tile && tile.isTerminal;
}

// 辅助函数：获取同花色的牌
function getSameSuitTiles(tileId) {
    const tile = TILES[tileId];
    if (!tile || !isNumberTile(tileId)) return [];
    return TILES_BY_TYPE[tile.type];
}

// 辅助函数：获取牌的显示名称
function getTileName(tileId) {
    return TILES[tileId]?.name || tileId;
}

// 辅助函数：获取牌的Unicode
function getTileUnicode(tileId) {
    return TILES[tileId]?.unicode || '?';
}

// 副露类型
const MELD_TYPES = {
    CHI: 'chi',           // 吃
    PONG: 'pong',         // 碰
    MING_GANG: 'minggang', // 明杠
    AN_GANG: 'angang'      // 暗杠
};
