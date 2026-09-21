---
icon: code
---
# Développement et diagnostic

Ces fonctionnalités s'adressent aux utilisateurs qui doivent gérer des CLI de programmation, permettre à d'autres programmes locaux d'appeler des modèles ou diagnostiquer des problèmes de requêtes. Le mode développeur n'est pas nécessaire pour les conversations quotidiennes ni pour le travail de contenu.

### Deux points d'entrée

| Point d'entrée | Usage | À vérifier avant utilisation |
| ----------------- | ---------------------------- | -------------- |
| Launchpad【Partenaire de codage】 | Installation, configuration et lancement des CLI de programmation courants | Source d'installation, connexion au modèle et répertoire de travail |
| 【Paramètres】→【Passerelle API】 | Fournir une API compatible aux programmes locaux ; dépendance d'exécution de l'Agent | État, port et sécurité des clés |
| 【Paramètres】→【Général】→【Mode développeur】 | Consulter la chaîne d'appels et identifier les erreurs de modèle et d'outils | Les journaux peuvent contenir des données sensibles |

<figure><img src="../../../../assets/1fc9d6c1360e640958305d57.webp" alt="La page de la passerelle API affiche de manière centralisée l'état d'exécution, l'adresse, le port et les identifiants."><figcaption><p>La page de la passerelle API affiche de manière centralisée l'état d'exécution, l'adresse, le port et les identifiants. </p></figcaption></figure>

{% hint style="warning" %}
Les clés de la passerelle API et le contenu des requêtes dans la chaîne d'appels peuvent contenir des informations sensibles. Dans les captures d'écran, les issues et les discussions de groupe, ne partagez que les extraits nécessaires et masqués.
{% endhint %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Passerelle API</strong></td><td>Comprendre les dépendances de l'Agent et les appels API locaux</td><td><a href="api-gateway.md">api-gateway.md</a></td></tr><tr><td><strong>Chaîne d'appels et mode développeur</strong></td><td>Reproduire et localiser une requête spécifique</td><td><a href="trace.md">trace.md</a></td></tr></tbody></table>
