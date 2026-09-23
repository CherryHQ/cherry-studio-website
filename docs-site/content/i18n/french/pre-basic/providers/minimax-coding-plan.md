# Plan de codage MiniMax

**Coding Plan** est un service d'abonnement de programmation à haute valeur proposée par MiniMax (par exemple, les formules Starter/Plus). En configurant cette formule dans Cherry Studio, vous pouvez utiliser le modèle `MiniMax-M2.1` à un coût fixe très bas (à partir de 29 ¥/mois).

{% hint style="success" %}
**Avantages clés**

* **Public cible** : les utilisateurs disposant d'un abonnement MiniMax Coding Plan (Starter / Plus / Max).
* **Mode de facturation** : les quotas sont renouvelés par période (par exemple, 40 prompts toutes les 5 heures) plutôt que facturés par jeton, vous n'avez donc pas à craindre une consommation rapide.
{% endhint %}

### 1. Préparation

Avant de commencer, assurez-vous d'avoir acheté la formule et d'avoir obtenu la clé :

1. Connectez-vous à la [**Plateforme ouverte MiniMax**](https://platform.minimaxi.com/).
2. Accédez à la [**page Coding Plan**](https://platform.minimaxi.com/subscribe/coding-plan?code=FYWiC6CtHy\&source=link) et vérifiez que la formule est active.

    <figure><img src="../../../../assets/e7c5f78ce7b02d24f47e524a.png" alt=""><figcaption></figcaption></figure>
3. Dans **Coding Plan**, copiez votre clé `API Key` dédiée (commençant par `sk-`).

<figure><img src="../../../../assets/b7ad13e5818755c159e9cc7d.webp" alt=""><figcaption></figcaption></figure>

### 2. Étapes de configuration

#### Étape 1 : Localiser le fournisseur

Ouvrez Cherry Studio, cliquez sur **Paramètres** > **Services de modèles** dans la barre latérale, puis trouvez **MiniMax** dans la liste.

{% hint style="info" %}
Si la liste est longue, vous pouvez saisir `mini` dans la barre de recherche en haut pour localiser rapidement le fournisseur.
{% endhint %}

#### Étape 2 : Remplir la configuration

**Il n'est pas nécessaire** de modifier l'adresse API complexe, utilisez la configuration par défaut. Veuillez vous référer aux instructions suivantes pour la saisie :

<table><thead><tr><th width="128.20703125">Paramètre</th><th>Instructions de saisie</th></tr></thead><tbody><tr><td><strong>Clé API</strong></td><td>Collez votre clé dédiée Coding Plan<br><em>(Attention : il doit s'agir de la clé générée après l'achat de la formule, sans espaces superflus)</em></td></tr><tr><td><strong>Adresse API</strong></td><td>Conservez la valeur par défaut <code>https://api.minimaxi.com/v1</code></td></tr><tr><td><strong>Interrupteur</strong></td><td>Cliquez sur l'interrupteur en haut à droite pour vous assurer qu'il est <strong>vert (ON)</strong></td></tr></tbody></table>

<figure><img src="../../../../assets/d85a4215a6223242d859fc63.webp" alt=""><figcaption></figcaption></figure>

#### Étape 3 : Ajouter le modèle spécifié (important)

La formule Coding Plan ne prend en charge que des modèles spécifiques. Choisir le mauvais modèle rendra le service inutilisable ou entraînera des frais supplémentaires.

1. Cliquez sur le bouton **Gérer (Manage)** en bas de la page de configuration.

<figure><img src="../../../../assets/a47dc9b50635537d2cca507d.png" alt=""><figcaption></figcaption></figure>

2. Trouvez et ajoutez **`MiniMax M2.1`** dans la liste.

{% hint style="warning" %}
**Veuillez sélectionner le bon modèle !**

* ✅ **Recommandé** : `MiniMax M2.1` (modèle principal désigné pour Coding Plan).
{% endhint %}

#### Étape 4 : Enregistrer et vérifier <a href="#headingcab61b6e3e264a4b8e56bc83923488d2-di-si-bu-bao-cun-bing-yan-zheng-0" id="headingcab61b6e3e264a4b8e56bc83923488d2-di-si-bu-bao-cun-bing-yan-zheng-0"></a>

1. Cliquez sur le bouton **Vérifier (Check)** à côté du champ de saisie de la clé API.
2. Si **Success** s'affiche en vert, votre formule Coding Plan est connectée avec succès !

### 3. Explications sur l'utilisation et les limites

Le mode de facturation de Coding Plan est totalement différent de celui de l'API standard. Veuillez bien comprendre le mécanisme suivant :

{% hint style="info" %}
**Mécanisme de renouvellement des quotas** Les quotas de Coding Plan sont **renouvelés périodiquement**. Par exemple, pour la formule Starter : **40** conversations sont offertes **toutes les 5 heures**.

* **Si vous ne recevez plus de réponse** : cela signifie que votre quota des 5 heures actuelles est épuisé.
* **Solution** : attendez quelques heures pour que le quota se renouvelle automatiquement, sans frais supplémentaires.
{% endhint %}

### 4. Dépannage des problèmes courants

{% hint style="danger" %}
**Erreur `429 Too Many Requests` ?**

Ce n'est pas un dysfonctionnement logiciel, mais une limitation de fréquence de **Coding Plan** qui a été déclenchée.

* Cela signifie que le nombre de messages envoyés pour la période actuelle est épuisé.
* Veuillez patienter jusqu'au renouvellement de la prochaine période de 5 heures.
{% endhint %}

{% hint style="warning" %}
**Erreur `401 Unauthorized` ?**

* Vérifiez s'il y a des espaces superflus dans la clé API.
* Connectez-vous au site officiel MiniMax pour vérifier si votre abonnement Coding Plan a expiré.
{% endhint %}

***

### Obtenir de l'aide et envoyer des retours

Si vous avez des questions, des bugs ou des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
