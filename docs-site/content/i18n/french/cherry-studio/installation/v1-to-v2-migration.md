---
icon: arrow-right-arrow-left
---
# Migration de V1 à V2

{% hint style="danger" %}
La migration est unidirectionnelle : les données de V1 peuvent être importées dans V2, mais les nouvelles données de V2 ne seront pas synchronisées vers V1. Avant la mise à niveau, conservez une sauvegarde complète de V1 et une copie intégrale du répertoire de données V1 effectuée après avoir complètement fermé l'application.
{% endhint %}

{% hint style="warning" %}
Le chemin correct pour conserver les données est : **V1.9.13 → V2 (migration des données directe)**. Il n'est pas nécessaire d'installer d'abord une version intermédiaire particulière de V2.
{% endhint %}

## Choisir selon votre situation actuelle

| Situation actuelle | Action |
| --------------- | ------------------------------------ |
| Toujours sur V1, besoin de conserver les données | Mettez à jour V1 vers 1.9.13, puis installez directement V2 en suivant les étapes de cette page. |
| Déjà sur V2 | Mettez à jour normalement vers V2 et continuez à utiliser les données V2 actuelles ; ne cliquez pas sur [Réinitialiser la migration]. |
| Échec de la migration V1 précédente ou données manquantes | Après une sauvegarde complète de V2 actuelle, vous pouvez utiliser [Réinitialiser la migration] pour recommencer depuis V1. |
| Pas besoin des données V1 | Vous pouvez choisir [Ignorer et utiliser les valeurs par défaut] pour démarrer avec la configuration par défaut ; les données V1 ne seront pas importées. |

## Vérifications avant la mise à niveau

* V1 doit être au moins en version 1.9.12, il est recommandé de mettre à jour vers la version finale 1.9.13 et de la lancer au moins une fois.
* Pour la première migration, vous pouvez utiliser directement V2.
* Le répertoire de données personnalisé ou le disque externe doit être accessible en lecture et en écriture.
* Les conversations, les tâches d'importation de base de connaissances et de traitement de fichiers, ainsi que les agents, doivent être terminés.

{% hint style="warning" %}
L'assistant de migration lit le répertoire de données V1 actuel, et non l'archive ZIP de sauvegarde V1. La sauvegarde sert à la restauration en cas d'incident et ne peut pas remplacer le répertoire de données original pour la migration.
{% endhint %}

## Étapes de la procédure

{% stepper %}
{% step %}
### Mettre à jour et sauvegarder V1

Mettez à jour V1 vers 1.9.13. Sur la page de sauvegarde des données, désactivez [Sauvegarde allégée], créez une sauvegarde complète et enregistrez-la en dehors du répertoire de données de l'application.
{% endstep %}

{% step %}
### Copier l'intégralité du répertoire de données V1

Vérifiez l'emplacement du répertoire dans les paramètres de données de V1, puis copiez l'intégralité du répertoire après avoir complètement fermé Cherry Studio. Ne copiez pas uniquement le fichier de base de données.
{% endstep %}

{% step %}
### Vérifier les répertoires personnalisés

Lors de l'utilisation d'un disque dur portable, d'un volume réseau ou d'un autre emplacement personnalisé, assurez-vous que le chemin est monté et accessible en lecture/écriture. Si le chemin n'est pas accessible, ne passez pas au répertoire par défaut pour continuer la migration.
{% endstep %}

{% step %}
### Première ouverture de V2

Téléchargez le package d'installation V2 correspondant à votre système et à votre processeur depuis [Téléchargement officiel V2](https://cherryai.com.cn/download), ou utilisez la [page de publication GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) ou la [page de publication GitHub](https://github.com/CherryHQ/cherry-studio/releases). Installez et lancez l'application après avoir complètement fermé V1.
{% endstep %}

{% step %}
### Terminer l'[Assistant de migration des données]

Vérifiez l'emplacement des données affiché par l'assistant, puis sélectionnez [Démarrer la migration]. Pendant la migration, ne fermez pas l'application, ne déplacez pas le répertoire de données et ne débranchez pas le disque externe.
{% endstep %}

{% step %}
### Consulter les résultats et redémarrer

Après la fin de la migration, dépliez d'abord les messages d'avertissement, puis sélectionnez [Redémarrer l'application].
{% endstep %}
{% endstepper %}

## Vérifications après la mise à niveau

* Vérifiez les services de modèles courants, les clés API et le modèle par défaut.
* Vérifiez les groupes d'assistants, les prompts, les permissions des agents et les liaisons de base de connaissances.
* Ouvrez les conversations, bases de connaissances et fichiers courants ; reconstruisez uniquement les sources de connaissances affichées comme ayant échoué.
* Révifiez les services de recherche par mots-clés et de lecture d'URL dans [Paramètres] → [Recherche web].
* Vérifiez les favoris de la barre latérale et le CSS personnalisé.
* Créez une nouvelle sauvegarde complète V2 dans [Paramètres] → [Données].

Pour plus de changements d'interface, voir [Différences fonctionnelles](v1-v2-feature-differences.md).

## Utiliser [Réinitialiser la migration] uniquement en cas d'échec

Si la migration V1 précédente a échoué ou si des données ont été omises, V2 permet de sélectionner [Réinitialiser la migration] dans [Paramètres] → [Données]. Cette opération redémarre l'application et relance la migration à partir des données V1 conservées.

{% hint style="danger" %}
[Réinitialiser la migration] supprime définitivement les données V2 actuelles et ne fusionne pas les données V1 et V2. Ne cliquez dessus que si la migration V1 précédente a échoué ou si des données ont été omises. Une sauvegarde complète de V2 actuelle est obligatoire avant l'opération ; les nouvelles données V2 à conserver doivent également être exportées séparément.
{% endhint %}

## En cas d'échec de la migration

| Option | Quand l'utiliser | Précautions |
| ---------- | --------------- | ---------------------------------------------- |
| [Réessayer] | Après avoir corrigé les problèmes de répertoire, de disque ou de données temporaires | À privilégier, ne quitte pas le processus de migration. |
| [Enregistrer les informations du problème] | Si l'échec persiste et qu'une assistance est nécessaire | Le fichier est enregistré localement, peut contenir des chemins, du contenu ou des identifiants ; ne le fournissez qu'à l'équipe de support Cherry Studio. |
| [Ignorer et utiliser les valeurs par défaut] | Si vous décidez explicitement d'abandonner l'importation des données V1 | Efface les données V2 partielles écrites lors de cette session et démarre avec la configuration par défaut ; aucune invitation de migration automatique ne sera affichée ensuite. |
| [Continuer avec V1] | Si la migration n'est pas possible pour le moment et que vous devez reprendre le travail | Réinstallez V1 et continuez à utiliser le répertoire de données V1 original. |

{% hint style="danger" %}
En cas d'échec de la migration ou de sélection erronée de [Ignorer et utiliser les valeurs par défaut], ne supprimez pas vous-même la base de données et ne réinstallez pas en écrasant répétément. Conservez les données V1 originales et les sauvegardes, et contactez l'équipe de support Cherry Studio.
{% endhint %}

## Questions fréquentes

<details>

<summary>J'ai uniquement une sauvegarde ZIP de V1, puis-je migrer directement ?</summary>

Non. Restaurez d'abord les données dans une version compatible de V1 et vérifiez qu'elles sont correctes, conservez le répertoire de données complet, puis lancez la migration V2.

</details>

<details>

<summary>Faut-il reconstruire les index de toutes les bases de connaissances ?</summary>

Non. Les index valides seront migrés ; seules les sources affichées comme ayant échoué, manquant de modèle d'intégration ou illisibles seront traitées.

</details>

## Références

* [Téléchargement officiel Cherry Studio V2](https://cherryai.com.cn/download)
* [Téléchargement officiel Cherry Studio V1](https://cherryai.com.cn/download/v1)
* Page de publication V2 : [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
* [Spécifications de conception de la migration officielle](https://github.com/CherryHQ/cherry-studio/blob/main/src/main/data/migration/v2/README.md#version-compatibility-gate)
* [Signalement de problèmes et suggestions de fonctionnalités](../../question-contact/suggestions.md)
