---
description: Create, install, and use custom mini-programs that can invoke Cherry Studio AI capabilities
icon: wand-magic-sparkles
---
# Generative Mini Apps

Generative Mini Apps are local web applications that run within Cherry Studio's [Mini Apps]. You customize the interface and business logic, and can invoke AI models configured in Cherry Studio via `window.cherry`. This transforms a general-purpose model into a writing assistant, information extractor, learning tool, or dedicated business application.

The difference between generative mini apps and standard website mini apps lies not in appearance, but in capability source: website mini apps simply open a URL; generative mini apps must be packaged as `.miniapp`, installed, and authorized before they can access Cherry's AI, sandboxed data, files, notifications, network, and clipboard capabilities.

{% hint style="info" %}
Cherry Studio provides the runtime environment, authorization mechanism, and AI interfaces. You can write mini apps yourself, or use AI coding tools to generate HTML, CSS, and JavaScript first, then package and install them according to the instructions on this page.
{% endhint %}

## Goals and Prerequisites

After completing this page, you will be able to:

* Install and use generative mini apps provided by others;
* Create your own `.miniapp` package from a simple requirement;
* Allow mini apps to invoke Cherry Studio's [Default Model] or [Fast Model];
* Check permissions, activity logs, storage, updates, and uninstall status.

To use an existing mini app, you only need a trusted `.miniapp` file or installation URL. To create your own, you also need the ability to edit web files and create ZIP archives. If you want to test AI features, please configure a usable chat model in Cherry Studio first.

## Terminology

| Term | UI Label | Meaning on This Page |
| ------ | ------------- | ----------------------------------------- |
| Generative Mini App | [Generative Mini App] | A mini app with customizable interface and workflow that can invoke Cherry Studio AI capabilities |
| Local Mini App | [Local Mini App] | A mini app type installed as a `.miniapp` package and running in an isolated sandbox |
| Website Mini App | [Website] | A web page opened via URL, without `window.cherry` capabilities |
| Permissions | [Permissions] | The scope of capabilities requested during mini app installation and reviewed by the user |
| Model Slot | [Default Model], [Fast Model] | Two model positions selected by the user for the mini app; the mini app cannot see the provider, model name, or API Key |

## Navigation Path

Use an existing mini app: `[Launchpad] → [Generative Mini Apps] → [Local Mini Apps] → Select a file or enter an installation URL → Review permissions → [Install]`

You can also enter from the Mini Apps page: `[Launchpad] → [Mini Apps] → [Add Mini App] in the top-right corner → [Local Mini Apps]`

Manage installed mini apps: `[Mini Apps] → Right-click the target mini app → [View Details]`

## Procedure

### Install and First Use

{% stepper %}
{% step %}
### Open the Installation Entry

Click [Generative Mini App] in the [Launcher], or go to [Mini Apps] and click [Add Mini App] in the top-right corner. In the popup panel, switch to [Local Mini App].
{% endstep %}

{% step %}
### Select Installation Source

Drag a `.miniapp` package into the installation area, or click [Select File...]. If the developer provides an HTTPS installation URL, you can also paste the URL and click [Load].
{% endstep %}

{% step %}
### Review Permissions

The installation confirmation page displays the mini app name, version, description, and all permissions. Required permissions cannot be unchecked; optional permissions are checked by default, but you can uncheck them before installation or adjust them after installation.

Proceed only if the mini app's purpose matches its permissions and the source is trusted. Mini apps requiring AI typically display [AI Capabilities] → [Chat].
{% endstep %}

{% step %}
### Install and Open

Click [Install]. After installation, the mini app appears in the [Mini Apps] grid; click the icon to run it.
{% endstep %}
{% endstepper %}

### Select AI Models for the Mini App

1. Right-click the target mini app in the [Mini Apps] grid and select [View Details].
2. Switch to [Settings] and find [AI Models].
3. Set [Default Model] and [Fast Model] based on the mini app's purpose. If left blank, they follow Cherry Studio's global default model and global fast model, respectively.
4. Reopen the mini app and trigger an AI operation. If no model is available, the mini app should indicate that AI is temporarily unavailable.

[Default Model] is suitable for main tasks such as long-form generation and complex analysis; [Fast Model] is suitable for low-latency tasks such as title suggestions, short sentence rewriting, and tag extraction. Which slot is used ultimately depends on the mini app's design.

### Create a Minimal Version

A generative mini app is essentially a static web project. The minimal directory requires only two files:

```
my-writer/
├── manifest.json
└── index.html
```

First, create `manifest.json` to declare app information and `ai.chat` permissions:

```json
{
  "id": "com.example.my-writer",
  "name": { "zh": "Inspiration Rewrite", "en": "Rewrite Helper" },
  "description": "Enter a text passage and invoke Cherry Studio's AI model to rewrite it.",
  "version": "1.0.0",
  "entry": "index.html",
  "permissions": ["ai.chat"]
}
```

`id` It is recommended to use a reverse domain format that you control, containing only lowercase letters, numbers, dots, and hyphens. `com.cherrystudio.*` is an officially reserved range; do not use it.

Then, in `index.html`, invoke AI via the global object `cherry`. The example below first confirms that the [Default Model] is available, then displays the streaming text segment by segment:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="/__cherry/theme.css" />
    <title>Inspiration Rewrite</title>
  </head>
  <body>
    <textarea id="source" placeholder="Enter the text to be rewritten"></textarea>
    <button id="rewrite">Start Rewriting</button>
    <pre id="result"></pre>

    <script>
      const button = document.querySelector('#rewrite')
      const source = document.querySelector('#source')
      const result = document.querySelector('#result')

      button.addEventListener('click', async () => {
        const capability = await cherry.ai.getCapabilities({ model: 'default' })
        if (!capability.available) {
          result.textContent = 'Please configure an available model in the mini app details first.'
          return
        }

        result.textContent = ''
        await cherry.ai.chat(
          {
            model: 'default',
            reasoning: 'off',
            messages: [
              { role: 'system', content: 'You are a Chinese editor. Preserve the original meaning and make the expression clearer.' },
              { role: 'user', content: source.value }
            ]
          },
          {
            callId: `rewrite-${Date.now()}`,
            onChunk: (text) => {
              result.textContent += text
            }
          }
        )
      })
    </script>
  </body>
</html>
```

`window.cherry` and `cherry` point to the same set of host interfaces; no SDK needs to be imported. Mini apps can only send text messages; image input and tool calls are currently not supported. It only specifies using the `default` or `quick` slot and does not receive the model name, provider information, or API Key.

### Package and Test

1. Ensure `manifest.json` is located in the project root directory, and the entry file matches `entry`.
2. Execute compression within the project directory; on macOS or Linux, you can use:

```bash
zip -r ../my-writer.miniapp . -x '.*' -x '__MACOSX/*'
```

On Windows PowerShell, you can first generate a ZIP, then change the extension to `.miniapp`:

```powershell
Compress-Archive -Path .\* -DestinationPath ..\my-writer.zip
Rename-Item ..\my-writer.zip my-writer.miniapp
```

3. Select the generated `my-writer.miniapp` in Cherry Studio's [Local Mini App] installation area.
4. Confirm that the installation page only requests expected permissions, then install, open, and test input, AI output, error prompts, and state after re-entry.
5. For debugging, open [Developer Tools] in the mini app toolbar to view page errors and requests blocked by the sandbox.

{% hint style="warning" %}
Do not compress the entire project folder from an outer directory; ensure the root directory of the archive directly contains `manifest.json`. Cherry Studio can also recognize archives wrapped in a single directory layer, but a clear root directory structure makes troubleshooting easier.
{% endhint %}

## Expected Results

After installation, you should see a new icon in the [Mini Apps] grid. When opened, enter text and click the button; the result area will continuously display text returned by the model. Right-click the mini app to enter [View Details], where you can see the requested [AI Capabilities] permissions, the model slots used, and recent call records.

If installation succeeds but AI is unavailable, first check the model in [View Details] → [Settings], then check if [AI Capabilities] → [Chat] is allowed in [Permissions].

## Key Screenshots

<figure><img src="../../../../../assets/e5eba0b497cc060dda3fe81c.webp" alt="Generative mini-program entry in the Launcher"><figcaption><p> The [Generative Mini App] entry in the Launcher. </p></figcaption></figure>

1. Click [Generative Mini App] to open the [Add Mini App] panel.

<figure><img src="../../../../../assets/68bb09ec12fa8bbc76f5056c.webp" alt="File and URL installation entries in the local mini-program installation panel"><figcaption><p> Local mini apps support installation from files or URLs. </p></figcaption></figure>

1. Drag in a `.miniapp` package or click [Select File...].
2. You can also enter the HTTPS installation URL provided by the developer.

<figure><img src="../../../../../assets/de4dd1594767eab1bc306a63.webp" alt="Permissions page in local mini-program details"><figcaption><p> The [Permissions] page lists the host capabilities the mini app is authorized to invoke. </p></figcaption></figure>

1. Verify that authorizations for [AI Capabilities] as well as network, clipboard, files, data, and notifications match the mini app's purpose.

<figure><img src="../../../../../assets/c6d6fce45e39a96b639f24ee.webp" alt="Default model and quick model settings in local mini-program details"><figcaption><p> Manage AI model slots in the mini app details. </p></figcaption></figure>

1. [Default Model] handles the mini app's main AI requests; if left blank, it follows the global default model.
2. [Fast Model] handles low-latency requests specified by the mini app; if left blank, it follows the global fast model.

{% hint style="info" %}
The actual interface and output of the mini app are determined by the mini app itself; the image above uses an official capability test example to illustrate the location of permissions and model management after installation.
{% endhint %}

## Configuration Notes

| Configuration Item | Product Default | Recommended Starting Point | Function | Applicable Scenarios | Notes |
| ----- | --------------------- | ------------------------ | ----------------------- | -------------- | ----------------------- |
| Installation Source | — | Use a local `.miniapp` file for initial testing | Determines installation from a local package or HTTPS URL | Personal testing, team distribution | For third-party mini apps, first verify the publisher, source code, and permissions |
| AI Permissions | Declared by the mini app; optional permissions are checked by default during installation | Grant only the permissions necessary to complete the function | Allows invoking `cherry.ai.chat()` | All AI features | Required permissions cannot be revoked individually; uninstall if you no longer trust the app |
| Default Model | Follows global default model | Use a chat model you have verified as available | Handles main generation and analysis tasks | Long-form, complex instructions, structured output | Calls count toward the usage of the corresponding model service |
| Fast Model | Follows global fast model | Select a faster responding model for short tasks | Handles low-latency tasks | Title rewriting, completion, classification, tag extraction | The mini app must explicitly select `quick` to use it |
| Reasoning Mode | Off if not passed by the mini app | Turn off for ordinary rewriting | Allows models supporting reasoning to perform reasoning first | Complex analysis, planning | Models that do not support switching will ignore this item |
| Theme Style | Follows Cherry Studio light/dark theme | Reference `/__cherry/theme.css` | Uses color variables provided by the host | All custom interfaces | External CDN resources are blocked by the sandbox; they should be packaged into the app |

### Other Capabilities You Can Invoke

| Capability | Purpose | Declaration Method |
| --------------------- | ----------------------- | ---------------------------------- |
| `cherry.storage` | Save settings and state in string form | `storage.*` or specific methods |
| `cherry.file` | Save, read, and export files in the mini app's own sandbox | `file.*` or specific methods |
| `cherry.notification` | Send system notifications via Cherry Studio | `notification.show` |
| `cherry.network` | Access HTTPS domains declared in the manifest | `network.fetch`, and fill in the `network` domain list |
| `cherry.clipboard` | Read and write plain text when the mini app is visible and has keyboard focus | `clipboard.read`, `clipboard.write` |
| `cherry.app` | Read app version, language, and current permissions | No declaration required |

Local mini apps cannot directly use `localStorage`, browser `fetch`, Cookies, popups, or external CDNs. Use `cherry.storage` when you need to save state, and use `cherry.network.fetch` when you need network access, declaring allowed domains in the manifest.

## User Cases

| Scenario | Input | How the Mini App Works | Completion Indicator |
| ------- | ----------- | ------------------------- | -------------- |
| Writing and Rewriting | Draft, tone, and word count requirements | Use [Default Model] to generate body text, use [Fast Model] to provide title alternatives | Can preserve original meaning and quickly switch between different expressions |
| Meeting Minutes Organization | Pasted meeting records | Extract conclusions, owners, and deadlines, output in a fixed format | Each action item has an owner and time field |
| Multilingual Translation | Source text, target language, and glossary | Fix terminology and output format in system messages, display translation in streaming mode | Proper nouns are consistent, paragraph structure is preserved |
| Structured Information Extraction | Contracts, resumes, or feedback text | Require the model to return results in fixed fields, then validate missing items on the page | Required fields are complete, abnormal content is marked |
| Learning Practice | Notes, question types, and difficulty | Generate questions, hints, and explanations, and save progress using sandbox data | Can continue the previous practice after reopening |
| Vertical Workflow | Team templates and business rules | Combine input, AI processing, manual confirmation, and export in one interface | Repetitive tasks can be stably completed following the same process |

{% hint style="warning" %}
The results of generative mini apps are still generated by the selected model. For high-risk uses such as medical, legal, and financial matters, as well as data that affects formal business, review by qualified personnel is mandatory.
{% endhint %}

## FAQ

<details>

<summary> Why can't I invoke Cherry AI after entering a web page URL? </summary>

[Website] is only responsible for opening web pages and does not inject `window.cherry` into the web page. Please create the application as a `.miniapp` package and install it from [Local Mini App].

</details>

<details>

<summary> Can the mini app see my API Key or model provider? </summary>

No. The mini app only requests the [Default Model] or [Fast Model] slot. Cherry Studio executes the calls on its behalf and does not expose the model name, provider information, or API Key to the mini app.

</details>

<details>

<summary> Why does it say AI is unavailable after installation? </summary>

First, open [View Details] → [Settings] and confirm that the corresponding model slot has an available model; then check [Permissions] to ensure [AI Capabilities] → [Chat] is authorized. If the permission is required but you no longer trust the app, please uninstall it directly.

</details>

<details>

<summary> How do I confirm which capabilities the mini app invoked? </summary>

Open [View Details] → [Activity Log]. This records external calls such as AI, network, clipboard, and file exports, as well as rejected calls, but does not record prompts, model replies, clipboard content, or file content.

</details>

<details>

<summary> What is the difference between updating, rolling back, and clearing data? </summary>

Updating preserves sandbox data and requests confirmation again when new permissions are added; you can roll back to the previous version after updating. Clearing data deletes the data and files saved by the mini app but keeps the app; uninstalling deletes the app, authorization, and data simultaneously.

</details>

## References

* [Cherry Studio MiniApps Development Documentation and Community List](https://github.com/CherryHQ/cherry-studio-miniapps/blob/main/README.zh-CN.md)
* [MiniApp Official Reference Documentation](https://github.com/CherryHQ/cherry-studio/tree/main/docs/references/mini-app)
* [Manifest Format](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/manifest.md)
* [Capability Interfaces](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/capabilities.md)
* [Packaging, Updating, and Uninstalling](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/packaging.md)
