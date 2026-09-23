---
icon: flask
---
# Vérification des ressources et rappel

Le test de rappel vérifie directement « si la question trouve le bon fragment », sans passer d'abord par le modèle de chat pour la reformulation. Il vous aide à déterminer si le problème provient des ressources, de l'analyse, du fractionnement ou des paramètres de recherche.

{% hint style="info" %}
Préparez 3 à 5 questions réelles dont vous connaissez déjà la réponse, et réutilisez-les à chaque mise à jour des ressources, du modèle ou du fractionnement. Des questions fixes permettent de détecter plus facilement les régressions que des questions improvisées.
{% endhint %}

## Préparer les questions de test

Il est recommandé de couvrir trois types de questions :

* Des faits précis, par exemple « Quelle est la limite de remboursement pour l'hébergement dans les grandes villes chinoises ? »
* Des règles conditionnelles, par exemple « Dans quelles conditions la location de voiture à l'étranger est-elle remboursable ? »
* Des cas facilement confondus, par exemple « Qui doit approuver les déplacements de plus de 5 000 yuans ? »

Ne testez pas uniquement avec les titres des ressources ou des phrases complètes copiées du texte, car cela surestime l'efficacité réelle.

## Réaliser un test de rappel

{% stepper %}
{% step %}
### 1. Ouvrir le test de rappel

Ouvrez la navigation latérale [Base de connaissances] → Sélectionnez la base de connaissances → Accédez à [Test de rappel].
{% endstep %}

{% step %}
### 2. Saisir une question réelle

Saisissez une question à réponse claire et exécutez le test. La question doit ressembler à un langage courant, sans copier délibérément le texte original des ressources.
{% endstep %}

{% step %}
### 3. Vérifier la source et le fragment

Assurez-vous que la source est correcte et que le fragment contient à la fois les conditions et la conclusion nécessaires à la réponse.

<figure><img src="../../../assets/b44776524449cdefe62eaed3.webp" alt="Ne vous contentez pas de vérifier la présence de résultats, mais examinez également la source, l'intégrité du fragment et l'ordre."><figcaption><p>Ne vous contentez pas de vérifier la présence de résultats, mais examinez également la source, l'intégrité du fragment et l'ordre. </p></figcaption></figure>
{% endstep %}

{% step %}
### 4. Identifier le problème selon les symptômes

En l'absence totale de fragments corrects, vérifiez d'abord les ressources, l'analyse et le fractionnement. Si les fragments corrects apparaissent mais dans un ordre instable, envisagez ensuite l'embedding, le réordonnancement ou le Top K.
{% endstep %}

{% step %}
### 5. Ajuster un paramètre et retester

Modifiez un seul paramètre par itération. Si l'analyse, le fractionnement ou l'indexation sont concernés, exécutez d'abord [Réindexation], puis retestez avec le même ensemble de questions.
{% endstep %}
{% endstepper %}

## Comment interpréter les résultats

| Symptôme | Explication | Prochaine étape |
| ------------- | --------------------- | ---------------------- |
| La bonne source est en tête, le fragment est complet | Le rappel est globalement conforme | Testez plusieurs formulations différentes |
| Aucun résultat correct | Ressources non prêtes, contenu manquant, grande différence de formulation ou seuil trop élevé | Vérifiez successivement les ressources, le corps du texte, les Chunks et les paramètres de recherche |
| Source correcte mais le fragment manque de phrases clés | Les limites d'analyse ou de fractionnement ne sont pas optimales | Examinez les Chunks, ajustez puis réindexez |
| Les anciennes et nouvelles versions apparaissent simultanément | Les ressources homonymes ont toutes été conservées | Supprimez les anciennes entrées ou réimportez via [Remplacer] |
| Les bons résultats sont souvent en bas | Trop de candidats ou classement instable | Nettoyez les ressources, envisagez un modèle d'embedding ou de réordonnancement |
| Le rappel est correct mais la réponse du chat est imprécise | Le problème provient probablement du prompt ou du modèle de chat | Conservez les paramètres de rappel, ajustez la question et le modèle de chat |

{% hint style="warning" %}
Le modèle de chat ne peut pas récupérer les informations clés manquantes lors de la phase de rappel. Si les résultats de rappel sont insuffisants, ne commencez pas par changer de modèle de chat pour diagnostiquer le problème.
{% endhint %}

## Boucle d'optimisation

<figure><img src="../../../assets/8cd27fa50051cc96320b280a.webp" alt="Questions fixes → Vérification des résultats → Identification du niveau → Ajustement unitaire → Réindexation si nécessaire → Retest."><figcaption><p>Questions fixes → Vérification des résultats → Identification du niveau → Ajustement unitaire → Réindexation si nécessaire → Retest. </p></figcaption></figure>

Ordre recommandé :

1. Vérifiez que les ressources sont correctes, sans doublons ni versions obsolètes.
2. Examinez le corps du texte analysé et les Chunks.
3. Si la formulation diffère fortement du texte original, envisagez un modèle d'embedding.
4. Si les candidats sont globalement corrects mais mal ordonnés, envisagez un modèle de réordonnancement.
5. Réindexez après ajustement et répétez le même ensemble de tests.

<figure><img src="../../../assets/5bd8c12bd8d08e785c6a4c42.webp" alt="Si les fragments sont incomplets, vérifiez les paramètres de fractionnement ; les modifications n'affectent que les nouvelles ressources, les anciennes nécessitent une réindexation."><figcaption><p>Si les fragments sont incomplets, vérifiez les paramètres de fractionnement ; les modifications n'affectent que les nouvelles ressources, les anciennes nécessitent une réindexation. </p></figcaption></figure>

## Description des paramètres

| Paramètre | Valeur par défaut | Point de départ suggéré | Rôle | Cas d'usage | Remarques |
| ------ | ------------ | -------- | ---------- | ---------- | ----------------- |
| Nombre de questions de test | — | 3 à 5 | Établir une base de qualité reproductible | Toutes les bases de connaissances | Couvrir les faits précis, les règles conditionnelles et les cas confondus |
| Top K | 6, plage 1 à 50 | Conserver 6 au départ | Contrôler le nombre final de fragments | Compromis entre couverture et bruit | Une valeur élevée peut consommer plus de contexte |
| Seuil de similarité | 0.0, affiché uniquement après configuration du réordonnancement | Commencer à 0.0 | Filtrer les résultats à faible score après réordonnancement | Bruit persistant après réordonnancement | Un seuil trop élevé supprime les fragments corrects |
| Méthode de retest | — | Modifier un seul paramètre par itération | Identifier l'origine des changements | Optimisation, mise à jour des ressources ou du modèle | Réindexer d'abord après modification du fractionnement ou du modèle |

## Résultats attendus

* La bonne source apparaît de manière stable dans les premiers résultats.
* Le fragment contient les conditions et la conclusion nécessaires à la réponse.
* Les résultats restent stables avec une formulation naturelle différente.
* Après mise à jour des ressources ou des paramètres, les questions fixes ne montrent pas de régression significative.

## Cas utilisateur

Xiaolin a constaté que « Norme de remboursement de l'hébergement » était trouvé avec le texte original, mais « Quel est le montant maximal remboursable pour un hôtel ? » était instable. Il a d'abord vérifié que les ressources et les Chunks étaient corrects, puis a configuré un modèle d'embedding et retesté. Après l'apparition du fragment correct, il était parfois en bas, ce qui l'a conduit à ajouter un modèle de réordonnancement.

Le critère de réussite est : trois formulations différentes trouvent la même norme d'hébergement dans les premiers résultats, et le fragment contient la ville applicable et la limite de montant.

## Questions fréquentes

<details>

<summary>En l'absence totale de fragments corrects, faut-il d'abord augmenter le Top K ? </summary>

Vérifiez d'abord le corps du texte et les Chunks. En cas d'erreur d'analyse ou de découpage, augmenter le Top K ne fera que retourner plus de fragments incorrects ou incomplets.

</details>

<details>

<summary>Pourquoi le seuil de similarité n'est-il pas visible ? </summary>

Le [Seuil de similarité] n'apparaît dans les paramètres de la base de connaissances qu'après la sélection d'un modèle de réordonnancement.

</details>

<details>

<summary>Le rappel est correct, mais la réponse du chat reste imprécise, que faire ? </summary>

Conservez les paramètres de rappel actuels et vérifiez la formulation de la question, le contexte de la conversation et le modèle de chat. Le problème ne se situe généralement plus au niveau de la recherche de ressources.

</details>

## Pour aller plus loin

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Modèles et paramètres de recherche </strong></td><td>Ajuster l'embedding, le réordonnancement, le Top K et le fractionnement. </td><td><a href="emb-models-info.md">emb-models-info.md </a></td></tr><tr><td><strong>Analyse des documents et OCR </strong></td><td>Gérer les corps de texte manquants, les caractères illisibles et les contenus scannés. </td><td><a href="document-preprocessing.md">document-preprocessing.md </a></td></tr><tr><td><strong>Utilisation dans la conversation </strong></td><td>Utiliser la base de connaissances pour les questions après validation du rappel. </td><td><a href="chat.md">chat.md </a></td></tr></tbody></table>
