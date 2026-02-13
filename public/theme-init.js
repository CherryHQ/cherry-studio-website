// 防止主题闪烁：在页面渲染前应用主题
(function () {
  var storageKey = 'theme-preference'
  var theme = 'system'

  try {
    var stored = localStorage.getItem(storageKey)
    if (stored === 'light' || stored === 'dark' || stored === 'system') theme = stored
  } catch (e) {
    // ignore
  }

  var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.add(isDark ? 'dark' : 'light')
})()
