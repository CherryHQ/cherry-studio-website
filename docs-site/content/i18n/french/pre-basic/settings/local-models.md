---
icon: microchip
---
# Modèles locaux

Les modèles locaux sont de petits modèles intégrés à Cherry Studio, **fonctionnant hors ligne après téléchargement** : ils n'utilisent aucune API de fournisseur de service et ne nécessitent aucune clé API. De taille réduite et exécutés sur votre propre ordinateur, ils couvrent les fonctionnalités de base pour lesquelles il n'est pas justifié de configurer un modèle cloud dédié.

Ouvrez `Paramètres → Modèles locaux` pour les gérer :

<figure><img src="../../../../assets/3ef4a2e692da5a39fccf7406.webp" alt=""><figcaption><p>Modèles locaux : ① Deux modèles locaux intégrés — modèle d'embedding local + modèle OCR local (les deux sont « Prêts » sur l'image, cliquables sur l'icône de suppression à droite pour les retirer)</p></figcaption></figure>

Deux types de modèles locaux sont actuellement intégrés :

| Modèle local | Base | Taille | Usage |
| ------------- | -------------------- | -------- | --------------------------------------------------------------- |
| **Modèle d'embedding local** | Qwen3 Embedding 0.6B | Environ 614 Mo | Convertit le texte en vecteurs, utilisé pour la recherche et la récupération dans la [base de connaissances](../../knowledge-base/knowledge-base.md) |
| **Modèle OCR local** | PaddleOCR PP-OCRv6 | Environ 140 Mo | Reconnaît hors ligne le texte dans les images / documents scannés, utilisé par la fonction [OCR](ocr.md) |

### Téléchargement et statut

* Un badge de statut s'affiche à côté du nom du modèle : les cartes non téléchargées possèdent un bouton « **Télécharger** » pleine largeur en **bas**, à cliquer pour démarrer le téléchargement ; une fois terminé, le badge passe à **Prêt**.
* Les modèles prêts peuvent être supprimés via l'icône **Supprimer** à droite pour libérer de l'espace disque ; ils peuvent être retéléchargés si nécessaire. (Si le modèle d'embedding est encore utilisé par la base de connaissances, la suppression est refusée et les poids sont conservés.)
* Sur certaines plateformes / architectures où l'inférence locale n'est pas prise en charge, le panneau affiche « **La plateforme actuelle ne prend pas en charge les modèles locaux** », et aucun téléchargement n'est proposé.

Si un miroir est indisponible pendant le téléchargement, Cherry Studio tente automatiquement d'autres sources de téléchargement. Une fois le téléchargement terminé, l'inférence du modèle d'embedding local s'exécute localement, sans connexion internet.

{% hint style="warning" %}
Si le message « Fichiers de modèle incomplets, veuillez retélécharger pour réparer. » s'affiche, cela signifie que des fichiers essentiels manquent dans le cache local. Supprimez ou retéléchargez ce modèle pour réparer ; ne manipulez pas manuellement les fichiers de modèle.
{% endhint %}

{% hint style="info" %}
Les modèles locaux sont **optionnels**. Si vous avez déjà configuré un modèle d'embedding cloud dans [Services de modèles](providers.md) ou si l'OCR système suffit, vous pouvez choisir de ne pas les télécharger.
{% endhint %}

### Quand utiliser les modèles locaux

* **Aucun modèle d'embedding cloud / pas d'envie de payer séparément pour la base de connaissances** : téléchargez le modèle d'embedding local pour indexer et rechercher dans la base de connaissances en mode entièrement hors ligne.
* **OCR hors ligne requis** : dans les scénarios sans réseau ou où vous ne souhaitez pas envoyer les images à des tiers, téléchargez le modèle OCR local et sélectionnez « PaddleOCR local » dans les [Paramètres OCR](ocr.md).
* **Confidentialité prioritaire** : tous les calculs sont effectués localement, le contenu ne quitte pas votre ordinateur.

{% hint style="warning" %}
Les modèles locaux sont une solution légère « suffisante pour l'usage ». Si vous exigez une grande précision de recherche ou de reconnaissance, les [modèles d'embedding](../../knowledge-base/emb-models-info.md) cloud et les services OCR plus performants offrent généralement de meilleurs résultats.
{% endhint %}

***

### Obtenir de l'aide et envoyer des retours

Si vous avez des questions, des bugs ou des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
