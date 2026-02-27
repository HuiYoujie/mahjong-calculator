# 🀄 国标麻将算番器

Chinese Official Mahjong Scoring Calculator

一个简洁、美观的国标麻将算番器，支持国标麻将全部81种番种的计算。

## 🎮 在线体验

访问: `https://your-username.github.io/mahjong-calculator/`

## ✨ 功能特点

- 📱 响应式设计，支持桌面和移动设备
- 🔍 支持番种搜索
- 🏷️ 按番数分类筛选
- 🎯 实时计算总番数
- 📖 内置番种说明

## 🀄 番种说明

国标麻将共有81种番种，按番数分为：

| 番数 | 番种数量 |
|-----|---------|
| 88番 | 7种 |
| 64番 | 6种 |
| 48番 | 2种 |
| 32番 | 3种 |
| 24番 | 9种 |
| 16番 | 6种 |
| 12番 | 5种 |
| 8番 | 14种 |
| 6番 | 7种 |
| 4番 | 4种 |
| 2番 | 10种 |
| 1番 | 13种 |

## 🚀 部署到 GitHub Pages

### 方法一：直接上传

1. 在 GitHub 创建新仓库 `mahjong-calculator`
2. 上传所有文件到仓库
3. 进入仓库 Settings → Pages
4. Source 选择 `main` 分支，文件夹选择 `/ (root)`
5. 点击 Save，等待部署完成

### 方法二：使用 Git 命令

```bash
# 在 mahjong-calculator 目录下
git init
git add .
git commit -m "Initial commit: 国标麻将算番器"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mahjong-calculator.git
git push -u origin main
```

然后在 GitHub 仓库设置中启用 Pages。

## 📁 项目结构

```
mahjong-calculator/
├── index.html      # 主页面
├── style.css       # 样式文件
├── fans.js         # 番种数据
├── app.js          # 应用逻辑
└── README.md       # 说明文档
```

## 📜 许可证

MIT License

## 🙏 参考

- [中国国家体育总局麻将竞赛规则](http://www.sport.gov.cn/)
