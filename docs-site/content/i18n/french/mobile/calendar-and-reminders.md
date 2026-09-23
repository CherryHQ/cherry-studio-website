---
icon: calendar
---

# Calendrier et rappels

Les calendriers conviennent aux activités avec des heures de début et de fin. Les rappels correspondent aux choses que vous devez accomplir. Demandez à votre agent de vérifier d'abord les éléments existants, puis de créer ou de mettre à jour le bon.

Les outils de calendrier intégrés utilisent des calendriers accessibles via le système de votre téléphone sur iOS et Android. Les rappels intégrés ne prennent actuellement en charge que iOS. Feishu, DingTalk et d'autres services utilisent leurs propres [plugins](plugins.md) ; l'octroi de l'accès au calendrier téléphonique ne connecte pas ces comptes.

## Avant de commencer

1. Sélectionnez un modèle de texte qui prend en charge les appels d'outils.
2. Modifiez l'agent actuel et activez **Calendrier** ou **Rappels** dans sa section **Système**.
3. Accordez l'autorisation lorsque vous y êtes invité ou vérifiez l'accès sous **Paramètres → Autorisations système**.
4. Pour vérifier la création, les modifications et la suppression avant l'exécution, définissez le mode d'approbation de l'agent sur **Demander en cas de besoin**.

Les autorisations de lecture et d'écriture peuvent différer. Pouvoir créer un événement n'implique pas l'accès à la lecture de tous les événements. Un calendrier en lecture seule ne peut pas accepter d'événements nouveaux ou mis à jour.

## Consultez le programme de demain

Identifiez d'abord le calendrier, en particulier s'il existe plusieurs comptes ou des noms en double :

> Listez les calendriers disponibles sur mon téléphone et dites-moi lesquels sont accessibles en écriture. N'apportez pas de modifications.

Spécifiez ensuite une plage :

> Lisez les événements de demain dans mon calendrier de travail. Triez par heure et répertoriez le début, la fin, le titre et le lieu.

Chaque requête couvre au maximum 90 jours et renvoie au maximum 200 événements ou rappels. Pour les collections plus importantes, effectuez une requête par semaine ou par mois. Une liste renvoyée ne peut pas contenir tous les enregistrements.

## Créer un événement

> Dans mon calendrier personnel, créez « Organiser les détails du voyage » demain de 15h00 à 15h30, heure de Pékin. Définissez l'emplacement sur Domicile et les notes sur « Vérifier les billets et l'hébergement ».

Spécifiez la **date, le fuseau horaire, l'heure de début et de fin et le calendrier**. Des zones explicites telles que l'heure de Pékin ou l'heure locale de Tokyo facilitent les déplacements et les réunions à distance.

Après l'enregistrement, demandez à l'agent de relire cette plage horaire pour confirmer que l'événement existe. Si le résultat est incertain, vérifiez le calendrier du système avant de réessayer.

### Peut-il inviter des personnes, répéter des événements ou définir des alertes avancées ?

Les outils intégrés actuels n'exposent pas les invitations des participants, les règles de récurrence ou un paramètre d'alerte préalable distinct. Un événement avec un titre de réunion n'envoie pas automatiquement d'invitations. Configurez ces détails dans le calendrier système ou utilisez un plugin de service de travail disposant de la fonctionnalité nécessaire.

## Mettre à jour ou supprimer un événement existant

Rechercher et identifier l'événement avant de le modifier :

> Retrouvez l'événement « Organiser les détails du voyage » de demain à 15h00 dans mon calendrier personnel. Dites-moi d'abord son heure et son lieu actuels.

Après vérification :

> Déplacez cet événement au créneau de 16h00 à 16h30. Gardez l’emplacement et les notes inchangés.

Avant de supprimer, vérifiez également le titre, la date et le calendrier. La suppression du chat ne restaure pas un événement supprimé.

## Gérer les tâches avec des rappels sur iOS

| Objectif | Exemple de demande |
| --- | --- |
| Choisissez une liste | « Faites la liste de mes listes de rappel et dites-moi lesquelles sont accessibles en écriture. » |
| Ajouter un article | « Ajoutez « Poster le colis » à Personnel, à rendre demain à 9 heures, heure de Pékin, avec la note « Apportez le bordereau de retour ». » |
| Trouver des objets inachevés | "Répertoriez les rappels incomplets de cette semaine dans Personnel, organisés par heure." |
| Changer la date | "Déplacez l'heure d'échéance de l'envoi "Poster le colis" que nous venons de vérifier à 14 heures demain. Gardez tout le reste." |
| Compléter un élément | « Marquez ce rappel « Poster le colis » comme terminé. » |
| Supprimer un élément | "Supprimez uniquement l'élément 'Poster le colis' que nous venons de confirmer, en laissant les autres éléments portant ce nom." |

Terminer un élément le conserve avec un statut modifié ; la suppression le supprime. Les outils peuvent définir des dates de début, des dates d'échéance et des notes écrites. Si vous avez besoin d'une notification programmée, confirmez les paramètres d'alerte et les autorisations de notification dans l'application Rappels du système.

**Un emplacement écrit sur un rappel est une note, pas une alerte déclenchée par l'arrivée.** Définissez des répétitions complexes ou des déclencheurs de localisation dans l'application système. Les résultats filtrés par date ne constituent pas nécessairement la liste complète ; vérifiez également les éléments non datés.

## Pourquoi Android ouvre-t-il le calendrier système ?

Lorsque certains appareils Android ne peuvent pas effectuer une opération directement, l'application peut ouvrir une page de calendrier système :

* **Formulaire de création :** vérifiez la date et le contenu, sélectionnez le calendrier souhaité et enregistrez manuellement.
* **Page d'événements existants :** inspectez les valeurs actuelles et appliquez manuellement les modifications restantes. Les modifications demandées risquent de ne pas être complétées.

L'ouverture de cette page n'indique pas à Cherry Studio si vous l'avez enregistrée. Si une écriture expire ou si son résultat est incertain, elle est peut-être déjà terminée. Vérifiez le calendrier avant de créer un autre événement.

## Un calendrier ou un élément est manquant

Confirmez d’abord que le compte et l’enregistrement existent dans l’application Calendrier ou Rappels du système. Vérifiez ensuite les autorisations Cherry Studio, la plage de dates et le calendrier sélectionné. Les restrictions d'entreprise, les abonnements en lecture seule ou le matériel non synchronisé avec le téléphone peuvent limiter l'accès.

Voir [Laisser l'IA utiliser les outils](using-tools.md) pour le comportement d'approbation et [Données, confidentialité et autorisations](data-privacy.md) pour l'accès au système et l'utilisation des données.
