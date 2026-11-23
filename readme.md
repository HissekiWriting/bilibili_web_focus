# Bilibili Web Focus

一个面向 Microsoft Edge 的 Manifest V3 扩展，用于减少 B 站页面中的推荐和干扰内容。

## 目录结构

```text
bilibili_web_focus/
├─ .dev/
├─ bilibili_web_focus/
│  ├─ manifest.json
│  ├─ LICENSE
│  ├─ PRIVACY.md
│  ├─ rsc/
│  └─ ext/
│     ├─ content/
│     │  ├─ core.css
│     │  └─ index.js
│     └─ popup/
│        ├─ popup.css
│        ├─ popup.html
│        └─ popup.js
├─ LICENSE
└─ readme.md
```

仓库根目录是项目工作区，内层 `bilibili_web_focus/` 才是可以直接加载的扩展目录，不需要构建步骤。

## 在 Edge 中加载

1. 打开 `edge://extensions/`。
2. 开启“开发人员模式”。
3. 点击“加载解压缩的扩展”，选择 `bilibili_web_focus/bilibili_web_focus/`。

## 当前功能

- Manifest V3 清单和扩展入口。
- 扩展弹窗总开关，设置保存在 `chrome.storage.sync`。
- Content Script 在页面加载早期识别首页、视频页和其他页面。
- 启用状态下清空 B 站首页主内容，仅保留顶部搜索框，关闭总开关后恢复。
- 顶栏仅保留搜索框，隐藏左右导航和用户入口，适用于 B 站主站、搜索页及其他子域页面。
- 搜索框为空时隐藏热搜面板，输入内容后允许搜索补全显示。
- 搜索框的默认灰色占位文字保持为空，不影响实际搜索内容和输入。
- 搜索页正文搜索框和搜索结果保持可用。
- 视频页隐藏侧边广告、普通视频推荐、标签栏、投稿活动栏和下方评论区，保留系列选集栏。
