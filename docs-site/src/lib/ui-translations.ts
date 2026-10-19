const keys = [
  'Search(search trigger)',
  'Search(search dialog)',
  'No results found(search dialog)',
  'On this page(table of contents)',
  'No Headings(table of contents)',
  'Choose a language(language switcher)',
  'Choose a language(language switcher)(aria-label)',
  'Next Page(pagination)',
  'Previous Page(pagination)',
  'Edit on GitHub(edit page)',
  'Open Search(search trigger)(aria-label)',
  'Close Search(search dialog)(aria-label)',
  'Open Sidebar(sidebar)(aria-label)',
  'Close Sidebar(sidebar)(aria-label)',
  'Collapse Sidebar(sidebar)(aria-label)',
  'Light(theme switcher)(aria-label)',
  'Dark(theme switcher)(aria-label)',
  'System(theme switcher)(aria-label)'
]
const values: Record<string, string[]> = {
  'zh-cn': [
    '搜索文档',
    '搜索文档',
    '没有找到结果',
    '本页内容',
    '暂无标题',
    '选择语言',
    '选择语言',
    '下一页',
    '上一页',
    '在 GitHub 编辑',
    '打开搜索',
    '关闭搜索',
    '打开目录',
    '关闭目录',
    '收起目录',
    '浅色',
    '深色',
    '跟随系统'
  ]
}
export function uiTranslations(locale: string) {
  return Object.fromEntries(
    keys.flatMap((key, index) => (values[locale]?.[index] ? [[key, values[locale][index]]] : []))
  )
}
