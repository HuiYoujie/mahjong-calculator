const STORAGE_KEY = 'mahjong_room_mock_state_v1';

const CURRENT_USER = {
	id: 'u-owner',
	nickname: '我',
	avatar: '/static/logo.png'
};

const DEFAULT_STATE = {
	userRisk: {
		status: 'normal',
		reason: '',
		expiresAt: '',
		counters: {}
	},
	rooms: [
		{
			id: 'room-1001',
			name: '东风局练习房',
			ownerId: 'u-owner',
			status: 'open',
			createdAt: '2026-08-20 14:20',
			players: [
				{ id: 'u-owner', nickname: '我', avatar: '/static/logo.png', score: 12 },
				{ id: 'u-lin', nickname: '林七', avatar: '/static/logo.png', score: -4 },
				{ id: 'u-chen', nickname: '阿澈', avatar: '/static/logo.png', score: -8 }
			],
			fanRecords: [
				{
					id: 'fan-1',
					playerId: 'u-owner',
					playerName: '我',
					totalScore: 24,
					winTile: 'w9',
					fans: [{ name: '清一色', score: 24 }],
					isSelfDrawn: true,
					createdAt: '2026-08-20 14:52'
				}
			],
			shareUnlocked: false,
			records: [
				{ id: 'rec-2', type: 'score', operatorId: 'u-owner', fromId: 'u-owner', toId: 'u-chen', fromName: '我', toName: '阿澈', score: 4, note: '点炮补分', createdAt: '2026-08-20 14:45' },
				{ id: 'rec-1', type: 'score', operatorId: 'u-lin', fromId: 'u-lin', toId: 'u-owner', fromName: '林七', toName: '我', score: 12, note: '自摸清一色', createdAt: '2026-08-20 14:31' }
			]
		}
	],
	history: [
		{
			id: 'room-0908',
			name: '周末四人局',
			settledAt: '2026-08-18 22:18',
			players: [
				{ id: 'u-owner', nickname: '我', score: 18 },
				{ id: 'u-lin', nickname: '林七', score: -6 },
				{ id: 'u-chen', nickname: '阿澈', score: -12 }
			]
		}
	]
};

const RISK_STATUS_TEXT = {
	normal: '',
	warn: '账号存在异常操作提醒，请规范使用房间功能',
	limited: '账号操作过于频繁，部分房间功能已临时限制',
	banned: '账号已被限制使用房间功能'
};

const LIMITED_ACTIONS = ['create_room', 'invite_friend', 'give_score', 'transfer_owner', 'settle_room', 'undo_record', 'unlock_share'];

const RATE_RULES = {
	create_room: { limit: 3, windowMs: 10 * 60 * 1000, reason: '创建房间过于频繁' },
	invite_friend: { limit: 8, windowMs: 60 * 1000, reason: '邀请操作过于频繁' },
	give_score: { limit: 20, windowMs: 5 * 60 * 1000, reason: '给分操作过于频繁' },
	transfer_owner: { limit: 3, windowMs: 10 * 60 * 1000, reason: '房主转让过于频繁' },
	settle_room: { limit: 5, windowMs: 10 * 60 * 1000, reason: '结算操作过于频繁' },
	undo_record: { limit: 5, windowMs: 10 * 60 * 1000, reason: '撤销操作过于频繁' },
	save_fan_record: { limit: 30, windowMs: 10 * 60 * 1000, reason: '算番记录保存过于频繁' },
	unlock_share: { limit: 5, windowMs: 60 * 60 * 1000, reason: '分享解锁过于频繁' }
};

const SENSITIVE_WORDS = ['广告', '加群', '代打', '外挂', '返利'];

function clone(data) {
	return JSON.parse(JSON.stringify(data));
}

function nowText() {
	const now = new Date();
	const pad = value => String(value).padStart(2, '0');
	return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function getStorageSync(key) {
	try {
		return uni.getStorageSync(key);
	} catch (error) {
		return null;
	}
}

function setStorageSync(key, value) {
	try {
		uni.setStorageSync(key, value);
	} catch (error) {}
}

function loadState() {
	const saved = getStorageSync(STORAGE_KEY);
	if (saved && saved.rooms && saved.history) {
		if (!saved.userRisk) saved.userRisk = clone(DEFAULT_STATE.userRisk);
		if (!saved.userRisk.counters) saved.userRisk.counters = {};
		return saved;
	}
	const initial = clone(DEFAULT_STATE);
	setStorageSync(STORAGE_KEY, initial);
	return initial;
}

function saveState(state) {
	setStorageSync(STORAGE_KEY, state);
}

function delay(result) {
	return new Promise(resolve => {
		setTimeout(() => resolve(clone(result)), 120);
	});
}

function getOpenRooms(state) {
	return state.rooms.filter(room => room.status === 'open');
}

function getMyOpenRooms(state) {
	return getOpenRooms(state).filter(room => room.players.some(player => player.id === CURRENT_USER.id));
}

function getRisk(state) {
	if (!state.userRisk) state.userRisk = clone(DEFAULT_STATE.userRisk);
	if (!state.userRisk.counters) state.userRisk.counters = {};
	if (state.userRisk.expiresAt) {
		const expires = new Date(state.userRisk.expiresAt).getTime();
		if (Number.isFinite(expires) && expires <= Date.now()) {
			state.userRisk.status = 'normal';
			state.userRisk.reason = '';
			state.userRisk.expiresAt = '';
		}
	}
	return state.userRisk;
}

function riskPayload(state) {
	const risk = getRisk(state);
	return {
		status: risk.status,
		reason: risk.reason,
		expiresAt: risk.expiresAt,
		message: risk.reason || RISK_STATUS_TEXT[risk.status] || ''
	};
}

function limitUser(state, reason, minutes = 30) {
	const risk = getRisk(state);
	const expires = new Date(Date.now() + minutes * 60 * 1000);
	risk.status = 'limited';
	risk.reason = reason;
	risk.expiresAt = expires.toISOString();
}

function assertUserCan(state, action) {
	const risk = getRisk(state);
	if (risk.status === 'banned') {
		return { ok: false, message: risk.reason || RISK_STATUS_TEXT.banned, userRisk: riskPayload(state) };
	}
	if (risk.status === 'limited' && LIMITED_ACTIONS.includes(action)) {
		return { ok: false, message: risk.reason || RISK_STATUS_TEXT.limited, userRisk: riskPayload(state) };
	}
	return { ok: true };
}

function recordAction(state, action) {
	const rule = RATE_RULES[action];
	if (!rule) return { ok: true };

	const risk = getRisk(state);
	const now = Date.now();
	const current = Array.isArray(risk.counters[action]) ? risk.counters[action] : [];
	const recent = current.filter(time => now - time < rule.windowMs);
	recent.push(now);
	risk.counters[action] = recent;

	if (recent.length > rule.limit) {
		limitUser(state, rule.reason);
		return { ok: false, message: `${rule.reason}，请稍后再试`, userRisk: riskPayload(state) };
	}
	return { ok: true };
}

function containsSensitiveText(text) {
	if (!text) return false;
	return SENSITIVE_WORDS.some(word => String(text).includes(word));
}

function assertRoom(room) {
	if (!room) {
		return { ok: false, message: '房间不存在或已结算' };
	}
	return { ok: true };
}

function canUndoLatest(room, record) {
	if (!room || !record) return false;
	return room.ownerId === CURRENT_USER.id || (record.operatorId || record.fromId) === CURRENT_USER.id;
}

function ensureRoomCollections(room) {
	if (!room.records) room.records = [];
	if (!room.fanRecords) room.fanRecords = [];
	if (typeof room.shareUnlocked !== 'boolean') room.shareUnlocked = false;
}

function buildFanStats(room) {
	const records = room.fanRecords || [];
	const fanCountMap = {};
	const playerMap = {};
	let topRecord = null;

	for (const record of records) {
		if (!topRecord || record.totalScore > topRecord.totalScore) {
			topRecord = record;
		}
		for (const fan of record.fans || []) {
			fanCountMap[fan.name] = (fanCountMap[fan.name] || 0) + 1;
		}
		if (!playerMap[record.playerId]) {
			playerMap[record.playerId] = {
				playerId: record.playerId,
				playerName: record.playerName,
				count: 0,
				totalScore: 0,
				bestScore: 0
			};
		}
		playerMap[record.playerId].count += 1;
		playerMap[record.playerId].totalScore += record.totalScore;
		playerMap[record.playerId].bestScore = Math.max(playerMap[record.playerId].bestScore, record.totalScore);
	}

	const commonFans = Object.entries(fanCountMap)
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count)
		.slice(0, 5);
	const playerStats = Object.values(playerMap).sort((a, b) => {
		if (b.count !== a.count) return b.count - a.count;
		return b.totalScore - a.totalScore;
	});

	return {
		totalCount: records.length,
		topRecord,
		commonFans,
		playerStats
	};
}

export const roomMockApi = {
	currentUser: CURRENT_USER,
	limits: {
		maxPlayersPerRoom: 10,
		maxJoinedRooms: 5
	},

	async getLobby() {
		const state = loadState();
		getRisk(state);
		saveState(state);
		return delay({
			currentUser: CURRENT_USER,
			rooms: getMyOpenRooms(state),
			joinedCount: getMyOpenRooms(state).length,
			maxJoinedRooms: this.limits.maxJoinedRooms,
			userRisk: riskPayload(state)
		});
	},

	async createRoom() {
		const state = loadState();
		const access = assertUserCan(state, 'create_room');
		if (!access.ok) return delay(access);
		const rate = recordAction(state, 'create_room');
		if (!rate.ok) {
			saveState(state);
			return delay(rate);
		}
		const joinedRooms = getMyOpenRooms(state);
		if (joinedRooms.length >= this.limits.maxJoinedRooms) {
			return delay({ ok: false, message: '最多只能加入 5 个未结算房间' });
		}

		const room = {
			id: `room-${Date.now()}`,
			name: `麻将房 ${joinedRooms.length + 1}`,
			ownerId: CURRENT_USER.id,
			status: 'open',
			createdAt: nowText(),
			players: [{ ...CURRENT_USER, score: 0 }],
			fanRecords: [],
			shareUnlocked: false,
			records: []
		};
		state.rooms.unshift(room);
		saveState(state);
		return delay({ ok: true, room });
	},

	async getRoom(roomId) {
		const state = loadState();
		const room = getOpenRooms(state).find(item => item.id === roomId);
		if (room) {
			ensureRoomCollections(room);
			saveState(state);
		}
		return delay({ ...assertRoom(room), room, userRisk: riskPayload(state) });
	},

	async inviteMockFriend(roomId) {
		const state = loadState();
		const access = assertUserCan(state, 'invite_friend');
		if (!access.ok) return delay(access);
		const rate = recordAction(state, 'invite_friend');
		if (!rate.ok) {
			saveState(state);
			return delay(rate);
		}
		const room = getOpenRooms(state).find(item => item.id === roomId);
		const check = assertRoom(room);
		if (!check.ok) return delay(check);
		if (room.players.length >= this.limits.maxPlayersPerRoom) {
			return delay({ ok: false, message: '房间最多 10 人' });
		}
		const id = `u-${Date.now()}`;
		const friendNo = room.players.length + 1;
		room.players.push({
			id,
			nickname: `好友${friendNo}`,
			avatar: '/static/logo.png',
			score: 0
		});
		saveState(state);
		return delay({ ok: true, room });
	},

	async giveScore(roomId, targetId, score, note = '') {
		const state = loadState();
		const access = assertUserCan(state, 'give_score');
		if (!access.ok) return delay(access);
		const rate = recordAction(state, 'give_score');
		if (!rate.ok) {
			saveState(state);
			return delay(rate);
		}
		const room = getOpenRooms(state).find(item => item.id === roomId);
		const check = assertRoom(room);
		if (!check.ok) return delay(check);

		const value = Number(score);
		if (!Number.isFinite(value) || value <= 0) {
			return delay({ ok: false, message: '请输入大于 0 的分数' });
		}
		if (targetId === CURRENT_USER.id) {
			return delay({ ok: false, message: '不能给自己加分' });
		}
		if (containsSensitiveText(note)) {
			limitUser(state, '备注包含异常内容，房间功能已临时限制');
			saveState(state);
			return delay({ ok: false, message: '备注包含异常内容，请修改后再试', userRisk: riskPayload(state) });
		}

		const target = room.players.find(player => player.id === targetId);
		const giver = room.players.find(player => player.id === CURRENT_USER.id);
		if (!target || !giver) {
			return delay({ ok: false, message: '玩家不存在' });
		}

		target.score += value;
		giver.score -= value;
		room.records.unshift({
			id: `rec-${Date.now()}`,
			type: 'score',
			operatorId: CURRENT_USER.id,
			fromId: CURRENT_USER.id,
			toId: target.id,
			fromName: CURRENT_USER.nickname,
			toName: target.nickname,
			score: value,
			note,
			createdAt: nowText()
		});
		saveState(state);
		return delay({ ok: true, room });
	},

	async transferOwner(roomId, targetId) {
		const state = loadState();
		const access = assertUserCan(state, 'transfer_owner');
		if (!access.ok) return delay(access);
		const rate = recordAction(state, 'transfer_owner');
		if (!rate.ok) {
			saveState(state);
			return delay(rate);
		}
		const room = getOpenRooms(state).find(item => item.id === roomId);
		const check = assertRoom(room);
		if (!check.ok) return delay(check);
		if (room.ownerId !== CURRENT_USER.id) {
			return delay({ ok: false, message: '只有房主可以转让房主' });
		}
		if (room.players.length <= 1) {
			return delay({ ok: false, message: '没有其他人，暂不可转让房主' });
		}
		if (targetId === CURRENT_USER.id) {
			return delay({ ok: false, message: '请选择其他玩家' });
		}
		const target = room.players.find(player => player.id === targetId);
		if (!target) {
			return delay({ ok: false, message: '玩家不存在' });
		}
		const previousOwner = room.players.find(player => player.id === room.ownerId);
		if (!previousOwner) {
			return delay({ ok: false, message: '当前房主不存在，无法转让' });
		}
		room.ownerId = target.id;
		room.records.unshift({
			id: `rec-${Date.now()}`,
			type: 'transfer-owner',
			operatorId: CURRENT_USER.id,
			previousOwnerId: previousOwner.id,
			previousOwnerName: previousOwner.nickname,
			fromId: CURRENT_USER.id,
			toId: target.id,
			fromName: CURRENT_USER.nickname,
			toName: target.nickname,
			score: 0,
			note: '转让房主',
			createdAt: nowText()
		});
		saveState(state);
		return delay({ ok: true, room });
	},

	async settleRoom(roomId) {
		const state = loadState();
		const access = assertUserCan(state, 'settle_room');
		if (!access.ok) return delay(access);
		const rate = recordAction(state, 'settle_room');
		if (!rate.ok) {
			saveState(state);
			return delay(rate);
		}
		const roomIndex = state.rooms.findIndex(item => item.id === roomId && item.status === 'open');
		const room = state.rooms[roomIndex];
		const check = assertRoom(room);
		if (!check.ok) return delay(check);
		ensureRoomCollections(room);
		if (room.ownerId !== CURRENT_USER.id) {
			return delay({ ok: false, message: '只有房主可以结算房间' });
		}
		const settledRoom = {
			id: room.id,
			name: room.name,
			settledAt: nowText(),
			players: room.players.map(player => ({
				id: player.id,
				nickname: player.nickname,
				score: player.score
			})),
			fanRecords: room.fanRecords,
			shareUnlocked: room.shareUnlocked
		};
		state.rooms.splice(roomIndex, 1);
		state.history.unshift(settledRoom);
		saveState(state);
		return delay({ ok: true, room: settledRoom });
	},

	async getRecords(roomId) {
		const state = loadState();
		const room = state.rooms.find(item => item.id === roomId) || state.history.find(item => item.id === roomId);
		if (!room) return delay({ ok: false, message: '房间不存在', records: [] });
		const records = room.records || [];
		return delay({
			ok: true,
			roomName: room.name,
			records,
			canUndoLatest: canUndoLatest(room, records[0]),
			latestRecordId: records[0]?.id || '',
			userRisk: riskPayload(state)
		});
	},

	async undoLatestRecord(roomId) {
		const state = loadState();
		const access = assertUserCan(state, 'undo_record');
		if (!access.ok) return delay(access);
		const rate = recordAction(state, 'undo_record');
		if (!rate.ok) {
			saveState(state);
			return delay(rate);
		}
		const room = getOpenRooms(state).find(item => item.id === roomId);
		const check = assertRoom(room);
		if (!check.ok) return delay(check);
		const record = room.records[0];
		if (!record) {
			return delay({ ok: false, message: '暂无可撤销记录' });
		}
		if (!canUndoLatest(room, record)) {
			return delay({ ok: false, message: '仅房主或操作者可撤销最近一条记录' });
		}

		if ((record.type || 'score') === 'score') {
			const fromPlayer = room.players.find(player => player.id === record.fromId);
			const toPlayer = room.players.find(player => player.id === record.toId);
			if (!fromPlayer || !toPlayer) {
				return delay({ ok: false, message: '记录关联玩家不存在，无法撤销' });
			}
			fromPlayer.score += record.score;
			toPlayer.score -= record.score;
		} else if (record.type === 'transfer-owner') {
			const previousOwnerId = record.previousOwnerId || record.fromId;
			const previousOwner = room.players.find(player => player.id === previousOwnerId);
			if (!previousOwner) {
				return delay({ ok: false, message: '原房主已不在房间，无法撤销' });
			}
			room.ownerId = previousOwner.id;
		}

		room.records.shift();
		saveState(state);
		return delay({ ok: true, room, message: '已撤销最近一条记录' });
	},

	async saveFanRecord(roomId, record) {
		const state = loadState();
		const access = assertUserCan(state, 'save_fan_record');
		if (!access.ok) return delay(access);
		const rate = recordAction(state, 'save_fan_record');
		if (!rate.ok) {
			saveState(state);
			return delay(rate);
		}
		const room = getOpenRooms(state).find(item => item.id === roomId);
		const check = assertRoom(room);
		if (!check.ok) return delay(check);
		ensureRoomCollections(room);

		const totalScore = Number(record.totalScore);
		if (!Number.isFinite(totalScore) || totalScore <= 0) {
			return delay({ ok: false, message: '没有可保存的算番结果' });
		}

		const player = room.players.find(item => item.id === CURRENT_USER.id) || CURRENT_USER;
		const fanRecord = {
			id: `fan-${Date.now()}`,
			playerId: player.id,
			playerName: player.nickname,
			totalScore,
			winTile: record.winTile,
			fans: record.fans || [],
			isSelfDrawn: !!record.isSelfDrawn,
			createdAt: nowText()
		};
		room.fanRecords.unshift(fanRecord);
		saveState(state);
		return delay({ ok: true, record: fanRecord, stats: buildFanStats(room) });
	},

	async getFanRecords(roomId) {
		const state = loadState();
		const room = state.rooms.find(item => item.id === roomId) || state.history.find(item => item.id === roomId);
		if (!room) {
			return delay({ ok: false, message: '房间不存在', records: [], stats: buildFanStats({ fanRecords: [] }) });
		}
		ensureRoomCollections(room);
		saveState(state);
		return delay({
			ok: true,
			roomName: room.name,
			records: room.fanRecords,
			stats: buildFanStats(room),
			shareUnlocked: !!room.shareUnlocked,
			userRisk: riskPayload(state)
		});
	},

	async unlockFanShare(roomId) {
		const state = loadState();
		const access = assertUserCan(state, 'unlock_share');
		if (!access.ok) return delay(access);
		const rate = recordAction(state, 'unlock_share');
		if (!rate.ok) {
			saveState(state);
			return delay(rate);
		}
		const room = state.rooms.find(item => item.id === roomId) || state.history.find(item => item.id === roomId);
		if (!room) return delay({ ok: false, message: '房间不存在' });
		ensureRoomCollections(room);
		room.shareUnlocked = true;
		saveState(state);
		return delay({ ok: true, shareUnlocked: true });
	},

	async getHistory() {
		const state = loadState();
		return delay({ ok: true, history: state.history, userRisk: riskPayload(state) });
	},

	async setMockUserRisk(status = 'normal', reason = '') {
		const state = loadState();
		const risk = getRisk(state);
		risk.status = status;
		risk.reason = reason;
		risk.expiresAt = status === 'normal' ? '' : new Date(Date.now() + 30 * 60 * 1000).toISOString();
		if (status === 'banned') risk.expiresAt = '';
		saveState(state);
		return delay({ ok: true, userRisk: riskPayload(state) });
	}
};
