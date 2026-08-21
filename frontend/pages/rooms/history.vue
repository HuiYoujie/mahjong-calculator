<template>
	<view class="page">
		<view class="title">历史记录</view>
		<view v-if="loading" class="empty">加载中...</view>
		<view v-else-if="history.length === 0" class="empty-card">
			<view class="empty-title">暂无历史记录</view>
			<view class="empty-desc">结算后的房间会展示在这里。</view>
		</view>
		<view v-else>
			<view v-for="room in history" :key="room.id" class="history-card">
				<view class="history-head">
					<view>
						<view class="room-name">{{ room.name }}</view>
						<view class="room-meta">结算于 {{ room.settledAt }}</view>
					</view>
					<view class="count">{{ room.players.length }} 人</view>
				</view>
				<view class="score-list">
					<view v-for="player in room.players" :key="player.id" class="score-row">
						<text class="nickname">{{ player.nickname }}</text>
						<text :class="['score', player.score >= 0 ? 'plus' : 'minus']">
							{{ player.score >= 0 ? '+' : '' }}{{ player.score }}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { roomService } from '@/utils/roomService.js';

export default {
	data() {
		return {
			loading: true,
			history: []
		};
	},
	onShow() {
		this.loadHistory();
	},
	methods: {
		async loadHistory() {
			this.loading = true;
			const res = await roomService.getHistory();
			this.history = res.history || [];
			this.loading = false;
		}
	}
};
</script>

<style lang="scss">
.page {
	min-height: 100vh;
	background: #f5f7fb;
	padding: 24rpx;
	box-sizing: border-box;
}

.title {
	font-size: 40rpx;
	font-weight: 700;
	color: #111827;
	margin-bottom: 24rpx;
}

.history-card,
.empty-card {
	background: #ffffff;
	border-radius: 16rpx;
	padding: 24rpx;
	margin-bottom: 16rpx;
	box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.06);
}

.history-head {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16rpx;
}

.room-name,
.empty-title {
	font-size: 30rpx;
	font-weight: 700;
	color: #111827;
}

.room-meta,
.empty-desc {
	font-size: 24rpx;
	color: #6b7280;
	margin-top: 8rpx;
}

.count {
	padding: 6rpx 14rpx;
	border-radius: 999rpx;
	background: #eff6ff;
	color: #2563eb;
	font-size: 22rpx;
}

.score-list {
	border-top: 1rpx solid #eef2f7;
	padding-top: 12rpx;
}

.score-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8rpx 0;
}

.nickname {
	font-size: 26rpx;
	color: #334155;
}

.score {
	font-size: 28rpx;
	font-weight: 800;
}

.plus {
	color: #16a34a;
}

.minus {
	color: #dc2626;
}

.empty {
	text-align: center;
	color: #6b7280;
	padding: 120rpx 0;
}
</style>

