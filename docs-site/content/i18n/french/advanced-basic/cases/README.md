---
icon: lightbulb
---
# Cas d'usage

Ces cas d'usage montrent comment combiner conversations, Agent, base de connaissances, notes, dessin, traduction, canaux, tâches planifiées et multi-fenêtres pour créer des processus réellement opérationnels. Les configurations présentées sont un point de départ ; en pratique, elles doivent être ajustées selon la sensibilité des données, le volume d'utilisation et les règles de l'équipe.

<figure><img src="../../../../assets/fcd8d884c9294cbc845fdf9c.webp" alt="Commencez par exécuter manuellement le processus avec des données réelles, puis intégrez progressivement la base de connaissances, les compétences, MCP, les canaux et les tâches planifiées."><figcaption><p>Commencez par exécuter manuellement le processus avec des données réelles, puis intégrez progressivement la base de connaissances, les compétences, MCP, les canaux et les tâches planifiées.</p></figcaption></figure>

## Choisir un cas d'usage

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Analyse rétrospective multi-modèles</strong></td><td>Données internes, sources externes et vérification des contradictions</td><td><a href="research-review.md">research-review.md</a></td></tr><tr><td><strong>Relecture de documents longs</strong></td><td>Vérification par chapitre et génération d'une version révisée</td><td><a href="long-document-review.md">long-document-review.md</a></td></tr><tr><td><strong>Livraison de fichiers de projet par Agent</strong></td><td>Contrôle des répertoires, des autorisations et du périmètre des livrables</td><td><a href="project-delivery.md">project-delivery.md</a></td></tr><tr><td><strong>Kit d'images de marque</strong></td><td>De la direction visuelle aux images en plusieurs formats</td><td><a href="brand-image-kit.md">brand-image-kit.md</a></td></tr><tr><td><strong>Q&R sur base de connaissances privée</strong></td><td>Limitation du périmètre des données et refus des suppositions</td><td><a href="private-knowledge-qa.md">private-knowledge-qa.md</a></td></tr><tr><td><strong>Génération de rapports hebdomadaires à partir de notes</strong></td><td>Des notes quotidiennes à un rapport hebdomadaire vérifiable</td><td><a href="notes-weekly-report.md">notes-weekly-report.md</a></td></tr><tr><td><strong>Organisation de documents multilingues</strong></td><td>Terminologie, OCR, documents et vérification de cohérence</td><td><a href="multilingual-materials.md">multilingual-materials.md</a></td></tr><tr><td><strong>Canaux et rapports quotidiens planifiés</strong></td><td>Agent, canaux, planification et journaux d'exécution</td><td><a href="automated-daily-report.md">automated-daily-report.md</a></td></tr><tr><td><strong>Espace de travail de recherche multi-fenêtres</strong></td><td>Conservation simultanée des données, comparaison et exécution de tâches</td><td><a href="multi-window-research.md">multi-window-research.md</a></td></tr></tbody></table>

## Ordre de mise en œuvre général

<figure><img src="../../../../assets/2573aee0510e0d6abdabab7f.webp" alt="Les cas d'usage ne sont pas un ensemble de réglages isolés, mais des flux de travail complets allant de l'entrée, à l'exécution, à la revue, jusqu'à la livraison."><figcaption><p>Les cas d'usage ne sont pas un ensemble de réglages isolés, mais des flux de travail complets allant de l'entrée, à l'exécution, à la revue, jusqu'à la livraison.</p></figcaption></figure>

## Choisir un cas d'usage selon la tâche

| Votre tâche | À consulter en premier | Capacités principales |
| ----------- | -------------- | -------------- |
| Comparer des points de vue et conserver le processus de recherche | 【Analyse rétrospective multi-modèles】 | Conversation, branches, notes |
| Relire de volumineux documents et formuler des avis | 【Relecture de documents longs】 | Agent, répertoire de travail, fichiers |
| Livrer des documents et livrables de projet | 【Livraison de fichiers de projet par Agent】 | Agent, état, fichiers |
| Générer un ensemble d'images au style cohérent | 【Kit d'images de marque】 | Dessin par Agent, modèles de dessin |
| Répondre uniquement sur la base de données internes | 【Q&R sur base de connaissances privée】 | Base de connaissances, tests de rappel, Agent |
| Organiser un rapport hebdomadaire à partir de notes éparses | 【Génération de rapports hebdomadaires à partir de notes】 | Notes, Agent, fichiers |
| Organiser des fichiers multilingues | 【Organisation de documents multilingues】 | Traduction, Agent, répertoire de travail |
| Envoyer des rapports fixes à intervalle régulier | 【Canaux et rapports quotidiens planifiés】 | Agent, canaux, tâches planifiées |
| Surveiller simultanément les données et les tâches longues | 【Espace de travail de recherche multi-fenêtres】 | Onglets, multi-fenêtres, recherche globale |

{% stepper %}
{% step %}
### 1. Définir d'abord le livrable

Précisez quel fichier, tableau, image ou message doit être produit à la fin, ainsi que les critères de complétion.
{% endstep %}

{% step %}
### 2. Exécuter manuellement dans 【Travail】

Vérifiez que le modèle, le prompt, le répertoire de travail et les données sont suffisants. Examinez point par point les opérations nécessitant une approbation.
{% endstep %}

{% step %}
### 3. Ne conserver que les parties stables

Transformez les étapes répétitives en compétences, placez les données de long terme dans la base de connaissances et laissez les exigences temporaires dans le prompt de la tâche.
{% endstep %}

{% step %}
### 4. Ajouter enfin les connexions externes et l'automatisation

Après une première validation manuelle, intégrez MCP, les canaux ou les tâches planifiées, tout en conservant une option de traitement manuel en cas d'échec.
{% endstep %}
{% endstepper %}
