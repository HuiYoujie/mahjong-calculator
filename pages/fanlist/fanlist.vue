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
				@click="toggleFan(fan.name)"
			>
				<!-- 标题行 -->
				<view class="fan-header">
                    <text class="fan-name">{{ fan.name }}</text>
                    <view class="fan-score-badge">
                        <text class="fan-score">{{ fan.score }}</text>
                        <text class="fan-score-unit">番</text>
                    </view>
				</view>

				<!-- 展开内容 -->
				<view v-if="expandedFan === fan.name" class="fan-content">
					<!-- 描述 -->
					<view class="fan-section">
						<text class="fan-description">{{ fan.description }}</text>
					</view>

					<!-- 不计规则 -->
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

					<!-- 示例牌型 -->
					<view class="fan-section">
						<text class="section-label">示例牌型：</text>
						<view class="example-tiles">
							<!-- 副露 -->
							<view v-if="fan.exampleTiles.melds && fan.exampleTiles.melds.length > 0" class="meld-tiles">
								<view 
									v-for="(meld, meldIdx) in fan.exampleTiles.melds" 
									:key="'meld-' + meldIdx"
									class="meld-group"
								>
									<view 
										v-for="(tile, tileIdx) in meld.tiles" 
										:key="'meld-tile-' + meldIdx + '-' + tileIdx"
										class="example-tile meld-tile"
									>
										<image :src="getTileSvgPath(tile)" class="tile-icon" mode="aspectFit" />
									</view>
									<view class="meld-type-badge">
										{{ getMeldTypeText(meld.type) }}
									</view>
								</view>
							</view>
							
							<!-- 手牌 -->
							<view class="concealed-tiles">
								<view 
									v-for="(tile, tileIdx) in fan.exampleTiles.concealed" 
									:key="'concealed-' + tileIdx"
									class="example-tile concealed-tile"
								>
									<image :src="getTileSvgPath(tile)" class="tile-icon" mode="aspectFit" />
								</view>
								<!-- 将牌 -->
								<view 
									v-if="fan.exampleTiles.pair"
									class="example-tile pair-tile"
								>
									<image :src="getTileSvgPath(fan.exampleTiles.pair)" class="tile-icon" mode="aspectFit" />
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
			allFans: FAN_DATA
		};
	},
	computed: {
		filteredFans() {
			let fans = this.allFans;
			
			// 按番数筛选
			if (this.selectedScore !== 'all') {
				fans = fans.filter(f => f.score === this.selectedScore);
			}
			
			// 按名称搜索
			if (this.searchText) {
				const keyword = this.searchText.toLowerCase();
				fans = fans.filter(f => f.name.toLowerCase().includes(keyword));
			}
			
			// 按番数降序排序
			return fans.sort((a, b) => b.score - a.score);
		}
	},
	methods: {
		onSearch() {
			// 搜索时会自动触发 computed
		},
		clearSearch() {
			this.searchText = '';
		},
		filterByScore(score) {
			this.selectedScore = score;
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
	// padding-bottom: env(safe-area-inset-bottom);
}

.sticky {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #fff;
}

.search-bar {
	padding: 24rpx 32rpx;
	display: flex;
	align-items: center;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.search-input {
	flex: 1;
	height: 72rpx;
	background-color: #f5f5f5;
	border-radius: 36rpx;
	padding: 0 24rpx;
	font-size: 28rpx;
}

.search-clear {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 40rpx;
	color: #999;
	margin-left: 16rpx;
}

.filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
	background-color: #fff;
	padding: 0 24rpx 24rpx;
	white-space: nowrap;
}

.filter-btn {
	padding: 8rpx 16rpx;
	border-radius: 32rpx;
	font-size: 24rpx;
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
	padding: 24rpx;
}

.empty-state {
	text-align: center;
	padding: 120rpx 0;
	color: #999;
	font-size: 28rpx;
}

.fan-card {
	background-color: #fff;
	border-radius: 16rpx;
	margin-bottom: 24rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
	transition: all 0.3s;
}

.fan-card-expanded {
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.12);
}

.fan-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 28rpx 32rpx;
	cursor: pointer;
    gap: 20rpx;
}

.fan-name {
	font-size: 32rpx;
	font-weight: bold;
	color: #1f2937;
}

.fan-score-badge {
	display: flex;
	align-items: baseline;
	// background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-color: #667eea;
	color: #fff;
	padding: 8rpx 16rpx;
	border-radius: 40rpx;
}

.fan-score {
	font-size: 24rpx;
	font-weight: bold;
}

.fan-score-unit {
	font-size: 22rpx;
	margin-left: 4rpx;
}

.fan-expand-icon {
	font-size: 24rpx;
	color: #999;
}

.fan-content {
	padding: 0 32rpx 32rpx;
	border-top: 1rpx solid #f0f0f0;
}

.fan-section {
	margin-top: 24rpx;
}

.section-label {
	font-size: 26rpx;
	color: #666;
	display: block;
	margin-bottom: 12rpx;
}

.fan-description {
	font-size: 28rpx;
	color: #333;
	line-height: 1.6;
}

.exclusion-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 12rpx;
}

.exclusion-tag {
	padding: 8rpx 16rpx;
	background-color: #fef2f2;
	color: #dc2626;
	border-radius: 8rpx;
	font-size: 24rpx;
}

.fan-note {
	font-size: 26rpx;
	color: #666;
	line-height: 1.5;
	font-style: italic;
}

.example-tiles {
	margin-top: 16rpx;
}

.meld-tiles {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
	margin-bottom: 16rpx;
}

.meld-group {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
}

.meld-group .example-tile {
	margin: 0;
}

.meld-type-badge {
	font-size: 20rpx;
	color: #666;
	background-color: #f5f5f5;
	padding: 4rpx 12rpx;
	border-radius: 8rpx;
}

.concealed-tiles {
	display: flex;
	flex-wrap: wrap;
	gap: 8rpx;
}

.example-tile {
	width: 52rpx;
	height: 72rpx;
	// background-color: #dbeafe;
	// border: 2rpx solid #60a5fa;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.concealed-tile {
	// background-color: #fef3c7;
	// border-color: #fbbf24;
}

.pair-tile {
	// background-color: #dcfce7;
	// border-color: #22c55e;
}

.meld-tile {
	// background-color: #fef9c3;
	// border-color: #facc15;
}

.tile-icon {
	width: 44rpx;
	height: 64rpx;
}
</style>
