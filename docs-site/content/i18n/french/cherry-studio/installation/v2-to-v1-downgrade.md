---
icon: arrow-rotate-left
---
# Rétrogradation de V2 à V1

La rétrogradation est adaptée lorsque V2 perturbe temporairement des tâches critiques et que vous conservez toujours des données V1 exploitables. Elle ne convertit pas les données V2 au format V1.

{% hint style="danger" %}
Les conversations, Agents, paramètres et fichiers ajoutés dans V2 ne reviendront pas dans V1. Les sauvegardes V2 ne peuvent pas non plus être restaurées dans V1 ; avant la rétrogradation, conservez séparément la dernière sauvegarde V2 et la sauvegarde V1 d'origine ou une copie du répertoire de données.
{% endhint %}

## Rétrogradation standard

{% stepper %}
{% step %}
### Arrêter les tâches et sauvegarder V2

Terminez les conversations, Agents et tâches de traitement de fichiers en cours. Créez une nouvelle sauvegarde complète V2 via [Paramètres] → [Données] et enregistrez-la en dehors du répertoire de données de l'application.
{% endstep %}

{% step %}
### Vérifier la présence des données V1

Localisez la copie du répertoire de données V1 conservée avant la mise à niveau ou la sauvegarde V1. Si vous ne disposez que d'une sauvegarde V1, vous devez la restaurer dans une version V1 compatible ; l'importation dans V2 n'est pas possible.
{% endstep %}

{% step %}
### Télécharger et installer V1

Quittez complètement V2, récupérez le paquet d'installation correspondant à votre système actuel depuis [Téléchargement officiel V1](https://cherryai.com.cn/download/v1) et finalisez l'installation.
{% endstep %}

{% step %}
### Démarrer avec les données V1 d'origine

Lancez V1 et utilisez le répertoire de données V1 d'avant la mise à niveau. Ne le remplacez pas par la base de données V2 ou une sauvegarde V2.
{% endstep %}

{% step %}
### Vérifier avant de reprendre le travail

Vérifiez les conversations habituelles, les services de modèles, les bases de connaissances et les fichiers. Ne supprimez aucune sauvegarde V1 ou V2 avant d'avoir confirmé que les données V1 fonctionnent correctement.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
La rétrogradation standard ne nécessite pas la suppression de la base de données. Conserver les données V2 facilite un éventuel retour à V2 et évite la suppression accidentelle de contenu non encore exporté.
{% endhint %}

{% hint style="danger" %}
L'option [Paramètres] → [Données] → [Remigrer] dans V2 n'est pas une entrée de rétrogradation. Elle supprime définitivement les données V2 actuelles puis réimporte depuis les données V1 d'origine ; ne cliquez dessus que si la migration V1 précédente a échoué ou si des données ont été omises.
{% endhint %}

## Quand traiter la base de données V2

Il ne faut agir que dans les cas suivants :

* Abandonner explicitement toutes les données V2 actuelles pour ne conserver que les données V1 ;
* Nécessité de réexécuter une migration V1 → V2.

Ce n'est pas une étape de rétrogradation standard. L'opération affecte toutes les conversations, Agents, paramètres et autres données de V2, et ne se limite pas au nettoyage d'un lot d'enregistrements de test.

### Méthode de traitement sécurisée

1. Quittez complètement V1 et V2, et assurez-vous qu'aucune tâche en arrière-plan ne s'exécute.
2. Ouvrez [Paramètres] → [Données] → [Données de l'application] dans V1 1.9.13 et accédez au répertoire de données de l'application actuel.
3. Déplacez les éléments suivants vers le bureau ou un autre emplacement sûr, sans les supprimer directement :
   * `Data/cherrystudio.sqlite`
   * `Data/cherrystudio.sqlite-shm` et `Data/cherrystudio.sqlite-wal` (s'ils existent)
   * `Data/Agents/.claude`
4. Lancez V1 et vérifiez les données V1 d'origine. Si une remigration est nécessaire, lancez ensuite V2 pour finaliser la migration.
5. N'envisagez la suppression des fichiers déplacés précédemment qu'après avoir confirmé que les données V1 sont exploitables et que la sauvegarde V2 est localisable.

{% hint style="danger" %}
Ne déplacez pas la base de données pendant l'exécution de l'application, ne déplacez pas uniquement `cherrystudio.sqlite` en omettant les fichiers `-shm` ou `-wal` du même répertoire, et ne remplacez pas la base de données V2 par la base de données V1. En cas de doute sur le répertoire de données actuel ou l'utilité d'un fichier, interrompez l'opération et contactez l'équipe de support Cherry Studio.
{% endhint %}

## Questions fréquentes

<details>

<summary>Les nouvelles conversations de V2 peuvent-elles être ramenées dans V1 ?</summary>

Non. Exportez le contenu à conserver dans V2, et continuez d'utiliser uniquement les données V1 d'origine dans V1.

</details>

<details>

<summary>Le téléchargement de V1 convertit-il automatiquement les données V2 ?</summary>

Non. Le paquet d'installation installe uniquement l'application ; il ne convertit ni les données ni le format des sauvegardes.

</details>

<details>

<summary>Puis-je supprimer directement la base de données pour réessayer ?</summary>

Déconseillé. Déplacez d'abord les fichiers et conservez-les, puis décidez de les supprimer après validation ; en cas de suppression accidentelle sans sauvegarde exploitable, les données V2 pourraient être irrécupérables.

</details>

<details>

<summary>Après rétrogradation, quelle version installer pour revenir à V2 ?</summary>

Si vous continuez d'utiliser les données V2 précédentes, installez directement V2 et ne cliquez pas sur [Remigrer]. Si la migration V1 précédente a échoué ou si des données ont été omises, utilisez [Paramètres] → [Données] → [Remigrer] après avoir effectué une sauvegarde complète des données V2 actuelles ; cette opération supprime définitivement les données V2 actuelles puis réimporte depuis V1.

</details>

## Références

* [Téléchargement officiel Cherry Studio V1](https://cherryai.com.cn/download/v1)
* [Téléchargement officiel Cherry Studio V2](https://cherryai.com.cn/download)
* Page de publication V2 : [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
* [Signalement de problèmes et suggestions de fonctionnalités](../../question-contact/suggestions.md)
