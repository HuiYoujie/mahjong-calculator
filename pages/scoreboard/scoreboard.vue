<template>
	<view class="page">
		<view class="header-card">
			<view>
				<text class="title">麻将计分板</text>
				<text class="subtitle">纯前端本地保存 · 每局分数和为 0</text>
			</view>
			<button class="ghost-btn" @click="resetGame">新牌局</button>
		</view>

		<view class="players-grid">
			<view v-for="player in players" :key="player.id" class="player-card" :class="player.id === dealerId ? 'dealer-card' : ''">
				<view class="player-top">
					<input v-model="player.name" class="player-name" maxlength="8" @blur="persist" />
					<text v-if="player.id === dealerId" class="dealer-badge">庄</text>
				</view>
				<text class="player-score">{{ player.score }}</text>
				<button class="dealer-btn" @click="setDealer(player.id)">{{ player.id === dealerId ? '当前庄家' : '设为庄家' }}</button>
			</view>
		</view>

		<view class="panel">
			<view class="panel-title-row">
				<text class="panel-title">本局结算</text>
				<text class="balance" :class="roundTotal === 0 ? 'balance-ok' : 'balance-error'">合计 {{ signed(roundTotal) }}</text>
			</view>
			<view class="round-grid">
				<view v-for="player in players" :key="`round-${player.id}`" class="round-item">
					<text class="round-name">{{ player.name }}</text>
					<input v-model.number="roundChanges[player.id]" type="number" class="score-input" placeholder="0" />
				</view>
			</view>
			<view class="quick-row">
				<button v-for="amount in quickAmounts" :key="amount" class="quick-btn" @click="fillQuick(amount)">±{{ amount }}</button>
			</view>
			<input v-model="roundNote" class="note-input" placeholder="备注，例如：东一局 · 自摸" maxlength="40" />
			<button class="submit-btn" :disabled="roundTotal !== 0 || !hasRoundChange" @click="submitRound">记录本局</button>
		</view>

		<view class="panel">
			<view class="panel-title-row">
				<text class="panel-title">牌局状态</text>
				<text class="round-count">已打 {{ rounds.length }} 局</text>
			</view>
			<view class="status-row">
				<view class="status-item">
					<text class="status-label">连庄</text>
					<view class="stepper">
						<button class="step-btn" @click="dealerStreak = Math.max(0, dealerStreak - 1); persist()">-</button>
						<text class="step-value">{{ dealerStreak }}</text>
						<button class="step-btn" @click="dealerStreak += 1; persist()">+</button>
					</view>
				</view>
				<view class="status-item">
					<text class="status-label">本场</text>
					<text class="status-value">{{ gameTitle }}</text>
				</view>
			</view>
		</view>

		<view class="panel history-panel">
			<view class="panel-title-row">
				<text class="panel-title">历史记录</text>
				<button v-if="rounds.length" class="undo-btn" @click="undoLastRound">撤销上一局</button>
			</view>
			<view v-if="!rounds.length" class="empty">还没有计分记录</view>
			<view v-for="(round, index) in reversedRounds" :key="round.id" class="history-item">
				<view class="history-head">
					<text class="history-title">第 {{ rounds.length - index }} 局</text>
					<text class="history-time">{{ formatTime(round.createdAt) }}</text>
				</view>
				<text v-if="round.note" class="history-note">{{ round.note }}</text>
				<view class="history-scores">
					<text v-for="change in round.changes" :key="change.playerId" class="history-score" :class="change.value >= 0 ? 'positive' : 'negative'">
						{{ playerName(change.playerId) }} {{ signed(change.value) }}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const STORAGE_KEY = 'mahjong.scoreboard.v1';

	function createPlayers(initialScore = 0) {
		return ['东', '南', '西', '北'].map((name, index) => ({ id: `p${index + 1}`, name, score: initialScore }));
	}

	export default {
		data() {
			return {
				gameTitle: '当前牌局',
				players: createPlayers(0),
				dealerId: 'p1',
				dealerStreak: 0,
				rounds: [],
				roundChanges: { p1: 0, p2: 0, p3: 0, p4: 0 },
				roundNote: '',
				quickAmounts: [1, 2, 4, 8, 16]
			};
		},
		onLoad() {
			this.restore();
		},
		computed: {
			roundTotal() {
				return this.players.reduce((total, player) => total + Number(this.roundChanges[player.id] || 0), 0);
			},
			hasRoundChange() {
				return this.players.some(player => Number(this.roundChanges[player.id] || 0) !== 0);
			},
			reversedRounds() {
				return [...this.rounds].reverse();
			}
		},
		methods: {
			restore() {
				const saved = uni.getStorageSync(STORAGE_KEY);
				if (!saved) return;
				try {
					const state = typeof saved === 'string' ? JSON.parse(saved) : saved;
					this.gameTitle = state.gameTitle || this.gameTitle;
					this.players = Array.isArray(state.players) && state.players.length === 4 ? state.players : this.players;
					this.dealerId = state.dealerId || 'p1';
					this.dealerStreak = Number(state.dealerStreak || 0);
					this.rounds = Array.isArray(state.rounds) ? state.rounds : [];
				} catch (error) {
					console.warn('scoreboard restore failed', error);
				}
			},
			persist() {
				uni.setStorageSync(STORAGE_KEY, {
					gameTitle: this.gameTitle,
					players: this.players,
					dealerId: this.dealerId,
					dealerStreak: this.dealerStreak,
					rounds: this.rounds
				});
			},
			setDealer(playerId) {
				if (this.dealerId !== playerId) this.dealerStreak = 0;
				this.dealerId = playerId;
				this.persist();
			},
			fillQuick(amount) {
				const first = this.players[0].id;
				const others = this.players.slice(1).map(player => player.id);
				this.roundChanges[first] = amount * others.length;
				others.forEach(id => { this.roundChanges[id] = -amount; });
			},
			submitRound() {
				if (this.roundTotal !== 0 || !this.hasRoundChange) return;
				const changes = this.players.map(player => ({
					playerId: player.id,
					value: Number(this.roundChanges[player.id] || 0)
				}));
				changes.forEach(change => {
					const player = this.players.find(item => item.id === change.playerId);
					if (player) player.score += change.value;
				});
				this.rounds.push({ id: `${Date.now()}-${Math.random()}`, createdAt: Date.now(), changes, note: this.roundNote.trim() });
				this.roundChanges = { p1: 0, p2: 0, p3: 0, p4: 0 };
				this.roundNote = '';
				this.persist();
				uni.showToast({ title: '已记录', icon: 'success' });
			},
			undoLastRound() {
				if (!this.rounds.length) return;
				const round = this.rounds.pop();
				round.changes.forEach(change => {
					const player = this.players.find(item => item.id === change.playerId);
					if (player) player.score -= change.value;
				});
				this.persist();
			},
			resetGame() {
				uni.showModal({
					title: '新建牌局',
					content: '将清空当前分数与历史记录，是否继续？',
					success: ({ confirm }) => {
						if (!confirm) return;
						this.players = createPlayers(0);
						this.dealerId = 'p1';
						this.dealerStreak = 0;
						this.rounds = [];
						this.roundChanges = { p1: 0, p2: 0, p3: 0, p4: 0 };
						this.roundNote = '';
						this.persist();
					}
				});
			},
			playerName(playerId) {
				return this.players.find(player => player.id === playerId)?.name || '';
			},
			signed(value) {
				const number = Number(value || 0);
				return number > 0 ? `+${number}` : `${number}`;
			},
			formatTime(timestamp) {
				const date = new Date(timestamp);
				const pad = value => String(value).padStart(2, '0');
				return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
			}
		}
	};
</script>

<style lang="scss">
	.page { min-height: 100vh; box-sizing: border-box; padding: 24rpx; background: #f5f7fa; color: #1f2937; }
	.header-card, .panel { background: #fff; border-radius: 22rpx; padding: 22rpx; margin-bottom: 18rpx; }
	.header-card, .panel-title-row, .player-top, .status-row, .stepper, .history-head, .history-scores { display: flex; align-items: center; }
	.header-card, .panel-title-row, .history-head { justify-content: space-between; }
	.title { display: block; font-size: 38rpx; font-weight: 800; }
	.subtitle { display: block; margin-top: 6rpx; color: #8a94a3; font-size: 24rpx; }
	.ghost-btn, .dealer-btn, .quick-btn, .undo-btn, .step-btn { margin: 0; background: #fff; border: 2rpx solid #dbe1e8; }
	.ghost-btn { font-size: 24rpx; }
	.players-grid, .round-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14rpx; margin-bottom: 18rpx; }
	.player-card { background: #fff; border: 2rpx solid #e7ebf0; border-radius: 20rpx; padding: 18rpx; }
	.dealer-card { border-color: #f59e0b; }
	.player-top { justify-content: space-between; }
	.player-name { width: 170rpx; font-size: 30rpx; font-weight: 700; }
	.dealer-badge { padding: 4rpx 10rpx; border-radius: 999rpx; background: #fff7ed; color: #d97706; font-size: 22rpx; }
	.player-score { display: block; margin: 22rpx 0; text-align: center; font-size: 52rpx; font-weight: 800; font-variant-numeric: tabular-nums; }
	.dealer-btn { width: 100%; font-size: 22rpx; color: #6b7280; }
	.panel-title { font-size: 30rpx; font-weight: 700; }
	.balance, .round-count { font-size: 24rpx; }
	.balance-ok { color: #16a34a; }
	.balance-error { color: #dc2626; }
	.round-grid { margin-top: 18rpx; }
	.round-item { padding: 12rpx; border-radius: 14rpx; background: #f8fafc; }
	.round-name { display: block; margin-bottom: 8rpx; font-size: 24rpx; color: #64748b; }
	.score-input { height: 66rpx; padding: 0 14rpx; border-radius: 12rpx; background: #fff; border: 2rpx solid #e2e8f0; font-size: 30rpx; }
	.quick-row { display: flex; gap: 10rpx; margin-bottom: 14rpx; }
	.quick-btn { flex: 1; padding: 0; font-size: 22rpx; }
	.note-input { height: 72rpx; padding: 0 18rpx; border-radius: 14rpx; background: #f8fafc; border: 2rpx solid #e5e7eb; }
	.submit-btn { margin-top: 16rpx; background: #2563eb; color: #fff; }
	.submit-btn[disabled] { opacity: .35; }
	.status-row { gap: 16rpx; margin-top: 18rpx; }
	.status-item { flex: 1; min-height: 110rpx; padding: 16rpx; box-sizing: border-box; border-radius: 16rpx; background: #f8fafc; }
	.status-label { display: block; margin-bottom: 12rpx; color: #64748b; font-size: 24rpx; }
	.stepper { gap: 12rpx; }
	.step-btn { width: 52rpx; height: 52rpx; padding: 0; line-height: 52rpx; }
	.step-value { min-width: 50rpx; text-align: center; font-size: 30rpx; font-weight: 700; }
	.status-value { font-size: 28rpx; font-weight: 700; }
	.undo-btn { font-size: 22rpx; color: #dc2626; }
	.empty { padding: 34rpx 0 14rpx; text-align: center; color: #9ca3af; }
	.history-item { padding: 18rpx 0; border-bottom: 2rpx solid #eef2f6; }
	.history-item:last-child { border-bottom: none; }
	.history-title { font-weight: 700; }
	.history-time { color: #9ca3af; font-size: 22rpx; }
	.history-note { display: block; margin-top: 8rpx; color: #6b7280; font-size: 24rpx; }
	.history-scores { flex-wrap: wrap; gap: 10rpx 16rpx; margin-top: 10rpx; }
	.history-score { font-size: 24rpx; }
	.positive { color: #16a34a; }
	.negative { color: #dc2626; }
	button::after { border: none; }
</style>
