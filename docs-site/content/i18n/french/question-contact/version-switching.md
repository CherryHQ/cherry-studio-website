---
icon: arrow-right-arrow-left
---
# Mise à niveau et rétrogradation de version

Pour passer de V1 à V2 ou inversement, veuillez d'abord consulter les instructions correspondantes :

* [Différences fonctionnelles](../cherry-studio/installation/v1-v2-feature-differences.md)
* [Mise à niveau de V1 à V2](../cherry-studio/installation/v1-to-v2-migration.md)
* [Rétrogradation de V2 à V1](../cherry-studio/installation/v2-to-v1-downgrade.md)

{% hint style="danger" %}
Avant de changer de version, créez d'abord une sauvegarde complète dans l'application, puis fermez complètement Cherry Studio et copiez l'intégralité du répertoire de données. Les sauvegardes de V1 et V2 ne sont pas interchangeables.
{% endhint %}

## Migration des données de V1 vers V2

La version 2.0.2 prend en charge la migration directe depuis la version 1.9.13, sans nécessiter d'étape intermédiaire via la version 2.0.0.

| Situation actuelle | Action à entreprendre |
| --------------- | ---------------------------------- |
| Toujours sur V1, avec nécessité de conserver les données | Mettez à jour V1 vers la version 1.9.13, puis installez directement la version 2.0.2 pour finaliser la migration. |
| Déjà sur V2 | Effectuez la mise à niveau vers la version 2.0.2 et continuez d'utiliser les données V2 actuelles. |
| Échec de la migration de V1 ou données manquantes | Après une sauvegarde complète des données V2 actuelles, vous pouvez utiliser l'option [Migration à nouveau]. |
| Pas besoin des données V1 | Vous pouvez choisir l'option [Ignorer et utiliser les valeurs par défaut], mais les données V1 ne seront pas migrées. |

{% hint style="danger" %}
L'option [Migration à nouveau] dans [Paramètres] → [Données] supprime définitivement les données V2 actuelles, puis réimporte les données V1 d'origine. Elle ne fusionne pas les données des deux versions ; ne cliquez pas dessus sauf en cas d'échec de migration de V1 ou de données manquantes.
{% endhint %}

## Liens de téléchargement

* [Téléchargement officiel V1](https://cherryai.com.cn/download/v1)
* Page de publication de la version 2.0.2 : [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
* [Téléchargement officiel V2](https://cherryai.com.cn/download)

Pour plus d'informations sur les sauvegardes, les échecs de migration et les précautions relatives à la base de données, consultez [【Mise à niveau et rétrogradation】](../cherry-studio/installation/upgrade-downgrade.md).
