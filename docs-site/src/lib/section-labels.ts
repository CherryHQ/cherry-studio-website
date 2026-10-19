// Section switcher and navigation labels for every locale in locales.json.
export type SectionLabels = { docs: string; desktop: string; mobile: string }

const LABELS: Record<string, SectionLabels> = {
  'zh-cn': { docs: '文档', desktop: '桌面版', mobile: '移动版' },
  en: { docs: 'Docs', desktop: 'Desktop', mobile: 'Mobile' }
}

export function getSectionLabels(locale: string): SectionLabels {
  return LABELS[locale] ?? LABELS.en
}
