<template>
	<view class="app">
        <view class="sticky">
			<view class="summary-bar">
				<view>
					<text class="summary-title">国标番表</text>
					<text class="summary-subtitle">{{ filteredFans.length }} / {{ allFans.length }} 种番型</text>
				</view>
				<view class="summary-score">{{ selectedScore === 'all' ? '全部' : selectedScore + '番' }}</view>
			</view>
            <view class="search-bar">
                <input 
                    v-model="searchText" 
                    placeholder="搜索番型名称、说明" 
                    class="search-input"
                    @input="onSearch"
                />
                <text v-if="searchText" class="search-clear" @click="clearSearch">×</text>
            </view>
            <scroll-view scroll-x class="filter-scroll">
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
            </scroll-view>
        </view>

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
					<view class="fan-title-wrap">
						<text class="fan-name">{{ fan.name }}</text>
						<text class="fan-brief">{{ fan.description }}</text>
					</view>
					<view class="fan-header-side">
						<view class="fan-score-badge">
							<text class="fan-score">{{ fan.score }}</text>
							<text class="fan-score-unit">番</text>
						</view>
					</view>
				</view>

				<view v-if="expandedFan === fan.name" class="fan-content">
					<view v-if="fan.exclusions && fan.exclusions.length > 0" class="fan-section">
						<text class="section-label">不计番型：</text>
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

					<!-- 备注 -->
					<view v-if="fan.note" class="fan-section">
						<text class="section-label">备注：</text>
						<text class="fan-note">{{ fan.note }}</text>
					</view>

					<view class="fan-section">
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
					// exampleSummary: this.buildExampleSummary(fan)
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
	background: #f6f7fb;
	color: #1f2937;
}

.sticky {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(255, 255, 255, 0.96);
	border-bottom: 1rpx solid #e5e7eb;
	box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.06);
}

.summary-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 24rpx;
	padding: 24rpx 28rpx 12rpx;
}

.summary-title {
	display: block;
	font-size: 34rpx;
	font-weight: 700;
	color: #111827;
}

.summary-subtitle {
	display: block;
	margin-top: 6rpx;
	font-size: 24rpx;
	color: #6b7280;
}

.summary-score {
	flex-shrink: 0;
	padding: 10rpx 18rpx;
	border-radius: 999rpx;
	background: #eef2ff;
	color: #3730a3;
	font-size: 24rpx;
	font-weight: 600;
}

.search-bar {
	padding: 12rpx 28rpx 20rpx;
	display: flex;
	align-items: center;
}

.search-input {
	flex: 1;
	height: 76rpx;
	background-color: #f3f4f6;
	border: 1rpx solid #e5e7eb;
	border-radius: 16rpx;
	padding: 0 28rpx;
	font-size: 28rpx;
	color: #111827;
}

.search-clear {
	width: 56rpx;
	height: 56rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 42rpx;
	color: #6b7280;
	margin-left: 16rpx;
}

.filter-scroll {
	width: 100%;
	white-space: nowrap;
}

.filter-bar {
    display: inline-flex;
    gap: 12rpx;
	padding: 0 28rpx 24rpx;
	white-space: nowrap;
}

.filter-btn {
	flex-shrink: 0;
	padding: 12rpx 20rpx;
	border-radius: 999rpx;
	font-size: 24rpx;
	background-color: #f3f4f6;
	color: #4b5563;
	border: 1rpx solid #e5e7eb;
	transition: all 0.2s;
}

.filter-btn-active {
	background-color: #2563eb;
	border-color: #2563eb;
	color: #fff;
	box-shadow: 0 8rpx 18rpx rgba(37, 99, 235, 0.22);
}

.fan-list {
    box-sizing: border-box;
	padding: 24rpx 24rpx 40rpx;
}

.empty-state {
	text-align: center;
	padding: 120rpx 0;
	color: #6b7280;
	font-size: 28rpx;
}

.fan-card {
	background-color: #fff;
	border: 1rpx solid #e5e7eb;
	border-radius: 14rpx;
	margin-bottom: 20rpx;
	overflow: hidden;
	box-shadow: 0 6rpx 20rpx rgba(15, 23, 42, 0.05);
	transition: all 0.3s;
}

.fan-card-expanded {
	border-color: #bfdbfe;
	box-shadow: 0 10rpx 28rpx rgba(37, 99, 235, 0.12);
}

.fan-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 24rpx;
	cursor: pointer;
    gap: 20rpx;
}

.fan-title-wrap {
	min-width: 0;
	flex: 1;
}

.fan-name {
	display: block;
	font-size: 32rpx;
	font-weight: 700;
	color: #111827;
	line-height: 1.25;
}

.fan-brief {
	display: block;
	margin-top: 8rpx;
	font-size: 24rpx;
	color: #6b7280;
	line-height: 1.35;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.fan-header-side {
	display: flex;
	align-items: center;
	gap: 14rpx;
	flex-shrink: 0;
}

.fan-score-badge {
	display: flex;
	align-items: baseline;
    background-color: #111827;
	color: #fff;
	padding: 8rpx 14rpx;
	border-radius: 12rpx;
	min-width: 72rpx;
	justify-content: center;
}

.fan-score {
	font-size: 26rpx;
	font-weight: 700;
}

.fan-score-unit {
	font-size: 20rpx;
	font-size: 20rpx;
	margin-left: 4rpx;
}

.fan-expand-icon {
	font-size: 24rpx;
	color: #2563eb;
}

.fan-content {
	padding: 0 28rpx 30rpx;
	border-top: 1rpx solid #eef2f7;
}

.fan-section {
	margin-top: 22rpx;
}

.section-label {
	font-size: 26rpx;
	color: #374151;
	display: block;
	margin-bottom: 12rpx;
	font-weight: 600;
}

.fan-description {
	font-size: 26rpx;
	color: #333;
	line-height: 1.45;
}

.exclusion-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
}

.exclusion-tag {
	padding: 8rpx 14rpx;
	background-color: #fef2f2;
	color: #dc2626;
	border: 1rpx solid #fecaca;
	border-radius: 999rpx;
	font-size: 24rpx;
}

.fan-note {
	font-size: 24rpx;
	color: #666;
	line-height: 1.4;
	font-style: italic;
}

.example-tiles {
	margin-top: 14rpx;
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
	width: 54rpx;
	height: 74rpx;
	background-color: #ffffff;
	border: 1rpx solid #d1d5db;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	box-shadow: 0 3rpx 8rpx rgba(15, 23, 42, 0.08);
}

.tile-icon {
	width: 48rpx;
	height: 68rpx;
}

.example-meta {
	margin-top: 14rpx;
	font-size: 22rpx;
	color: #6b7280;
}

@media screen and (max-width: 360px) {
	.fan-header {
		padding: 24rpx;
	}

	.fan-header-side {
		flex-direction: column;
		align-items: flex-end;
		gap: 8rpx;
	}

	.example-tile {
		width: 50rpx;
		height: 70rpx;
	}

	.tile-icon {
		width: 44rpx;
		height: 64rpx;
	}
}
</style>
