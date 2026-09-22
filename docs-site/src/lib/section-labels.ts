// Section switcher and navigation labels for every locale in locales.json.
export type SectionLabels = { docs: string; desktop: string; mobile: string }

const LABELS: Record<string, SectionLabels> = {
  'zh-cn': { docs: '文档', desktop: '桌面版', mobile: '移动版' },
  en: { docs: 'Docs', desktop: 'Desktop', mobile: 'Mobile' },
  'zh-tw': { docs: '文件', desktop: '桌面版', mobile: '行動版' },
  ja: { docs: 'ドキュメント', desktop: 'デスクトップ版', mobile: 'モバイル版' },
  fr: { docs: 'Docs', desktop: 'Bureau', mobile: 'Mobile' },
  es: { docs: 'Documentación', desktop: 'Escritorio', mobile: 'Móvil' },
  pt: { docs: 'Documentação', desktop: 'Desktop', mobile: 'Mobile' },
  ru: { docs: 'Документация', desktop: 'Настольная версия', mobile: 'Мобильная версия' }
}

export function getSectionLabels(locale: string): SectionLabels {
  return LABELS[locale] ?? LABELS.en
}
