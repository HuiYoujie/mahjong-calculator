// 国标麻将81番型数据

export const FAN_DATA = [
  // ==================== 88番 ====================
  {
    name: '大四喜',
    score: 88,
    description: '由东南西北四风刻组成的和牌',
    exclusions: ['圈风刻', '门风刻', '三风刻', '碰碰和', '幺九刻'],
    exampleTiles: {
      concealed: ['east', 'east', 'east', 'south', 'south', 'south', 'west', 'west', 'west', 'north', 'north', 'north', 'b1', 'b1'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '大三元',
    score: 88,
    description: '和牌中有中发白三组箭刻',
    exclusions: ['箭刻', '双箭刻'],
    exampleTiles: {
      concealed: ['zhong', 'zhong', 'zhong', 'fa', 'fa', 'fa', 'bai', 'bai', 'bai', 'b1', 'b2', 'b3', 'w1', 'w1'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '绿一色',
    score: 88,
    description: '由23468条和发财组成的和牌',
    exclusions: ['混一色'],
    exampleTiles: {
      concealed: ['t2', 't2', 't2', 't3', 't3', 't3', 't4', 't4', 't6', 't6', 't6', 't8', 't8', 'fa',  'fa'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '九莲宝灯',
    score: 88,
    description: '同一种花色由1112345678999组成，再和一张该种花色的任意牌',
    exclusions: ['清一色', '门前清', '幺九刻'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w9', 'w9', 'w1'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '四杠',
    score: 88,
    description: '和牌中包含四个杠',
    exclusions: ['碰碰和', '三杠', '双明杠', '明暗杠', '暗杠', '明杠'],
    exampleTiles: {
      concealed: ['b1', 'b1'],
      melds: [
        { type: 'minggang', tiles: ['w2', 'w2', 'w2', 'w2'] },
        { type: 'minggang', tiles: ['w8', 'w8', 'w8', 'w8'] },
        { type: 'angang', tiles: ['t3', 't3', 't3', 't3'] },
        { type: 'angang', tiles: ['b3', 'b3', 'b3', 'b3'] }
      ],
      pair: ''
    }
  },
  {
    name: '连七对',
    score: 88,
    description: '一种花色相连的七个对子',
    exclusions: ['七对', '清一色', '单钓将', '不求人', '门前清', '平和', '一般高', '连六'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w2', 'w2', 'w3', 'w3', 'w4', 'w4', 'w5', 'w5', 'w6', 'w6', 'w7', 'w7'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '十三幺',
    score: 88,
    description: '由十三种幺九牌各一张，再和其中任意一张',
    exclusions: ['五门齐', '单钓将', '不求人', '门前清'],
    exampleTiles: {
      concealed: ['w1', 'w9', 't1', 't9', 'b1', 'b9', 'east', 'south', 'west', 'north', 'zhong', 'fa', 'bai', 'w1'],
      melds: [],
    }
  },

  // ==================== 64番 ====================
  {
    name: '清幺九',
    score: 64,
    description: '由序数牌一和九组成的和牌',
    exclusions: ['混幺九', '碰碰和', '双同刻', '无字', '全带幺', '幺九刻'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w9', 'w9', 'w9', 't1', 't1', 't1', 't9', 't9', 't9', 'b1', 'b1'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '小四喜',
    score: 64,
    description: '和牌中有三风刻加一对风牌',
    exclusions: ['三风刻'],
    exampleTiles: {
      concealed: ['east', 'east', 'east', 'south', 'south', 'south', 'west', 'west', 'west', 'north', 'north', 'b2', 'b2', 'b2'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '小三元',
    score: 64,
    description: '和牌中有两组箭刻加一对箭牌',
    exclusions: ['箭刻', '双箭刻'],
    exampleTiles: {
      concealed: ['zhong', 'zhong', 'zhong', 'fa', 'fa', 'fa', 'bai', 'bai', 't1', 't1', 't1', 'b1', 'b2', 'b3'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '字一色',
    score: 64,
    description: '全部由字牌组成的和牌',
    exclusions: ['碰碰和', '全带幺', '幺九刻'],
    exampleTiles: {
      concealed: ['east', 'east', 'east', 'south', 'south', 'south', 'west', 'west', 'west', 'zhong', 'zhong', 'zhong', 'fa', 'fa'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '四暗刻',
    score: 64,
    description: '和牌中有四个暗刻',
    exclusions: ['三暗刻', '双暗刻', '碰碰和', '门前清'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w9', 'w9', 'w9', 't5', 't5', 't5', 'b3', 'b3', 'b3', 'b5', 'b5'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '一色双龙会',
    score: 64,
    description: '同一种花色123789各两对，加一对5作将',
    exclusions: ['七对', '清一色', '平和', '老少副', '一般高', '无字'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w2', 'w2', 'w3', 'w3', 'w5', 'w5', 'w7', 'w7', 'w8', 'w8', 'w9', 'w9'],
      melds: [],
      pair: ''
    }
  },

  // ==================== 48番 ====================
  {
    name: '一色四同顺',
    score: 48,
    description: '一种花色四副同顺（可混）',
    exclusions: ['一色三节高', '一般高', '四归一', '一色三同顺'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w1', 'w2', 'w3', 'w1', 'w2', 'w3', 'w1', 'w2', 'w3', 't6', 't6'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '一色四节高',
    score: 48,
    description: '一种花色四副递增一节的碰碰和',
    exclusions: ['一色三同顺', '碰碰和', '一色三节高'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w2', 'w2', 'w2', 'w3', 'w3', 'w3', 'w4', 'w4', 'w4', 't6', 't6'],
      melds: [],
      pair: ''
    }
  },

  // ==================== 32番 ====================
  {
    name: '一色四步高',
    score: 32,
    description: '一种花色四副依次递增一或两的顺子',
    exclusions: ['连六', '老少副'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w3', 'w4', 'w5', 'w5', 'w6', 'w7', 'w7', 'w8', 'w9', 't1', 't1'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三杠',
    score: 32,
    description: '和牌中有三个杠',
    exclusions: [],
    exampleTiles: {
      concealed: ['t1', 't1', 't2', 't2', 't2'],
      melds: [
        { type: 'minggang', tiles: ['w2', 'w2', 'w2', 'w2'] },
        { type: 'angang', tiles: ['w3', 'w3', 'w3', 'w3'] },
        { type: 'minggang', tiles: ['w4', 'w4', 'w4', 'w4'] }
      ],
      pair: ''
    }
  },
  {
    name: '混幺九',
    score: 32,
    description: '由幺九牌和字牌组成的和牌',
    exclusions: ['碰碰和', '全带幺', '幺九刻'],
    exampleTiles: {
      concealed: ['east', 'east', 'w1', 'w1', 'w1', 'w9', 'w9', 'w9', 't1', 't1', 't1', 't9', 't9', 't9'],
      melds: [],
      pair: ''
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
      pair: ''
    }
  },
  {
    name: '七星不靠',
    score: 24,
    description: '三种花色的147、258、369和七种字牌中的14张',
    exclusions: ['全不靠', '五门齐', '单钓将', '不求人', '门前清'],
    exampleTiles: {
      concealed: ['east', 'south', 'west', 'north', 'zhong', 'w1', 'w4', 'w7', 't2', 't5', 't8', 'b3', 'b6', 'b9'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '全双刻',
    score: 24,
    description: '全部由双数序数牌组成的和牌',
    exclusions: ['碰碰和', '断幺'],
    exampleTiles: {
      concealed: ['w2', 'w2', 'w2', 't4', 't4', 't4', 'b4', 'b4', 'b4', 'b6', 'b6', 'b6', 'b8', 'b8'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '清一色',
    score: 24,
    description: '全部由一种花色的序数牌组成',
    exclusions: ['无字'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w6', 'w7', 'w8', 'w9', 'w9', 'w9', 'w4', 'w4'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '一色三同顺',
    score: 24,
    description: '一种花色三副相同的顺子',
    exclusions: ['一色三节高', '一般高'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w1', 'w2', 'w3', 'w1', 'w2', 'w3', 'w5', 'w6', 'w7', 't1', 't1'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '一色三节高',
    score: 24,
    description: '一种花色三副递增一节的碰碰和',
    exclusions: ['一色三同顺'],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w2', 'w2', 'w2', 'w3', 'w3', 'w3', 't5', 't5', 't5', 'b1', 'b1'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '全大',
    score: 24,
    description: '全部由789序数牌组成',
    exclusions: ['无字', '大于五'],
    exampleTiles: {
      concealed: ['w9', 'w9', 'w9', 'w7', 'w8', 'w9', 't7', 't8', 't9', 'b7', 'b8', 'b9', 'b9', 'b9'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '全中',
    score: 24,
    description: '全部由456序数牌组成',
    exclusions: ['无字', '断幺'],
    exampleTiles: {
      concealed: ['w4', 'w4', 'w4', 'w4', 'w5', 'w6', 't4', 't5', 't6', 'b4', 'b5', 'b6', 'b6', 'b6'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '全小',
    score: 24,
    description: '全部由123序数牌组成',
    exclusions: ['无字'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w1', 'w2', 'w3', 't1', 't2', 't3', 'b1', 'b1', 'b1', 'b2', 'b2'],
      melds: [],
      pair: ''
    }
  },

  // ==================== 16番 ====================
  {
    name: '清龙',
    score: 16,
    description: '同一种花色的123、456、789三副顺子',
    exclusions: ['连六', '老少副'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 't1', 't1', 't1', 't9', 't9'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三色双龙会',
    score: 16,
    description: '万条饼各有123789顺子，加一对5作将',
    exclusions: ['喜相逢', '老少副', '无字', '平和'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w7', 'w8', 'w9', 't1', 't2', 't3', 't7', 't8', 't9', 'b5', 'b5'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '一色三步高',
    score: 16,
    description: '一种花色三副依次递增的顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w3', 'w4', 'w5', 'w5', 'w6', 'w7', 't1', 't1', 't1', 'b1', 'b1'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三同刻',
    score: 16,
    description: '三种花色同一数字的刻子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w2', 'w2', 't2', 't2', 't2', 'b2', 'b2', 'b2', 'b5', 'b5', 'b5', 'b9', 'b9'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三暗刻',
    score: 16,
    description: '和牌中有三个暗刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w2', 'w2', 'w5', 'w5', 'w5', 't7', 't7', 't7', 'b1', 'b2', 'b3', 'b4', 'b4'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '全带五',
    score: 16,
    description: '每个面子和将都带5',
    exclusions: ['断幺'],
    exampleTiles: {
      concealed: ['w4', 'w5', 'w6', 'w5', 'w6', 'w7', 't4', 't5', 't6', 'b5', 'b5', 'b5', 't5', 't5'],
      melds: [],
      pair: ''
    }
  },

  // ==================== 12番 ====================
  {
    name: '全不靠',
    score: 12,
    description: '三种花色的147、258、369和七种字牌中的14张，两边都不齐',
    exclusions: ['五门齐', '单钓将', '不求人', '门前清'],
    exampleTiles: {
      concealed: ['east', 'south', 'west', 'north', 'zhong', 'fa', 'w4', 'w7', 't2', 't5', 't8', 'b3', 'b6', 'b9',],
      melds: [],
      pair: ''
    }
  },
  {
    name: '组合龙',
    score: 12,
    description: '万条饼各有147、258、369组成顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w4', 'w7', 't2', 't5', 't8', 'b3', 'b6', 'b9', 'w5', 'w5', 'w5', 't5', 't5'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '大于五',
    score: 12,
    description: '全部由6-9序数牌组成',
    exclusions: ['无字'],
    exampleTiles: {
      concealed: ['w6', 'w7', 'w8', 'w6', 'w7', 'w8', 't6', 't7', 't8', 'b6', 'b7', 'b8', 'b9', 'b9'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '小于五',
    score: 12,
    description: '全部由1-4序数牌组成',
    exclusions: ['无字'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w1', 'w2', 'w3', 't1', 't2', 't3', 'b1', 'b2', 'b3', 'b4', 'b4'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三风刻',
    score: 12,
    description: '和牌中有三个风刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['east', 'east', 'east', 'south', 'south', 'south', 'west', 'west', 'west', 'w1', 'w1', 'w1', 't5', 't5'],
      melds: [],
      pair: ''
    }
  },

  // ==================== 8番 ====================
  {
    name: '花龙',
    score: 8,
    description: '万条饼各有一副花龙',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 't4', 't5', 't6', 'b7', 'b8', 'b9', 'w5', 'w5', 'w5', 't6', 't6'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '推不倒',
    score: 8,
    description: '全部由推不倒的牌组成（1234589饼、245689条、白板）',
    exclusions: ['缺一门'],
    exampleTiles: {
      concealed: ['b1', 'b1', 'b1', 'b2', 'b2', 'b2', 'b4', 'b4', 'b4', 't5', 't5', 't5', 'bai', 'bai'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三色三同顺',
    score: 8,
    description: '三种花色各有相同顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w3', 'w4', 't2', 't3', 't4', 'b2', 'b3', 'b4', 'w5', 'w5', 'w5', 'b6', 'b6'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三色三节高',
    score: 8,
    description: '三种花色各有三副递增一节的刻子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 't2', 't2', 't2', 'b3', 'b3', 'b3', 'w5', 'w5', 'w5', 'b6', 'b6'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '无番和',
    score: 8,
    description: '和牌后数没有番种',
    exclusions: [],
    exampleTiles: {
      concealed: ['east', 'east', 'w2', 'w3', 'w4', 't4', 't5', 't6', 'b7', 'b8', 'b9'],
      melds: [{
        type: 'pong',
        tiles: ['b2', 'b2', 'b2']
      }],
      pair: ''
    },
  },
  {
    name: '妙手回春',
    score: 8,
    description: '自摸最后一张牌和牌',
    exclusions: ['自摸'],
  },
  {
    name: '海底捞月',
    score: 8,
    description: '最后一张牌点和',
    exclusions: [],
  },
  {
    name: '杠上开花',
    score: 8,
    description: '杠后摸牌自摸和牌',
    exclusions: ['自摸'],
  },
  {
    name: '抢杠和',
    score: 8,
    description: '别人加杠时抢和',
    exclusions: ['和绝张'],
  },

  // ==================== 6番 ====================
  {
    name: '碰碰和',
    score: 6,
    description: '和牌由四个刻子（或杠）和一对将组成',
    exclusions: [],
    exampleTiles: {
      concealed: ['bai', 'bai'],
      melds: [
        { type: 'pong', tiles: ['w2', 'w2', 'w2'] },
        { type: 'pong', tiles: ['t5', 't5', 't5'] },
        { type: 'pong', tiles: ['t7', 't7', 't7'] },
        { type: 'pong', tiles: ['b3', 'b3', 'b3'] }
      ],
      pair: ''
    }
  },
  {
    name: '混一色',
    score: 6,
    description: '一种花色序数牌加字牌组成的和牌',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w6', 'w7', 'w8', 'w9', 'w9', 'w9', 'east', 'east'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三色三步高',
    score: 6,
    description: '三种花色各有三副依次递增的顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 't3', 't4', 't5', 'b5', 'b6', 'b7', 'w5', 'w5', 'w5', 'b7', 'b7'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '五门齐',
    score: 6,
    description: '万条饼风箭三种花色齐全',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 't2', 't2', 't2', 'b3', 'b3', 'b3', 'east', 'east', 'east', 'zhong', 'zhong'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '全求人',
    score: 6,
    description: '全部是吃上家和牌',
    exclusions: ['单钓将'],
    exampleTiles: {
      concealed: ['b5', 'b5'],
      melds: [
        { type: 'chi', tiles: ['w2', 'w3', 'w4'] },
        { type: 'chi', tiles: ['t5', 't6', 't7'] },
        { type: 'pong', tiles: ['b1', 'b1', 'b1'] },
        { type: 'pong', tiles: ['b3', 'b3', 'b3'] }
      ],
      pair: ''
    }
  },
  {
    name: '双箭刻',
    score: 6,
    description: '有两组箭刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['zhong', 'zhong', 'zhong', 'fa', 'fa', 'fa', 'w5', 'w5', 'w5', 't1', 't1', 't1', 'b5', 'b5'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '双暗杠',
    score: 6,
    description: '有两个暗杠',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't5', 't5'],
      melds: [
        { type: 'angang', tiles: ['t1', 't1', 't1', 't1'] },
        { type: 'angang', tiles: ['b2', 'b2', 'b2', 'b2'] },
    
      ],
      pair: ''
    }
  },

  // ==================== 5番 ====================
  {
    name: '明暗杠',
    score: 5,
    description: '同时有明杠和暗杠',
    exclusions: ['明杠', '暗杠'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't5', 't5'],
      melds: [
        { type: 'minggang', tiles: ['t5', 't5', 't5', 't5'] },
        { type: 'angang', tiles: ['b2', 'b2', 'b2', 'b2'] }
      ],
      pair: ''
    }
  },

  // ==================== 4番 ====================
  {
    name: '全带幺',
    score: 4,
    description: '每个面子和将都带幺九',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w7', 'w8', 'w9', 't1', 't1', 't1', 't9', 't9', 't9' , 'east', 'east'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '双明杠',
    score: 4,
    description: '有两个明杠',
    exclusions: [],
    exampleTiles: {
      concealed: ['w5', 'w5', 'w5', 't2', 't3', 't4', 'b5', 'b5'],
      melds: [
        { type: 'minggang', tiles: ['w1', 'w1', 'w1', 'w1'] },
        { type: 'minggang', tiles: ['t5', 't5', 't5', 't5'] }
      ],
      pair: ''
    }
  },
  {
    name: '不求人',
    score: 4,
    description: '没有吃碰杠，自摸和',
    exclusions: ['自摸', '门前清'],
    exampleTiles: {
      concealed: ['east', 'east', 'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't1', 't2', 't3', 'b1', 'b2', 'b3'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '和绝张',
    score: 4,
    description: '和牌池中最后一张牌',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2', 'b3', 'east', 'east'],
      melds: [],
      pair: ''
    },
  },

  // ==================== 2番 ====================
  {
    name: '箭刻',
    score: 2,
    description: '有一组箭刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['zhong', 'zhong', 'zhong', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2', 'b3', 'b9', 'b9'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '圈风刻',
    score: 2,
    description: '有一组圈风刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['east', 'east', 'east', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2', 'b3', 'b9', 'b9'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '门风刻',
    score: 2,
    description: '有一组门风刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['south', 'south', 'south', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b2', 'b3', 'b9', 'b9'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '平和',
    score: 2,
    description: '全部由顺子组成，和牌有一对将',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't5', 't6', 't7', 'b2', 'b3', 'b4', 'b9', 'b9'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '双暗刻',
    score: 2,
    description: '有两个暗刻',
    exclusions: [],
    exampleTiles: {
      concealed: ['zhong', 'zhong', 'zhong', 'fa', 'fa', 'fa', 'w2', 'w2', 'w2', 't5', 't5', 't5', 'b1', 'b1'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '暗杠',
    score: 2,
    description: '有一个暗杠',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b1'],
      melds: [
        { type: 'angang', tiles: ['b2', 'b2', 'b2', 'b2'] }
      ],
      pair: ''
    }
  },
  {
    name: '断幺',
    score: 2,
    description: '和牌中没有幺九牌',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w3', 'w4', 'w5', 'w6', 'w7', 't3', 't4', 't5', 'b4', 'b5', 'b6', 'b7', 'b7'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '四归一',
    score: 2,
    description: '同一花色的牌集中在一处',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w1', 'w1', 'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't5', 't5', 't5', 'b5', 'b5'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '双同刻',
    score: 2,
    description: '有两个同数刻子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w5', 'w5', 'w5', 't5', 't5', 't5', 'w1', 'w2', 'w3', 'b1', 'b2', 'b3', 'b9', 'b9'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '门前清',
    score: 2,
    description: '没有吃碰杠，门清点和',
    exclusions: ['单钓将'],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't1', 't2', 't3', 'b1', 'b2', 'b3', 'east', 'east'],
      melds: [],
      pair: ''
    },
  },

  // ==================== 1番 ====================
  {
    name: '一般高',
    score: 1,
    description: '一种花色有两副相同的顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w3', 'w4', 'w2', 'w3', 'w4', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b5', 'b5'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '喜相逢',
    score: 1,
    description: '两种花色各有相同顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w2', 'w3', 'w4', 't2', 't3', 't4', 'w5', 'w5', 'w5', 'b1', 'b2', 't3', 'b5', 'b5'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '连六',
    score: 1,
    description: '一种花色有两副相连的顺子',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 't5', 't5', 't5', 't7', 't8', 't9', 'b1', 'b1'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '老少副',
    score: 1,
    description: '一种花色有123和789顺子各一副',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w7', 'w8', 'w9', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b3', 'b3'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '幺九刻',
    score: 1,
    description: '有一组幺九刻子或非圈风门风的字组成的刻或杠',
    exclusions: [],
  },
  {
    name: '明杠',
    score: 1,
    description: '有一个明杠，补杠也是明杠',
    exclusions: [],
  },
  {
    name: '缺一门',
    score: 1,
    description: '和牌中缺少一种花色数字牌',
    exclusions: [],
  },
  {
    name: '无字',
    score: 1,
    description: '和牌中没有字牌',
    exclusions: [],
  },
  {
    name: '自摸',
    score: 1,
    description: '自己摸牌和，门清状态下自摸计不求人',
    exclusions: [],
  },
  {
    name: '边张',
    score: 1,
    description: '和123或789的3、7，与单钓将、坎张不同时计',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b1', 'b8', 'b9', 'b7'],
      melds: [],
      pair: ''
    },
  },
  {
    name: '坎张',
    score: 1,
    description: '和两张之间的牌，与边张、单钓将不同时计',
    exclusions: [],
    exampleTiles: {
      concealed: ['w1', 'w2', 'w3', 'w5', 'w5', 'w5', 't1', 't2', 't3', 'b1', 'b1', 'b7', 'b9', 'b8'],
      melds: [],
      pair: ''
    },
  },
  {
    name: '单钓将',
    score: 1,
    description: '单钓将和牌，和且和这一张牌，与边张、坎张不同时计',
    exclusions: [],
  },
  {
    name: '花牌',
    score: 1,
    description: '每有一张花牌加一番',
  },
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
