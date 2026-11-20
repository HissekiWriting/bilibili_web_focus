(() => {
  "use strict";

  const DEFAULT_SETTINGS = Object.freeze({
    enabled: true,
  });

  const PAGE = Object.freeze({
    HOME: "home",
    VIDEO: "video",
    OTHER: "other",
  });

  let enabled = DEFAULT_SETTINGS.enabled;
  let lastUrl = "";
  let routeRefreshQueued = false;

  // 将当前 URL 归类为首页、视频页或其他页面。
  function getPageType() {
    try {
      const url = new URL(window.location.href);

      if (url.hostname !== "www.bilibili.com") {
        return PAGE.OTHER;
      }

      if (url.pathname === "/") {
        return PAGE.HOME;
      }

      if (url.pathname.startsWith("/video/")) {
        return PAGE.VIDEO;
      }
    } catch {
      return PAGE.OTHER;
    }

    return PAGE.OTHER;
  }

  // 将开关和页面类型写入根节点，供 CSS 选择器使用。
  function applyPageState() {
    const root = document.documentElement;

    if (!root) {
      return;
    }

    root.dataset.biliFocusEnabled = enabled ? "true" : "false";
    root.dataset.biliFocusPage = getPageType();
  }

  // URL 变化时重新计算页面状态，force 用于首次初始化。
  function refreshRoute(force = false) {
    const currentUrl = window.location.href;

    if (!force && currentUrl === lastUrl) {
      return;
    }

    lastUrl = currentUrl;
    applyPageState();
  }

  // 合并同一帧内的多次 DOM 变化，避免重复检测路由。
  function scheduleRouteRefresh() {
    if (routeRefreshQueued) {
      return;
    }

    routeRefreshQueued = true;
    window.requestAnimationFrame(() => {
      routeRefreshQueued = false;
      refreshRoute();
    });
  }

  // 更新内存中的开关状态并立即应用到页面。
  function setEnabled(value) {
    enabled = value !== false;
    applyPageState();
  }

  // 从 chrome.storage 读取总开关，失败时恢复默认值。
  function loadSettings() {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
      if (chrome.runtime.lastError) {
        setEnabled(DEFAULT_SETTINGS.enabled);
        return;
      }

      setEnabled(settings.enabled);
    });
  }

  // 弹窗修改开关后，所有 B 站标签页通过存储事件同步状态。
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync" || !changes.enabled) {
      return;
    }

    setEnabled(changes.enabled.newValue);
  });

  window.addEventListener("popstate", scheduleRouteRefresh, { passive: true });
  window.addEventListener("hashchange", scheduleRouteRefresh, { passive: true });

  // 监听 DOM 变化以捕获 B 站 SPA 的站内跳转。
  const routeObserver = new MutationObserver(scheduleRouteRefresh);
  routeObserver.observe(document, {
    childList: true,
    subtree: true,
  });

  refreshRoute(true);
  loadSettings();
})();
