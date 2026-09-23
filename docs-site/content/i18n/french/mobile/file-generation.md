---
icon: file-text
---

# Créer et modifier des fichiers

Un agent peut enregistrer du texte sous forme de fichier que vous pourrez prévisualiser, réviser et partager. Cela convient aux listes de contrôle, aux notes de réunion, aux données de tableaux et aux pages Web simples.

## Enregistrer une réponse sous forme de fichier

Sélectionnez un modèle de texte prenant en charge les appels d'outils et demandez explicitement un **fichier enregistré** avec un nom de fichier :

> Transformez les conseils de voyage ci-dessus en une liste de contrôle Markdown. Enregistrez-le sous Weekend-packing-list.md et fournissez un fichier que je peux ouvrir.

Markdown est un format de texte pour les titres, les listes et les tableaux. Pour du texte brut, demandez un fichier `.txt`.

Le texte affiché lors de la génération est un contenu en cours de préparation et non un fichier déjà enregistré. Attendez la fin, puis ouvrez la fiche résultante. Vous pouvez également le trouver sous **Fichiers** dans la barre latérale.

Si la réponse ne contient qu'un bloc de code, complétez par : "Veuillez enregistrer ce contenu en tant que fichier réel, et pas seulement l'afficher dans la réponse."

## Quel format dois-je choisir ?

| Résultat souhaité | Formater | Exemple |
| --- | --- | --- |
| Texte brut | TXT | "Enregistrez-le sous call-notes.txt." |
| Un article avec des titres, des listes et des tableaux | Markdown | "Enregistrez-le sous meeting-notes.md." |
| Données pour une application de feuille de calcul | CSV | "Utilisez les colonnes article, quantité et notes ; enregistrez-les sous shopping-list.csv." |
| Une page ou une présentation conçue | HTML | "Créez un fichier HTML autonome nommé project-overview.html." |

L'outil d'écriture de fichiers intégré enregistre le texte, jusqu'à 1 Mo par fichier. **Nommer un fichier `.docx`, `.xlsx` ou `.pptx` ne le transforme pas en un véritable document Office.** CSV s'ouvre dans les applications de feuille de calcul mais ne contient pas de feuilles de classeur, de style ou de graphiques.

Pour PPT, créez une présentation HTML et utilisez [HTML pour imager et PPT](html-export.md). Un plugin connecté peut offrir d'autres fonctionnalités de création de documents ; ses capacités réelles déterminent ce qui est disponible.

## Lire et modifier un fichier existant

1. Dans la conversation, choisissez **＋ → Fichier** et sélectionnez ou téléchargez un fichier.
2. Spécifiez exactement ce qui doit être modifié, le remplacement et ce qui doit rester inchangé.
3. Ouvrez le fichier révisé et vérifiez le résultat.

Par exemple :

> Dans le fichier shopping-list.csv ci-joint, modifiez la quantité pour Umbrella de 1 à 2. Gardez toutes les autres lignes inchangées.

> Dans le fichier meeting-notes.md que vous venez de créer, remplacez « Livrer lundi prochain » par « Livrer mercredi prochain ». Gardez tout le reste.

Les fichiers texte peuvent être modifiés directement. Les documents PDF et Office pris en charge peuvent fournir du contenu extrait pour que le modèle puisse le lire, mais l'éditeur intégré ne peut pas modifier directement leur mise en page et leur structure de fichiers d'origine. Demandez-lui d'extraire et d'organiser le contenu dans un nouveau fichier Markdown. Voir [Chat et fichiers](chat-and-files.md) pour connaître les formats de pièces jointes et les limites de lecture.

### L'édition écrase-t-elle l'original ?

* La modification d'un fichier téléchargé ou d'un fichier créé par une réponse antérieure enregistre une nouvelle version, telle que `meeting-notes v2.md`, et conserve la source.
* Au sein d’une seule réponse, l’agent peut affiner son brouillon actuel à plusieurs reprises et terminer avec un seul fichier, au lieu de produire une nouvelle version pour chaque modification.

Il ne s'agit pas d'une synchronisation continue. La modification d'une copie importée dans Cherry Studio ne met pas à jour l'original ailleurs sur votre téléphone ou dans le stockage cloud.

### Pourquoi ne trouve-t-il pas le texte à remplacer ?

L'édition correspond au texte original. Une formulation modifiée, des phrases répétées et des différences dans les espaces ou la ponctuation peuvent empêcher une correspondance claire. Demandez à l'agent de relire le passage pertinent et d'identifier une phrase plus longue ou le contexte environnant. Demandez le remplacement de chaque occurrence uniquement lorsque c'est ce que vous souhaitez.

## Est-ce que lire une partie d’un fichier signifie qu’il lit tout ?

Non. Les fichiers volumineux peuvent nécessiter plusieurs lectures et l'extraction de documents a ses propres limites. Pour un examen complet, demandez à l'agent de continuer à parcourir les sections non lues et d'indiquer les éventuelles lacunes. Si l'extraction a déjà omis une partie de la source, les lectures ultérieures ne peuvent pas la récupérer ; divisez le document et fournissez-le à nouveau.

Les outils de lecture utilisent des pièces jointes accessibles ou des fichiers générés dans cette conversation. Ils n'analysent pas tous les fichiers de votre téléphone. Pour continuer dans une nouvelle conversation, sélectionnez à nouveau le fichier via le menu des pièces jointes.

## Rechercher, prévisualiser et partager des fichiers

Ouvrez **Fichiers** dans la barre latérale pour parcourir par type et basculer entre les vues de liste et de grille. Appuyez sur un fichier pour le prévisualiser. Les formats sans aperçu interne peuvent s'ouvrir dans une autre application système.

Le menu **Plus** en haut à droite de l'aperçu propose le partage et l'ouverture avec d'autres applications. Les fichiers texte proposent également la copie. Lorsqu'un fichier long n'est que partiellement affiché, la copie inclut uniquement la partie visible ; le partage utilise le fichier original complet.

Les fichiers sont stockés sur cet appareil. Enregistrez les éléments importants dans l'application Fichiers système ou dans un autre stockage via le partage, et confirmez que vous pouvez l'ouvrir avant de nettoyer les fichiers locaux ou de désinstaller Cherry Studio. L'exportation des messages de discussion utilise un flux de travail distinct : [Partage et exportation](sharing-and-export.md).

La lecture, la création et l'édition de fichiers texte intégrés s'exécutent généralement directement, y compris en mode **Demander en cas de besoin**. Voir [Approbation de l'outil](using-tools.md).
