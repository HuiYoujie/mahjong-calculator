export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/fanlist/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#F8F8F8',
    navigationBarTitleText: 'mahjong',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#7A7E83',
    selectedColor: '#3b82f6',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '计算',
        iconPath: '../static/index.png',
        selectedIconPath: '../static/index-active.png'
      },
      {
        pagePath: 'pages/fanlist/index',
        text: '番种',
        iconPath: '../static/fanlist.png',
        selectedIconPath: '../static/fanlist-active.png'
      }
    ]
  }
});
