# Bilibili Web Focus 隐私政策

最后更新：2026 年 11 月 24 日

Bilibili Web Focus（以下简称“本扩展”）是一款在本地运行的 B 站页面专注工具。本政策说明本扩展会处理哪些数据、为何处理这些数据，以及用户如何控制这些数据。

## 1. 数据收集与共享

本扩展不收集、出售、共享或上传用户的个人信息，也不使用分析、埋点或广告服务。

本扩展不会读取或保存以下内容：

- B 站账号、密码、Cookie 或登录令牌；
- 搜索关键词、搜索历史或观看历史；
- 播放记录、评论、私信、收藏、投币或其他账号数据；
- 支付信息、设备标识符或精确位置。

## 2. 本地处理的数据

为实现页面整理功能，内容脚本会在用户访问 B 站时进行以下临时处理：

- 读取当前页面的 URL，以判断页面属于首页、视频页、搜索页或其他页面；
- 读取并更改页面 DOM 和页面节点属性，以应用隐藏规则并适配页面内跳转；
- 判断搜索框当前是否为空，以决定是否隐藏热搜面板。

上述处理仅发生在用户当前浏览器中的 B 站页面内。搜索框内容只用于判断是否为空，不会记录、持久化或发送给开发者。页面内容、URL 和处理结果均不会离开浏览器。

## 3. 保存的设置

本扩展仅使用 `chrome.storage.sync` 保存一个名为 `enabled` 的布尔值，用于记录总开关是否启用。该存储项不包含浏览记录或个人内容。

如果用户启用了 Edge 或其他 Chromium 浏览器的同步功能，浏览器可能依据其自身的账号与同步设置，将这个开关值同步到用户登录的其他设备。该同步由浏览器提供商负责，开发者无法访问这些数据。

总开关只控制功能是否启用，不会删除已保存的设置。用户可以在扩展管理页面清除扩展数据或卸载扩展，以删除本地保存的设置。

## 4. 权限说明

本扩展使用以下权限：

- `storage`：保存并同步总开关状态；
- 对 `https://bilibili.com/*` 和 `https://*.bilibili.com/*` 的站点访问权限：在 B 站页面中运行内容脚本和应用样式，以隐藏不需要的页面区域、监听页面变化并同步开关状态。

本扩展不申请或使用摄像头、麦克风、剪贴板、下载、位置、支付等权限。

## 5. 网络通信与第三方服务

本扩展不会主动连接开发者服务器或任何第三方接口，不包含远程代码，也不发送遥测或统计数据。

用户访问 B 站时，B 站自身仍会按照其隐私政策处理数据；浏览器同步功能则由浏览器提供商按其政策处理。这些服务与本扩展的开发者无关，也不受本政策约束。

## 6. 数据保留与用户控制

本扩展不保留页面内容或搜索内容。开关设置会一直保存在浏览器扩展存储中，直到用户在扩展管理页面清除扩展数据或卸载扩展。关闭浏览器同步只会停止后续的跨设备同步，不会自行删除本地设置。

本扩展没有用户账号系统，因此不存在开发者侧的用户数据副本，也没有需要向开发者申请访问或删除的个人数据。

## 7. 儿童隐私

本扩展不面向儿童单独收集任何数据，也不会有意收集儿童的个人信息。

## 8. 政策更新

如果本扩展的数据处理方式或权限发生实质性变化，本政策会随项目更新，并修改页面顶部的“最后更新”日期。重大变化会在项目仓库中说明。

## 9. 联系方式

如对本政策有疑问，请通过项目仓库的 Issue 页面联系：

<https://github.com/HissekiWriting/bilibili_web_focus/issues>

---

# Privacy Policy (English Summary)

This extension is a local-only interface filter for Bilibili. It does not collect, sell, share, or upload personal information, and it does not contact developer-operated or third-party analytics servers.

The content script reads the current Bilibili URL and page elements to classify the page and apply display rules. It checks whether the search input is empty but does not record its text. Page content and URLs are processed only in the user's browser and are not transmitted.

The only persisted setting is a boolean named `enabled`, stored with `chrome.storage.sync`. If browser sync is enabled, the browser provider may sync this value according to its own policies; the developer cannot access it.

The extension uses the `storage` permission and site access for `bilibili.com` and its subdomains solely to provide these features. Uninstalling the extension or clearing its data removes the stored setting.

This project is independent and is not affiliated with Bilibili. For privacy questions, use the repository's Issue page.
