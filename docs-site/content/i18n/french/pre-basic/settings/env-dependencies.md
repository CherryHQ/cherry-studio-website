---
icon: terminal
---
# Dépendances d'environnement

Les dépendances d'environnement servent à **gérer les outils binaires et les environnements d'exécution nécessaires au fonctionnement de certaines fonctionnalités avancées de Cherry Studio**. Certaines capacités des [services MCP](../../../../advanced-basic/extensions/mcp), des [compétences](../../advanced-basic/extensions/skills.md) et des [Agents](../../advanced-basic/agent.md) nécessitent l'appel d'outils en ligne de commande tels que `uv` et `bun`. Cherry Studio les centralise ici pour vous éviter d'avoir à les installer et les configurer manuellement via le terminal.

Ouvrez `Paramètres → Dépendances de l’environnement` :

<figure><img src="../../../../assets/edd81af2d8627638562b77e3.webp" alt=""><figcaption><p>Dépendances d'environnement : Outils intégrés et installables</p></figcaption></figure>

### Intégrés et installables

Chaque outil est présenté sous forme de carte avec son statut indiqué :

* Les outils marqués <mark style="color:blue;">**Intégré**</mark> sont fournis avec Cherry Studio, prêts à l'emploi sans aucune action requise.
* Les cartes des outils non installés affichent un bouton **Installer**. Un clic permet à Cherry Studio de télécharger et d'installer automatiquement l'outil dans le répertoire de l'application, sans polluer votre environnement système.
* Les cartes fournissent des liens vers le dépôt source et la documentation officielle, ainsi qu'un accès au répertoire d'installation local.

Aperçu des outils courants :

| Outil | Rôle |
| --- | --- |
| **uv** | Gestionnaire de paquets Python pour les services MCP et l'installation des dépendances |
| **Bun** | Environnement d'exécution JavaScript utilisé par les services MCP et les chaînes d'outils associées |
| **fd** | Outil de recherche de fichiers rapide, alternative à `find` |
| **ripgrep (rg)** | Outil de recherche de texte rapide, alternative à `grep` |
| **RTK** | Outil CLI de compression de la sortie du terminal pour réduire la consommation de jetons LLM |
| **Lark CLI** | CLI officiel de Feishu, couvrant plus de 200 commandes (messages / documents / tables multidimensionnelles / calendrier, etc.) |

La page liste également sous forme de cartes des outils tels que `gh` (GitHub CLI), `ntn` (Notion CLI) et `pi`, installables en un clic selon vos besoins. (Les CLI de programmation comme Claude Code / Codex sont gérés sur la page [Partenaire de codage](../../cherrystudio/preview/code-cli.md) et ne figurent pas ici.)

### Ajouter un outil

Le bouton « **Ajouter un outil** » en haut à droite permet d'utiliser l'outil mise pour ajouter des outils hors de la liste intégrée (par exemple `github:sharkdp/fd`, `uv`, `bun`).

### Paramètres d'installation avancés

Cliquez sur l'icône de paramètres en haut à droite pour ouvrir « **Paramètres d'installation avancés** » et affiner la méthode de téléchargement des outils (tous les champs peuvent être laissés vides pour utiliser les valeurs par défaut) :

* **Miroir GitHub** : Ajoute un préfixe de proxy pour les téléchargements de releases GitHub (par exemple `https://ghfast.top`), utile en cas de connexion directe instable.
* **Jeton GitHub** : Augmente la limite de débit de l'API GitHub lors des requêtes d'outils (stocké en clair localement).
* **Source de miroir npm / Adresse d'index pip** : Configure un miroir pour les outils de type `npm:` / `pipx:` (si laissé vide, un miroir est automatiquement sélectionné en Chine continentale).
* **Vérifier les signatures des outils** : Vérifie les signatures Sigstore / SLSA des outils, à laisser activé en général.

{% hint style="info" %}
Les utilisateurs standard n'ont généralement pas besoin d'intervenir ici — lorsqu'un outil est requis, la fonctionnalité associée (comme l'installation d'un service MCP) vous redirigera généralement ici pour une installation en un clic. Cette page sert plutôt d'entrée pour le diagnostic et le complément de l'environnement d'exécution.
{% endhint %}

{% hint style="warning" %}
Si un service MCP ou une compétence renvoie une erreur indiquant « uv / bun introuvable / commande inexistante », vérifiez d'abord ici si l'outil correspondant est installé ou au statut « Intégré » (le statut d'installation se met à jour automatiquement ; le bouton en haut à droite est **Vérifier les mises à jour**, utilisé pour récupérer les dernières versions des outils).
{% endhint %}

***

### Obtenir de l'aide et envoyer des retours

Si vous rencontrez des questions, des bugs ou avez des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
