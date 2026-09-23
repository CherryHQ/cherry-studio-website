---
icon: circle-help
---

# Troubleshooting

For connection problems, start with a short message without attachments to narrow down the cause.

## Why cannot I chat immediately after installation?

Configure an API key, add a model, enable its provider, and choose it for your agent. You can [import desktop configuration](desktop-sync.md) or follow [quick start](quick-start.md).

A platform's consumer chat subscription may not include API credits for other apps; check with the platform.

## My provider exists, but the model picker is empty

Check provider/model enablement, model purpose, and filters. Embedding/reranking entries are not ordinary chat models. Text/image pickers may show different models. Return to All and wait for the first model-information download.

If no model is added, [synchronize or add manually](model-management.md).

## Will model updates overwrite keys or custom settings?

Model information updates do not change provider addresses/keys or rewrite saved model overrides. Default fields can inherit new information.

**Desktop provider synchronization does replace selected provider addresses and keys.** See [model updates](model-updates.md) and [desktop import](desktop-sync.md).

## Synchronization fails, but chat works

The model-list API is separate from chat, and a platform may support only the latter. Add its exact model ID manually and check the connection. Failed discovery does not clear existing models.

Not returned does not necessarily mean discontinued; see [model synchronization](model-updates.md).

## What do connection errors mean?

| Error | Check first |
| --- | --- |
| 401 / Unauthorized | Complete, valid, saved, enabled key |
| 403 / Forbidden | Account, region, model, or organization access |
| 404 / Not found | Base address, API, exact model ID, duplicated request paths |
| 429 / Too many requests | Rate limits and credits; wait rather than repeatedly sending |
| Network failure / Timeout | Provider reachability, proxy, and service status |
| Context/request too large | Reduce attachments/history or choose a suitable model; raising configured limits alone does not help |

Providers can use different codes. Read the error detail and platform instructions. See [provider setup](providers-and-models.md).

## Why did a changed setting not take effect?

* Provider addresses/keys and model creation/editing require the page's Save/Add action.
* Existing-agent edits, global model selection, and API selection in model lists save automatically; look for failure notices.
* Save provider changes before connection checks or model synchronization.
* A global default-model change does not update every existing agent.

See [model management](model-management.md) and [agent editing](agents-and-tools.md).

## Why cannot I delete a model?

A global default must be changed or cleared in **Settings → Default model** first. Deleting another model used by an agent means choosing a replacement for that agent.

## I can preview an image, but cannot send it

Preview and model-input support differ. Choose a vision-capable model and check format, image count, and size. Toggling an image-capability flag cannot add vision to a text-only model.

See [chat and files](chat-and-files.md) for scanned PDFs, empty document text, and large attachments.

## Where are the web-search switch and Plugins button?

The Web search switch is in the agent editor; enable it, configure services, and request a search in chat. Plugins appears in the composer only when usable connections exist.

Connected plugins can be used directly, or named through **＋ → Plugins**. See [web search](web-search.md) and [plugin connections](plugins.md).

## Plugin authorization keeps waiting

Return to Cherry Studio, check status, and confirm the account/workspace. Reopen authorization or check again; restart an expired request. Missing organization permissions must be handled at the service.

DingTalk actions need requesting again after additional authorization. WeCom links must be opened in WeCom before expiry. See [plugins](plugins.md).

## Why can I only retry the latest answer?

Retry replaces the latest answer in place. Use a branch to change direction earlier. Retrying/deleting does not reverse external actions; retrying can cost more. See [answer actions](chat-and-files.md).

## Does context compaction delete my conversation?

Visible history remains. Earlier material is summarized for the model and some original detail may be absent. Supply key material again when exactness matters. See [long conversations](chat-and-files.md).

## Why are exported images split, and code incomplete?

Long image exports default to pages; a single-long-image option is available. Code panels show a limited preview in images. Choose HTML or Markdown for full code. Conversion failure can change the available format, so inspect the preview and format label.

See [sharing and export](sharing-and-export.md) for selection, watermark, thinking content, and files.

## Background generation stops or notifications are missing

Check **Settings → Notifications** and system permission. The OS can still restrict background work. Inspect the conversation/drawing before retrying. See [background replies](settings-and-usage.md).

## Does pairing automatically synchronize chat history?

No. It imports selected provider configuration and enabled models, excludes chats, and is not continuous synchronization. Preserve important content separately; see [desktop import](desktop-sync.md) and [data](data-privacy.md).

## Android blocks installation or TestFlight cannot join

Use the [official download page](https://cherryai.com/download?platform=mobile). Android may need permission for the downloading app to install APKs. Install TestFlight before opening its invitation on iPhone/iPad. Capacity, build expiry, and service availability can affect installation.

See [download and installation](installation.md).

## Tools do not run, or a file was not saved

* A model only answers in text, waits for approval, or reports missing permission: check the model, capabilities, connection, and access in [Let AI Use Tools](using-tools.md).
* Android opens the calendar app, or an event write has an uncertain outcome: follow [Calendar and Reminders](calendar-and-reminders.md) and inspect existing records before retrying.
* Location fails, or Health data is empty or partial: see [Location and Health Records](location-and-health.md). An empty result does not prove that no records exist.
* You get a code block without a saved file, or edits leave the original unchanged: see [Create and Edit Files](file-generation.md).
* You have HTML but want a PPT, or cannot edit the PPT's text individually: see [HTML to Image and PPT](html-export.md).

## How do I report an unresolved issue?

Include app/device/system versions, reproduction steps, and error text in the [App repository's issue tracker](https://github.com/CherryHQ/cherry-studio-app/issues). Redact keys, private conversations, and file contents first.
