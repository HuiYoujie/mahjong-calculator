// 国标麻将81番型数据

export const FAN_DATA = [
  // ==================== 88番 ====================
  {
    name: '大四喜',
    score: 88,
    description: '由东南西北四风刻组成的和牌',
    exclusions: ['圈风刻', '门风刻', '三风刻', '碰碰和', '幺九刻'],
    exampleTiles: {
      concealed: ['E', 'E', 'E', 'S', 'S', 'S', 'W', 'W', 'W', 'N', 'N', 'N', '1p', '1p'],
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
      concealed: ['C', 'C', 'C', 'F', 'F', 'F', 'P', 'P', 'P', '1p', '2p', '3p', '1m', '1m'],
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
      concealed: ['2s', '2s', '2s', '3s', '3s', '3s', '4s', '4s', '6s', '6s', '6s', '8s', '8s', 'F',  'F'],
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
      concealed: ['1m', '1m', '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', '9m', '9m', '1m'],
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
      concealed: ['1p', '1p'],
      melds: [
        { type: 'minggang', tiles: ['2m', '2m', '2m', '2m'] },
        { type: 'minggang', tiles: ['8m', '8m', '8m', '8m'] },
        { type: 'angang', tiles: ['3s', '3s', '3s', '3s'] },
        { type: 'angang', tiles: ['3p', '3p', '3p', '3p'] }
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
      concealed: ['1m', '1m', '2m', '2m', '3m', '3m', '4m', '4m', '5m', '5m', '6m', '6m', '7m', '7m'],
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
      concealed: ['1m', '9m', '1s', '9s', '1p', '9p', 'E', 'S', 'W', 'N', 'C', 'F', 'P', '1m'],
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
      concealed: ['1m', '1m', '1m', '9m', '9m', '9m', '1s', '1s', '1s', '9s', '9s', '9s', '1p', '1p'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '小四喜',
    score: 64,
    description: '和牌中有三风刻加一对风牌',
    exclusions: ['三风刻', '幺九刻'],
    exampleTiles: {
      concealed: ['E', 'E', 'E', 'S', 'S', 'S', 'W', 'W', 'W', 'N', 'N', '2p', '2p', '2p'],
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
      concealed: ['C', 'C', 'C', 'F', 'F', 'F', 'P', 'P', '1s', '1s', '1s', '1p', '2p', '3p'],
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
      concealed: ['E', 'E', 'E', 'S', 'S', 'S', 'W', 'W', 'W', 'C', 'C', 'C', 'F', 'F'],
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
      concealed: ['1m', '1m', '1m', '9m', '9m', '9m', '5s', '5s', '5s', '3p', '3p', '3p', '5p', '5p'],
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
      concealed: ['1m', '1m', '2m', '2m', '3m', '3m', '5m', '5m', '7m', '7m', '8m', '8m', '9m', '9m'],
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
      concealed: ['1m', '2m', '3m', '1m', '2m', '3m', '1m', '2m', '3m', '1m', '2m', '3m', '6s', '6s'],
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
      concealed: ['1m', '1m', '1m', '2m', '2m', '2m', '3m', '3m', '3m', '4m', '4m', '4m', '6s', '6s'],
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
      concealed: ['1m', '2m', '3m', '3m', '4m', '5m', '5m', '6m', '7m', '7m', '8m', '9m', '1s', '1s'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三杠',
    score: 32,
    description: '和牌中有三个杠',
    exclusions: ['明暗杠'],
    exampleTiles: {
      concealed: ['1s', '1s', '2s', '2s', '2s'],
      melds: [
        { type: 'minggang', tiles: ['2m', '2m', '2m', '2m'] },
        { type: 'angang', tiles: ['3m', '3m', '3m', '3m'] },
        { type: 'minggang', tiles: ['4m', '4m', '4m', '4m'] }
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
      concealed: ['E', 'E', '1m', '1m', '1m', '9m', '9m', '9m', '1s', '1s', '1s', '9s', '9s', '9s'],
      melds: [],
      pair: ''
    }
  },

  // ==================== 24番 ====================
  {
    name: '七对',
    score: 24,
    description: '和牌由七个对子组成',
    exclusions: ['不求人', '门前清', '单钓将'],
    exampleTiles: {
      concealed: ['1m', '1m', '3m', '3m', '5m', '5m', '2s', '2s', '8s', '8s', '4p', '4p', '6p', '6p'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '七星不靠',
    score: 24,
    description: '三种花色的147、258、369和七种字牌中的14张',
    exclusions: ['全不靠', '五门齐', '不求人', '门前清', '单钓将'],
    exampleTiles: {
      concealed: ['E', 'S', 'W', 'N', 'C', '1m', '4m', '7m', '2s', '5s', '8s', '3p', '6p', '9p'],
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
      concealed: ['2m', '2m', '2m', '4s', '4s', '4s', '4p', '4p', '4p', '6p', '6p', '6p', '8p', '8p'],
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
      concealed: ['1m', '2m', '3m', '4m', '5m', '6m', '6m', '7m', '8m', '9m', '9m', '9m', '4m', '4m'],
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
      concealed: ['1m', '2m', '3m', '1m', '2m', '3m', '1m', '2m', '3m', '5m', '6m', '7m', '1s', '1s'],
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
      concealed: ['1m', '1m', '1m', '2m', '2m', '2m', '3m', '3m', '3m', '5s', '5s', '5s', '1p', '1p'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '全大',
    score: 24,
    description: '全部由789序数牌组成',
    exclusions: ['大于五', '无字'],
    exampleTiles: {
      concealed: ['9m', '9m', '9m', '7m', '8m', '9m', '7s', '8s', '9s', '7p', '8p', '9p', '9p', '9p'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '全中',
    score: 24,
    description: '全部由456序数牌组成',
    exclusions: ['断幺', '无字'],
    exampleTiles: {
      concealed: ['4m', '4m', '4m', '4m', '5m', '6m', '4s', '5s', '6s', '4p', '5p', '6p', '6p', '6p'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '全小',
    score: 24,
    description: '全部由123序数牌组成',
    exclusions: ['小于五', '无字'],
    exampleTiles: {
      concealed: ['1m', '2m', '3m', '1m', '2m', '3m', '1s', '2s', '3s', '1p', '1p', '1p', '2p', '2p'],
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
      concealed: ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', '1s', '1s', '1s', '9s', '9s'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三色双龙会',
    score: 16,
    description: '万条饼各有123789顺子，加一对5作将',
    exclusions: ['平和', '喜相逢', '老少副', '无字'],
    exampleTiles: {
      concealed: ['1m', '2m', '3m', '7m', '8m', '9m', '1s', '2s', '3s', '7s', '8s', '9s', '5p', '5p'],
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
      concealed: ['1m', '2m', '3m', '3m', '4m', '5m', '5m', '6m', '7m', '1s', '1s', '1s', '1p', '1p'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三同刻',
    score: 16,
    description: '三种花色同一数字的刻子',
    exclusions: ['双同刻'],
    exampleTiles: {
      concealed: ['2m', '2m', '2m', '2s', '2s', '2s', '2p', '2p', '2p', '5p', '5p', '5p', '9p', '9p'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '三暗刻',
    score: 16,
    description: '和牌中有三个暗刻',
    exclusions: ['双暗刻'],
    exampleTiles: {
      concealed: ['2m', '2m', '2m', '5m', '5m', '5m', '7s', '7s', '7s', '1p', '2p', '3p', '4p', '4p'],
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
      concealed: ['4m', '5m', '6m', '5m', '6m', '7m', '4s', '5s', '6s', '5p', '5p', '5p', '5s', '5s'],
      melds: [],
      pair: ''
    }
  },

  // ==================== 12番 ====================
  {
    name: '全不靠',
    score: 12,
    description: '三种花色的147、258、369和七种字牌中的14张，两边都不齐',
    exclusions: ['五门齐', '不求人', '门前清', '单钓将'],
    exampleTiles: {
      concealed: ['E', 'S', 'W', 'N', 'C', 'F', '4m', '7m', '2s', '5s', '8s', '3p', '6p', '9p',],
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
      concealed: ['1m', '4m', '7m', '2s', '5s', '8s', '3p', '6p', '9p', '5m', '5m', '5m', '5s', '5s'],
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
      concealed: ['6m', '7m', '8m', '6m', '7m', '8m', '6s', '7s', '8s', '6p', '7p', '8p', '9p', '9p'],
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
      concealed: ['1m', '2m', '3m', '1m', '2m', '3m', '1s', '2s', '3s', '1p', '2p', '3p', '4p', '4p'],
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
      concealed: ['E', 'E', 'E', 'S', 'S', 'S', 'W', 'W', 'W', '1m', '1m', '1m', '5s', '5s'],
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
      concealed: ['1m', '2m', '3m', '4s', '5s', '6s', '7p', '8p', '9p', '5m', '5m', '5m', '6s', '6s'],
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
      concealed: ['1p', '1p', '1p', '2p', '2p', '2p', '4p', '4p', '4p', '5s', '5s', '5s', 'P', 'P'],
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
      concealed: ['2m', '3m', '4m', '2s', '3s', '4s', '2p', '3p', '4p', '5m', '5m', '5m', '6p', '6p'],
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
      concealed: ['1m', '1m', '1m', '2s', '2s', '2s', '3p', '3p', '3p', '5m', '5m', '5m', '6p', '6p'],
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
      concealed: ['E', 'E', '2m', '3m', '4m', '4s', '5s', '6s', '7p', '8p', '9p'],
      melds: [{
        type: 'pong',
        tiles: ['2p', '2p', '2p']
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
      concealed: ['P', 'P'],
      melds: [
        { type: 'pong', tiles: ['2m', '2m', '2m'] },
        { type: 'pong', tiles: ['5s', '5s', '5s'] },
        { type: 'pong', tiles: ['7s', '7s', '7s'] },
        { type: 'pong', tiles: ['3p', '3p', '3p'] }
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
      concealed: ['1m', '2m', '3m', '4m', '5m', '6m', '6m', '7m', '8m', '9m', '9m', '9m', 'E', 'E'],
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
      concealed: ['1m', '2m', '3m', '3s', '4s', '5s', '5p', '6p', '7p', '5m', '5m', '5m', '7p', '7p'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '五门齐',
    score: 6,
    description: '万条饼风箭三种花色齐全',
    exclusions: ['幺九刻'],
    exampleTiles: {
      concealed: ['1m', '1m', '1m', '2s', '2s', '2s', '3p', '3p', '3p', 'E', 'E', 'E', 'C', 'C'],
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
      concealed: ['5p', '5p'],
      melds: [
        { type: 'chi', tiles: ['2m', '3m', '4m'] },
        { type: 'chi', tiles: ['5s', '6s', '7s'] },
        { type: 'pong', tiles: ['1p', '1p', '1p'] },
        { type: 'pong', tiles: ['3p', '3p', '3p'] }
      ],
      pair: ''
    }
  },
  {
    name: '双箭刻',
    score: 6,
    description: '有两组箭刻',
    exclusions: ['箭刻'],
    exampleTiles: {
      concealed: ['C', 'C', 'C', 'F', 'F', 'F', '5m', '5m', '5m', '1s', '1s', '1s', '5p', '5p'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '双暗杠',
    score: 6,
    description: '有两个暗杠',
    exclusions: ['暗杠', '双暗刻'],
    exampleTiles: {
      concealed: ['1m', '2m', '3m', '4m', '5m', '6m', '5s', '5s'],
      melds: [
        { type: 'angang', tiles: ['1s', '1s', '1s', '1s'] },
        { type: 'angang', tiles: ['2p', '2p', '2p', '2p'] },
    
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
      concealed: ['1m', '2m', '3m', '4m', '5m', '6m', '5s', '5s'],
      melds: [
        { type: 'minggang', tiles: ['5s', '5s', '5s', '5s'] },
        { type: 'angang', tiles: ['2p', '2p', '2p', '2p'] }
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
      concealed: ['1m', '2m', '3m', '7m', '8m', '9m', '1s', '1s', '1s', '9s', '9s', '9s' , 'E', 'E'],
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
      concealed: ['5m', '5m', '5m', '2s', '3s', '4s', '5p', '5p'],
      melds: [
        { type: 'minggang', tiles: ['1m', '1m', '1m', '1m'] },
        { type: 'minggang', tiles: ['5s', '5s', '5s', '5s'] }
      ],
      pair: ''
    }
  },
  {
    name: '不求人',
    score: 4,
    description: '没有吃碰杠，自摸和',
    exclusions: ['门前清', '自摸'],
    exampleTiles: {
      concealed: ['E', 'E', '1m', '2m', '3m', '4m', '5m', '6m', '1s', '2s', '3s', '1p', '2p', '3p'],
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
      concealed: ['1m', '1m', '1m', '5m', '5m', '5m', '1s', '2s', '3s', '1p', '2p', '3p', 'E', 'E'],
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
      concealed: ['C', 'C', 'C', '5m', '5m', '5m', '1s', '2s', '3s', '1p', '2p', '3p', '9p', '9p'],
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
      concealed: ['E', 'E', 'E', '5m', '5m', '5m', '1s', '2s', '3s', '1p', '2p', '3p', '9p', '9p'],
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
      concealed: ['S', 'S', 'S', '5m', '5m', '5m', '1s', '2s', '3s', '1p', '2p', '3p', '9p', '9p'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '平和',
    score: 2,
    description: '全部由顺子组成，和牌有一对将',
    exclusions: ['无字'],
    exampleTiles: {
      concealed: ['1m', '2m', '3m', '4m', '5m', '6m', '5s', '6s', '7s', '2p', '3p', '4p', '9p', '9p'],
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
      concealed: ['C', 'C', 'C', 'F', 'F', 'F', '2m', '2m', '2m', '5s', '5s', '5s', '1p', '1p'],
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
      concealed: ['1m', '1m', '1m', '5m', '5m', '5m', '1s', '2s', '3s', '1p', '1p'],
      melds: [
        { type: 'angang', tiles: ['2p', '2p', '2p', '2p'] }
      ],
      pair: ''
    }
  },
  {
    name: '断幺',
    score: 2,
    description: '和牌中没有幺九牌',
    exclusions: ['无字'],
    exampleTiles: {
      concealed: ['2m', '3m', '4m', '5m', '6m', '7m', '3s', '4s', '5s', '4p', '5p', '6p', '7p', '7p'],
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
      concealed: ['1m', '1m', '1m', '1m', '2m', '3m', '4m', '5m', '6m', '5s', '5s', '5s', '5p', '5p'],
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
      concealed: ['5m', '5m', '5m', '5s', '5s', '5s', '1m', '2m', '3m', '1p', '2p', '3p', '9p', '9p'],
      melds: [],
      pair: ''
    }
  },
  {
    name: '门前清',
    score: 2,
    description: '没有吃碰杠，门清点和',
    exclusions: [],
    exampleTiles: {
      concealed: ['1m', '2m', '3m', '4m', '5m', '6m', '1s', '2s', '3s', '1p', '2p', '3p', 'E', 'E'],
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
      concealed: ['2m', '3m', '4m', '2m', '3m', '4m', '5m', '5m', '5m', '1s', '2s', '3s', '5p', '5p'],
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
      concealed: ['2m', '3m', '4m', '2s', '3s', '4s', '5m', '5m', '5m', '1p', '2p', '3s', '5p', '5p'],
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
      concealed: ['1m', '2m', '3m', '4m', '5m', '6m', '5s', '5s', '5s', '7s', '8s', '9s', '1p', '1p'],
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
      concealed: ['1m', '2m', '3m', '7m', '8m', '9m', '5m', '5m', '5m', '1s', '2s', '3s', '3p', '3p'],
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
      concealed: ['1m', '2m', '3m', '5m', '5m', '5m', '1s', '2s', '3s', '1p', '1p', '8p', '9p', '7p'],
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
      concealed: ['1m', '2m', '3m', '5m', '5m', '5m', '1s', '2s', '3s', '1p', '1p', '7p', '9p', '8p'],
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
