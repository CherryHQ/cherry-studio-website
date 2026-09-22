---
icon: key-round
---

# Providers and models

The mobile app calls models through providers that you configure. Cherry Studio supplies the client experience; it does not proxy model credits or change a provider’s pricing and data policies.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/iphone-add-provider.webp"><img src="../../../assets/mobile/iphone-add-provider.webp" alt="Add provider screen in Cherry Studio Mobile on iPhone"></a><figcaption><p><strong>iPhone</strong> · Search the provider catalog or create a custom provider</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-add-provider.webp"><img src="../../../assets/mobile/ipad-add-provider.webp" alt="Add provider screen in Cherry Studio Mobile on iPad"></a><figcaption><p><strong>iPad</strong> · The same provider catalog in the tablet layout</p></figcaption></figure>
</div>

## Add a built-in provider

1. Open model service settings and select **Add provider**.
2. Search for and choose the provider.
3. Enter the API key and any additional values required by that provider.
4. Fetch or add models, then enable the models you plan to use.

## Use a custom provider

For a service that implements a supported API format, choose **Custom provider** and enter a name, Base URL, API key, and model ID. The Base URL must be the API endpoint from the provider documentation, not the provider’s dashboard URL.

## Choose a model

Open the model picker from a chat or agent to switch between enabled models. Image understanding, tool calling, and image generation support depend on the provider and specific model.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/iphone-models.webp"><img src="../../../assets/mobile/iphone-models.webp" alt="Model picker in Cherry Studio Mobile on iPhone"></a><figcaption><p><strong>iPhone</strong> · Browse enabled models by provider</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-models.webp"><img src="../../../assets/mobile/ipad-models.webp" alt="Model picker in Cherry Studio Mobile on iPad"></a><figcaption><p><strong>iPad</strong> · Review model capabilities and context information</p></figcaption></figure>
</div>

## Common connection errors

* **401 / unauthorized:** verify the full API key, expiration, and account permissions.
* **404 / model not found:** verify the Base URL and model ID; do not substitute a display name for the model ID.
* **429 / too many requests:** wait for the rate limit to reset and check provider balance and quotas.
* **Timeout or network failure:** make sure your current network can reach the provider and review proxy settings.
