# Table of contents

## Bureau

* **Bien démarrer**
  * [Présentation du projet](README.md)
  * [Démarrage rapide](getting-started/quick-start.md)
  * [Guide d'installation](cherry-studio/installation/README.md)
    * [Windows](cherry-studio/installation/windows.md)
    * [macOS](cherry-studio/installation/macos.md)
    * [Linux](cherry-studio/installation/linux.md)
    * [Mise à niveau et rétrogradation](cherry-studio/installation/upgrade-downgrade.md)
      * [Avertissement de mise à jour majeure](cherry-studio/installation/v2-breaking-update-notice.md)
      * [Différences fonctionnelles](cherry-studio/installation/v1-v2-feature-differences.md)
      * [Migration de V1 à V2](cherry-studio/installation/v1-to-v2-migration.md)
      * [Rétrogradation de V2 à V1](cherry-studio/installation/v2-to-v1-downgrade.md)

* **Guide des fonctionnalités**
  * [Aperçu des fonctionnalités](cherrystudio/preview/README.md)
    * [Launchpad](cherrystudio/preview/launchpad.md)
    * [Interface de conversation](cherrystudio/preview/chat.md)
    * [Guide d'utilisation de Cherry Agent](advanced-basic/agent.md)
    * [Peinture](cherrystudio/preview/drawing.md)
    * [Traduction](cherrystudio/preview/translation.md)
    * [Mini-apps](cherry-studio/preview/app/README.md)
      * [Mini-apps génératives](cherry-studio/preview/app/generative-mini-apps.md)
    * [Base de connaissances](cherrystudio/preview/knowledge-base.md)
    * [Documents](cherrystudio/preview/files.md)
    * [Compagnon de codage](cherrystudio/preview/code-cli.md)
    * [Notes](cherrystudio/preview/notes.md)
    * [Assistant Rapide](cherrystudio/preview/quick-assistant.md)
    * [Assistant de sélection](cherrystudio/preview/selection-assistant.md)

* **Modèles et paramètres**
  * [Configuration du service de modèle](pre-basic/providers/README.md)
    * [Référence rapide de tous les Providers](pre-basic/providers/quick-reference.md)
    * [Configuration du service de modèles](pre-basic/settings/providers.md)
    * **Services recommandés et gratuits**
      * [CherryAI (gratuit)](pre-basic/providers/cherryai/README.md)
      * [CherryIN](pre-basic/providers/cherryin-1.md)
    * **Fournisseurs internationaux**
      * [OpenAI](pre-basic/providers/openai.md)
      * [Anthropic](pre-basic/providers/anthropic.md)
      * [Azure OpenAI](pre-basic/providers/azure-openai.md)
      * [Google Gemini](pre-basic/providers/google-gemini.md)
      * [Vertex AI](pre-basic/providers/vertex-ai.md)
      * [Grok](pre-basic/providers/grok.md)
      * [Mistral](pre-basic/providers/mistral.md)
      * [Perplexity](pre-basic/providers/perplexity.md)
      * [Groq](pre-basic/providers/groq.md)
    * **Fournisseurs disponibles en Chine**
      * [DeepSeek](pre-basic/providers/deepseek.md)
      * [ZhiPu](pre-basic/providers/zhipu.md)
      * [Moonshot AI (Kimi)](pre-basic/providers/moonshot.md)
      * [MiniMax](pre-basic/providers/minimax.md)
      * [Guide d'intégration de la plateforme ModelScope (ModelScope)](pre-basic/providers/modelscope.md)
      * [PPIO 派欧云](pre-basic/providers/ppio.md)
      * [Alibaba Cloud Bailian](pre-basic/providers/aliyun-bailian.md)
      * [SiliconFlow](pre-basic/providers/siliconcloud.md)
      * [ByteDance (Doubao)](pre-basic/providers/doubao.md)
    * **Passerelles et fournisseurs personnalisés**
      * [OpenRouter](pre-basic/providers/openrouter.md)
      * [NouvelleAPI](pre-basic/providers/newapi.md)
      * [OneAPI](pre-basic/providers/oneapi.md)
      * [Fournisseurs Personnalisés](pre-basic/providers/custom-provider.md)
    * **Services locaux et développeur**
      * [Ollama](pre-basic/providers/ollama.md)
      * [LM Studio](pre-basic/providers/lm-studio.md)
      * [GitHub Copilot](pre-basic/providers/github-copilot.md)
      * [Plan de codage MiniMax](pre-basic/providers/minimax-coding-plan.md)
  * [Configuration](pre-basic/settings/README.md)
    * **Modèles**
      * [Paramètres des modèles par défaut](pre-basic/settings/default-models.md)
      * [Modèles locaux](pre-basic/settings/local-models.md)
    * **Outils et recherche web**
      * [Mode en ligne](pre-basic/websearch/README.md)
        * [Mode en ligne gratuit](pre-basic/websearch/free-search.md)
        * [Configuration de la liste noire pour la recherche web](pre-basic/websearch/blacklist.md)
        * [Connexion à Volcano Engine pour l'accès à Internet](pre-basic/websearch/volcengine.md)
        * [Tutoriel d'inscription et de connexion en ligne à Tavily](pre-basic/websearch/tavily.md)
        * [Déploiement et configuration de SearXNG](pre-basic/websearch/searxng.md)
      * [Traitement des documents](pre-basic/settings/doc-process.md)
      * [OCR](pre-basic/settings/ocr.md)
    * **Apparence et productivité**
      * [Paramètres d'affichage](pre-basic/settings/display.md)
        * [CSS Personnalisé](pre-basic/personalization-settings/custom-css.md)
        * [Recommandations de polices](pre-basic/personalization-settings/font.md)
        * [Effacer les paramètres CSS](pre-basic/personalization-settings/clear-css.md)
      * [Notifications](pre-basic/settings/notification.md)
      * [Statistiques d'utilisation](pre-basic/settings/usage.md)
      * [Configuration des raccourcis clavier](pre-basic/settings/key-shortcut.md)
    * **Données et intégrations**
      * [Configuration des données](pre-basic/data-settings/README.md)
        * [Sauvegarde WebDAV](pre-basic/data-settings/webdav.md)
        * [Stockage de sauvegarde compatible S3](pre-basic/data-settings/s3-compatible.md)
        * [Tutoriel de configuration Notion](pre-basic/data-settings/notion.md)
        * [pre-basic/data-settings/obsidian](pre-basic/data-settings/obsidian.md)
        * [Tutoriel de configuration de SiYuan Note](pre-basic/data-settings/siyuan.md)
        * [Changer l'emplacement de stockage](pre-basic/personalization-settings/storage.md)
    * **Système**
      * [Paramètres généraux](pre-basic/settings/general.md)
      * [Dépendances d'environnement](pre-basic/settings/env-dependencies.md)

* **Base de connaissances**
  * **Premiers pas**
    * [Premiers pas avec les bases de connaissances](knowledge-base/knowledge-base.md)
    * [Créer une base de connaissances](knowledge-base/create.md)
    * [Ajouter et organiser les ressources](knowledge-base/sources.md)
    * [Vérification des ressources et rappel](knowledge-base/recall-test.md)
  * **Utiliser les bases de connaissances**
    * [Utilisation dans la conversation](knowledge-base/chat.md)
    * [Utilisation avec un Agent](knowledge-base/agent.md)
    * [Cas d'application de la base de connaissances](knowledge-base/cases.md)
  * **Configuration et dépannage**
    * [Informations de référence sur les modèles d'incorporation](knowledge-base/emb-models-info.md)
    * [Prétraitement des documents de la base de connaissances](knowledge-base/document-preprocessing.md)
    * [Notes sur le stockage des données](knowledge-base/data.md)
    * [Questions fréquentes](knowledge-base/troubleshooting.md)

* **Flux de travail avancés**
  * [Carte des fonctionnalités avancées](advanced-basic/capability-map.md)
  * [Conversation avancée](advanced-basic/chat/README.md)
    * [Comparaison multi-modèles et branches de messages](advanced-basic/chat/model-compare-branches.md)
    * [Conversations longues, contexte et file d'attente des messages](advanced-basic/chat/context-queue.md)
    * [Artefacts, citations et exportation](advanced-basic/chat/artifacts-export.md)
  * [Espace de travail de l'Agent](advanced-basic/agent-workspace/README.md)
    * [Création d'un Agent et répartition des modèles](advanced-basic/agent-workspace/create-agent.md)
    * [Répertoire de travail, tâches et fichiers](advanced-basic/agent-workspace/workspaces-tasks-files.md)
    * [Répartition des tâches entre modèles et dessin par Agent](advanced-basic/agent-workspace/models-image.md)
    * [Outils intégrés, base de connaissances, compétences et MCP](advanced-basic/agent-workspace/tools-knowledge-skills-mcp.md)
    * [Autorisations, mémoire et tâches en arrière-plan](advanced-basic/agent-workspace/permissions-memory-background.md)
  * [Flux de travail des connaissances et du contenu](advanced-basic/knowledge-content/README.md)
    * [Construire une base de connaissances et tester la récupération](advanced-basic/knowledge-content/knowledge-base.md)
    * [Notes, base de connaissances et Agent](advanced-basic/knowledge-content/notes-knowledge-agent.md)
    * [Génération, édition et amélioration d'images](advanced-basic/knowledge-content/painting-workflow.md)
    * [Traduction de fichiers, d'images et de longs documents](advanced-basic/knowledge-content/translation-workflow.md)
  * [Étendre les capacités de l'Agent](advanced-basic/extensions/README.md)
    * [Compétences et bibliothèque de capacités](advanced-basic/extensions/skills.md)
    * [MCP et outils externes](advanced-basic/extensions/mcp/README.md)
      * [Dépannage MCP](advanced-basic/extensions/mcp/troubleshooting.md)
  * [Automatisation et interactions externes](advanced-basic/automation/README.md)
    * [Canaux](advanced-basic/automation/channels.md)
    * [Tâches planifiées, battements de cœur et journaux d'exécution](advanced-basic/automation/scheduled-heartbeat.md)
  * [Espace de travail efficace](advanced-basic/workbench/README.md)
    * [Fenêtres multiples et onglets](advanced-basic/workbench/multi-window-tabs.md)
    * [Barre d'outils de saisie et outils d'efficacité](advanced-basic/workbench/composer-efficiency.md)
    * [Recherche globale](advanced-basic/workbench/global-search.md)
    * [Capture d'écran, annotation et OCR](advanced-basic/workbench/screenshot-ocr.md)
  * [Développement et diagnostic](advanced-basic/developer-tools/README.md)
    * [Passerelle API](advanced-basic/developer-tools/api-gateway.md)
    * [Chaîne d'appels et mode développeur](advanced-basic/developer-tools/trace.md)
    * [Assistant de codage (Code CLI)](advanced-basic/developer-tools/code-cli.md)
  * [Cas d'usage](advanced-basic/cases/README.md)
    * [Revue de recherche multi-modèles](advanced-basic/cases/research-review.md)
    * [Relecture de documents longs](advanced-basic/cases/long-document-review.md)
    * [Livraison de fichiers de projet par l'Agent](advanced-basic/cases/project-delivery.md)
    * [Kit d'images de marque](advanced-basic/cases/brand-image-kit.md)
    * [Questions-réponses sur une base de connaissances privée](advanced-basic/cases/private-knowledge-qa.md)
    * [Génération de rapports hebdomadaires à partir de notes](advanced-basic/cases/notes-weekly-report.md)
    * [Organisation des documents multilingues](advanced-basic/cases/multilingual-materials.md)
    * [Canaux et rapport quotidien planifié](advanced-basic/cases/automated-daily-report.md)
    * [Espace de travail de recherche multi-fenêtres](advanced-basic/cases/multi-window-research.md)

## Mobile

* **Bien démarrer**
  * [Présentation de la version mobile](mobile/README.md)
  * [Téléchargement et installation](mobile/installation.md)
  * [Démarrage rapide](mobile/quick-start.md)
* **Guide des fonctionnalités**
  * [Fournisseurs et modèles](mobile/providers-and-models.md)
  * [Conversations et fichiers](mobile/chat-and-files.md)
  * [Agents et outils](mobile/agents-and-tools.md)
  * [Génération d'images](mobile/image-generation.md)
* **Paramètres et assistance**
  * [Données, confidentialité et autorisations](mobile/data-privacy.md)
  * [Dépannage](mobile/troubleshooting.md)

## Aide et dépannage

* [Foire Aux Questions (FAQ)](question-contact/questions.md)
* [Méthodes pour poser des questions efficacement](question-contact/ask.md)
* [Feedback & Suggestions](question-contact/suggestions.md)

## Ressources et projet

* **Référence**
  * [Vulgarisation des connaissances](question-contact/knowledge.md)
  * [Références courantes des modèles](other/models-info.md)
  * [Classement des modèles](other/model_rank/README.md)
    * [Classement des agents](other/model_rank/agent.md)
    * [Classement des modèles de texte](other/model_rank/text.md)
    * [Classement de recherche](other/model_rank/search.md)
    * [Classement Vision](other/model_rank/vision.md)
    * [Classement Code / Développement Web](other/model_rank/code-webdev.md)
    * [Classement de génération d'images à partir de texte](other/model_rank/text-to-image.md)
* **Projet et à propos**
  * [Contribuer au code](contribution/code.md)
  * [Contribuer à la documentation](contribution/docs.md)

## Partenariats et politiques

* [Collaboration Commerciale](contact-us/questions.md)
* [Politique de Confidentialité](about/privacypolicy.md)
* [Licence open source](contact-us/questions/license.md)
