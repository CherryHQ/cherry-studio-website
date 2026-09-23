---
icon: wrench
---

# Faire utiliser des outils à l’IA

Les outils permettent à un agent de récupérer des informations ou d'effectuer une action : lire une page Web, consulter votre calendrier ou enregistrer une réponse sous forme de fichier. Le modèle utilise ensuite le résultat pour poursuivre sa réponse. Vous n'avez pas besoin de vous souvenir des noms d'outils : décrivez le matériau, la tâche et le résultat souhaité.

## De quel outil ai-je besoin ?

| Votre tâche | Que préparer | Guider |
| --- | --- | --- |
| Rechercher ou lire des pages Web | Activer la fonctionnalité Web de l'agent et configurer les services de recherche et de lecture | [Recherche Web et lecture de pages](web-search.md) |
| Consultez les horaires, créez des événements ou gérez des tâches | Activer le calendrier ou les rappels et accorder les autorisations système | [Calendrier et rappels](calendar-and-reminders.md) |
| Obtenez votre position actuelle ou résumez l'activité enregistrée | Activer et autoriser la capacité de l'appareil ; la santé est iOS uniquement | [Emplacement et dossiers de santé](location-and-health.md) |
| Enregistrer une liste de contrôle, un tableau ou une page Web | Sélectionnez un modèle de texte prenant en charge les appels d'outils | [Créer et modifier des fichiers](file-generation.md) |
| Transformez un fichier HTML en image ou présentation | Ouvrez le fichier HTML enregistré et utilisez son menu de partage | [HTML vers image et PPT](html-export.md) |
| Lire ou mettre à jour le matériel dans Feishu, Notion et d'autres services | Connectez le plugin avec un compte pouvant accéder au matériel | [Plugins et outils externes](plugins.md) |
| Demander à un agent de texte de générer une image | Activer la génération d'images et configurer un modèle de dessin | [Génération d'images](image-generation.md) |
| Utiliser un service d'outil à distance fourni par quelqu'un | Ajoutez un serveur MCP et activez-le dans un agent enregistré | [Configuration de l'outil personnalisé](plugins.md) |

Les actions basées sur un modèle nécessitent un modèle qui prend réellement en charge les appels d'outils. La conversion manuelle d'un fichier HTML enregistré ne le fait pas. La vérification d'un indicateur de capacité dans l'éditeur de modèle ne peut pas ajouter la prise en charge qui manque au modèle.

## Essayez d'abord une petite tâche

1. Sélectionnez un modèle de texte qui prend en charge les appels d'outils.
2. Modifiez l'agent actuel et activez la fonctionnalité dont vous avez besoin dans sa section **Système**. La lecture et l'écriture de fichiers n'ont pas de commutateur de capacité système distinct.
3. Connectez un compte pour les plugins ou accordez une autorisation lors de l'utilisation des fonctionnalités de l'appareil. Un commutateur d’agent et une autorisation système sont des exigences distinctes.
4. Demandez une tâche spécifique, inspectez le résultat, puis continuez.

Commencez par :

> Listez d’abord les calendriers inscriptibles sur mon téléphone, puis lisez les événements de demain. Triez-les par heure de début et nommez le calendrier pour chacun. Ne créez ni ne modifiez rien.

Une fois le résultat renvoyé, remplacez Personnel ci-dessous par un véritable calendrier inscriptible à partir du résultat. Si aucun n'est disponible, configurez-en d'abord un dans le calendrier système :

> Dans le calendrier personnel que vous venez de lister, créez « Organiser le matériel » demain de 15h00 à 15h30, heure de Pékin. Dites-moi s'il a été enregistré avec succès.

Des demandes distinctes vous aident à confirmer la cible. Pour que l'application demande l'approbation avant les actions éligibles, modifiez également le mode d'approbation de l'agent sur **Demander en cas de besoin**. Une instruction écrite demandant de demander en premier ne remplace pas ce paramètre.

## Faire des demandes spécifiques

Incluez **où se trouve le matériel → la date ou la plage de contenu → l'action → le format de sortie → s'il faut apporter des modifications maintenant**.

* "Lisez ce document Feishu : [lien]. Résumez uniquement la section deux en tant que propriétaire, tâche et date limite. Marquez les détails manquants comme non confirmés. Ne créez pas encore de tâches. "
* "Transformez ma liste de contrôle ci-jointe en un fichier CSV avec des colonnes d'articles, de quantité et de notes. Enregistrez-la sous Packing-list.csv."
* "Utilisez Amap pour comparer les itinéraires de transports en commun entre la place du Peuple à Shanghai et la gare de Hongqiao. Incluez les transferts et la durée estimée. Ne lisez pas l'emplacement de mon téléphone. "

Une tâche peut combiner des fichiers, des pages Web, des calendriers et des plugins, mais chaque fonctionnalité doit être disponible. La lecture d'un document n'accorde pas l'autorisation de créer des tâches ; obtenir votre position ne connecte pas un service de planification d'itinéraire.

## Pourquoi seules certaines actions demandent-elles une approbation ?

| Action | Avec demander en cas de besoin |
| --- | --- |
| Recherche intégrée, lecture de fichiers et lecture des données autorisées de l'appareil | Fonctionne généralement directement |
| Création et édition de fichiers texte intégrés | Fonctionne directement ; ce mode ne demande pas chaque changement de fichier |
| Création, mise à jour ou suppression d'événements et de rappels système | Nécessite l'approbation de l'outil |
| Plugins et outils personnalisés | Suit les règles de l'outil et peut nécessiter une approbation |
| Génération d'images via un modèle de texte | Nécessite toujours une approbation, y compris en mode Approuver automatiquement |

**Approuver automatiquement** approuve les actions éligibles, tandis que les autorisations du compte et du système s'appliquent toujours. Les nouveaux agents utilisent actuellement ce mode par défaut. Voir [Agents et outils](agents-and-tools.md).

## Comment savoir si la tâche est terminée ?

Les opérations de l'outil apparaissent dans les détails du processus de la réponse. Préparer du contenu, attendre l'approbation ou vous demander de continuer dans une application système ne signifie pas que l'action est terminée.

* **Lecture réussie :** vérifiez la source et la plage de requête avant de vous fier au résumé. Un résultat vide ne signifie pas toujours qu'aucun enregistrement n'existe.
* **Un fichier a été créé :** ouvrez sa fiche ou recherchez-le sous Fichiers dans la barre latérale. Un bloc de code ou une phrase disant « créé » n’établit pas qu’un fichier a été enregistré.
* **Une modification externe a réussi :** vérifiez le résultat de l'outil et, si nécessaire, le calendrier, le document ou la tâche cible.
* **Seulement une partie réussie :** identifiez les actions terminées et terminez uniquement ce qui reste.

## Et s'il cale ou échoue ?

| Ce que tu vois | Étape suivante |
| --- | --- |
| Une réponse textuelle sans appel d'outil | Demander explicitement la lecture ou la sauvegarde ; vérifiez le modèle, les commutateurs de capacité et les connexions |
| En attente d'approbation | Examinez l’objectif et l’action, puis autorisez ou rejetez ; l'autorisation du système peut être une étape distincte |
| Autorisation insuffisante | Résolvez-le dans les paramètres système ou dans le service ; la reformulation de la demande ne peut pas accorder l'accès |
| La recherche ou la lecture a échoué | Vérifiez le problème de réseau, de lien ou de compte signalé et essayez une plage plus étroite. |
| Une écriture a expiré avec un résultat incertain | Vérifiez le service cible avant de réessayer pour éviter les doublons |
| Android a ouvert l'application de calendrier | Révisez et terminez l’action ici ; l'ouverture d'un formulaire ne confirme pas l'enregistrement |

L'arrêt d'une réponse, la suppression d'une discussion ou la régénération d'une réponse n'annule pas les actions externes terminées. Le matériel récupéré peut également être envoyé au modèle sélectionné. Voir [Données, confidentialité et autorisations](data-privacy.md).
