
{% hint style="warning" %}
此文件由 AI 從中文翻譯而來，尚未經過審閱。
{% endhint %}

# 字節跳動(豆包)

* 登入 [火山引擎](https://console.volcengine.com/)
* 直接點擊 [這裡直達](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D)

<figure><img src="../../../../assets/748f7813cf1fde645a968c13.webp" alt=""><figcaption></figcaption></figure>

### 取得 API Key

* 點擊側邊欄下方的 [API Key 管理](https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey)
* 建立 API Key

<figure><img src="../../../../assets/565501695d6ec77af56b0d94.webp" alt=""><figcaption></figcaption></figure>

* 建立成功後，點擊已建立 API Key 後的眼睛圖示開啟並複製

<figure><img src="../../../../assets/abead8dd3efc80aa8dfe9b88.webp" alt=""><figcaption></figcaption></figure>

* 將複製的 API Key 填入 Cherry Studio 後，開啟服務商開關

<figure><img src="../../../../assets/fec7f5e64d98a659fa27ff9c.webp" alt=""><figcaption></figcaption></figure>

### 開通並新增模型

* 在方舟控制台側邊欄最下方的 [開通管理](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D\&OpenTokenDrawer=false) 開通需要使用的模型，可依需求開通豆包系列和 DeepSeek 等模型

<figure><img src="../../../../assets/b921f99f2e21714c0ef9cafb.webp" alt=""><figcaption></figcaption></figure>

* 在 [模型列表文件](https://www.volcengine.com/docs/82379/1330310#%E6%96%87%E6%9C%AC%E7%94%9F%E6%88%90) 中，找到所需模型對應的 模型ID

<figure><img src="../../../../assets/cba9e28d82aef11147fc01c6.webp" alt="字節跳動(豆包) — 說明圖片"><figcaption></figcaption></figure>

* 開啟 Cherry Studio 的 [模型服務](../../cherrystudio/preview/settings/providers.md) 設定找到火山引擎
* 點擊新增，將取得的 模型ID 複製至 模型ID 文字輸入框

<figure><img src="../../../../assets/70c3827ffb29455676fb2fb0.webp" alt=""><figcaption></figcaption></figure>

* 依此流程逐一新增模型

### API 地址

API 地址有兩種寫法：

* 第一種為客戶端預設的：`https://ark.cn-beijing.volces.com/api/v3/`
* 第二種寫法為：`https://ark.cn-beijing.volces.com/api/v3/chat/completions#`

{% hint style="info" %}
兩種寫法無實質區別，保持預設即可，無需修改。

關於結尾 `/` 和 `#` 的差異，請參考文件服務商設定的 API 地址部分，[點擊前往](../../cherrystudio/preview/settings/providers.md#api-di-zhi)
{% endhint %}

<figure><img src="../../../../assets/91ce519c471ef98b7840a33e.webp" alt=""><figcaption><p>官方文件 cURL 範例</p></figcaption></figure>