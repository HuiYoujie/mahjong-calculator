<template>
	<view class="page">
		<view class="topbar">
			<view>
				<view class="title">{{ roomName || '算番记录' }}</view>
				<view class="subtitle">房间内保存的全部算番结果</view>
			</view>
			<button class="share-btn" :disabled="shareBlocked" @click="unlockShare">{{ shareUnlocked ? '分享统计' : '看广告分享' }}</button>
		</view>

		<view v-if="loading" class="empty">加载中...</view>
		<block v-else>
			<view v-if="riskMessage" :class="['risk-banner', userRisk.status]">{{ riskMessage }}</view>
			<view class="stats-grid">
				<view class="stat-card">
					<view class="stat-value">{{ stats.totalCount || 0 }}</view>
					<view class="stat-label">算番次数</view>
				</view>
				<view class="stat-card">
					<view class="stat-value">{{ stats.topRecord ? stats.topRecord.totalScore : 0 }}</view>
					<view class="stat-label">最高番</view>
				</view>
				<view class="stat-card">
					<view class="stat-value">{{ stats.commonFans && stats.commonFans[0] ? stats.commonFans[0].name : '-' }}</view>
					<view class="stat-label">常见番型</view>
				</view>
				<view class="stat-card">
					<view class="stat-value">{{ bestPlayerName }}</view>
					<view class="stat-label">最佳玩家</view>
				</view>
			</view>

			<view v-if="stats.playerStats && stats.playerStats.length" class="section">
				<view class="section-title">玩家统计</view>
				<view v-for="player in stats.playerStats" :key="player.playerId" class="player-row">
					<view class="player-name">{{ player.playerName }}</view>
					<view class="player-meta">{{ player.count }} 次 · 累计 {{ player.totalScore }} 番 · 最高 {{ player.bestScore }} 番</view>
				</view>
			</view>

			<view v-if="records.length === 0" class="empty-card">
				<view class="empty-title">暂无算番记录</view>
				<view class="empty-desc">从房间详情进入算番页，保存结果后会出现在这里。</view>
			</view>
			<view v-else class="record-list">
				<view v-for="record in records" :key="record.id" class="record-card">
					<view class="record-head">
						<view>
							<view class="record-title">{{ record.playerName }} · {{ record.totalScore }} 番</view>
							<view class="record-meta">{{ record.createdAt }}{{ record.isSelfDrawn ? ' · 自摸' : '' }}</view>
						</view>
						<view class="score">{{ record.totalScore }}</view>
					</view>
					<view class="fan-tags">
						<text v-for="fan in record.fans" :key="fan.name" class="fan-tag">{{ fan.name }} {{ fan.score }}番</text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
import { roomService } from '@/utils/roomService.js';

export default {
	data() {
		return {
			roomId: '',
			roomName: '',
			records: [],
			stats: {
				totalCount: 0,
				topRecord: null,
				commonFans: [],
				playerStats: []
			},
			shareUnlocked: false,
			userRisk: {
				status: 'normal',
				message: ''
			},
			loading: true
		};
	},
	computed: {
		bestPlayerName() {
			const best = this.stats.playerStats && this.stats.playerStats[0];
			return best ? best.playerName : '-';
		},
		riskMessage() {
			if (!this.userRisk || this.userRisk.status === 'normal') return '';
			return this.userRisk.message || '账号分享功能暂不可用';
		},
		shareBlocked() {
			return ['limited', 'banned'].includes(this.userRisk.status);
		}
	},
	onLoad(query) {
		this.roomId = query.roomId;
		this.loadFanRecords();
	},
	onShow() {
		if (this.roomId) this.loadFanRecords();
	},
	onShareAppMessage() {
		return {
			title: this.shareText(),
			path: `/pages/rooms/fan-records?roomId=${this.roomId}`
		};
	},
	methods: {
		async loadFanRecords() {
			this.loading = true;
			const res = await roomService.getFanRecords(this.roomId);
			if (!res.ok) {
				uni.showToast({ title: res.message, icon: 'none' });
			}
			this.roomName = res.roomName || '算番记录';
			this.records = res.records || [];
			this.stats = res.stats || this.stats;
			this.shareUnlocked = !!res.shareUnlocked;
			this.userRisk = res.userRisk || this.userRisk;
			this.loading = false;
		},
		shareText() {
			const top = this.stats.topRecord ? `${this.stats.topRecord.totalScore}番` : '暂无记录';
			return `${this.roomName || '麻将房间'}算番统计：共${this.stats.totalCount || 0}次，最高${top}`;
		},
		unlockShare() {
			if (this.shareBlocked) {
				uni.showToast({ title: this.riskMessage, icon: 'none' });
				return;
			}
			if (this.records.length === 0) {
				uni.showToast({ title: '暂无记录可分享', icon: 'none' });
				return;
			}
			if (this.shareUnlocked) {
				uni.showShareMenu({ withShareTicket: true });
				uni.showToast({ title: '请点右上角分享', icon: 'none' });
				return;
			}
			uni.showModal({
				title: '观看广告解锁',
				content: '这里先用 mock 模拟激励广告。确认后视为广告观看完成，可分享本房算番统计。',
				confirmText: '模拟完成',
				confirmColor: '#2563eb',
				success: async result => {
					if (!result.confirm) return;
					const res = await roomService.unlockFanShare(this.roomId);
					if (!res.ok) {
						uni.showToast({ title: res.message, icon: 'none' });
						return;
					}
					this.shareUnlocked = true;
					uni.showToast({ title: '已解锁分享', icon: 'none' });
				}
			});
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

.topbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24rpx;
}

.title {
	font-size: 40rpx;
	font-weight: 700;
	color: #111827;
}

.subtitle,
.stat-label,
.record-meta,
.player-meta,
.empty-desc {
	font-size: 24rpx;
	color: #6b7280;
	margin-top: 6rpx;
}

.share-btn {
	height: 64rpx;
	padding: 0 20rpx;
	border-radius: 14rpx;
	background: #2563eb;
	color: #ffffff;
	font-size: 24rpx;
}

.share-btn[disabled] {
	background: #cbd5e1;
	color: #ffffff;
}

.risk-banner {
	padding: 16rpx 18rpx;
	border-radius: 14rpx;
	background: #fff7ed;
	color: #c2410c;
	font-size: 24rpx;
	margin-bottom: 20rpx;
}

.risk-banner.banned {
	background: #fef2f2;
	color: #dc2626;
}

.stats-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16rpx;
	margin-bottom: 20rpx;
}

.stat-card,
.section,
.record-card,
.empty-card {
	background: #ffffff;
	border-radius: 16rpx;
	padding: 24rpx;
	box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.06);
}

.stat-value {
	font-size: 36rpx;
	font-weight: 800;
	color: #111827;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.section {
	margin-bottom: 20rpx;
}

.section-title,
.empty-title {
	font-size: 30rpx;
	font-weight: 700;
	color: #111827;
	margin-bottom: 12rpx;
}

.player-row {
	padding: 12rpx 0;
	border-top: 1rpx solid #eef2f7;
}

.player-name {
	font-size: 28rpx;
	font-weight: 700;
	color: #334155;
}

.record-card {
	margin-bottom: 16rpx;
}

.record-head {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 16rpx;
}

.record-title {
	font-size: 30rpx;
	font-weight: 700;
	color: #111827;
}

.score {
	font-size: 42rpx;
	font-weight: 900;
	color: #2563eb;
}

.fan-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 8rpx;
	margin-top: 16rpx;
}

.fan-tag {
	padding: 6rpx 12rpx;
	border-radius: 999rpx;
	background: #eff6ff;
	color: #2563eb;
	font-size: 22rpx;
}

.empty {
	text-align: center;
	color: #6b7280;
	padding: 120rpx 0;
}

button::after {
	border: none;
}
</style>
