var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// gb-mahjong-js/lib/core/constants.js
var require_constants = __commonJS({
  "gb-mahjong-js/lib/core/constants.js"(exports, module) {
    "use strict";
    var TILE_INVALID = 0;
    var TILE_1m = 1;
    var TILE_2m = 2;
    var TILE_3m = 3;
    var TILE_4m = 4;
    var TILE_5m = 5;
    var TILE_6m = 6;
    var TILE_7m = 7;
    var TILE_8m = 8;
    var TILE_9m = 9;
    var TILE_1s = 10;
    var TILE_2s = 11;
    var TILE_3s = 12;
    var TILE_4s = 13;
    var TILE_5s = 14;
    var TILE_6s = 15;
    var TILE_7s = 16;
    var TILE_8s = 17;
    var TILE_9s = 18;
    var TILE_1p = 19;
    var TILE_2p = 20;
    var TILE_3p = 21;
    var TILE_4p = 22;
    var TILE_5p = 23;
    var TILE_6p = 24;
    var TILE_7p = 25;
    var TILE_8p = 26;
    var TILE_9p = 27;
    var TILE_E = 28;
    var TILE_S = 29;
    var TILE_W = 30;
    var TILE_N = 31;
    var TILE_C = 32;
    var TILE_F = 33;
    var TILE_P = 34;
    var TILE_MEI = 35;
    var TILE_LAN = 36;
    var TILE_ZHU = 37;
    var TILE_JU = 38;
    var TILE_CHU = 39;
    var TILE_XIA = 40;
    var TILE_QIU = 41;
    var TILE_DONG = 42;
    var TILE_BAIDA = 43;
    var TILE_MAJIANG = 44;
    var TILE_SIZE = 43;
    var SUIT_INVALID = 0;
    var SUIT_WAN = 1;
    var SUIT_TIAO = 2;
    var SUIT_BING = 3;
    var SUIT_HUA = 4;
    var SUIT_FENG = 5;
    var SUIT_JIAN = 6;
    var RANK_INVALID = 0;
    var RANK_1 = 1;
    var RANK_2 = 2;
    var RANK_3 = 3;
    var RANK_4 = 4;
    var RANK_5 = 5;
    var RANK_6 = 6;
    var RANK_7 = 7;
    var RANK_8 = 8;
    var RANK_9 = 9;
    var TILE_CHAR_INVALID = " ";
    var TILE_CHAR_WAN = "m";
    var TILE_CHAR_TIAO = "s";
    var TILE_CHAR_BING = "p";
    var TILE_CHAR_E = "E";
    var TILE_CHAR_S = "S";
    var TILE_CHAR_W = "W";
    var TILE_CHAR_N = "N";
    var TILE_CHAR_C = "C";
    var TILE_CHAR_F = "F";
    var TILE_CHAR_P = "P";
    var TILE_CHAR_MEI = "a";
    var TILE_CHAR_LAN = "b";
    var TILE_CHAR_ZHU = "c";
    var TILE_CHAR_JU = "d";
    var TILE_CHAR_CHU = "e";
    var TILE_CHAR_XIA = "f";
    var TILE_CHAR_QIU = "g";
    var TILE_CHAR_DONG = "h";
    var PACK_TYPE_INVALID = 0;
    var PACK_TYPE_SHUNZI = 1;
    var PACK_TYPE_KEZI = 2;
    var PACK_TYPE_GANG = 3;
    var PACK_TYPE_JIANG = 4;
    var PACK_TYPE_ZUHELONG = 5;
    var BITMAP = (tile) => 1n << BigInt(tile);
    var TILES_UTF8 = [
      "",
      "\u{1F007}",
      "\u{1F008}",
      "\u{1F009}",
      "\u{1F00A}",
      "\u{1F00B}",
      "\u{1F00C}",
      "\u{1F00D}",
      "\u{1F00E}",
      "\u{1F00F}",
      "\u{1F010}",
      "\u{1F011}",
      "\u{1F012}",
      "\u{1F013}",
      "\u{1F014}",
      "\u{1F015}",
      "\u{1F016}",
      "\u{1F017}",
      "\u{1F018}",
      "\u{1F019}",
      "\u{1F01A}",
      "\u{1F01B}",
      "\u{1F01C}",
      "\u{1F01D}",
      "\u{1F01E}",
      "\u{1F01F}",
      "\u{1F020}",
      "\u{1F021}",
      "\u{1F000}",
      "\u{1F001}",
      "\u{1F002}",
      "\u{1F003}",
      "\u{1F004}",
      "\u{1F005}",
      "\u{1F006}",
      "\u{1F022}",
      "\u{1F023}",
      "\u{1F024}",
      "\u{1F025}",
      "\u{1F026}",
      "\u{1F027}",
      "\u{1F028}",
      "\u{1F029}",
      "\u{1F02A}",
      "\u{1F02B}"
    ];
    var TILES_SUIT = [
      SUIT_INVALID,
      SUIT_WAN,
      SUIT_WAN,
      SUIT_WAN,
      SUIT_WAN,
      SUIT_WAN,
      SUIT_WAN,
      SUIT_WAN,
      SUIT_WAN,
      SUIT_WAN,
      SUIT_TIAO,
      SUIT_TIAO,
      SUIT_TIAO,
      SUIT_TIAO,
      SUIT_TIAO,
      SUIT_TIAO,
      SUIT_TIAO,
      SUIT_TIAO,
      SUIT_TIAO,
      SUIT_BING,
      SUIT_BING,
      SUIT_BING,
      SUIT_BING,
      SUIT_BING,
      SUIT_BING,
      SUIT_BING,
      SUIT_BING,
      SUIT_BING,
      SUIT_FENG,
      SUIT_FENG,
      SUIT_FENG,
      SUIT_FENG,
      SUIT_JIAN,
      SUIT_JIAN,
      SUIT_JIAN,
      SUIT_HUA,
      SUIT_HUA,
      SUIT_HUA,
      SUIT_HUA,
      SUIT_HUA,
      SUIT_HUA,
      SUIT_HUA,
      SUIT_HUA,
      SUIT_INVALID,
      SUIT_INVALID
    ];
    var TILES_RANK = [
      RANK_INVALID,
      RANK_1,
      RANK_2,
      RANK_3,
      RANK_4,
      RANK_5,
      RANK_6,
      RANK_7,
      RANK_8,
      RANK_9,
      RANK_1,
      RANK_2,
      RANK_3,
      RANK_4,
      RANK_5,
      RANK_6,
      RANK_7,
      RANK_8,
      RANK_9,
      RANK_1,
      RANK_2,
      RANK_3,
      RANK_4,
      RANK_5,
      RANK_6,
      RANK_7,
      RANK_8,
      RANK_9,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID,
      RANK_INVALID
    ];
    var TILES_SUIT_CHAR = [
      TILE_CHAR_INVALID,
      TILE_CHAR_WAN,
      TILE_CHAR_WAN,
      TILE_CHAR_WAN,
      TILE_CHAR_WAN,
      TILE_CHAR_WAN,
      TILE_CHAR_WAN,
      TILE_CHAR_WAN,
      TILE_CHAR_WAN,
      TILE_CHAR_WAN,
      TILE_CHAR_TIAO,
      TILE_CHAR_TIAO,
      TILE_CHAR_TIAO,
      TILE_CHAR_TIAO,
      TILE_CHAR_TIAO,
      TILE_CHAR_TIAO,
      TILE_CHAR_TIAO,
      TILE_CHAR_TIAO,
      TILE_CHAR_TIAO,
      TILE_CHAR_BING,
      TILE_CHAR_BING,
      TILE_CHAR_BING,
      TILE_CHAR_BING,
      TILE_CHAR_BING,
      TILE_CHAR_BING,
      TILE_CHAR_BING,
      TILE_CHAR_BING,
      TILE_CHAR_BING,
      TILE_CHAR_E,
      TILE_CHAR_S,
      TILE_CHAR_W,
      TILE_CHAR_N,
      TILE_CHAR_C,
      TILE_CHAR_F,
      TILE_CHAR_P,
      TILE_CHAR_MEI,
      TILE_CHAR_LAN,
      TILE_CHAR_ZHU,
      TILE_CHAR_JU,
      TILE_CHAR_CHU,
      TILE_CHAR_XIA,
      TILE_CHAR_QIU,
      TILE_CHAR_DONG,
      TILE_CHAR_INVALID,
      TILE_CHAR_INVALID
    ];
    var TILE_TYPE_BITMAP_WAN = BITMAP(TILE_1m) | BITMAP(TILE_2m) | BITMAP(TILE_3m) | BITMAP(TILE_4m) | BITMAP(TILE_5m) | BITMAP(TILE_6m) | BITMAP(TILE_7m) | BITMAP(TILE_8m) | BITMAP(TILE_9m);
    var TILE_TYPE_BITMAP_TIAO = BITMAP(TILE_1s) | BITMAP(TILE_2s) | BITMAP(TILE_3s) | BITMAP(TILE_4s) | BITMAP(TILE_5s) | BITMAP(TILE_6s) | BITMAP(TILE_7s) | BITMAP(TILE_8s) | BITMAP(TILE_9s);
    var TILE_TYPE_BITMAP_BING = BITMAP(TILE_1p) | BITMAP(TILE_2p) | BITMAP(TILE_3p) | BITMAP(TILE_4p) | BITMAP(TILE_5p) | BITMAP(TILE_6p) | BITMAP(TILE_7p) | BITMAP(TILE_8p) | BITMAP(TILE_9p);
    var TILE_TYPE_BITMAP_SHU = TILE_TYPE_BITMAP_WAN | TILE_TYPE_BITMAP_TIAO | TILE_TYPE_BITMAP_BING;
    var TILE_TYPE_BITMAP_FENG = BITMAP(TILE_E) | BITMAP(TILE_S) | BITMAP(TILE_W) | BITMAP(TILE_N);
    var TILE_TYPE_BITMAP_JIAN = BITMAP(TILE_C) | BITMAP(TILE_F) | BITMAP(TILE_P);
    var TILE_TYPE_BITMAP_ZI = TILE_TYPE_BITMAP_FENG | TILE_TYPE_BITMAP_JIAN;
    var TILE_TYPE_BITMAP_MEANINGFUL = TILE_TYPE_BITMAP_SHU | TILE_TYPE_BITMAP_ZI;
    var TILE_TYPE_BITMAP_YAOJIU = TILE_TYPE_BITMAP_ZI | BITMAP(TILE_1m) | BITMAP(TILE_9m) | BITMAP(TILE_1s) | BITMAP(TILE_9s) | BITMAP(TILE_1p) | BITMAP(TILE_9p);
    var TILE_TYPE_BITMAP_LV = BITMAP(TILE_2s) | BITMAP(TILE_3s) | BITMAP(TILE_4s) | BITMAP(TILE_6s) | BITMAP(TILE_8s) | BITMAP(TILE_F);
    var TILE_TYPE_BITMAP_QUANDA = BITMAP(TILE_7m) | BITMAP(TILE_8m) | BITMAP(TILE_9m) | BITMAP(TILE_7s) | BITMAP(TILE_8s) | BITMAP(TILE_9s) | BITMAP(TILE_7p) | BITMAP(TILE_8p) | BITMAP(TILE_9p);
    var TILE_TYPE_BITMAP_QUANZHONG = BITMAP(TILE_4m) | BITMAP(TILE_5m) | BITMAP(TILE_6m) | BITMAP(TILE_4s) | BITMAP(TILE_5s) | BITMAP(TILE_6s) | BITMAP(TILE_4p) | BITMAP(TILE_5p) | BITMAP(TILE_6p);
    var TILE_TYPE_BITMAP_QUANXIAO = BITMAP(TILE_1m) | BITMAP(TILE_2m) | BITMAP(TILE_3m) | BITMAP(TILE_1s) | BITMAP(TILE_2s) | BITMAP(TILE_3s) | BITMAP(TILE_1p) | BITMAP(TILE_2p) | BITMAP(TILE_3p);
    var TILE_TYPE_BITMAP_DAYUWU = TILE_TYPE_BITMAP_QUANDA | BITMAP(TILE_6m) | BITMAP(TILE_6s) | BITMAP(TILE_6p);
    var TILE_TYPE_BITMAP_XIAOYUWU = TILE_TYPE_BITMAP_QUANXIAO | BITMAP(TILE_4m) | BITMAP(TILE_4s) | BITMAP(TILE_4p);
    var TILE_TYPE_BITMAP_TUIBUDAO = BITMAP(TILE_2s) | BITMAP(TILE_4s) | BITMAP(TILE_5s) | BITMAP(TILE_6s) | BITMAP(TILE_8s) | BITMAP(TILE_9s) | BITMAP(TILE_1p) | BITMAP(TILE_2p) | BITMAP(TILE_3p) | BITMAP(TILE_4p) | BITMAP(TILE_5p) | BITMAP(TILE_8p) | BITMAP(TILE_9p) | BITMAP(TILE_P);
    var ZuhelongBitmap = [
      0n,
      BITMAP(TILE_1m) | BITMAP(TILE_4m) | BITMAP(TILE_7m) | BITMAP(TILE_2s) | BITMAP(TILE_5s) | BITMAP(TILE_8s) | BITMAP(TILE_3p) | BITMAP(TILE_6p) | BITMAP(TILE_9p),
      BITMAP(TILE_1m) | BITMAP(TILE_4m) | BITMAP(TILE_7m) | BITMAP(TILE_3s) | BITMAP(TILE_6s) | BITMAP(TILE_9s) | BITMAP(TILE_2p) | BITMAP(TILE_5p) | BITMAP(TILE_8p),
      BITMAP(TILE_2m) | BITMAP(TILE_5m) | BITMAP(TILE_8m) | BITMAP(TILE_1s) | BITMAP(TILE_4s) | BITMAP(TILE_7s) | BITMAP(TILE_3p) | BITMAP(TILE_6p) | BITMAP(TILE_9p),
      BITMAP(TILE_2m) | BITMAP(TILE_5m) | BITMAP(TILE_8m) | BITMAP(TILE_3s) | BITMAP(TILE_6s) | BITMAP(TILE_9s) | BITMAP(TILE_1p) | BITMAP(TILE_4p) | BITMAP(TILE_7p),
      BITMAP(TILE_3m) | BITMAP(TILE_6m) | BITMAP(TILE_9m) | BITMAP(TILE_1s) | BITMAP(TILE_4s) | BITMAP(TILE_7s) | BITMAP(TILE_2p) | BITMAP(TILE_5p) | BITMAP(TILE_8p),
      BITMAP(TILE_3m) | BITMAP(TILE_6m) | BITMAP(TILE_9m) | BITMAP(TILE_2s) | BITMAP(TILE_5s) | BITMAP(TILE_8s) | BITMAP(TILE_1p) | BITMAP(TILE_4p) | BITMAP(TILE_7p)
    ];
    var FAN_SCORE = [
      0,
      88,
      88,
      88,
      88,
      88,
      88,
      88,
      64,
      64,
      64,
      64,
      64,
      64,
      48,
      48,
      32,
      32,
      32,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      16,
      16,
      16,
      16,
      16,
      16,
      12,
      12,
      12,
      12,
      12,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      4,
      4,
      4,
      4,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      5
    ];
    var FAN_NAME = [
      "\u65E0\u6548\u756A\u79CD",
      "\u5927\u56DB\u559C",
      "\u5927\u4E09\u5143",
      "\u7EFF\u4E00\u8272",
      "\u4E5D\u83B2\u5B9D\u706F",
      "\u56DB\u6760",
      "\u8FDE\u4E03\u5BF9",
      "\u5341\u4E09\u5E7A",
      "\u6E05\u5E7A\u4E5D",
      "\u5C0F\u56DB\u559C",
      "\u5C0F\u4E09\u5143",
      "\u5B57\u4E00\u8272",
      "\u56DB\u6697\u523B",
      "\u4E00\u8272\u53CC\u9F99\u4F1A",
      "\u4E00\u8272\u56DB\u540C\u987A",
      "\u4E00\u8272\u56DB\u8282\u9AD8",
      "\u4E00\u8272\u56DB\u6B65\u9AD8",
      "\u4E09\u6760",
      "\u6DF7\u5E7A\u4E5D",
      "\u4E03\u5BF9",
      "\u4E03\u661F\u4E0D\u9760",
      "\u5168\u53CC\u523B",
      "\u6E05\u4E00\u8272",
      "\u4E00\u8272\u4E09\u540C\u987A",
      "\u4E00\u8272\u4E09\u8282\u9AD8",
      "\u5168\u5927",
      "\u5168\u4E2D",
      "\u5168\u5C0F",
      "\u6E05\u9F99",
      "\u4E09\u8272\u53CC\u9F99\u4F1A",
      "\u4E00\u8272\u4E09\u6B65\u9AD8",
      "\u5168\u5E26\u4E94",
      "\u4E09\u540C\u523B",
      "\u4E09\u6697\u523B",
      "\u5168\u4E0D\u9760",
      "\u7EC4\u5408\u9F99",
      "\u5927\u4E8E\u4E94",
      "\u5C0F\u4E8E\u4E94",
      "\u4E09\u98CE\u523B",
      "\u82B1\u9F99",
      "\u63A8\u4E0D\u5012",
      "\u4E09\u8272\u4E09\u540C\u987A",
      "\u4E09\u8272\u4E09\u8282\u9AD8",
      "\u65E0\u756A\u548C",
      "\u5999\u624B\u56DE\u6625",
      "\u6D77\u5E95\u635E\u6708",
      "\u6760\u4E0A\u5F00\u82B1",
      "\u62A2\u6760\u548C",
      "\u78B0\u78B0\u548C",
      "\u6DF7\u4E00\u8272",
      "\u4E09\u8272\u4E09\u6B65\u9AD8",
      "\u4E94\u95E8\u9F50",
      "\u5168\u6C42\u4EBA",
      "\u53CC\u6697\u6760",
      "\u53CC\u7BAD\u523B",
      "\u5168\u5E26\u5E7A",
      "\u4E0D\u6C42\u4EBA",
      "\u53CC\u660E\u6760",
      "\u548C\u7EDD\u5F20",
      "\u7BAD\u523B",
      "\u5708\u98CE\u523B",
      "\u95E8\u98CE\u523B",
      "\u95E8\u524D\u6E05",
      "\u5E73\u548C",
      "\u56DB\u5F52\u4E00",
      "\u53CC\u540C\u523B",
      "\u53CC\u6697\u523B",
      "\u6697\u6760",
      "\u65AD\u5E7A",
      "\u4E00\u822C\u9AD8",
      "\u559C\u76F8\u9022",
      "\u8FDE\u516D",
      "\u8001\u5C11\u526F",
      "\u5E7A\u4E5D\u523B",
      "\u660E\u6760",
      "\u7F3A\u4E00\u95E8",
      "\u65E0\u5B57",
      "\u8FB9\u5F20",
      "\u574E\u5F20",
      "\u5355\u9493\u5C06",
      "\u81EA\u6478",
      "\u82B1\u724C",
      "\u660E\u6697\u6760"
    ];
    var fanNames = [
      "FAN_INVALID",
      "FAN_DASIXI",
      "FAN_DASANYUAN",
      "FAN_LVYISE",
      "FAN_JIULIANBAODENG",
      "FAN_SIGANG",
      "FAN_LIANQIDUI",
      "FAN_SHISANYAO",
      "FAN_QINGYAOJIU",
      "FAN_XIAOSIXI",
      "FAN_XIAOSANYUAN",
      "FAN_ZIYISE",
      "FAN_SIANKE",
      "FAN_YISESHUANGLONGHUI",
      "FAN_YISESITONGSHUN",
      "FAN_YISESIJIEGAO",
      "FAN_YISESIBUGAO",
      "FAN_SANGANG",
      "FAN_HUNYAOJIU",
      "FAN_QIDUI",
      "FAN_QIXINGBUKAO",
      "FAN_QUANSHUANGKE",
      "FAN_QINGYISE",
      "FAN_YISESANTONGSHUN",
      "FAN_YISESANJIEGAO",
      "FAN_QUANDA",
      "FAN_QUANZHONG",
      "FAN_QUANXIAO",
      "FAN_QINGLONG",
      "FAN_SANSESHUANGLONGHUI",
      "FAN_YISESANBUGAO",
      "FAN_QUANDAIWU",
      "FAN_SANTONGKE",
      "FAN_SANANKE",
      "FAN_QUANBUKAO",
      "FAN_ZUHELONG",
      "FAN_DAYUWU",
      "FAN_XIAOYUWU",
      "FAN_SANFENGKE",
      "FAN_HUALONG",
      "FAN_TUIBUDAO",
      "FAN_SANSESANTONGSHUN",
      "FAN_SANSESANJIEGAO",
      "FAN_WUFANHU",
      "FAN_MIAOSHOUHUICHUN",
      "FAN_HAIDILAOYUE",
      "FAN_GANGSHANGKAIHUA",
      "FAN_QIANGGANGHU",
      "FAN_PENGPENGHU",
      "FAN_HUNYISE",
      "FAN_SANSESANBUGAO",
      "FAN_WUMENQI",
      "FAN_QUANQIUREN",
      "FAN_SHUANGANGANG",
      "FAN_SHUANGJIANKE",
      "FAN_QUANDAIYAO",
      "FAN_BUQIUREN",
      "FAN_SHUANGMINGGANG",
      "FAN_HUJUEZHANG",
      "FAN_JIANKE",
      "FAN_QUANFENGKE",
      "FAN_MENFENGKE",
      "FAN_MENQIANQING",
      "FAN_PINGHU",
      "FAN_SIGUIYI",
      "FAN_SHUANGTONGKE",
      "FAN_SHUANGANKE",
      "FAN_ANGANG",
      "FAN_DUANYAO",
      "FAN_YIBANGAO",
      "FAN_XIXIANGFENG",
      "FAN_LIANLIU",
      "FAN_LAOSHAOFU",
      "FAN_YAOJIUKE",
      "FAN_MINGGANG",
      "FAN_QUEYIMEN",
      "FAN_WUZI",
      "FAN_BIANZHANG",
      "FAN_KANZHANG",
      "FAN_DANDIAOJIANG",
      "FAN_ZIMO",
      "FAN_HUAPAI",
      "FAN_MINGANGANG",
      "FAN_SIZE"
    ];
    var exported = {
      TILE_INVALID,
      TILE_1m,
      TILE_2m,
      TILE_3m,
      TILE_4m,
      TILE_5m,
      TILE_6m,
      TILE_7m,
      TILE_8m,
      TILE_9m,
      TILE_1s,
      TILE_2s,
      TILE_3s,
      TILE_4s,
      TILE_5s,
      TILE_6s,
      TILE_7s,
      TILE_8s,
      TILE_9s,
      TILE_1p,
      TILE_2p,
      TILE_3p,
      TILE_4p,
      TILE_5p,
      TILE_6p,
      TILE_7p,
      TILE_8p,
      TILE_9p,
      TILE_E,
      TILE_S,
      TILE_W,
      TILE_N,
      TILE_C,
      TILE_F,
      TILE_P,
      TILE_MEI,
      TILE_LAN,
      TILE_ZHU,
      TILE_JU,
      TILE_CHU,
      TILE_XIA,
      TILE_QIU,
      TILE_DONG,
      TILE_BAIDA,
      TILE_MAJIANG,
      TILE_SIZE,
      SUIT_INVALID,
      SUIT_WAN,
      SUIT_TIAO,
      SUIT_BING,
      SUIT_HUA,
      SUIT_FENG,
      SUIT_JIAN,
      RANK_INVALID,
      RANK_1,
      RANK_2,
      RANK_3,
      RANK_4,
      RANK_5,
      RANK_6,
      RANK_7,
      RANK_8,
      RANK_9,
      TILE_CHAR_INVALID,
      TILE_CHAR_WAN,
      TILE_CHAR_TIAO,
      TILE_CHAR_BING,
      TILE_CHAR_E,
      TILE_CHAR_S,
      TILE_CHAR_W,
      TILE_CHAR_N,
      TILE_CHAR_C,
      TILE_CHAR_F,
      TILE_CHAR_P,
      TILE_CHAR_MEI,
      TILE_CHAR_LAN,
      TILE_CHAR_ZHU,
      TILE_CHAR_JU,
      TILE_CHAR_CHU,
      TILE_CHAR_XIA,
      TILE_CHAR_QIU,
      TILE_CHAR_DONG,
      PACK_TYPE_INVALID,
      PACK_TYPE_SHUNZI,
      PACK_TYPE_KEZI,
      PACK_TYPE_GANG,
      PACK_TYPE_JIANG,
      PACK_TYPE_ZUHELONG,
      BITMAP,
      TILES_UTF8,
      TILES_SUIT,
      TILES_RANK,
      TILES_SUIT_CHAR,
      TILE_TYPE_BITMAP_WAN,
      TILE_TYPE_BITMAP_TIAO,
      TILE_TYPE_BITMAP_BING,
      TILE_TYPE_BITMAP_SHU,
      TILE_TYPE_BITMAP_FENG,
      TILE_TYPE_BITMAP_JIAN,
      TILE_TYPE_BITMAP_ZI,
      TILE_TYPE_BITMAP_MEANINGFUL,
      TILE_TYPE_BITMAP_YAOJIU,
      TILE_TYPE_BITMAP_LV,
      TILE_TYPE_BITMAP_QUANDA,
      TILE_TYPE_BITMAP_QUANZHONG,
      TILE_TYPE_BITMAP_QUANXIAO,
      TILE_TYPE_BITMAP_DAYUWU,
      TILE_TYPE_BITMAP_XIAOYUWU,
      TILE_TYPE_BITMAP_TUIBUDAO,
      ZuhelongBitmap,
      FAN_SCORE,
      FAN_NAME
    };
    fanNames.forEach((name, index) => {
      exported[name] = index;
    });
    module.exports = exported;
  }
});

// gb-mahjong-js/lib/core/tile.js
var require_tile = __commonJS({
  "gb-mahjong-js/lib/core/tile.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var Tile = class {
      constructor(tile = constants.TILE_INVALID, drawflag = 0) {
        this._tile = tile;
        this._drawflag = drawflag;
      }
      assign(tile) {
        this._tile = tile;
        this.ResetDrawflag();
        return this;
      }
      clone() {
        return new Tile(this._tile, this._drawflag);
      }
      equals(tile) {
        if (tile instanceof Tile) {
          return this._tile === tile._tile;
        }
        return this._tile === tile;
      }
      Pred() {
        return new Tile(this._tile - 1);
      }
      Succ() {
        return new Tile(this._tile + 1);
      }
      GetTileUsingOffset(offset) {
        return new Tile(this._tile + offset);
      }
      Suit() {
        return constants.TILES_SUIT[this._tile];
      }
      Rank() {
        return constants.TILES_RANK[this._tile];
      }
      IsShu() {
        return (this.GetBitmap() & constants.TILE_TYPE_BITMAP_SHU) === this.GetBitmap();
      }
      IsZi() {
        return (this.GetBitmap() & constants.TILE_TYPE_BITMAP_ZI) === this.GetBitmap();
      }
      IsFeng() {
        return (this.GetBitmap() & constants.TILE_TYPE_BITMAP_FENG) === this.GetBitmap();
      }
      IsJian() {
        return (this.GetBitmap() & constants.TILE_TYPE_BITMAP_JIAN) === this.GetBitmap();
      }
      IsYaojiu() {
        return (this.GetBitmap() & constants.TILE_TYPE_BITMAP_YAOJIU) === this.GetBitmap();
      }
      IsHua() {
        return this.Suit() === constants.SUIT_HUA;
      }
      UTF8() {
        return constants.TILES_UTF8[this._tile];
      }
      RankChar() {
        return String(this.Rank());
      }
      SuitChar() {
        return constants.TILES_SUIT_CHAR[this._tile];
      }
      TileChar() {
        return this.IsShu() ? this.RankChar() : this.SuitChar();
      }
      SetZimo() {
        this._drawflag = 1;
      }
      SetChonghu() {
        this._drawflag = 2;
      }
      ResetDrawflag() {
        this._drawflag = 0;
      }
      IsZimo() {
        return this._drawflag === 1;
      }
      IsChonghu() {
        return this._drawflag === 2;
      }
      GetId() {
        return this._tile;
      }
      GetBitmap() {
        return 1n << BigInt(this._tile);
      }
      GetDrawflag() {
        return this._drawflag;
      }
      valueOf() {
        return this._tile;
      }
    };
    module.exports = Tile;
  }
});

// gb-mahjong-js/lib/core/pack.js
var require_pack = __commonJS({
  "gb-mahjong-js/lib/core/pack.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var Tile = require_tile();
    var Pack = class {
      constructor(type = constants.PACK_TYPE_INVALID, tile = new Tile(), zuhelongType = 0, offer = 0) {
        this._type = type;
        this._tile = tile;
        this._zuhelong_type = zuhelongType;
        this._offer = offer;
      }
      IsValid() {
        return this._type !== constants.PACK_TYPE_INVALID;
      }
      GetType() {
        return this._type;
      }
      GetMiddleTile() {
        return this._tile;
      }
      equals(pack) {
        return this._type === pack._type && this._tile.equals(pack._tile);
      }
      GetAllTile() {
        const ret = [];
        switch (this.GetType()) {
          case constants.PACK_TYPE_SHUNZI:
            ret.push(this._tile.Pred(), this._tile.clone(), this._tile.Succ());
            break;
          case constants.PACK_TYPE_GANG:
            ret.push(
              this._tile.clone(),
              this._tile.clone(),
              this._tile.clone(),
              this._tile.clone()
            );
            break;
          case constants.PACK_TYPE_KEZI:
            ret.push(this._tile.clone(), this._tile.clone(), this._tile.clone());
            break;
          case constants.PACK_TYPE_JIANG:
            ret.push(this._tile.clone(), this._tile.clone());
            break;
          case constants.PACK_TYPE_ZUHELONG:
            for (let index = constants.TILE_1m; index <= constants.TILE_9p; index += 1) {
              if ((constants.BITMAP(index) & this.GetZuhelongBitmap()) !== 0n) {
                ret.push(new Tile(index));
              }
            }
            break;
          default:
            break;
        }
        return ret;
      }
      GetZuhelongType() {
        return this._zuhelong_type;
      }
      GetZuhelongBitmap() {
        return constants.ZuhelongBitmap[this._zuhelong_type];
      }
      GetOffer() {
        return this._offer;
      }
      IsAnshou() {
        return this._offer === 0 || this._offer === -1;
      }
      HaveLastTile() {
        return this._offer < 0;
      }
      IsShunzi() {
        return this._type === constants.PACK_TYPE_SHUNZI;
      }
      IsKezi() {
        return this._type === constants.PACK_TYPE_KEZI;
      }
      IsGang() {
        return this._type === constants.PACK_TYPE_GANG;
      }
      IsKeGang() {
        return this.IsKezi() || this.IsGang();
      }
      IsJiang() {
        return this._type === constants.PACK_TYPE_JIANG;
      }
      IsZuhelong() {
        return this._type === constants.PACK_TYPE_ZUHELONG;
      }
      SetOffer(offer) {
        this._offer = offer;
      }
      SetType(type) {
        this._type = type;
      }
    };
    module.exports = Pack;
  }
});

// gb-mahjong-js/lib/model/win-context.js
var require_win_context = __commonJS({
  "gb-mahjong-js/lib/model/win-context.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var WinContext = class {
      constructor(overrides = {}) {
        this.quanfeng = overrides.quanfeng ?? constants.TILE_E;
        this.menfeng = overrides.menfeng ?? constants.TILE_E;
        this.zimo = overrides.zimo ?? false;
        this.juezhang = overrides.juezhang ?? false;
        this.haidi = overrides.haidi ?? false;
        this.gang = overrides.gang ?? false;
      }
    };
    module.exports = WinContext;
  }
});

// gb-mahjong-js/lib/model/hand.js
var require_hand = __commonJS({
  "gb-mahjong-js/lib/model/hand.js"(exports, module) {
    "use strict";
    var WinContext = require_win_context();
    var Hand = class {
      constructor(overrides = {}) {
        this.tiles = overrides.tiles ?? [];
        this.packs = overrides.packs ?? [];
        this.winningTile = overrides.winningTile ?? null;
        this.flowers = overrides.flowers ?? [];
        this.context = overrides.context instanceof WinContext ? overrides.context : new WinContext(overrides.context);
        this.source = overrides.source ?? null;
      }
    };
    module.exports = Hand;
  }
});

// gb-mahjong-js/lib/model/fan-result.js
var require_fan_result = __commonJS({
  "gb-mahjong-js/lib/model/fan-result.js"(exports, module) {
    "use strict";
    var FanResult = class {
      constructor(overrides = {}) {
        this.isHu = overrides.isHu ?? false;
        this.totalFan = overrides.totalFan ?? overrides.total ?? 0;
        this.fanIds = overrides.fanIds ?? [];
        this.fans = overrides.fans ?? [];
        this.decomposition = overrides.decomposition ?? null;
      }
      get total() {
        return this.totalFan;
      }
      get packs() {
        return this.decomposition?.packs ?? [];
      }
    };
    module.exports = FanResult;
  }
});

// gb-mahjong-js/lib/model/decomposition-pack.js
var require_decomposition_pack = __commonJS({
  "gb-mahjong-js/lib/model/decomposition-pack.js"(exports, module) {
    "use strict";
    var DecompositionPack = class {
      constructor(overrides = {}) {
        this.type = overrides.type ?? null;
        this.tile = overrides.tile ?? null;
        this.offer = overrides.offer ?? 0;
        this.zuhelong = overrides.zuhelong ?? overrides.zuhelongType ?? 0;
      }
    };
    module.exports = DecompositionPack;
  }
});

// gb-mahjong-js/lib/core/handtiles.js
var require_handtiles = __commonJS({
  "gb-mahjong-js/lib/core/handtiles.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var Pack = require_pack();
    var Tile = require_tile();
    var HANDTILES_REGEX = /^(\[([1-9]{3,4}[msp]|[ESWNCFP]{3,4})(,[123567])?\]|([ESWNCFPa-h]|[1-9]+[msp]))+(\|([ESWN]{2}[01]{4})(\|([a-h]{0,8}|[0-8]))?)?$/;
    var compareTiles = (left, right) => left.GetId() - right.GetId();
    var createCountTable = () => Array(constants.TILE_MAJIANG + 1).fill(0);
    var isDigit = (char) => char >= "0" && char <= "9";
    var isWindOrDragon = (char) => /[ESWNCFP]/.test(char);
    var isSuitChar = (char) => /[msp]/.test(char);
    var isFlowerChar = (char) => char >= constants.TILE_CHAR_MEI && char <= constants.TILE_CHAR_DONG;
    var tileIdOf = (tile) => tile instanceof Tile ? tile.GetId() : tile;
    var toTile = (tile) => tile instanceof Tile ? tile.clone() : new Tile(tile);
    var Handtiles = class {
      constructor() {
        this._ClearAndSetDefault();
      }
      FuluBitmap() {
        let bitmap = 0n;
        this.fulu.forEach((pack) => {
          const middleTile = pack.GetMiddleTile();
          switch (pack.GetType()) {
            case constants.PACK_TYPE_SHUNZI:
              bitmap |= middleTile.GetBitmap();
              bitmap |= middleTile.Pred().GetBitmap();
              bitmap |= middleTile.Succ().GetBitmap();
              break;
            case constants.PACK_TYPE_KEZI:
            case constants.PACK_TYPE_GANG:
            case constants.PACK_TYPE_JIANG:
              bitmap |= middleTile.GetBitmap();
              break;
            default:
              break;
          }
        });
        return bitmap;
      }
      LipaiBitmap() {
        return this.lipai.reduce((bitmap, tile) => bitmap | tile.GetBitmap(), 0n);
      }
      LipaiTileCount(tile) {
        return this.lipai_table[tileIdOf(tile)] || 0;
      }
      FuluTileCount(tile) {
        return this.fulu_table[tileIdOf(tile)] || 0;
      }
      HandTileCount(tile) {
        return this.LipaiTileCount(tile) + this.FuluTileCount(tile);
      }
      HuapaiCount() {
        let count = 0;
        for (let index = constants.TILE_MEI; index <= constants.TILE_DONG; index += 1) {
          count += this.huapai_table[index];
        }
        return count;
      }
      HandtilesToString() {
        let result = "";
        this.fulu.forEach((pack) => {
          const middleTile = pack.GetMiddleTile();
          const tiles = pack.GetAllTile();
          result += "[";
          tiles.forEach((tile) => {
            result += tile.TileChar();
          });
          if (middleTile.IsShu()) {
            result += middleTile.SuitChar();
          }
          if (pack.GetOffer()) {
            result += `,${pack.GetOffer()}`;
          }
          result += "]";
        });
        let previousWasNumberedTile = false;
        for (let index = 0; index < this.lipai.length; index += 1) {
          const tile = this.lipai[index];
          if (previousWasNumberedTile) {
            const isFourteenthTile = index + 1 + this.fulu.length * 3 === 14;
            const changedSuit = !tile.IsShu() || tile.Suit() !== this.lipai[index - 1].Suit();
            if (isFourteenthTile || changedSuit) {
              result += this.lipai[index - 1].SuitChar();
            }
          }
          previousWasNumberedTile = tile.IsShu();
          result += tile.TileChar();
        }
        if (previousWasNumberedTile) {
          result += this.GetLastLipai().SuitChar();
        }
        result += "|";
        result += new Tile(this.GetQuanfeng()).TileChar();
        result += new Tile(this.GetMenfeng()).TileChar();
        result += String(this.IsZimo());
        result += String(this.IsJuezhang());
        result += String(this.IsHaidi());
        result += String(this.IsGang());
        result += "|";
        this.huapai.forEach((tile) => {
          result += tile.TileChar();
        });
        return result;
      }
      StringToHandtiles(input) {
        const source = input.replace(/ /g, "");
        if (!HANDTILES_REGEX.test(source)) {
          return -1;
        }
        this._ClearAndSetDefault();
        const charMap = {
          [constants.TILE_CHAR_WAN]: constants.TILE_1m,
          [constants.TILE_CHAR_TIAO]: constants.TILE_1s,
          [constants.TILE_CHAR_BING]: constants.TILE_1p,
          [constants.TILE_CHAR_E]: constants.TILE_E,
          [constants.TILE_CHAR_S]: constants.TILE_S,
          [constants.TILE_CHAR_W]: constants.TILE_W,
          [constants.TILE_CHAR_N]: constants.TILE_N,
          [constants.TILE_CHAR_C]: constants.TILE_C,
          [constants.TILE_CHAR_F]: constants.TILE_F,
          [constants.TILE_CHAR_P]: constants.TILE_P,
          [constants.TILE_CHAR_MEI]: constants.TILE_MEI
        };
        let part = 0;
        let is_fulu = false;
        let handle_offer = false;
        let offer = 0;
        let nums = "";
        let chars = "";
        let char_suit = "";
        for (const char of source) {
          if (char === "[") {
            is_fulu = true;
            continue;
          }
          if (char === "]") {
            const isChars = nums.length === 0;
            const tileCode = isChars ? charMap[chars[1]] : charMap[char_suit] - 1 + Number(nums[1]);
            const tiles = isChars ? chars : nums;
            const pack = new Pack(constants.PACK_TYPE_INVALID, new Tile(tileCode));
            if (tiles.length === 3) {
              if (!handle_offer) {
                offer = 1;
              }
              if (offer > 3) {
                return -2;
              }
              if (!isChars && tiles[1] === String.fromCharCode(tiles.charCodeAt(0) + 1) && tiles[1] === String.fromCharCode(tiles.charCodeAt(2) - 1)) {
                pack.SetType(constants.PACK_TYPE_SHUNZI);
              } else if (tiles[1] === tiles[0] && tiles[1] === tiles[2]) {
                pack.SetType(constants.PACK_TYPE_KEZI);
              } else {
                return -3;
              }
            } else if (tiles.length === 4) {
              if (!handle_offer) {
                offer = 0;
              }
              if (tiles[1] === tiles[0] && tiles[1] === tiles[2] && tiles[1] === tiles[3]) {
                pack.SetType(constants.PACK_TYPE_GANG);
              } else {
                return -4;
              }
            }
            pack.SetOffer(offer);
            this.fulu.push(pack);
            is_fulu = false;
            handle_offer = false;
            offer = 0;
            nums = "";
            chars = "";
            char_suit = "";
            continue;
          }
          if (char === ",") {
            handle_offer = true;
            continue;
          }
          if (isDigit(char)) {
            if (part === 0) {
              if (is_fulu) {
                if (!handle_offer) {
                  nums += char;
                } else {
                  offer = Number(char);
                }
              } else {
                nums += char;
              }
            } else if (part === 1) {
              nums += char;
            } else if (part === 2) {
              for (let index = 0; index < Number(char); index += 1) {
                this.huapai.push(
                  new Tile(charMap[constants.TILE_CHAR_MEI] + index)
                );
              }
            }
            continue;
          }
          if (isWindOrDragon(char)) {
            if (part === 0) {
              if (is_fulu) {
                chars += char;
                char_suit = "z";
              } else {
                this.lipai.push(new Tile(charMap[char]));
              }
            } else if (part === 1) {
              chars += char;
            }
            continue;
          }
          if (isSuitChar(char)) {
            if (is_fulu) {
              char_suit = char;
            } else {
              for (const num of nums) {
                this.lipai.push(new Tile(charMap[char] - 1 + Number(num)));
              }
              nums = "";
            }
            continue;
          }
          if (char === "|") {
            part += 1;
            continue;
          }
          if (isFlowerChar(char)) {
            const tile = new Tile(
              charMap[constants.TILE_CHAR_MEI] + char.charCodeAt(0) - constants.TILE_CHAR_MEI.charCodeAt(0)
            );
            if (part === 0) {
              this.lipai.push(tile);
            } else if (part === 2) {
              this.huapai.push(tile);
            }
            continue;
          }
          return -999;
        }
        if (part >= 1) {
          this.SetQuanfeng(charMap[chars[0]]);
          this.SetMenfeng(charMap[chars[1]]);
          this.SetZimo(Number(nums[0]));
          this.SetJuezhang(Number(nums[1]));
          this.SetHaidi(Number(nums[2]));
          this.SetGang(Number(nums[3]));
        }
        if (this.fulu.length * 3 + this.lipai.length === 13) {
          this.lipai.push(new Tile(constants.TILE_INVALID));
        } else if (this.fulu.length * 3 + this.lipai.length !== 14) {
          return -5;
        }
        if (this._GenerateTable()) {
          return -6;
        }
        if (this.IsZimo()) {
          this.LastLipai().SetZimo();
        } else {
          this.LastLipai().SetChonghu();
        }
        if (this.IsGang()) {
          if (this.IsZimo()) {
            if (!this.fulu.some((pack) => pack.IsGang())) {
              return -7;
            }
          } else if (this.IsHaidi() || this.HandTileCount(this.GetLastLipai()) > 1) {
            return -7;
          }
        }
        if (this.IsJuezhang() && this.LipaiTileCount(this.GetLastLipai()) > 1) {
          return -7;
        }
        this.SortLipaiWithoutLastOne();
        return 0;
      }
      DrawTile(tile) {
        this.SetLastLipai(tile);
        this.LastLipai().SetZimo();
      }
      SetTile(tile) {
        this.SetLastLipai(tile);
        this.LastLipai().SetChonghu();
      }
      DiscardTile() {
        const tile = new Tile(this.GetLastLipai().GetId());
        this.SetLastLipai(constants.TILE_INVALID);
        return tile;
      }
      SortLipaiWithoutLastOne() {
        if (this.lipai.length <= 1) {
          return;
        }
        const last = this.lipai[this.lipai.length - 1];
        const sorted = this.lipai.slice(0, -1).sort(compareTiles);
        this.lipai = [...sorted, last];
      }
      SortLipaiAll() {
        this.lipai.sort(compareTiles);
      }
      GetQuanfeng() {
        return this._quanfeng;
      }
      GetMenfeng() {
        return this._menfeng;
      }
      IsZimo() {
        return this._zimo;
      }
      IsJuezhang() {
        return this._juezhang;
      }
      IsHaidi() {
        return this._haidi;
      }
      IsGang() {
        return this._gang;
      }
      SetQuanfeng(value) {
        this._quanfeng = value;
      }
      SetMenfeng(value) {
        this._menfeng = value;
      }
      SetZimo(value) {
        this._zimo = value;
      }
      SetJuezhang(value) {
        this._juezhang = value;
      }
      SetHaidi(value) {
        this._haidi = value;
      }
      SetGang(value) {
        this._gang = value;
      }
      IsMenqing() {
        return this.fulu.every((pack) => pack.IsAnshou());
      }
      IsTotallyFulu() {
        return this.fulu.length === 4 && this.fulu.every((pack) => !pack.IsAnshou());
      }
      NoFulu() {
        return this.fulu.length === 0;
      }
      SetLastLipai(tile) {
        const nextTile = toTile(tile);
        if (this.lipai.length === 0) {
          this.lipai.push(nextTile);
          this.lipai_table[nextTile.GetId()] += 1;
          return;
        }
        const current = this.LastLipai();
        this.lipai_table[current.GetId()] -= 1;
        this.lipai[this.lipai.length - 1] = nextTile;
        this.lipai_table[nextTile.GetId()] += 1;
      }
      LastLipai() {
        return this.lipai[this.lipai.length - 1];
      }
      GetLastLipai() {
        return this.LastLipai();
      }
      HasWinningTile() {
        const lastTile = this.GetLastLipai();
        return Boolean(lastTile) && lastTile.GetId() !== constants.TILE_INVALID;
      }
      _GenerateTable() {
        this.fulu_table.fill(0);
        this.lipai_table.fill(0);
        this.huapai_table.fill(0);
        this.fulu.forEach((pack) => {
          pack.GetAllTile().forEach((tile) => {
            this.fulu_table[tile.GetId()] += 1;
          });
        });
        this.lipai.forEach((tile) => {
          this.lipai_table[tile.GetId()] += 1;
        });
        this.huapai.forEach((tile) => {
          this.huapai_table[tile.GetId()] += 1;
        });
        for (let index = constants.TILE_1m; index < constants.TILE_SIZE; index += 1) {
          if (this.fulu_table[index] + this.lipai_table[index] > 4) {
            return -1;
          }
        }
        for (let index = constants.TILE_MEI; index <= constants.TILE_DONG; index += 1) {
          if (this.lipai_table[index] + this.huapai_table[index] > 1) {
            return -1;
          }
        }
        return 0;
      }
      _ClearAndSetDefault() {
        this.fulu = [];
        this.lipai = [];
        this.huapai = [];
        this.fulu_table = createCountTable();
        this.lipai_table = createCountTable();
        this.huapai_table = createCountTable();
        this.SetQuanfeng(constants.TILE_E);
        this.SetMenfeng(constants.TILE_E);
        this.SetZimo(0);
        this.SetJuezhang(0);
        this.SetHaidi(0);
        this.SetGang(0);
      }
    };
    module.exports = Handtiles;
  }
});

// gb-mahjong-js/lib/parser/errors.js
var require_errors = __commonJS({
  "gb-mahjong-js/lib/parser/errors.js"(exports, module) {
    "use strict";
    var HandParseError = class extends Error {
      constructor(code, input) {
        super(`Failed to parse hand: ${code}`);
        this.name = "HandParseError";
        this.code = code;
        this.input = input;
      }
    };
    module.exports = {
      HandParseError
    };
  }
});

// gb-mahjong-js/lib/parser/legacy-adapter.js
var require_legacy_adapter = __commonJS({
  "gb-mahjong-js/lib/parser/legacy-adapter.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var Handtiles = require_handtiles();
    var Pack = require_pack();
    var Tile = require_tile();
    var Hand = require_hand();
    var WinContext = require_win_context();
    var cloneTile = (tile) => tile instanceof Tile ? tile.clone() : new Tile(tile);
    var clonePack = (pack) => new Pack(
      pack.GetType(),
      cloneTile(pack.GetMiddleTile()),
      pack.GetZuhelongType(),
      pack.GetOffer()
    );
    var inferWinningTile = (legacy) => {
      const lastTile = legacy.GetLastLipai();
      if (!legacy.HasWinningTile() || !lastTile) {
        return null;
      }
      return lastTile.clone();
    };
    var handFromLegacy = (legacy) => new Hand({
      tiles: legacy.lipai.filter((tile) => tile.GetId() !== constants.TILE_INVALID).map(cloneTile),
      packs: legacy.fulu.map(clonePack),
      winningTile: inferWinningTile(legacy),
      flowers: legacy.huapai.map(cloneTile),
      context: new WinContext({
        quanfeng: legacy.GetQuanfeng(),
        menfeng: legacy.GetMenfeng(),
        zimo: Boolean(legacy.IsZimo()),
        juezhang: Boolean(legacy.IsJuezhang()),
        haidi: Boolean(legacy.IsHaidi()),
        gang: Boolean(legacy.IsGang())
      }),
      source: legacy.HandtilesToString()
    });
    var legacyFromHand = (input) => {
      const hand = input instanceof Hand ? input : new Hand(input);
      const legacy = new Handtiles();
      legacy.fulu = hand.packs.map(clonePack);
      legacy.huapai = hand.flowers.map(cloneTile);
      legacy.lipai = hand.tiles.map(cloneTile);
      if (hand.winningTile === null && legacy.fulu.length * 3 + legacy.lipai.length === 13) {
        legacy.lipai.push(new Tile());
      } else if (hand.winningTile !== null && legacy.fulu.length * 3 + legacy.lipai.length === 13) {
        legacy.lipai.push(cloneTile(hand.winningTile));
      }
      legacy.SetQuanfeng(hand.context.quanfeng);
      legacy.SetMenfeng(hand.context.menfeng);
      legacy.SetZimo(Number(Boolean(hand.context.zimo)));
      legacy.SetJuezhang(Number(Boolean(hand.context.juezhang)));
      legacy.SetHaidi(Number(Boolean(hand.context.haidi)));
      legacy.SetGang(Number(Boolean(hand.context.gang)));
      legacy._GenerateTable();
      return legacy;
    };
    module.exports = {
      handFromLegacy,
      legacyFromHand,
      normalizeHonorSuit: (input) => input.replace(
        /([1-7]+)z/g,
        (_, digits) => digits.split("").map(
          (digit) => ({
            "1": "E",
            "2": "S",
            "3": "W",
            "4": "N",
            "5": "C",
            "6": "F",
            "7": "P"
          })[digit] ?? digit
        ).join("")
      )
    };
  }
});

// gb-mahjong-js/lib/parser/parse-hand.js
var require_parse_hand = __commonJS({
  "gb-mahjong-js/lib/parser/parse-hand.js"(exports, module) {
    "use strict";
    var Handtiles = require_handtiles();
    var { HandParseError } = require_errors();
    var { handFromLegacy, normalizeHonorSuit } = require_legacy_adapter();
    var parseHand = (input) => {
      const legacy = new Handtiles();
      const normalizedInput = normalizeHonorSuit(String(input ?? ""));
      const code = legacy.StringToHandtiles(normalizedInput);
      if (code !== 0) {
        throw new HandParseError(code, input);
      }
      return handFromLegacy(legacy);
    };
    module.exports = parseHand;
  }
});

// gb-mahjong-js/lib/api/normalize-hand.js
var require_normalize_hand = __commonJS({
  "gb-mahjong-js/lib/api/normalize-hand.js"(exports, module) {
    "use strict";
    var Hand = require_hand();
    var WinContext = require_win_context();
    var parseHand = require_parse_hand();
    var normalizeContext = (baseContext = {}, overrides = {}) => new WinContext({
      ...baseContext,
      ...overrides
    });
    var normalizeHandInput = (input, overrides = {}) => {
      const hand = typeof input === "string" ? parseHand(input) : input instanceof Hand ? input : new Hand(input);
      return new Hand({
        tiles: hand.tiles.slice(),
        packs: hand.packs.slice(),
        winningTile: hand.winningTile ?? null,
        flowers: hand.flowers.slice(),
        context: normalizeContext(hand.context, overrides),
        source: hand.source ?? (typeof input === "string" ? input : null)
      });
    };
    module.exports = {
      normalizeHandInput
    };
  }
});

// gb-mahjong-js/lib/solver/decomposition.js
var require_decomposition = __commonJS({
  "gb-mahjong-js/lib/solver/decomposition.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var Tile = require_tile();
    var DecompositionPack = require_decomposition_pack();
    var createCountTable = () => Array(constants.TILE_SIZE + 1).fill(0);
    var cloneExistingPack = (pack) => new DecompositionPack({
      type: pack.GetType(),
      tile: pack.GetMiddleTile().clone(),
      offer: pack.GetOffer()
    });
    var createPack = (type, tile, offer = 0) => new DecompositionPack({
      type,
      tile: new Tile(tile),
      offer
    });
    var isNumberedTile = (tile) => constants.TILES_SUIT[tile] === constants.SUIT_WAN || constants.TILES_SUIT[tile] === constants.SUIT_TIAO || constants.TILES_SUIT[tile] === constants.SUIT_BING;
    var canMakeSequence = (counts, tile) => isNumberedTile(tile) && constants.TILES_RANK[tile] <= 7 && counts[tile] > 0 && counts[tile + 1] > 0 && counts[tile + 2] > 0 && constants.TILES_SUIT[tile] === constants.TILES_SUIT[tile + 1] && constants.TILES_SUIT[tile] === constants.TILES_SUIT[tile + 2];
    var findFirstTile = (counts) => {
      for (let tile = constants.TILE_1m; tile <= constants.TILE_P; tile += 1) {
        if (counts[tile] > 0) {
          return tile;
        }
      }
      return null;
    };
    var isCompleteHandShape = (hand) => hand.packs.length * 3 + hand.tiles.length === 14;
    var buildCounts = (tiles) => {
      const counts = createCountTable();
      tiles.forEach((tile) => {
        counts[tile.GetId()] += 1;
      });
      return counts;
    };
    var searchMelds = (counts, currentPacks, decompositions) => {
      const tile = findFirstTile(counts);
      if (tile === null) {
        decompositions.push(currentPacks.slice());
        return;
      }
      if (counts[tile] >= 3) {
        counts[tile] -= 3;
        currentPacks.push(createPack(constants.PACK_TYPE_KEZI, tile));
        searchMelds(counts, currentPacks, decompositions);
        currentPacks.pop();
        counts[tile] += 3;
      }
      if (canMakeSequence(counts, tile)) {
        counts[tile] -= 1;
        counts[tile + 1] -= 1;
        counts[tile + 2] -= 1;
        currentPacks.push(createPack(constants.PACK_TYPE_SHUNZI, tile + 1));
        searchMelds(counts, currentPacks, decompositions);
        currentPacks.pop();
        counts[tile] += 1;
        counts[tile + 1] += 1;
        counts[tile + 2] += 1;
      }
    };
    var enumerateDecompositions = (hand) => {
      if (!hand || !isCompleteHandShape(hand)) {
        return [];
      }
      const counts = buildCounts(hand.tiles);
      const decompositions = [];
      const fixedPacks = hand.packs.map(cloneExistingPack);
      for (let tile = constants.TILE_1m; tile <= constants.TILE_P; tile += 1) {
        if (counts[tile] < 2) {
          continue;
        }
        counts[tile] -= 2;
        searchMelds(
          counts,
          [...fixedPacks, createPack(constants.PACK_TYPE_JIANG, tile)],
          decompositions
        );
        counts[tile] += 2;
      }
      return decompositions.filter((packs) => packs.length === 5);
    };
    module.exports = {
      enumerateDecompositions
    };
  }
});

// gb-mahjong-js/lib/solver/fan-optimizer.js
var require_fan_optimizer = __commonJS({
  "gb-mahjong-js/lib/solver/fan-optimizer.js"(exports, module) {
    "use strict";
    var FanResult = require_fan_result();
    var DecompositionPack = require_decomposition_pack();
    var tileIdOf = (tile) => tile && typeof tile.GetId === "function" ? tile.GetId() : tile;
    var packSignature = (pack) => [
      pack.type ?? null,
      tileIdOf(pack.tile) ?? null,
      pack.offer ?? 0,
      pack.zuhelong ?? 0
    ].join(":");
    var normalizePack = (pack) => pack instanceof DecompositionPack ? pack : new DecompositionPack(pack);
    var normalizeMatchedPacks = (matchedPacks, remap) => (matchedPacks ?? []).map((index) => remap.get(index)).filter((index) => index !== void 0).sort((left, right) => left - right);
    var createEmptyFanResult = () => new FanResult({
      isHu: false,
      totalFan: 0,
      fanIds: [],
      fans: [],
      decomposition: null
    });
    var canonicalizeCandidate = (candidate) => {
      const packs = (candidate.decomposition?.packs ?? []).map(normalizePack);
      const indexedPacks = packs.map((pack, index) => ({
        index,
        pack,
        signature: packSignature(pack)
      }));
      indexedPacks.sort(
        (left, right) => left.signature.localeCompare(right.signature)
      );
      const remap = new Map(
        indexedPacks.map((entry, normalizedIndex) => [entry.index, normalizedIndex])
      );
      return new FanResult({
        isHu: candidate.isHu ?? true,
        totalFan: candidate.totalFan ?? candidate.total ?? 0,
        fanIds: (candidate.fanIds ?? []).slice().sort((left, right) => left - right),
        fans: (candidate.fans ?? []).map((fan) => ({
          ...fan,
          matchedPacks: normalizeMatchedPacks(fan.matchedPacks, remap)
        })),
        decomposition: candidate.decomposition ? {
          ...candidate.decomposition,
          packs: indexedPacks.map((entry) => entry.pack)
        } : null
      });
    };
    module.exports = {
      canonicalizeCandidate,
      createEmptyFanResult,
      packSignature
    };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/core/accumulator.js
var require_accumulator = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/core/accumulator.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var FanAccumulator = class {
      constructor() {
        this.fanTable = /* @__PURE__ */ new Map();
        this.excludedTable = /* @__PURE__ */ new Map();
      }
      addFan(fanId, matchedPacks = []) {
        if (!this.fanTable.has(fanId)) {
          this.fanTable.set(fanId, []);
        }
        this.fanTable.get(fanId).push(matchedPacks.slice().sort((a, b) => a - b));
      }
      excludeFan(fanId, matchedPacks = []) {
        if (!this.excludedTable.has(fanId)) {
          this.excludedTable.set(fanId, []);
        }
        this.excludedTable.get(fanId).push(matchedPacks.slice().sort((a, b) => a - b));
      }
      hasFan(fanId) {
        const entries = this.fanTable.get(fanId);
        return Boolean(entries) && entries.length > 0;
      }
      applyExclusions() {
        for (const [fanId, excludedEntries] of this.excludedTable) {
          const fanEntries = this.fanTable.get(fanId);
          if (!fanEntries || fanEntries.length === 0)
            continue;
          const used = new Array(excludedEntries.length).fill(false);
          const keep = new Array(fanEntries.length).fill(true);
          for (let j = 0; j < excludedEntries.length; j++) {
            if (used[j])
              continue;
            for (let k = 0; k < fanEntries.length; k++) {
              if (!keep[k])
                continue;
              if (arraysEqual(fanEntries[k], excludedEntries[j])) {
                keep[k] = false;
                used[j] = true;
                break;
              }
            }
          }
          const remaining = fanEntries.filter((_, i) => keep[i]);
          if (remaining.length === 0) {
            this.fanTable.delete(fanId);
          } else {
            this.fanTable.set(fanId, remaining);
          }
        }
      }
      getTotal() {
        let total = 0;
        for (const [fanId, entries] of this.fanTable) {
          total += entries.length * constants.FAN_SCORE[fanId];
        }
        return total;
      }
      getFanIds() {
        const ids = [];
        for (const [fanId, entries] of this.fanTable) {
          for (let i = 0; i < entries.length; i++) {
            ids.push(fanId);
          }
        }
        return ids.sort((a, b) => a - b);
      }
      getFans() {
        const fans = [];
        for (const [fanId, entries] of this.fanTable) {
          for (const matchedPacks of entries) {
            fans.push({
              fanId,
              score: constants.FAN_SCORE[fanId],
              matchedPacks
            });
          }
        }
        return fans;
      }
      clear() {
        this.fanTable.clear();
        this.excludedTable.clear();
      }
    };
    function arraysEqual(a, b) {
      if (a.length !== b.length)
        return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
          return false;
      }
      return true;
    }
    module.exports = { FanAccumulator, arraysEqual };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/core/helpers.js
var require_helpers = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/core/helpers.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var tileIdOf = (tile) => {
      if (tile === null || tile === void 0)
        return 0;
      return typeof tile.GetId === "function" ? tile.GetId() : tile;
    };
    var isShu = (tileId) => (1n << BigInt(tileId) & constants.TILE_TYPE_BITMAP_SHU) === 1n << BigInt(tileId);
    var isZi = (tileId) => (1n << BigInt(tileId) & constants.TILE_TYPE_BITMAP_ZI) === 1n << BigInt(tileId);
    var isFeng = (tileId) => tileId >= constants.TILE_E && tileId <= constants.TILE_N;
    var isJian = (tileId) => tileId >= constants.TILE_C && tileId <= constants.TILE_P;
    var isHonorTile = (tileId) => tileId >= constants.TILE_E && tileId <= constants.TILE_P;
    var isNumberedTile = (tileId) => tileId >= constants.TILE_1m && tileId <= constants.TILE_9p;
    var isYaojiu = (tileId) => (1n << BigInt(tileId) & constants.TILE_TYPE_BITMAP_YAOJIU) === 1n << BigInt(tileId);
    var tileRank = (tileId) => constants.TILES_RANK[tileId];
    var tileSuit = (tileId) => constants.TILES_SUIT[tileId];
    var packType = (pack) => typeof pack.GetType === "function" ? pack.GetType() : pack.type;
    var packTile = (pack) => typeof pack.GetMiddleTile === "function" ? pack.GetMiddleTile() : pack.tile;
    var packOffer = (pack) => typeof pack.GetOffer === "function" ? pack.GetOffer() : pack.offer;
    var isKezi = (pack) => packType(pack) === constants.PACK_TYPE_KEZI;
    var isGang = (pack) => packType(pack) === constants.PACK_TYPE_GANG;
    var isKeGang = (pack) => isKezi(pack) || isGang(pack);
    var isJiang = (pack) => packType(pack) === constants.PACK_TYPE_JIANG;
    var isShunzi = (pack) => packType(pack) === constants.PACK_TYPE_SHUNZI;
    var isAnshou = (pack) => {
      const offer = packOffer(pack);
      return offer === 0 || offer === -1;
    };
    var packTileId = (pack) => tileIdOf(packTile(pack));
    var packsEqual = (a, b) => packType(a) === packType(b) && packTileId(a) === packTileId(b);
    module.exports = {
      tileIdOf,
      isShu,
      isZi,
      isFeng,
      isJian,
      isHonorTile,
      isNumberedTile,
      isYaojiu,
      tileRank,
      tileSuit,
      packType,
      packTile,
      packOffer,
      isKezi,
      isGang,
      isKeGang,
      isJiang,
      isShunzi,
      isAnshou,
      packTileId,
      packsEqual
    };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/core/bitmap.js
var require_bitmap = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/core/bitmap.js"(exports, module) {
    "use strict";
    var { isShunzi, isGang, isKezi, isJiang, packTileId } = require_helpers();
    var constants = require_constants();
    var collectBitmap = (packs) => {
      let bitmap = 0n;
      for (const pack of packs) {
        if (!pack)
          continue;
        const tid = packTileId(pack);
        if (tid === null || tid === void 0)
          continue;
        if (isShunzi(pack)) {
          bitmap |= 1n << BigInt(tid - 1);
          bitmap |= 1n << BigInt(tid);
          bitmap |= 1n << BigInt(tid + 1);
        } else if (isGang(pack) || isKezi(pack) || isJiang(pack)) {
          bitmap |= 1n << BigInt(tid);
        }
      }
      return bitmap;
    };
    var collectTileBitmap = (tiles) => {
      let bitmap = 0n;
      for (const tile of tiles) {
        bitmap |= tile.GetBitmap();
      }
      return bitmap;
    };
    var handTileCount = (hand, tileId) => {
      const { packType, packTileId: getPackTileId } = require_helpers();
      let count = 0;
      for (const tile of hand.tiles) {
        if (tile.GetId() === tileId)
          count++;
      }
      for (const pack of hand.packs) {
        const type = packType(pack);
        const tid = getPackTileId(pack);
        if (type === constants.PACK_TYPE_SHUNZI) {
          if (tid - 1 === tileId || tid === tileId || tid + 1 === tileId)
            count++;
        } else if (type === constants.PACK_TYPE_KEZI) {
          if (tid === tileId)
            count += 3;
        } else if (type === constants.PACK_TYPE_GANG) {
          if (tid === tileId)
            count += 4;
        }
      }
      return count;
    };
    var isMenqing = (hand) => {
      const { isAnshou } = require_helpers();
      return hand.packs.length === 0 || hand.packs.every((p) => isAnshou(p));
    };
    var bitPopCount = (n) => {
      let c = 0;
      let val = n;
      while (val) {
        val &= val - 1n;
        c++;
      }
      return c;
    };
    module.exports = {
      collectBitmap,
      collectTileBitmap,
      handTileCount,
      isMenqing,
      bitPopCount
    };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/scoring/overall-attr.js
var require_overall_attr = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/scoring/overall-attr.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var {
      isShu,
      isZi,
      isYaojiu,
      tileRank,
      isGang,
      isKeGang,
      isJiang,
      isShunzi,
      packType,
      packTileId
    } = require_helpers();
    var {
      collectBitmap,
      collectTileBitmap,
      handTileCount,
      isMenqing
    } = require_bitmap();
    var excludeYaojiuke = (acc, packs) => {
      for (let i = 0; i < packs.length; i++) {
        const tid = packTileId(packs[i]);
        const rank = tileRank(tid);
        const zi = isZi(tid);
        if (isKeGang(packs[i]) && (rank === 1 || rank === 9 || zi)) {
          acc.excludeFan(constants.FAN_YAOJIUKE, [i]);
        }
      }
    };
    var countOverallAttrFans = (acc, hand, packs, zuhelongType) => {
      let handBitmap = collectBitmap(hand.packs) | collectTileBitmap(hand.tiles);
      if (zuhelongType > 0) {
        handBitmap |= constants.ZuhelongBitmap[zuhelongType];
      }
      if (zuhelongType === 0) {
        if ((handBitmap & constants.TILE_TYPE_BITMAP_LV) === handBitmap) {
          acc.addFan(constants.FAN_LVYISE);
          acc.excludeFan(constants.FAN_HUNYISE);
        }
        if (isMenqing(hand)) {
          const tileTable = /* @__PURE__ */ new Map();
          for (const tile of hand.tiles) {
            const id = tile.GetId();
            tileTable.set(id, (tileTable.get(id) || 0) + 1);
          }
          const winTileId = hand.winningTile ? hand.winningTile.GetId() : hand.tiles[hand.tiles.length - 1].GetId();
          tileTable.set(winTileId, tileTable.get(winTileId) - 1);
          let startTile = -1;
          if (tileTable.get(constants.TILE_1m) > 0)
            startTile = constants.TILE_1m;
          else if (tileTable.get(constants.TILE_1s) > 0)
            startTile = constants.TILE_1s;
          else if (tileTable.get(constants.TILE_1p) > 0)
            startTile = constants.TILE_1p;
          if (startTile > 0) {
            let flag = true;
            if (tileTable.get(startTile) !== 3 || tileTable.get(startTile + 8) !== 3) {
              flag = false;
            }
            for (let i = 2; i <= 8; i++) {
              if (tileTable.get(startTile - 1 + i) !== 1) {
                flag = false;
                break;
              }
            }
            if (flag) {
              acc.addFan(constants.FAN_JIULIANBAODENG);
              acc.excludeFan(constants.FAN_QINGYISE);
              acc.excludeFan(constants.FAN_BUQIUREN);
              acc.excludeFan(constants.FAN_MENQIANQING);
              acc.excludeFan(constants.FAN_WUZI);
              for (let i = 0; i < packs.length; i++) {
                if (isKeGang(packs[i]) && isYaojiu(packTileId(packs[i]))) {
                  acc.excludeFan(constants.FAN_YAOJIUKE, [i]);
                  break;
                }
              }
            }
          }
        }
        if ((handBitmap & (constants.TILE_TYPE_BITMAP_YAOJIU & ~constants.TILE_TYPE_BITMAP_ZI)) === handBitmap) {
          acc.addFan(constants.FAN_QINGYAOJIU);
          acc.excludeFan(constants.FAN_PENGPENGHU);
          acc.excludeFan(constants.FAN_QUANDAIYAO);
          acc.excludeFan(constants.FAN_WUZI);
          for (let i = 0; i < packs.length; i++) {
            for (let j = i + 1; j < packs.length; j++) {
              if (isKeGang(packs[i]) && isKeGang(packs[j]) && tileRank(packTileId(packs[i])) === tileRank(packTileId(packs[j]))) {
                acc.excludeFan(constants.FAN_SHUANGTONGKE, [i, j]);
              }
            }
          }
          excludeYaojiuke(acc, packs);
        }
        if ((handBitmap & constants.TILE_TYPE_BITMAP_ZI) === handBitmap) {
          acc.addFan(constants.FAN_ZIYISE);
          acc.excludeFan(constants.FAN_PENGPENGHU);
          acc.excludeFan(constants.FAN_QUANDAIYAO);
          excludeYaojiuke(acc, packs);
        }
        if (handBitmap & constants.TILE_TYPE_BITMAP_YAOJIU & ~constants.TILE_TYPE_BITMAP_ZI && handBitmap & constants.TILE_TYPE_BITMAP_ZI && (handBitmap & constants.TILE_TYPE_BITMAP_YAOJIU) === handBitmap) {
          acc.addFan(constants.FAN_HUNYAOJIU);
          acc.excludeFan(constants.FAN_PENGPENGHU);
          acc.excludeFan(constants.FAN_QUANDAIYAO);
          excludeYaojiuke(acc, packs);
        }
        if (packs.length === 5) {
          let flag = true;
          for (const p of packs) {
            if (!((isKeGang(p) || isJiang(p)) && isShu(packTileId(p)) && tileRank(packTileId(p)) % 2 === 0)) {
              flag = false;
              break;
            }
          }
          if (flag) {
            acc.addFan(constants.FAN_QUANSHUANGKE);
            acc.excludeFan(constants.FAN_PENGPENGHU);
            acc.excludeFan(constants.FAN_DUANYAO);
            acc.excludeFan(constants.FAN_WUZI);
          }
        }
        if ((handBitmap & constants.TILE_TYPE_BITMAP_WAN) === handBitmap || (handBitmap & constants.TILE_TYPE_BITMAP_TIAO) === handBitmap || (handBitmap & constants.TILE_TYPE_BITMAP_BING) === handBitmap) {
          acc.addFan(constants.FAN_QINGYISE);
          acc.excludeFan(constants.FAN_WUZI);
        }
        if ((handBitmap & constants.TILE_TYPE_BITMAP_QUANDA) === handBitmap) {
          acc.addFan(constants.FAN_QUANDA);
          acc.excludeFan(constants.FAN_DAYUWU);
          acc.excludeFan(constants.FAN_WUZI);
        }
        if ((handBitmap & constants.TILE_TYPE_BITMAP_QUANZHONG) === handBitmap) {
          acc.addFan(constants.FAN_QUANZHONG);
          acc.excludeFan(constants.FAN_DUANYAO);
          acc.excludeFan(constants.FAN_WUZI);
        }
        if ((handBitmap & constants.TILE_TYPE_BITMAP_QUANXIAO) === handBitmap) {
          acc.addFan(constants.FAN_QUANXIAO);
          acc.excludeFan(constants.FAN_XIAOYUWU);
          acc.excludeFan(constants.FAN_WUZI);
        }
        if (packs.length === 5) {
          let flag = true;
          for (const p of packs) {
            const rank = tileRank(packTileId(p));
            if (!(isShunzi(p) && rank >= 4 && rank <= 6 || (isKeGang(p) || isJiang(p)) && rank === 5)) {
              flag = false;
              break;
            }
          }
          if (flag) {
            acc.addFan(constants.FAN_QUANDAIWU);
            acc.excludeFan(constants.FAN_DUANYAO);
            acc.excludeFan(constants.FAN_WUZI);
          }
        }
        if ((handBitmap & constants.TILE_TYPE_BITMAP_DAYUWU) === handBitmap) {
          acc.addFan(constants.FAN_DAYUWU);
          acc.excludeFan(constants.FAN_WUZI);
        }
        if ((handBitmap & constants.TILE_TYPE_BITMAP_XIAOYUWU) === handBitmap) {
          acc.addFan(constants.FAN_XIAOYUWU);
          acc.excludeFan(constants.FAN_WUZI);
        }
        if ((handBitmap & constants.TILE_TYPE_BITMAP_TUIBUDAO) === handBitmap) {
          acc.addFan(constants.FAN_TUIBUDAO);
          acc.excludeFan(constants.FAN_QUEYIMEN);
        }
        if (packs.length === 5 && packs.every((p) => isKeGang(p) || isJiang(p))) {
          acc.addFan(constants.FAN_PENGPENGHU);
        }
        {
          const bitmapNozi = handBitmap & ~constants.TILE_TYPE_BITMAP_ZI;
          if (handBitmap & constants.TILE_TYPE_BITMAP_ZI && handBitmap & constants.TILE_TYPE_BITMAP_SHU && ((bitmapNozi & constants.TILE_TYPE_BITMAP_WAN) === bitmapNozi || (bitmapNozi & constants.TILE_TYPE_BITMAP_TIAO) === bitmapNozi || (bitmapNozi & constants.TILE_TYPE_BITMAP_BING) === bitmapNozi)) {
            acc.addFan(constants.FAN_HUNYISE);
          }
        }
        if (packs.length === 5) {
          let flag = true;
          for (const p of packs) {
            const rank = tileRank(packTileId(p));
            const yaojiu = isYaojiu(packTileId(p));
            if (!(isShunzi(p) && (rank === 2 || rank === 8) || (isKeGang(p) || isJiang(p)) && yaojiu)) {
              flag = false;
              break;
            }
          }
          if (flag) {
            acc.addFan(constants.FAN_QUANDAIYAO);
          }
        }
        if ((handBitmap & ~constants.TILE_TYPE_BITMAP_YAOJIU) === handBitmap) {
          acc.addFan(constants.FAN_DUANYAO);
          acc.excludeFan(constants.FAN_WUZI);
        }
        {
          const suitCount = ((handBitmap & constants.TILE_TYPE_BITMAP_WAN) === 0n ? 0 : 1) + ((handBitmap & constants.TILE_TYPE_BITMAP_TIAO) === 0n ? 0 : 1) + ((handBitmap & constants.TILE_TYPE_BITMAP_BING) === 0n ? 0 : 1);
          if (suitCount === 2) {
            acc.addFan(constants.FAN_QUEYIMEN);
          }
        }
      }
      {
        const hasWan = (handBitmap & constants.TILE_TYPE_BITMAP_WAN) !== 0n;
        const hasTiao = (handBitmap & constants.TILE_TYPE_BITMAP_TIAO) !== 0n;
        const hasBing = (handBitmap & constants.TILE_TYPE_BITMAP_BING) !== 0n;
        const hasFeng = (handBitmap & constants.TILE_TYPE_BITMAP_FENG) !== 0n;
        const hasJian = (handBitmap & constants.TILE_TYPE_BITMAP_JIAN) !== 0n;
        if ((hasWan ? 1 : 0) + (hasTiao ? 1 : 0) + (hasBing ? 1 : 0) + (hasFeng ? 1 : 0) + (hasJian ? 1 : 0) === 5) {
          acc.addFan(constants.FAN_WUMENQI);
        }
      }
      {
        const regularPacks = packs.filter(
          (p) => packType(p) !== constants.PACK_TYPE_ZUHELONG
        );
        if (regularPacks.length !== 7 && regularPacks.length > 0 && regularPacks.every(
          (p) => isShunzi(p) || isJiang(p) && isShu(packTileId(p))
        )) {
          acc.addFan(constants.FAN_PINGHU);
          acc.excludeFan(constants.FAN_WUZI);
        }
      }
      for (let i = constants.TILE_1m; i <= constants.TILE_P; i++) {
        let hasGang = false;
        for (const p of packs) {
          if (isGang(p) && packTileId(p) === i) {
            hasGang = true;
            break;
          }
        }
        if (hasGang)
          continue;
        if (handTileCount(hand, i) === 4) {
          acc.addFan(constants.FAN_SIGUIYI);
        }
      }
      if ((handBitmap & ~constants.TILE_TYPE_BITMAP_ZI) === handBitmap) {
        acc.addFan(constants.FAN_WUZI);
      }
    };
    module.exports = { countOverallAttrFans, excludeYaojiuke };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/scoring/ke-gang.js
var require_ke_gang = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/scoring/ke-gang.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var { isGang, isKezi, isAnshou, isJiang } = require_helpers();
    var countKeGangFans = (acc, packs) => {
      const angang = [];
      const minggang = [];
      const anke = [];
      for (let i = 0; i < packs.length; i++) {
        if (isGang(packs[i])) {
          if (isAnshou(packs[i])) {
            angang.push(i);
          } else {
            minggang.push(i);
          }
        } else if (isKezi(packs[i]) && isAnshou(packs[i])) {
          anke.push(i);
        }
      }
      const key = angang.length * 100 + minggang.length * 10 + anke.length;
      switch (key) {
        case 400:
          acc.addFan(constants.FAN_SIGANG, angang);
          acc.addFan(constants.FAN_SIANKE, angang);
          break;
        case 310:
          acc.addFan(constants.FAN_SIGANG, [
            angang[0],
            angang[1],
            angang[2],
            minggang[0]
          ]);
          acc.addFan(constants.FAN_SANANKE, angang);
          break;
        case 220:
          acc.addFan(constants.FAN_SIGANG, [
            angang[0],
            angang[1],
            minggang[0],
            minggang[1]
          ]);
          acc.addFan(constants.FAN_SHUANGANKE, angang);
          break;
        case 130:
          acc.addFan(constants.FAN_SIGANG, [
            angang[0],
            minggang[0],
            minggang[1],
            minggang[2]
          ]);
          break;
        case 301:
          acc.addFan(constants.FAN_SANGANG, angang);
          acc.addFan(constants.FAN_SIANKE, [
            angang[0],
            angang[1],
            angang[2],
            anke[0]
          ]);
          break;
        case 300:
          acc.addFan(constants.FAN_SANGANG, angang);
          acc.addFan(constants.FAN_SANANKE, angang);
          break;
        case 211:
          acc.addFan(constants.FAN_SANGANG, [angang[0], angang[1], minggang[0]]);
          acc.addFan(constants.FAN_SANANKE, [angang[0], angang[1], anke[0]]);
          break;
        case 210:
          acc.addFan(constants.FAN_SANGANG, [angang[0], angang[1], minggang[0]]);
          acc.addFan(constants.FAN_SHUANGANKE, [angang[0], angang[1]]);
          break;
        case 121:
          acc.addFan(constants.FAN_SANGANG, [angang[0], minggang[0], minggang[1]]);
          acc.addFan(constants.FAN_SHUANGANKE, [angang[0], anke[0]]);
          break;
        case 120:
          acc.addFan(constants.FAN_SANGANG, [angang[0], minggang[0], minggang[1]]);
          break;
        case 202:
          acc.addFan(constants.FAN_SHUANGANGANG, angang);
          acc.addFan(constants.FAN_SIANKE, [
            angang[0],
            angang[1],
            anke[0],
            anke[1]
          ]);
          break;
        case 201:
          acc.addFan(constants.FAN_SHUANGANGANG, angang);
          acc.addFan(constants.FAN_SANANKE, [angang[0], angang[1], anke[0]]);
          break;
        case 112:
          acc.addFan(constants.FAN_MINGANGANG, [angang[0], minggang[0]]);
          acc.addFan(constants.FAN_SANANKE, [angang[0], anke[0], anke[1]]);
          break;
        case 111:
          acc.addFan(constants.FAN_MINGANGANG, [angang[0], minggang[0]]);
          acc.addFan(constants.FAN_SHUANGANKE, [angang[0], anke[0]]);
          break;
        case 22:
          acc.addFan(constants.FAN_SHUANGMINGGANG, minggang);
          acc.addFan(constants.FAN_SHUANGANKE, anke);
          break;
        case 103:
          acc.addFan(constants.FAN_ANGANG, angang);
          acc.addFan(constants.FAN_SIANKE, [angang[0], anke[0], anke[1], anke[2]]);
          break;
        case 102:
          acc.addFan(constants.FAN_ANGANG, angang);
          acc.addFan(constants.FAN_SANANKE, [angang[0], anke[0], anke[1]]);
          break;
        case 101:
          acc.addFan(constants.FAN_ANGANG, angang);
          acc.addFan(constants.FAN_SHUANGANKE, [angang[0], anke[0]]);
          break;
        case 13:
          acc.addFan(constants.FAN_MINGGANG, minggang);
          acc.addFan(constants.FAN_SANANKE, anke);
          break;
        case 12:
          acc.addFan(constants.FAN_MINGGANG, minggang);
          acc.addFan(constants.FAN_SHUANGANKE, anke);
          break;
        default: {
          if (minggang.length === 4)
            acc.addFan(constants.FAN_SIGANG, minggang);
          else if (anke.length === 4)
            acc.addFan(constants.FAN_SIANKE, anke);
          else if (minggang.length === 3)
            acc.addFan(constants.FAN_SANGANG, minggang);
          else if (anke.length === 3)
            acc.addFan(constants.FAN_SANANKE, anke);
          else if (angang.length === 2)
            acc.addFan(constants.FAN_SHUANGANGANG, angang);
          else if (minggang.length === 2)
            acc.addFan(constants.FAN_SHUANGMINGGANG, minggang);
          else if (anke.length === 2)
            acc.addFan(constants.FAN_SHUANGANKE, anke);
          else if (minggang.length === 1 && angang.length === 1)
            acc.addFan(constants.FAN_MINGANGANG, [angang[0], minggang[0]]);
          else if (angang.length === 1)
            acc.addFan(constants.FAN_ANGANG, angang);
          else if (minggang.length === 1)
            acc.addFan(constants.FAN_MINGGANG, minggang);
          break;
        }
      }
      if (acc.hasFan(constants.FAN_SIGANG)) {
        acc.excludeFan(constants.FAN_PENGPENGHU);
        for (let i = 0; i < packs.length; i++) {
          if (isJiang(packs[i])) {
            acc.excludeFan(constants.FAN_DANDIAOJIANG, [i]);
            break;
          }
        }
      }
      if (acc.hasFan(constants.FAN_SHUANGANGANG)) {
        const entries = acc.fanTable.get(constants.FAN_SHUANGANGANG);
        if (entries && entries.length > 0) {
          acc.excludeFan(constants.FAN_SHUANGANKE, entries[0]);
        }
      }
      if (acc.hasFan(constants.FAN_SIANKE)) {
        acc.excludeFan(constants.FAN_PENGPENGHU);
        acc.excludeFan(constants.FAN_BUQIUREN);
        acc.excludeFan(constants.FAN_MENQIANQING);
      }
    };
    module.exports = { countKeGangFans };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/scoring/combination.js
var require_combination = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/scoring/combination.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var {
      isFeng,
      isJian,
      isShu,
      isShunzi,
      isKeGang,
      isJiang,
      tileRank,
      tileSuit,
      packTileId,
      packsEqual
    } = require_helpers();
    var countAssociatedCombinationFans = (acc, packs) => {
      const candidates = [];
      const shunziIds = [];
      const kegangIds = [];
      const jiangIds = [];
      for (let i = 0; i < packs.length; i++) {
        if (isShunzi(packs[i]))
          shunziIds.push(i);
        else if (isKeGang(packs[i]))
          kegangIds.push(i);
        else if (isJiang(packs[i]))
          jiangIds.push(i);
      }
      {
        const fengKegang = [];
        const fengJiang = [];
        for (let i = 0; i < packs.length; i++) {
          if (isFeng(packTileId(packs[i]))) {
            if (isKeGang(packs[i]))
              fengKegang.push(i);
            else
              fengJiang.push(i);
          }
        }
        if (fengKegang.length === 4) {
          candidates.push({ fanId: constants.FAN_DASIXI, packs: fengKegang });
        }
        if (fengKegang.length === 3 && fengJiang.length === 1) {
          candidates.push({
            fanId: constants.FAN_XIAOSIXI,
            packs: [fengKegang[0], fengKegang[1], fengKegang[2], fengJiang[0]]
          });
        }
        if (fengKegang.length === 3) {
          candidates.push({
            fanId: constants.FAN_SANFENGKE,
            packs: [fengKegang[0], fengKegang[1], fengKegang[2]]
          });
        }
      }
      {
        const jianKegang = [];
        const jianJiang = [];
        for (let i = 0; i < packs.length; i++) {
          if (isJian(packTileId(packs[i]))) {
            if (isKeGang(packs[i]))
              jianKegang.push(i);
            else
              jianJiang.push(i);
          }
        }
        if (jianKegang.length === 3) {
          candidates.push({ fanId: constants.FAN_DASANYUAN, packs: jianKegang });
        }
        if (jianKegang.length === 2 && jianJiang.length === 1) {
          candidates.push({
            fanId: constants.FAN_XIAOSANYUAN,
            packs: [jianKegang[0], jianKegang[1], jianJiang[0]]
          });
        }
        if (jianKegang.length === 2) {
          candidates.push({
            fanId: constants.FAN_SHUANGJIANKE,
            packs: [jianKegang[0], jianKegang[1]]
          });
        }
      }
      {
        const shunzi123 = [];
        const shunzi789 = [];
        for (const id of shunziIds) {
          const rank = tileRank(packTileId(packs[id]));
          if (rank === 2)
            shunzi123.push(id);
          else if (rank === 8)
            shunzi789.push(id);
        }
        if (shunzi123.length === 2 && shunzi789.length === 2 && jiangIds.length > 0 && tileRank(packTileId(packs[jiangIds[0]])) === 5) {
          const suit123a = tileSuit(packTileId(packs[shunzi123[0]]));
          const suit123b = tileSuit(packTileId(packs[shunzi123[1]]));
          const suit789a = tileSuit(packTileId(packs[shunzi789[0]]));
          const suit789b = tileSuit(packTileId(packs[shunzi789[1]]));
          const suitJiang = tileSuit(packTileId(packs[jiangIds[0]]));
          if (suit123a === suit123b && suit123a === suit789a && suit123a === suit789b && suit123a === suitJiang) {
            candidates.push({
              fanId: constants.FAN_YISESHUANGLONGHUI,
              packs: [
                shunzi123[0],
                shunzi123[1],
                shunzi789[0],
                shunzi789[1],
                jiangIds[0]
              ]
            });
          } else if ((suit123a === suit789a && suit123b === suit789b || suit123a === suit789b && suit123b === suit789a) && suit123a !== suit123b && suit123a !== suitJiang && suit123b !== suitJiang) {
            candidates.push({
              fanId: constants.FAN_SANSESHUANGLONGHUI,
              packs: [
                shunzi123[0],
                shunzi123[1],
                shunzi789[0],
                shunzi789[1],
                jiangIds[0]
              ]
            });
          }
        }
      }
      for (let i = 0; i < shunziIds.length; i++) {
        for (let j = i + 1; j < shunziIds.length; j++) {
          if (packsEqual(packs[shunziIds[i]], packs[shunziIds[j]])) {
            candidates.push({
              fanId: constants.FAN_YIBANGAO,
              packs: [shunziIds[i], shunziIds[j]]
            });
            for (let k = j + 1; k < shunziIds.length; k++) {
              if (packsEqual(packs[shunziIds[j]], packs[shunziIds[k]])) {
                candidates.push({
                  fanId: constants.FAN_YISESANTONGSHUN,
                  packs: [shunziIds[i], shunziIds[j], shunziIds[k]]
                });
                for (let l = k + 1; l < shunziIds.length; l++) {
                  if (packsEqual(packs[shunziIds[k]], packs[shunziIds[l]])) {
                    candidates.push({
                      fanId: constants.FAN_YISESITONGSHUN,
                      packs: [
                        shunziIds[i],
                        shunziIds[j],
                        shunziIds[k],
                        shunziIds[l]
                      ]
                    });
                  }
                }
              }
            }
          }
        }
      }
      {
        const sortedKegang = kegangIds.filter((id) => isShu(packTileId(packs[id]))).map((id) => ({ rank: tileRank(packTileId(packs[id])), id })).sort((a, b) => a.rank - b.rank);
        for (let i = 0; i < sortedKegang.length; i++) {
          for (let j = i + 1; j < sortedKegang.length; j++) {
            if (sortedKegang[j].rank !== sortedKegang[i].rank + 1)
              continue;
            for (let k = j + 1; k < sortedKegang.length; k++) {
              if (sortedKegang[k].rank !== sortedKegang[j].rank + 1)
                continue;
              const si = tileSuit(packTileId(packs[sortedKegang[i].id]));
              const sj = tileSuit(packTileId(packs[sortedKegang[j].id]));
              const sk = tileSuit(packTileId(packs[sortedKegang[k].id]));
              if (si !== sj && si !== sk && sj !== sk) {
                candidates.push({
                  fanId: constants.FAN_SANSESANJIEGAO,
                  packs: [
                    sortedKegang[i].id,
                    sortedKegang[j].id,
                    sortedKegang[k].id
                  ]
                });
              } else if (si === sj && si === sk) {
                candidates.push({
                  fanId: constants.FAN_YISESANJIEGAO,
                  packs: [
                    sortedKegang[i].id,
                    sortedKegang[j].id,
                    sortedKegang[k].id
                  ]
                });
              }
              for (let l = k + 1; l < sortedKegang.length; l++) {
                if (si === sj && si === sk && si === tileSuit(packTileId(packs[sortedKegang[l].id]))) {
                  candidates.push({
                    fanId: constants.FAN_YISESIJIEGAO,
                    packs: [
                      sortedKegang[i].id,
                      sortedKegang[j].id,
                      sortedKegang[k].id,
                      sortedKegang[l].id
                    ]
                  });
                }
              }
            }
          }
        }
      }
      {
        const sortedShunzi = shunziIds.map((id) => ({ rank: tileRank(packTileId(packs[id])), id })).sort((a, b) => a.rank - b.rank);
        for (let i = 0; i < sortedShunzi.length; i++) {
          for (let j = i + 1; j < sortedShunzi.length; j++) {
            const step1 = sortedShunzi[j].rank - sortedShunzi[i].rank;
            if (step1 !== 1 && step1 !== 2 || tileSuit(packTileId(packs[sortedShunzi[i].id])) !== tileSuit(packTileId(packs[sortedShunzi[j].id])))
              continue;
            for (let k = j + 1; k < sortedShunzi.length; k++) {
              const step2 = sortedShunzi[k].rank - sortedShunzi[j].rank;
              if (step2 !== 1 && step2 !== 2 || tileSuit(packTileId(packs[sortedShunzi[j].id])) !== tileSuit(packTileId(packs[sortedShunzi[k].id])))
                continue;
              if (step1 === step2) {
                candidates.push({
                  fanId: constants.FAN_YISESANBUGAO,
                  packs: [
                    sortedShunzi[i].id,
                    sortedShunzi[j].id,
                    sortedShunzi[k].id
                  ]
                });
              }
              for (let l = k + 1; l < sortedShunzi.length; l++) {
                const step3 = sortedShunzi[l].rank - sortedShunzi[k].rank;
                if (step3 !== 1 && step3 !== 2 || tileSuit(packTileId(packs[sortedShunzi[k].id])) !== tileSuit(packTileId(packs[sortedShunzi[l].id])))
                  continue;
                if (step1 === step2 && step1 === step3) {
                  candidates.push({
                    fanId: constants.FAN_YISESIBUGAO,
                    packs: [
                      sortedShunzi[i].id,
                      sortedShunzi[j].id,
                      sortedShunzi[k].id,
                      sortedShunzi[l].id
                    ]
                  });
                }
              }
            }
          }
        }
        for (let i = 0; i < sortedShunzi.length; i++) {
          for (let j = i + 1; j < sortedShunzi.length; j++) {
            if (sortedShunzi[j].rank - sortedShunzi[i].rank !== 1 || tileSuit(packTileId(packs[sortedShunzi[i].id])) === tileSuit(packTileId(packs[sortedShunzi[j].id])))
              continue;
            for (let k = j + 1; k < sortedShunzi.length; k++) {
              if (sortedShunzi[k].rank - sortedShunzi[j].rank !== 1 || tileSuit(packTileId(packs[sortedShunzi[i].id])) === tileSuit(packTileId(packs[sortedShunzi[k].id])) || tileSuit(packTileId(packs[sortedShunzi[j].id])) === tileSuit(packTileId(packs[sortedShunzi[k].id])))
                continue;
              candidates.push({
                fanId: constants.FAN_SANSESANBUGAO,
                packs: [sortedShunzi[i].id, sortedShunzi[j].id, sortedShunzi[k].id]
              });
            }
          }
        }
      }
      {
        const rankMap = /* @__PURE__ */ new Map();
        for (const id of shunziIds) {
          const rank = tileRank(packTileId(packs[id]));
          if (!rankMap.has(rank))
            rankMap.set(rank, []);
          rankMap.get(rank).push(id);
        }
        if (rankMap.has(2) && rankMap.has(5) && rankMap.has(8)) {
          for (const i of rankMap.get(2)) {
            for (const j of rankMap.get(5)) {
              for (const k of rankMap.get(8)) {
                const s1 = tileSuit(packTileId(packs[i]));
                const s2 = tileSuit(packTileId(packs[j]));
                const s3 = tileSuit(packTileId(packs[k]));
                if (s1 === s2 && s1 === s3) {
                  candidates.push({
                    fanId: constants.FAN_QINGLONG,
                    packs: [i, j, k]
                  });
                }
                if (s1 !== s2 && s1 !== s3 && s2 !== s3) {
                  candidates.push({
                    fanId: constants.FAN_HUALONG,
                    packs: [i, j, k]
                  });
                }
              }
            }
          }
        }
      }
      for (let i = 0; i < kegangIds.length; i++) {
        for (let j = i + 1; j < kegangIds.length; j++) {
          if (isShu(packTileId(packs[kegangIds[i]])) && tileRank(packTileId(packs[kegangIds[i]])) === tileRank(packTileId(packs[kegangIds[j]]))) {
            candidates.push({
              fanId: constants.FAN_SHUANGTONGKE,
              packs: [kegangIds[i], kegangIds[j]]
            });
            for (let k = j + 1; k < kegangIds.length; k++) {
              if (tileRank(packTileId(packs[kegangIds[j]])) === tileRank(packTileId(packs[kegangIds[k]]))) {
                candidates.push({
                  fanId: constants.FAN_SANTONGKE,
                  packs: [kegangIds[i], kegangIds[j], kegangIds[k]]
                });
              }
            }
          }
        }
      }
      for (let i = 0; i < shunziIds.length; i++) {
        for (let j = i + 1; j < shunziIds.length; j++) {
          if (tileRank(packTileId(packs[shunziIds[i]])) !== tileRank(packTileId(packs[shunziIds[j]])) || tileSuit(packTileId(packs[shunziIds[i]])) === tileSuit(packTileId(packs[shunziIds[j]])))
            continue;
          for (let k = j + 1; k < shunziIds.length; k++) {
            if (tileRank(packTileId(packs[shunziIds[j]])) === tileRank(packTileId(packs[shunziIds[k]])) && tileSuit(packTileId(packs[shunziIds[i]])) !== tileSuit(packTileId(packs[shunziIds[k]])) && tileSuit(packTileId(packs[shunziIds[j]])) !== tileSuit(packTileId(packs[shunziIds[k]]))) {
              candidates.push({
                fanId: constants.FAN_SANSESANTONGSHUN,
                packs: [shunziIds[i], shunziIds[j], shunziIds[k]]
              });
            }
          }
        }
      }
      for (let i = 0; i < shunziIds.length; i++) {
        for (let j = i + 1; j < shunziIds.length; j++) {
          const si = tileSuit(packTileId(packs[shunziIds[i]]));
          const sj = tileSuit(packTileId(packs[shunziIds[j]]));
          const ri = tileRank(packTileId(packs[shunziIds[i]]));
          const rj = tileRank(packTileId(packs[shunziIds[j]]));
          if (si !== sj) {
            if (ri === rj) {
              candidates.push({
                fanId: constants.FAN_XIXIANGFENG,
                packs: [shunziIds[i], shunziIds[j]]
              });
            }
          } else if (ri === rj + 3 || ri === rj - 3) {
            candidates.push({
              fanId: constants.FAN_LIANLIU,
              packs: [shunziIds[i], shunziIds[j]]
            });
          } else if (ri === rj + 6 || ri === rj - 6) {
            candidates.push({
              fanId: constants.FAN_LAOSHAOFU,
              packs: [shunziIds[i], shunziIds[j]]
            });
          }
        }
      }
      if (candidates.length === 0)
        return;
      const bestState = bfsOptimize(candidates, packs.length);
      if (!bestState)
        return;
      for (const id of bestState.eids) {
        const c = candidates[id];
        acc.addFan(c.fanId, c.packs);
        switch (c.fanId) {
          case constants.FAN_DASIXI:
            acc.excludeFan(constants.FAN_PENGPENGHU);
            for (const pi of c.packs) {
              if (isFeng(packTileId(packs[pi]))) {
                acc.excludeFan(constants.FAN_QUANFENGKE, [pi]);
                acc.excludeFan(constants.FAN_MENFENGKE, [pi]);
                acc.excludeFan(constants.FAN_YAOJIUKE, [pi]);
              }
            }
            break;
          case constants.FAN_DASANYUAN:
          case constants.FAN_XIAOSANYUAN:
          case constants.FAN_SHUANGJIANKE:
            for (const pi of c.packs) {
              if (isJian(packTileId(packs[pi]))) {
                acc.excludeFan(constants.FAN_JIANKE, [pi]);
                acc.excludeFan(constants.FAN_YAOJIUKE, [pi]);
              }
            }
            break;
          case constants.FAN_XIAOSIXI:
          case constants.FAN_SANFENGKE:
            for (const pi of c.packs) {
              if (isFeng(packTileId(packs[pi]))) {
                acc.excludeFan(constants.FAN_YAOJIUKE, [pi]);
              }
            }
            break;
          case constants.FAN_YISESHUANGLONGHUI:
            acc.excludeFan(constants.FAN_QINGYISE);
            acc.excludeFan(constants.FAN_PINGHU);
            acc.excludeFan(constants.FAN_WUZI);
            break;
          case constants.FAN_YISESITONGSHUN:
            acc.excludeFan(constants.FAN_SIGUIYI);
            acc.excludeFan(constants.FAN_SIGUIYI);
            acc.excludeFan(constants.FAN_SIGUIYI);
            break;
          case constants.FAN_YISESIJIEGAO:
            acc.excludeFan(constants.FAN_PENGPENGHU);
            break;
          case constants.FAN_SANSESHUANGLONGHUI:
            acc.excludeFan(constants.FAN_PINGHU);
            break;
          default:
            break;
        }
      }
    };
    var bfsOptimize = (candidates, packCount) => {
      class UF {
        constructor(n) {
          this.f = Array.from({ length: n }, (_, i) => i);
        }
        find(x) {
          if (this.f[x] !== x)
            this.f[x] = this.find(this.f[x]);
          return this.f[x];
        }
        union(a, b) {
          const ra = this.find(a);
          const rb = this.find(b);
          if (ra === rb)
            return false;
          if (ra < rb)
            this.f[rb] = ra;
          else
            this.f[ra] = rb;
          return true;
        }
        clone() {
          const copy = new UF(0);
          copy.f = this.f.slice();
          return copy;
        }
        hash() {
          let h = 0;
          for (let i = 0; i < this.f.length; i++) {
            h = h * 5 + this.find(i);
          }
          return h;
        }
      }
      class State {
        constructor() {
          this.uf = new UF(packCount);
          this.eids = [];
          this.score = 0;
        }
        tryAdd(id) {
          const v = candidates[id].packs;
          for (let i = 0; i < v.length; i++) {
            for (let j = i + 1; j < v.length; j++) {
              if (this.uf.find(v[i]) === this.uf.find(v[j])) {
                return null;
              }
            }
          }
          const newState = new State();
          newState.uf = this.uf.clone();
          newState.eids = this.eids.slice();
          newState.score = this.score;
          for (let i = 1; i < v.length; i++) {
            newState.uf.union(v[i], v[i - 1]);
          }
          newState.eids.push(id);
          newState.score += constants.FAN_SCORE[candidates[id].fanId];
          return newState;
        }
      }
      const visited = /* @__PURE__ */ new Map();
      let bestState = null;
      let bestScore = 0;
      const queue = [new State()];
      visited.set(new State().uf.hash(), 0);
      while (queue.length > 0) {
        const current = queue.shift();
        for (let i = 0; i < candidates.length; i++) {
          const next = current.tryAdd(i);
          if (!next)
            continue;
          const h = next.uf.hash();
          if (visited.has(h) && visited.get(h) >= next.score)
            continue;
          visited.set(h, next.score);
          queue.push(next);
          if (next.score > bestScore) {
            bestScore = next.score;
            bestState = next;
          }
        }
      }
      return bestState;
    };
    module.exports = { countAssociatedCombinationFans, bfsOptimize };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/scoring/single-pack.js
var require_single_pack = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/scoring/single-pack.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var { isKeGang, isJian, isYaojiu, packTileId } = require_helpers();
    var countSinglePackFans = (acc, hand, packs) => {
      for (let i = 0; i < packs.length; i++) {
        const p = packs[i];
        if (!isKeGang(p))
          continue;
        const tid = packTileId(p);
        if (isJian(tid)) {
          acc.addFan(constants.FAN_JIANKE, [i]);
          acc.excludeFan(constants.FAN_YAOJIUKE, [i]);
        }
        if (tid === hand.context.quanfeng) {
          acc.addFan(constants.FAN_QUANFENGKE, [i]);
          acc.excludeFan(constants.FAN_YAOJIUKE, [i]);
        }
        if (tid === hand.context.menfeng) {
          acc.addFan(constants.FAN_MENFENGKE, [i]);
          acc.excludeFan(constants.FAN_YAOJIUKE, [i]);
        }
        if (isYaojiu(tid)) {
          acc.addFan(constants.FAN_YAOJIUKE, [i]);
        }
      }
    };
    module.exports = { countSinglePackFans };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/ting/calc-ting.js
var require_calc_ting = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/ting/calc-ting.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var { isNumberedTile, tileRank } = require_helpers();
    var calcTing = (hand) => {
      const handWithoutWin = hand.tiles.slice(0, -1);
      const counts = new Array(constants.TILE_P + 1).fill(0);
      for (const tile of handWithoutWin) {
        counts[tile.GetId()]++;
      }
      const tingTiles = [];
      for (let t = constants.TILE_1m; t <= constants.TILE_P; t++) {
        counts[t]++;
        if (canFormMelds(counts, hand.packs.length)) {
          tingTiles.push(t);
        }
        counts[t]--;
      }
      return tingTiles;
    };
    var canFormMelds = (counts, meldCount) => {
      const c = counts.slice();
      const target = 4 - meldCount;
      for (let t = constants.TILE_1m; t <= constants.TILE_P; t++) {
        if (c[t] < 2)
          continue;
        c[t] -= 2;
        if (canFormNMelds(c, target)) {
          c[t] += 2;
          return true;
        }
        c[t] += 2;
      }
      return false;
    };
    var canFormNMelds = (counts, n) => {
      if (n === 0) {
        return counts.every((c) => c === 0);
      }
      let first = -1;
      for (let t = constants.TILE_1m; t <= constants.TILE_P; t++) {
        if (counts[t] > 0) {
          first = t;
          break;
        }
      }
      if (first === -1)
        return n === 0;
      if (counts[first] >= 3) {
        counts[first] -= 3;
        const ok = canFormNMelds(counts, n - 1);
        counts[first] += 3;
        if (ok)
          return true;
      }
      if (isNumberedTile(first) && tileRank(first) <= 7 && counts[first + 1] > 0 && counts[first + 2] > 0) {
        counts[first]--;
        counts[first + 1]--;
        counts[first + 2]--;
        const ok = canFormNMelds(counts, n - 1);
        counts[first]++;
        counts[first + 1]++;
        counts[first + 2]++;
        if (ok)
          return true;
      }
      return false;
    };
    module.exports = {
      calcTing,
      canFormMelds,
      canFormNMelds
    };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/detection/zuhelong.js
var require_zuhelong = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/detection/zuhelong.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var {
      isNumberedTile,
      isShunzi,
      tileRank,
      packType,
      packTileId: getPackTileId
    } = require_helpers();
    var judgeZuhelong = (tileBitmap) => {
      for (let i = 1; i <= 6; i++) {
        if ((tileBitmap & constants.ZuhelongBitmap[i]) === constants.ZuhelongBitmap[i]) {
          return i;
        }
      }
      return 0;
    };
    var judgePartOfZuhelong = (bitmap) => {
      const shuBitmap = bitmap & constants.TILE_TYPE_BITMAP_SHU;
      for (let i = 1; i <= 6; i++) {
        if ((constants.ZuhelongBitmap[i] | shuBitmap) === constants.ZuhelongBitmap[i]) {
          return true;
        }
      }
      return false;
    };
    var enumerateZuhelongDecompositions = (hand, zuhelongType) => {
      const results = [];
      const zuhelongBitmap = constants.ZuhelongBitmap[zuhelongType];
      const remaining = [];
      let bm = zuhelongBitmap;
      for (const tile of hand.tiles) {
        const tbm = tile.GetBitmap();
        if (bm & tbm) {
          bm ^= tbm;
        } else {
          remaining.push(tile);
        }
      }
      const counts = new Array(constants.TILE_P + 1).fill(0);
      for (const tile of remaining) {
        counts[tile.GetId()]++;
      }
      const zuhelongPack = {
        type: constants.PACK_TYPE_ZUHELONG,
        tile: { GetId: () => 0, GetBitmap: () => 0n },
        offer: 0,
        zuhelong: zuhelongType
      };
      const meldsNeeded = 1 - hand.packs.length;
      for (let t = constants.TILE_1m; t <= constants.TILE_P; t++) {
        if (counts[t] < 2)
          continue;
        counts[t] -= 2;
        const pairPack = {
          type: constants.PACK_TYPE_JIANG,
          tile: { GetId: () => t, GetBitmap: () => 1n << BigInt(t) },
          offer: 0
        };
        if (meldsNeeded <= 0) {
          results.push({ packs: [pairPack, zuhelongPack], zuhelongPack });
        } else {
          const melds = findNMelds(counts, meldsNeeded);
          if (melds) {
            results.push({
              packs: [...melds, pairPack, zuhelongPack],
              zuhelongPack
            });
          }
        }
        counts[t] += 2;
      }
      return results;
    };
    var findNMelds = (counts, n) => {
      if (n === 0) {
        for (let t = constants.TILE_1m; t <= constants.TILE_P; t++) {
          if (counts[t] !== 0)
            return null;
        }
        return [];
      }
      const c = counts.slice();
      const melds = [];
      for (let i = 0; i < n; i++) {
        const meld = findMeld(c);
        if (!meld)
          return null;
        melds.push(meld);
        const tid = meld.tile.GetId();
        if (meld.type === constants.PACK_TYPE_KEZI) {
          c[tid] -= 3;
        } else if (meld.type === constants.PACK_TYPE_SHUNZI) {
          c[tid - 1]--;
          c[tid]--;
          c[tid + 1]--;
        }
      }
      for (let t = constants.TILE_1m; t <= constants.TILE_P; t++) {
        if (c[t] !== 0)
          return null;
      }
      return melds;
    };
    var findMeld = (counts) => {
      for (let t = constants.TILE_1m; t <= constants.TILE_P; t++) {
        if (counts[t] === 0)
          continue;
        if (counts[t] >= 3) {
          return {
            type: constants.PACK_TYPE_KEZI,
            tile: { GetId: () => t, GetBitmap: () => 1n << BigInt(t) },
            offer: 0
          };
        }
        if (isNumberedTile(t) && tileRank(t) <= 7 && counts[t + 1] > 0 && counts[t + 2] > 0) {
          return {
            type: constants.PACK_TYPE_SHUNZI,
            tile: { GetId: () => t + 1, GetBitmap: () => 1n << BigInt(t + 1) },
            offer: 0
          };
        }
        break;
      }
      return null;
    };
    var packContainsWinningTile = (pack, winTileId) => {
      const tid = getPackTileId(pack);
      if (isShunzi(pack)) {
        return winTileId === tid - 1 || winTileId === tid || winTileId === tid + 1;
      }
      return tid === winTileId;
    };
    var markWinningTilePacks = (decompositions, winTileId, handPackCount, zimo) => {
      for (const packs of decompositions) {
        for (let i = 0; i < packs.length; i++) {
          const p = packs[i];
          const type = packType(p);
          if (type === constants.PACK_TYPE_ZUHELONG)
            continue;
          if (!packContainsWinningTile(p, winTileId))
            continue;
          if (i >= handPackCount) {
            const newOffer = zimo ? -1 : -2;
            if (typeof p.SetOffer === "function") {
              p.SetOffer(newOffer);
            } else {
              p.offer = newOffer;
            }
            break;
          }
        }
      }
    };
    module.exports = {
      judgeZuhelong,
      judgePartOfZuhelong,
      enumerateZuhelongDecompositions,
      findNMelds,
      findMeld,
      packContainsWinningTile,
      markWinningTilePacks
    };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/scoring/win-mode.js
var require_win_mode = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/scoring/win-mode.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var {
      isShunzi,
      isJiang,
      isAnshou,
      tileRank,
      packType,
      packTileId
    } = require_helpers();
    var { isMenqing } = require_bitmap();
    var { canFormMelds } = require_calc_ting();
    var { packContainsWinningTile } = require_zuhelong();
    var findJiangPackIdx = (packs) => {
      for (let i = 0; i < packs.length; i++) {
        if (isJiang(packs[i]))
          return i;
      }
      return -1;
    };
    var findZuhelongPackIdx = (packs) => {
      for (let i = 0; i < packs.length; i++) {
        if (packType(packs[i]) === constants.PACK_TYPE_ZUHELONG)
          return i;
      }
      return -1;
    };
    var removeZuhelongTiles = (tiles, zbm) => {
      const remaining = [];
      let bm = zbm;
      for (const tile of tiles) {
        const tbm = tile.GetBitmap();
        if (bm & tbm) {
          bm ^= tbm;
        } else {
          remaining.push(tile);
        }
      }
      return remaining;
    };
    var detectWaitInPacks = (packs, winTileId) => {
      for (let i = 0; i < packs.length; i++) {
        const p = packs[i];
        const pt = packType(p);
        if (pt === constants.PACK_TYPE_ZUHELONG)
          continue;
        if (!packContainsWinningTile(p, winTileId))
          continue;
        if (isJiang(p)) {
          return { fanId: constants.FAN_DANDIAOJIANG, packIdx: i };
        }
        if (isShunzi(p)) {
          const midRank = tileRank(packTileId(p));
          const winRank = tileRank(winTileId);
          if (midRank === 2 && winRank === 3 || midRank === 8 && winRank === 7) {
            return { fanId: constants.FAN_BIANZHANG, packIdx: i };
          }
          if (midRank === winRank) {
            return { fanId: constants.FAN_KANZHANG, packIdx: i };
          }
        }
      }
      return null;
    };
    var countWinModeFans = (acc, hand, packs, zuhelongType) => {
      const ctx = hand.context;
      if (ctx.haidi && ctx.zimo) {
        acc.addFan(constants.FAN_MIAOSHOUHUICHUN);
        acc.excludeFan(constants.FAN_ZIMO);
      }
      if (ctx.haidi && !ctx.zimo) {
        acc.addFan(constants.FAN_HAIDILAOYUE);
      }
      if (ctx.gang && ctx.zimo) {
        acc.addFan(constants.FAN_GANGSHANGKAIHUA);
        acc.excludeFan(constants.FAN_ZIMO);
      }
      if (ctx.gang && !ctx.zimo) {
        acc.addFan(constants.FAN_QIANGGANGHU);
        acc.excludeFan(constants.FAN_HUJUEZHANG);
      }
      const allFulu = hand.packs.length === 4 && hand.packs.every((p) => !isAnshou(p));
      if (allFulu && !ctx.zimo) {
        acc.addFan(constants.FAN_QUANQIUREN);
        const jiangIdx = findJiangPackIdx(packs);
        if (jiangIdx >= 0) {
          acc.excludeFan(constants.FAN_DANDIAOJIANG, [jiangIdx]);
        }
      }
      if (isMenqing(hand) && ctx.zimo) {
        acc.addFan(constants.FAN_BUQIUREN);
        acc.excludeFan(constants.FAN_MENQIANQING);
        acc.excludeFan(constants.FAN_ZIMO);
      }
      if (ctx.juezhang) {
        acc.addFan(constants.FAN_HUJUEZHANG);
        const jiangIdx = findJiangPackIdx(packs);
        if (jiangIdx >= 0) {
          acc.excludeFan(constants.FAN_DANDIAOJIANG, [jiangIdx]);
        }
      }
      if (isMenqing(hand)) {
        acc.addFan(constants.FAN_MENQIANQING);
      }
      {
        const winTileId = hand.winningTile ? hand.winningTile.GetId() : hand.tiles[hand.tiles.length - 1].GetId();
        const zbm = zuhelongType > 0 ? constants.ZuhelongBitmap[zuhelongType] : 0n;
        let canDetectWait = false;
        let waitFanId = 0;
        let waitPackIdx = -1;
        const tileCountsForVerify = new Array(constants.TILE_P + 1).fill(0);
        for (let ti = 0; ti < hand.tiles.length - 1; ti++) {
          tileCountsForVerify[hand.tiles[ti].GetId()]++;
        }
        if (zuhelongType > 0) {
          const winBitmap = 1n << BigInt(winTileId);
          const winInZuhelong = (zbm & winBitmap) !== 0n;
          if (winInZuhelong) {
            const remaining = removeZuhelongTiles(hand.tiles, zbm);
            const zlTileIds = [];
            let bm3 = zbm;
            for (const tile of hand.tiles) {
              const tbm = tile.GetBitmap();
              if (bm3 & tbm) {
                bm3 ^= tbm;
                zlTileIds.push(tile.GetId());
              }
            }
            zlTileIds.sort((a, b) => a - b);
            let winGroup = null;
            for (let g = 0; g < 3; g++) {
              const group = zlTileIds.slice(g * 3, (g + 1) * 3);
              if (group.includes(winTileId)) {
                winGroup = group;
                break;
              }
            }
            if (winGroup) {
              const groupLow = Math.min(...winGroup);
              const posInGroup = winTileId - groupLow;
              waitFanId = posInGroup === 0 || posInGroup === 6 ? constants.FAN_BIANZHANG : constants.FAN_KANZHANG;
              const remCounts = new Array(constants.TILE_P + 1).fill(0);
              for (const t of remaining)
                remCounts[t.GetId()]++;
              const hasRemPair = remCounts.some((c) => c >= 2);
              if (!hasRemPair) {
                waitPackIdx = findZuhelongPackIdx(packs);
              }
            }
          } else {
            const detected = detectWaitInPacks(packs, winTileId);
            if (detected) {
              waitFanId = detected.fanId;
              waitPackIdx = detected.packIdx;
            }
            if (waitPackIdx < 0) {
              const remaining = removeZuhelongTiles(hand.tiles, zbm);
              const winIdx = remaining.findIndex((t) => t.GetId() === winTileId);
              if (winIdx >= 0)
                remaining.splice(winIdx, 1);
              const hasPair = remaining.some((t) => t.GetId() === winTileId);
              if (hasPair) {
                waitFanId = constants.FAN_DANDIAOJIANG;
                for (let i = 0; i < packs.length; i++) {
                  if (isJiang(packs[i]) && packTileId(packs[i]) === winTileId) {
                    waitPackIdx = i;
                    break;
                  }
                }
                if (waitPackIdx < 0) {
                  waitPackIdx = findZuhelongPackIdx(packs);
                }
              } else {
                const allCounts = new Array(constants.TILE_P + 1).fill(0);
                for (const tile of hand.tiles) {
                  if (tile.GetId() !== winTileId)
                    allCounts[tile.GetId()]++;
                }
                const winRank = tileRank(winTileId);
                const isLow = winRank <= 7 && allCounts[winTileId + 1] > 0 && allCounts[winTileId + 2] > 0;
                const isMid = winRank >= 2 && winRank <= 8 && allCounts[winTileId - 1] > 0 && allCounts[winTileId + 1] > 0;
                const isHigh = winRank >= 3 && allCounts[winTileId - 1] > 0 && allCounts[winTileId - 2] > 0;
                if (isLow || isMid || isHigh) {
                  waitFanId = isMid && !isLow && !isHigh ? constants.FAN_KANZHANG : constants.FAN_BIANZHANG;
                  waitPackIdx = findZuhelongPackIdx(packs);
                  if (waitPackIdx < 0)
                    waitPackIdx = packs.length - 1;
                }
              }
            }
          }
          if (waitPackIdx >= 0) {
            const zlVerify = new Array(constants.TILE_P + 1).fill(0);
            let bmZv = zbm;
            for (let ti = 0; ti < hand.tiles.length - 1; ti++) {
              const tid = hand.tiles[ti].GetId();
              const tbm = 1n << BigInt(tid);
              if (bmZv & tbm) {
                bmZv ^= tbm;
              } else {
                zlVerify[tid]++;
              }
            }
            const zlMeldCount = hand.packs.length + 3;
            canDetectWait = true;
            for (let t = constants.TILE_1m; t <= constants.TILE_P; t++) {
              if (t === winTileId)
                continue;
              zlVerify[t]++;
              if (canFormMelds(zlVerify, zlMeldCount)) {
                canDetectWait = false;
                zlVerify[t]--;
                break;
              }
              zlVerify[t]--;
            }
          }
        } else {
          const detected = detectWaitInPacks(packs, winTileId);
          if (detected) {
            waitFanId = detected.fanId;
            waitPackIdx = detected.packIdx;
          }
          if (waitPackIdx < 0) {
            for (let i = 0; i < packs.length; i++) {
              const p = packs[i];
              const pt = packType(p);
              if (pt === constants.PACK_TYPE_ZUHELONG)
                continue;
              if (isJiang(p) && packContainsWinningTile(p, winTileId)) {
                waitFanId = constants.FAN_DANDIAOJIANG;
                waitPackIdx = i;
                break;
              }
            }
          }
          if (waitPackIdx >= 0) {
            canDetectWait = true;
            for (let t = constants.TILE_1m; t <= constants.TILE_P; t++) {
              if (t === winTileId)
                continue;
              tileCountsForVerify[t]++;
              if (canFormMelds(tileCountsForVerify, hand.packs.length)) {
                canDetectWait = false;
                tileCountsForVerify[t]--;
                break;
              }
              tileCountsForVerify[t]--;
            }
          }
        }
        if (canDetectWait) {
          acc.addFan(waitFanId, waitPackIdx >= 0 ? [waitPackIdx] : []);
        }
      }
      if (ctx.zimo) {
        acc.addFan(constants.FAN_ZIMO);
        if ((acc.hasFan(constants.FAN_JIULIANBAODENG) || acc.hasFan(constants.FAN_SIANKE)) && !acc.hasFan(constants.FAN_MIAOSHOUHUICHUN) && !acc.hasFan(constants.FAN_GANGSHANGKAIHUA)) {
          acc.excludedTable.delete(constants.FAN_ZIMO);
        }
      }
    };
    module.exports = { countWinModeFans, packContainsWinningTile };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/detection/special-hands.js
var require_special_hands = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/detection/special-hands.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var { isHonorTile, tileSuit } = require_helpers();
    var { collectTileBitmap, bitPopCount } = require_bitmap();
    var { judgePartOfZuhelong } = require_zuhelong();
    var isCompleteClosedHand = (hand) => Boolean(hand) && hand.packs.length === 0 && hand.tiles.length === 14;
    var buildTileCounts = (tiles) => {
      const counts = /* @__PURE__ */ new Map();
      for (const tile of tiles) {
        const id = tile.GetId();
        counts.set(id, (counts.get(id) ?? 0) + 1);
      }
      return counts;
    };
    var isQidui = (hand) => {
      if (!isCompleteClosedHand(hand))
        return false;
      let pairCount = 0;
      for (const count of buildTileCounts(hand.tiles).values()) {
        if (count !== 2 && count !== 4)
          return false;
        pairCount += count / 2;
      }
      return pairCount === 7;
    };
    var isLianqidui = (hand) => {
      if (!isQidui(hand))
        return false;
      const uniqueIds = [...new Set(hand.tiles.map((t) => t.GetId()))].sort(
        (a, b) => a - b
      );
      for (let i = 1; i < uniqueIds.length; i++) {
        if (uniqueIds[i] !== uniqueIds[i - 1] + 1 || tileSuit(uniqueIds[i]) !== tileSuit(uniqueIds[i - 1])) {
          return false;
        }
      }
      return true;
    };
    var isMeaningfulTile = (tileId) => tileId >= constants.TILE_1m && tileId <= constants.TILE_P;
    var isBukaoStructure = (hand) => {
      if (!isCompleteClosedHand(hand))
        return false;
      const tileIds = hand.tiles.map((t) => t.GetId());
      const uniqueTiles = new Set(tileIds);
      if (uniqueTiles.size !== 14 || !tileIds.every(isMeaningfulTile))
        return false;
      const bitmap = collectTileBitmap(hand.tiles);
      return judgePartOfZuhelong(bitmap);
    };
    var isQuanbukao = (hand) => {
      if (!isBukaoStructure(hand))
        return false;
      const honorCount = hand.tiles.filter((t) => isHonorTile(t.GetId())).length;
      return honorCount < 7;
    };
    var isQixingbukao = (hand) => {
      if (!isBukaoStructure(hand))
        return false;
      const honorCount = hand.tiles.filter((t) => isHonorTile(t.GetId())).length;
      return honorCount === 7;
    };
    var judgeCompleteSpecialHu = (hand) => {
      if (!isCompleteClosedHand(hand))
        return 0;
      const bitmap = collectTileBitmap(hand.tiles);
      const cnt = bitPopCount(bitmap);
      if ((bitmap & constants.TILE_TYPE_BITMAP_YAOJIU) === bitmap && cnt === 13) {
        return constants.FAN_SHISANYAO;
      }
      if (judgePartOfZuhelong(bitmap) && (bitmap & constants.TILE_TYPE_BITMAP_MEANINGFUL) === bitmap && cnt === 14) {
        if ((bitmap & constants.TILE_TYPE_BITMAP_ZI) === constants.TILE_TYPE_BITMAP_ZI) {
          return constants.FAN_QIXINGBUKAO;
        }
        return constants.FAN_QUANBUKAO;
      }
      return 0;
    };
    var judgeQidui = (hand) => {
      if (!isQidui(hand))
        return 0;
      return isLianqidui(hand) ? constants.FAN_LIANQIDUI : constants.FAN_QIDUI;
    };
    module.exports = {
      isCompleteClosedHand,
      buildTileCounts,
      isQidui,
      isLianqidui,
      isMeaningfulTile,
      isBukaoStructure,
      isQuanbukao,
      isQixingbukao,
      judgeCompleteSpecialHu,
      judgeQidui
    };
  }
});

// gb-mahjong-js/lib/solver/fan-rules/index.js
var require_fan_rules = __commonJS({
  "gb-mahjong-js/lib/solver/fan-rules/index.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var { normalizeHandInput } = require_normalize_hand();
    var { enumerateDecompositions } = require_decomposition();
    var {
      canonicalizeCandidate,
      createEmptyFanResult
    } = require_fan_optimizer();
    var { FanAccumulator } = require_accumulator();
    var { collectTileBitmap } = require_bitmap();
    var { countOverallAttrFans } = require_overall_attr();
    var { countKeGangFans } = require_ke_gang();
    var { countAssociatedCombinationFans } = require_combination();
    var { countSinglePackFans } = require_single_pack();
    var { countWinModeFans } = require_win_mode();
    var {
      judgeCompleteSpecialHu,
      judgeQidui,
      isQuanbukao,
      isQixingbukao,
      isCompleteClosedHand
    } = require_special_hands();
    var {
      judgeZuhelong,
      enumerateZuhelongDecompositions,
      markWinningTilePacks
    } = require_zuhelong();
    var { calcTing } = require_calc_ting();
    var countBasicFans = (acc, hand, packs, zuhelongType) => {
      countOverallAttrFans(acc, hand, packs, zuhelongType);
      countKeGangFans(acc, packs);
      countAssociatedCombinationFans(acc, packs);
      countSinglePackFans(acc, hand, packs);
      countWinModeFans(acc, hand, packs, zuhelongType);
    };
    var buildResult = (acc, hand, packs) => {
      const fans = acc.getFans();
      const fanIds = acc.getFanIds();
      const totalFan = acc.getTotal();
      return canonicalizeCandidate({
        isHu: true,
        totalFan,
        fanIds,
        fans,
        decomposition: packs ? { packs } : null
      });
    };
    var evaluateFanRules = (input, overrides = {}) => {
      const hand = normalizeHandInput(input, overrides);
      let bestResult = null;
      let bestTotal = 0;
      const tileBitmap = collectTileBitmap(hand.tiles);
      const zuhelongType = judgeZuhelong(tileBitmap);
      if (isCompleteClosedHand(hand)) {
        const specialFan = judgeCompleteSpecialHu(hand);
        if (specialFan) {
          const acc = new FanAccumulator();
          acc.addFan(specialFan);
          countWinModeFans(acc, hand, [], 0);
          if (zuhelongType > 0) {
            acc.addFan(constants.FAN_ZUHELONG, []);
          }
          acc.excludeFan(constants.FAN_BUQIUREN);
          acc.excludeFan(constants.FAN_MENQIANQING);
          if (hand.context.zimo) {
            acc.fanTable.delete(constants.FAN_ZIMO);
            acc.excludedTable.delete(constants.FAN_ZIMO);
            acc.addFan(constants.FAN_ZIMO);
          }
          acc.applyExclusions();
          if (acc.getTotal() === 0) {
            acc.addFan(constants.FAN_WUFANHU);
          }
          if (acc.getTotal() > bestTotal) {
            bestTotal = acc.getTotal();
            bestResult = buildResult(acc, hand, null);
          }
        }
      }
      if (isCompleteClosedHand(hand)) {
        const qiduiFan = judgeQidui(hand);
        if (qiduiFan) {
          const acc = new FanAccumulator();
          acc.addFan(qiduiFan);
          countOverallAttrFans(acc, hand, [], 0);
          countWinModeFans(acc, hand, [], 0);
          acc.excludeFan(constants.FAN_BUQIUREN);
          acc.excludeFan(constants.FAN_MENQIANQING);
          if (qiduiFan === constants.FAN_LIANQIDUI) {
            acc.excludeFan(constants.FAN_QINGYISE);
            acc.excludeFan(constants.FAN_WUZI);
          }
          if (hand.context.zimo) {
            acc.fanTable.delete(constants.FAN_ZIMO);
            acc.excludedTable.delete(constants.FAN_ZIMO);
            acc.addFan(constants.FAN_ZIMO);
          }
          acc.applyExclusions();
          if (acc.getTotal() === 0) {
            acc.addFan(constants.FAN_WUFANHU);
          }
          if (acc.getTotal() > bestTotal) {
            bestTotal = acc.getTotal();
            bestResult = buildResult(acc, hand, null);
          }
        }
      }
      const isBukao = isQuanbukao(hand) || isQixingbukao(hand);
      let zuhelongBitmap = zuhelongType > 0 ? constants.ZuhelongBitmap[zuhelongType] : 0n;
      let sortedTiles = hand.tiles.slice();
      if (zuhelongBitmap && !isBukao) {
        const remaining = [];
        let bm = zuhelongBitmap;
        for (const tile of sortedTiles) {
          const tbm = tile.GetBitmap();
          if (bm & tbm) {
            bm ^= tbm;
          } else {
            remaining.push(tile);
          }
        }
        sortedTiles = remaining;
      }
      const decompositions = enumerateDecompositions({
        ...hand,
        tiles: sortedTiles
      });
      const winTileId = hand.winningTile ? hand.winningTile.GetId() : hand.tiles.length > 0 ? hand.tiles[hand.tiles.length - 1].GetId() : 0;
      if (winTileId > 0) {
        markWinningTilePacks(
          decompositions,
          winTileId,
          hand.packs.length,
          hand.context.zimo
        );
      }
      for (const packs of decompositions) {
        const acc = new FanAccumulator();
        countBasicFans(acc, hand, packs, 0);
        acc.applyExclusions();
        if (acc.getTotal() === 0) {
          acc.addFan(constants.FAN_WUFANHU);
        }
        if (acc.getTotal() > bestTotal) {
          bestTotal = acc.getTotal();
          bestResult = buildResult(acc, hand, packs);
        }
      }
      if (zuhelongBitmap && !isBukao) {
        const zuhelongDecomps = enumerateZuhelongDecompositions(hand, zuhelongType);
        for (const { packs: decompPacks, zuhelongPack } of zuhelongDecomps) {
          const packs = [...hand.packs, ...decompPacks];
          markWinningTilePacks(
            [packs],
            winTileId,
            hand.packs.length,
            hand.context.zimo
          );
          const acc = new FanAccumulator();
          countBasicFans(acc, hand, packs, zuhelongType);
          acc.applyExclusions();
          if (acc.hasFan(constants.FAN_WUFANHU)) {
            acc.fanTable.delete(constants.FAN_WUFANHU);
          }
          const zlIdx = packs.indexOf(zuhelongPack);
          acc.addFan(constants.FAN_ZUHELONG, zlIdx >= 0 ? [zlIdx] : []);
          if (acc.getTotal() > bestTotal) {
            bestTotal = acc.getTotal();
            bestResult = buildResult(acc, hand, packs);
          }
        }
      }
      if (bestResult && hand.flowers && hand.flowers.length > 0) {
        for (let i = 0; i < hand.flowers.length; i++) {
          bestResult.fans.push({
            fanId: constants.FAN_HUAPAI,
            score: constants.FAN_SCORE[constants.FAN_HUAPAI],
            matchedPacks: []
          });
          bestResult.fanIds.push(constants.FAN_HUAPAI);
        }
        bestResult.totalFan += hand.flowers.length;
        bestResult.fanIds.sort((a, b) => a - b);
      }
      if (!bestResult) {
        return createEmptyFanResult();
      }
      return bestResult;
    };
    module.exports = {
      evaluateFanRules,
      calcTing
    };
  }
});

// gb-mahjong-js/lib/solver/fan-calculator.js
var require_fan_calculator = __commonJS({
  "gb-mahjong-js/lib/solver/fan-calculator.js"(exports, module) {
    "use strict";
    var { normalizeHandInput } = require_normalize_hand();
    var { evaluateFanRules } = require_fan_rules();
    var FanCalculator = class {
      count(input, overrides = {}) {
        const hand = normalizeHandInput(input, overrides);
        return evaluateFanRules(hand);
      }
    };
    module.exports = FanCalculator;
  }
});

// gb-mahjong-js/lib/solver/special-hu.js
var require_special_hu = __commonJS({
  "gb-mahjong-js/lib/solver/special-hu.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var ZUHELONG_COMBINATIONS = [
      [
        [constants.TILE_1m, constants.TILE_4m, constants.TILE_7m],
        [constants.TILE_2s, constants.TILE_5s, constants.TILE_8s],
        [constants.TILE_3p, constants.TILE_6p, constants.TILE_9p]
      ],
      [
        [constants.TILE_1m, constants.TILE_4m, constants.TILE_7m],
        [constants.TILE_2p, constants.TILE_5p, constants.TILE_8p],
        [constants.TILE_3s, constants.TILE_6s, constants.TILE_9s]
      ],
      [
        [constants.TILE_1s, constants.TILE_4s, constants.TILE_7s],
        [constants.TILE_2m, constants.TILE_5m, constants.TILE_8m],
        [constants.TILE_3p, constants.TILE_6p, constants.TILE_9p]
      ],
      [
        [constants.TILE_1s, constants.TILE_4s, constants.TILE_7s],
        [constants.TILE_2p, constants.TILE_5p, constants.TILE_8p],
        [constants.TILE_3m, constants.TILE_6m, constants.TILE_9m]
      ],
      [
        [constants.TILE_1p, constants.TILE_4p, constants.TILE_7p],
        [constants.TILE_2m, constants.TILE_5m, constants.TILE_8m],
        [constants.TILE_3s, constants.TILE_6s, constants.TILE_9s]
      ],
      [
        [constants.TILE_1p, constants.TILE_4p, constants.TILE_7p],
        [constants.TILE_2s, constants.TILE_5s, constants.TILE_8s],
        [constants.TILE_3m, constants.TILE_6m, constants.TILE_9m]
      ]
    ];
    var SHISANYAO_TILES = /* @__PURE__ */ new Set([
      constants.TILE_1m,
      constants.TILE_9m,
      constants.TILE_1s,
      constants.TILE_9s,
      constants.TILE_1p,
      constants.TILE_9p,
      constants.TILE_E,
      constants.TILE_S,
      constants.TILE_W,
      constants.TILE_N,
      constants.TILE_C,
      constants.TILE_F,
      constants.TILE_P
    ]);
    var isCompleteClosedHand = (hand) => Boolean(hand) && hand.packs.length === 0 && hand.tiles.length === 14;
    var buildCounts = (hand) => {
      const counts = /* @__PURE__ */ new Map();
      hand.tiles.forEach((tile) => {
        const id = tile.GetId();
        counts.set(id, (counts.get(id) ?? 0) + 1);
      });
      return counts;
    };
    var isQidui = (hand) => {
      if (!isCompleteClosedHand(hand)) {
        return false;
      }
      let pairCount = 0;
      for (const count of buildCounts(hand).values()) {
        if (count !== 2 && count !== 4) {
          return false;
        }
        pairCount += count / 2;
      }
      return pairCount === 7;
    };
    var isShisanyao = (hand) => {
      if (!isCompleteClosedHand(hand)) {
        return false;
      }
      const uniqueTiles = new Set(hand.tiles.map((tile) => tile.GetId()));
      if (uniqueTiles.size !== 13) {
        return false;
      }
      return hand.tiles.every((tile) => SHISANYAO_TILES.has(tile.GetId()));
    };
    var isMeaningfulTile = (tileId) => tileId >= constants.TILE_1m && tileId <= constants.TILE_P;
    var isHonorTile = (tileId) => tileId >= constants.TILE_E && tileId <= constants.TILE_P;
    var isPartOfZuhelong = (numberedTiles) => ZUHELONG_COMBINATIONS.some((combination) => {
      const allowedTiles = new Set(combination.flat());
      return numberedTiles.every((tileId) => allowedTiles.has(tileId));
    });
    var isBukaoStructure = (hand) => {
      if (!isCompleteClosedHand(hand)) {
        return false;
      }
      const tileIds = hand.tiles.map((tile) => tile.GetId());
      const uniqueTiles = new Set(tileIds);
      if (uniqueTiles.size !== 14 || !tileIds.every(isMeaningfulTile)) {
        return false;
      }
      const numberedTiles = tileIds.filter((tileId) => tileId <= constants.TILE_9p);
      return isPartOfZuhelong(numberedTiles);
    };
    var isQuanbukao = (hand) => {
      if (!isBukaoStructure(hand)) {
        return false;
      }
      const honorCount = hand.tiles.filter((tile) => isHonorTile(tile.GetId())).length;
      return honorCount < 7;
    };
    var isQixingbukao = (hand) => {
      if (!isBukaoStructure(hand)) {
        return false;
      }
      const honorCount = hand.tiles.filter((tile) => isHonorTile(tile.GetId())).length;
      return honorCount === 7;
    };
    function hasSpecialHu(hand) {
      return isQidui(hand) || isShisanyao(hand) || isQuanbukao(hand) || isQixingbukao(hand);
    }
    module.exports = {
      hasSpecialHu,
      isQidui,
      isShisanyao,
      isQuanbukao,
      isQixingbukao
    };
  }
});

// gb-mahjong-js/lib/solver/judge-hu.js
var require_judge_hu = __commonJS({
  "gb-mahjong-js/lib/solver/judge-hu.js"(exports, module) {
    "use strict";
    var { normalizeHandInput } = require_normalize_hand();
    var { enumerateDecompositions } = require_decomposition();
    var { hasSpecialHu } = require_special_hu();
    var judgeHu = (input, options = {}) => {
      const hand = normalizeHandInput(input, options);
      return enumerateDecompositions(hand).length > 0 || hasSpecialHu(hand);
    };
    module.exports = {
      judgeHu,
      hasSpecialHu,
      normalizeHandInput
    };
  }
});

// gb-mahjong-js/lib/solver/calc-ting.js
var require_calc_ting2 = __commonJS({
  "gb-mahjong-js/lib/solver/calc-ting.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var Tile = require_tile();
    var Hand = require_hand();
    var { normalizeHandInput } = require_normalize_hand();
    var { judgeHu } = require_judge_hu();
    var compareTiles = (left, right) => left.GetId() - right.GetId();
    var isWinningTileCandidate = (tileId) => tileId >= constants.TILE_1m && tileId <= constants.TILE_P;
    var toTile = (tile) => tile instanceof Tile ? tile.clone() : new Tile(tile);
    var createVisibleTileTable = (hand) => {
      const counts = Array(constants.TILE_MAJIANG + 1).fill(0);
      hand.tiles.forEach((tile) => {
        counts[tile.GetId()] += 1;
      });
      hand.packs.forEach((pack) => {
        pack.GetAllTile().forEach((tile) => {
          counts[tile.GetId()] += 1;
        });
      });
      return counts;
    };
    var cloneHandWithWinningTile = (hand, tile) => {
      const winningTile = toTile(tile);
      const tiles = hand.tiles.slice();
      if (hand.winningTile !== null) {
        const winningTileIndex = tiles.findIndex(
          (candidate) => candidate.GetId() === hand.winningTile.GetId()
        );
        if (winningTileIndex !== -1) {
          tiles.splice(winningTileIndex, 1);
        }
      }
      tiles.push(winningTile.clone());
      tiles.sort(compareTiles);
      return new Hand({
        tiles,
        packs: hand.packs.slice(),
        winningTile,
        flowers: hand.flowers.slice(),
        context: hand.context,
        source: hand.source
      });
    };
    var judgeHuTileForHand = (hand, tile) => {
      const tileId = tile instanceof Tile ? tile.GetId() : tile;
      if (!isWinningTileCandidate(tileId)) {
        return false;
      }
      return judgeHu(cloneHandWithWinningTile(hand, tileId));
    };
    var judgeHuTile = (input, tile, options = {}) => {
      const hand = normalizeHandInput(input, options);
      return judgeHuTileForHand(hand, tile);
    };
    var calcTing = (input, options = {}) => {
      const hand = normalizeHandInput(input, options);
      const visibleTileTable = createVisibleTileTable(hand);
      return Array.from(
        { length: constants.TILE_P - constants.TILE_1m + 1 },
        (_, index) => constants.TILE_1m + index
      ).filter(
        (tileId) => (options.includeExhaustedTile || visibleTileTable[tileId] < 4) && judgeHuTileForHand(hand, tileId)
      ).map((tileId) => new Tile(tileId)).sort(compareTiles);
    };
    module.exports = {
      calcTing,
      cloneHandWithWinningTile,
      judgeHuTile
    };
  }
});

// gb-mahjong-js/lib/parser/format-hand.js
var require_format_hand = __commonJS({
  "gb-mahjong-js/lib/parser/format-hand.js"(exports, module) {
    "use strict";
    var { legacyFromHand } = require_legacy_adapter();
    var formatHand = (input) => legacyFromHand(input).HandtilesToString();
    module.exports = formatHand;
  }
});

// gb-mahjong-js/lib/api/index.js
var require_api = __commonJS({
  "gb-mahjong-js/lib/api/index.js"(exports, module) {
    "use strict";
    var Tile = require_tile();
    var Pack = require_pack();
    var Hand = require_hand();
    var WinContext = require_win_context();
    var FanResult = require_fan_result();
    var DecompositionPack = require_decomposition_pack();
    var FanCalculator = require_fan_calculator();
    var { judgeHu: judgeHuSolver } = require_judge_hu();
    var {
      judgeHuTile: judgeHuTileSolver,
      calcTing: calcTingSolver
    } = require_calc_ting2();
    var parseHand = require_parse_hand();
    var formatHand = require_format_hand();
    var { HandParseError } = require_errors();
    var judgeHu = (input, overrides = {}) => {
      return judgeHuSolver(input, overrides);
    };
    var judgeHuTile = (input, tile, overrides = {}) => {
      return judgeHuTileSolver(input, tile, overrides);
    };
    var calcTing = (input, options = {}) => {
      return calcTingSolver(input, options);
    };
    var countFan = (input, options = {}) => {
      const calculator = new FanCalculator();
      return calculator.count(input, options);
    };
    module.exports = {
      HandParseError,
      parseHand,
      formatHand,
      judgeHu,
      judgeHuTile,
      calcTing,
      countFan,
      Tile,
      Pack,
      Hand,
      WinContext,
      FanResult,
      DecompositionPack,
      FanCalculator
    };
  }
});

// gb-mahjong-js/browser-entry.js
var require_browser_entry = __commonJS({
  "gb-mahjong-js/browser-entry.js"(exports, module) {
    var api = require_api();
    var constants = require_constants();
    module.exports = {
      ...api,
      constants
    };
  }
});
export default require_browser_entry();
