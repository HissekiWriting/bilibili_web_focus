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

## 当前骨架

- Manifest V3 清单和扩展入口。
- 扩展弹窗总开关，设置保存在 `chrome.storage.sync`。
- Content Script 在页面加载早期识别首页、视频页和其他页面。
- 启用状态下清空 B 站首页，关闭总开关后恢复。
