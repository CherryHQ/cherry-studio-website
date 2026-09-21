---
icon: brain
---
# Flux de travail des connaissances et du contenu

Les bases de connaissances, les notes, le dessin et la traduction ne sont pas des outils isolés. Ils respectivement organisent les ressources, consolident le contenu, produisent des éléments visuels et traitent les fichiers multilingues, et peuvent tous être utilisés par l'Agent.

<figure><img src="../../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="Commencez par tester la récupération avec des questions réelles, puis demandez à l'Agent de créer des rapports, des traductions ou des illustrations à partir des ressources."><figcaption><p>Commencez par tester la récupération avec des questions réelles, puis demandez à l'Agent de créer des rapports, des traductions ou des illustrations à partir des ressources. </p></figcaption></figure>

## Répartition des rôles entre les quatre modules

| Module | Usage recommandé | Étape suivante courante |
| ----- | ---------------------- | -------------- |
| 【Base de connaissances】 | Rendre les ressources consultables par question | Associer à un assistant de conversation ou à un Agent |
| 【Notes】 | Rédiger, organiser et maintenir à long terme du contenu Markdown | Exporter le document ou l'ajouter à la base de connaissances |
| 【Dessin】 | Générer, éditer, fusionner et améliorer des images | Télécharger, ou utiliser pour une tâche de contenu |
| 【Traduction】 | Traiter du texte, des images et des documents | Enregistrer le résultat, réutiliser l'historique ou continuer l'édition |

{% hint style="success" %}
Si l'objectif est « d'utiliser ces ressources pour livrer un résultat final », indiquez directement dans 【Travail】 à l'Agent où se trouvent les ressources et ce qu'il doit produire. Accédez au module correspondant uniquement si vous devez organiser manuellement la base de ressources, ajuster des images ou vérifier les traductions paragraphe par paragraphe.
{% endhint %}

<figure><img src="../../../../assets/203ae7d1fc3c8b76bd8af0a8.webp" alt="Lors de la création d'une base de connaissances, donnez-lui d'abord un nom, puis sélectionnez le modèle d'incorporation utilisé pour la recherche."><figcaption><p>Lors de la création d'une base de connaissances, donnez-lui d'abord un nom, puis sélectionnez le modèle d'incorporation utilisé pour la recherche. </p></figcaption></figure>

## Des ressources au livrable

{% stepper %}
{% step %}
### 1. Organiser d'abord les sources

Ajoutez les ressources de référence à long terme à la base de connaissances et placez les brouillons en cours de modification dans les notes ou le répertoire de travail. N'importez pas dans la base de connaissances toutes les conversations temporaires non confirmées.
{% endstep %}

{% step %}
### 2. Vérifier la récupération des informations clés

Utilisez le test de récupération dans la base de connaissances pour vous assurer que les questions réelles trouvent les bons extraits. Si la recherche échoue, corrigez d'abord les ressources et les paramètres, sans laisser l'Agent deviner.
{% endstep %}

{% step %}
### 3. Produire ensuite le texte, la traduction et les images

Demandez à l'Agent de rédiger le contenu à partir des ressources ; affinez les images et les traductions respectivement dans 【Dessin】 et 【Traduction】. Enfin, une personne vérifie les faits et la formulation.
{% endstep %}
{% endstepper %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Construire une base de connaissances et tester la récupération</strong></td><td>De l'importation des ressources à la validation de la recherche</td><td><a href="knowledge-base.md">knowledge-base.md</a></td></tr><tr><td><strong>Notes, base de connaissances et Agent</strong></td><td>Faire circuler fluidement brouillons, ressources et tâches</td><td><a href="notes-knowledge-agent.md">notes-knowledge-agent.md</a></td></tr><tr><td><strong>Génération, édition et amélioration d'images</strong></td><td>Créer des images exploitables à partir de modèles</td><td><a href="painting-workflow.md">painting-workflow.md</a></td></tr><tr><td><strong>Traduction de fichiers, d'images et de longs textes</strong></td><td>Traiter différents formats et réutiliser les résultats passés</td><td><a href="translation-workflow.md">translation-workflow.md</a></td></tr></tbody></table>
