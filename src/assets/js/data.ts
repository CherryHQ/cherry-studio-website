interface ChannelResponse {
  data: {
    id: number;
    qq_group_link: string;
    wechat_qr_code1: string;
    wechat_qr_code2: string;
    wechat_qr_code3: string;
    zsxq: string;
  }
}

const BASE_URL = 'https://cherry-data.ocoolai.com';

export const fetchChannelData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/items/channel`, {
      method: 'GET'
    });
    const data: ChannelResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching channel data:', error);
    return null;
  }
};

export const getRandomWechatQRCode = (channelData: ChannelResponse) => {
  if (!channelData?.data) return '';
  
  const qrCodes = [
    channelData.data.wechat_qr_code1,
    channelData.data.wechat_qr_code2, 
    channelData.data.wechat_qr_code3
  ].filter(Boolean); // Filter out any empty/null values
  
  const randomIndex = Math.floor(Math.random() * qrCodes.length);
  const randomQRCode = qrCodes[randomIndex];
  
  return `${BASE_URL}/assets/${randomQRCode}`;
};
