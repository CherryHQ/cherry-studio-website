---
icon: map-pin
---

# Localisation et données de santé

L'outil de localisation lit la position actuelle de votre téléphone. Les outils de santé résument les dossiers de santé iOS existants. Chacun a besoin du commutateur de capacité et de l'autorisation système de l'agent ; L'approbation automatique n'accorde pas l'accès.

## Gérer les autorisations

Activez **Localisation** ou **Santé** dans la section **Système** de l'agent actuel, puis autorisez l'accès lorsque vous y êtes invité. Vous pouvez également vérifier les autorisations prises en charge et leur statut sous **Paramètres → Autorisations système**.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/system-permissions.webp"><img src="../../../assets/mobile/en/system-permissions.webp" alt="Les autorisations système répertorient séparément l'emplacement, la santé, le calendrier et les autres accès."></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Les autorisations système sont distinctes des commutateurs de capacités de l'agent</p></figcaption></figure>
</div>

Pour empêcher un agent d'utiliser une fonctionnalité, désactivez son commutateur. Pour révoquer l'accès au système de l'application, suivez les instructions de la page d'autorisation pour accéder aux paramètres système concernés.

## Obtenez votre position, puis recherchez à proximité

Commencez par :

> Obtenez ma position actuelle. Dites-moi approximativement dans quelle zone je me trouve et à quel moment cette position a été obtenue.

Pour les lieux ou itinéraires à proximité, combinez-le avec un plugin Amap connecté :

> Obtenez ma position actuelle, puis utilisez Amap pour trouver les stations de métro à proximité. Énumérez leurs noms et adresses.

Ces étapes ont des exigences distinctes : la localisation du téléphone nécessite une autorisation système, tandis que les requêtes cartographiques nécessitent la connexion Amap. La connexion du Amap seule ne lit pas l'emplacement de votre téléphone.

### Puis-je planifier un itinéraire sans accorder l’accès à la localisation ?

Oui. Indiquez vous-même le point de départ et la destination :

> Utilisez Amap pour trouver les itinéraires de transports en commun de la Place du Peuple à Shanghai à la gare de Hongqiao. Comparez les transferts et la durée estimée sans lire la position de mon téléphone.

L'outil de localisation intégré obtient une position actuelle au premier plan. Il ne fournit pas de suivi continu, de localisation en arrière-plan ou de navigation étape par étape. Les descriptions d'itinéraire proviennent du service de cartographie ; La lecture d'un emplacement n'est pas une navigation en direct.

### La localisation échoue ou les coordonnées n'ont pas d'adresse

* Vérifiez que les services de localisation du système et l'autorisation de Cherry Studio sont activés et conservez l'application au premier plan.
* La réception intérieure, l'appareil et la précision du système affectent les résultats. Un délai d'attente ne signifie pas nécessairement que l'autorisation a été refusée.
* La conversion des coordonnées en adresse écrite peut échouer séparément. Les coordonnées sans adresse ne signifient pas que la demande de localisation entière a échoué.
* Résolvez la cause signalée avant de réessayer explicitement, ou indiquez plutôt une ville, un point de repère ou une adresse de départ.

## Résumer les dossiers de santé sur iOS

Les outils actuels peuvent lire ces types de données enregistrées :

| Catégorie | Informations disponibles |
| --- | --- |
| Activité quotidienne | Pas, énergie active, distance de marche et de course |
| Mesures cardiaques | Fréquence cardiaque, fréquence cardiaque au repos, variabilité de la fréquence cardiaque |
| Dormir | Durée de sommeil enregistrée |
| Entraînements | Entraînements enregistrés dans une plage de dates |

Autorisez uniquement les types dont vous avez besoin. Un résumé du nombre de pas ne nécessite pas de partager des données cardiaques ou de sommeil. Les outils actuels lisent les enregistrements ; ils ne peuvent pas écrire ou supprimer des dossiers de santé. Android ne propose actuellement pas ces outils de santé.

Exemples de demandes :

> Lisez les sept derniers jours de pas enregistrés et de distance de marche/course, regroupés par jour. Étiquetez les jours manquants « Aucun enregistrement disponible » ; ne les remplissez pas de zéro.

> Résumez la durée de sommeil enregistrée de la semaine dernière et identifiez les dates pour lesquelles des enregistrements sont manquants.

> Répertoriez les entraînements enregistrés ce mois-ci, indiquez combien ont été renvoyés et expliquez si la liste est incomplète.

Une requête peut couvrir une période maximale de 90 jours. Sans dates précises, les outils utilisent les sept derniers jours. La liste des entraînements contient 20 enregistrements par défaut, avec un maximum de 50 par appel. Réduisez la période lorsque les enregistrements sont plus nombreux.

## Pourquoi les résultats sont-ils vides ou partiels ?

Le système peut ne pas avoir d'enregistrements correspondants, le type de données peut manquer d'autorisation, les enregistrements historiques peuvent être indisponibles ou le chargement d'une métrique peut échouer. **Un résultat vide ne signifie pas zéro pas ou aucun exercice.** iOS ne divulgue pas entièrement les refus de lecture, l'application ne peut donc pas distinguer ces cas d'un seul résultat vide.

Vérifiez les dates et les enregistrements dans l’application Santé du système, puis vérifiez l’accès pour le type spécifique. Essayez une plage plus courte et une métrique à la fois. Demandez à l'agent d'indiquer les données manquantes plutôt que de traiter un résultat incomplet comme une tendance complète.

Les résultats de localisation et de santé peuvent être envoyés au service modèle sélectionné dans le cadre de la conversation. Voir [Données, confidentialité et autorisations](data-privacy.md).
