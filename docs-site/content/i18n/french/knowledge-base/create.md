---
icon: folder-open
---
# Créer une base de connaissances

Les deux choix les plus importants lors de la création sont le nom et le modèle d'incorporation. Les documents peuvent être ajoutés ultérieurement, mais les limites définies par le nom et la méthode de recherche affecteront la maintenance future.

{% hint style="info" %}
Pour une première expérience, vous pouvez définir le [Modèle d'incorporation] sur [Non utilisé]. La base de connaissances utilisera toujours la recherche par mots-clés BM25. Il suffit de valider le processus d'importation et de récupération.
{% endhint %}

## Prendre deux décisions avant de créer

### Le nom doit définir les limites des documents

Privilégiez la structure « objet + usage », par exemple [Politique de déplacement des employés], [Manuel de service après-vente produit] ou [Documents de recherche de marché]. Évitez des noms comme [Documents] ou [Test], qui ne permettent pas de déterminer la portée du contenu plus tard.

### Choisir la méthode d'incorporation

| Choix | Scénario adapté | Méthode de recherche | Prérequis |
| ------ | ------------- | ------------- | ------------ |
| Non utilisé | Première expérience, mots-clés précis | Recherche par mots-clés BM25 | Aucun |
| Modèle d'incorporation cloud | Écart important entre la formulation des questions et le texte des documents | Recherche hybride BM25 + vecteurs | Le service du modèle correspondant doit être accessible |
| Modèle d'incorporation local | Vectorisation souhaitée sur la machine locale | Recherche BM25 + vecteurs locaux | Télécharger d'abord dans [Modèles locaux] |

## Étapes de création

{% stepper %}
{% step %}
### 1. Ouvrir la fenêtre de création

Ouvrez la navigation latérale [Bases de connaissances], puis cliquez sur le bouton d'ajout au-dessus de la liste des bases de connaissances.
{% endstep %}

{% step %}
### 2. Saisir le nom

Saisissez un nom qui définit la portée, par exemple [Politique de déplacement des employés].
{% endstep %}

{% step %}
### 3. Choisir le modèle d'incorporation

Sélectionnez un modèle d'incorporation cloud ou local disponible. Si la recherche sémantique n'est pas nécessaire pour l'instant, choisissez [Non utilisé].

<figure><img src="../../../assets/7f1505c0527aeddf65937cdc.webp" alt="Le nom définit les limites des documents ; le modèle d'incorporation détermine si la recherche par vecteurs est activée."><figcaption><p>Le nom définit les limites des documents ; le modèle d'incorporation détermine si la recherche par vecteurs est activée.</p></figcaption></figure>
{% endstep %}

{% step %}
### 4. Cliquer sur Créer

Après avoir confirmé le nom et le modèle, cliquez sur [Créer]. Une fois la création terminée, vous accéderez à la base de connaissances vide.
{% endstep %}

{% step %}
### 5. Ajouter le premier lot de documents

Cliquez sur le bouton d'ajout de documents, importez un ou deux fichiers ou notes aux réponses claires, puis attendez la fin du traitement.
{% endstep %}
{% endstepper %}

## Utiliser un modèle d'incorporation local

Ouvrez [Paramètres] → [Modèles locaux], puis téléchargez un modèle disponible dans la section [Modèles d'incorporation]. Les modèles affichés et les tailles de téléchargement peuvent varier selon l'environnement d'installation ; référez-vous à la liste actuelle.

<figure><img src="../../../assets/ba97a6075b29a5304d81dc79.webp" alt="Après le téléchargement, revenez à la page de création ou de paramètres de la base de connaissances pour sélectionner ce modèle."><figcaption><p>Après le téléchargement, revenez à la page de création ou de paramètres de la base de connaissances pour sélectionner ce modèle.</p></figcaption></figure>

{% hint style="warning" %}
L'incorporation locale signifie uniquement que la vectorisation est effectuée sur la machine locale. L'analyse des documents, le réordonnancement et le chat utilisent-ils le cloud dépendent des services et modèles sélectionnés pour chacun.
{% endhint %}

## Changer de modèle après l'ajout de documents

Lors de l'activation d'un modèle d'incorporation sur une base de connaissances utilisant uniquement BM25, un index vectoriel peut être créé. Pour une base de connaissances qui possède déjà des vecteurs, le changement de modèle d'incorporation déclenche le processus de [Reconstruction de la base de connaissances].

{% hint style="danger" %}
Avant de démarrer la reconstruction, vérifiez que le nouveau modèle est accessible. Après la reconstruction, refaites le test de récupération. Ne changez pas de modèle et ne modifiez pas le fractionnement dans la même itération, sinon il sera impossible de déterminer l'origine des changements de résultats.
{% endhint %}

## Description de la configuration

| Paramètre | Valeur par défaut | Point de départ suggéré | Rôle | Scénario adapté | Remarques |
| ------ | ----- | ----------- | ---------- | ----------- | ------------------ |
| Nom | Vide | Objet + usage | Distinguer les limites des documents | Toutes les bases de connaissances | Séparez les documents ayant des permissions ou des cycles de vie différents |
| Modèle d'incorporation | Non utilisé | Commencer par Non utilisé pour une première expérience | Détermine si la recherche par vecteurs est activée | Formulations orales, nombreuses expressions synonymes | La facturation et le traitement des données des modèles cloud dépendent du fournisseur |
| Modèle d'incorporation local | Non téléchargé | Télécharger uniquement si besoin de traitement local | Vectorisation sur la machine locale | Exigences élevées en matière d'offline ou de confidentialité | Vérifiez séparément les modèles d'analyse, de réordonnancement et de chat |

## Résultat attendu

* La nouvelle base de connaissances apparaît dans la liste, avec un nom distinct des autres.
* Vous savez clairement si la recherche par mots-clés ou la recherche hybride est utilisée.
* Le modèle cloud sélectionné est accessible, ou le modèle local a été téléchargé.

## Cas d'utilisateur

Xiao Lin crée pour la première fois une base de connaissances [Politique de déplacement des employés]. Il choisit d'abord [Non utilisé] pour le modèle d'incorporation, importe trois politiques et effectue un test de récupération. Une fois la recherche par mots-clés stable, il configure le modèle d'incorporation et compare les résultats des questions formulées oralement avec les mêmes questions.

Le critère de réussite est : après la mise à niveau de la méthode de recherche, les questions fixes initiales ne régressent pas, et les questions formulées oralement trouvent plus stables la même politique.

## Questions fréquentes

<details>

<summary>Que faire si le bouton Créer n'est pas disponible ?</summary>

Vérifiez si le nom est vide et si le modèle sélectionné est toujours disponible. Si le service du modèle n'est pas configuré, vous pouvez passer à [Non utilisé] pour terminer la création.

</details>

<details>

<summary>Ne pas utiliser de modèle d'incorporation signifie-t-il qu'aucun résultat ne sera trouvé ?</summary>

Non. La base de connaissances utilisera toujours la recherche par mots-clés BM25. Plus les termes de la question sont proches de ceux des documents, plus les résultats sont généralement stables.

</details>

<details>

<summary>Faut-il créer une base de connaissances séparée pour chaque sujet ?</summary>

Le critère est « ces documents doivent-ils être recherchés ensemble lors de l'utilisation ». Les documents avec des permissions, des cycles de vie ou des sujets totalement différents sont mieux séparés.

</details>

## Continuer la lecture

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Ajouter et organiser les documents</strong></td><td>Importer du contenu et gérer les conflits de noms identiques.</td><td><a href="sources.md">sources.md</a></td></tr><tr><td><strong>Vérifier les documents et la récupération</strong></td><td>Valider les résultats avec des questions réelles.</td><td><a href="recall-test.md">recall-test.md</a></td></tr><tr><td><strong>Paramètres des modèles et de la recherche</strong></td><td>Comprendre l'incorporation, le réordonnancement et la reconstruction.</td><td><a href="emb-models-info.md">emb-models-info.md</a></td></tr></tbody></table>
