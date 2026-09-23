---
icon: comment-dots
---
# Canaux

Un canal connecte un Agent à une plateforme de messagerie externe. Vous pouvez actuellement configurer Feishu, Telegram, QQ, WeChat, Discord et Slack ; chaque plateforme requiert des identifiants de bot et des identifiants de session différents.

{% hint style="success" %}
Il est recommandé de d'abord d'informer l'Agent dans l'onglet 【Travail】 : « Configurez un canal Feishu pour l'Agent actuel afin de recevoir les messages de groupe et d'envoyer les résultats des tâches. » L'Agent vous demandera les informations nécessaires selon l'usage, ce qui est plus rapide que de remplir tous les champs de la plateforme. Utilisez ensuite 【Paramètres】 → 【Canaux】 pour effectuer des modifications précises si nécessaire.
{% endhint %}

<figure><img src="../../../../assets/ba51e18db6977f0202c709b4.webp" alt="Sélectionnez d'abord la plateforme à connecter, puis cliquez sur 【Ajouter】 ; les comptes et identifiants à préparer varient selon la plateforme."><figcaption><p>Sélectionnez d'abord la plateforme à connecter, puis cliquez sur 【Ajouter】 ; les comptes et identifiants à préparer varient selon la plateforme. </p></figcaption></figure>

## Chemin de configuration manuelle

【Paramètres】 → 【Canaux】 → Sélectionnez la plateforme → 【Ajouter】.

{% stepper %}
{% step %}
### 1. Préparer le compte de la plateforme

Créez un bot ou une application conformément aux règles de la plateforme. Pour Feishu et WeChat, si le processus de connexion par code QR est pris en charge, vous pouvez le finaliser après l'activation du canal en suivant les instructions de l'interface. Pour les autres plateformes, renseignez le Token correspondant ou les identifiants de l'application.
{% endstep %}

{% step %}
<figure><img src="../../../../assets/c074e4e1278ff6cd86f433ed.webp" alt="Associez d'abord un Agent testé et limitez la portée des conversations autorisées ; n'ouvrez que les identifiants et permissions nécessaires à l'accomplissement de la tâche."><figcaption><p>Associez d'abord un Agent testé et limitez la portée des conversations autorisées ; n'ouvrez que les identifiants et permissions nécessaires à l'accomplissement de la tâche. </p></figcaption></figure>

### 2. Associer l'Agent et l'espace de travail

Sélectionnez un Agent dont le fonctionnement a été vérifié et spécifiez un espace de travail pour les messages du canal. Les messages externes seront exécutés dans ce contexte ; évitez de sélectionner des dossiers contenant des fichiers sensibles non pertinents.
{% endstep %}

{% step %}
### 3. Limiter les sources de messages

Renseignez les Chat ID, IDs de canal ou IDs d'utilisateur autorisés. Laisser le champ vide peut signifier que tout est autorisé, selon la description du champ de la plateforme actuelle. Vous pouvez envoyer `/whoami` au bot pour obtenir l'identifiant au bon format.
{% endstep %}

{% step %}
### 4. Choisir le mode de permissions et activer

Par défaut, le mode 【Hériter des paramètres de l'Agent】 est utilisé. Pour les groupes publics, les groupes multiples ou les sources non fiables, utilisez un mode plus strict. Après activation, envoyez d'abord un message de test sans effet de bord.
{% endstep %}
{% endstepper %}

## Configuration recommandée

| Paramètre | Valeur par défaut du produit | Point de départ suggéré | Rôle | Cas d'usage | Remarques |
| -------- | --------- | --------------- | ------------ | --------- | ---------------- |
| Agent associé | Sélection requise | Préparer un Agent dédié au canal | Détermine qui traite les messages | Groupes de discussion, messagerie privée du bot | Ne pas mélanger avec un Agent de développement à privilèges élevés |
| Espace de travail | Sélection requise | Utiliser un dossier dédié sans données personnelles | Limite les fichiers traitables | Collecte en groupe, livraison de rapports quotidiens | Ne pas sélectionner le répertoire principal de l'utilisateur |
| Sources de messages autorisées | Selon le champ de la plateforme | Autoriser d'abord uniquement un compte ou un groupe de test | Limite qui peut déclencher l'Agent | Tests internes, groupes d'équipe | Lire la description du champ avant de laisser vide |
| Mode de permissions | 【Hériter des paramètres de l'Agent】 | Utiliser une approbation plus stricte pour les entrées externes | Contrôle les opérations d'outils | Groupes publics, groupes multiples | Déconseillé d'utiliser 【Accès complet】 |

## Cas d'usage : Groupe de garde d'équipe

Créez un Agent qui ne traite que le manuel de garde, associez une base de connaissances testée en rappel et un espace de travail dédié, et autorisez uniquement le déclenchement par le groupe de garde. Testez d'abord deux types de messages : « Consulter une règle » et « Réponse introuvable », puis testez la génération d'un résumé de passation de service sans informations sensibles.

### Critères d'achèvement

Les sources non autorisées ne peuvent pas déclencher de tâche ; les réponses sont renvoyées au groupe spécifié ; l'absence de contenu dans la base de connaissances est clairement indiquée ; l'écriture de fichiers requiert toujours une approbation.

## Points clés de configuration par plateforme

| Plateforme | Identifiants principaux | Points clés de la portée de session |
| --------- | ----------------------- | ------------------ |
| Feishu / Lark | App ID, App Secret, ou processus par code QR | Chat ID et domaine national/international |
| Telegram | Bot Token | Chat ID |
| QQ | App ID, Client Secret | Format d'identifiant pour messagerie privée, groupe ou canal |
| WeChat | Connexion par code QR ou chemin d'identifiants | IDs d'utilisateurs autorisés |
| Discord | Bot Token | ID de canal ou de messagerie privée |
| Slack | Bot Token, App Token | Socket Mode et ID de canal |

{% hint style="danger" %}
Les Tokens de bot, App Secrets et jetons de validation sont équivalents à un nom d'utilisateur et un mot de passe. Ne les inscrivez pas dans la mémoire à long terme de l'Agent, les prompts de tâche, les captures d'écran ou les Issues publiques ; en cas de fuite, révoquez-les immédiatement côté plateforme et régénérez-les.
{% endhint %}

<details>

<summary>Que faire si je ne peux pas sélectionner un canal comme cible de réception pour une tâche planifiée ? </summary>

Envoyez d'abord un message au bot sur la plateforme correspondante pour que Cherry Studio enregistre le Chat ID disponible, puis revenez à la tâche planifiée pour sélectionner la cible de notification.

</details>

<details>

<summary>Que faire si le canal est connecté mais ne répond pas ? </summary>

Vérifiez les IDs de session autorisés, l'Agent associé, l'espace de travail et le mode de permissions, puis consultez les journaux du canal. Si la plateforme a reçu le message mais que l'Agent ne l'a pas exécuté, continuez à vérifier la passerelle API et l'état de la tâche de l'Agent.

</details>
