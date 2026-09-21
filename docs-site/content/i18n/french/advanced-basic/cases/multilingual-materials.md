---
icon: globe
---
# Organisation des documents multilingues

L'équipe marketing reçoit un ensemble de documents, de captures d'écran et de termes produits à traduire dans une autre langue, tout en maintenant la cohérence des noms, des chiffres et du formatage. Une glossaire et une traduction pilote à petite échelle permettent de réduire les retouches sur l'ensemble du matériel.

<figure><img src="../../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="Commencez par vérifier l'exactitude de la récupération des documents, puis laissez l'Agent uniformiser les termes et le format de sortie, et enfin effectuez une vérification humaine des contenus clés."><figcaption><p>Commencez par vérifier l'exactitude de la récupération des documents, puis laissez l'Agent uniformiser les termes et le format de sortie, et enfin effectuez une vérification humaine des contenus clés. </p></figcaption></figure>

<figure><img src="../../../../assets/5428125ff9f2c41e29e8c2ed.webp" alt="Le texte original est conservé à gauche, tandis que la traduction réelle est affichée à droite. Avant la livraison, vous pouvez vérifier phrase par phrase les termes clés tels que la grisaille, les indicateurs de surveillance et les procédures de retour arrière."><figcaption><p>Le texte original est conservé à gauche, tandis que la traduction réelle est affichée à droite. Avant la livraison, vous pouvez vérifier phrase par phrase les termes clés tels que la grisaille, les indicateurs de surveillance et les procédures de retour arrière. </p></figcaption></figure>

## Processus opérationnel

{% stepper %}
{% step %}
### 1. Établir d'abord une glossaire

Listez les noms de produits, les noms de fonctionnalités, les noms propres, les unités et les formulations juridiques non modifiables. Indiquez l'usage cible de chaque terme dans la langue de destination.
{% endstep %}

{% step %}
### 2. Calibrer le style avec un court extrait

Dans [Traduction], traitez d'abord un chapitre représentatif pour confirmer le niveau de formalité, la rédaction des titres et les termes, avant de traduire l'ensemble du document.
{% endstep %}

{% step %}
### 3. Effectuer une vérification OCR séparée pour les images

Après le téléversement des captures d'écran, vérifiez d'abord le texte reconnu, en particulier les chiffres, les noms de boutons et les tableaux. Les erreurs de reconnaissance doivent être corrigées avant la traduction.
{% endstep %}

{% step %}
### 4. Demander à l'Agent d'effectuer une vérification de cohérence

Placez le texte original, la traduction et la glossaire dans le répertoire de travail, puis demandez à l'Agent de lister les incohérences terminologiques, les omissions de traduction, les écarts numériques et les problèmes de liens, sans remplacer directement le contenu juridique.
{% endstep %}
{% endstepper %}

## Vérification avant livraison

* Les noms de produits et les chemins d'interface correspondent à l'interface réelle ;
* Les chiffres, les dates, les devises et les unités n'ont pas changé ;
* Les liens Markdown, les blocs de code et les légendes d'images sont conservés ;
* Le contenu juridique, médical ou de sécurité a fait l'objet d'une relecture professionnelle.

## Combinaisons recommandées et critères d'achèvement

| Élément | Pratique recommandée |
| ---- | --------------------------------- |
| Point d'entrée de traduction | Utilisez [Traduction] pour les textes courts et les captures d'écran, et confiez l'organisation de plusieurs fichiers à l'Agent |
| Termes | Fournissez d'abord les noms de produits, les termes propres et la liste des mots non traduits |
| Fichiers | Enregistrez le texte original et la traduction dans des répertoires séparés, en conservant la correspondance des noms de fichiers |
| Critères d'achèvement | Les chiffres, les liens et les termes propres sont cohérents ; le texte des images a été vérifié par échantillonnage ; les changements de mise en page sont signalés dans la note de livraison |

{% hint style="warning" %}
L'historique facilite la réutilisation, mais conserve également le contenu traduit. Après le traitement de documents sensibles, vérifiez et nettoyez les enregistrements conformément à vos exigences de gestion des données.
{% endhint %}
