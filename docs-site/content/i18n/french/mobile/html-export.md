---
icon: presentation
---

# Convertir un fichier HTML en image ou en PPT

Les fichiers HTML peuvent contenir des mises en page, des couleurs et des images conçues. Ouvrez un fichier HTML enregistré dans Cherry Studio pour le partager sous forme d'image ou PPT, utile pour les propositions, les cartes d'étude et les courtes présentations.

## Préparez un fichier HTML

Téléchargez un fichier existant ou demandez à un modèle prenant en charge les appels d'outils d'en créer un :

> Transformez l'aperçu du projet ci-dessus en une présentation HTML autonome avec trois pages : objectifs, plan et prochaines étapes. Utilisez un format 16:9, des caractères lisibles et aucune image ou police en ligne. Enregistrez-le sous project-overview.html. Donnez à chaque page son propre conteneur avec class="slide".

La dernière phrase indique au modèle comment marquer les pages. Vous pouvez le copier sans écrire de code vous-même. Une seule carte d’information n’a pas besoin de marqueurs de page.

Attendez la fin de l'enregistrement du fichier, puis ouvrez sa fiche ou recherchez-le sous **Fichiers** dans la barre latérale. Si vous n'avez qu'un bloc de code HTML dans le chat, demandez d'abord au modèle de [l'enregistrer sous forme de fichier](file-generation.md).

## Partager sous forme d'image ou PPT

1. Ouvrez le fichier HTML complet et examinez son texte, ses images et sa mise en page.
2. Appuyez sur **Plus** dans le coin supérieur droit.
3. Choisissez **Partager en tant qu’image** ou **Partager en tant que PPT**.
4. Attendez la préparation, la capture de page et l'écriture du fichier. Utilisez **Annuler** dans la zone de progression pour vous arrêter si nécessaire.
5. Choisissez une destination dans la menu de partage système.

Le PNG ou PPTX généré reste également dans **Fichiers** pour une ouverture ou un partage ultérieur. Le fait de fermer la menu de partage ne signifie pas qu'elle a été enregistrée vers une autre destination.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/html-preview.webp"><img src="../../../assets/mobile/en/html-preview.webp" alt="Ouvrez un fichier HTML enregistré ; ceci est un fichier de démonstration créé"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Ouvrez un fichier HTML enregistré ; ceci est un fichier de démonstration créé</p></figcaption></figure>
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/html-export-menu.webp"><img src="../../../assets/mobile/en/html-export-menu.webp" alt="Utilisez le menu Fichier pour partager sous forme d'image ou PPT"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Utilisez le menu Fichier pour partager sous forme d'image ou PPT</p></figcaption></figure>
</div>

## En quoi les formats diffèrent-ils ?

| Formater | Idéal pour | Résultat |
| --- | --- | --- |
| Image (PNG) | Cartes de visualisation et d'information rapides | Une image de l’ensemble du document ; plusieurs pages s'empilent verticalement |
| PPT (PPTX) | Présenter une page à la fois | Une image de chaque page placée sur une diapositive 16:9 |

**Le texte et les graphiques du PPT font partie des images de page et non des objets modifiables individuellement.** Pour modifier le contenu, révisez le HTML et convertissez-le à nouveau. Partagez également le HTML si le destinataire a besoin de la source modifiable d'origine.

HTML avec des marqueurs de page explicites est converti page par page. Une longue page ordinaire est découpée verticalement en sections 16:9, qui peuvent couper des paragraphes ou des tableaux ; il n'est pas automatiquement repensé en présentation. Demandez au modèle des pages séparées et moins encombrées si cela se produit.

Les pages avec des proportions différentes conservent leurs proportions et peuvent avoir des marges blanches. La conversion utilise une mise en page plus large, elle peut donc différer de l'aperçu étroit du téléphone.

## Qu'arrive-t-il aux filigranes et au contenu interactif ?

La conversion suit **Paramètres → Général → Filigrane de partage**. Lorsqu'il est activé, il ajoute un pied de page à l'image ou à la diapositive PPT finale. Le paramètre affecte les fichiers nouvellement générés ; le modifier ultérieurement ne reconstruit pas les résultats enregistrés.

La conversion ouvre une nouvelle copie du HTML enregistré. Il ne copie pas les boutons sur lesquels vous avez cliqué, les panneaux que vous avez développés ou les formulaires que vous avez remplis lors de l'aperçu. Les animations et les vidéos ne deviennent pas du contenu PPT lisible. Demandez au modèle d'enregistrer l'état souhaité en tant que contenu de page statique.

## Pourquoi la conversion est-elle indisponible ou échoue-t-elle ?

* **Le fichier n'est pas HTML :** Markdown, les blocs de texte brut et de code de discussion n'ont pas ces actions de conversion.
* **Une seule partie d'un fichier long chargé :** Le HTML incomplet ne peut pas être converti. Raccourcissez-le ou divisez-le. Le contenu vide ne peut pas non plus être converti.
* **Les images ou les polices n'ont pas pu être chargées :** les ressources en ligne doivent être accessibles. Demandez une version sans dépendances externes.
* **Le document est trop long :** PPT prend en charge au maximum 64 pages et les images ont des limites de taille. Réduisez le contenu, divisez les fichiers ou utilisez des pages de présentation distinctes au lieu d'une seule longue image.
* **La mise en page ne cesse de changer ou l'application est passée en arrière-plan :** des pages dynamiques complexes peuvent échouer. Gardez l'application au premier plan et utilisez des mises en page statiques si nécessaire.

Le HTML d'origine reste disponible après un échec ou une annulation. Corrigez la cause signalée avant de réessayer. Après avoir partagé un fichier important, confirmez son nombre de pages et son contenu dans l'application de réception.
