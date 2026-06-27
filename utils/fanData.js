// 国标麻将81番型数据

export const FAN_DATA = [
  // ==================== 88番 ====================
  {
    name: '大四喜',
    score: 88,
    description: '由东南西北四风刻组成的和牌',
    exclusions: ['圈风刻', '门风刻', '三风刻', '碰碰和'],
    exampleTiles: {
      concealed: ['east', 'east', 'east', 'south', 'south', 'south', 'west', 'west', 'west', 'north', 'north', 'north'],
      melds: [],
      pair: 'b1'
    }
  },
  {
    name: '大三元',
    score: 88,
    description: '和牌中有中发白三组箭刻',
    exclusions: ['箭刻', '双箭刻'],
    exampleTiles: {
      concealed: ['zhong', 'zhong', 'zhong', 'fa', 'fa', 'fa', 'bai', 'bai', 'bai'],
      melds: [],
      pair: 'w1'
    }
  },
  {
    name: '绿一色',
    score: 88,
    description: '由23468条和发财组成的和牌',
    exclusions: ['混一色'],
    exampleTiles: {
      concealed: ['t2', 't2', 't2', 't3', 't3', 't3', 't4', 't4', 't6', 't6', 't6', 't8', 't8'],
      melds: [],
      pair: 'fa'
    }
  },
  {
    name: '九莲宝灯',
    score: 88,
    description: '同一种花色由1112345678999组成，再和一张该种花色的任意牌',
    exclusions: ['清一色', '门前清'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w9', 'w9'],
      melds: [],
      pair: 'w1'
    }
  },
  {
    name: '四杠',
    score: 88,
    description: '和牌中包含四个杠',
    exclusions: ['碰碰和'],
    exampleTiles: {
      concealed: [],
      melds: [
        { type: 'minggang', tiles: ['w1', 'w1', 'w1', 'w1'] },
        { type: 'minggang', tiles: ['w9', 'w9', 'w9', 'w9'] },
        { type: 'angang', tiles: ['t1', 't1', 't1', 't1'] },
        { type: 'angang', tiles: ['t9', 't9', 't9', 't9'] }
      ],
      pair: 'b1'
    }
  },

  // ==================== 64番 ====================
  {
    name: '清幺九',
    score: 64,
    description: '由序数牌一和九组成的和牌',
    exclusions: ['碰碰和', '三同刻', '双同刻', '无字', '全带幺', '幺九刻'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w9', 'w9', 'w9', 't1', 't1', 't1', 't9', 't9', 't9'],
      melds: [],
      pair: 'b1'
    }
  },
  {
    name: '小四喜',
    score: 64,
    description: '和牌中有三风刻加一对风牌',
    exclusions: ['三风刻'],
    exampleTiles: {
      concealed: ['east', 'east', 'east', 'south', 'south', 'south', 'west', 'west', 'west', 'north', 'north'],
      melds: [],
      pair: 'north'
    }
  },
  {
    name: '小三元',
    score: 64,
    description: '和牌中有两组箭刻加一对箭牌',
    exclusions: ['箭刻', '双箭刻'],
    exampleTiles: {
      concealed: ['zhong', 'zhong', 'zhong', 'fa', 'fa', 'fa', 'bai', 'bai'],
      melds: [],
      pair: 'zhong'
    }
  },
  {
    name: '字一色',
    score: 64,
    description: '全部由字牌组成的和牌',
    exclusions: ['碰碰和', '全带幺'],
    exampleTiles: {
      concealed: ['east', 'east', 'east', 'south', 'south', 'south', 'west', 'west', 'west', 'north', 'north', 'north'],
      melds: [],
      pair: 'zhong'
    }
  },
  {
    name: '四暗刻',
    score: 64,
    description: '和牌中有四个暗刻',
    exclusions: ['门前清', '碰碰和'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w9', 'w9', 'w9', 't5', 't5', 't5', 'b3', 'b3', 'b3'],
      melds: [],
      pair: 'b5'
    }
  },
  {
    name: '一色双龙会',
    score: 64,
    description: '同一种花色123789各两对，加一对5作将',
    exclusions: ['平和', '七对', '清一色', '老少副', '一般高'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w2', 'w2', 'w3', 'w3', 'w7', 'w7', 'w8', 'w8', 'w9', 'w9'],
      melds: [],
      pair: 'w5'
    }
  },

  // ==================== 48番 ====================
  {
    name: '一色四同顺',
    score: 48,
    description: '一种花色四副同顺（可混）',
    exclusions: ['一色三节高', '一般高', '四归一', '一色三同顺'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w1', 'w2', 'w3', 'w1', 'w2', 'w3', 'w1', 'w2', 'w3'],
      melds: [],
      pair: 't1'
    }
  },
  {
    name: '一色四节高',
    score: 48,
    description: '一种花色四副递增一节的碰碰和',
    exclusions: ['一色三同顺', '碰碰和', '一色三节高'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w2', 'w2', 'w2', 'w3', 'w3', 'w3', 'w4', 'w4', 'w4'],
      melds: [],
      pair: 't1'
    }
  },

  // ==================== 32番 ====================
  {
    name: '一色四步高',
    score: 32,
    description: '一种花色四副依次递增一或两的顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w3', 'w4', 'w5', 'w5', 'w6', 'w7', 'w7', 'w8', 'w9'],
      melds: [],
      pair: 't1'
    }
  },
  {
    name: '三杠',
    score: 32,
    description: '和牌中有三个杠',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1'],
      melds: [
        { type: 'minggang', tiles: ['w2', 'w2', 'w2', 'w2'] },
        { type: 'angang', tiles: ['w3', 'w3', 'w3', 'w3'] },
        { type: 'minggang', tiles: ['w4', 'w4', 'w4', 'w4'] }
      ],
      pair: 'w1'
    }
  },
  {
    name: '混幺九',
    score: 32,
    description: '由幺九牌和字牌组成的和牌',
    exclusions: ['碰碰和', '全带幺', '幺九刻'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w9', 'w9', 'w9', 't1', 't1', 't1', 't9', 't9', 't9'],
      melds: [],
      pair: 'east'
    }
  },

  // ==================== 24番 ====================
  {
    name: '七对',
    score: 24,
    description: '和牌由七个对子组成',
    exclusions: ['单钓将', '不求人', '门前清'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w3', 'w3', 'w5', 'w5', 't2', 't2', 't8', 't8', 'b4', 'b4', 'b6', 'b6'],
      melds: [],
      pair: null
    }
  },
  {
    name: '七星不靠',
    score: 24,
    description: '一种花色147、258、369各一张加七种字牌',
    exclusions: ['全不靠', '五门齐', '单钓将', '不求人', '门前清'],
    exampleTiles: {
      concealed: ['w1', 'w4', 'w7', 't2', 't5', 't8', 'b3', 'b6', 'b9', 'east', 'south', 'west', 'north', 'zhong'],
      melds: [],
      pair: null
    }
  },
  {
    name: '全双刻',
    score: 24,
    description: '全部由双数序数牌组成的和牌',
    exclusions: ['碰碰和', '断幺'],
    exampleTiles: {
      concealed: ['b2', 'b2', 'b2', 'b4', 'b4', 'b4', 'b6', 'b6', 'b6', 'b8', 'b8', 'b8'],
      melds: [],
      pair: 'b2'
    }
  },
  {
    name: '清一色',
    score: 24,
    description: '全部由一种花色的序数牌组成',
    exclusions: ['无字'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w1', 'w9'],
      melds: [],
      pair: 'w5'
    }
  },
  {
    name: '一色三同顺',
    score: 24,
    description: '一种花色三副相同的顺子',
    exclusions: ['一色三节高', '一般高'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w1', 'w2', 'w3', 'w1', 'w2', 'w3', 'w4', 'w5'],
      melds: [],
      pair: 't5'
    }
  },
  {
    name: '一色三节高',
    score: 24,
    description: '一种花色三副递增一节的碰碰和',
    exclusions: ['一色三同顺'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w2', 'w2', 'w2', 'w3', 'w3', 'w3', 't5', 't5'],
      melds: [],
      pair: 'b5'
    }
  },
  {
    name: '全大',
    score: 24,
    description: '全部由789序数牌组成',
    exclusions: ['无字', '大于五'],
    exampleTiles: {
      concealed: ['w7', 'w8', 'w9', 'w7', 'w8', 'w9', 't7', 't8', 't9', 'b7', 'b8'],
      melds: [],
      pair: 'w9'
    }
  },
  {
    name: '全中',
    score: 24,
    description: '全部由456序数牌组成',
    exclusions: ['无字', '断幺'],
    exampleTiles: {
      concealed: ['w4', 'w5', 'w6', 'w4', 'w5', 'w6', 't4', 't5', 't6', 'b4', 'b5'],
      melds: [],
      pair: 'w6'
    }
  },
  {
    name: '全小',
    score: 24,
    description: '全部由123序数牌组成',
    exclusions: ['无字'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w1', 'w2', 'w3', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'w3'
    }
  },

  // ==================== 16番 ====================
  {
    name: '清龙',
    score: 16,
    description: '同一种花色的123、456、789三副顺子',
    exclusions: ['老少副', '连六'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w1', 'w9'],
      melds: [],
      pair: 'w5'
    }
  },
  {
    name: '三色双龙会',
    score: 16,
    description: '万条饼各有123789顺子，加一对5作将',
    exclusions: ['喜相逢', '老少副', '无字', '平和'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w7', 'w8', 'w9', 't1', 't2', 't3', 't7', 't8', 't9'],
      melds: [],
      pair: 'b5'
    }
  },
  {
    name: '一色三步高',
    score: 16,
    description: '一种花色三副依次递增的顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w3', 'w4', 'w5', 'w5', 'w6', 'w7', 't1', 't1'],
      melds: [],
      pair: 'b5'
    }
  },
  {
    name: '三同刻',
    score: 16,
    description: '三种花色同一数字的刻子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 't1', 't1', 't1', 'b1', 'b1', 'b1', 'w5', 'w5'],
      melds: [],
      pair: 'w9'
    }
  },
  {
    name: '三暗刻',
    score: 16,
    description: '和牌中有三个暗刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w2', 'w2', 'w5', 'w5', 'w5', 'b3', 'b3', 'b3', 't7', 't7'],
      melds: [],
      pair: 'b5'
    }
  },
  {
    name: '全带五',
    score: 16,
    description: '每个面子和将都带5',
    exclusions: ['断幺'],
    exampleTiles: {
      concealed: ['w5', 'w5', 'w5', 't5', 't5', 't5', 'b5', 'b5', 'b5', 'w5', 't5'],
      melds: [],
      pair: 'b5'
    }
  },

  // ==================== 12番 ====================
  {
    name: '组合龙',
    score: 12,
    description: '万条饼各有147、258、369各一张',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w4', 'w7', 't2', 't5', 't8', 'b3', 'b6', 'b9', 'w5', 'w5'],
      melds: [],
      pair: 't5'
    }
  },
  {
    name: '大于五',
    score: 12,
    description: '全部由6-9序数牌组成',
    exclusions: ['无字'],
    exampleTiles: {
      concealed: ['w6', 'w7', 'w8', 'w6', 'w7', 'w8', 't6', 't7', 't8', 'b6', 'b7'],
      melds: [],
      pair: 'w9'
    }
  },
  {
    name: '小于五',
    score: 12,
    description: '全部由1-4序数牌组成',
    exclusions: ['无字'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w1', 'w2', 'w3', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'w4'
    }
  },
  {
    name: '三风刻',
    score: 12,
    description: '和牌中有三个风刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['east', 'east', 'east', 'south', 'south', 'south', 'west', 'west', 'west', 'w5', 'w5'],
      melds: [],
      pair: 'b5'
    }
  },

  // ==================== 8番 ====================
  {
    name: '花龙',
    score: 8,
    description: '万条饼各有一副花龙',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 't4', 't5', 't6', 'b7', 'b8', 'b9', 'w5', 'w5'],
      melds: [],
      pair: 't5'
    }
  },
  {
    name: '推不倒',
    score: 8,
    description: '全部由推不倒的牌组成（1234589饼、245689条、白板）',
    exclusions: ['缺一门'],
    exampleTiles: {
      concealed: ['b1', 'b1', 'b1', 'b2', 'b2', 'b2', 'b4', 'b4', 'b4', 't5', 't5'],
      melds: [],
      pair: 'bai'
    }
  },
  {
    name: '三色三同顺',
    score: 8,
    description: '三种花色各有相同顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w3', 'w4', 't2', 't3', 't4', 'b2', 'b3', 'b4', 'w5', 'w5'],
      melds: [],
      pair: 't5'
    }
  },
  {
    name: '三色三节高',
    score: 8,
    description: '三种花色各有三副递增一节的刻子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 't2', 't2', 't2', 'b3', 'b3', 'b3', 'w5', 'w5'],
      melds: [],
      pair: 't5'
    }
  },

  // ==================== 6番 ====================
  {
    name: '碰碰和',
    score: 6,
    description: '和牌由四个刻子（或杠）和一对将组成',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't3', 't3', 't3', 'b7', 'b7'],
      melds: [],
      pair: 'b5'
    }
  },
  {
    name: '混一色',
    score: 6,
    description: '一种花色序数牌加字牌组成的和牌',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'east', 'east'],
      melds: [],
      pair: 'w5'
    }
  },
  {
    name: '三色三步高',
    score: 6,
    description: '三种花色各有三副依次递增的顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 't3', 't4', 't5', 'b5', 'b6', 'b7', 'w5', 'w5'],
      melds: [],
      pair: 't5'
    }
  },
  {
    name: '五门齐',
    score: 6,
    description: '万条饼风箭三种花色齐全',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 't2', 't2', 't2', 'b3', 'b3', 'b3', 'east', 'south'],
      melds: [],
      pair: 'zhong'
    }
  },
  {
    name: '全求人',
    score: 6,
    description: '全部是吃上家和牌',
    exclusions: ['单钓将'],
    exampleTiles: {
      concealed: [],
      melds: [
        { type: 'chi', tiles: ['w2', 'w3', 'w4'] },
        { type: 'chi', tiles: ['t5', 't6', 't7'] },
        { type: 'pong', tiles: ['b1', 'b1', 'b1'] },
        { type: 'pong', tiles: ['b3', 'b3', 'b3'] }
      ],
      pair: 'b5'
    }
  },
  {
    name: '双箭刻',
    score: 6,
    description: '有两组箭刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['zhong', 'zhong', 'zhong', 'fa', 'fa', 'fa', 'w5', 'w5', 'w5', 't1', 't1'],
      melds: [],
      pair: 'b5'
    }
  },
  {
    name: '双暗杠',
    score: 6,
    description: '有两个暗杠',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w1', 't5', 't5', 't5', 't5'],
      melds: [],
      pair: 'b5'
    }
  },

  // ==================== 5番 ====================
  {
    name: '明暗杠',
    score: 5,
    description: '同时有明杠和暗杠',
    exclusions: ['明杠', '暗杠'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w1'],
      melds: [
        { type: 'minggang', tiles: ['t5', 't5', 't5', 't5'] }
      ],
      pair: 'b5'
    }
  },

  // ==================== 4番 ====================
  {
    name: '全带幺',
    score: 4,
    description: '每个面子和将都带幺九',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w9', 'w9', 'w9', 't1', 't1', 't1', 't9', 't9'],
      melds: [],
      pair: 'east'
    }
  },
  {
    name: '双明杠',
    score: 4,
    description: '有两个明杠',
    exclusions: [],
    exampleTiles: {
      concealed: ['w5', 'w5'],
      melds: [
        { type: 'minggang', tiles: ['w1', 'w1', 'w1', 'w1'] },
        { type: 'minggang', tiles: ['t5', 't5', 't5', 't5'] }
      ],
      pair: 'b5'
    }
  },

  // ==================== 2番 ====================
  {
    name: '箭刻',
    score: 2,
    description: '有一组箭刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['zhong', 'zhong', 'zhong', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    }
  },
  {
    name: '圈风刻',
    score: 2,
    description: '有一组圈风刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['east', 'east', 'east', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    }
  },
  {
    name: '门风刻',
    score: 2,
    description: '有一组门风刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['south', 'south', 'south', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    }
  },
  {
    name: '平和',
    score: 2,
    description: '全部由顺子组成，和牌有一对将',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't5', 't6', 't7', 'b2', 'b3'],
      melds: [],
      pair: 'b4'
    }
  },
  {
    name: '双暗刻',
    score: 2,
    description: '有两个暗刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w2', 'w2', 't5', 't5', 't5', 'w1', 'w2', 'w3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    }
  },
  {
    name: '暗杠',
    score: 2,
    description: '有一个暗杠',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    }
  },
  {
    name: '断幺',
    score: 2,
    description: '和牌中没有幺九牌',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w3', 'w4', 'w5', 'w6', 'w7', 't3', 't4', 't5', 'b4', 'b5'],
      melds: [],
      pair: 'b6'
    }
  },
  {
    name: '四归一',
    score: 2,
    description: '同一花色的牌集中在一处',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't5', 't5'],
      melds: [],
      pair: 'b5'
    }
  },
  {
    name: '双同刻',
    score: 2,
    description: '有两个同数刻子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w5', 'w5', 'w5', 't5', 't5', 't5', 'w1', 'w2', 'w3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    }
  },

  // ==================== 1番 ====================
  {
    name: '一般高',
    score: 1,
    description: '一种花色有两副相同的顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w3', 'w4', 'w2', 'w3', 'w4', 'w5', 'w5', 'w5', 't1', 't2'],
      melds: [],
      pair: 'b3'
    }
  },
  {
    name: '喜相逢',
    score: 1,
    description: '两种花色各有相同顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w3', 'w4', 't2', 't3', 't4', 'w5', 'w5', 'w5', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    }
  },
  {
    name: '连六',
    score: 1,
    description: '一种花色有两副相连的顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w2', 'w3', 'w4', 'w5', 'w5', 'w5', 't1', 't2'],
      melds: [],
      pair: 'b3'
    }
  },
  {
    name: '老少副',
    score: 1,
    description: '一种花色有123和789顺子各一副',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w7', 'w8', 'w9', 'w5', 'w5', 'w5', 't1', 't2'],
      melds: [],
      pair: 'b3'
    }
  },
  {
    name: '幺九刻',
    score: 1,
    description: '有一组幺九刻子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    }
  },
  {
    name: '明杠',
    score: 1,
    description: '有一个明杠',
    exclusions: [],
    exampleTiles: {
      concealed: ['w5', 'w5'],
      melds: [
        { type: 'minggang', tiles: ['w1', 'w1', 'w1', 'w1'] }
      ],
      pair: 'b5'
    }
  },
  {
    name: '缺一门',
    score: 1,
    description: '和牌中缺少一种花色',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 't1', 't2'],
      melds: [],
      pair: 't3'
    }
  },
  {
    name: '无字',
    score: 1,
    description: '和牌中没有字牌',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    }
  },

  // ==================== 特殊番型（条件番） ====================
  {
    name: '花牌',
    score: 1,
    description: '每有一张花牌加一番',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    },
    note: '花牌数量根据实际和牌时的花牌数计算'
  },
  {
    name: '自摸',
    score: 1,
    description: '自己摸牌和',
    exclusions: ['妙手回春', '杠上开花', '不求人'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    },
    note: '门清状态下自摸不计此番'
  },
  {
    name: '门前清',
    score: 2,
    description: '没有吃碰杠，门清点和',
    exclusions: ['单钓将'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    },
    note: '仅限点和时计此番'
  },
  {
    name: '不求人',
    score: 4,
    description: '没有吃碰杠，自摸和',
    exclusions: ['自摸', '门前清'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    }
  },
  {
    name: '妙手回春',
    score: 8,
    description: '自摸最后一张牌和牌',
    exclusions: ['自摸'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    },
    note: '仅限自摸时计此番'
  },
  {
    name: '杠上开花',
    score: 8,
    description: '杠后摸牌和',
    exclusions: ['自摸'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    },
    note: '杠后摸牌自摸和牌时计此番'
  },
  {
    name: '海底捞月',
    score: 8,
    description: '摸最后一张牌点和',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    },
    note: '仅限点和时计此番'
  },
  {
    name: '抢杠和',
    score: 8,
    description: '别人加杠时抢和',
    exclusions: ['和绝张'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    },
    note: '他人加杠时抢和'
  },
  {
    name: '和绝张',
    score: 4,
    description: '和牌池中最后一张牌',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    },
    note: '别人打出的最后一张牌'
  },
  {
    name: '边张',
    score: 1,
    description: '和123或789的3、7',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    },
    note: '与单钓将、坎张不同时计'
  },
  {
    name: '坎张',
    score: 1,
    description: '和两张之间的牌',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w3', 'w4', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    },
    note: '与边张、单钓将不同时计'
  },
  {
    name: '单钓将',
    score: 1,
    description: '钓将和牌',
    exclusions: ['门前清'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't1', 't2', 't3', 'b1', 'b2'],
      melds: [],
      pair: 'b3'
    },
    note: '与边张、坎张不同时计'
  },
  {
    name: '十三幺',
    score: 88,
    description: '由十三种幺九牌各一张，再和其中任意一张',
    exclusions: ['五门齐', '单钓将', '不求人', '门前清'],
    exampleTiles: {
      concealed: ['w1', 'w9', 't1', 't9', 'b1', 'b9', 'east', 'south', 'west', 'north', 'zhong', 'fa', 'bai'],
      melds: [],
      pair: null
    }
  },
  {
    name: '连七对',
    score: 88,
    description: '一种花色相连的七个对子',
    exclusions: ['清一色', '单钓将', '不求人', '门前清', '七对', '平和', '一般高', '连六'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w2', 'w2', 'w3', 'w3', 'w4', 'w4', 'w5', 'w5', 'w6', 'w6', 'w7', 'w7'],
      melds: [],
      pair: null
    }
  },
  {
    name: '全不靠',
    score: 12,
    description: '一种花色147、258、369各一张加字牌',
    exclusions: ['五门齐', '单钓将', '不求人', '门前清'],
    exampleTiles: {
      concealed: ['w1', 'w4', 'w7', 't2', 't5', 't8', 'b3', 'b6', 'b9', 'east', 'south', 'west', 'north', 'zhong'],
      melds: [],
      pair: null
    }
  },
  {
    name: '全带幺',
    score: 4,
    description: '每个面子和将都带幺九',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w9', 'w9', 'w9', 't1', 't1', 't1', 't9', 't9'],
      melds: [],
      pair: 'east'
    }
  },
  {
    name: '无番和',
    score: 8,
    description: '和牌后数不出任何番种',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w3', 'w4', 'w5', 'w6', 'w7', 't3', 't4', 't5', 'b4', 'b5'],
      melds: [],
      pair: 'b6'
    },
    note: '和牌后数不出任何番种时计此番'
  }
];

// 按番数分组的番型
export const FAN_BY_SCORE = {
  88: FAN_DATA.filter(f => f.score === 88),
  64: FAN_DATA.filter(f => f.score === 64),
  48: FAN_DATA.filter(f => f.score === 48),
  32: FAN_DATA.filter(f => f.score === 32),
  24: FAN_DATA.filter(f => f.score === 24),
  16: FAN_DATA.filter(f => f.score === 16),
  12: FAN_DATA.filter(f => f.score === 12),
  8: FAN_DATA.filter(f => f.score === 8),
  6: FAN_DATA.filter(f => f.score === 6),
  5: FAN_DATA.filter(f => f.score === 5),
  4: FAN_DATA.filter(f => f.score === 4),
  2: FAN_DATA.filter(f => f.score === 2),
  1: FAN_DATA.filter(f => f.score === 1)
};

// 获取番型名称列表
export const FAN_NAMES = FAN_DATA.map(f => f.name);

export default FAN_DATA;
