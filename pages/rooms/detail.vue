<template>
	<view class="page">
		<view v-if="loading" class="empty">加载中...</view>
		<view v-else-if="!room" class="empty-card">
			<view class="empty-title">房间不可用</view>
			<view class="empty-desc">房间可能已结算或不存在。</view>
		</view>

		<block v-else>
			<view class="room-panel">
				<view class="room-head">
					<view>
						<view class="title">{{ room.name }}</view>
						<view class="subtitle">{{ room.players.length }}/10 人 · {{ isOwner ? '我是房主' : '房主：' + ownerName }}</view>
					</view>
					<button class="share-btn" open-type="share" @click="vibrate('light')">邀请好友</button>
				</view>
				<view v-if="riskMessage" :class="['risk-banner', userRisk.status]">{{ riskMessage }}</view>

				<view class="toolbar">
					<button class="tool-btn" :disabled="actionBlocked" @click="inviteMockFriend">模拟好友加入</button>
					<button class="tool-btn" :disabled="roomBlocked" @click="goCalculator">房间算番</button>
					<button class="tool-btn" @click="goFanRecords">算番记录</button>
					<button class="tool-btn" @click="goRecords">给分记录</button>
					<button v-if="isOwner" class="danger-btn" :disabled="actionBlocked" @click="settleRoom">结算</button>
				</view>
			</view>

			<view class="players">
				<view v-for="player in room.players" :key="player.id" class="player-card">
					<image :src="player.avatar" class="avatar" mode="aspectFill" />
					<view class="player-main">
						<view class="name-row">
							<text class="nickname">{{ player.nickname }}</text>
							<text v-if="player.id === room.ownerId" class="owner-tag">房主</text>
						</view>
						<view :class="['score', player.score >= 0 ? 'score-plus' : 'score-minus']">
							{{ player.score >= 0 ? '+' : '' }}{{ player.score }}
						</view>
					</view>
					<view class="player-actions">
						<button class="mini-btn" :disabled="actionBlocked || player.id === currentUser.id" @click="openScorePanel(player)">给分</button>
						<button class="mini-btn ghost" :disabled="!canTransferTo(player)" @click="transferOwner(player)">转让</button>
					</view>
				</view>
			</view>

			<view v-if="scoreTarget" class="score-mask" @click="closeScorePanel">
				<view class="score-panel" @click.stop>
					<view class="panel-title">给 {{ scoreTarget.nickname }} 分</view>
					<input class="score-input" type="number" v-model="scoreValue" placeholder="输入分数" />
					<input class="score-input" v-model="scoreNote" placeholder="备注，如：点炮、补差" />
					<view class="panel-actions">
						<button class="cancel-btn" @click="closeScorePanel">取消</button>
						<button class="confirm-btn" @click="submitScore">确认给分</button>
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
			room: null,
			loading: true,
			currentUser: roomService.currentUser,
			scoreTarget: null,
			scoreValue: '',
			scoreNote: '',
			userRisk: {
				status: 'normal',
				message: ''
			}
		};
	},
	computed: {
		isOwner() {
			return this.room && this.room.ownerId === this.currentUser.id;
		},
		ownerName() {
			const owner = this.room && this.room.players.find(player => player.id === this.room.ownerId);
			return owner ? owner.nickname : '未知';
		},
		riskMessage() {
			if (!this.userRisk || this.userRisk.status === 'normal') return '';
			return this.userRisk.message || '账号房间功能暂不可用';
		},
		roomBlocked() {
			return this.userRisk.status === 'banned';
		},
		actionBlocked() {
			return ['limited', 'banned'].includes(this.userRisk.status);
		}
	},
	onLoad(query) {
		this.roomId = query.roomId;
		this.loadRoom();
	},
	onShow() {
		if (this.roomId) {
			this.loadRoom();
		}
	},
	onShareAppMessage() {
		return {
			title: this.room ? `加入 ${this.room.name}` : '加入麻将房间',
			path: `/pages/rooms/detail?roomId=${this.roomId}`
		};
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
		toast(message) {
			uni.showToast({ title: message, icon: 'none' });
		},
		async loadRoom() {
			this.loading = true;
			const res = await roomService.getRoom(this.roomId);
			this.room = res.ok ? res.room : null;
			this.userRisk = res.userRisk || this.userRisk;
			this.loading = false;
		},
		async inviteMockFriend() {
			this.vibrate('light');
			if (this.actionBlocked) {
				this.toast(this.riskMessage);
				return;
			}
			const res = await roomService.inviteMockFriend(this.roomId);
			if (!res.ok) {
				this.toast(res.message);
				return;
			}
			this.room = res.room;
		},
		openScorePanel(player) {
			this.vibrate('medium');
			if (this.actionBlocked) {
				this.toast(this.riskMessage);
				return;
			}
			if (player.id === this.currentUser.id) {
				this.toast('不能给自己加分');
				return;
			}
			this.scoreTarget = player;
			this.scoreValue = '';
			this.scoreNote = '';
		},
		closeScorePanel() {
			this.scoreTarget = null;
		},
		async submitScore() {
			this.vibrate('medium');
			const res = await roomService.giveScore(this.roomId, this.scoreTarget.id, this.scoreValue, this.scoreNote);
			if (!res.ok) {
				this.toast(res.message);
				return;
			}
			this.room = res.room;
			this.closeScorePanel();
		},
		canTransferTo(player) {
			return !this.actionBlocked && this.isOwner && this.room.players.length > 1 && player.id !== this.currentUser.id;
		},
		async transferOwner(player) {
			this.vibrate('medium');
			if (!this.canTransferTo(player)) {
				this.toast(this.room.players.length <= 1 ? '没有其他人，暂不可转让房主' : '请选择其他玩家');
				return;
			}
			uni.showModal({
				title: '确认转让房主',
				content: `转让给 ${player.nickname} 后，你将失去结算权限。确定继续吗？`,
				confirmText: '确认转让',
				confirmColor: '#2563eb',
				success: async result => {
					if (!result.confirm) return;
					const res = await roomService.transferOwner(this.roomId, player.id);
					if (!res.ok) {
						this.toast(res.message);
						return;
					}
					this.room = res.room;
					this.toast('已转让房主');
				}
			});
		},
		goRecords() {
			this.vibrate('light');
			uni.navigateTo({ url: `/pages/rooms/records?roomId=${this.roomId}` });
		},
		goCalculator() {
			this.vibrate('light');
			if (this.roomBlocked) {
				this.toast(this.riskMessage);
				return;
			}
			uni.setStorageSync('mahjong_pending_room_calc', { roomId: this.roomId });
			uni.switchTab({ url: '/pages/index/index' });
		},
		goFanRecords() {
			this.vibrate('light');
			uni.navigateTo({ url: `/pages/rooms/fan-records?roomId=${this.roomId}` });
		},
		async settleRoom() {
			this.vibrate('heavy');
			if (this.actionBlocked) {
				this.toast(this.riskMessage);
				return;
			}
			if (!this.isOwner) {
				this.toast('只有房主可以结算房间');
				return;
			}
			uni.showModal({
				title: '确认结算',
				content: '结算后房间会进入历史记录，未结算列表中将不再显示。确定结算吗？',
				confirmText: '确认结算',
				confirmColor: '#dc2626',
				success: async result => {
					if (!result.confirm) return;
					const res = await roomService.settleRoom(this.roomId);
					if (!res.ok) {
						this.toast(res.message);
						return;
					}
					this.toast('房间已结算');
					setTimeout(() => {
						uni.switchTab({ url: '/pages/rooms/rooms' });
					}, 600);
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

.room-panel,
.player-card,
.empty-card {
	background: #ffffff;
	border-radius: 16rpx;
	padding: 24rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.06);
}

.room-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20rpx;
}

.title {
	font-size: 40rpx;
	font-weight: 700;
	color: #111827;
}

.subtitle,
.empty-desc {
	font-size: 24rpx;
	color: #6b7280;
	margin-top: 6rpx;
}

.share-btn,
.tool-btn,
.danger-btn,
.mini-btn,
.cancel-btn,
.confirm-btn {
	border-radius: 14rpx;
	font-size: 24rpx;
}

.share-btn {
	height: 64rpx;
	padding: 0 22rpx;
	background: #eff6ff;
	color: #2563eb;
}

.toolbar {
	display: flex;
	flex-wrap: wrap;
	gap: 12rpx;
}

.risk-banner {
	padding: 16rpx 18rpx;
	border-radius: 14rpx;
	background: #fff7ed;
	color: #c2410c;
	font-size: 24rpx;
	margin-bottom: 18rpx;
}

.risk-banner.banned {
	background: #fef2f2;
	color: #dc2626;
}

.tool-btn,
.danger-btn {
	height: 64rpx;
	padding: 0 18rpx;
	background: #f1f5f9;
	color: #334155;
}

.danger-btn {
	background: #fee2e2;
	color: #dc2626;
}

.tool-btn[disabled],
.danger-btn[disabled] {
	background: #e5e7eb;
	color: #94a3b8;
}

.player-card {
	display: flex;
	align-items: center;
	gap: 18rpx;
}

.avatar {
	width: 84rpx;
	height: 84rpx;
	border-radius: 50%;
	background: #e5e7eb;
}

.player-main {
	flex: 1;
	min-width: 0;
}

.name-row {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.nickname {
	font-size: 30rpx;
	font-weight: 700;
	color: #111827;
}

.owner-tag {
	padding: 4rpx 10rpx;
	border-radius: 999rpx;
	background: #fef3c7;
	color: #b45309;
	font-size: 20rpx;
}

.score {
	font-size: 34rpx;
	font-weight: 800;
	margin-top: 6rpx;
}

.score-plus {
	color: #16a34a;
}

.score-minus {
	color: #dc2626;
}

.player-actions {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.mini-btn {
	width: 112rpx;
	height: 52rpx;
	background: #2563eb;
	color: #ffffff;
}

.mini-btn.ghost {
	background: #f1f5f9;
	color: #334155;
}

.mini-btn[disabled] {
	background: #e5e7eb;
	color: #94a3b8;
}

.score-mask {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(15, 23, 42, 0.38);
	display: flex;
	align-items: flex-end;
	z-index: 20;
}

.score-panel {
	width: 100%;
	background: #ffffff;
	border-radius: 28rpx 28rpx 0 0;
	padding: 28rpx;
	box-sizing: border-box;
}

.panel-title {
	font-size: 34rpx;
	font-weight: 700;
	margin-bottom: 20rpx;
}

.score-input {
	height: 76rpx;
	border-radius: 14rpx;
	background: #f8fafc;
	padding: 0 20rpx;
	margin-bottom: 16rpx;
	font-size: 28rpx;
}

.panel-actions {
	display: flex;
	gap: 16rpx;
}

.cancel-btn,
.confirm-btn {
	flex: 1;
	height: 76rpx;
}

.cancel-btn {
	background: #f1f5f9;
	color: #334155;
}

.confirm-btn {
	background: #2563eb;
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
}

button::after {
	border: none;
}
</style>

