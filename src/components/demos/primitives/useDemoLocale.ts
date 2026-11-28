import { useTranslation } from 'react-i18next'

import { isEnglishSite } from '@/utils/urls'

/** Demo copy key ('en' | 'zh') and the BCP 47 tag used for text segmentation. */
export function useDemoLocale() {
  const { i18n } = useTranslation()
  const locale = isEnglishSite(i18n.resolvedLanguage || i18n.language) ? 'en' : 'zh'
  return { locale, tag: locale === 'en' ? 'en-US' : 'zh-CN' } as const
}
