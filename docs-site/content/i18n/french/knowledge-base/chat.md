---
icon: comments
---
# Utilisation dans la conversation

Une fois le test de rappel validé, vous pouvez sélectionner une ou plusieurs bases de connaissances dans une conversation standard. Le modèle répondra alors sur la base des fragments récupérés et affichera les sources.

{% hint style="info" %}
La conversation organise la réponse, la base de connaissances fournit les preuves. Vérifiez d'abord les fragments corrects dans le 【Test de rappel】, puis évaluez si le prompt ou le modèle de conversation doit être ajusté.
{% endhint %}

## Prérequis

| Élément de vérification | État requis |
| ----- | ---------------- |
| Modèle de conversation | Prise en charge de l'appel d'outils |
| Documents de la base de connaissances | Au moins un document prêt |
| Message actuel | Aucun fichier joint simultanément |
| Qualité du rappel | Les questions clés trouvent la bonne source et le fragment complet |

{% hint style="warning" %}
Si le message actuel contient des pièces jointes, la sélection de la base de connaissances est désactivée. Supprimez d'abord les pièces jointes, puis sélectionnez la base de connaissances dans la zone de saisie.
{% endhint %}

## Réaliser une question-réponse avec sources

{% stepper %}
{% step %}
### 1. Sélectionner un modèle prenant en charge l'appel d'outils

Créez ou ouvrez une conversation standard et vérifiez dans le sélecteur de modèles que le modèle actuel prend en charge l'appel d'outils. Si l'entrée de la base de connaissances indique une capacité insuffisante, changez de modèle.
{% endstep %}

{% step %}
### 2. Ouvrir la sélection de base de connaissances

Cliquez sur le bouton d'ajout en bas à gauche de la zone de saisie, sélectionnez 【Base de connaissances】, puis cochez une ou plusieurs bases cibles.
{% endstep %}

{% step %}
### 3. Vérifier l'état de la sélection

Le nom de la base de connaissances doit apparaître dans la zone de saisie. Si la question ne concerne qu'un seul sujet, privilégiez la sélection d'une seule base pour réduire la concurrence des fragments non pertinents.

<figure><img src="../../../assets/5baecf3a1e479cb5a9627b45.webp" alt="Avant l'envoi, vérifiez que la base de connaissances sélectionnée et la question actuelle appartiennent au même périmètre documentaire."><figcaption><p>Avant l'envoi, vérifiez que la base de connaissances sélectionnée et la question actuelle appartiennent au même périmètre documentaire. </p></figcaption></figure>
{% endstep %}

{% step %}
### 4. Préciser la tâche, le périmètre et le format

Par exemple : `Répondez uniquement à partir de la base de connaissances sélectionnée sur les plafonds d’hébergement dans les grandes villes chinoises. Détaillez les montants par niveau de poste et indiquez la source de chaque élément.`
{% endstep %}

{% step %}
### 5. Activer la vérification des sources

Vérifiez le nom de la source, le contenu du fragment et les conditions d'application. Les éléments non mentionnés dans les documents ne doivent pas être complétés comme des faits.
{% endstep %}

{% step %}
### 6. En cas d'échec, revenir au test de rappel

Utilisez la même question pour vérifier les fragments renvoyés par la base de connaissances. En cas d'erreur de rappel, corrigez d'abord les documents, l'analyse ou la recherche ; si le rappel est correct, ajustez ensuite le prompt et le modèle de conversation.

<figure><img src="../../../assets/b44776524449cdefe62eaed3.webp" alt="Si la réponse en conversation n'est pas idéale, les résultats de rappel aident à déterminer si le problème se situe au niveau de la recherche ou de la réponse."><figcaption><p>Si la réponse en conversation n'est pas idéale, les résultats de rappel aident à déterminer si le problème se situe au niveau de la recherche ou de la réponse. </p></figcaption></figure>
{% endstep %}
{% endstepper %}

## Comment la réponse est formée

<figure><img src="../../../assets/192b7298d3bc060e6d5897c9.webp" alt="Le modèle de conversation voit les fragments finaux récupérés, et non l'intégralité des documents de la base de connaissances."><figcaption><p>Le modèle de conversation voit les fragments finaux récupérés, et non l'intégralité des documents de la base de connaissances. </p></figcaption></figure>

## Modèles de questions recommandés

### Interroger une règle précise

> Répondez uniquement sur la base de la base de connaissances sélectionnée : quelle est la limite de frais d'hébergement dans les grandes villes chinoises ? Si les normes diffèrent selon le niveau hiérarchique, listez-les par catégorie et indiquez la source après chaque élément.

### Comparer plusieurs documents

> Comparez les différences d'approbation entre les déplacements professionnels en Chine et à l'étranger. Présentez-les sous forme de tableau avec les colonnes « Conditions de déclenchement, Approbateur, Documents avant départ » ; marquez « Non précisé » pour les éléments non mentionnés dans les documents.

### Exiger la distinction entre faits et recommandations

> Listez d'abord les faits soutenus par le texte réglementaire, puis fournissez séparément des recommandations opérationnelles. Les recommandations ne doivent pas être présentées comme des exigences réglementaires ; conservez le nom de la source pour chaque fait.

{% hint style="success" %}
Une bonne question contient quatre éléments : la tâche à accomplir, le périmètre documentaire autorisé, le format de sortie attendu et la manière de gérer les lacunes documentaires.
{% endhint %}

## Choisir une ou plusieurs bases de connaissances

| Situation | Recommandation | Raison |
| --------- | -------------- | --------------- |
| Question sur une seule règle ou un seul produit | Sélectionner une seule base | Réduire la concurrence des fragments non pertinents |
| Comparaison inter-départements ou inter-produits | Sélectionner plusieurs bases et préciser leur usage respectif | Aider le modèle à maintenir les limites des sources |
| Résultats mélangés de plusieurs bases | Découper en plusieurs questions à vérifier séparément | Vérifier d'abord que chaque base peut rappeler indépendamment |
| Recherche multi-étapes à long terme | Utiliser un Agent lié à une base de connaissances | Plus adapté à la recherche continue, à l'organisation et à la livraison de fichiers |

## Notes de configuration

| Paramètre | Point de départ recommandé | Rôle | Précautions |
| ----- | ----------- | --------- | ------------ |
| Nombre de bases de connaissances | 1 | Contrôler le périmètre documentaire | N'augmenter que si un besoin inter-bases est confirmé |
| Périmètre de la question | Écrire explicitement « uniquement sur la base de la base de connaissances » | Réduire les compléments par sens commun | Vérifier toujours les sources pour les conclusions importantes |
| Format de sortie | Tableau ou liste par catégories | Faciliter la vérification point par point | Exiger « Non précisé » plutôt que des suppositions |
| Question de régression | Utiliser la même question que pour le test de rappel | Distinguer les problèmes de recherche et de réponse | Ne modifier qu'une seule variable par itération |

## Intégrer le contenu de la conversation dans la base de connaissances

Cherry Studio permet d'enregistrer des messages, des sujets ou des notes dans une base de connaissances. Avant l'enregistrement, supprimez les suppositions du modèle, les doublons et les discussions temporaires, et utilisez un titre qui précise le sujet et la version.

L'enregistrement crée une nouvelle capture des documents ; il n'est pas synchronisé en temps réel avec la conversation ou la note d'origine. En cas de mise à jour du contenu, un nouvel enregistrement ou un remplacement est nécessaire.

## Cas d'usage

Xiaolin interroge la limite d'hébergement dans la 【Politique de déplacement des employés】. La première réponse incluait des connaissances générales du modèle. Il a modifié le prompt pour indiquer « Écrire "Non précisé" si les documents ne le mentionnent pas » et a exigé la conservation de la source pour chaque élément. Il a ensuite vérifié point par point les citations pour confirmer le niveau de la ville, le niveau hiérarchique et les montants.

Le critère de réussite est le suivant : chaque montant doit être directement soutenu par un fragment cité, et les exceptions non mentionnées dans la politique ne doivent pas être complétées par le modèle.

## Questions fréquentes

<details>

<summary>Pourquoi l'entrée de la base de connaissances est-elle grisée ? </summary>

Sélectionnez d'abord un modèle prenant en charge l'appel d'outils et supprimez les pièces jointes du message actuel ; vérifiez ensuite qu'au moins une base de connaissances contient des documents prêts.

</details>

<details>

<summary>Pourquoi la réponse n'a-t-elle pas de sources ? </summary>

Vérifiez que la zone de saisie affiche toujours la base de connaissances sélectionnée, puis soumettez la même question au test de rappel. En l'absence de rappel correct, corrigez d'abord la base de connaissances.

</details>

<details>

<summary>Que faire si les sources sont correctes mais la conclusion inexacte ? </summary>

Exigez que le modèle réponde uniquement sur la base des citations, découpez la tâche en éléments factuels plus petits et vérifiez manuellement les conclusions importantes. Il s'agit généralement d'un problème de prompt, de capacité du modèle ou d'organisation du contexte.

</details>

## Continuer la lecture

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Vérifier les documents et le rappel </strong></td><td>Vérifiez d'abord que les fragments corrects sont détectés de manière stable. </td><td><a href="recall-test.md">recall-test.md </a></td></tr><tr><td><strong>Utilisation avec un Agent </strong></td><td>Impliquez la base de connaissances dans des tâches multi-étapes et la livraison de fichiers. </td><td><a href="agent.md">agent.md </a></td></tr><tr><td><strong>Cas d'application des bases de connaissances </strong></td><td>Réutilisez les cas de politiques, de service après-vente et de recherche. </td><td><a href="cases.md">cases.md </a></td></tr></tbody></table>
