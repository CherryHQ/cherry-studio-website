# ByteDance (Doubao)

*   Log in to [Volcano Engine](https://console.volcengine.com/)
*   Click [here to go directly](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D)

<figure><img src="../../../../assets/748f7813cf1fde645a968c13.webp" alt=""><figcaption></figcaption></figure>

### Obtain API Key

*   Click [API Key Management](https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey) at the bottom of the sidebar.
*   Create an API Key

<figure><img src="../../../../assets/565501695d6ec77af56b0d94.webp" alt=""><figcaption></figcaption></figure>

*   After successful creation, click the eye icon next to the created API Key to view and copy it.

<figure><img src="../../../../assets/abead8dd3efc80aa8dfe9b88.webp" alt=""><figcaption></figcaption></figure>

*   Paste the copied API Key into CherryStudio, then enable the provider switch.

<figure><img src="../../../../assets/fec7f5e64d98a659fa27ff9c.webp" alt=""><figcaption></figcaption></figure>

### Activate and Add Models

*   In the Ark console, at the very bottom of the sidebar, navigate to [Open Management](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D\&OpenTokenDrawer=false) to activate the models you want to use. Here, you can activate Doubao series and DeepSeek models as needed.

<figure><img src="../../../../assets/b921f99f2e21714c0ef9cafb.webp" alt=""><figcaption></figcaption></figure>

*   In the [Model List Documentation](https://www.volcengine.com/docs/82379/1330310#%E6%96%87%E6%9C%AC%E7%94%9F%E6%88%90), find the Model ID corresponding to the desired model.

<figure><img src="../../../../assets/cba9e28d82aef11147fc01c6.webp" alt="Example of Volcano Engine Model ID column"><figcaption></figcaption></figure>

*   Open Cherry Studio's [Model Service](../../cherrystudio/preview/settings/providers.md) settings and find Volcano Engine.
*   Click "+" next to Sync models, then copy the previously obtained Model ID into the Model ID text box.

<figure><img src="../../../../assets/70c3827ffb29455676fb2fb0.webp" alt=""><figcaption></figcaption></figure>

*   Add models one by one following this process.

### API Address

There are two ways to write the API address:

*   The default client setting is: `https://ark.cn-beijing.volces.com/api/v3/`
*   The second way to write it is: `https://ark.cn-beijing.volces.com/api/v3/chat/completions#`

{% hint style="info" %}
There is no significant difference between the two forms. It is fine to keep the default and no modification is needed.

For the difference between `/` and `#` endings, please refer to the API Address section of the provider settings documentation, [click to go there](../../cherrystudio/preview/settings/providers.md#api-di-zhi).
{% endhint %}

<figure><img src="../../../../assets/91ce519c471ef98b7840a33e.webp" alt=""><figcaption><p>Official documentation cURL example</p></figcaption></figure>