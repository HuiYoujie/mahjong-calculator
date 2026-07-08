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

function getPairTiles(fan) {
  const example = fan.exampleTiles || {};
  const pair = example.pair;
  if (pair) {
    const baseCount = (example.concealed || []).length +
      (example.melds || []).reduce((sum, meld) => sum + (meld.tiles || []).length, 0);
    return baseCount >= 13 ? [pair] : [pair, pair];
  }

  return [];
}

function buildDisplayGroups(fan) {
  const example = fan.exampleTiles || {};
  const meldGroups = (example.melds || []).map(meld => ({
    kind: 'meld',
    label: getMeldTypeText(meld.type),
    tiles: meld.tiles || []
  }));
  const concealed = example.concealed || [];
  const groups = [...meldGroups];

  if (concealed.length > 0) {
    groups.push({
      kind: 'concealed',
      tiles: concealed
    });
  }

  const pairTiles = getPairTiles(fan);
  if (pairTiles.length > 0) {
    groups.push({
      kind: 'pair',
      label: pairTiles.length === 1 ? '和牌' : '将牌',
      tiles: pairTiles
    });
  }

  return groups;
}

function prepareFans(fans) {
  const seen = new Set();
  return fans.reduce((list, fan, index) => {
    const key = `${fan.name}-${fan.score}`;
    if (seen.has(key)) return list;
    seen.add(key);

    list.push({
      ...fan,
      originIndex: index,
      displayGroups: buildDisplayGroups(fan)
    });
    return list;
  }, []);
}

export default function FanListPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedScore, setSelectedScore] = useState('all');
  const [expandedFan, setExpandedFan] = useState(null);
  const allFans = useMemo(() => prepareFans(FAN_DATA), []);

  const filteredFans = useMemo(() => {
    let fans = [...allFans];
    if (selectedScore !== 'all') {
      fans = fans.filter(fan => fan.score === selectedScore);
    }
    const keyword = searchText.trim().toLowerCase();
    if (keyword) {
      fans = fans.filter(fan => {
        return fan.name.toLowerCase().includes(keyword) ||
          (fan.description || '').toLowerCase().includes(keyword) ||
          (fan.note || '').toLowerCase().includes(keyword);
      });
    }
    return fans.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.originIndex - b.originIndex;
    });
  }, [allFans, searchText, selectedScore]);

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
            >
              <View className='fan-header' onClick={() => setExpandedFan(expanded ? null : fan.name)}>
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
                    <View className='fan-section exclude'>
                      <Text className='section-label'>不计：</Text>
                      <View className='exclusion-tags'>
                        {fan.exclusions.map(ex => <Text key={ex} className='exclusion-tag'>{ex}</Text>)}
                      </View>
                    </View>
                  ) : null}

                  {fan.displayGroups.length ? (
                  <View className='fan-section'>
                    <Text className='section-label'>示例牌型：</Text>
                    <View className='example-tiles'>
                      <View className='tile-groups'>
                        {fan.displayGroups.map((group, groupIdx) => (
                          <View className={`tile-group tile-group-${group.kind}`} key={`group-${groupIdx}`}>
                            {group.tiles.map((tile, tileIdx) => (
                              <View key={`tile-${groupIdx}-${tileIdx}`}>
                                <Image src={getTileSvgPath(tile)} className='tile-icon' mode='aspectFit' />
                              </View>
                            ))}
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
