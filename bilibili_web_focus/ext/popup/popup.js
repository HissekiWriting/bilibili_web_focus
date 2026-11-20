(() => {
  "use strict";

  const DEFAULT_SETTINGS = Object.freeze({
    enabled: true,
  });

  const toggle = document.querySelector("#enabled");
  const status = document.querySelector("#status");

  function render(enabled) {
    toggle.checked = enabled;
    status.textContent = enabled ? "已启用" : "已暂停";
  }

  function loadSettings() {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
      if (chrome.runtime.lastError) {
        render(DEFAULT_SETTINGS.enabled);
        status.textContent = "读取设置失败";
        return;
      }

      render(settings.enabled !== false);
    });
  }

  toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    render(enabled);

    chrome.storage.sync.set({ enabled }, () => {
      if (chrome.runtime.lastError) {
        status.textContent = "保存设置失败";
      }
    });
  });

  loadSettings();
})();
