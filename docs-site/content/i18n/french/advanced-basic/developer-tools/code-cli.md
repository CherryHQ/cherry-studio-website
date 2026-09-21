---
icon: terminal
---
# Assistant de codage (Code CLI)

【Assistant de codage】permet d'installer, de configurer et de démarrer les outils de ligne de commande de programmation courants. Cherry Studio distingue les versions gérées par l'application, les versions déjà présentes dans le PATH système et les connexions de compte propres aux outils. Il ne remplace pas automatiquement les installations système.

<figure><img src="../../../../assets/2e66cc9312c27cf740b2eb62.webp" alt="① Sélectionnez l'outil à gauche et vérifiez son état d'installation ; ② à droite, choisissez la passerelle unifiée, le compte officiel de l'outil ou un service de modèle compatible."><figcaption><p>① Sélectionnez l'outil à gauche et vérifiez son état d'installation ; ② à droite, choisissez la passerelle unifiée, le compte officiel de l'outil ou un service de modèle compatible. </p></figcaption></figure>

### Fonctionnalités de la page

* Vérifier si l'outil est installé et s'il existe des mises à jour disponibles ;
* Installer, mettre à jour ou supprimer les copies d'outils gérées par Cherry Studio ;
* Détecter les outils déjà présents dans le PATH système ;
* Sélectionner le fournisseur, le modèle et les paramètres pour les CLI nécessitant un service de modèle ;
* Conserver la méthode de connexion native pour les CLI utilisant leur propre compte ;
* Lancer l'outil après avoir sélectionné le répertoire de travail et le terminal détecté par le système.

La page inclut des outils tels que Claude Code, OpenAI Codex, Gemini CLI, OpenCode, Qwen Code, Kimi Code, Qoder CLI, GitHub Copilot CLI, Pi et DeepSeek Harness. Les éléments visibles peuvent varier selon les mises à jour du produit ; référez-vous à la liste de la page.

### Processus de démarrage général

{% stepper %}
{% step %}
#### 1. Ouvrir 【Assistant de codage】 depuis 【Lanceur】

Sélectionnez l'outil requis et vérifiez d'abord son état : non installé, géré par Cherry Studio ou provenant du système.
{% endstep %}

{% step %}
#### 2. Terminer l'installation ou la connexion

Cliquez sur 【Installer】 si l'outil n'est pas installé. Pour les CLI fournissant leur propre connexion de compte, suivez les instructions de la page pour effectuer la connexion native ; il n'est pas nécessaire de sélectionner un fournisseur depuis Cherry Studio.
{% endstep %}

{% step %}
#### 3. Configurer la connexion au modèle

Pour les outils nécessitant un service de modèle Cherry Studio, vous pouvez choisir la 【Passerelle unifiée】 ou un fournisseur et un modèle compatibles. La page filtre selon le type d'interface requis par le CLI ; les fournisseurs incompatibles ne sont pas listés.
{% endstep %}

{% step %}
#### 4. Sélectionner le répertoire et le terminal

Le répertoire de travail détermine l'emplacement de démarrage du CLI. Le terminal doit être sélectionné uniquement dans la liste détectée par le système ; après le démarrage, utilisez d'abord des commandes en lecture seule pour confirmer le chemin actuel.
{% endstep %}

{% step %}
#### 5. Démarrer et vérifier

Cliquez sur 【Démarrer】, confirmez que le compte ou le modèle est correct, puis exécutez les modifications de fichiers ou les commandes. Si vous devez ajuster l'intensité du raisonnement, les autorisations ou les options spécifiques à l'outil, ouvrez 【Configuration】.
{% endstep %}
{% endstepper %}

### DeepSeek Harness

<figure><img src="../../../../assets/ceedc835426c7413a36609ba.webp" alt="① Si non installé, effectuez d'abord l'installation gérée ; après installation, configurez le fournisseur compatible, les autorisations par défaut et le mode Agent, puis démarrez l'interface Web."><figcaption><p>① Si non installé, effectuez d'abord l'installation gérée ; après installation, configurez le fournisseur compatible, les autorisations par défaut et le mode Agent, puis démarrez l'interface Web. </p></figcaption></figure>

Le processus de DeepSeek Harness diffère de celui des CLI de terminal classiques : après l'installation et la sélection du fournisseur, Cherry Studio gère l'exécution et permet d'ouvrir une interface Web indépendante. Dans les paramètres, vous pouvez sélectionner le mode Agent par défaut et les autorisations par défaut :

| Configuration | Cas d'usage adapté | Remarques |
| -------- | -------------------------- | ------------- |
| 【Standard】 | Fichiers, Shell, recherche, compétences, planification et sous-agents peuvent être utilisés | Surface d'outils maximale, utilisez d'abord des autorisations contrôlées |
| 【Code PTC】 | Nécessite de combiner des opérations d'outils multi-étapes via Code Mode | Plus adapté aux tâches de codage complexes |
| 【Minimal】 | Nécessite uniquement un Shell persistant et un éditeur de texte | Moins de dépendances, portée des capacités plus restreinte |
| 【Lecture seule】 | Inspection du projet, sans écriture de fichiers | Les opérations risquées demandent toujours une confirmation |
| 【Écriture dans l'espace de travail】 | Autorise la modification de l'espace de travail DSH actuel | N'implique pas l'accès aux fichiers hors de l'espace de travail |
| 【Accès complet】 | Environnements isolés, fiables et récupérables | Aucune confirmation d'opération demandée, risque maximal |

### Distinguer les sources d'installation

| Source | Ce que fait Cherry Studio | Comment vous devez le maintenir |
| ---------------- | ------------------ | ----------------- |
| Géré par Cherry Studio | Installe, met à jour et désinstalle la copie gérée correspondante | Gérez-le dans 【Assistant de codage】 ou 【Dépendances d'environnement】 |
| PATH système | Détecte et utilise directement, sans remplacement | Mettez à jour ou désinstallez via le gestionnaire de paquets d'origine |
| Compte officiel de l'outil | Conserve le processus de connexion propre à l'outil | Gérez le compte et les autorisations dans l'interface de l'outil |

<figure><img src="../../../../assets/2e66cc9312c27cf740b2eb62.webp" alt="Assistant de codage (Code CLI) — Illustration"><figcaption></figcaption></figure>

{% hint style="warning" %}
Après la désinstallation de la copie gérée par Cherry Studio, si un exécutable du même nom existe encore dans le système, la page bascule automatiquement sur la version système. En cas de changement de comportement, vérifiez d'abord la source actuellement utilisée.
{% endhint %}

### Cas d'utilisateur : Démarrer un outil de codage dans le répertoire du projet

Le développeur sélectionne d'abord le répertoire du projet actuel, choisit une connexion de modèle validée, puis démarre Pi ou un autre CLI. La première commande ne lit que l'état du dépôt ; après avoir confirmé que le compte, le modèle et le répertoire sont corrects, autorisez l'outil à modifier les fichiers et à exécuter les vérifications.

<details>

<summary>Pourquoi le terminal ou le CLI déjà installé n'est-il pas trouvé ? </summary>

Cherry Studio détecte les outils à partir de l'environnement de connexion et des emplacements standard. Vérifiez que la commande peut s'exécuter dans le terminal de connexion, puis redémarrez l'application pour actualiser l'environnement. Les chemins portables ou non standards doivent actuellement être lancés manuellement depuis ce terminal.

</details>

<details>

<summary>Pourquoi le terminal ou le CLI déjà installé n'est-il pas trouvé ? </summary>

Cherry Studio détecte les outils à partir de l'environnement de connexion et des emplacements standard. Vérifiez que la commande peut s'exécuter dans le terminal de connexion, puis redémarrez l'application pour actualiser l'environnement. Les chemins portables ou non standards doivent actuellement être lancés manuellement depuis ce terminal.

</details>
