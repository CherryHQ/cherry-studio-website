---
icon: circle-question
---
# Questions fréquentes

En cas de problème avec la base de connaissances, déterminez d'abord si l'échec survient lors de l'importation, de l'analyse, du fractionnement, de la récupération ou de la génération de la réponse. Modifiez une seule variable à la fois pour identifier l'ajustement réellement efficace.

{% hint style="info" %}
La méthode la plus rapide pour localiser le problème consiste à utiliser la même question réelle pour vérifier l'ensemble du processus : la réponse est-elle présente dans le texte, les fragments (Chunks) sont-ils complets, la récupération est-elle correcte, et la réponse est-elle fidèle à la source.
{% endhint %}

## Localisation rapide en 5 étapes

{% stepper %}
{% step %}
### 1. Vérifier l'état des documents

Les documents doivent être au statut 【Prêt】. S'ils restent en cours de traitement ou affichent une erreur, consultez d'abord le message d'erreur et vérifiez que les fichiers, le processeur et le service de modèle sont disponibles.
{% endstep %}

{% step %}
### 2. Vérifier le texte analysé

Ouvrez l'aperçu du texte pour confirmer que la réponse existe bien, que le texte a été reconnu, et que les colonnes multiples et les tableaux ne sont pas désordonnés.
{% endstep %}

{% step %}
### 3. Vérifier les Chunks

Assurez-vous que les conditions et les conclusions nécessaires à la question se trouvent dans des fragments compréhensibles ; évitez que les en-têtes, pieds de page et tables des matières n'occupent les résultats.

<figure><img src="../../../assets/5bd8c12bd8d08e785c6a4c42.webp" alt="Si le texte est correct mais les fragments incomplets, ajustez le fractionnement et réindexez les anciens documents."><figcaption><p>Si le texte est correct mais les fragments incomplets, ajustez le fractionnement et réindexez les anciens documents.</p></figcaption></figure>
{% endstep %}

{% step %}
### 4. Exécuter un test de récupération

Vérifiez le nom de la source, la pertinence et le contenu des fragments. L'absence totale de fragments corrects et le classement bas des fragments corrects sont deux problèmes distincts.

<figure><img src="../../../assets/b44776524449cdefe62eaed3.webp" alt="D'abord, prouvez que la couche de recherche renvoie les bonnes preuves, puis ajustez le prompt de conversation."><figcaption><p>D'abord, prouvez que la couche de recherche renvoie les bonnes preuves, puis ajustez le prompt de conversation.</p></figcaption></figure>
{% endstep %}

{% step %}
### 5. Vérifier la conversation ou l'Agent

Si la récupération est correcte mais la réponse erronée, confirmez que la base de connaissances est sélectionnée ou liée, exigez une réponse basée uniquement sur les sources, et décomposez la question en éléments factuels plus petits.
{% endstep %}
{% endstepper %}

## Où signaler les problèmes

<figure><img src="../../../assets/66f4111676793ffe87e7a979.webp" alt="Effectuez d'abord un diagnostic minimal ; si le problème est reproductible de manière stable, joignez les étapes anonymisées, l'erreur et le résultat attendu."><figcaption><p>Effectuez d'abord un diagnostic minimal ; si le problème est reproductible de manière stable, joignez les étapes anonymisées, l'erreur et le résultat attendu.</p></figcaption></figure>

{% hint style="danger" %}
Ne publiez pas de clé API, de contenu de fichiers internes, d'adresses e-mail ou de chemins locaux sensibles dans les captures d'écran, les journaux et les documents d'exemple.
{% endhint %}

## Création et importation

<details>

<summary>Peut-on créer une base de connaissances sans modèle d'incorporation ?</summary>

Oui. Après avoir choisi 【Ne pas utiliser】, la recherche par mots-clés BM25 est toujours utilisée. Ajoutez un modèle d'incorporation si vous devez correspondre à différentes formulations.

</details>

<details>

<summary>Quelles sources et formats de fichiers sont pris en charge ?</summary>

Les sources incluent les fichiers, les notes Cherry Studio, les dossiers locaux et les liens web. Les formats de fichiers incluent PDF, DOCX, DOC, PPTX, XLSX, XLS, Markdown, TXT, CSV, HTML et EPUB.

</details>

<details>

<summary>Combien d'éléments peut-on ajouter à la fois ?</summary>

Jusqu'à 20 éléments par sélection interactive. Pour plus de documents, ajoutez-les par lots ou utilisez l'entrée de dossier.

</details>

<details>

<summary>Pour les documents de même nom, choisir 【Tout conserver】 ou 【Remplacer】 ?</summary>

Choisissez généralement 【Remplacer】 lors de la mise à jour de règlements, de manuels ou d'instantanés de notes. Choisissez 【Tout conserver】 uniquement si des versions coexistantes sont réellement nécessaires, et ajoutez une date ou une version dans le nom.

</details>

<details>

<summary>Que faire si un document reste bloqué en cours de traitement ?</summary>

Vérifiez si le fichier s'ouvre, si le processeur et l'OCR sont disponibles, et si le service de modèle est configuré. Déterminez si l'échec survient lors de la lecture, de l'analyse ou de l'incorporation en fonction du message d'erreur.

</details>

## Analyse et récupération

<details>

<summary>Pourquoi un PDF scanné n'a-t-il pas de texte ?</summary>

Les documents scannés nécessitent l'OCR. Ouvrez 【Paramètres】→【Traitement des documents】, sélectionnez un OCR disponible, puis réindexez le document. Pour les mises en page complexes, essayez un processeur de documents dédié.

</details>

<details>

<summary>Pourquoi les résultats ne changent-ils pas après modification des paramètres de Chunk ?</summary>

Les nouveaux paramètres ne réexécutent pas automatiquement les anciens documents. Exécutez 【Réindexer】 sur les éléments concernés, puis retestez avec la même question.

</details>

<details>

<summary>Que faire si le test de récupération ne renvoie aucun résultat ?</summary>

Vérifiez successivement l'état des documents, la présence de la réponse dans le texte, la correspondance des mots-clés du texte original, l'achèvement de l'incorporation, si le seuil de réorganisation est trop élevé, et si Top K est trop faible.

</details>

<details>

<summary>Que faire si la source est correcte mais le fragment incomplet ?</summary>

Consultez les Chunks pour vérifier si les conditions et les conclusions sont coupées. Augmentez légèrement la taille du Chunk ou le chevauchement, ou réorganisez les sources désordonnées en notes claires avant de réindexer.

</details>

<details>

<summary>Que faire si le bon résultat est classé trop bas ?</summary>

Supprimez d'abord les documents en double et obsolètes, puis envisagez un modèle d'incorporation. Si les candidats sont globalement corrects mais l'ordre instable, ajoutez la réorganisation et réajustez le seuil.

</details>

<details>

<summary>Quelle valeur pour Top K ?</summary>

Commencez par 6, et comparez les omissions, le bruit et le temps d'exécution avec des questions fixes. Top K peut être ajusté entre 1 et 50 ; ne considérez pas l'augmentation comme une solution universelle.

</details>

## Conversation et Agent

<details>

<summary>Que faire si l'entrée de la base de connaissances dans la conversation n'est pas disponible ?</summary>

Sélectionnez un modèle prenant en charge l'appel d'outils et supprimez les pièces jointes du message actuel. Assurez-vous également qu'au moins une base de connaissances contient des documents prêts.

</details>

<details>

<summary>Que faire si la réponse n'affiche pas de sources ?</summary>

Confirmez que la base de connaissances est bien sélectionnée dans la zone de saisie, puis placez la même question dans le test de récupération. Si la récupération ne contient pas de fragments corrects, corrigez d'abord la base de connaissances.

</details>

<details>

<summary>Que faire si la récupération est correcte mais la réponse reste imprécise ?</summary>

Exigez du modèle qu'il réponde uniquement sur la base des citations, décomposez la tâche en éléments factuels plus petits et vérifiez manuellement les conclusions importantes. Le problème réside généralement dans le prompt, le modèle ou l'organisation du contexte.

</details>

<details>

<summary>Pourquoi l'Agent ne voit-il pas la base de connaissances ?</summary>

Ouvrez 【Éditer l'agent】→【Base de connaissances】, liez la base cible à l'Agent actuel et activez 【Recherche dans la base de connaissances】 dans 【Outils intégrés】.

</details>

<details>

<summary>La gestion de la base de connaissances modifie-t-elle les documents ?</summary>

Oui. 【Gestion de la base de connaissances】 permet d'ajouter, de supprimer ou de rafraîchir des documents. Ne l'activez pas pour les tâches en lecture seule ; vérifiez la cible, l'impact et la méthode de retour arrière avant toute opération d'écriture.

</details>

## Modèles, données et sauvegarde

<details>

<summary>Pourquoi le changement de modèle d'incorporation exige-t-il une reconstruction ?</summary>

Les vecteurs générés par différents modèles d'incorporation ne peuvent pas être mélangés directement. Confirmez d'abord que le nouveau modèle est disponible et conservez une sauvegarde complète, puis reconstruisez l'index de vecteurs existant.

</details>

<details>

<summary>Quelle est la relation entre la réorganisation et le seuil de similarité ?</summary>

La réorganisation recalcule les scores des fragments candidats, et le seuil filtre les résultats à faible score après réorganisation. Si la réorganisation n'est pas configurée, le seuil de similarité n'apparaît pas dans les paramètres de la base de connaissances.

</details>

<details>

<summary>Le téléchargement d'un modèle d'incorporation local signifie-t-il un fonctionnement entièrement hors ligne ?</summary>

Pas nécessairement. L'analyse, l'OCR, la réorganisation et la conversation doivent également utiliser des capacités locales pour un flux entièrement hors ligne.

</details>

<details>

<summary>La modification du fichier original ou de la page web met-elle à jour automatiquement ?</summary>

Non. Les fichiers, notes et pages web sont indexés selon leur contenu au moment de l'importation. Réajoutez le document de même nom en choisissant 【Remplacer】, puis effectuez un test de récupération.

</details>

<details>

<summary>La sauvegarde allégée contient-elle les fichiers de la base de connaissances ?</summary>

Non, elle ne contient pas les fichiers de données complets de la base de connaissances. Utilisez une sauvegarde complète avant migration ou suppression, et vérifiez les documents et la récupération après restauration.

</details>

## Notes de configuration : ligne de base de diagnostic

| Élément | Point de départ recommandé | Ajuster uniquement si |
| ----- | ------------- | ---------------- |
| Top K | 6 | Les fragments corrects sont coupés ou le bruit est excessif |
| Seuil de similarité | Commencer à 0.0 après configuration de la réorganisation | Le bruit à faible score est manifeste et les fragments corrects ont encore de la marge |
| Chunk | Conserver le fractionnement intelligent par défaut | Les conditions et conclusions sont coupées ou les fragments sont trop longs |
| Modèle d'incorporation | Ajouter si BM25 est insuffisant | Les formulations orales ou les expressions synonymes ne sont pas détectées de manière stable |
| Modèle de réorganisation | Ajouter si les candidats sont corrects mais l'ordre instable | Ne pas utiliser pour corriger les erreurs d'analyse ou le texte manquant |

## Cas utilisateur

Xiaolin a constaté que la réponse à « normes de frais d'hébergement » était erronée dans la conversation. Il a d'abord effectué un test de récupération avec la même question et a constaté que la bonne source n'apparaissait pas du tout ; en ouvrant le texte, il a découvert que le PDF à deux colonnes était désordonné. Après avoir changé de processeur et réindexé, la récupération est devenue correcte et la réponse en conversation s'est normalisée.

Ce processus ne modifie qu'une seule variable du parseur, ce qui permet de confirmer la cause racine plutôt que de compter sur la chance en augmentant simultanément Top K, Chunk et le seuil.

{% hint style="warning" %}
Si le problème persiste, veuillez consigner la version de l'application, le système d'exploitation, le processeur, les modèles d'incorporation et de réorganisation, l'erreur complète, un échantillon minimal anonymisé, les résultats de récupération et la source attendue.
{% endhint %}

## Continuer la lecture

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Analyse des documents et OCR</strong></td><td>Résoudre les problèmes de numérisation, d'ordre incorrect et de perte de tableaux.</td><td><a href="document-preprocessing.md">document-preprocessing.md</a></td></tr><tr><td><strong>Paramètres des modèles et de la recherche</strong></td><td>Comprendre l'incorporation, la réorganisation, les seuils et la reconstruction.</td><td><a href="emb-models-info.md">emb-models-info.md</a></td></tr><tr><td><strong>Données, confidentialité et maintenance</strong></td><td>Vérifier les limites des sauvegardes et des services cloud.</td><td><a href="data.md">data.md</a></td></tr></tbody></table>
