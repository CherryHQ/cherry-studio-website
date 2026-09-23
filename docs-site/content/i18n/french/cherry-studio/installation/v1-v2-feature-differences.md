---
icon: table-columns
---
# Différences fonctionnelles

V2 a modifié la structure des données et plusieurs points d'accès aux fonctionnalités. Avant la mise à niveau, consultez les éléments nécessitant une reconfiguration ; pour les étapes détaillées, reportez-vous à [【Mise à niveau de V1 à V2】](v1-to-v2-migration.md).

## Changements de migration V2

| Situation | Traitement par V2 | Remarques |
| --------- | ----------------------- | ------------------------------ |
| Première migration depuis V1 | Installation directe de V2 depuis V1.9.13 | Il n'est pas nécessaire d'installer au préalable une version intermédiaire particulière de V2. |
| Mise à niveau normale de V2 | Mise à niveau directe et poursuite avec les données V2 actuelles | Ne cliquez pas sur 【Re-migrer】. |
| Re-migration de V1 | Sélectionnez 【Re-migrer】 dans 【Paramètres】→【Données】 | Les données V2 actuelles seront définitivement supprimées. À utiliser uniquement en cas d'échec de migration antérieur ou de données manquantes. |

{% hint style="danger" %}
【Re-migrer】 ne fusionne pas les données V1 avec les données V2 actuelles. Il supprime d'abord les données V2 actuelles, puis réimporte depuis les données V1 conservées. Ne cliquez jamais dessus sauf en cas d'échec de migration V1 ou de données manquantes.
{% endhint %}

## Traitement des données

| Mode de traitement | Portée des données | Actions après la mise à niveau |
| ---- | --------------------------------------------------------------------- | ------------- |
| Migration automatique | Paramètres, services de modèles et modèles, assistants et groupes, conversations et messages, Agent et conversations, MCP, bases de connaissances et index valides, fichiers, dessin, traduction, notes, prompts, journaux d'utilisation | Vérifiez que les éléments fréquemment utilisés s'ouvrent correctement. |
| À vérifier | Identifiants Anthropic, service de recherche web par défaut, permissions d'outils Agent et liaisons aux bases de connaissances, ordre des prompts, éléments de base de connaissances en échec, CSS personnalisé, favoris de la barre latérale, fichiers manquants | Reconfirmez selon le tableau ci-dessous. |
| Non hérité | Historique des tâches planifiées Agent, résultats d'expansion de l'arborescence des anciennes versions, certaines références d'images temporaires, état d'ouverture actuel des notes, configurations des fonctionnalités supprimées | Recréez-les si nécessaire. |

{% hint style="info" %}
La migration ne supprime pas les données V1 d'origine. Les nouvelles données V2 ne sont pas synchronisées vers V1, et les sauvegardes des deux versions ne peuvent pas être restaurées mutuellement.
{% endhint %}

## Différences principales

| Fonctionnalité | V1 | V2 | Actions après la mise à niveau |
| --------------- | ------------------------------- | --------------------------------------------- | -------------------------------- |
| Assistants et prompts | Bibliothèque d'assistants indépendante ; les phrases rapides peuvent être associées aux assistants | Les assistants sont gérés dans le chat et l'Agent ; les phrases rapides sont fusionnées en prompts globaux | Vérifiez les groupes d'assistants et l'ordre des prompts. |
| Agent | Certaines configurations et l'espace de travail suivent la conversation ; les autorisations anciennes peuvent approuver automatiquement les outils | L'identité, la mémoire et les configurations principales appartiennent à l'Agent ; l'espace de travail est figé après la création de la conversation ; les outils peuvent demander à nouveau l'autorisation | Vérifiez les modèles, l'espace de travail, les outils et les permissions. |
| Base de connaissances Agent | L'outil de connaissances peut accéder à la base de connaissances globale | Accès uniquement aux bases de connaissances explicitement liées | Revérifiez les liaisons aux bases de connaissances pour chaque Agent. |
| Recherche dans la base de connaissances | Sélection manuelle du mode de recherche et de la source de l'arborescence | Utilisation de BM25 sans modèle d'incorporation, recherche hybride avec modèle d'incorporation ; l'arborescence est traitée comme une URL ordinaire | Vérifiez les modèles d'incorporation et de réordonnancement ; reconstruisez les sources en échec. |
| Recherche web | Sélection du service dans l'assistant ou la zone de saisie ; inclut la recherche locale, la compression RAG et la liste noire d'abonnement | Configuration séparée de la recherche par mots-clés et de la lecture d'URL dans 【Paramètres】→【Recherche web】 ; les anciennes options associées sont supprimées | Resélectionnez les deux services par défaut et vérifiez les identifiants. |
| MCP | Coexistence des services ajoutés et du marché de découverte tiers | Les services ajoutés sont migrés ; l'ancien marché de découverte tiers n'est plus fourni | Vérifiez l'état des services ; ajoutez les nouveaux services depuis le marché actuel ou via JSON. |
| Service de modèles | Anthropic peut enregistrer les identifiants OAuth | Les identifiants OAuth Anthropic ne sont pas migrés ; la région AWS Bedrock est conservée ; les nouveaux services sont désactivés par défaut | Renseignez à nouveau la clé API pour Anthropic et activez les services si nécessaire. |
| Fichiers | Faible relation de référence entre les copies de fichiers et les objets métier | Les fichiers gérés sont gérés par référence ; la copie gérée est nettoyée avec un délai après la suppression de la dernière référence | Placez les fichiers à conserver longuement dans 【Fichiers】 ou exportez-les ; les fichiers d'origine de l'utilisateur ne sont pas supprimés. |
| Dessin, Mini App et barre latérale | Paramètres et points d'accès dans l'ancienne zone | Les paramètres de dessin sont déplacés dans la barre d'outils des prompts ; la Mini App est dans la barre d'onglets supérieure ; les favoris de la barre latérale sont réinitialisés | Familiarisez-vous avec les nouveaux points d'accès et réinitialisez les favoris. |
| CSS personnalisé | Les sélecteurs V1 sont appliqués directement | Le contenu est conservé, mais désactivé par défaut après la migration | Adaptez-les aux sélecteurs V2 avant activation. |
| Code CLI | iFlow est sélectionnable | iFlow est remplacé par Qoder | Utilisez Qoder si vous avez besoin des flux de travail associés. |

## Compatibilité développeur

<details>

<summary>Quelles sont les changements pour l'API et les intégrations externes ?</summary>

* L'identifiant de modèle de l'API Gateway passe de `provider::model` à `provider:model`.
* Les entrées renvoyées par l'API de connaissances utilisent les champs V2.
* Les points de terminaison MCP-over-HTTP ont été supprimés, sans impact sur le MCP intégré à l'application.
* L'échec du démarrage SSE peut renvoyer directement une erreur HTTP standard ; le client doit être compatible avec les chemins d'erreur HTTP et SSE.
* Les paramètres de l'interface des tâches planifiées ont changé ; les enregistrements d'exécution historiques ne sont pas migrés.

</details>

## Références

* [Mise à niveau de V1 à V2](v1-to-v2-migration.md)
* [Téléchargement officiel Cherry Studio V2](https://cherryai.com.cn/download)
* Page de publication V2 : [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
