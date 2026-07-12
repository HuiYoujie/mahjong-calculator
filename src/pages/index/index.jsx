import React, { useMemo, useState } from 'react';
import { Button, Checkbox, Image, Text, View } from '@tarojs/components';
import { analyzeHand, buildHandPayload, getFallbackWaitingTiles, getWaitingTiles } from '../../utils/scoringAdapter';
import './index.scss';

const TILE_ROWS = [
  ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m'],
  ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s'],
  ['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p'],
  ['E', 'S', 'W', 'N', 'C', 'F', 'P']
];

const MODE_LABELS = { concealed: '立牌', pong: '碰', chi: '吃', minggang: '明杠', angang: '暗杠' };
const WIND_LABELS = { E: '东', S: '南', W: '西', N: '北' };

function getTileSvgPath(tileId) {
  return `/static/image/tile/${tileId}.svg`;
}

function tileCount(tiles, tileId) {
  return tiles.filter(tile => tile === tileId).length;
}

function nextTile(tileId, offset) {
  const suit = tileId[1];
  const value = Number(tileId[0]);
  if (!['m', 's', 'p'].includes(suit) || value + offset > 9) return null;
  return `${value + offset}${suit}`;
}

function getMeldTiles(mode, tileId) {
  if (mode === 'pong') return [tileId, tileId, tileId];
  if (mode === 'minggang' || mode === 'angang') return [tileId, tileId, tileId, tileId];
  if (mode === 'chi') {
    const second = nextTile(tileId, 1);
    const third = nextTile(tileId, 2);
    return second && third ? [tileId, second, third] : null;
  }
  return null;
}

export default function IndexPage() {
  const [currentMode, setCurrentMode] = useState('concealed');
  const [concealedTiles, setConcealedTiles] = useState([]);
  const [meldGroups, setMeldGroups] = useState([]);
  const [winTile, setWinTile] = useState(null);
  const [options, setOptions] = useState({
    seatWind: 'E',
    prevalentWind: 'E',
    flowerCount: 0,
    isSelfDrawn: false,
    isJuezhang: false,
    isHaidilao: false,
    isMiaoshou: false,
    isGangshang: false,
    isQianggang: false
  });

  const meldTiles = useMemo(() => meldGroups.flatMap(group => group.tiles), [meldGroups]);
  // gb-mahjong-js expects the winning tile to be separate from the 13-tile hand.
  // A kong still occupies one meld slot (three structural tiles), even though four
  // physical tiles are displayed and counted for the four-copy limit.
  const remainingTiles = 13 - concealedTiles.length - meldGroups.length * 3;

  function createGbPayload(winningTile = null) {
    return buildHandPayload({
      tiles: concealedTiles,
      packs: meldGroups,
      winningTile,
      flowers: options.flowerCount,
      context: {
        quanfeng: options.prevalentWind,
        menfeng: options.seatWind,
        zimo: options.isSelfDrawn || options.isMiaoshou || options.isGangshang,
        juezhang: options.isJuezhang,
        haidi: options.isHaidilao || options.isMiaoshou,
        gang: options.isGangshang || options.isQianggang
      }
    });
  }

  const waitingTiles = useMemo(() => {
    if (remainingTiles > 0) return [];
    const payload = createGbPayload();
    const fromPackage = getWaitingTiles(payload);
    return fromPackage.length ? fromPackage : getFallbackWaitingTiles(payload);
  }, [concealedTiles, meldGroups, options, remainingTiles]);

  const selectedWinTile = useMemo(() => {
    if (!winTile) return null;
    const existing = waitingTiles.find(item => item.tileId === winTile);
    if (existing) return existing;
    const payload = createGbPayload(winTile);
    return { tileId: winTile, ...analyzeHand(payload) };
  }, [concealedTiles, meldGroups, options, waitingTiles, winTile]);

  function getTileTotalCount(tileId) {
    return tileCount(concealedTiles, tileId) + tileCount(meldTiles, tileId) + (winTile === tileId ? 1 : 0);
  }

  function toggleTile(tileId) {
    if (getTileTotalCount(tileId) >= 4) return;
    if (currentMode === 'chi' && !['m', 's', 'p'].includes(tileId[1])) return;

    if (currentMode === 'concealed') {
      if (remainingTiles < 0) return;
      if (remainingTiles === 0) {
        // The fourteenth tile selected from the upper picker is the winning tile.
        setWinTile(tileId);
        return;
      }
      setConcealedTiles([...concealedTiles, tileId]);
    } else {
      if (remainingTiles < 3) return;
      const tiles = getMeldTiles(currentMode, tileId);
      if (!tiles || tiles.some(tile => getTileTotalCount(tile) >= 4)) return;
      setMeldGroups([...meldGroups, { type: currentMode, tiles }]);
    }
    setWinTile(null);
  }

  function removeTile(index) {
    setConcealedTiles(concealedTiles.filter((_, tileIndex) => tileIndex !== index));
    setWinTile(null);
  }

  function removeMeld(index) {
    setMeldGroups(meldGroups.filter((_, meldIndex) => meldIndex !== index));
    setWinTile(null);
  }

  function updateOption(key, value) {
    setOptions({ ...options, [key]: value });
  }

  function toggleOption(key) {
    setOptions({ ...options, [key]: !options[key] });
  }

  function resetAll() {
    setCurrentMode('concealed');
    setConcealedTiles([]);
    setMeldGroups([]);
    setWinTile(null);
  }

  return (
    <View className='app'>
      <View className='main'>
        <View className='tile-section'>
          {TILE_ROWS.map((row, rowIndex) => (
            <View className='tile-row' key={`row-${rowIndex}`}>
              <View className='tile-row-inner'>
                {row.map(tileId => (
                  <Button
                    key={tileId}
                    className={`tile-btn ${getTileTotalCount(tileId) < 4 ? 'tile-btn-active' : 'tile-btn-inactive'}`}
                    onClick={() => toggleTile(tileId)}
                  >
                    <Image src={getTileSvgPath(tileId)} className='tile-icon' mode='aspectFit' />
                  </Button>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View className='options-section'>
          <View className='mode-row'>
            {Object.entries(MODE_LABELS).map(([mode, label]) => (
              <Button
                key={mode}
                className={`mode-btn ${currentMode === mode ? 'mode-btn-active' : 'mode-btn-inactive'}`}
                onClick={() => setCurrentMode(mode)}
              >
                {label}
              </Button>
            ))}
            <Button className='reset-btn' onClick={resetAll}>重置</Button>
          </View>

          <View className='control-row'>
            <View className='wind-row'>
              <View className='wind-group'>
                <Text className='wind-label'>门风</Text>
                <View className='wind-btns'>
                  {Object.entries(WIND_LABELS).map(([wind, label]) => (
                    <Button key={wind} className={`mode-btn ${options.seatWind === wind ? 'wind-btn-active' : 'wind-btn-inactive'}`} onClick={() => updateOption('seatWind', wind)}>{label}</Button>
                  ))}
                </View>
              </View>
              <View className='wind-group'>
                <Text className='wind-label'>圈风</Text>
                <View className='wind-btns'>
                  {Object.entries(WIND_LABELS).map(([wind, label]) => (
                    <Button key={wind} className={`mode-btn ${options.prevalentWind === wind ? 'wind-btn-active' : 'wind-btn-inactive'}`} onClick={() => updateOption('prevalentWind', wind)}>{label}</Button>
                  ))}
                </View>
              </View>
            </View>
            <View className='flower-row'>
              <Text className='flower-label'>花牌数量</Text>
              <View className='flower-controls'>
                <Button className='flower-btn' onClick={() => updateOption('flowerCount', Math.max(0, options.flowerCount - 1))}>-</Button>
                <Text className='flower-count'>{options.flowerCount}</Text>
                <Button className='flower-btn' onClick={() => updateOption('flowerCount', Math.min(8, options.flowerCount + 1))}>+</Button>
              </View>
            </View>
          </View>

          <View className='checkbox-row'>
            {[
              ['isSelfDrawn', '自摸'],
              ['isJuezhang', '和绝张'],
              ...(options.isSelfDrawn ? [['isMiaoshou', '妙手回春'], ['isGangshang', '杠上开花']] : [['isHaidilao', '海底捞月'], ['isQianggang', '抢杠和']])
            ].map(([key, label]) => (
              <View key={key} className='checkbox-label' onClick={() => toggleOption(key)}>
                <Checkbox value={key} checked={options[key]} className='checkbox-input' />
                <Text className='checkbox-text'>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className='selected-section'>
          {concealedTiles.length ? (
            <View className='concealed-row'>
              <View className='concealed-inner'>
                {concealedTiles.map((tile, index) => (
                  <View className='concealed-tile' key={`${tile}-${index}`} onClick={() => removeTile(index)}>
                    <Image src={getTileSvgPath(tile)} className='concealed-icon' mode='aspectFit' />
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {meldGroups.length ? (
            <View className='meld-row'>
              {meldGroups.map((group, groupIndex) => (
                <View className={`meld-group ${group.type === 'angang' ? 'meld-group-angang' : 'meld-group-other'}`} key={`mg-${groupIndex}`} onClick={() => removeMeld(groupIndex)}>
                  {group.tiles.map((tile, tileIndex) => (
                    <View
                      className={`meld-tile ${group.type === 'angang' ? 'meld-tile-angang' : 'meld-tile-other'}`}
                      key={`mt-${groupIndex}-${tileIndex}`}
                    >
                      <Image src={getTileSvgPath(tile)} className='meld-icon' mode='aspectFit' />
                    </View>
                  ))}
                  <Text className='meld-badge'>{MODE_LABELS[group.type]}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {remainingTiles > 0 ? <Text className='remaining-title'>可选择{remainingTiles}张牌</Text> : null}
          {remainingTiles <= 0 && waitingTiles.length === 0 ? <Text className='remaining-title'>未听牌</Text> : null}
        </View>

        {waitingTiles.length && !winTile ? (
          <View className='waiting-section'>
            <View className='waiting-row'>
              {waitingTiles.map(item => (
                <View className='waiting-item' key={item.tileId} onClick={() => setWinTile(item.tileId)}>
                  <Text className='waiting-score'>{item.totalScore || 0}番</Text>
                  <Image src={getTileSvgPath(item.tileId)} className='waiting-icon' mode='aspectFit' />
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {selectedWinTile ? (
          <View className='win-section'>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '24rpx' }} onClick={() => setWinTile(null)}>
              <Text className='win-title'>和张:</Text>
              <Image src={getTileSvgPath(selectedWinTile.tileId)} className='win-icon' mode='aspectFit' />
            </View>
            <View className='win-fans'>
              <View className='win-score'>共 {selectedWinTile.totalScore || 0} 番</View>
              {(selectedWinTile.fans || []).map(fan => (
                <Text key={fan.name} className='win-fan-tag'>{fan.name} {fan.score}番</Text>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}
