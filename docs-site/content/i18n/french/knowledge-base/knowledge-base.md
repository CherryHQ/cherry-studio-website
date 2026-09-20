---
icon: compass
---

<a id="tutoriel-sur-la-base-de-connaissances"></a>

# Premiers pas avec les bases de connaissances

Une base de connaissances organise des fichiers, notes, dossiers et pages web pour des recherches répétées. Vérifiez les passages retrouvés avant de l’utiliser dans une conversation ou avec un Agent.

{% hint style="info" %}
Le modèle d’embedding est facultatif. Choisissez **Aucun (None)** pour commencer avec la recherche par mots-clés BM25. Ajoutez un modèle pour la recherche sémantique si nécessaire. Le modèle de reclassement est également facultatif.
{% endhint %}

## Créer votre première base

1. <a id="créer-une-base-de-connaissances"></a>Ouvrez **Base de connaissances** dans la navigation de gauche, puis utilisez le bouton d’ajout au-dessus de la liste. Choisissez un sujet précis, par exemple « Politique de déplacement du personnel ».

2. <a id="ajouter-un-modèle-dincorporation"></a>Pour commencer, réglez **Modèle d’embedding** sur **Aucun (None)**. Configurez un modèle plus tard si les reformulations ou synonymes rendent la recherche par mots-clés insuffisante.

3. <a id="ajouter-des-données-de-diverses-sources"></a><a id="ajouter-des-fichiers-et-vectoriser"></a>Ajoutez un **Fichier**, une **Note**, un **Dossier** ou un **Lien**. Commencez avec quelques documents pertinents.

4. Attendez la fin du traitement, puis examinez le texte extrait et les **Chunks** : caractères illisibles, pages manquantes ou ordre incorrect.

5. <a id="rechercher-dans-la-base-de-connaissances"></a>Ouvrez **Test de recherche (Retrieval Test)** et posez une question réelle dont vous connaissez la réponse. Vérifiez que la bonne source figure parmi les premiers résultats.

6. <a id="utiliser-la-base-de-connaissances-dans-les-conversations-pour-générer-des-réponses"></a>Lorsque la recherche est fiable, sélectionnez la base dans la zone de saisie du chat, ou associez-la à un Agent depuis sa page d’édition.

![Sources : fichiers, notes, dossiers et liens](../../../assets/4622da2093d43942d7ee443e.webp)

## Vérifier avant utilisation

Conservez 3 à 5 questions réalistes et relancez-les après toute modification des données ou réglages. Si la recherche échoue, vérifiez d’abord le texte et les Chunks. Le modèle de chat ne peut pas restituer une information essentielle qui n’a pas été retrouvée.

Les tarifs et le traitement des données d’un modèle cloud d’embedding ou de reclassement dépendent du fournisseur. Séparez les documents dont les exigences d’accès diffèrent.
