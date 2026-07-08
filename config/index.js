const config = {
  projectName: 'mahjong-calculator',
  date: '2026-07-08',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-framework-react',
    '@tarojs/plugin-platform-weapp',
    '@tarojs/plugin-platform-h5'
  ],
  defineConstants: {},
  copy: {
    patterns: [
      { from: 'static', to: 'dist/static' }
    ],
    options: {}
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false
    }
  },
  mini: {},
  h5: {
    publicPath: '/',
    staticDirectory: 'static'
  }
};

module.exports = function () {
  return config;
};
