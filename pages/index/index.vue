<template>
	<view class="app">
		<view v-if="toast.show" class="toast" :class="toast.type === 'error' ? 'toast-error' : 'toast-success'">{{ toast.message }}</view>

		<view class="custom-header">
			<view class="title-wrap" @click="editTitle">
				<text class="page-title">{{ pageTitle }}</text><text class="edit-mark">✎</text>
			</view>
			<view class="header-actions">
				<button class="icon-btn" @click="openCamera">📷</button>
				<button class="scoreboard-btn" @click="openScoreboard">计分板</button>
			</view>
		</view>

		<main class="main">
			<section class="tile-section">
				<view class="tile-row" v-for="row in tileRows" :key="row.key">
					<view class="tile-row-inner">
						<button v-for="tile in row.tiles" :key="tile" @click="toggleTile(tile)" class="tile-btn" :class="getTileCount(tile) < 4 ? 'tile-btn-active' : 'tile-btn-inactive'">
							<image :src="getTileSvgPath(tile)" class="tile-icon" mode="aspectFit" />
						</button>
					</view>
				</view>
			</section>

			<section class="options-section">
				<view class="mode-row">
					<button v-for="mode in modes" :key="mode.value" @click="currentMode = mode.value" class="mode-btn" :class="currentMode === mode.value ? `mode-${mode.value}-active` : 'mode-inactive'">{{ mode.label }}</button>
					<button @click="resetAll" class="reset-btn">重置</button>
				</view>
				<view class="settings-row">
					<view class="wind-row">
						<view class="wind-group" v-for="item in windSettings" :key="item.key">
							<text class="wind-label">{{ item.label }}</text>
							<view class="wind-btns">
								<button v-for="wind in winds" :key="wind.value" @click="options[item.key] = wind.value" class="wind-btn" :class="options[item.key] === wind.value ? 'wind-btn-active' : 'wind-btn-inactive'">{{ wind.label }}</button>
							</view>
						</view>
					</view>
					<view class="flower-row">
						<text class="flower-label">花牌</text>
						<view class="flower-controls">
							<button @click="options.flowerCount = Math.max(0, options.flowerCount - 1)" class="flower-btn">-</button>
							<text class="flower-count">{{ options.flowerCount }}</text>
							<button @click="options.flowerCount = Math.min(8, options.flowerCount + 1)" class="flower-btn">+</button>
						</view>
					</view>
				</view>
				<checkbox-group @change="checkboxChange" class="checkbox-row">
					<label class="checkbox-label" v-for="option in visibleCheckboxOptions" :key="option.key">
						<checkbox :value="option.key" :checked="options[option.key]" class="checkbox-input" />
						<text class="checkbox-text">{{ option.label }}</text>
					</label>
				</checkbox-group>
			</section>

			<section class="selected-section">
				<view v-if="concealedTiles.length" class="concealed-inner">
					<view v-for="(tile, index) in sortedConcealedTiles" :key="`c-${index}`" @click="removeTile(tile, 'concealed')" class="concealed-tile">
						<image :src="getTileSvgPath(tile)" class="concealed-icon" mode="aspectFit" />
					</view>
				</view>
				<view v-if="meldGroups.length" class="meld-row">
					<view v-for="(group, groupIndex) in sortedMeldGroups" :key="`mg-${groupIndex}`" @click="removeMeld(groupIndex)" class="meld-group" :class="`meld-${group.type}`">
						<view class="meld-tiles">
							<view v-for="(tile, tileIndex) in group.tiles" :key="`mt-${groupIndex}-${tileIndex}`" class="meld-tile"><image :src="getTileSvgPath(tile)" class="meld-icon" mode="aspectFit" /></view>
						</view>
						<text class="meld-label">{{ getMeldTypeText(group.type) }}</text>
					</view>
				</view>
				<text v-if="remainingTiles > 0" class="remaining-title">还可选择 {{ remainingTiles }} 张牌</text>
				<text v-else-if="waitingTiles.length === 0" class="remaining-title">未听牌</text>
			</section>

			<section v-if="waitingTiles.length && !winTile" class="waiting-section">
				<view class="waiting-row">
					<view v-for="wt in waitingTiles" :key="wt.tileId" class="waiting-item" @click="updateWinTile(wt)">
						<text class="waiting-score">{{ wt.totalScore }}番</text>
						<image :src="getTileSvgPath(wt.tileId)" class="waiting-icon" mode="aspectFit" />
					</view>
				</view>
			</section>

			<section v-if="selectedWinTile" class="win-section">
				<view class="win-head" @click="winTile = null"><text class="win-score">{{ selectedWinTile.totalScore }} 番</text><image :src="getTileSvgPath(selectedWinTile.tileId)" class="win-icon" mode="aspectFit" /></view>
				<view class="share-preview">
					<view class="share-tiles"><image v-for="(tile, index) in shareConcealedTiles" :key="`share-c-${index}`" :src="getTileSvgPath(tile)" class="share-tile" mode="aspectFit" /></view>
					<view class="share-melds"><view v-for="(group, index) in sortedMeldGroups" :key="`share-m-${index}`" class="share-meld" :class="`meld-${group.type}`"><image v-for="(tile, tileIndex) in group.tiles" :key="tileIndex" :src="getTileSvgPath(tile)" class="share-tile" mode="aspectFit" /><text>{{ getMeldTypeText(group.type) }}</text></view></view>
					<view v-if="selectedWinTile.fans && selectedWinTile.fans.length" class="share-fans">
						<text class="share-fans-title">番种明细</text>
						<view class="share-fan-list"><text v-for="(fan, index) in selectedWinTile.fans" :key="`fan-${index}`" class="share-fan-item">{{ fan.name }} {{ fan.score }}番</text></view>
					</view>

					<view class="evidence-section">
						<view class="evidence-head"><text class="evidence-title">实拍照片</text><text class="evidence-tip">可选，最多 3 张</text></view>
						<view class="evidence-grid">
							<view v-for="(photo, index) in sharePhotos" :key="photo" class="evidence-photo-wrap">
								<image :src="photo" class="evidence-photo" mode="aspectFill" @click="previewEvidencePhoto(index)" />
								<view class="remove-photo" @click.stop="removeSharePhoto(index)">×</view>
							</view>
							<view v-if="sharePhotos.length < 3" class="add-photo" @click="chooseSharePhotos"><text class="add-photo-plus">＋</text><text>补充照片</text></view>
						</view>
					</view>

					<view class="share-actions"><button class="share-image-btn" :loading="shareImageGenerating" @click="generateShareImage(true)">生成分享图</button><button v-if="shareImagePath" class="save-image-btn" @click="saveShareImage">保存图片</button></view>
				</view>
			</section>
		</main>

		<canvas canvas-id="shareCanvas" id="shareCanvas" class="share-canvas" :style="`width:${shareCanvasWidth}px;height:${shareCanvasHeight}px;`" />

		<view v-if="cameraEditorVisible" class="modal-mask" @click.self="closeCameraEditor">
			<view class="camera-modal">
				<view class="modal-header"><text class="modal-title">拍照录入</text><text class="modal-close" @click="closeCameraEditor">×</text></view>
				<image v-if="capturedImage" :src="capturedImage" class="captured-image" mode="aspectFit" />
				<text class="camera-tip">当前为纯前端辅助录入：请根据照片点击下方牌面修正。后续可在 recognizePhoto 中接入本地模型。</text>
				<view class="editor-summary"><text>手牌 {{ draftConcealedTiles.length }} 张</text><text>副露 {{ draftMeldGroups.length }} 组</text></view>
				<view class="draft-tiles"><image v-for="(tile, index) in draftConcealedTiles" :key="index" :src="getTileSvgPath(tile)" class="draft-tile" mode="aspectFit" @click="draftConcealedTiles.splice(index, 1)" /></view>
				<view class="editor-modes"><button v-for="mode in modes" :key="mode.value" class="editor-mode-btn" :class="draftMode === mode.value ? 'editor-mode-active' : ''" @click="draftMode = mode.value">{{ mode.label }}</button></view>
				<scroll-view scroll-y class="editor-palette"><view class="palette-row" v-for="row in tileRows" :key="row.key"><image v-for="tile in row.tiles" :key="tile" :src="getTileSvgPath(tile)" class="palette-tile" mode="aspectFit" @click="addDraftTile(tile)" /></view></scroll-view>
				<view class="modal-actions"><button class="secondary-btn" @click="openCamera">重新拍照</button><button class="primary-btn" @click="applyCameraResult">使用这些牌</button></view>
			</view>
		</view>
	</view>
</template>

<script>
import { TILES } from '@/utils/tiles.js';
import { MahjongAnalyzer } from '@/utils/analyzer.js';

const DEFAULT_TITLE = '国标麻将计番器';

export default {
	data() {
		return {
			pageTitle: DEFAULT_TITLE,
			currentMode: 'concealed',
			concealedTiles: [],
			meldGroups: [],
			winTile: null,
			capturedImage: '',
			cameraEditorVisible: false,
			draftMode: 'concealed',
			draftConcealedTiles: [],
			draftMeldGroups: [],
			sharePhotos: [],
			shareImagePath: '',
			shareImageGenerating: false,
			shareCanvasWidth: 690,
			shareCanvasHeight: 420,
			toast: { show: false, message: '', type: 'error' },
			options: { seatWind: 'east', prevalentWind: 'east', flowerCount: 0, isSelfDrawn: false, isHaidilao: false, isMiaoshou: false, isJuezhang: false, isGangshang: false, isQianggang: false }
		};
	},
	onLoad() { this.pageTitle = uni.getStorageSync('mahjong.pageTitle') || DEFAULT_TITLE; },
	onShareAppMessage() { const score = this.selectedWinTile ? ` · ${this.selectedWinTile.totalScore}番` : ''; const payload = { title: `${this.pageTitle}${score}`, path: '/pages/index/index' }; if (this.shareImagePath) payload.imageUrl = this.shareImagePath; return payload; },
	onShareTimeline() { const payload = { title: this.pageTitle, query: '' }; if (this.shareImagePath) payload.imageUrl = this.shareImagePath; return payload; },
	computed: {
		tileRows() { return [{ key: 'w', tiles: Array.from({ length: 9 }, (_, i) => `w${i + 1}`) }, { key: 't', tiles: Array.from({ length: 9 }, (_, i) => `t${i + 1}`) }, { key: 'b', tiles: Array.from({ length: 9 }, (_, i) => `b${i + 1}`) }, { key: 'z', tiles: ['east', 'south', 'west', 'north', 'zhong', 'fa', 'bai'] }]; },
		modes() { return [{ value: 'concealed', label: '手牌' }, { value: 'chi', label: '吃' }, { value: 'pong', label: '碰' }, { value: 'minggang', label: '明杠' }, { value: 'angang', label: '暗杠' }]; },
		winds() { return [{ value: 'east', label: '东' }, { value: 'south', label: '南' }, { value: 'west', label: '西' }, { value: 'north', label: '北' }]; },
		windSettings() { return [{ key: 'seatWind', label: '门风' }, { key: 'prevalentWind', label: '圈风' }]; },
		visibleCheckboxOptions() { const items = [{ key: 'isSelfDrawn', label: '自摸' }, { key: 'isJuezhang', label: '和绝张' }]; if (this.options.isSelfDrawn) items.push({ key: 'isMiaoshou', label: '妙手回春' }, { key: 'isGangshang', label: '杠上开花' }); else items.push({ key: 'isHaidilao', label: '海底捞月' }, { key: 'isQianggang', label: '抢杠和' }); return items; },
		remainingTiles() { return 13 - this.concealedTiles.length - this.meldGroups.length * 3; },
		meldTiles() { return this.meldGroups.flatMap(group => group.tiles); },
		waitingTiles() { const allTiles = [...this.concealedTiles, ...this.meldTiles]; const gangCount = this.meldGroups.filter(g => g.type === 'minggang' || g.type === 'angang').length; if (allTiles.length !== 13 + gangCount) return []; const analyzer = new MahjongAnalyzer(); analyzer.setHand(this.concealedTiles, this.meldGroups, this.winTile?.tileId, this.options); return analyzer.getWaitingTiles(); },
		selectedWinTile() { if (!this.winTile) return null; return this.waitingTiles.find(item => item.tileId === this.winTile.tileId) || this.winTile; },
		shareConcealedTiles() { if (!this.selectedWinTile) return this.sortedConcealedTiles; return [...this.sortedConcealedTiles, this.selectedWinTile.tileId].sort(this.compareTiles); },
		sortedConcealedTiles() { return [...this.concealedTiles].sort(this.compareTiles); },
		sortedMeldGroups() { const order = { chi: 0, pong: 1, minggang: 2, angang: 3 }; return [...this.meldGroups].sort((a, b) => order[a.type] - order[b.type] || this.compareTiles(a.tiles[0], b.tiles[0])); }
	},
	watch: { remainingTiles(value) { if (value > 0) this.winTile = null; }, selectedWinTile() { this.shareImagePath = ''; } },
	methods: {
		compareTiles(a, b) { const order = ['w1','w2','w3','w4','w5','w6','w7','w8','w9','t1','t2','t3','t4','t5','t6','t7','t8','t9','b1','b2','b3','b4','b5','b6','b7','b8','b9','east','south','west','north','zhong','fa','bai']; return order.indexOf(a) - order.indexOf(b); },
		showToast(message, type = 'error') { this.toast = { show: true, message, type }; setTimeout(() => { this.toast.show = false; }, 1800); },
		editTitle() { uni.showModal({ title: '修改标题', editable: true, placeholderText: this.pageTitle, success: ({ confirm, content }) => { if (!confirm) return; this.pageTitle = (content || '').trim() || DEFAULT_TITLE; uni.setStorageSync('mahjong.pageTitle', this.pageTitle); } }); },
		openScoreboard() { uni.navigateTo({ url: '/pages/scoreboard/scoreboard' }); },
		openCamera() { uni.chooseImage({ count: 1, sourceType: ['camera', 'album'], sizeType: ['compressed'], success: ({ tempFilePaths }) => { this.capturedImage = tempFilePaths[0]; this.draftConcealedTiles = [...this.concealedTiles]; this.draftMeldGroups = this.meldGroups.map(group => ({ type: group.type, tiles: [...group.tiles] })); this.recognizePhoto(this.capturedImage); this.cameraEditorVisible = true; } }); },
		recognizePhoto() {},
		closeCameraEditor() { this.cameraEditorVisible = false; },
		addDraftTile(tileId) { if (this.draftMode === 'concealed') { if (this.draftConcealedTiles.length >= 14) return this.showToast('手牌最多 14 张'); this.draftConcealedTiles.push(tileId); return; } const group = this.buildMeld(tileId, this.draftMode, true); if (group) this.draftMeldGroups.push(group); },
		applyCameraResult() { this.concealedTiles = [...this.draftConcealedTiles]; this.meldGroups = this.draftMeldGroups.map(group => ({ type: group.type, tiles: [...group.tiles] })); this.winTile = null; this.shareImagePath = ''; this.cameraEditorVisible = false; this.showToast('牌面已更新', 'success'); },
		checkboxChange(event) { const values = event.detail.value; ['isSelfDrawn','isJuezhang','isMiaoshou','isGangshang','isHaidilao','isQianggang'].forEach(key => { this.options[key] = values.includes(key); }); },
		getTileCount(tileId) { return this.concealedTiles.filter(tile => tile === tileId).length + this.meldTiles.filter(tile => tile === tileId).length; },
		buildMeld(tileId, type, draft = false) { if (type === 'chi') { const tile = TILES[tileId]; if (!tile || tile.type === 'wind' || tile.type === 'dragon') return null; const base = Math.min(tile.value, 7); return { type, tiles: [`${tileId[0]}${base}`, `${tileId[0]}${base + 1}`, `${tileId[0]}${base + 2}`] }; } const count = type === 'pong' ? 3 : 4; if (!draft && this.getTileCount(tileId) + count > 4) return null; return { type, tiles: Array(count).fill(tileId) }; },
		toggleTile(tileId) { if (this.currentMode === 'concealed') { if (this.remainingTiles <= 0 || this.getTileCount(tileId) >= 4) return; this.concealedTiles.push(tileId); this.shareImagePath = ''; return; } if (this.remainingTiles < 3) return this.showToast('剩余牌数不足'); const group = this.buildMeld(tileId, this.currentMode); if (!group) return this.showToast('该组合无法添加'); this.meldGroups.push(group); this.shareImagePath = ''; },
		removeTile(tileId, area) { if (area !== 'concealed') return; const index = this.concealedTiles.indexOf(tileId); if (index >= 0) this.concealedTiles.splice(index, 1); this.shareImagePath = ''; },
		removeMeld(sortedIndex) { const group = this.sortedMeldGroups[sortedIndex]; const index = this.meldGroups.indexOf(group); if (index >= 0) this.meldGroups.splice(index, 1); this.shareImagePath = ''; },
		getTileSvgPath(tileId) { return `/static/image/tile/${tileId}.svg`; },
		getMeldTypeText(type) { return ({ chi: '吃', pong: '碰', minggang: '明杠', angang: '暗杠' })[type] || ''; },
		getMeldColor(type) { return ({ chi: '#3b82f6', pong: '#22c55e', minggang: '#f59e0b', angang: '#8b5cf6' })[type] || '#d1d5db'; },
		updateWinTile(tile) { this.winTile = tile; this.shareImagePath = ''; },
		chooseSharePhotos() { const remaining = 3 - this.sharePhotos.length; if (remaining <= 0) return; uni.chooseImage({ count: remaining, sourceType: ['camera', 'album'], sizeType: ['compressed'], success: ({ tempFilePaths }) => { this.sharePhotos = [...this.sharePhotos, ...tempFilePaths].slice(0, 3); this.shareImagePath = ''; } }); },
		removeSharePhoto(index) { this.sharePhotos.splice(index, 1); this.shareImagePath = ''; },
		previewEvidencePhoto(index) { uni.previewImage({ urls: this.sharePhotos, current: this.sharePhotos[index] }); },
		async generateShareImage(preview = false) {
			if (!this.selectedWinTile || this.shareImageGenerating) return;
			this.shareImageGenerating = true;
			try {
				const width = this.shareCanvasWidth;
				const fans = this.selectedWinTile.fans || [];
				const fanRows = Math.max(1, Math.ceil(fans.length / 3));
				const photoHeight = this.sharePhotos.length ? 190 : 0;
				const height = 270 + this.sortedMeldGroups.length * 72 + fanRows * 36 + photoHeight;
				this.shareCanvasHeight = height;
				await new Promise(resolve => this.$nextTick(resolve));

				const ctx = uni.createCanvasContext('shareCanvas', this);
				ctx.setFillStyle('#ffffff'); ctx.fillRect(0, 0, width, height);
				ctx.setFillStyle('#111827'); ctx.setFontSize(38); ctx.setTextAlign('center'); ctx.fillText(`${this.selectedWinTile.totalScore} 番`, width / 2, 58);

				const tileWidth = 42, tileHeight = 58, tileGap = 3, hand = this.shareConcealedTiles;
				const handWidth = hand.length * tileWidth + Math.max(0, hand.length - 1) * tileGap;
				let x = Math.max(20, (width - handWidth) / 2);
				const handY = 90;
				hand.forEach(tile => { ctx.drawImage(this.getTileSvgPath(tile), x, handY, tileWidth, tileHeight); x += tileWidth + tileGap; });

				let meldY = 180;
				this.sortedMeldGroups.forEach(group => {
					const groupTileWidth = 38, labelWidth = 54, contentWidth = group.tiles.length * groupTileWidth + labelWidth + 26, groupX = (width - contentWidth) / 2;
					ctx.setStrokeStyle(this.getMeldColor(group.type)); ctx.setLineWidth(2); ctx.strokeRect(groupX, meldY, contentWidth, 60);
					let tileX = groupX + 10;
					group.tiles.forEach(tile => { ctx.drawImage(this.getTileSvgPath(tile), tileX, meldY + 4, groupTileWidth, 52); tileX += groupTileWidth; });
					ctx.setFillStyle('#374151'); ctx.setFontSize(20); ctx.setTextAlign('left'); ctx.fillText(this.getMeldTypeText(group.type), tileX + 8, meldY + 37);
					meldY += 72;
				});

				const fanStartY = meldY + 12;
				ctx.setFillStyle('#111827'); ctx.setFontSize(24); ctx.setTextAlign('center'); ctx.fillText('番种明细', width / 2, fanStartY);
				ctx.setFontSize(20);
				fans.forEach((fan, index) => { const col = index % 3, row = Math.floor(index / 3), colWidth = width / 3; ctx.fillText(`${fan.name} ${fan.score}番`, colWidth * col + colWidth / 2, fanStartY + 34 + row * 34); });

				if (this.sharePhotos.length) {
					const photosY = fanStartY + 52 + fanRows * 34;
					ctx.setFillStyle('#111827'); ctx.setFontSize(22); ctx.setTextAlign('left'); ctx.fillText('实拍照片', 24, photosY);
					const gap = 10, photoW = (width - 48 - gap * 2) / 3, photoH = 138;
					this.sharePhotos.forEach((photo, index) => { const photoX = 24 + index * (photoW + gap); ctx.drawImage(photo, photoX, photosY + 14, photoW, photoH); });
				}

				await new Promise((resolve, reject) => {
					ctx.draw(false, () => setTimeout(() => uni.canvasToTempFilePath({ canvasId: 'shareCanvas', width, height, destWidth: width * 2, destHeight: height * 2, fileType: 'png', quality: 1, success: ({ tempFilePath }) => { this.shareImagePath = tempFilePath; resolve(); }, fail: reject }, this), 80));
				});
				if (preview && this.shareImagePath) uni.previewImage({ urls: [this.shareImagePath], current: this.shareImagePath });
			} catch (error) { console.error('generate share image failed', error); this.showToast('分享图生成失败，请重试'); }
			finally { this.shareImageGenerating = false; }
		},
		saveShareImage() { if (!this.shareImagePath) return; uni.saveImageToPhotosAlbum({ filePath: this.shareImagePath, success: () => this.showToast('已保存到相册', 'success'), fail: error => { if (String(error?.errMsg || '').includes('auth deny')) { uni.showModal({ title: '需要相册权限', content: '请在设置中允许保存图片到相册。', confirmText: '去设置', success: ({ confirm }) => { if (confirm) uni.openSetting(); } }); return; } this.showToast('保存失败，请重试'); } }); },
		resetAll() { this.currentMode = 'concealed'; this.concealedTiles = []; this.meldGroups = []; this.winTile = null; this.sharePhotos = []; this.shareImagePath = ''; }
	}
};
</script>

<style lang="scss">
.app{min-height:100vh;background:#f7f8fa;color:#1f2937;padding-bottom:env(safe-area-inset-bottom)}
.custom-header{display:flex;align-items:center;justify-content:space-between;padding:22rpx 28rpx;background:#fff;border-bottom:2rpx solid #eef0f3}
.title-wrap,.header-actions,.mode-row,.settings-row,.wind-group,.wind-btns,.flower-controls,.checkbox-row,.concealed-inner,.meld-row,.meld-tiles,.waiting-row,.win-head,.share-tiles,.share-melds,.share-meld,.share-actions,.editor-summary,.editor-modes,.modal-actions,.evidence-head,.evidence-grid{display:flex;align-items:center}
.page-title{font-size:36rpx;font-weight:700}.edit-mark{margin-left:10rpx;color:#9ca3af}.header-actions{gap:12rpx}
.icon-btn,.scoreboard-btn{margin:0;padding:0 20rpx;height:64rpx;line-height:64rpx;border-radius:14rpx;font-size:28rpx;background:#fff;border:2rpx solid #dbe1e8}.icon-btn{width:64rpx;padding:0}
.main{box-sizing:border-box;padding:18rpx 24rpx 40rpx}.tile-section,.options-section,.selected-section,.waiting-section,.win-section{background:#fff;border-radius:20rpx;padding:18rpx;margin-bottom:18rpx}
.tile-row{margin-bottom:8rpx}.tile-row:last-child{margin-bottom:0}.tile-row-inner{display:flex;justify-content:center;gap:6rpx}.tile-btn{width:64rpx;height:84rpx;padding:0;margin:0;border-radius:12rpx;background:#fff;border:2rpx solid #e5e7eb}.tile-btn-inactive{opacity:.35}.tile-icon{width:58rpx;height:78rpx}
.mode-row{gap:10rpx;flex-wrap:wrap}.mode-btn,.reset-btn{margin:0;padding:0 18rpx;height:60rpx;line-height:60rpx;border-radius:14rpx;background:#fff;font-size:26rpx}.mode-inactive{border:2rpx solid #d1d5db;color:#4b5563}.mode-concealed-active{border:2rpx solid #64748b;color:#334155}.mode-chi-active{border:2rpx solid #3b82f6;color:#2563eb}.mode-pong-active{border:2rpx solid #22c55e;color:#16a34a}.mode-minggang-active{border:2rpx solid #f59e0b;color:#d97706}.mode-angang-active{border:2rpx solid #8b5cf6;color:#7c3aed}.reset-btn{margin-left:auto;border:2rpx solid #ef4444;color:#dc2626}
.settings-row{justify-content:space-between;align-items:flex-start;margin-top:18rpx}.wind-row{flex:1}.wind-group{margin-bottom:10rpx}.wind-label{width:70rpx;font-size:26rpx;color:#6b7280}.wind-btns{gap:6rpx}.wind-btn{width:64rpx;height:52rpx;line-height:52rpx;margin:0;padding:0;font-size:24rpx;border-radius:12rpx}.wind-btn-inactive{background:#fff;border:2rpx solid #e5e7eb}.wind-btn-active{background:#eff6ff;border:2rpx solid #3b82f6;color:#2563eb}.flower-row{min-width:190rpx;text-align:center}.flower-label{display:block;margin-bottom:8rpx;color:#6b7280;font-size:26rpx}.flower-controls{justify-content:center}.flower-btn{width:54rpx;height:54rpx;line-height:54rpx;margin:0;padding:0;border-radius:12rpx;font-size:30rpx}.flower-count{width:60rpx;text-align:center}
.checkbox-row{flex-wrap:wrap;gap:14rpx 22rpx;margin-top:14rpx}.checkbox-label{display:flex;align-items:center}.checkbox-text{margin-left:6rpx;font-size:26rpx}
.concealed-inner{flex-wrap:wrap}.concealed-tile{width:54rpx;height:76rpx}.concealed-icon{width:52rpx;height:72rpx}.meld-row{flex-wrap:wrap;gap:14rpx;margin-top:14rpx}.meld-group{display:flex;align-items:center;padding:8rpx 12rpx;border-radius:14rpx;background:#fff}.meld-chi{border:2rpx solid #3b82f6}.meld-pong{border:2rpx solid #22c55e}.meld-minggang{border:2rpx solid #f59e0b}.meld-angang{border:2rpx solid #8b5cf6}.meld-tile{width:48rpx;height:68rpx}.meld-icon{width:46rpx;height:64rpx}.meld-label{margin-left:10rpx;font-size:25rpx;font-weight:600}.remaining-title{display:block;text-align:center;margin-top:18rpx;color:#6b7280}
.waiting-row{justify-content:center;flex-wrap:wrap;gap:18rpx}.waiting-item{text-align:center}.waiting-score{display:block;font-size:24rpx;color:#6b7280}.waiting-icon{width:64rpx;height:88rpx}.win-head{justify-content:center;gap:14rpx}.win-score{font-size:44rpx;font-weight:800}.win-icon{width:58rpx;height:82rpx}
.share-preview{margin-top:18rpx;padding-top:18rpx;border-top:2rpx dashed #e5e7eb}.share-tiles,.share-melds{flex-wrap:wrap;justify-content:center}.share-tile{width:48rpx;height:68rpx}.share-melds{gap:12rpx;margin-top:10rpx}.share-meld{border-radius:12rpx;padding:6rpx}.share-fans{margin-top:18rpx;padding-top:14rpx;border-top:2rpx dashed #e5e7eb}.share-fans-title{display:block;text-align:center;font-size:26rpx;font-weight:700}.share-fan-list{display:flex;flex-wrap:wrap;justify-content:center;gap:10rpx 18rpx;margin-top:10rpx}.share-fan-item{font-size:24rpx;color:#4b5563}
.evidence-section{margin-top:18rpx;padding-top:14rpx;border-top:2rpx dashed #e5e7eb}.evidence-head{justify-content:space-between}.evidence-title{font-size:26rpx;font-weight:700}.evidence-tip{font-size:22rpx;color:#9ca3af}.evidence-grid{gap:10rpx;margin-top:12rpx;flex-wrap:wrap}.evidence-photo-wrap,.add-photo{width:200rpx;height:150rpx;border-radius:14rpx;overflow:hidden;position:relative}.evidence-photo{width:100%;height:100%}.remove-photo{position:absolute;right:6rpx;top:6rpx;width:42rpx;height:42rpx;line-height:40rpx;text-align:center;border-radius:999rpx;background:rgba(0,0,0,.55);color:#fff;font-size:30rpx}.add-photo{display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box;border:2rpx dashed #cbd5e1;color:#64748b;background:#f8fafc;font-size:24rpx}.add-photo-plus{font-size:42rpx;line-height:1;margin-bottom:8rpx}
.share-actions{gap:12rpx;margin-top:18rpx}.share-image-btn,.save-image-btn{flex:1;margin:0;border-radius:14rpx;font-size:26rpx}.share-image-btn{background:#2563eb;color:#fff}.save-image-btn{background:#fff;border:2rpx solid #2563eb;color:#2563eb}.share-canvas{position:fixed;left:-9999px;top:-9999px;pointer-events:none}
.toast{position:fixed;top:120rpx;left:50%;transform:translateX(-50%);z-index:100;padding:18rpx 28rpx;border-radius:14rpx;color:#fff}.toast-error{background:#ef4444}.toast-success{background:#16a34a}.modal-mask{position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}.camera-modal{width:100%;max-height:92vh;box-sizing:border-box;background:#fff;border-radius:28rpx 28rpx 0 0;padding:24rpx}.modal-header{display:flex;align-items:center;justify-content:space-between}.modal-title{font-size:34rpx;font-weight:700}.modal-close{font-size:48rpx;color:#6b7280}.captured-image{width:100%;height:260rpx;margin-top:12rpx;background:#f3f4f6;border-radius:16rpx}.camera-tip{display:block;margin:12rpx 0;font-size:24rpx;line-height:1.5;color:#6b7280}.editor-summary{justify-content:space-between;font-size:26rpx}.draft-tiles{display:flex;flex-wrap:wrap;min-height:76rpx;margin:12rpx 0;padding:10rpx;background:#f9fafb;border-radius:12rpx}.draft-tile,.palette-tile{width:50rpx;height:70rpx}.editor-modes{gap:8rpx;margin-bottom:10rpx}.editor-mode-btn{flex:1;height:54rpx;line-height:54rpx;margin:0;padding:0;font-size:24rpx;border:2rpx solid #e5e7eb;background:#fff}.editor-mode-active{border-color:#3b82f6;color:#2563eb}.editor-palette{height:300rpx}.palette-row{display:flex;justify-content:center;flex-wrap:wrap;gap:6rpx;margin-bottom:8rpx}.modal-actions{gap:14rpx;margin-top:14rpx}.secondary-btn,.primary-btn{flex:1;margin:0}.secondary-btn{background:#fff;border:2rpx solid #d1d5db}.primary-btn{background:#2563eb;color:#fff}button::after{border:none}
</style>
