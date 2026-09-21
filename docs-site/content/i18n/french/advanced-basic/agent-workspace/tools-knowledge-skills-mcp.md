---
icon: puzzle-piece
---
# Outils intégrés, base de connaissances, compétences et MCP

Ces quatre types de fonctionnalités renforcent l'Agent, mais résolvent des problèmes distincts : les outils intégrés gèrent les opérations courantes, la base de connaissances limite les ressources consultables, les compétences fournissent des méthodes de travail et le MCP connecte des outils et des données externes.

### Distinctions et combinaisons

<figure><img src="../../../../assets/6be829efa6152cf0a3576cba.webp" alt="Outils intégrés, base de connaissances, compétences et MCP — Illustration"><figcaption></figcaption></figure>

| Fonctionnalité | Problème résolu | Exemples |
| ---- | ----------------------------- | ------------------------- |
| Outils intégrés | Ce que l'Agent peut faire directement dans Cherry Studio | Lecture/écriture de fichiers, recherche web, génération d'images, mémoire, notifications, tâches planifiées |
| Base de connaissances | Quelles ressources privées l'Agent peut consulter | Spécifications produit, modèles de contrats, manuels d'équipe |
| Compétences | Selon quels processus et standards l'Agent doit travailler | Format de rapports hebdomadaires, liste de contrôle de revue de code, normes rédactionnelles |
| MCP | Quels outils et ressources externes l'Agent peut connecter | Bases de données, navigateurs, systèmes métier tiers |

Chemin de configuration : navigation latérale [Travail] → ouvrir le menu Agent → [Modifier] → [Outils intégrés].

### Outils intégrés

Les outils intégrés sont regroupés par contexte, fichiers, multimédia, orchestration, recherche et terminal. Les fonctionnalités courantes incluent :

* [Générer une image] : utilise le modèle de dessin configuré ;
* [Recherche dans la base de connaissances] et [Gestion de la base de connaissances] : apparaissent uniquement après la liaison d'une base de connaissances ;
* [Recherche web] et [Extraction web] : utilisent les capacités de connexion à Internet configurées dans Cherry Studio ;
* [Mémoire] : sauvegarde et récupération d'informations stables entre les tâches ;
* [Tâches planifiées] et [Notifications] : permettent à l'Agent de gérer les plannings et d'envoyer les résultats aux canaux ;
* [Task] et [Flux de travail] : traitent les tâches complexes via des sous-agents ou de l'orchestration ;
* [Fichier vers Markdown] : lit les PDF, Word, PowerPoint, Excel, OpenDocument, RTF, EPUB et CSV du répertoire de travail ou des pièces jointes de la session actuelle, et transmet le contenu structuré à l'Agent pour traitement par segments ;
* Outils de coordination de session : recherche de sessions Agent existantes, création de sessions indépendantes, envoi de tâches et réception de résultats de complétion traçables ;
* Outils de fichiers et Bash : lecture, création, modification de fichiers et exécution de commandes.

{% hint style="info" %}
[Fichier vers Markdown] ne modifie pas le fichier d'origine et ne fournit pas de OCR pour les PDF scannés. Utilisez d'abord [OCR] ou des capacités de traitement de documents pour les scans, puis transmettez-les à l'Agent.
{% endhint %}

### Périmètre de la base de connaissances

La base de connaissances sélectionnée dans [Base de connaissances] définit la limite de recherche de cet Agent. Si aucune n'est sélectionnée, les outils de base de connaissances ne sont pas chargés ; si plusieurs sont sélectionnées, l'Agent ne travaille que dans ces bases de connaissances et ne lit pas automatiquement d'autres dépôts.

### Compétences

Activez les compétences déjà installées dans [Compétences]. Le contenu des compétences entre dans l'environnement de travail de l'Agent pour contraindre les processus et les sorties. Si vous avez besoin d'une nouvelle compétence, vous pouvez demander directement à l'Agent dans [Travail] de la rechercher et de l'installer ; le chemin de gestion manuelle est [Paramètres] → [Compétences].

### MCP

Connectez et démarrez d'abord les serveurs dans [Paramètres] → [MCP], puis revenez à la fenêtre de modification de l'Agent pour les lier dans [MCP]. Les serveurs non exécutés ne peuvent pas être activés ; après connexion, les outils qu'ils fournissent entrent dans le catalogue d'outils de l'Agent et restent soumis au contrôle des modes de permissions. Si le serveur fournit également des ressources ou des prompts, vous pouvez les sélectionner directement depuis le panneau [+] de la zone de saisie.

{% hint style="danger" %}
Ouvrir un outil ne signifie pas qu'il faut ignorer l'approbation. Pour l'écriture de fichiers, le terminal, la modification de données externes et la génération d'images potentiellement facturée, privilégiez [Confirmation à chaque fois] ; n'utilisez des permissions plus larges que pour les outils de sources fiables et aux risques clairs.
{% endhint %}

### Combinaisons recommandées

| Besoin de la tâche | Combinaison suggérée | Quand ajouter | Points d'attention |
| -------- | ------------- | ------------- | ------------- |
| Traitement de fichiers locaux | Outils de fichiers + répertoire de travail dédié | Ajouter une compétence si un format fixe est requis | Conserver [Confirmation à chaque fois] |
| Réponses basées sur des ressources internes | Base de connaissances + Recherche dans la base de connaissances | Transmettre au canal après stabilisation de la récupération | Tester d'abord avec des questions sans réponse |
| Exécution répétée de processus fixes | Compétence + outils intégrés nécessaires | Ajouter le MCP si des données externes sont requises | Ne pas stocker de clés de compte dans les compétences |
| Appel de systèmes externes | MCP + identifiants à privilèges minimaux | Assouplir l'approbation après stabilisation de la tâche | Confirmer les opérations d'écriture, de suppression et de facturation |

### Cas utilisateur : Agent de recherche de marché

Liez une base de connaissances de ressources produit à l'Agent, activez la compétence « Rapport de recherche », connectez un MCP de recherche web fiable et conservez les outils intégrés d'extraction web et d'écriture de fichiers. L'Agent détermine d'abord le périmètre produit à partir des ressources internes, recherche ensuite des informations externes, puis écrit dans le répertoire de travail selon la structure définie par la compétence. Les ressources internes, les sources externes et le format de sortie ont chacun une attribution claire, facilitant la maintenance ultérieure.

<details>

<summary>Pourquoi n'y a-t-il toujours pas de résultats de recherche après la liaison d'une base de connaissances ?</summary>

Vérifiez que la base de connaissances a terminé son traitement et contient du contenu consultable, puis contrôlez si la liaison existe toujours dans la fenêtre de modification de l'Agent. Si la base de connaissances est supprimée, les liaisons associées sont automatiquement retirées.

</details>

<details>

<summary>Faut-il relancer la tâche après l'activation d'une compétence ?</summary>

Il n'est pas nécessaire de fermer la tâche. Après modification de l'Agent, la nouvelle configuration de compétence est chargée à partir du prochain message ; la réponse en cours de génération n'est pas interrompue.

</details>

<details>

<summary>Faut-il relancer la tâche après l'activation d'une compétence ?</summary>

Il n'est pas nécessaire de fermer la tâche. Après modification de l'Agent, la nouvelle configuration de compétence est chargée à partir du prochain message ; la réponse en cours de génération n'est pas interrompue.

</details>
