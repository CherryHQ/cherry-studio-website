# Moonshot AI (Kimi)

Moonshot AI est une équipe de modèles de grande taille reconnue en Chine. Son produit phare, **Kimi**, se distingue par son **contexte ultra-long** (jusqu'à 2 millions de caractères), idéal pour traiter de longs documents ou du code avec l'IA.

## Obtenir une clé API

* Inscrivez-vous sur la [plateforme ouverte Moonshot](https://platform.moonshot.cn/)
* Accédez à `Gestion des clés API` pour créer une clé `sk-...`
* Effectuez un dépôt de fonds pour activer le service (montant minimal faible)

## Configuration dans Cherry Studio

* Ouvrez `Paramètres → Services de modèles`, localisez le fournisseur **Moonshot AI** et accédez à sa page de détails
* Saisissez votre clé `sk-...`
* L'adresse API par défaut est `https://api.moonshot.cn`
* Cliquez sur **Obtenir la liste des modèles**

## Utilisations recommandées

| Modèle | Scénarios adaptés |
|---|---|
| `moonshot-v1-8k` | Contexte court, économique et rapide |
| `moonshot-v1-32k` | Contexte moyen, suffisant pour l'usage quotidien |
| `moonshot-v1-128k` | Contexte long, analyse de documents, revue de code |
| `kimi-k2-* / k2.5-*` | Dernier modèle phare, capacités de raisonnement supérieures |

## Scénarios adaptés

* **Analyse de PDF / documents ultra-longs** : l'avantage du contexte long de Moonshot est le plus marqué
* **Revue de code volumineux** : permet d'insérer des fichiers complets sans découpage
* **Résumé d'e-books entiers** : les modèles à contexte long évitent la trituration manuelle

{% hint style="info" %}
* La fonction « cache de contexte » de Moonshot réduit significativement la consommation de jetons lors des conversations répétées. Consultez la documentation officielle
* Kimi dispose d'une interface de conversation sur le web, mais l'intégration via l'API dans Cherry Studio permet d'utiliser les extensions telles que les assistants, les bases de connaissances et les outils MCP de Cherry Studio
{% endhint %}

***

### Obtenir de l'aide et envoyer des retours

Si vous rencontrez des questions, des bugs ou avez des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
