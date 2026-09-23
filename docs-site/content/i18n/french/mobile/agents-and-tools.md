---
icon: bot
---

# Agents et outils

Un agent enregistre un nom, un avatar, des instructions, un modèle et une préférence d'approbation des outils. Créez des agents distincts pour écrire, apprendre ou travailler, puis démarrez des conversations indépendantes sur des sujets individuels.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/agent-edit.webp"><img src="../../../assets/mobile/en/agent-edit.webp" alt="Enregistrez les instructions récurrentes et choisissez un modèle et un mode d'approbation ; exemple d'agent montré"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Enregistrez les instructions récurrentes et choisissez un modèle et un mode d'approbation ; exemple d'agent montré</p></figcaption></figure>
</div>

## Créer un agent réutilisable

1. Ouvrez la liste des agents et appuyez sur Ajouter, ou créez-en une à partir du sélecteur d'agent de l'en-tête de conversation.
2. Entrez un nom, choisissez un avatar et décrivez comment cela devrait fonctionner.
3. Sélectionnez son modèle. La recherche, les plugins et les actions de calendrier nécessitent un modèle de texte prenant en charge l'appel d'un outil.
4. Choisissez l’approbation de l’outil et activez les fonctionnalités requises sous Système. Ajoutez des outils personnalisés après avoir enregistré si nécessaire.
5. Appuyez sur **Enregistrer**. La création à partir du sélecteur de discussion ouvre une nouvelle conversation ; la création à partir de la liste de gestion y revient.

Exemples d'instructions :

> Aide à organiser mon matériel de travail. Commencez par un résumé de trois phrases, puis énumérez les actions à entreprendre. Marquez les propriétaires et les délais manquants comme « À confirmer » au lieu de les inventer. Réponse en anglais.

Enregistrez les règles récurrentes dans les instructions ; joignez la tâche et les documents en cours dans le chat. Ne stockez pas de clés ou de mots de passe dans les instructions de l'agent.

## Les modifications doivent-elles être enregistrées ?

**La création d'un agent nécessite Enregistrer. La modification d'un agent existant est enregistrée automatiquement.**

Le nom et les instructions sont enregistrés après une courte pause de frappe ; Les modifications apportées à l'avatar, au modèle et à l'approbation sont enregistrées immédiatement. Un échec de sauvegarde conserve le brouillon dans l'éditeur ouvert et propose de réessayer. Résolvez l’erreur avant de partir.

Un agent peut être enregistré sans modèle, mais ne peut pas démarrer une conversation tant que vous n'avez pas choisi un modèle disponible.

## Modes d'approbation

| Mode | Comportement |
| --- | --- |
| Confirmer si nécessaire | Demande uniquement lorsque les règles d'un outil l'exigent ; certaines lectures peuvent se dérouler directement |
| Approbation automatique | Approuve les opérations éligibles, tout en préservant les autorisations système, les restrictions relatives aux outils désactivés et les limites des données accessibles |

Les nouveaux agents, y compris l'agent Cherry initial, utilisent actuellement par défaut **Approbation automatique**. Les agents existants conservent leur paramètre. Choisissez Confirmer si nécessaire si vous souhaitez confirmer les modifications du calendrier, la suppression des rappels ou les actions d'un outil externe qui nécessitent une approbation.

L’approbation ne peut pas rendre utilisable un outil indisponible. L'**outil de génération d'images appelé par un modèle texte nécessite toujours une confirmation à chaque fois**, car il consomme des crédits fournisseur. La sélection directe d'un modèle d'image et l'appui sur Générer constituent un flux de travail distinct.

Lorsqu'une approbation apparaît, inspectez l'action et autorisez-la ou refusez-la. Les outils refusés ne s'exécutent pas ; l'agent peut répondre à partir des informations existantes. Une invite d'autorisation du système d'exploitation peut toujours suivre l'approbation de l'application.

## Outils système sur votre appareil

Utilisez la section **Système** de l'éditeur d'agent pour choisir ses fonctionnalités : recherche sur le Web, génération d'images, calendrier, rappels, santé et localisation. Seules les fonctionnalités prises en charge par la plate-forme et l'appareil apparaissent.

* Les agents créés via l'éditeur démarrent avec le calendrier, les rappels, la santé et la localisation désactivés. Activez-les selon vos besoins ; les agents existants conservent leurs paramètres.
* Ces commutateurs affectent l'agent actuel. La désactivation de la recherche sur le Web supprime les outils de recherche et de lecture de pages intégrés ; la désactivation de la génération d'images supprime l'outil de dessin intégré utilisé par les conversations textuelles. Gérez les plugins et les outils MCP personnalisés séparément dans leurs propres paramètres.
* L'activation d'un commutateur n'accorde pas l'autorisation du système. Approuvez l’accès sur demande, utilisez **Gérer les autorisations système** ou ouvrez **Paramètres → Autorisations système**.
* Les modifications apportées aux agents existants sont automatiquement enregistrées et appliquées aux demandes ultérieures. Ils n'annulent pas une opération déjà en cours.

| Capacité | Exemple | Disponibilité |
| --- | --- | --- |
| Calendrier | « Lister les événements de demain » ; « Créez une réunion de 30 minutes demain à 15 heures » | iOS et Android, soumis à l'accès en lecture/écriture et à la prise en charge du système |
| Rappels | « Rappelez-moi demain à 9 heures pour poster le colis » | Autorisations de rappel iOS ; non proposé actuellement sur Android |
| Dossiers de santé | "Résumez les pas et les entraînements enregistrés cette semaine" | iOS, pour les types de données autorisés individuellement ; non proposé actuellement sur Android |
| Emplacement actuel | "Obtenez ma position actuelle, puis aidez-moi à planifier un itinéraire" | iOS et Android, avec autorisation de localisation |
| Fichiers d'application | "Enregistrez ce résumé sous forme de fichier" | Pièces jointes et fichiers générés accessibles à la conversation |

Sur certains appareils Android, les opérations d’écriture dans le calendrier ouvrent un formulaire système que vous devez compléter. Son ouverture ne signifie pas que l’événement a été enregistré. Des résultats de santé vides peuvent signifier qu’il n’existe aucun enregistrement ou que l’autorisation pour ce type de données manque.

Les outils ne peuvent pas inspecter librement tous les fichiers du téléphone, prendre en charge d'autres applications ou faire fonctionner votre ordinateur à distance.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/agent-capabilities.webp"><img src="../../../assets/mobile/en/agent-capabilities.webp" alt="Activer les fonctionnalités de cet agent et gérer les autorisations système si nécessaire"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Activer les fonctionnalités de cet agent et gérer les autorisations système si nécessaire</p></figcaption></figure>
</div>

## Où puis-je configurer d'autres outils ?

* **Recherche sur le Web :** configurez les services de recherche/lecture de pages dans Paramètres, puis demandez à effectuer une recherche dans le chat. Voir [recherche sur le Web](web-search.md).
* **Plugins :** connectez des comptes tels que Feishu ou Notion dans la barre latérale. Les plugins connectés sont disponibles dans les conversations ; **＋ → Greffons** peut en nommer un explicitement. Voir [plugins](plugins.md).
* **MCP personnalisé :** MCP permet de connecter des services d’outils supplémentaires. Ajoutez un serveur dans les paramètres, puis activez-le dans l’éditeur de l’agent déjà enregistré. Consultez la section sur les [outils personnalisés](plugins.md).
* **Dessin :** choisissez un modèle de dessin dans **Paramètres → Modèle par défaut** et activez **Génération d'images** pour que l'agent fournisse son outil de dessin. Vous pouvez également sélectionner directement un modèle d'image.

## Pourquoi un outil reste-t-il indisponible après autorisation ?

Vérifiez la prise en charge des appels d'outils de modèle, les commutateurs de capacité de l'agent, la connexion, l'activation du serveur/outil et les autorisations système. Les comptes de plug-in peuvent également être limités par la politique de l'organisation ou l'accès aux ressources.

Donnez une cible claire : un lien vers un document, une plage de dates ou un nom de calendrier. Commencez par demander à l'agent de lire et de lister les éléments pertinents, puis demandez des modifications une fois que l'objectif est clair.

Pour des étapes pratiques et des exemples de demandes, voir [Laisser l'IA utiliser les outils](using-tools.md), [Calendrier et rappels](calendar-and-reminders.md), [Emplacement et dossiers de santé](location-and-health.md) et [Créer et modifier des fichiers](file-generation.md).
