<template>
	<view class="app">

		<!-- Toast 通知 -->
		<view v-if="toast.show" class="toast" :class="toast.type === 'error' ? 'toast-error' : 'toast-success'">
			{{ toast.message }}
		</view>

		<main class="main">
			<!-- 牌种选择区域 -->
			<section class="tile-section">
				<!-- 万子 -->
				<view class="tile-row">
					<view class="tile-row-inner">
						<button v-for="i in 9" :key="'w'+i" @click="toggleTile('w'+i)" 
							class="tile-btn"
							:class="getTileCount('w'+i) < 4 ? 'tile-btn-active' : 'tile-btn-inactive'">
							<image :src="getTileSvgPath('w'+i)" class="tile-icon" mode="aspectFit" />
						</button>
					</view>
				</view>

				<!-- 条子 -->
				<view class="tile-row">
					<view class="tile-row-inner">
						<button v-for="i in 9" :key="'t'+i" @click="toggleTile('t'+i)" 
							class="tile-btn"
							:class="getTileCount('t'+i) < 4 ? 'tile-btn-active' : 'tile-btn-inactive'">
							<image :src="getTileSvgPath('t'+i)" class="tile-icon" mode="aspectFit" />
						</button>
					</view>
				</view>

				<!-- 饼子 -->
				<view class="tile-row">
					<view class="tile-row-inner">
						<button v-for="i in 9" :key="'b'+i" @click="toggleTile('b'+i)" 
							class="tile-btn"
							:class="getTileCount('b'+i) < 4 ? 'tile-btn-active' : 'tile-btn-inactive'">
							<image :src="getTileSvgPath('b'+i)" class="tile-icon" mode="aspectFit" />
						</button>
					</view>
				</view>

				<!-- 字牌 -->
				<view class="tile-row">
					<view class="tile-row-inner">
						<button v-for="wind in ['east','south','west','north']" :key="wind" @click="toggleTile(wind)" 
							class="tile-btn"
							:class="getTileCount(wind) < 4 ? 'tile-btn-active' : 'tile-btn-inactive'">
							<image :src="getTileSvgPath(wind)" class="tile-icon" mode="aspectFit" />
						</button>
						<button v-for="dragon in ['zhong','fa','bai']" :key="dragon" @click="toggleTile(dragon)" 
							class="tile-btn"
							:class="getTileCount(dragon) < 4 ? 'tile-btn-active' : 'tile-btn-inactive'">
							<image :src="getTileSvgPath(dragon)" class="tile-icon" mode="aspectFit" />
						</button>
					</view>
				</view>
			</section>

			<!-- 特殊选项区域 -->
			<section class="options-section">          
				<!-- 第一行：立牌、碰、吃、明杠、暗杠、重置 -->
				<view class="mode-row">
					<button v-for="mode in ['concealed', 'pong', 'chi', 'minggang', 'angang']" :key="mode"
						@click="currentMode = mode"
						class="mode-btn"
						:class="currentMode === mode ? 'mode-btn-active' : 'mode-btn-inactive'">
						{{mode === 'concealed' ? '立牌' : mode === 'pong' ? '碰' : mode === 'chi' ? '吃' : mode === 'minggang' ? '明杠' : '暗杠'}}
					</button>
					<button @click="resetAll" class="reset-btn">
						重置
					</button>
				</view>

                <view style="display: flex;justify-content: space-between;">
                    <!-- 门风圈风 -->
                    <view class="wind-row">
                        <!-- 门风 -->
                        <view class="wind-group">
                            <span class="wind-label">门风</span>
                            <view class="wind-btns">
                                <button v-for="wind in ['east','south','west','north']" :key="wind" 
                                    @click="options.seatWind = wind"
                                    class="mode-btn"
                                    :class="options.seatWind === wind ? 'wind-btn-active' : 'wind-btn-inactive'">
                                    {{wind === 'east' ? '东' : wind === 'south' ? '南' : wind === 'west' ? '西' : '北'}}
                                </button>
                            </view>
                        </view>

                        <!-- 圈风 -->
                        <view class="wind-group">
                            <span class="wind-label">圈风</span>
                            <view class="wind-btns">
                                <button v-for="wind in ['east','south','west','north']" :key="wind" 
                                    @click="options.prevalentWind = wind"
                                    class="mode-btn"
                                    :class="options.prevalentWind === wind ? 'wind-btn-active' : 'wind-btn-inactive'">
                                    {{wind === 'east' ? '东' : wind === 'south' ? '南' : wind === 'west' ? '西' : '北'}}
                                </button>
                            </view>
                        </view>
                    </view>

                    <!-- 花牌数量 -->
                    <view class="flower-row">
                        <span class="flower-label">花牌数量</span>
                        <view style="display: flex;align-items: center;">
                            <button @click="options.flowerCount = Math.max(0, options.flowerCount - 1)" class="flower-btn">
                                -
                            </button>
                            <span class="flower-count">{{options.flowerCount}}</span>
                            <button @click="options.flowerCount = Math.min(8, options.flowerCount + 1)" class="flower-btn">
                                +
                            </button>
                        </view>
                    </view>
                </view>

				<!-- 勾选项 -->
				<checkbox-group @change="checkboxChange" class="checkbox-row">
					<!-- 自摸 -->
					<label class="checkbox-label">
						<checkbox value="isSelfDrawn" :checked="options.isSelfDrawn" class="checkbox-input" />
						<span class="checkbox-text">自摸</span>
					</label>

					<!-- 和绝张 -->
					<label class="checkbox-label">
						<checkbox value="isJuezhang" :checked="options.isJuezhang" class="checkbox-input" />
						<span class="checkbox-text">和绝张</span>
					</label>

					<!-- 妙手回春 -->
					<label v-if="options.isSelfDrawn" class="checkbox-label">
						<checkbox value="isMiaoshou" :checked="options.isMiaoshou" class="checkbox-input" />
						<span class="checkbox-text">妙手回春</span>
					</label>

					<!-- 杠上开花 -->
					<label v-if="options.isSelfDrawn" class="checkbox-label">
						<checkbox value="isGangshang" :checked="options.isGangshang" class="checkbox-input" />
						<span class="checkbox-text">杠上开花</span>
					</label>

					<!-- 海底捞月 -->
					<label v-if="!options.isSelfDrawn" class="checkbox-label">
						<checkbox value="isHaidilao" :checked="options.isHaidilao" class="checkbox-input" />
						<span class="checkbox-text">海底捞月</span>
					</label>

					<!-- 抢杠和 -->
					<label v-if="!options.isSelfDrawn" class="checkbox-label">
						<checkbox value="isQianggang" :checked="options.isQianggang" class="checkbox-input" />
						<span class="checkbox-text">抢杠和</span>
					</label>
				</checkbox-group>
			</section>

			<!-- 选中的牌显示区域 -->
			<section class="selected-section">
				<!-- 手牌 -->
				<view class="concealed-row" v-if="concealedTiles.length">
					<view class="concealed-inner">
						<view v-for="(tile, index) in sortedConcealedTiles" :key="'c-' + index" 
							@click="removeTile(tile, 'concealed')"
							class="concealed-tile">
							<image :src="getTileSvgPath(tile)" class="concealed-icon" mode="aspectFit" />
						</view>
					</view>
				</view>

				<!-- 副露 -->
				<view class="meld-row" v-if="meldGroups.length">
					<view v-for="(group, groupIndex) in sortedMeldGroups" :key="'mg-' + groupIndex" 
						@click="removeTile(group.tiles[0], 'meld')"
						class="meld-group"
						:class="group.type === 'angang' ? 'meld-group-angang' : 'meld-group-other'">
						<view v-for="(tile, tileIndex) in group.tiles" :key="'mt-' + groupIndex + '-' + tileIndex"
							class="meld-tile"
							:class="group.type === 'angang' ? 'meld-tile-angang' : 'meld-tile-other'">
							<image :src="getTileSvgPath(tile)" class="meld-icon" mode="aspectFit" />
						</view>
						<span class="meld-badge">
							{{getMeldTypeText(group.type)}}
						</span>
					</view>
				</view>
				
				<h2 v-if="remainingTiles" class="remaining-title">可选择{{ remainingTiles }}张牌</h2>
				
                <h2 v-if="waitingTiles.length === 0 && this.remainingTiles <= 0" class="remaining-title">
                    未听牌
                </h2>
			</section>

			<!-- 听牌显示区域 -->
			<section v-if="waitingTiles.length && !winTile" class="waiting-section">
				<view class="waiting-row">
					<view v-for="wt in waitingTiles" :key="wt.tileId"
						class="waiting-item"
						@click="updateWinTile(wt)">
						<view class="waiting-score">{{wt.totalScore}}番</view>
						<image :src="getTileSvgPath(wt.tileId)" class="waiting-icon" mode="aspectFit" />
					</view>
				</view>
			</section>

			<!-- 和牌番数显示区域 -->
			<section v-if="selectedWinTile" class="win-section">
				<view style="display: flex; align-items: center;justify-content: flex-start;margin-bottom: 24rpx;" @click="winTile = null">
					<h2 class="win-title">和张:</h2>
					<image :src="getTileSvgPath(selectedWinTile.tileId)" class="win-icon" mode="aspectFit" />
				</view>
				<view class="win-fans">
					<view class="win-score">共 {{ selectedWinTile.totalScore }} 番</view>
					<span v-for="fan in selectedWinTile.fans" :key="fan.name" class="win-fan-tag">
						{{fan.name}} {{fan.score}}番
					</span>
				</view>
			</section>
		</main>
	</view>
</template>

<script>
	import { TILES } from '@/utils/tiles.js';
	import { MahjongAnalyzer } from '@/utils/analyzer.js';

	export default {
		data() {
			return {
				currentMode: 'concealed',
				concealedTiles: [],
				meldGroups: [],
				winTile: null,
				toast: {
					show: false,
					message: '',
					type: 'error'
				},
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
			}
		},
		computed: {
			remainingTiles() {
				return 14 - this.concealedTiles.length - this.meldGroups.length * 3 - 1
			},
			meldTiles() {
				return this.meldGroups.flatMap(group => group.tiles);
			},
			waitingTiles() {
				const allTiles = [...this.concealedTiles, ...this.meldTiles];
				const gangCount = this.meldGroups.filter(g => g.type === 'minggang' || g.type === 'angang').length;
				const maxConcealed = 14 - this.meldGroups.length * 3 - gangCount;
				if (allTiles.length !== 14 + gangCount - 1) {
					return [];
				}
				const analyzer = new MahjongAnalyzer();
				analyzer.setHand(this.concealedTiles, this.meldGroups, this.winTile?.tileId, {
					isSelfDrawn: this.options.isSelfDrawn,
					prevalentWind: this.options.prevalentWind,
					seatWind: this.options.seatWind,
					flowerCount: this.options.flowerCount,
					isLastTile: this.options.isHaidilao || this.options.isMiaoshou,
					isKongDraw: this.options.isGangshang || this.options.isQianggang,
					isJuezhang: this.options.isJuezhang
				});
				const res = analyzer.getWaitingTiles();
				console.log('听牌选项番数 :>> ', res);
				return res;
			},
			selectedWinTile() {
				if (!this.winTile) return null;
				const wt = this.waitingTiles.find(w => w.tileId === this.winTile.tileId);
				return wt || this.winTile;
			},
			sortedConcealedTiles() {
				return [...this.concealedTiles].sort((a, b) => {
					const typeOrder = { 'w': 0, 't': 1, 'b': 2 };
					const windOrder = { 'east': 3, 'south': 3, 'west': 3, 'north': 3 };
					const dragonOrder = { 'zhong': 4, 'fa': 4, 'bai': 4 };
					
					const getTypeRank = (tileId) => {
						if (windOrder[tileId] !== undefined) return windOrder[tileId];
						if (dragonOrder[tileId] !== undefined) return dragonOrder[tileId];
						if (typeOrder[tileId[0]] !== undefined) return typeOrder[tileId[0]];
						return 5;
					};
					
					const getValue = (tileId) => {
						const windValue = { 'east': 0, 'south': 1, 'west': 2, 'north': 3 };
						const dragonValue = { 'zhong': 0, 'fa': 1, 'bai': 2 };
						if (windValue[tileId] !== undefined) return windValue[tileId];
						if (dragonValue[tileId] !== undefined) return dragonValue[tileId];
						if (tileId[0] in typeOrder) return parseInt(tileId.slice(1)) || 0;
						return 0;
					};
					
					const typeA = getTypeRank(a);
					const typeB = getTypeRank(b);
					if (typeA !== typeB) return typeA - typeB;
					return getValue(a) - getValue(b);
				});
			},
			sortedMeldGroups() {
				const typeOrder = { 'pong': 0, 'chi': 1, 'minggang': 2, 'angang': 3 };
				const tileTypeOrder = { 'w': 0, 't': 1, 'b': 2 };
				
				const getTileTypeRank = (tileId) => {
					const windOrder = { 'east': 3, 'south': 3, 'west': 3, 'north': 3 };
					const dragonOrder = { 'zhong': 4, 'fa': 4, 'bai': 4 };
					if (windOrder[tileId] !== undefined) return 3;
					if (dragonOrder[tileId] !== undefined) return 4;
					if (tileTypeOrder[tileId[0]] !== undefined) return tileTypeOrder[tileId[0]];
					return 5;
				};
				
				const getTileValue = (tileId) => {
					const windValue = { 'east': 0, 'south': 1, 'west': 2, 'north': 3 };
					const dragonValue = { 'zhong': 0, 'fa': 1, 'bai': 2 };
					if (windValue[tileId] !== undefined) return windValue[tileId];
					if (dragonValue[tileId] !== undefined) return dragonValue[tileId];
					if (tileId[0] in tileTypeOrder) return parseInt(tileId.slice(1)) || 0;
					return 0;
				};
				
				return [...this.meldGroups].sort((a, b) => {
					const typeA = typeOrder[a.type];
					const typeB = typeOrder[b.type];
					if (typeA !== typeB) return typeA - typeB;
					
					const tileA = a.tiles[0];
					const tileB = b.tiles[0];
					const tileTypeA = getTileTypeRank(tileA);
					const tileTypeB = getTileTypeRank(tileB);
					if (tileTypeA !== tileTypeB) return tileTypeA - tileTypeB;
					return getTileValue(tileA) - getTileValue(tileB);
				});
			}
		},
		watch: {
			remainingTiles(newVal) {
				if (newVal > 0) {
					this.winTile = null;
				}
			}
		},
		methods: {
			showToast(message, type = 'error') {
				this.toast = { show: true, message, type };
				setTimeout(() => {
					this.toast.show = false;
				}, 2000);
			},
			checkboxChange(e) {
				const values = e.detail.value;
				const optionKeys = ['isSelfDrawn', 'isJuezhang', 'isMiaoshou', 'isGangshang', 'isHaidilao', 'isQianggang'];
				for (const key of optionKeys) {
					this.$set(this.options, key, values.includes(key));
				}
			},
			getTileCount(tileId) {
				const concealedCount = this.concealedTiles.filter(t => t === tileId).length;
				const meldCount = this.meldTiles.filter(t => t === tileId).length;
				return concealedCount + meldCount;
			},
			toggleTile(tileId) {
				if (this.currentMode === 'concealed') {
					if (this.remainingTiles <= 0) return;
					if (this.getTileCount(tileId) > 3) return;
					this.concealedTiles.push(tileId);
				} else if (this.remainingTiles < 3) {
					const modeText = this.currentMode === 'pong' ? '碰' : this.currentMode === 'chi' ? '吃' : this.currentMode === 'minggang' ? '明杠' : '暗杠';
					this.showToast(`剩余牌数不足，无法${modeText}`);
					return;
				} else if (this.currentMode === 'angang') {
					if (this.getTileCount(tileId) > 0) return;
					const newTiles = [tileId, tileId, tileId, tileId];
					this.meldGroups.push({ tiles: newTiles, type: 'angang' });
				} else if (this.currentMode === 'pong') {
					if (this.getTileCount(tileId) > 1) return;
					const newTiles = [tileId, tileId, tileId];
					this.meldGroups.push({ tiles: newTiles, type: 'pong' });
				} else if (this.currentMode === 'chi') {
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
						if (this.getTileCount(t) > 1) return;
					}
					
					this.meldGroups.push({ tiles: newTiles, type: 'chi' });
				} else if (this.currentMode === 'minggang') {
					if (this.getTileCount(tileId) > 0) return;
					const newTiles = [tileId, tileId, tileId, tileId];
					this.meldGroups.push({ tiles: newTiles, type: 'minggang' });
				}
			},
			removeTile(tileId, area) {
				if (area === 'concealed') {
					const index = this.concealedTiles.indexOf(tileId);
					if (index > -1) {
						this.concealedTiles.splice(index, 1);
					}
				} else if (area === 'meld') {
					const groupIndex = this.meldGroups.findIndex(g => g.tiles.includes(tileId));
					if (groupIndex > -1) {
						this.meldGroups.splice(groupIndex, 1);
					}
				}
			},
			getTileDisplay(tileId) {
				const tile = TILES[tileId];
				return tile ? tile.name.replace(/[一二三四五六七八九]/g, m => '一二三四五六七八九'.indexOf(m) + 1) : tileId;
			},
			getTileSvgPath(tileId) {
				return `/static/image/tile/${tileId}.svg`;
			},
			getMeldTypeText(type) {
				return type === 'pong' ? '碰' : type === 'chi' ? '吃' : type === 'angang' ? '暗杠' : '明杠';
			},
			updateWinTile(tile) {
				this.winTile = tile;
			},
			resetAll() {
				this.currentMode = 'concealed';
				this.concealedTiles = [];
				this.meldGroups = [];
				this.winTile = null;
				this.options = {
					seatWind: 'east',
					prevalentWind: 'east',
					flowerCount: 0,
					isSelfDrawn: false,
					isHaidilao: false,
					isMiaoshou: false,
					isJuezhang: false,
					isGangshang: false,
					isQianggang: false
				};
			}
		}
	}
</script>

<style lang="scss">
	.app {
		min-height: 100vh;
		background-color: #f9fafb;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		display: flex;
		flex-direction: column;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.toast {
		position: fixed;
		top: 160rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
		padding: 24rpx 32rpx;
		border-radius: 16rpx;
		box-shadow: 0 20rpx 30rpx -6rpx rgba(0, 0, 0, 0.1);
		transition: all 0.3s;
	}

	.toast-error {
		background-color: #ef4444;
		color: #ffffff;
	}

	.toast-success {
		background-color: #22c55e;
		color: #ffffff;
	}

	.main {
		box-sizing: border-box;
		flex: 1;
		min-width: 750rpx;
		margin: 0 auto;
		padding: 12rpx 32rpx 20rpx;
	}

	.tile-section {
		margin-bottom: 16rpx;
	}

	.tile-row {
		margin-bottom: 8rpx;
	}

	.tile-row-inner {
		display: flex;
		justify-content: center;
		gap: 8rpx;
	}

	.tile-btn {
		width: 60rpx;
		height: 80rpx;
		background-color: #ffffff;
		border-width: 4rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-weight: bold;
		white-space: nowrap;
		transition: all 0.2s;
		padding: 0;
	}

	.tile-btn-inactive {
		border-color: #d1d5db;
	}

	.tile-btn-active {
		border-color: #3b82f6;
		background-color: #eff6ff;
	}

	.tile-icon {
		width: 56rpx;
		height: 76rpx;
	}

	.options-section {
		margin-bottom: 16rpx;
		border-top: 2rpx solid #eee;
		padding-top: 16rpx;
	}

	.mode-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16rpx;
		margin-bottom: 8rpx;
	}

	.mode-btn {
		padding: 16rpx 24rpx;
		border-width: 4rpx;
		border-radius: 16rpx;
		font-size: 28rpx;
		font-weight: 500;
		transition: all 0.2s;
        border: none;
	}
    
    button {
        line-height: 1;
        
        &::after {
            border: none;
        }
    }

	.mode-btn-inactive {
		border-color: #d1d5db;
		background-color: #ffffff;
		color: #374151;
	}

	.mode-btn-active {
		border-color: #3b82f6;
		background-color: #eff6ff;
		color: #1d4ed8;
	}

	.reset-btn {
		margin-left: auto;
		padding: 16rpx 24rpx;
		background-color: #ef4444;
		color: #ffffff;
		border-radius: 16rpx;
		font-size: 28rpx;
		font-weight: 500;
		transition: background-color 0.2s;
	}

	.wind-row {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
		margin-bottom: 12rpx;
	}

	.wind-group {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}

	.wind-label {
		font-size: 28rpx;
		color: #4b5563;
		display: block;
	}

	.wind-btns {
		display: flex;
		flex: 1;
		gap: 8rpx;
	}

	.wind-btn {
		flex: 1;
		padding: 16rpx 0;
		border-width: 4rpx;
		border-radius: 16rpx;
		font-size: 28rpx;
		font-weight: 500;
		transition: all 0.2s;
	}

	.wind-btn-inactive {
		border-color: #d1d5db;
		background-color: #ffffff;
		color: #374151;
	}

	.wind-btn-active {
		border-color: #3b82f6;
		background-color: #eff6ff;
		color: #1d4ed8;
	}

	.flower-row {
		display: flex;
        flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 8rpx;
		margin-bottom: 8rpx;
	}

	.flower-label {
        height: 60rpx;
        line-height: 60rpx;
		font-size: 28rpx;
		color: #4b5563;
	}

	.flower-btn {
		width: 60rpx;
		height: 60rpx;
		background-color: #f3f4f6;
		border: 2rpx solid #d1d5db;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		transition: background-color 0.2s;
	}

	.flower-count {
		width: 80rpx;
		text-align: center;
		font-size: 32rpx;
		color: #666;
	}

	.checkbox-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12rpx;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}

	.checkbox-input {
		width: 48rpx;
		height: 48rpx;
		color: #2563eb;
		border-radius: 8rpx;
	}

	.checkbox-text {
		font-size: 28rpx;
		color: #4b5563;
	}

	.selected-section {
		margin: 32rpx 0;
	}

	.remaining-title {
		margin-top: 24rpx;
		text-align: center;
		font-weight: 600;
		color: #374151;
		margin-bottom: 16rpx;
	}

	.concealed-row {
		
	}

	.concealed-inner {
		display: flex;
		flex-wrap: wrap;
		// gap: 8rpx;
		min-height: 96rpx;
	}

	.concealed-tile {
		width: 64rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s;
	}

	.concealed-icon {
		width: 52rpx;
		height: 72rpx;
	}

	.meld-row {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
		min-height: 96rpx;
	}

	.meld-group {
		display: flex;
		align-items: center;
		gap: 8rpx;
		border-radius: 16rpx;
		padding: 8rpx;
		transition: all 0.2s;
		position: relative;
	}

	.meld-group-angang {
		
	}

	.meld-group-other {

	}

	.meld-tile {
		width: 56rpx;
		height: 80rpx;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.meld-icon {
		width: 44rpx;
		height: 68rpx;
	}

	.meld-tile-angang {
		background-color: #f0fdf4;
		border: 2rpx solid #86efac;
	}

	.meld-tile-other {
		background-color: #fefce8;
		border: 2rpx solid #fde047;
	}

	.meld-badge {
		position: absolute;
		bottom: -8rpx;
		right: -8rpx;
		background-color: #ef4444;
		color: #ffffff;
		font-size: 24rpx;
		padding: 4rpx 12rpx;
		border-radius: 20rpx;
		text-align: center;
		min-width: 40rpx;
	}

	.waiting-section {
		// background-color: #ffffff;
		// border-radius: 16rpx;
		// box-shadow: 0 8rpx 12rpx -2rpx rgba(0, 0, 0, 0.1);
		// padding: 32rpx;
		margin-bottom: 48rpx;
	}

	.waiting-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #1f2937;
		margin-bottom: 24rpx;
	}

	.waiting-row {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
		justify-content: center;
	}

	.waiting-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16rpx;
	}

	.waiting-icon {
		width: 68rpx;
		height: 96rpx;
	}

	.waiting-score {
		color: #4b5563;
	}

	.win-section {
		margin-bottom: 48rpx;
	}

	.win-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #1f2937;
		margin-right: 24rpx;
	}

	.win-row {
		display: flex;
		align-items: center;
		gap: 32rpx;
		margin-bottom: 32rpx;
	}

	.win-icon {
		width: 52rpx;
		height: 72rpx;
	}

	.win-score {
		font-size: 32rpx;
		font-weight: bold;
		// color: #ca8a04;
	}

	.win-fans {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16rpx;
	}

	.win-fan-tag {
		padding: 8rpx 24rpx;
		background-color: #dbeafe;
		color: #1d4ed8;
		border-radius: 20rpx;
		font-size: 28rpx;
	}
</style>