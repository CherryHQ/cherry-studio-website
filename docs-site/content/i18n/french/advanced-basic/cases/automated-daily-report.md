---
icon: newspaper
---
# Canaux et rapport quotidien planifié

L'équipe opérationnelle souhaite compiler automatiquement chaque matin de jour ouvré les ressources désignées, générer un rapport quotidien et l'envoyer dans le canal de l'équipe. Avant d'automatiser, exécutez manuellement un rapport pour détecter rapidement les lacunes de données, les erreurs de chemin et les problèmes de destination de notification.

## Prérequis

* Un Agent de rapport quotidien validé dans l'onglet 【Travail】 ;
* Des sources de données claires et un répertoire de travail contenant uniquement les ressources nécessaires ;
* Un format fixe pouvant être défini comme compétence ;
* Un canal connecté avec un périmètre de messages restreint ;
* Une tâche planifiée pour les jours ouvrés.

<figure><img src="../../../../assets/e2328ba60a3ff5012831c39e.webp" alt="Associez d'abord le rapport quotidien à un canal testé, puis sélectionnez-le comme destination de notification pour la tâche planifiée."><figcaption><p>Associez d'abord le rapport quotidien à un canal testé, puis sélectionnez-le comme destination de notification pour la tâche planifiée. </p></figcaption></figure>

<figure><img src="../../../../assets/401d6b23759ab97ded47c2b5.webp" alt="Après la première exécution automatique, vérifiez via l'état de l'Agent et les journaux d'exécution que la tâche a bien été complétée."><figcaption><p>Après la première exécution automatique, vérifiez via l'état de l'Agent et les journaux d'exécution que la tâche a bien été complétée. </p></figcaption></figure>

<figure><img src="../../../../assets/005c0418156c52d0a531192b.webp" alt="① La tâche est activée et affiche l'heure de la prochaine exécution ; ② Le prompt définit clairement la structure en quatre parties, la gestion des données manquantes et les conditions d'envoi vers le canal."><figcaption><p>① La tâche est activée et affiche l'heure de la prochaine exécution ; ② Le prompt définit clairement la structure en quatre parties, la gestion des données manquantes et les conditions d'envoi vers le canal. </p></figcaption></figure>

## Étapes de configuration

{% stepper %}
{% step %}
### 1. Générer manuellement un rapport quotidien

Demandez à l'Agent de produire quatre sections : « Progrès, Indicateurs, Risques, À faire ». Vérifiez qu'il signale explicitement les données manquantes au lieu d'inventer du contenu.
{% endstep %}

{% step %}
### 2. Configurer le canal de notification

Précisez d'abord dans la conversation avec l'Agent la plateforme et le groupe à connecter, puis vérifiez dans 【Paramètres】→【Canaux】 les identifiants, les identifiants de session autorisés, l'espace de travail et le mode de permissions.
{% endstep %}

{% step %}
### 3. Créer la tâche planifiée

Demandez à l'Agent de créer un planning pour les jours ouvrés, ou accédez à 【Paramètres】→【Tâches planifiées】→【Nouveau】. Sélectionnez l'Agent de rapport, le répertoire de travail, l'heure d'exécution et le canal de notification.
{% endstep %}

{% step %}
### 4. Tester immédiatement

Après enregistrement, cliquez sur 【Exécuter】 et consultez la session générée, l'historique d'exécution et les messages du canal. N'attendez pas le lendemain pour découvrir une erreur de chemin ou de destination.
{% endstep %}

{% step %}
### 5. Observer et ajuster

Vérifiez la durée, la consommation et les causes d'échec lors des premières exécutions. En cas de changement de source de données ou de format d'équipe, mettez à jour la compétence ou le prompt de la tâche, sans maintenir des règles contradictoires à plusieurs endroits.
{% endstep %}
{% endstepper %}

## Exemple de prompt de tâche

```
Lisez les données ajoutées hier dans le dossier de travail et générez un rapport opérationnel quotidien en chinois comprenant toujours l’avancement, les indicateurs clés, les anomalies et les tâches du jour. Si des données manquent, écrivez « Aucune donnée » et listez les fichiers absents sans inventer de chiffres. Envoyez le résultat au canal d’équipe configuré et conservez une copie Markdown dans le dossier de travail.
```

## Gestion des échecs

| Symptôme | Emplacement à vérifier |
| ------ | --------------------- |
| Aucune exécution | État de la tâche planifiée, heure de la prochaine exécution, veille du système |
| Échec de l'exécution | 【Historique d'exécution】→【Voir la session】 |
| Fichier non généré | Répertoire de travail, demandes de permissions et outils de fichiers de l'Agent |
| Message non livré | État du canal, destination de réception et journaux de la plateforme |
| Contenu dupliqué | Vérifier si le battement de cœur et plusieurs plans identiques sont activés simultanément |

## Combinaisons recommandées et critères de réussite

| Élément | Pratique recommandée |
| ----- | ---------------------------------- |
| Agent | Exécuter d'abord manuellement le même rapport quotidien, puis le confier à la tâche planifiée |
| Planning | Privilégier 【Chaque jour】 ou 【Jours ouvrés】 et confirmer l'heure de la prochaine exécution |
| Canal | Envoyer d'abord vers une session de test, puis basculer vers le groupe officiel |
| Critère de réussite | Historique d'exécution réussi ; fichier du rapport accessible ; le canal ne reçoit qu'un seul message ; aucune invention de résultats en cas de données manquantes |

{% hint style="warning" %}
Les tâches planifiées s'exécutent sans supervision. Avant la mise en production, maintenez un périmètre de fichiers minimal et des permissions appropriées, afin d'éviter de confier des écritures à haut risque ou des modifications externes au mode d'accès complet.
{% endhint %}

{% hint style="info" %}
L'environnement de démonstration de la capture d'écran n'est pas lié à un canal externe, elle ne montre donc que la tâche enregistrée et activée. Pour une utilisation réelle, cliquez sur 【Exécuter】, confirmez le succès dans 【Historique d'exécution】 et vérifiez la réception d'un message réel dans le canal de test avant de passer en exploitation quotidienne.
{% endhint %}
