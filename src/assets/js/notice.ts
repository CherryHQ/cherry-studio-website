import i18n from '@/i18n'
import { fetchWebsiteConfigs, localizedText, safePublicURL } from './website-api'
export interface NoticeResponse {
  data: { notice: string; status: boolean; text_color: string; text_size: number }
}
export interface NoticeTopResponse {
  data: {
    notice_top: string
    status: boolean
    card_color: string
    card_height: number
    button: string
    button_link: string
    button_status: boolean
    button_text_color: string
    button_color: string
    card_text_color: string
  }
}
const color = (value: unknown, fallback: string) =>
  typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback
export const fetchNotice = async (): Promise<NoticeResponse['data'] | null> => {
  try {
    const value = (await fetchWebsiteConfigs())['home.notice'] as Record<string, unknown> | undefined
    if (!value) return null
    return {
      notice: localizedText(value, 'notice', i18n.language),
      status: value.status === true,
      text_color: color(value.text_color, '#EC7575'),
      text_size: Math.min(200, Math.max(8, Number(value.text_size) || 13))
    }
  } catch (error) {
    console.error('Failed to fetch notice:', error)
    return null
  }
}
export const fetchTopNotice = async (): Promise<NoticeTopResponse['data'] | null> => {
  try {
    const value = (await fetchWebsiteConfigs())['home.top_banner'] as Record<string, unknown> | undefined
    if (!value) return null
    return {
      notice_top: localizedText(value, 'notice_top', i18n.language),
      status: value.status === true,
      card_color: color(value.card_color, '#EC74BA'),
      card_height: Math.min(200, Math.max(8, Number(value.card_height) || 40)),
      button: typeof value.button === 'string' ? value.button : '',
      button_link: safePublicURL(value.button_link),
      button_status: value.button_status === true,
      button_text_color: color(value.button_text_color, '#FFFFFF'),
      button_color: color(value.button_color, '#2ECDA7'),
      card_text_color: color(value.card_text_color, '#FFFFFF')
    }
  } catch (error) {
    console.error('Failed to fetch top notice:', error)
    return null
  }
}
