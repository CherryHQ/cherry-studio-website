---
icon: shield-check
---

# Data, privacy, and permissions

Understanding where data goes is more useful than a blanket “stored locally” claim.

<div data-mobile-gallery="single">
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-agent.webp"><img src="../../../assets/mobile/ipad-agent.webp" alt="System permission controls in Cherry Studio Mobile"></a><figcaption><p><strong>System tools</strong> · Each capability exposes its permission controls before use</p></figcaption></figure>
</div>

## Data on the device

App settings, provider configuration, and chat history are primarily stored on the current device. Before deleting the app, clearing system data, or changing devices, save anything important separately. Do not assume that the mobile app automatically syncs with desktop.

## Data sent to providers

When you send a message or file, or generate an image, the request goes to the model provider selected in your configuration. Retention and processing depend on that provider’s privacy policy, account settings, and API terms.

## API keys

* Enter API keys only in the official app.
* Never expose a complete key in screenshots, logs, chats, or support requests.
* If a key may have leaked, revoke it in the provider dashboard and create a new one.
* Consider a separately revocable, quota-limited key for mobile use.

## System permissions

Photos, files, camera, calendar, and reminders may require system permissions. The app requests access when a related capability is used. You can change these permissions at any time in Android or iOS settings.

Follow least privilege: do not grant access to unused capabilities, and keep manual confirmation for tools that write data or act outside the app.
