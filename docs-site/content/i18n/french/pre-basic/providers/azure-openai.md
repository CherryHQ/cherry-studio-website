# Azure OpenAI

Azure OpenAI est le service de modèles OpenAI hébergé par Microsoft sur Azure, adapté aux équipes nécessitant la conformité entreprise, des engagements de résidence des données ou l'intégration à l'écosystème Microsoft.

## Prérequis

* Abonnement Azure activé
* Demande d'accès au service Azure OpenAI approuvée via le Portail Azure
* Au moins une **ressource (Resource)** et un **déploiement (Deployment)** créés

## Obtenir la clé API

* Portail Azure → votre ressource Azure OpenAI → `Keys and Endpoint`
* Copiez `KEY 1` ou `KEY 2`, et notez `Endpoint` (format : `https://<your-name>.openai.azure.com/`)

## Configuration dans Cherry Studio

* Ouvrez `Paramètres → Services de modèles`, trouvez le fournisseur **Azure OpenAI** et accédez à la page de détails
* **Clé API** : collez la clé copiée
* **Adresse API** : collez le point de terminaison (Endpoint) de la ressource (sans le chemin final)
* **Version API** : saisissez la version API de votre déploiement dans le champ dédié (par exemple `2024-08-01-preview`)
* Cliquez sur **Obtenir la liste des modèles**, ou ajoutez manuellement le nom des modèles déjà déployés sur Azure (c'est-à-dire le nom du déploiement, et non l'ID de modèle OpenAI d'origine)

{% hint style="warning" %}
**Nom du déploiement vs ID de modèle** : Azure utilise le nom que vous avez donné au déploiement (par exemple `gpt-4o-prod`), et non un ID d'origine tel que `gpt-4o`. Une erreur entraînera une erreur 404.
{% endhint %}

## Utilisations recommandées

* **gpt-4o / gpt-4o-mini** : conversation générale, Agent
* **gpt-4 turbo** : contexte long
* **text-embedding-3-**\* : modèles d'incorporation, utilisables pour les bases de connaissances

## Questions fréquentes

* **401 Non autorisé** : vérifiez que la clé est correcte et qu'il n'y a pas de barre oblique superflue à la fin du point de terminaison
* **404 Introuvable** : vérifiez que le nom du déploiement correspond à celui d'Azure et que la version API est renseignée
* **429 Limité** : vérifiez les quotas Azure (page Quota & Limits)

***

### Obtenir de l'aide et envoyer des commentaires

Si vous avez des questions, des bugs ou des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
