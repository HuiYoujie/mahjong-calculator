const MahjongAnalyzer = require('../../utils/analyzer.js');
const { TILES } = require('../../utils/tiles.js');

Page({
    data: {
        currentMode: 'concealed',
        concealedTiles: [],
        meldGroups: [],
        winTile: null,
        waitingTiles: [],
        selectedWinTile: null,
        options: {
            seatWind: 'east',
            prevalentWind: 'east',
            flowerCount: 0,
            isSelfDrawn: false,
            isHaidilao: false,
            isMiaoshou: false,
            isJuezhang: false,
            isGangshang: false,
            isQianggang: false
        }
    },

    onLoad: function() {
        this.analyzer = new MahjongAnalyzer();
    },

    getAllTileCount(tileId) {
        const concealedCount = this.data.concealedTiles.filter(t => t === tileId).length;
        const meldCount = this.data.meldGroups.reduce((sum, m) => sum + m.tiles.filter(t => t === tileId).length, 0);
        return concealedCount + meldCount;
    },

    toggleTile(e) {
        const tileId = e.currentTarget.dataset.tile;
        const { currentMode, concealedTiles, meldGroups, options } = this.data;

        if (currentMode === 'concealed') {
            const remainingTiles = 14 - concealedTiles.length - meldGroups.length * 3 - 1;
            if (remainingTiles <= 0) return;
            if (this.getAllTileCount(tileId) > 3) return;
            this.setData({
                concealedTiles: [...concealedTiles, tileId]
            });
        } else {
            const remainingTiles = 14 - concealedTiles.length - meldGroups.length * 3 - 1;
            if (remainingTiles < 3) {
                wx.showToast({
                    title: `当前选择模式是${this.getModeText(currentMode)}`,
                    icon: 'none'
                });
                return;
            }

            if (currentMode === 'angang' || currentMode === 'minggang') {
                if (this.getAllTileCount(tileId) > 0) return;
                const newTiles = [tileId, tileId, tileId, tileId];
                this.setData({
                    meldGroups: [...meldGroups, { tiles: newTiles, type: currentMode }]
                });
            } else if (currentMode === 'pong') {
                if (this.getAllTileCount(tileId) > 1) return;
                const newTiles = [tileId, tileId, tileId];
                this.setData({
                    meldGroups: [...meldGroups, { tiles: newTiles, type: 'pong' }]
                });
            } else if (currentMode === 'chi') {
                const tile = TILES[tileId];
                if (!tile || tile.type === 'wind' || tile.type === 'dragon') return;

                let baseValue = tile.value;
                if (baseValue > 7) baseValue = 7;

                const typePrefix = tileId.charAt(0);
                const newTiles = [
                    typePrefix + baseValue,
                    typePrefix + (baseValue + 1),
                    typePrefix + (baseValue + 2)
                ];

                for (const t of newTiles) {
                    if (this.getAllTileCount(t) > 1) return;
                }

                this.setData({
                    meldGroups: [...meldGroups, { tiles: newTiles, type: 'chi' }]
                });
            }
        }

        this.analyzeWaiting();
    },

    removeTile(e) {
        const { tile, area } = e.currentTarget.dataset;
        const { concealedTiles, meldGroups } = this.data;

        if (area === 'concealed') {
            const index = concealedTiles.indexOf(tile);
            if (index > -1) {
                this.setData({
                    concealedTiles: [...concealedTiles.slice(0, index), ...concealedTiles.slice(index + 1)]
                });
            }
        } else if (area === 'meld') {
            const groupIndex = meldGroups.findIndex(g => g.tiles.includes(tile));
            if (groupIndex > -1) {
                this.setData({
                    meldGroups: [...meldGroups.slice(0, groupIndex), ...meldGroups.slice(groupIndex + 1)]
                });
            }
        }

        this.setData({
            winTile: null,
            selectedWinTile: null,
            waitingTiles: []
        });
        this.analyzeWaiting();
    },

    setMode(e) {
        const mode = e.currentTarget.dataset.mode;
        this.setData({
            currentMode: mode
        });
    },

    getModeText(mode) {
        const modeMap = {
            'concealed': '立牌',
            'pong': '碰',
            'chi': '吃',
            'minggang': '明杠',
            'angang': '暗杠'
        };
        return modeMap[mode] || mode;
    },

    setSeatWind(e) {
        const wind = e.currentTarget.dataset.wind;
        this.setData({
            'options.seatWind': wind
        });
        this.analyzeWaiting();
    },

    setPrevalentWind(e) {
        const wind = e.currentTarget.dataset.wind;
        this.setData({
            'options.prevalentWind': wind
        });
        this.analyzeWaiting();
    },

    setFlowerCount(e) {
        const type = e.currentTarget.dataset.type;
        let { flowerCount } = this.data.options;

        if (type === 'decrease') {
            flowerCount = Math.max(0, flowerCount - 1);
        } else if (type === 'increase') {
            flowerCount = Math.min(8, flowerCount + 1);
        }

        this.setData({
            'options.flowerCount': flowerCount
        });
        this.analyzeWaiting();
    },

    setOption(e) {
        const key = e.currentTarget.dataset.key;
        const value = !this.data.options[key];
        this.setData({
            [`options.${key}`]: value
        });

        if (key === 'isSelfDrawn') {
            if (value) {
                this.setData({
                    'options.isHaidilao': false,
                    'options.isQianggang': false
                });
            } else {
                this.setData({
                    'options.isMiaoshou': false,
                    'options.isGangshang': false
                });
            }
        }

        this.analyzeWaiting();
    },

    getTileDisplay(tileId) {
        const tile = TILES[tileId];
        if (!tile) return tileId;
        let name = tile.name;
        console.log(name)
        name = name.replace('w', '万');
        name = name.replace('t', '条');
        name = name.replace('b', '筒');
        // name = name.replace('一万', '1万');
        // name = name.replace('二万', '2万');
        // name = name.replace('三万', '3万');
        // name = name.replace('四万', '4万');
        // name = name.replace('五万', '5万');
        // name = name.replace('六万', '6万');
        // name = name.replace('七万', '7万');
        // name = name.replace('八万', '8万');
        // name = name.replace('九万', '9万');
        // name = name.replace('一条', '1条');
        // name = name.replace('二条', '2条');
        // name = name.replace('三条', '3条');
        // name = name.replace('四条', '4条');
        // name = name.replace('五条', '5条');
        // name = name.replace('六条', '6条');
        // name = name.replace('七条', '7条');
        // name = name.replace('八条', '8条');
        // name = name.replace('九条', '9条');
        // name = name.replace('一饼', '1饼');
        // name = name.replace('二饼', '2饼');
        // name = name.replace('三饼', '3饼');
        // name = name.replace('四饼', '4饼');
        // name = name.replace('五饼', '5饼');
        // name = name.replace('六饼', '6饼');
        // name = name.replace('七饼', '7饼');
        // name = name.replace('八饼', '8饼');
        // name = name.replace('九饼', '9饼');
        return name;
    },

    getMeldTypeText(type) {
        const typeMap = {
            'pong': '碰',
            'chi': '吃',
            'minggang': '明杠',
            'angang': '暗杠'
        };
        return typeMap[type] || type;
    },

    getWindText(wind) {
        const windMap = {
            'east': '东',
            'south': '南',
            'west': '西',
            'north': '北'
        };
        return windMap[wind] || wind;
    },

    updateWinTile(e) {
        const winTile = e.currentTarget.dataset.tile;
        this.setData({
            winTile: winTile,
            selectedWinTile: winTile
        });
    },

    clearWinTile() {
        this.setData({
            winTile: null,
            selectedWinTile: null
        });
    },

    analyzeWaiting() {
        const { concealedTiles, meldGroups, options } = this.data;
        const allTiles = [...concealedTiles, ...meldGroups.flatMap(g => g.tiles)];
        const gangCount = meldGroups.filter(g => g.type === 'minggang' || g.type === 'angang').length;
        const maxConcealed = 14 - meldGroups.length * 3 - gangCount;

        if (allTiles.length !== 14 + gangCount - 1) {
            this.setData({
                waitingTiles: [],
                winTile: null,
                selectedWinTile: null
            });
            return;
        }

        this.analyzer.setHand(concealedTiles, meldGroups, null, {
            isSelfDrawn: options.isSelfDrawn,
            prevalentWind: options.prevalentWind,
            seatWind: options.seatWind,
            flowerCount: options.flowerCount,
            isLastTile: options.isHaidilao || options.isMiaoshou,
            isKongDraw: options.isGangshang || options.isQianggang,
            isJuezhang: options.isJuezhang
        });

        const waitingTiles = this.analyzer.getWaitingTiles();
        this.setData({
            waitingTiles
        });
    },

    resetAll() {
        this.setData({
            currentMode: 'concealed',
            concealedTiles: [],
            meldGroups: [],
            waitingTiles: [],
            winTile: null,
            selectedWinTile: null,
            options: {
                seatWind: 'east',
                prevalentWind: 'east',
                flowerCount: 0,
                isSelfDrawn: false,
                isHaidilao: false,
                isMiaoshou: false,
                isJuezhang: false,
                isGangshang: false,
                isQianggang: false
            }
        });
    }
});
