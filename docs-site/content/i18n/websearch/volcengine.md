---
description: cherry studio使用「火山引擎」接入deepseekR1联网功能，喂饭教程。
hidden: True
icon: globe-pointer
---

{% hint style="warning" %}
Ce document a été traducido del chino por IA y aún no ha sido revisado.
{% endhint %}

# Connexion à Volcano Engine pour l'accès à Internet

### 1. Se connecter/S'inscrire sur « Volcano Engine » <a href="#rclz7" id="rclz7"></a>

Visitez le site officiel : [https://www.volcengine.com/](https://www.volcengine.com/)

<figure><img src="../../assets/98bfb5c300d7cd815aedf4c7.webp" alt=""><figcaption><p>Site officiel de Volcano Engine</p></figcaption></figure>

### 2. Créer une « Mon application » avec accès à Internet <a href="#gvzaa" id="gvzaa"></a>

2.1. Connectez-vous à Volcano Engine et accédez à la page « Volcano Ark » : [https://console.volcengine.com/ark](https://console.volcengine.com/ark)

2.2. **Cliquez successivement :** <mark style="color:red;">**« Mon application » → « Créer une application » → « Sans code » → « Chat privé »**</mark> 

<figure><img src="../../assets/ee60f999a4dccbbdce8881e5.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../assets/fec0d788d8d23f729247d79d.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../assets/9e4bb430ed758a3ffe559a59.webp" alt=""><figcaption></figcaption></figure>

### 3. Remplir les informations et publier l'application <a href="#zzdfe" id="zzdfe"></a>

**Nom de l'application** : Choisissez un nom au hasard selon les exigences. (<mark style="color:red;">**\*Obligatoire**</mark>, les autres champs sont optionnels)

<mark style="color:red;">**L'essentiel : Activer le plugin Internet (nécessite une activation préalable)**</mark>

<figure><img src="../../assets/5235ef3b0757059a7fd00447.webp" alt=""><figcaption></figcaption></figure>

#### 3.1. Activer la fonction du plugin Internet (attention aux coûts et quotas gratuits) <a href="#mwn38" id="mwn38"></a>

<figure><img src="../../assets/c4170cccee5de8c993b0b586.webp" alt=""><figcaption><p>Cliquez sur "Acheter maintenant" et suivez les étapes jusqu'à l'affichage ci-dessous, indiquant que l'activation a réussi.</p></figcaption></figure>

<figure><img src="../../assets/2d729a056d0bd71aa627b48a.webp" alt=""><figcaption><p>Vérifiez le statut : activation réussie</p></figcaption></figure>

Retournez ensuite à l'interface « Remplir les informations de l'application ».

<figure><img src="../../assets/47360c539ee128f39b86020c.webp" alt=""><figcaption></figcaption></figure>

#### 3.2. Configuration avancée de la recherche Internet <a href="#sp6uz" id="sp6uz"></a>

Choisissez selon vos besoins. Recommandations personnelles :
* Pour un contrôle précis des entrées/sorties : utiliser « **Appel personnalisé** » ;
* Pour plus de simplicité : utiliser la valeur par défaut « **Appel automatique** » ;
* Si le budget le permet et si la fraîcheur de l'information est cruciale : activer « **Forcer l'ouverture** ».

<figure><img src="../../assets/e886e47fc99c10deaf5e80e3.webp" alt=""><figcaption></figcaption></figure>

#### 3.3. Publier l'application <a href="#fe1gf" id="fe1gf"></a>

Cliquez sur « Publier » en haut à droite pour finaliser la création.

<figure><img src="../../assets/09b6fa788839c08e605d9128.webp" alt=""><figcaption></figcaption></figure>

### 4. Obtenir la clé API <a href="#jtqlu" id="jtqlu"></a>

Cliquez successivement : **« Guide d'appel API » → « Sélectionner et copier la clé API » → « Voir et choisir »**

Copiez la clé API, puis collez-la dans Cherry Studio. (Détails dans l'interface ci-dessous)

<figure><img src="../../assets/8322870a4161de7ff5d860f5.webp" alt=""><figcaption></figcaption></figure>

Remarque : Si aucune clé API n'existe, cliquez sur « **Créer une clé API** » dans l'angle supérieur droit, puis copiez-la.

<figure><img src="../../assets/9100d8ab913d8976f53cd0c7.webp" alt=""><figcaption></figcaption></figure>

### 5. Utiliser la clé API dans Cherry Studio pour accéder à deepseek-R1 via Internet <a href="#lrefj" id="lrefj"></a>

#### 5.1. Ouvrez Cherry Studio → « Paramètres » → « Nom aléatoire » → « Type : openAI » <a href="#dvrbv" id="dvrbv"></a>

<figure><img src="../../assets/6b84bd9cf3e91737c3b3a7a3.webp" alt="" width="375"><figcaption></figcaption></figure>

<figure><img src="../../assets/dacbd055825146aa4031a7e7.webp" alt="" width="375"><figcaption></figcaption></figure>

#### 5.2. Configurer l'URL et la clé <a href="#mt8y0" id="mt8y0"></a>

<figure><img src="../../assets/d85bb2796ec18d77b27164e3.webp" alt=""><figcaption></figcaption></figure>

<mark style="color:purple;">Remarque : si l'adresse est introuvable ou hors du nœud de Pékin, trouvez l'adresse exacte ici (n'oubliez pas "/") :</mark>

<figure><img src="../../assets/ef3bcae1b0f5e786077b2373.webp" alt=""><figcaption></figcaption></figure>

#### 5.3. Ajouter le nom du modèle <a href="#qmh3i" id="qmh3i"></a>

Copiez le texte en petits caractères comme nom de modèle, sinon une erreur se produira.

<figure><img src="../../assets/53b0e97b6a0b9680e673974e.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../assets/7a43cd735df850805b24394c.webp" alt=""><figcaption></figcaption></figure>

### 6. Aperçu des résultats <a href="#peb2p" id="peb2p"></a>

<figure><img src="../../assets/769e08e7462e840976de738b.webp" alt=""><figcaption></figcaption></figure>