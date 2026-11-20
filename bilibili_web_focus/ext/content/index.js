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

  function applyPageState() {
    const root = document.documentElement;

    if (!root) {
      return;
    }

    root.dataset.biliFocusEnabled = enabled ? "true" : "false";
    root.dataset.biliFocusPage = getPageType();
  }

  function refreshRoute(force = false) {
    const currentUrl = window.location.href;

    if (!force && currentUrl === lastUrl) {
      return;
    }

    lastUrl = currentUrl;
    applyPageState();
  }

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

  function setEnabled(value) {
    enabled = value !== false;
    applyPageState();
  }

  function loadSettings() {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
      if (chrome.runtime.lastError) {
        setEnabled(DEFAULT_SETTINGS.enabled);
        return;
      }

      setEnabled(settings.enabled);
    });
  }

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync" || !changes.enabled) {
      return;
    }

    setEnabled(changes.enabled.newValue);
  });

  window.addEventListener("popstate", scheduleRouteRefresh, { passive: true });
  window.addEventListener("hashchange", scheduleRouteRefresh, { passive: true });

  // Bilibili updates both the URL and DOM during in-site navigation.
  const routeObserver = new MutationObserver(scheduleRouteRefresh);
  routeObserver.observe(document, {
    childList: true,
    subtree: true,
  });

  refreshRoute(true);
  loadSettings();
})();
