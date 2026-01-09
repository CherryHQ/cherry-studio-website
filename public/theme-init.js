// 防止主题闪烁：在页面渲染前应用主题
(function () {
  var theme = 'system'
  var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.add(isDark ? 'dark' : 'light')
})()
