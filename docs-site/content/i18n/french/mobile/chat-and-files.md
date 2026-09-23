---
icon: message-circle
---

# Conversations et fichiers

Utilisez une conversation pour un sujet, et un agent pour choisir son modèle et ses instructions réutilisables. Des sujets distincts peuvent avoir des conversations distinctes avec le même agent.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/iphone-conversation.webp"><img src="../../../assets/mobile/en/iphone-conversation.webp" alt="Conversation Cherry Studio Mobile sur iPhone"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Messages, détails du modèle et actions de réponse dans une seule colonne</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/en/ipad-conversation.webp"><img src="../../../assets/mobile/en/ipad-conversation.webp" alt="Conversation Cherry Studio Mobile sur iPad"></a><figcaption><p><strong>iPad · Interface en anglais</strong> · Une zone de lecture plus large pour les réponses longues et le contenu des fichiers</p></figcaption></figure>
</div>

## Démarrer une conversation ou changer de modèle

Choisissez **Nouvelle discussion** dans la barre latérale, sélectionnez un agent et un modèle, puis envoyez un message. Une nouvelle conversation commence sous forme de brouillon ; l'envoi du premier message crée son historique.

Modifiez les modèles à partir du sélecteur de modèles de la conversation. Cela met à jour le modèle de l'agent actuel pour la prochaine demande ; les réponses existantes ne sont pas réécrites.

Mettez des préférences durables, telles que « Donnez la conclusion avant les étapes », dans [instructions de l'agent](agents-and-tools.md). Mettez les exigences pour une question dans le message lui-même.

## Rechercher des conversations précédentes

* Parcourez les conversations récentes dans la barre latérale ou utilisez son menu de liste récente pour les regrouper par agent. Appuyez sur le nom d'un agent pour développer/réduire ses conversations. Le mode d'affichage choisi persiste lors des lancements d'applications.
* Le bouton de recherche à côté du titre de la barre latérale recherche les **titres des conversations et le contenu des messages**. Avant de taper, il affiche les conversations récentes.
* Un résultat de message ouvre la conversation à ce message. Parcourez l'historique à proximité ou choisissez **Retour aux derniers messages**.
* Appuyez longuement sur une conversation de la barre latérale pour la renommer ou la supprimer. [Exporter](sharing-and-export.md) tout ce que vous souhaitez conserver en premier.

La recherche localise l’intégralité du message sans mettre en évidence chaque mot-clé qu’il contient. Il recherche les conversations, pas tous les fichiers de votre téléphone.

## Ajouter des images

Appuyez sur **＋** à côté de l'entrée pour choisir des photos, prendre une photo ou ajouter une image via Fichiers. Sélectionnez un modèle qui comprend les images ; le filtre Vision peut vous aider.

Par exemple, joignez une photo et demandez « Transformez la liste de contrôle de cette image en tableau ». Précisez quelle partie est importante.

Les formats de requête pris en charge sont JPEG, PNG, GIF et WebP. La limite actuelle de l'application est de 9 images, 10 Mo par image et 20 Mo combinés ; les modèles individuels peuvent avoir des limites inférieures. Convertissez les formats incompatibles en JPEG ou PNG.

L'application peut compresser les images et réessayer une requête surdimensionnée, mais la compression ne corrige pas les modèles non pris en charge, le trop grand nombre d'images ou toutes les erreurs réseau.

## Joindre des documents ou des fichiers existants

1. Appuyez sur **＋ → Fichiers**.
2. Choisissez un fichier existant ou téléchargez-en un à l'aide du sélecteur de système.
3. Donnez une tâche spécifique, telle que « Résumer la deuxième section et répertorier ses actions ».

Les fichiers en texte brut ont une limite de 1 Mo par fichier ; les documents ont une limite de 20 Mo. Le contenu long peut être raccourci pour s'adapter aux limites de lecture ou de modèle, avec un avis. Ne présumez pas que l’intégralité du fichier a été incluse. L'extraction de texte PDF traite au maximum les 100 premières pages.

### Quel analyseur de documents dois-je choisir ?

Ouvrez **Paramètres → Analyseur de documents**. La sélection est enregistrée immédiatement et s'applique au traitement ultérieur du document ; il ne réécrit pas les réponses précédentes.

| Options | Idéal pour | Compromis |
| --- | --- | --- |
| Intégré | Résumés et questions sur des documents principalement textuels | Extrait le texte de PDF, DOCX, XLSX et PPTX avec une utilisation moindre du modèle |
| AnyDoc | Documents complexes où les titres et les tableaux sont importants | Préserve plus de structure pour les documents non-PDF, en utilisant généralement plus de jetons |

Les PDF utilisent toujours l'extraction de texte du système. Changer d'analyseur ne transforme pas les pages numérisées en texte sélectionnable. Si aucun texte n'est trouvé, fournissez une copie textuelle ou envoyez les pages pertinentes sous forme d'images à un modèle de vision.

**La prise en charge des aperçus est différente de la prise en charge des entrées de modèle.** Les modèles reçoivent le contenu du document analysé. Les fichiers audio, vidéo ou d'archive ne deviennent pas des pièces jointes utilisables simplement en modifiant les indicateurs de capacité du modèle.

## Copier, réessayer, créer une branche ou supprimer

| Action | Quand l'utiliser | Résultat |
| --- | --- | --- |
| Sélectionnez du texte ou copiez | Conserver une partie ou la totalité d'une réponse | Utiliser la sélection de texte ou l'action de copie de la réponse |
| Répondez à nouveau | La dernière réponse a échoué, a été interrompue ou n'est pas satisfaisante | Traite à nouveau la question d'origine et remplace la dernière réponse en place |
| Branchez-vous sur une nouvelle discussion | Explorer une autre direction à partir d'un point antérieur | Se poursuit dans une conversation séparée, en conservant l'original |
| Supprimer ce tour | Supprimer un échange | Supprime ses enregistrements de questions, de réponses et d'outils d'intervention |

La nouvelle réponse n'est disponible que pour la dernière réponse après l'arrêt de la génération. Il ne conserve pas plusieurs versions de réponses sélectionnables. Utilisez une branche pour les points précédents.

Les résultats de l'outil terminés peuvent être conservés lors de la reprise d'une réponse interrompue. Réessayer ou supprimer **n'annule pas les modifications du calendrier, les fichiers modifiés ou le contenu envoyé**. Toute nouvelle tentative peut entraîner des frais supplémentaires. Copiez, partagez ou créez d'abord une branche si vous avez besoin de la réponse précédente.

La suppression du tour est permanente et ne rembourse pas l’utilisation. Attendez la fin de la génération/des opérations, ou arrêtez-les, avant de les supprimer.

## Réflexion approfondie et longues conversations

Les modèles pris en charge fournissent un contrôle **Profondeur de réflexion**. Les niveaux disponibles dépendent du modèle ; tous ne permettent pas de désactiver la réflexion ou ne proposent pas le même nombre de niveaux. Utilisez les niveaux par défaut ou plus rapides pour les questions simples et envisagez davantage de réflexion pour les analyses complexes. Les niveaux supérieurs peuvent prendre plus de temps et utiliser plus de jetons.

**Contexte de compactage / Contexte compacté** signifie que les informations antérieures sont résumées pour laisser la place à une conversation continue ou à un travail sur des outils. L'historique visible demeure, mais le résumé peut omettre des détails. Reformulez les contraintes, les chiffres ou les citations exactes importants dans le message suivant si nécessaire.

Le compactage ne permet pas de faire tenir une pièce jointe de taille arbitraire dans les limites du modèle. Réduisez le contenu ou démarrez une nouvelle conversation si la requête dépasse encore ces limites.

Voir [Réponses et notifications en arrière-plan](settings-and-usage.md) pour les interruptions et [Partage et exportation](sharing-and-export.md) pour partager plusieurs messages ensemble.

Pour les sorties et révisions enregistrées, voir [Créer et modifier des fichiers](file-generation.md). Pour transformer un fichier HTML enregistré en image ou présentation, voir [HTML en image et PPT](html-export.md).
