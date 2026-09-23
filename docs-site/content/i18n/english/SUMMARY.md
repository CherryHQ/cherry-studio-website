# Table of contents

## Desktop

* **Getting Started**
  * [Project Introduction](README.md)
  * [Quick Start](getting-started/quick-start.md)
  * [Installation Tutorial](cherry-studio/installation/README.md)
    * [Windows](cherry-studio/installation/windows.md)
    * [macOS](cherry-studio/installation/macos.md)
    * [Linux](cherry-studio/installation/linux.md)
    * [Upgrade and Downgrade](cherry-studio/installation/upgrade-downgrade.md)
      * [Breaking Update Notice](cherry-studio/installation/v2-breaking-update-notice.md)
      * [Feature Differences](cherry-studio/installation/v1-v2-feature-differences.md)
      * [Upgrading from V1 to V2](cherry-studio/installation/v1-to-v2-migration.md)
      * [Downgrading from V2 to V1](cherry-studio/installation/v2-to-v1-downgrade.md)

* **Feature Guides**
  * [Features Overview](cherrystudio/preview/README.md)
    * [Launchpad](cherrystudio/preview/launchpad.md)
    * [Chat Interface](cherrystudio/preview/chat.md)
    * [Cherry Agent Usage Tutorial](advanced-basic/agent.md)
    * [Painting](cherrystudio/preview/drawing.md)
    * [Translation](cherrystudio/preview/translation.md)
    * [Mini Apps](cherry-studio/preview/app/README.md)
      * [Generative Mini Apps](cherry-studio/preview/app/generative-mini-apps.md)
    * [Knowledge Base](cherrystudio/preview/knowledge-base.md)
    * [Files](cherrystudio/preview/files.md)
    * [Code Mate](cherrystudio/preview/code-cli.md)
    * [Notes](cherrystudio/preview/notes.md)
    * [Quick Assistant](cherrystudio/preview/quick-assistant.md)
    * [Selection Assistant](cherrystudio/preview/selection-assistant.md)

* **Models & Settings**
  * [Model Service Configuration](pre-basic/providers/README.md)
    * [All Providers Quick Reference](pre-basic/providers/quick-reference.md)
    * [Model Service Settings](pre-basic/settings/providers.md)
    * **Recommended & Free**
      * [CherryAI (Free)](pre-basic/providers/cherryai/README.md)
      * [CherryIN](pre-basic/providers/cherryin-1.md)
    * **International Providers**
      * [OpenAI](pre-basic/providers/openai.md)
      * [Anthropic](pre-basic/providers/anthropic.md)
      * [Azure OpenAI](pre-basic/providers/azure-openai.md)
      * [Google Gemini](pre-basic/providers/google-gemini.md)
      * [Grok](pre-basic/providers/grok.md)
      * [Mistral](pre-basic/providers/mistral.md)
      * [Perplexity](pre-basic/providers/perplexity.md)
      * [Groq](pre-basic/providers/groq.md)
    * **Chinese Providers**
      * [DeepSeek](pre-basic/providers/deepseek.md)
      * [ZhiPu](pre-basic/providers/zhipu.md)
      * [Moonshot AI (Kimi)](pre-basic/providers/moonshot.md)
      * [MiniMax](pre-basic/providers/minimax.md)
      * [SiliconFlow](pre-basic/providers/siliconcloud.md)
    * **Gateways & Custom Providers**
      * [OpenRouter](pre-basic/providers/openrouter.md)
      * [NewAPI](pre-basic/providers/newapi.md)
      * [Custom AI Service Provider](pre-basic/providers/zi-ding-yi-fu-wu-shang.md)
    * **Local & Developer Services**
      * [Ollama](pre-basic/providers/ollama.md)
      * [LM Studio](pre-basic/providers/lm-studio.md)
      * [GitHub Copilot](pre-basic/providers/github-copilot.md)
      * [MiniMax Coding Plan](pre-basic/providers/minimax-coding-plan.md)
  * [Settings](pre-basic/settings/README.md)
    * **Models**
      * [Default Model Settings](pre-basic/settings/default-models.md)
      * [Local Models](pre-basic/settings/local-models.md)
    * **Tools & Web Search**
      * [Network Access](pre-basic/websearch/README.md)
        * [Free Internet Mode](pre-basic/websearch/free-search.md)
        * [Web Search Blacklist Configuration](pre-basic/websearch/blacklist.md)
        * [SearXNG Local Deployment and Configuration](pre-basic/websearch/searxng.md)
      * [Document Processing](pre-basic/settings/doc-process.md)
      * [OCR](pre-basic/settings/ocr.md)
    * **Appearance & Productivity**
      * [Display Settings](pre-basic/settings/display.md)
        * [Custom CSS](pre-basic/personalization-settings/custom-css.md)
        * [Clear CSS Settings](pre-basic/personalization-settings/clear-css.md)
      * [Notifications](pre-basic/settings/notification.md)
      * [Usage Statistics](pre-basic/settings/usage.md)
      * [Shortcut Settings](pre-basic/settings/key-shortcut.md)
    * **Data & Integrations**
      * [Data Settings](pre-basic/data-settings/README.md)
        * [WebDAV Backup](pre-basic/data-settings/webdav.md)
        * [S3 Compatible Storage Backup](pre-basic/data-settings/s3-compatible.md)
        * [Notion Configuration Tutorial](pre-basic/data-settings/notion.md)
        * [Obsidian Configuration Tutorial](pre-basic/data-settings/obsidian.md)
        * [Siyuan Notes Configuration Tutorial](pre-basic/data-settings/siyuan.md)
        * [Change Storage Location](pre-basic/personalization-settings/storage.md)
    * **System**
      * [General Settings](pre-basic/settings/general.md)
      * [Environment Dependencies](pre-basic/settings/env-dependencies.md)

* **Knowledge Base**
  * **Getting Started**
    * [Getting Started with Knowledge Bases](knowledge-base/knowledge-base.md)
    * [Create a Knowledge Base](knowledge-base/create.md)
    * [Adding and Organizing Sources](knowledge-base/sources.md)
    * [Verify Sources and Recall](knowledge-base/recall-test.md)
  * **Using Knowledge Bases**
    * [Using in Chat](knowledge-base/chat.md)
    * [Using with Agent](knowledge-base/agent.md)
    * [Knowledge Base Application Cases](knowledge-base/cases.md)
  * **Configuration & Troubleshooting**
    * [Embedding Model Reference Information](knowledge-base/emb-models-info.md)
    * [Knowledge Base Document Preprocessing](knowledge-base/document-preprocessing.md)
    * [Data Storage Instructions](knowledge-base/data.md)
    * [FAQ](knowledge-base/troubleshooting.md)

* **Advanced Workflows**
  * [Advanced Capability Map](advanced-basic/capability-map.md)
  * [Advanced Chat](advanced-basic/chat/README.md)
    * [Multi-Model Comparison and Message Branching](advanced-basic/chat/model-compare-branches.md)
    * [Long Conversations, Context, and Message Queues](advanced-basic/chat/context-queue.md)
    * [Artifacts, Citations, and Export](advanced-basic/chat/artifacts-export.md)
  * [Agent Workspace](advanced-basic/agent-workspace/README.md)
    * [Creating Agents and Model Roles](advanced-basic/agent-workspace/create-agent.md)
    * [Working Directory, Tasks, and Files](advanced-basic/agent-workspace/workspaces-tasks-files.md)
    * [Model Roles and Agent Image Generation](advanced-basic/agent-workspace/models-image.md)
    * [Built-in Tools, Knowledge Bases, Skills, and MCP](advanced-basic/agent-workspace/tools-knowledge-skills-mcp.md)
    * [Permissions, Memory, and Background Tasks](advanced-basic/agent-workspace/permissions-memory-background.md)
  * [Knowledge and Content Workflow](advanced-basic/knowledge-content/README.md)
    * [Building Knowledge Bases and Recall Testing](advanced-basic/knowledge-content/knowledge-base.md)
    * [Notes, Knowledge Base, and Agent](advanced-basic/knowledge-content/notes-knowledge-agent.md)
    * [Image Generation, Editing, and Enhancement](advanced-basic/knowledge-content/painting-workflow.md)
    * [File, Image, and Long-Text Translation](advanced-basic/knowledge-content/translation-workflow.md)
  * [Extending Agent Capabilities](advanced-basic/extensions/README.md)
    * [Skills and Capability Library](advanced-basic/extensions/skills.md)
    * [MCP and External Tools](advanced-basic/extensions/mcp/README.md)
      * [MCP Troubleshooting](advanced-basic/extensions/mcp/troubleshooting.md)
  * [Automation and External Triggers](advanced-basic/automation/README.md)
    * [Channels](advanced-basic/automation/channels.md)
    * [Scheduled Tasks, Heartbeats, and Run History](advanced-basic/automation/scheduled-heartbeat.md)
  * [Efficient Workbench](advanced-basic/workbench/README.md)
    * [Multi-Window and Tabs](advanced-basic/workbench/multi-window-tabs.md)
    * [Input Toolbar and Efficiency Tools](advanced-basic/workbench/composer-efficiency.md)
    * [Global Search](advanced-basic/workbench/global-search.md)
    * [Screenshot, Annotation, and OCR](advanced-basic/workbench/screenshot-ocr.md)
  * [Development and Diagnostics](advanced-basic/developer-tools/README.md)
    * [API Gateway](advanced-basic/developer-tools/api-gateway.md)
    * [Trace and Developer Mode](advanced-basic/developer-tools/trace.md)
    * [Code Mate (Code CLI)](advanced-basic/developer-tools/code-cli.md)
  * [Application Cases](advanced-basic/cases/README.md)
    * [Multi-Model Research Review](advanced-basic/cases/research-review.md)
    * [Long Document Review](advanced-basic/cases/long-document-review.md)
    * [Agent Project File Delivery](advanced-basic/cases/project-delivery.md)
    * [Brand Image Kit](advanced-basic/cases/brand-image-kit.md)
    * [Private Knowledge Base Q&A](advanced-basic/cases/private-knowledge-qa.md)
    * [Notes to Weekly Report](advanced-basic/cases/notes-weekly-report.md)
    * [Multilingual Material Preparation](advanced-basic/cases/multilingual-materials.md)
    * [Channels and Scheduled Daily Reports](advanced-basic/cases/automated-daily-report.md)
    * [Multi-Window Research Workbench](advanced-basic/cases/multi-window-research.md)

## Mobile

* **Getting Started**
  * [Mobile Overview](mobile/README.md)
  * [Download and Installation](mobile/installation.md)
  * [Quick Start](mobile/quick-start.md)
* **Feature Guides**
  * [Providers and Models](mobile/providers-and-models.md)
  * [Chat and Files](mobile/chat-and-files.md)
  * [Agents and Tools](mobile/agents-and-tools.md)
  * [Image Generation](mobile/image-generation.md)
* **Settings & Support**
  * [Data, Privacy, and Permissions](mobile/data-privacy.md)
  * [Troubleshooting](mobile/troubleshooting.md)

## Help & Troubleshooting

* [Common Issues](question-contact/questions.md)
* [Effective Questioning Methods](question-contact/ask.md)
* [Feedback & Suggestions](question-contact/suggestions.md)

## Resources & Project

* **Reference**
  * [Knowledge Popularization](question-contact/knowledge.md)
  * [Model List](other/model_rank/README.md)
    * [Agent Leaderboard](other/model_rank/agent.md)
    * [Text Leaderboard](other/model_rank/text.md)
    * [Search Leaderboard](other/model_rank/search.md)
    * [Vision Leaderboard](other/model_rank/vision.md)
    * [Code / Web Development Leaderboard](other/model_rank/code-webdev.md)
    * [Text-to-Image Leaderboard](other/model_rank/text-to-image.md)
* **Project & About**
  * [Contribute Code](contribution/code.md)
  * [Contribute to Documentation](contribution/docs.md)

## Cooperation & Policies

* [Business Cooperation](contact-us/questions.md)
* [Privacy Policy](about/privacypolicy.md)
* [Open Source License](contact-us/questions/license.md)
