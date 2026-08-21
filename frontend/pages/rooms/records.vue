<template>
	<view class="page">
		<view class="topbar">
			<view>
				<view class="title">{{ roomName || '给分记录' }}</view>
				<view class="subtitle">仅可撤销最近一条记录</view>
			</view>
			<button v-if="canUndoLatest" class="undo-btn" :disabled="undoBlocked" @click="confirmUndoLatest">撤销最近</button>
		</view>

		<view v-if="loading" class="empty">加载中...</view>
		<block v-else>
			<view v-if="riskMessage" :class="['risk-banner', userRisk.status]">{{ riskMessage }}</view>
			<view v-if="records.length === 0" class="empty-card">
				<view class="empty-title">暂无给分记录</view>
				<view class="empty-desc">房间内完成给分后会显示在这里。</view>
			</view>
			<view v-else class="record-list">
				<view v-for="record in records" :key="record.id" class="record-card">
					<view class="record-main">
						<view class="record-title">
							{{ getRecordTitle(record) }}
						</view>
						<view class="record-meta">
							{{ record.createdAt }}{{ getRecordNote(record) }}
						</view>
					</view>
					<view class="record-side">
						<view v-if="record.id === latestRecordId" class="latest-tag">最新</view>
						<view v-if="record.score > 0" class="record-score">+{{ record.score }}</view>
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
			canUndoLatest: false,
			latestRecordId: '',
			userRisk: {
				status: 'normal',
				message: ''
			},
			loading: true
		};
	},
	computed: {
		riskMessage() {
			if (!this.userRisk || this.userRisk.status === 'normal') return '';
			return this.userRisk.message || '账号撤销功能暂不可用';
		},
		undoBlocked() {
			return ['limited', 'banned'].includes(this.userRisk.status);
		}
	},
	onLoad(query) {
		this.roomId = query.roomId;
		this.loadRecords();
	},
	methods: {
		getRecordTitle(record) {
			if (record.type === 'transfer-owner' || record.note === '转让房主') {
				return `${record.fromName} 转让房主给 ${record.toName}`;
			}
			return `${record.fromName} 给 ${record.toName}`;
		},
		getRecordNote(record) {
			if (!record.note || record.note === '转让房主') return '';
			return ` · ${record.note}`;
		},
		async loadRecords() {
			this.loading = true;
			const res = await roomService.getRecords(this.roomId);
			if (!res.ok) {
				uni.showToast({ title: res.message, icon: 'none' });
			}
			this.roomName = res.roomName || '给分记录';
			this.records = res.records || [];
			this.canUndoLatest = !!res.canUndoLatest;
			this.latestRecordId = res.latestRecordId || '';
			this.userRisk = res.userRisk || this.userRisk;
			this.loading = false;
		},
		confirmUndoLatest() {
			if (this.undoBlocked) {
				uni.showToast({ title: this.riskMessage, icon: 'none' });
				return;
			}
			uni.showModal({
				title: '撤销最近一条',
				content: '撤销后会回滚对应分数或房主变更。确定继续吗？',
				confirmText: '确认撤销',
				confirmColor: '#dc2626',
				success: async result => {
					if (!result.confirm) return;
					const res = await roomService.undoLatestRecord(this.roomId);
					if (!res.ok) {
						uni.showToast({ title: res.message, icon: 'none' });
						return;
					}
					uni.showToast({ title: res.message || '已撤销', icon: 'none' });
					this.loadRecords();
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

.subtitle {
	font-size: 24rpx;
	color: #6b7280;
	margin-top: 6rpx;
}

.undo-btn {
	height: 64rpx;
	padding: 0 20rpx;
	border-radius: 14rpx;
	background: #fee2e2;
	color: #dc2626;
	font-size: 24rpx;
}

.undo-btn[disabled] {
	background: #e5e7eb;
	color: #94a3b8;
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

.record-card,
.empty-card {
	background: #ffffff;
	border-radius: 16rpx;
	padding: 24rpx;
	margin-bottom: 16rpx;
	box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.06);
}

.record-card {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16rpx;
}

.record-main {
	flex: 1;
	min-width: 0;
}

.record-title,
.empty-title {
	font-size: 30rpx;
	font-weight: 700;
	color: #111827;
}

.record-meta,
.empty-desc {
	font-size: 24rpx;
	color: #6b7280;
	margin-top: 8rpx;
}

.record-side {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 8rpx;
}

.latest-tag {
	padding: 4rpx 10rpx;
	border-radius: 999rpx;
	background: #eff6ff;
	color: #2563eb;
	font-size: 20rpx;
}

.record-score {
	font-size: 34rpx;
	font-weight: 800;
	color: #16a34a;
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

