---
icon: key-round
---

# Fournisseurs et modèles

L'application mobile appelle les modèles via les fournisseurs que vous configurez. Cherry Studio fournit l'expérience client : elle ne revend pas de crédits de modèles et ne modifie pas les tarifs ni les règles de traitement des données du fournisseur.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/iphone-add-provider.webp"><img src="../../../assets/mobile/iphone-add-provider.webp" alt="Écran d'ajout de fournisseur dans Cherry Studio Mobile sur iPhone"></a><figcaption><p><strong>iPhone</strong> · Cherchez dans le catalogue de fournisseurs ou créez un fournisseur personnalisé</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-add-provider.webp"><img src="../../../assets/mobile/ipad-add-provider.webp" alt="Écran d'ajout de fournisseur dans Cherry Studio Mobile sur iPad"></a><figcaption><p><strong>iPad</strong> · Le même catalogue de fournisseurs, en disposition tablette</p></figcaption></figure>
</div>

## Ajouter un fournisseur intégré

1. Ouvrez les paramètres des services de modèles et sélectionnez **Ajouter un fournisseur**.
2. Recherchez et choisissez le fournisseur voulu.
3. Saisissez la clé API ainsi que les autres valeurs exigées par ce fournisseur.
4. Récupérez ou ajoutez des modèles, puis activez ceux que vous comptez utiliser.

## Utiliser un fournisseur personnalisé

Pour un service qui implémente un format d'API pris en charge, choisissez **Fournisseur personnalisé** et saisissez un nom, un Base URL, une clé API et un identifiant de modèle. Le Base URL doit être l'adresse de l'API indiquée dans la documentation du fournisseur, et non l'URL de sa console.

## Choisir un modèle

Ouvrez le sélecteur de modèles depuis une conversation ou un agent pour basculer entre les modèles activés. La compréhension d'images, l'appel d'outils et la génération d'images dépendent du fournisseur et du modèle précis.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/iphone-models.webp"><img src="../../../assets/mobile/iphone-models.webp" alt="Sélecteur de modèles dans Cherry Studio Mobile sur iPhone"></a><figcaption><p><strong>iPhone</strong> · Parcourez les modèles activés par fournisseur</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-models.webp"><img src="../../../assets/mobile/ipad-models.webp" alt="Sélecteur de modèles dans Cherry Studio Mobile sur iPad"></a><figcaption><p><strong>iPad</strong> · Consultez les capacités des modèles et les informations de contexte</p></figcaption></figure>
</div>

## Erreurs de connexion courantes

* **401 / non autorisé** : vérifiez que la clé API est complète, non expirée, et que le compte dispose des autorisations nécessaires.
* **404 / modèle introuvable** : vérifiez le Base URL et l'identifiant du modèle ; n'utilisez pas le nom affiché à la place de l'identifiant.
* **429 / trop de requêtes** : attendez la réinitialisation de la limite de débit et vérifiez le solde et les quotas du fournisseur.
* **Délai dépassé ou échec réseau** : assurez-vous que votre réseau actuel peut joindre le fournisseur et vérifiez les réglages de proxy.
