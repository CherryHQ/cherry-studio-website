import { fetchWebsiteConfigs, safePublicURL } from './website-api'

interface ChannelResponse {
  data: { qq_group_link: string; wechat_qrcodes: string[] }
}
export const fetchChannelData = async (): Promise<ChannelResponse | null> => {
  try {
    const configs = await fetchWebsiteConfigs()
    const qrCodes = configs['community.wechat_qrcodes']
    return {
      data: {
        qq_group_link: safePublicURL(configs['community.qq_group_link']),
        wechat_qrcodes: Array.isArray(qrCodes) ? qrCodes.map(safePublicURL).filter(Boolean) : []
      }
    }
  } catch (error) {
    console.error('Error fetching channel data:', error)
    return null
  }
}
export const getRandomWechatQRCode = (channelData: ChannelResponse) => {
  const qrCodes = channelData?.data?.wechat_qrcodes ?? []
  return qrCodes.length ? qrCodes[Math.floor(Math.random() * qrCodes.length)] : ''
}
