---
icon: head-side-gear
---
# Agents

The Agents page is a marketplace and management hub for AI assistants (agents). Whether you're looking for pre-built assistants or creating custom ones, everything happens here.

## What is an Agent?

An **agent** is a pre-configured assistant template that combines:

* **System Prompt** - Custom instructions for specialized behavior
* **Model Selection** - Your preferred AI model
* **Parameter Presets** - Temperature, context window, and other settings
* **Feature Configuration** - Web search, knowledge base, image generation, etc.

Think of agents as "roles" your AI can play: a code expert, a writer, a researcher, etc.

## Interface Overview

### Main Sections

The Agents page is organized into tabs:

* **Discover** - Browse featured and community-created agents
* **My Agents** - View and manage your personal agent library
* **Search Bar** - Find agents by keyword or functionality
* **Quick Filters** - Filter by category, model, or popularity

<figure><img src="../../../../assets/agents-interface.webp" alt="Agents marketplace with discover and my agents tabs"><figcaption>Browse discover agents or manage your library</figcaption></figure>

## Using Pre-built Agents

### Finding an Agent

1. Go to the **Discover** tab
2. Browse agent cards or search for specific keywords
3. Filter by category if needed

### Agent Card Information

Each card displays:

* **Agent Name** - The role or specialty
* **Description** - What the agent does
* **Model Used** - Default AI model (e.g., "GPT-4o")
* **Tags** - Category or skill tags
* **Rating** - Community feedback (optional)
* **Actions** - Use, preview, or add buttons

### Adding an Agent to Chat

**To start using an agent:**

1. Click the agent card or **"Use"** button
2. The agent is added to your assistant list in the Chat page
3. Create a new topic under this agent to start chatting

**Your agent is now ready** - When you switch to this agent in Chat, all its settings (prompt, model, parameters) are automatically applied.

### Previewing an Agent

Click **"Preview"** to view the agent's full configuration before adding:

* System prompt text
* Model and parameters
* Enabled features (web search, knowledge base, etc.)

## Managing Your Agents

### Viewing Your Agents

Go to the **"My Agents"** or **"My"** tab to see:

* All agents you've created
* Agents you've added from Discover
* Your agent library organized and ready to use

### Creating a New Agent

#### Method 1: From the Agents Page

1. Click **"+ Create Agent"** button
2. Fill in the agent details (see form below)
3. Click **"Save"** or **"Save & Use"**

#### Method 2: From the Chat Page

When editing an assistant in Chat, you can also configure agent settings directly.

### Agent Creation Form

#### Basic Information

**Name** - The agent's display name and role
* Examples: "Email Writer", "Code Expert", "Research Assistant"

**Description** - What this agent specializes in (optional but recommended)
* Helps you remember the agent's purpose later
* Shown in Discover if published

**Icon/Avatar** - Optional visual identifier

#### System Prompt

**Prompt** - The core instruction that defines the agent's behavior

Enter detailed instructions like:

```
You are an expert Python developer. Your responses include:
- Clean, well-commented code
- Best practices and optimization tips
- Explanations of why certain approaches are used
```

**Optimization Tip**: Click the **✨ AI Optimize** button in the top-right corner to have an AI improve your prompt wording. This button uses the [Global Default Model](../../pre-basic/settings/default-models.md).

#### Model Configuration

**Default Model** - Which AI model this agent uses
* Can be changed per-conversation in Chat

**Temperature** - Creativity vs. accuracy (0.0-2.0)
* 0.0-0.3: Precise, factual output
* 0.7: Balanced (recommended)
* 0.8-1.0+: Creative, diverse output

**Top P** - Vocabulary diversity (0.0-1.0)

**Context Window** - How many messages to remember (5-20+)

**Max Tokens** - Maximum response length

**Stream Output** - Character-by-character output ("typewriter effect")

#### Advanced Options

**Custom Parameters** - Add provider-specific settings

**Enable Features** - Toggle on/off:
* Web Search
* Knowledge Base
* Image Generation
* MCP Servers

### Editing an Agent

**From My Agents:**
1. Right-click the agent card, or
2. Click the **⋮** (menu) button
3. Select **"Edit"**
4. Modify any settings
5. Click **"Save"**

**From Chat:**
1. Right-click the assistant name in the left sidebar
2. Select **"Edit Assistant"**
3. Make changes
4. Click **"Save"**

### Duplicating an Agent

Make a copy of an existing agent as a starting point:

1. Right-click the agent
2. Select **"Duplicate"**
3. A new agent is created with the same configuration
4. Edit the copy as needed

### Deleting an Agent

**Warning**: This cannot be undone.

1. Right-click the agent
2. Select **"Delete"**
3. Confirm deletion

Existing topics that used this agent are not deleted—they keep their last-used agent settings.

### Publishing Your Agent (Optional)

Share your agent with the community:

1. Open agent settings
2. Click **"Publish to Discover"**
3. Provide description and tags
4. Submit for review (if community moderation is enabled)

**Your agent appears** in the Discover tab for other users to find and use.

## Tips & Best Practices

### Creating Effective Agents

* **Be specific** - Narrow focus beats vague generality
* **Test your prompt** - Try the agent in a few conversations before finalizing
* **Use examples** - Include example inputs/outputs in your system prompt
* **Name clearly** - "Email Writer" is better than "Helper #3"
* **Document use cases** - Add description so you remember when to use it

### Example Agents

| Agent | Prompt | Use Case |
|-------|--------|----------|
| **Email Writer** | "You are a professional business email writer..." | Drafting professional emails |
| **Code Reviewer** | "You are an expert code reviewer focusing on..." | Reviewing pull requests |
| **Research Assistant** | "You are a thorough researcher who..." | Gathering and summarizing information |
| **Creative Writer** | "You are a creative fiction writer with..." | Brainstorming and story writing |

### Keyword Search Tips

* Search for **model names**: "GPT-4", "Claude"
* Search for **tasks**: "email", "code", "research"
* Search for **styles**: "creative", "technical", "casual"

## Keyboard Shortcuts

* **Ctrl+Shift+A** (Windows) / **Cmd+Shift+A** (Mac) - Open Agents page
* **Enter** - Use selected agent
* **Delete** - Remove agent (from My Agents)

## Related

* [Chat Interface](./chat.md) - How to use agents in conversations
* [Assistant Settings](./chat.md#assistant-settings) - Detailed parameter explanations