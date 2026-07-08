import React, { useMemo, useState } from 'react';
import { Image, Input, ScrollView, Text, View } from '@tarojs/components';
import { FAN_DATA } from '../../utils/fanData';
import './index.scss';

const scoreFilters = [
  { label: '全部', value: 'all' },
  { label: '88番', value: 88 },
  { label: '64番', value: 64 },
  { label: '48番', value: 48 },
  { label: '32番', value: 32 },
  { label: '24番', value: 24 },
  { label: '16番', value: 16 },
  { label: '12番', value: 12 },
  { label: '8番', value: 8 },
  { label: '6番', value: 6 },
  { label: '5番', value: 5 },
  { label: '4番', value: 4 },
  { label: '2番', value: 2 },
  { label: '1番', value: 1 }
];

function getTileSvgPath(tileId) {
  return `/static/image/tile/${tileId}.svg`;
}

function getMeldTypeText(type) {
  return ({ chi: '吃', pong: '碰', minggang: '明杠', angang: '暗杠' })[type] || type;
}

export default function FanListPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedScore, setSelectedScore] = useState('all');
  const [expandedFan, setExpandedFan] = useState(null);

  const filteredFans = useMemo(() => {
    let fans = [...FAN_DATA];
    if (selectedScore !== 'all') {
      fans = fans.filter(fan => fan.score === selectedScore);
    }
    if (searchText) {
      const keyword = searchText.toLowerCase();
      fans = fans.filter(fan => fan.name.toLowerCase().includes(keyword));
    }
    return fans.sort((a, b) => b.score - a.score);
  }, [searchText, selectedScore]);

  return (
    <View className='app'>
      <View className='sticky'>
        <View className='search-bar'>
          <Input
            value={searchText}
            placeholder='搜索番型名称'
            className='search-input'
            onInput={event => setSearchText(event.detail.value)}
          />
          {searchText ? <Text className='search-clear' onClick={() => setSearchText('')}>×</Text> : null}
        </View>
        <View className='filter-bar'>
          {scoreFilters.map(score => (
            <View
              key={score.value}
              className={`filter-btn ${selectedScore === score.value ? 'filter-btn-active' : ''}`}
              onClick={() => setSelectedScore(score.value)}
            >
              {score.label}
            </View>
          ))}
        </View>
      </View>

      <ScrollView scrollY className='fan-list'>
        {filteredFans.length === 0 ? (
          <View className='empty-state'><Text>没有找到匹配的番型</Text></View>
        ) : null}

        {filteredFans.map(fan => {
          const expanded = expandedFan === fan.name;
          return (
            <View
              key={fan.name}
              className={`fan-card ${expanded ? 'fan-card-expanded' : ''}`}
              onClick={() => setExpandedFan(expanded ? null : fan.name)}
            >
              <View className='fan-header'>
                <Text className='fan-name'>{fan.name}</Text>
                <View className='fan-score-badge'>
                  <Text className='fan-score'>{fan.score}</Text>
                  <Text className='fan-score-unit'>番</Text>
                </View>
              </View>

              {expanded ? (
                <View className='fan-content'>
                  <View className='fan-section'>
                    <Text className='fan-description'>{fan.description}</Text>
                  </View>

                  {fan.exclusions?.length ? (
                    <View className='fan-section'>
                      <Text className='section-label'>不计番型：</Text>
                      <View className='exclusion-tags'>
                        {fan.exclusions.map(ex => <Text key={ex} className='exclusion-tag'>{ex}</Text>)}
                      </View>
                    </View>
                  ) : null}

                  {fan.note ? (
                    <View className='fan-section'>
                      <Text className='section-label'>备注：</Text>
                      <Text className='fan-note'>{fan.note}</Text>
                    </View>
                  ) : null}

                  <View className='fan-section'>
                    <Text className='section-label'>示例牌型：</Text>
                    <View className='example-tiles'>
                      {fan.exampleTiles?.melds?.length ? (
                        <View className='meld-tiles'>
                          {fan.exampleTiles.melds.map((meld, meldIdx) => (
                            <View className='meld-group' key={`meld-${meldIdx}`}> 
                              {meld.tiles.map((tile, tileIdx) => (
                                <View className='example-tile meld-tile' key={`meld-tile-${meldIdx}-${tileIdx}`}>
                                  <Image src={getTileSvgPath(tile)} className='tile-icon' mode='aspectFit' />
                                </View>
                              ))}
                              <View className='meld-type-badge'>{getMeldTypeText(meld.type)}</View>
                            </View>
                          ))}
                        </View>
                      ) : null}

                      <View className='concealed-tiles'>
                        {(fan.exampleTiles?.concealed || []).map((tile, tileIdx) => (
                          <View className='example-tile concealed-tile' key={`concealed-${tileIdx}`}>
                            <Image src={getTileSvgPath(tile)} className='tile-icon' mode='aspectFit' />
                          </View>
                        ))}
                        {fan.exampleTiles?.pair ? (
                          <View className='example-tile pair-tile'>
                            <Image src={getTileSvgPath(fan.exampleTiles.pair)} className='tile-icon' mode='aspectFit' />
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
