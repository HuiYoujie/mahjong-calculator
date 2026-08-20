<template>
	<view class="page">
		<view class="topbar">
			<view>
				<view class="title">房间</view>
				<view class="subtitle">未结算房间 {{ joinedCount }}/{{ maxJoinedRooms }}</view>
			</view>
			<button class="history-btn" @click="goHistory">历史记录</button>
		</view>

		<view class="actions">
			<view v-if="riskMessage" :class="['risk-banner', userRisk.status]">{{ riskMessage }}</view>
			<button class="primary-btn" :disabled="creating || riskBlocked || joinedCount >= maxJoinedRooms" @click="createRoom">
				{{ createButtonText }}
			</button>
			<view class="hint">
				没人时只能先新建一个房间；每人最多加入 5 个未结算房间。
			</view>
		</view>

		<view v-if="loading" class="empty">加载中...</view>

		<view v-else-if="rooms.length === 0" class="empty-card">
			<view class="empty-title">暂无未结算房间</view>
			<view class="empty-desc">先创建一个房间，再分享给好友加入。</view>
		</view>

		<view v-else class="room-list">
			<view v-for="room in rooms" :key="room.id" class="room-card" @click="enterRoom(room.id)">
				<view class="room-head">
					<view>
						<view class="room-name">{{ room.name }}</view>
						<view class="room-meta">{{ room.createdAt }} · {{ room.players.length }}/10 人</view>
					</view>
					<view class="enter">进入</view>
				</view>
				<view class="avatar-row">
					<image v-for="player in room.players.slice(0, 6)" :key="player.id" :src="player.avatar" class="avatar" mode="aspectFill" />
					<view v-if="room.players.length > 6" class="more">+{{ room.players.length - 6 }}</view>
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
			creating: false,
			rooms: [],
			joinedCount: 0,
			maxJoinedRooms: roomService.limits.maxJoinedRooms,
			userRisk: {
				status: 'normal',
				message: ''
			}
		};
	},
	computed: {
		riskBlocked() {
			return ['limited', 'banned'].includes(this.userRisk.status);
		},
		riskMessage() {
			if (!this.userRisk || this.userRisk.status === 'normal') return '';
			return this.userRisk.message || '账号房间功能暂不可用';
		},
		createButtonText() {
			if (this.userRisk.status === 'banned') return '房间功能已限制';
			if (this.userRisk.status === 'limited') return '暂不可新建房间';
			return this.joinedCount >= this.maxJoinedRooms ? '已达房间上限' : '新建房间';
		}
	},
	onShow() {
		this.loadLobby();
	},
	methods: {
		vibrate(type = 'light') {
			if (typeof uni === 'undefined' || typeof uni.vibrateShort !== 'function') return;
			try {
				uni.vibrateShort({ type });
			} catch (error) {
				uni.vibrateShort();
			}
		},
		showToast(message) {
			uni.showToast({ title: message, icon: 'none' });
		},
		async loadLobby() {
			this.loading = true;
			const res = await roomService.getLobby();
			this.rooms = res.rooms;
			this.joinedCount = res.joinedCount;
			this.maxJoinedRooms = res.maxJoinedRooms;
			this.userRisk = res.userRisk || this.userRisk;
			this.loading = false;
		},
		async createRoom() {
			this.vibrate('medium');
			if (this.riskBlocked) {
				this.showToast(this.riskMessage);
				return;
			}
			if (this.joinedCount >= this.maxJoinedRooms) {
				this.showToast('最多只能加入 5 个未结算房间');
				return;
			}
			this.creating = true;
			const res = await roomService.createRoom();
			this.creating = false;
			if (!res.ok) {
				this.showToast(res.message);
				return;
			}
			uni.navigateTo({ url: `/pages/rooms/detail?roomId=${res.room.id}` });
		},
		enterRoom(roomId) {
			this.vibrate('light');
			uni.navigateTo({ url: `/pages/rooms/detail?roomId=${roomId}` });
		},
		goHistory() {
			this.vibrate('light');
			uni.navigateTo({ url: '/pages/rooms/history' });
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
	font-size: 44rpx;
	font-weight: 700;
	color: #111827;
}

.subtitle,
.hint,
.room-meta,
.empty-desc {
	font-size: 24rpx;
	color: #6b7280;
}

.history-btn {
	height: 64rpx;
	padding: 0 22rpx;
	border-radius: 14rpx;
	background: #ffffff;
	color: #2563eb;
	font-size: 26rpx;
	box-shadow: 0 4rpx 12rpx rgba(15, 23, 42, 0.08);
}

.actions,
.room-card,
.empty-card {
	background: #ffffff;
	border-radius: 16rpx;
	padding: 24rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.06);
}

.risk-banner {
	padding: 16rpx 18rpx;
	border-radius: 14rpx;
	background: #fff7ed;
	color: #c2410c;
	font-size: 24rpx;
	margin-bottom: 16rpx;
}

.risk-banner.banned {
	background: #fef2f2;
	color: #dc2626;
}

.primary-btn {
	height: 84rpx;
	border-radius: 16rpx;
	background: #2563eb;
	color: #ffffff;
	font-size: 30rpx;
	font-weight: 600;
	margin-bottom: 16rpx;
}

.primary-btn[disabled] {
	background: #cbd5e1;
	color: #ffffff;
}

.empty {
	text-align: center;
	color: #6b7280;
	padding: 120rpx 0;
}

.empty-title {
	font-size: 32rpx;
	font-weight: 700;
	color: #111827;
	margin-bottom: 8rpx;
}

.room-head {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 18rpx;
}

.room-name {
	font-size: 32rpx;
	font-weight: 700;
	color: #111827;
}

.enter {
	color: #2563eb;
	font-size: 26rpx;
}

.avatar-row {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.avatar,
.more {
	width: 56rpx;
	height: 56rpx;
	border-radius: 50%;
	background: #e5e7eb;
}

.more {
	display: flex;
	align-items: center;
	justify-content: center;
	color: #475569;
	font-size: 22rpx;
}

button::after {
	border: none;
}
</style>

