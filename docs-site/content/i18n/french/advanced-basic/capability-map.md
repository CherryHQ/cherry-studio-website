---
icon: route
---
# Carte des fonctionnalités avancées

Les tutoriels avancés ne suivent pas l'ordre des menus de paramètres, mais partent de l'objectif à atteindre. Choisissez d'abord l'objectif le plus proche, puis accédez au tutoriel correspondant.

<figure><img src="../../../assets/f99c1bfff81d92511c921169.webp" alt="Commencez par l'entrée principale pour effectuer la tâche minimale ; une fois les résultats stables, ajoutez ensuite des bases de connaissances, des compétences, des MCP, des canaux ou des tâches planifiées."><figcaption><p>Commencez par l'entrée principale pour effectuer la tâche minimale ; une fois les résultats stables, ajoutez ensuite des bases de connaissances, des compétences, des MCP, des canaux ou des tâches planifiées.</p></figcaption></figure>

{% hint style="success" %}
Lorsque vous devez configurer un ensemble de tutoriels, de canaux, de tâches planifiées ou de fonctionnalités étendues, indiquez d'abord votre objectif à l'Agent dans l'onglet 【Travail】. L'Agent peut vous aider à identifier les éléments manquants et vous guider dans les configurations courantes ; consultez ensuite 【Paramètres】 pour vérifier manuellement les comptes, les clés ou les paramètres précis.
{% endhint %}

<figure><img src="../../../assets/8fe4d938af469d667d4071df.webp" alt="Le lanceur situé à gauche propose neuf entrées principales ; choisissez celle qui correspond le mieux à votre tâche pour commencer."><figcaption><p>Le lanceur situé à gauche propose neuf entrées principales ; choisissez celle qui correspond le mieux à votre tâche pour commencer.</p></figcaption></figure>

Légende du diagramme : choisissez d'abord l'entrée principale selon l'objectif, puis ajoutez des compétences, des MCP, des canaux ou des tâches planifiées une fois le processus stabilisé.

### Choisir une entrée selon l'objectif

| Ce que vous souhaitez accomplir | Entrée recommandée | Fonctionnalités utilisées |
| ------------- | ----------------------- | --------------------- |
| Comparer plusieurs réponses, organiser de longues discussions | 【Conversation】 | Multi-modèles, branches de messages, contexte, citations et artefacts |
| Traiter des fichiers ou accomplir des tâches multi-étapes | 【Travail】 | Agent, répertoire de travail, outils, permissions et panneau d'état |
| Répondre de manière stable à partir de vos propres documents | 【Base de connaissances】 → test de rappel, puis liaison à l'Agent | Fichiers/pages web/notes, RAG, portée de recherche |
| Générer des images à partir d'articles ou retoucher des images | 【Dessin】, ou activer 【Générer des images】 dans l'Agent | Modèles, images de référence, édition locale, amélioration |
| Traduire du texte, des captures d'écran ou de longs documents | 【Traduction】 | OCR, traitement de documents, historique et favoris |
| Consolider des brouillons et les retravailler | 【Notes】 | Markdown, recherche, export, ajout à la base de connaissances |
| Capturer l'interface, annoter et copier du texte | 【Paramètres】 → 【Capture d'écran】 à activer, puis utiliser le raccourci clavier global | Capture de zone, annotation, floutage, OCR |
| Ouvrir des applications web courantes | 【Mini-programmes】 | Outils web intégrés et sites ajoutés |
| Parcourir, prévisualiser et organiser des fichiers locaux | 【Fichiers】 | Liste des fichiers, prévisualisation et traitement ultérieur |
| Connecter des outils externes ou des méthodes de travail fixes | Laissez d'abord l'Agent évaluer, puis vérifiez dans 【Paramètres】 | Compétences, MCP, outils intégrés |
| Utiliser l'Agent depuis une plateforme externe | Laissez d'abord l'Agent guider la configuration dans 【Travail】 | Canaux, portée autorisée, mode de permissions |
| Générer des rapports quotidiens ou des rappels planifiés | Faites d'abord fonctionner l'Agent, puis créez une 【Tâche planifiée】 | Agent, répertoire de travail, canaux, journal d'exécution |
| Consulter simultanément des documents et des tâches | Clic droit sur l'onglet → 【Ouvrir dans une nouvelle fenêtre】 | Multi-fenêtres, onglets épinglés, recherche globale |
| Gérer la ligne de commande de programmation | Lanceur 【Partenaire de codage】 | Code CLI, connexion au modèle, répertoire et terminal |
| Permettre à un programme local d'appeler le modèle ou de déboguer | 【Paramètres】 → 【Passerelle API】 / 【Général】 | API compatible, chaîne d'appels, mode développeur |

### Ordre d'apprentissage recommandé

{% stepper %}
{% step %}
#### 1. Maîtriser d'abord l'espace de travail de l'Agent

Apprenez à créer un Agent, à choisir le répertoire de travail, à comprendre la répartition des rôles des modèles et les permissions. Les extensions, l'automatisation et les cas d'usage projet s'appuient sur cette base.
{% endstep %}

{% step %}
#### 2. Intégrer ensuite les documents et les fonctionnalités

Utilisez la base de connaissances pour les documents de long terme, les compétences pour les méthodes répétitives et les MCP pour les systèmes externes. Ajoutez une seule fonctionnalité à la fois et validez-la avec de petites tâches.
{% endstep %}

{% step %}
#### 3. Automatiser ou connecter à l'externe en dernier

Configurez les canaux, les tâches planifiées, le Code CLI ou les API externes uniquement après que les résultats manuels sont stables. Cela facilite l'identification de l'étape problématique en cas d'incident.
{% endstep %}
{% endstepper %}

### Lecture par module

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Conversation avancée</strong></td><td>Multi-modèles, branches, contexte et artefacts</td><td><a href="chat/README.md">chat/README.md</a></td></tr><tr><td><strong>Espace de travail de l'Agent</strong></td><td>De la configuration à l'exécution et à la livraison de fichiers</td><td><a href="agent-workspace/README.md">agent-workspace/README.md</a></td></tr><tr><td><strong>Flux de travail des connaissances et du contenu</strong></td><td>Base de connaissances, notes, dessin et traduction</td><td><a href="knowledge-content/README.md">knowledge-content/README.md</a></td></tr><tr><td><strong>Étendre les capacités de l'Agent</strong></td><td>Compétences et MCP</td><td><a href="extensions/README.md">extensions/README.md</a></td></tr><tr><td><strong>Automatisation et connexion externe</strong></td><td>Canaux, tâches planifiées et battements de cœur</td><td><a href="automation/README.md">automation/README.md</a></td></tr><tr><td><strong>Poste de travail efficace</strong></td><td>Multi-fenêtres, outils d'efficacité et recherche</td><td><a href="workbench/README.md">workbench/README.md</a></td></tr><tr><td><strong>Développement et diagnostic</strong></td><td>Code CLI, passerelle API et chaîne d'appels</td><td><a href="developer-tools/README.md">developer-tools/README.md</a></td></tr><tr><td><strong>Cas d'application</strong></td><td>Neuf flux de travail complets</td><td><a href="cases/README.md">cases/README.md</a></td></tr></tbody></table>

{% hint style="warning" %}
Le répertoire de travail, les MCP, les canaux et les modes de permissions élevées élargissent la portée des données accessibles par l'Agent. Fournissez uniquement les répertoires, les outils et les comptes nécessaires à la tâche actuelle ; ne placez pas de clés API, de clés de bot ou de documents personnels dans des conversations publiques ou des captures d'écran.
{% endhint %}
