---
description: Data Settings → Obsidian Configuration
icon: gem
---
# Obsidian Configuration Tutorial

Cherry Studio supports integration with Obsidian, allowing you to export full conversations or single conversation entries to your Obsidian vault.

{% hint style="warning" %}
This process does not require installing additional Obsidian plugins. However, since Cherry Studio's import to Obsidian works similarly to Obsidian Web Clipper, it is recommended that users upgrade Obsidian to the latest version (current Obsidian version should be at least greater than **1.7.2**), to avoid [import failures if the conversation is too long](https://github.com/obsidianmd/obsidian-clipper/releases/tag/0.7.0).
{% endhint %}

## Latest Tutorial

{% hint style="info" %}
Compared to the old version of exporting to Obsidian, the new export to Obsidian feature can automatically select the vault path, eliminating the need to manually enter the vault name and folder name.
{% endhint %}

### Step One: Configure Cherry Studio

Open Cherry Studio's _Settings_ → _Data Settings_ → _Obsidian Settings_ menu. The dropdown box will automatically display the names of Obsidian vaults opened on this machine. Select your target Obsidian vault:

<figure><img src="../../../assets/449d1a8ce3c2bcc5f7e7158f.webp" alt=""><figcaption></figcaption></figure>

### Step Two: Export Conversation

<a id="dao-chu-wan-zheng-dui-hua"></a>

#### Export Full Conversation

Return to Cherry Studio's conversation interface, right-click on the conversation, select _Export_, and click _Export to Obsidian_:

<figure><img src="../../../assets/ceedc9e8d1dabc9d39035c30.webp" alt=""><figcaption></figcaption></figure>

At this point, a window will pop up, allowing you to adjust the **Properties** of the conversation note to be exported to Obsidian, the **folder location** within Obsidian, and the **processing method** for exporting to Obsidian:

*   **Vault**: Click the dropdown menu to select other Obsidian vaults
*   **Path**: Click the dropdown menu to select the folder for storing the exported conversation notes
*   As Obsidian note properties (Properties):
    *   Tags (tags)
    *   Created time (created)
    *   Source (source)
*   There are three available **processing methods** for exporting to Obsidian:
*   There are three available **processing methods** for exporting to Obsidian:
    *   **Create new (overwrite if exists)**: Create a new conversation note in the `folder` specified in the **Path**. If a note with the same name exists, it will overwrite the old note.
    *   **Prepend**: If a note with the same name already exists, export the selected conversation content and add it to the beginning of that note.
    *   **Append**: If a note with the same name already exists, export the selected conversation content and add it to the end of that note.

{% hint style="info" %}
Only the first method includes Properties, while the latter two methods do not.
{% endhint %}

<figure><img src="../../../assets/f0b3dbe0fb29172b330958e5.webp" alt=""><figcaption><p>Configure note properties</p></figcaption></figure>

<figure><img src="../../../assets/cb66a0409ef6e24286102647.webp" alt=""><figcaption><p>Select path</p></figcaption></figure>

<figure><img src="../../../assets/15f4032a3a159c08df6cf1b3.webp" alt=""><figcaption><p>Select processing method</p></figcaption></figure>

After selecting all options, click OK to export the full conversation to the corresponding Obsidian vault's folder.

#### Export Single Conversation Entry

For exporting a single conversation entry, click the _three-bar menu_ below the conversation, select _Export_, and click _Export to Obsidian_:

<figure><img src="../../../assets/6851b3aa7d82a4a919e2e8b0.webp" alt=""><figcaption><p>Export single conversation entry</p></figcaption></figure>

A window similar to the one for exporting a full conversation will then appear, asking you to configure the **note properties** and **note processing method**. Follow the [tutorial above](obsidian.md#dao-chu-wan-zheng-dui-hua) to complete it.

### Export Successful

🎉 Congratulations! You have now completed all configurations for Cherry Studio to integrate with Obsidian and have successfully gone through the export process. Enjoy yourselves!

<figure><img src="../../../assets/6fce517b2e745598598db14c.webp" alt=""><figcaption><p>Export to Obsidian</p></figcaption></figure>

<figure><img src="../../../assets/0ea57dab41aa40f6e0298917.webp" alt=""><figcaption><p>View export results</p></figcaption></figure>

***

## Old Tutorial (for Cherry Studio < v1.1.13)

<a id="di-yi-bu"></a>

### Step One: Prepare Obsidian

Open your Obsidian vault and create a `folder` to save exported conversations (using 'Cherry Studio' folder as an example in the image):

<figure><img src="../../../assets/a492ac55a35d0e0afc9e33a9.webp" alt=""><figcaption></figcaption></figure>

Pay attention to the text highlighted in the bottom left corner; this is your `vault` name.

<a id="di-er-bu"></a>

### Step Two: Configure Cherry Studio

In Cherry Studio's _Settings_ → _Data Settings_ → _Obsidian Settings_ menu, enter the `vault` name and `folder` name obtained in [Step One](obsidian.md#di-yi-bu):

<figure><img src="../../../assets/e7da08d7e70d410c2ae09fee.webp" alt=""><figcaption></figcaption></figure>

`Global tags` is optional and can be set for all exported conversations in Obsidian. Fill it in as needed.

### Step Three: Export Conversation

<a id="dao-chu-wan-zheng-dui-hua-old"></a>

#### Export Full Conversation

Return to Cherry Studio's conversation interface, right-click on the conversation, select _Export_, and click _Export to Obsidian_.

<figure><img src="../../../assets/c8b256177ded017f9beaf29c.webp" alt=""><figcaption><p>Export full conversation</p></figcaption></figure>

At this point, a window will pop up, allowing you to adjust the **Properties** of the conversation note to be exported to Obsidian, as well as the **processing method** for exporting to Obsidian. There are three available **processing methods** for exporting to Obsidian:

*   **Create new (overwrite if exists)**: Create a new conversation note in the `folder` specified in [Step Two](obsidian.md#di-er-bu). If a note with the same name exists, it will overwrite the old note.
*   **Prepend**: If a note with the same name already exists, export the selected conversation content and add it to the beginning of that note.
*   **Append**: If a note with the same name already exists, export the selected conversation content and add it to the end of that note.

<figure><img src="../../../assets/23b06f100f14cffe09a12878.webp" alt=""><figcaption><p>Configure note properties</p></figcaption></figure>

{% hint style="info" %}
Only the first method includes Properties, while the latter two methods do not.
{% endhint %}

#### Export Single Conversation Entry

For exporting a single conversation entry, click the _three-bar menu_ below the conversation, select _Export_, and click _Export to Obsidian_.

<figure><img src="../../../assets/53a5477e29c3e58af139fe15.webp" alt=""><figcaption><p>Export single conversation entry</p></figcaption></figure>

A window similar to the one for exporting a full conversation will then appear, asking you to configure the **note properties** and **note processing method**. Follow the [tutorial above](obsidian.md#dao-chu-wan-zheng-dui-hua-old) to complete it.

### Export Successful

🎉 Congratulations! You have now completed all configurations for Cherry Studio to integrate with Obsidian and have successfully gone through the export process. Enjoy yourselves!

<figure><img src="../../../assets/f8e9cc3ee98ab984dcf8b397.webp" alt=""><figcaption><p>Export to Obsidian</p></figcaption></figure>

<figure><img src="../../../assets/0ea57dab41aa40f6e0298917.webp" alt=""><figcaption><p>View export results</p></figcaption></figure>