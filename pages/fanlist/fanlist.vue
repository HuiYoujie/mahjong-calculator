<template>
	<view class="app">
		<!-- 搜索栏 -->
        <view class="sticky">
            <view class="search-bar">
                <input 
                    v-model="searchText" 
                    placeholder="搜索番型名称" 
                    class="search-input"
                    @input="onSearch"
                />
                <text v-if="searchText" class="search-clear" @click="clearSearch">×</text>
            </view>
            <!-- 番数筛选 -->
			<view class="filter-bar">
                <view 
                    v-for="score in scoreFilters" 
                    :key="score.value"
                    class="filter-btn"
                    :class="selectedScore === score.value ? 'filter-btn-active' : ''"
                    @click="filterByScore(score.value)"
                >
                    {{ score.label }}
                </view>
			</view>
        </view>

		<!-- 番型列表 -->
		<scroll-view scroll-y class="fan-list">
			<view v-if="filteredFans.length === 0" class="empty-state">
				<text>没有找到匹配的番型</text>
			</view>
			
			<view 
				v-for="fan in filteredFans" 
				:key="fan.name"
				class="fan-card"
				:class="{ 'fan-card-expanded': expandedFan === fan.name }"
			>
				<view class="fan-header" @click="toggleFan(fan.name)">
                    <text class="fan-name">{{ fan.name }}</text>
                    <view class="fan-score-badge">
                        <text class="fan-score">{{ fan.score }}</text>
                        <text class="fan-score-unit">番</text>
                    </view>
				</view>

				<view v-if="expandedFan === fan.name" class="fan-content">
					<!-- 描述 -->
					<view class="fan-section">
						<text class="fan-description">{{ fan.description }}</text>
					</view>
					<view v-if="fan.exclusions && fan.exclusions.length > 0" class="fan-section exclude">
						<text class="section-label">不计：</text>
						<view class="exclusion-tags">
							<text 
								v-for="ex in fan.exclusions" 
								:key="ex"
								class="exclusion-tag"
							>
								{{ ex }}
							</text>
						</view>
					</view>

					<view class="fan-section" v-if="fan.displayGroups.length">
						<text class="section-label">示例牌型：</text>
						<view class="example-tiles">
							<view class="tile-groups">
								<view 
									v-for="(group, groupIdx) in fan.displayGroups" 
									:key="'group-' + groupIdx"
									class="tile-group"
									:class="'tile-group-' + group.kind"
								>
									<view
										v-for="(tile, tileIdx) in group.tiles" 
										:key="'tile-' + groupIdx + '-' + tileIdx"
									>
										<image :src="getTileSvgPath(tile)" class="tile-icon" mode="aspectFit" />
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { FAN_DATA } from '@/utils/fanData.js';

export default {
	data() {
		return {
			searchText: '',
			selectedScore: 'all',
			expandedFan: null,
			scoreFilters: [
				{ label: '全部', value: 'all' },
				{ label: '88番', value: 88 },
				{ label: '64番', value: 64 },
				{ label: '48番', value: 48 },
				{ label: '32番', value: 32 },
				{ label: '24番', value: 24 },
				{ label: '16番', value: 16 },
				{ label: '12番', value: 12 },
				{ label: '8番', value: 8 },
				{ label: '6番', value: 6 },
				{ label: '5番', value: 5 },
				{ label: '4番', value: 4 },
				{ label: '2番', value: 2 },
				{ label: '1番', value: 1 }
			],
			allFans: []
		};
	},
	onShareAppMessage() {
		return {
			title: '国标麻将番种表',
			path: '/pages/fanlist/fanlist'
		};
	},
	onShareTimeline() {
		return {
			title: '国标麻将番种表',
			query: ''
		};
	},
	created() {
		this.allFans = this.prepareFans(FAN_DATA);
	},
	computed: {
		filteredFans() {
			let fans = [...this.allFans];
			
			if (this.selectedScore !== 'all') {
				fans = fans.filter(f => f.score === this.selectedScore);
			}
			
			const keyword = this.searchText.trim().toLowerCase();
			if (keyword) {
				fans = fans.filter(f => {
					return f.name.toLowerCase().includes(keyword) ||
						(f.description || '').toLowerCase().includes(keyword) ||
						(f.note || '').toLowerCase().includes(keyword);
				});
			}
			
			return fans.sort((a, b) => {
				if (b.score !== a.score) return b.score - a.score;
				return a.originIndex - b.originIndex;
			});
		}
	},
	methods: {
		vibrateFeedback(type = 'light') {
			if (typeof uni === 'undefined' || typeof uni.vibrateShort !== 'function') return;
			try {
				uni.vibrateShort({ type });
			} catch (error) {
				uni.vibrateShort();
			}
		},
		prepareFans(fans) {
			const seen = new Set();
			return fans.reduce((list, fan, index) => {
				const key = `${fan.name}-${fan.score}`;
				if (seen.has(key)) return list;
				seen.add(key);

				list.push({
					...fan,
					originIndex: index,
					displayGroups: this.buildDisplayGroups(fan),
				});
				return list;
			}, []);
		},
		buildDisplayGroups(fan) {
			const example = fan.exampleTiles || {};
			const meldGroups = (example.melds || []).map(meld => ({
				kind: 'meld',
				label: this.getMeldTypeText(meld.type),
				tiles: meld.tiles || []
			}));
			const concealed = example.concealed || [];
			const groups = [...meldGroups];

			if (concealed.length > 0) {
				groups.push({
					kind: 'concealed',
					tiles: concealed
				});
			}

			const pairTiles = this.getPairTiles(fan);
			if (pairTiles.length > 0) {
				groups.push({
					kind: 'pair',
					label: pairTiles.length === 1 ? '和牌' : '将牌',
					tiles: pairTiles
				});
			}

			return groups;
		},
		getPairTiles(fan) {
			const example = fan.exampleTiles || {};
			const pair = example.pair;
			if (pair) {
				const baseCount = (example.concealed || []).length +
					(example.melds || []).reduce((sum, meld) => sum + (meld.tiles || []).length, 0);
				return baseCount >= 13 ? [pair] : [pair, pair];
			}

			return [];
		},
		getConcealedLabel(fan) {
			if (!fan.exampleTiles || !fan.exampleTiles.pair) {
				return '手牌';
			}
			return fan.exampleTiles.melds && fan.exampleTiles.melds.length > 0 ? '暗牌' : '面子';
		},
		buildExampleSummary(fan) {
			const example = fan.exampleTiles || {};
			const concealedCount = (example.concealed || []).length;
			const meldCount = (example.melds || []).reduce((sum, meld) => sum + (meld.tiles || []).length, 0);
			const pairCount = this.getPairTiles(fan).length;
			const total = concealedCount + meldCount + pairCount;
			const hasGang = (example.melds || []).some(meld => (meld.tiles || []).length === 4) ||
				(example.concealed || []).some((tile, index, tiles) => tiles.filter(t => t === tile).length === 4);
			const target = hasGang ? '含杠牌型可超过 14 张展示' :
				(total === 14 ? '完整和牌展示' : '核心结构展示');

			return `${total} 张，${target}`;
		},
		onSearch() {
			this.expandedFan = null;
		},
		clearSearch() {
			this.searchText = '';
		},
		filterByScore(score) {
			this.vibrateFeedback('light');
			this.selectedScore = score;
			this.expandedFan = null;
		},
		toggleFan(name) {
			this.expandedFan = this.expandedFan === name ? null : name;
		},
		getTileSvgPath(tileId) {
			return `/static/image/tile/${tileId}.svg`;
		},
		getMeldTypeText(type) {
			const typeMap = {
				'chi': '吃',
				'pong': '碰',
				'minggang': '明杠',
				'angang': '暗杠'
			};
			return typeMap[type] || type;
		}
	}
};
</script>

<style lang="scss">
.app {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.sticky {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #fff;
}

.search-bar {
	padding: 16rpx 24rpx;
	display: flex;
	align-items: center;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

.search-input {
	flex: 1;
	height: 60rpx;
	background-color: #f5f5f5;
	border-radius: 30rpx;
	padding: 0 20rpx;
	font-size: 26rpx;
}

.search-clear {
	width: 40rpx;
	height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 34rpx;
	color: #999;
	margin-left: 12rpx;
}

.filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 10rpx;
	background-color: #fff;
	padding: 0 20rpx 16rpx;
	white-space: nowrap;
}

.filter-btn {
	padding: 6rpx 12rpx;
	border-radius: 28rpx;
	font-size: 22rpx;
	background-color: #f0f0f0;
	color: #666;
	transition: all 0.2s;
	white-space: nowrap;
}

.filter-btn-active {
	background-color: #3b82f6;
	color: #fff;
}

.fan-list {
    box-sizing: border-box;
	padding: 16rpx;
}

.empty-state {
	text-align: center;
	padding: 96rpx 0;
	color: #999;
	font-size: 26rpx;
}

.fan-card {
	background-color: #fff;
	border-radius: 12rpx;
	margin-bottom: 16rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
	transition: all 0.3s;
}

.fan-card-expanded {
	box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.1);
}

.fan-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 24rpx;
	cursor: pointer;
    gap: 12rpx;
}

.fan-name {
	font-size: 30rpx;
	font-weight: bold;
	color: #1f2937;
}

.fan-score-badge {
	display: flex;
	align-items: baseline;
    background-color: #667eea;
	color: #fff;
	padding: 6rpx 12rpx;
	border-radius: 32rpx;
}

.fan-score {
	font-size: 23rpx;
	font-weight: bold;
}

.fan-score-unit {
	font-size: 20rpx;
	margin-left: 4rpx;
}

.fan-expand-icon {
	font-size: 24rpx;
	color: #999;
}

.fan-content {
	padding: 0 24rpx 24rpx;
	border-top: 1rpx solid #f0f0f0;
}

.fan-section {
	margin-top: 16rpx;
}

.exclude {
	display: inline-flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
}

.section-label {
	font-size: 22rpx;
	color: #666;
	display: block;
	// margin-bottom: 8rpx;
	line-height: 44rpx;
}

.fan-description {
	font-size: 26rpx;
	color: #333;
	line-height: 1.45;
}

.exclusion-tags {
	display: inline-flex;
	flex-wrap: wrap;
	gap: 8rpx;
}

.exclusion-tag {
	padding: 6rpx 12rpx;
	background-color: #fef2f2;
	color: #dc2626;
	border-radius: 8rpx;
	font-size: 22rpx;
}

.fan-note {
	font-size: 24rpx;
	color: #666;
	line-height: 1.4;
	font-style: italic;
}

.example-tiles {
	margin-top: 10rpx;
}

.tile-groups {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: 18rpx;
}

.tile-group {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
	min-width: 0;
	max-width: 100%;
}

.example-tile {
	width: 48rpx;
	height: 66rpx;
	border-radius: 6rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.tile-icon {
	width: 48rpx;
	height: 68rpx;
}
</style>
