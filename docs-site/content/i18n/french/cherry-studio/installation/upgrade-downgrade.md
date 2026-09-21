---
icon: arrows-rotate
---
# Mise à niveau et rétrogradation

Sélectionnez les instructions correspondantes en fonction de la version actuelle et de la version cible. V1 et V2 utilisent des structures de données différentes ; une sauvegarde est obligatoire avant tout changement de grande version.

{% hint style="danger" %}
Les données et les formats de sauvegarde de V1 et V2 ne sont pas compatibles. Les sessions, Agents, paramètres et fichiers ajoutés dans V2 ne sont pas rétroactivement écrits dans V1.
{% endhint %}

## Mise à niveau et migration vers V2.0.2

{% hint style="warning" %}
Si vous devez conserver les données V1, la procédure correcte est : **V1.9.13 → V2.0.2 (migration des données directe)**. Il n'est plus nécessaire d'installer d'abord V2.0.0.
{% endhint %}

| Situation actuelle | Action à entreprendre |
| --------------- | ------------------------------------ |
| Toujours sur V1, besoin de conserver les données | Mettre à jour V1 vers 1.9.13, puis installer directement V2.0.2 pour finaliser la migration. |
| Déjà sur V2 | Mettre à niveau vers V2.0.2 normalement et continuer à utiliser les données V2 actuelles ; ne pas cliquer sur [Réimporter]. |
| Échec de la migration V1 précédente ou données manquantes | Effectuer une sauvegarde complète des données V2 actuelles avant d'utiliser [Réimporter] dans [Paramètres] → [Données]. |
| Pas besoin des données V1 | Vous pouvez choisir [Ignorer et utiliser les valeurs par défaut], mais les données V1 ne seront pas migrées. |

{% hint style="danger" %}
[Réimporter] supprime définitivement les données V2 actuelles, puis réimporte depuis les données V1 d'origine. Aucune fusion ni conservation des données des deux côtés n'est effectuée. Ne cliquez sur ce bouton que si la migration V1 précédente a échoué ou si des données ont été omises.
{% endhint %}

## Choix du parcours

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Alerte sur les mises à jour destructives</strong></td><td>Vérifiez d'abord l'incompatibilité des données, la réimportation et les limites de rétrogradation.</td><td><a href="v2-breaking-update-notice.md">v2-breaking-update-notice.md</a></td></tr><tr><td><strong>Différences fonctionnelles</strong></td><td>Comprenez les changements d'interface, d'Agents, de bases de connaissances, etc., et les éléments à vérifier après la mise à niveau.</td><td><a href="v1-v2-feature-differences.md">v1-v2-feature-differences.md</a></td></tr><tr><td><strong>Mise à niveau de V1 vers V2</strong></td><td>Sauvegardez les données V1 et utilisez directement V2.0.2 pour finaliser la migration.</td><td><a href="v1-to-v2-migration.md">v1-to-v2-migration.md</a></td></tr><tr><td><strong>Rétrogradation de V2 vers V1</strong></td><td>Revenez aux données V1 d'origine et comprenez quand il est nécessaire de traiter la base de données V2.</td><td><a href="v2-to-v1-downgrade.md">v2-to-v1-downgrade.md</a></td></tr></tbody></table>

## Préparation avant le changement

1. Terminez les conversations en cours, les tâches d'Agents, les importations de bases de connaissances et les traitements de fichiers.
2. Créez une nouvelle sauvegarde complète de la version actuelle et conservez-la en dehors du répertoire de données de l'application.
3. Notez le répertoire de données de l'application actuel ; si vous utilisez un répertoire personnalisé ou un disque externe, vérifiez que le chemin est accessible.

{% hint style="warning" %}
Ne supprimez pas manuellement les données de l'application pour une « désinstallation complète ». Le traitement de la base de données ne s'applique que si vous abandonnez définitivement toutes les données V2 ou si vous effectuez une réimportation, voir [Rétrogradation de V2 vers V1](v2-to-v1-downgrade.md).
{% endhint %}

## Liens de téléchargement

* [Téléchargement officiel Cherry Studio V2](https://cherryai.com.cn/download)
* [Téléchargement officiel Cherry Studio V1](https://cherryai.com.cn/download/v1)
* Page de publication V2.0.2 : [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
