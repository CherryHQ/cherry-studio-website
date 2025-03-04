export interface NoticeResponse {
  data: {
    id: number;
    date_created: string;
    user_updated: string;
    date_updated: string;
    notice: string;
    status: boolean;
    text_color: string;
    text_size: number;
  }
}

export interface NoticeTopResponse {
  data: {
    id: number;
    notice_top: string;
    status: boolean;
    card_color: string;
    card_height: number;
    button: string;
    button_link: string;
    button_status: boolean;
    button_text_color: string;
    button_color: string;
    card_text_color: string;
  }
}

export const fetchNotice = async (): Promise<NoticeResponse['data'] | null> => {
  try {
    const response = await fetch('http://103.40.13.68:18192/items/notice', {
      method: 'GET'
    });
    const data: NoticeResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch notice:', error);
    return null;
  }
}

export const fetchTopNotice = async (): Promise<NoticeTopResponse['data'] | null> => {
  try {
    const response = await fetch('http://103.40.13.68:18192/items/notice_top', {
      method: 'GET'
    });
    const data: NoticeTopResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch top notice:', error);
    return null;
  }
}
