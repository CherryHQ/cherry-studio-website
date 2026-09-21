---
icon: flask
---
# Revue de recherche multi-modèles

Une équipe produit prépare une rétrospective trimestrielle : les documents internes sont prêts, mais il faut compléter avec des informations publiques et comparer les perspectives offertes par différents modèles. L'objectif final est de livrer un rapport de recherche permettant de vérifier les sources et de distinguer clairement les faits des jugements.

<figure><img src="../../../../assets/290e0288048d57cd868cb443.webp" alt="Au début de la recherche, définissez les modèles à comparer et le périmètre des questions, sans changer arbitrairement les critères en cours de route."><figcaption><p>Au début de la recherche, définissez les modèles à comparer et le périmètre des questions, sans changer arbitrairement les critères en cours de route. </p></figcaption></figure>

<figure><img src="../../../../assets/49842a248b90a5707753efa1.webp" alt="Placez les différentes hypothèses dans des branches indépendantes, puis revenez à la ligne principale pour consolider les conclusions confirmées."><figcaption><p>Placez les différentes hypothèses dans des branches indépendantes, puis revenez à la ligne principale pour consolider les conclusions confirmées. </p></figcaption></figure>

<figure><img src="../../../../assets/20eae1a141993f3367a544b0.webp" alt="① Précisez les dimensions de vérification et les conditions connues dans la question ; ② Développez les résultats selon une structure identique pour faciliter la comparaison, les questions complémentaires et la vérification humaine."><figcaption><p>① Précisez les dimensions de vérification et les conditions connues dans la question ; ② Développez les résultats selon une structure identique pour faciliter la comparaison, les questions complémentaires et la vérification humaine. </p></figcaption></figure>

## Combinaison recommandée

* 【Dialogue】Multi-modèles : identifier les consensus, les divergences et les omissions ;
* Agent de recherche : faire avancer les tâches, décomposer les sous-tâches et générer le rapport ;
* Base de connaissances : rechercher dans les documents internes ;
* Recherche web ou MCP fiable : compléter avec des sources externes ;
* Dossier de travail : conserver les matériaux bruts et les livrables finaux.

## Processus opérationnel

{% stepper %}
{% step %}
### 1. Comparer les perspectives avec la même question

Dans 【Dialogue】, sélectionnez plusieurs modèles et demandez-leur de lister séparément les conclusions, les hypothèses, les sources et les éléments incertains. Organisez les conflits réels en questions de recherche à traiter.
{% endstep %}

{% step %}
### 2. Créer un Agent de recherche

Associez les bases de connaissances et les compétences de recherche pertinentes, en maintenant les autorisations en mode 【Confirmation à chaque fois】. Dans le dossier de travail, séparez les documents bruts du répertoire de sortie `report/`.
{% endstep %}

{% step %}
### 3. Attribuer les sous-tâches

Demandez à l'Agent de vérifier séparément la chronologie des faits, l'évolution des données et les perspectives externes, puis laissez l'Agent principal comparer les conflits. Conservez les informations non confirmées comme « à vérifier » sans les fusionner de force.
{% endstep %}

{% step %}
### 4. Générer le rapport et le vérifier manuellement

Le rapport doit inclure les conclusions, les sources, les éléments incertains et les actions à suivre. Vérifiez les citations, les dates et les chiffres dans 【Fichiers】 à droite avant publication.
{% endstep %}
{% endstepper %}

## Exemple de tâche

```
Analysez les documents du projet dans le dossier actuel et complétez-les avec des informations publiques. Séparez les faits, les jugements et les recommandations, et conservez les liens des sources externes. Vérifiez séparément la chronologie, les données et les risques, puis créez le rapport dans report/review.md. Ne modifiez pas les fichiers de raw/.
```

## Préparation avant utilisation et critères d'achèvement

| Élément | Préparation recommandée |
| ---- | ------------------------------- |
| Question de recherche | Formulez en une phrase la conclusion à comparer |
| Exigences de sources | Définissez la plage de temps, la région et les sources acceptables |
| Combinaison recommandée | La comparaison multi-modèles sert à collecter les différences, les branches à approfondir, les notes à conserver les conclusions confirmées |
| Critères d'achèvement | Chaque conclusion clé doit pouvoir être retracée jusqu'à sa source ; les divergences sont listées séparément ; le contenu non confirmé n'est pas présenté comme un fait |

Ce cas est adapté aux recherches nécessitant la comparaison de perspectives et la rétrospective de processus décisionnels, mais il ne convient pas de considérer le vote multi-modèles comme un jugement de fait direct.

{% hint style="danger" %}
Pour les sujets à haut risque comme la finance, la santé ou le droit, ne vous fiez pas uniquement aux conclusions des modèles. Le rapport doit conserver les sources et être revu par une personne disposant de l'expérience ou des qualifications appropriées.
{% endhint %}
