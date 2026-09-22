---
icon: message
---
# Chat Interface

## Overview

The Chat interface is your main workspace for conversing with AI assistants. It combines powerful organization with an intuitive layout, allowing you to manage multiple conversations under different assistants.

## Interface Layout

### Top Navigation Bar

The top bar displays:

* **Assistant Selector** - Click to switch between different assistants (each with their own system prompts and settings)
* **Topic Tabs** - Shows current active topic and related files/data sources connected to this conversation
* **Quick Actions** - Search, menu, and additional controls

<figure><img src="../../../../assets/chat-header.webp" alt="Chat interface header with assistant selector and topic tabs"><figcaption>Select assistants and manage topics from the top navigation</figcaption></figure>

### Welcome Screen

When starting a new topic, you'll see:

* A friendly emoji 😊
* Prompt text: "What should we talk about today?"
* An empty message area ready for your first input

This guides users to begin their conversation naturally.

### Input Area

The bottom section contains:

* **Message Input Box** - Type your message here with `Press Enter to send, Type 'for text and actions, or reference topics'`
* **Tool Bar (left side)** - Quick access buttons for:
  * Upload files/images
  * Attach files
  * Add custom tools
* **Model Selector (right side)** - Switch between models mid-conversation while retaining context
* **Keyboard Shortcuts** - Visible hints showing `⌥↑` (previous) and `⌥↓` (next)

## Concepts

### Assistant

An `assistant` is a personalized conversation template that includes:

* **System Prompt** - Custom instructions that guide the model's behavior
* **Model Settings** - Temperature, top-p, context window, and other parameters
* **Default Model** - Which AI model to use by default
* **Capabilities** - Enabled features like web search, knowledge base, image generation, etc.

The `System Default Assistant` comes with general parameters and no custom prompt. For specialized assistants, check the [Agents page](agents.md).

### Topic

A `topic` is an individual conversation within an assistant. Key points:

* **Multiple topics under one assistant** - Each topic is a separate conversation thread
* **Shared settings** - All topics under an assistant inherit the same prompt and model settings
* **Independent history** - Each topic has its own message history
* **Quick switching** - Use the topic tabs to jump between conversations

For example, you might have an "Email Writer" assistant with separate topics for "Marketing Email", "Customer Reply", and "Newsletter Draft".

## Working with Topics

### Creating a New Topic

1. Click the **"+"** icon in the top navigation, or
2. Right-click the assistant name and select "New Topic"

The new topic inherits all settings from its parent assistant.

### Switching Topics

* Click topic tabs at the top to switch between conversations
* Use keyboard shortcut `⌥↑` (up) or `⌥↓` (down) to navigate between topics
* Context is preserved when switching

### Topic Menu

Right-click a topic tab to:

* Rename the topic
* Delete the topic
* Duplicate the topic
* Export conversation history

## Input Box Tools

The toolbar at the bottom of the input box provides quick access to common features:

### File Management

| Icon | Function | Details |
|------|----------|---------|
| 📎 | **Attach File** | Upload documents (PDF, Word, Markdown, etc.) for the model to reference. Documents are automatically parsed into text. |
| 🖼️ | **Attach Image** | Upload images for vision-capable models to analyze and describe. |
| ➕ | **Add Tool** | Enable additional capabilities like web search, knowledge base, or MCP servers for this topic. |

### Model Selection

The **right side** of the input box displays:

* **Current Model** - Shows which model is active (e.g., "Default")
* **Quick Switch** - Click to change models mid-conversation without losing context

### Keyboard Shortcuts

Visible hints show:

* **⌥↑** - Jump to previous topic
* **⌥↓** - Jump to next topic
* **Enter** - Send message
* **Shift+Enter** - Newline in input box

## Message Input Tips

* **Long texts** - Use the expand button (🔧) to open a larger editor for composing longer messages
* **Code blocks** - Paste code with syntax highlighting support
* **Markdown** - Format your messages using Markdown (when enabled in settings)
* **Paste as file** - Long text pastes can auto-convert to file attachments to reduce clutter

<a id="dui-hua-she-zhi"></a>

## Chat Settings

<figure><img src="../../../../assets/chat-settings.webp" alt="Chat settings panel"><figcaption></figcaption></figure>

Settings apply either to this topic only or globally to all topics. Changes take effect immediately.

### Message Display Settings

#### <mark style="color:blue;">**`Message Separator`**</mark>

Use a visual separator between message content and action buttons.

{% tabs %}
{% tab title="Enabled" %}
Clean separation between message and actions.
{% endtab %}

{% tab title="Disabled" %}
Compact view without separator line.
{% endtab %}
{% endtabs %}

#### <mark style="color:blue;">**`Message Style`**</mark>

Choose how messages appear:

* **Bubble** - Chat bubble style (like messaging apps)
* **List** - Compact list style

#### <mark style="color:blue;">**`Use Serif Font`**</mark>

Toggle between serif and sans-serif fonts for message text. Can also be customized via [Custom CSS](../../personalization-settings/).

#### <mark style="color:blue;">**`Message Font Size`**</mark>

Adjust the font size of displayed messages.

### Code Display Settings

#### <mark style="color:blue;">**`Display Line Numbers for Code`**</mark>

Show/hide line numbers in code blocks when the model outputs code.

{% tabs %}
{% tab title="Enabled" %}
<figure><img src="../../../../assets/code-with-numbers.webp" alt="Code with line numbers"><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Disabled" %}
<figure><img src="../../../../assets/code-without-numbers.webp" alt="Code without line numbers"><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

#### <mark style="color:blue;">**`Collapsible Code Blocks`**</mark>

Long code blocks automatically collapse if they exceed a certain length, with an expand button to view full content.

#### <mark style="color:blue;">**`Code Block Word Wrap`**</mark>

Long lines of code automatically wrap instead of creating horizontal scrollbars.

#### <mark style="color:blue;">**`Code Style`**</mark>

Choose the syntax highlighting theme for code blocks (Dracula, GitHub, etc.).

### Advanced Settings

#### <mark style="color:blue;">**`Auto-collapse Thinking Content`**</mark>

For models that support reasoning (like o1, Claude with extended thinking), automatically collapse the thinking process after completion to focus on the final answer.

#### <mark style="color:blue;">**`Math Formula Engine`**</mark>

Choose how mathematical formulas are rendered:

* **KaTeX** - Faster, optimized for performance
* **MathJax** - More comprehensive, supports more math symbols and commands

### Input Box Settings

#### <mark style="color:blue;">**`Show Estimated Token Count`**</mark>

Display the approximate number of tokens consumed by your input text (for reference only; actual consumption may vary).

#### <mark style="color:blue;">**`Paste Long Text as File`**</mark>

When pasting large amounts of text, automatically convert to file attachment to keep the input box clean.

#### <mark style="color:blue;">**`Markdown Render Input Messages`**</mark>

Render Markdown formatting in your sent messages, not just in model replies.

{% tabs %}
{% tab title="Disabled" %}
Plain text display of sent messages
{% endtab %}

{% tab title="Enabled" %}
Markdown formatting visible in sent messages
{% endtab %}
{% endtabs %}

#### <mark style="color:blue;">**`Translate by Tapping Space 3 Times`**</mark>

Press space three times rapidly to translate input text to English. ⚠️ **Note**: This overwrites your original text.

#### <mark style="color:blue;">**`Target Language`**</mark>

Set the target language for translation features.


## Assistant Settings

To customize an assistant, right-click its name in the left sidebar and select **"Edit Assistant"**.

<figure><img src="../../../../assets/assistant-settings.webp" alt="Assistant settings menu"><figcaption>Right-click assistant to access settings</figcaption></figure>

{% hint style="info" %}
Assistant settings apply to **all topics** under that assistant. Topic-specific settings override these defaults.
{% endhint %}

### Basic Information

#### <mark style="color:blue;">**`Name`**</mark>

The display name for this assistant. Choose something descriptive for easy identification (e.g., "Email Writer", "Code Helper", "Research Assistant").

#### <mark style="color:blue;">**`Prompt`**</mark>

The system prompt that guides the model's behavior. This is the core instruction that makes the assistant specialized.

**Examples:**
- Email writer: "You are an expert business email writer..."
- Code helper: "You are an expert programmer..."
- Research assistant: "You are a thorough research assistant..."

### Model Configuration

#### <mark style="color:blue;">**`Default Model`**</mark>

Which AI model this assistant uses by default. When you:

* Create a new topic under this assistant, it uses this model
* Copy this assistant, the copied version has this model
* Don't set this, the global default model is used instead

**Note**: Each assistant can have its own preferred model, independent from the global setting.

#### <mark style="color:blue;">**`Auto-reset Model`**</mark>

**When enabled:** New topics under this assistant always use the default model, even if you switched models in the previous topic.

**When disabled:** New topics inherit the model used in the last topic of that assistant.

**Example:**
- Default model: GPT-3.5
- You create Topic 1 and switch to GPT-4 mid-conversation
- **If enabled:** Topic 2 starts with GPT-3.5
- **If disabled:** Topic 2 starts with GPT-4

### Model Parameters

These parameters control how the model generates responses:

#### <mark style="color:blue;">**`Temperature`**</mark> (0.0 - 2.0)

Controls randomness and creativity:

| Value | Behavior | Best For |
|-------|----------|----------|
| 0.0 - 0.3 | Deterministic, focused output | Code, data analysis, technical writing |
| 0.4 - 0.7 | Balanced creativity & coherence | General conversation, writing |
| 0.8 - 1.0+ | Creative, diverse output | Brainstorming, creative writing |

**Default**: 0.7

#### <mark style="color:blue;">**`Top P (Nucleus Sampling)`**</mark> (0.0 - 1.0)

Controls vocabulary diversity:

| Value | Behavior | Best For |
|-------|----------|----------|
| 0.1 - 0.3 | Conservative, limited vocabulary | Documentation, technical comments |
| 0.4 - 0.6 | Balanced diversity | General conversation, normal writing |
| 0.7 - 1.0 | Diverse, rich vocabulary | Creative writing, varied expression |

**Default**: 1.0

{% hint style="info" %}
**Combining parameters**: Use Temperature for creativity control and Top P for vocabulary diversity. Experiment to find the best combination for your use case.
{% endhint %}

#### <mark style="color:blue;">**`Context Window`**</mark>

How many previous messages the model can "remember":

| Setting | Memory | Use Case |
|---------|--------|----------|
| 5-10 | Recent messages only | Casual conversation |
| 11-20 | Extended memory | Complex multi-step tasks |
| 20+ | Long conversation history | Tasks requiring detailed context |

**Trade-off**: More context = better coherence but higher token usage (costs more).

#### <mark style="color:blue;">**`Max Tokens (MaxToken)`**</mark>

Maximum length of each model response:

| Value | Output Length | Use Case |
|-------|---------------|----------|
| 500-800 | Short | Quick answers, chat |
| 800-2000 | Medium | Article writing |
| 2000-4000 | Long | Code generation, essays |
| 4000+ | Very long | Research papers, long-form content |

**Note**: Some models have caps (e.g., 32k max). Check the model's documentation for limits.

#### <mark style="color:blue;">**`Stream Output`**</mark>

**When enabled**: Model output appears character-by-character ("typewriter effect") for real-time feedback.

**When disabled**: Model generates the complete response, then shows it all at once.

**Note**: Some models (like `o1-mini` initially) don't support streaming; disable for those.

### Advanced Options

#### <mark style="color:blue;">**`Custom Parameters`**</mark>

Add provider-specific parameters not covered by the built-in settings. Format:

```
Parameter Name — Type (text/number) — Value
```

**Examples:**
- `presence_penalty — number — 0.5`
- `frequency_penalty — number — 0.2`

**Priority**: Custom parameters override built-in settings if they conflict.

**Reference**: Consult your model provider's API documentation for available parameters.

### Backup & Export

* **Duplicate** - Clone this assistant with all settings
* **Export** - Save assistant configuration as a file for backup or sharing