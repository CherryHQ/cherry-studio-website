---
icon: triangle-exclamation
---
# Avertissement de mise à jour majeure

V2 ne constitue pas une simple mise à jour d'écrasement. Elle modifie la structure des données et ajuste les points d'entrée et le comportement des fonctions telles que les assistants, les Agents, les bases de connaissances, la recherche web et les fichiers.

{% hint style="danger" %}
Les données V1 ne peuvent être migrées que dans un sens vers V2. Les nouvelles conversations, Agents, paramètres et fichiers créés dans V2 ne seront pas synchronisés vers V1, et les sauvegardes de V1 et V2 ne peuvent pas être restaurées mutuellement.
{% endhint %}

## V2.0.2 permet la migration directe depuis V1

Si vous devez conserver les données V1, suivez la procédure **V1.9.13 → V2.0.2 (migration des données directe)** ; l'étape intermédiaire V2.0.0 n'est plus nécessaire.

| Situation actuelle | Action à entreprendre |
| --------------- | --------------------------------- |
| Toujours sur V1, besoin de conserver les données | Mettez à jour V1 vers 1.9.13, effectuez une sauvegarde complète, puis installez directement V2.0.2. |
| Déjà sur V2 | Effectuez la mise à niveau normale vers V2.0.2 et continuez d'utiliser les données V2 actuelles. |
| Échec de la migration V1 précédente ou données manquantes | Effectuez d'abord une sauvegarde complète de V2 actuel, puis envisagez d'utiliser [Réinitialiser la migration]. |
| Pas besoin des données V1 | Vous pouvez choisir [Ignorer et utiliser les valeurs par défaut], mais les données V1 ne seront pas migrées. |

{% hint style="danger" %}
La mise à niveau normale vers V2.0.2 ne nécessite pas de cliquer sur [Réinitialiser la migration]. Cette opération supprime définitivement les données V2 actuelles, puis réimporte depuis les données V1 d'origine ; ne cliquez dessus que si la migration V1 précédente a échoué ou si des données ont été omises.
{% endhint %}

## À effectuer avant la mise à niveau

1. Mettez à jour V1 vers 1.9.13 et lancez-le au moins une fois normalement.
2. Désactivez [Sauvegarde allégée] et créez une sauvegarde complète de V1.
3. Quittez complètement Cherry Studio, puis copiez tout le répertoire de données V1.
4. Si vous utilisez un répertoire personnalisé ou un disque externe, vérifiez que le chemin est monté et accessible en lecture/écriture.

L'assistant de migration lit le répertoire de données V1 actuel, et non l'archive ZIP de sauvegarde. La sauvegarde sert à la restauration en cas d'incident et ne peut pas remplacer le répertoire de données d'origine pour la migration.

## [Réinitialiser la migration] n'est pas une fusion de données

V2.0.2 ajoute [Réinitialiser la migration] dans [Paramètres] → [Données]. Elle sert uniquement à corriger les échecs de migration V1 précédents ou les données omises.

Avant l'opération, vous devrez confirmer les points suivants :

* Les données V2 actuelles seront supprimées définitivement et l'opération est irréversible.
* Les données V1 d'origine seront conservées et réimportées après redémarrage.
* Une sauvegarde complète de V2 actuel doit être créée au préalable.

Une sauvegarde complète ne fusionne pas automatiquement les données V1 et V2. Pour les nouveaux contenus V2 à conserver, exportez-les d'abord séparément ou conservez une sauvegarde complète.

{% hint style="danger" %}
L'option [Données résiduelles de la version v1] dans [Paramètres] → [Données] → [Vider le cache] supprime les données V1 d'origine nécessaires à [Réinitialiser la migration]. Ne nettoyez pas cette option avant d'avoir confirmé l'intégralité du résultat de la migration et de conserver une sauvegarde indépendante.
{% endhint %}

## Points de contrôle après la mise à niveau

* Services de modèles, clés API et modèle par défaut ; l'OAuth Anthropic n'est pas migré, il faut utiliser une clé API.
* Groupes d'assistants, ordre des prompts, permissions des outils des Agents et liaisons de bases de connaissances.
* Sources d'échec des bases de connaissances, services de recherche par mots-clés et de lecture d'URL pour la recherche web.
* CSS personnalisé, favoris de la barre latérale et fichiers manquants.

Voir la comparaison complète dans [【Différences fonctionnelles】](v1-v2-feature-differences.md).

## En cas d'échec de migration ou de retour arrière

* Utilisez prioritairement [Réessayer], après avoir corrigé les problèmes de répertoire de données, de disque ou de données.
* [Enregistrer les informations de problème] ne sauvegarde que localement ; le fichier peut contenir des chemins, du contenu ou des identifiants, ne le fournissez qu'à l'équipe de support Cherry Studio.
* [Ignorer et utiliser les valeurs par défaut] démarre avec la configuration par défaut, les données V1 ne seront pas migrées.
* Pour revenir normalement à V1, il n'est pas nécessaire de supprimer la base de données, et ne restaurez pas une sauvegarde V2 sur V1.

{% hint style="danger" %}
Ne supprimez ni ne remplacez la base de données vous-même. En cas d'erreur, d'incertitude sur le répertoire de données, ou besoin de réinitialiser la migration, conservez d'abord toutes les sauvegardes et répertoires de données, puis contactez l'équipe de support Cherry Studio.
{% endhint %}

## Continuer la lecture

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Différences fonctionnelles</strong></td><td>Voir la migration automatique, les éléments à vérifier et ceux non hérités.</td><td><a href="v1-v2-feature-differences.md">v1-v2-feature-differences.md</a></td></tr><tr><td><strong>Mise à niveau de V1 à V2</strong></td><td>Effectuer la sauvegarde, la migration et la validation dans le bon ordre de versions.</td><td><a href="v1-to-v2-migration.md">v1-to-v2-migration.md</a></td></tr><tr><td><strong>Basculement de V2 à V1</strong></td><td>Comprendre les précautions pour le retour arrière, la sauvegarde et la gestion de la base de données.</td><td><a href="v2-to-v1-downgrade.md">v2-to-v1-downgrade.md</a></td></tr></tbody></table>

## Liens de téléchargement

* [Téléchargement officiel V1](https://cherryai.com.cn/download/v1)
* Page de publication V2.0.2 : [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
* [Téléchargement officiel V2](https://cherryai.com.cn/download)
