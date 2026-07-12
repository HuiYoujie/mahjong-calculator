import React, { useState } from 'react';
import { Image, Text, View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import './index.scss';

const TABS = [
  { pagePath: '/pages/index/index', text: '计算', icon: '/static/tabbar/calculate.svg', activeIcon: '/static/tabbar/calculate-active.svg' },
  { pagePath: '/pages/fanlist/index', text: '番种', icon: '/static/tabbar/fans.svg', activeIcon: '/static/tabbar/fans-active.svg' }
];

function getCurrentPath() {
  const path = Taro.getCurrentInstance().router?.path || '';
  return path.startsWith('/') ? path : `/${path}`;
}

export default function CustomTabBar() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);
  useDidShow(() => setCurrentPath(getCurrentPath()));

  function switchTo(pagePath) {
    if (pagePath === currentPath) return;
    setCurrentPath(pagePath);
    Taro.switchTab({ url: pagePath });
  }

  return (
    <View className='custom-tabbar-wrap'>
      <View className='custom-tabbar'>
        {TABS.map(tab => {
          const active = currentPath === tab.pagePath;
          return (
            <View key={tab.pagePath} className={`tabbar-item ${active ? 'tabbar-item-active' : ''}`} onClick={() => switchTo(tab.pagePath)}>
              <View className='tabbar-icon-box'><Image className='tabbar-icon' src={active ? tab.activeIcon : tab.icon} mode='aspectFit' /></View>
              <Text className='tabbar-text'>{tab.text}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
