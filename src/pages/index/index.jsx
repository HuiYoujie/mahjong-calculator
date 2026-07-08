import React, { useMemo, useState } from 'react';
import { Button, Image, Text, View } from '@tarojs/components';
import { analyzeHand, buildHandPayload, getFallbackWaitingTiles, getWaitingTiles } from '../../utils/scoringAdapter';
import './index.scss';

const TILE_ROWS = [
  ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9'],
  ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9'],
  ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'],
  ['east', 'south', 'west', 'north', 'zhong', 'fa', 'bai']
];

function getTileSvgPath(tileId) {
  return `/static/image/tile/${tileId}.svg`;
}

function tileCount(tiles, tileId) {
  return tiles.filter(tile => tile === tileId).length;
}

export default function IndexPage() {
  const [concealedTiles, setConcealedTiles] = useState([]);
  const [winTile, setWinTile] = useState(null);
  const [options] = useState({
    seatWind: 'east',
    prevalentWind: 'east',
    flowerCount: 0,
    isSelfDrawn: false,
    isJuezhang: false,
    isHaidilao: false,
    isMiaoshou: false,
    isGangshang: false,
    isQianggang: false
  });

  const meldGroups = [];
  const remainingTiles = 14 - concealedTiles.length - 1;

  const waitingTiles = useMemo(() => {
    if (concealedTiles.length !== 13) return [];
    const payload = buildHandPayload({ concealedTiles, meldGroups, winTile: null, options });
    const fromPackage = getWaitingTiles(payload);
    return fromPackage.length ? fromPackage : getFallbackWaitingTiles({ concealedTiles, meldGroups, options });
  }, [concealedTiles, options]);

  const selectedWinTile = useMemo(() => {
    if (!winTile) return null;
    const existing = waitingTiles.find(item => item.tileId === winTile);
    if (existing) return existing;
    const payload = buildHandPayload({ concealedTiles: [...concealedTiles, winTile], meldGroups, winTile, options });
    return { tileId: winTile, ...analyzeHand(payload) };
  }, [concealedTiles, options, waitingTiles, winTile]);

  function toggleTile(tileId) {
    if (tileCount(concealedTiles, tileId) >= 4 || concealedTiles.length >= 13) return;
    setConcealedTiles([...concealedTiles, tileId]);
    setWinTile(null);
  }

  function removeTile(index) {
    setConcealedTiles(concealedTiles.filter((_, tileIndex) => tileIndex !== index));
    setWinTile(null);
  }

  function resetAll() {
    setConcealedTiles([]);
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
                    className={`tile-btn ${tileCount(concealedTiles, tileId) < 4 ? 'tile-btn-active' : 'tile-btn-inactive'}`}
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
            <Button className='mode-btn mode-btn-active'>立牌</Button>
            <Button className='mode-btn mode-btn-inactive'>碰</Button>
            <Button className='mode-btn mode-btn-inactive'>吃</Button>
            <Button className='mode-btn mode-btn-inactive'>明杠</Button>
            <Button className='mode-btn mode-btn-inactive'>暗杠</Button>
            <Button className='reset-btn' onClick={resetAll}>重置</Button>
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
            <View className='win-tile-row' onClick={() => setWinTile(null)}>
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
