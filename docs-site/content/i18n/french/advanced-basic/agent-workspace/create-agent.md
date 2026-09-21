---
icon: wand-magic-sparkles
---
# Création d'un Agent et répartition des modèles

Point d'entrée : navigation latérale gauche [Travail] → [Ajouter un agent].

L'assistant de création se divise en quatre étapes : [Informations de base], [Prompt système], [Compétences] et [Base de connaissances]. La première étape nécessite également de choisir le mode d'exécution ; ce mode détermine la répartition des modèles disponibles pour l'Agent, le mode de permissions et certains outils, et ne peut pas être modifié après la création.

<figure><img src="../../../../assets/0797ee2c9878cf471b44fe2e.webp" alt="Création d'un Agent et répartition des modèles — Illustration"><figcaption></figcaption></figure>

### Comment choisir le mode d'exécution

| Mode d'exécution | Caractéristiques principales | Configuration des modèles | Permissions et restrictions |
| ------------------ | ------------------- | -------------------- | ------------------------------------ |
| [Renforcé : Claude Agent] | Fonctionnalités complètes, adapté aux tâches complexes et multi-étapes | Modèle principal, modèle Plan, modèle Small | Prend en charge tous les modes de permissions et la détection de battement |
| [Rapide : Pi] | Réponses rapides, faible coût, adapté aux tâches quotidiennes de fichiers et de codage | Configuration du modèle principal uniquement | Ne propose pas [Planification uniquement] ; par défaut [Approbation intelligente] lors de la création |
| [DeepSeek Harness] | Compatible avec divers services de modèles, prend en charge l'exécution orientée objectifs | Configuration du modèle principal uniquement | Ne propose pas [Approbation intelligente] ni la détection de battement ; prend en charge `/compact`, `/goal` |

{% hint style="warning" %}
Le mode d'exécution ne peut pas être modifié après la création. Si les objectifs, la compatibilité des modèles ou les besoins en permissions changent fondamentalement, créez un nouvel Agent au lieu de modifier l'ancien.
{% endhint %}

### Comment remplir les quatre étapes

{% stepper %}
{% step %}
#### 1. Informations de base

Nommez l'Agent selon le poste ou le type de tâche, par exemple « Vérification de contrat » ou « Planification de contenu ». Sélectionnez d'abord le mode d'exécution, puis choisissez les modèles compatibles listés sur la page. La description sert uniquement à aider à identifier l'usage ; le modèle principal gère le raisonnement et l'exécution principaux.
{% endstep %}

{% step %}
#### 2. Rédaction du prompt système

Précisez le rôle, les objectifs, les limites et le format de sortie. Plutôt que d'empiler des adjectifs, fournissez des règles actionnables : listez d'abord les risques, citez ensuite le texte original, puis proposez des modifications ; marquez clairement les informations insuffisantes au lieu de deviner.
{% endstep %}

{% step %}
#### 3. Sélection des compétences

Sélectionnez uniquement les compétences liées au mode de travail à long terme de cet Agent. Les compétences peuvent être installées via [Paramètres] → [Compétences], ou vous pouvez demander à l'Agent de les rechercher et les installer plus tard.
{% endstep %}

{% step %}
#### 4. Liaison de la base de connaissances

Liez uniquement les bases de connaissances dont l'Agent a réellement besoin pour la recherche. Si aucune base de connaissances n'est liée, les outils de recherche et de gestion de base de connaissances n'apparaîtront pas dans la liste des outils de cet Agent.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../assets/0d33fc961386a770a40db97d.webp" alt="Sélectionnez d'abord le modèle principal ; configurez le modèle Plan et le modèle Small uniquement si la tâche nécessite réellement une répartition de la planification ou un traitement léger."><figcaption><p>Sélectionnez d'abord le modèle principal ; configurez le modèle Plan et le modèle Small uniquement si la tâche nécessite réellement une répartition de la planification ou un traitement léger. </p></figcaption></figure>

### Configuration continue après la création

Ouvrez le menu dans la liste des Agents et sélectionnez Modifier pour ajuster les éléments suivants :

* [Base] : consulter le mode d'exécution et ajuster les modèles, permissions et paramètres de battement pris en charge par ce mode ;
* [Prompt] : description du rôle, règles de traitement et limites de comportement ;
* [Outils intégrés] : fichiers, recherche, images, notifications, tâches planifiées, mémoire, sous-agents et flux de travail, etc. ;
* [Base de connaissances] : limiter les bases de connaissances accessibles par l'Agent ;
* [MCP] : lier les serveurs MCP déjà connectés ;
* [Compétences] : sélectionner les compétences installées ;
* [Avancé] : définir des variables d'environnement pour les outils réellement nécessaires.

{% hint style="info" %}
La fenêtre d'édition actuelle enregistre automatiquement les modifications. Si des modifications restent à enregistrer avant de fermer la fenêtre, l'application terminera d'abord l'enregistrement ; en cas d'échec, la fenêtre restera ouverte et affichera l'erreur.
{% endhint %}

### Point de départ recommandé

| Paramètre | Valeur par défaut du produit | Point de départ suggéré | Rôle | Scénarios applicables | Remarques |
| --------------- | ----------------------------- | ----------------------- | -------------- | ------------------ | ---------------------------------- |
| Mode d'exécution | [Renforcé : Claude Agent] | Utilisez [Renforcé : Claude Agent] en cas d'incertitude | Détermine la répartition des modèles, les permissions et la portée des outils | Tous les Agents | Non modifiable après la création |
| Modèle principal | Utilise le modèle sélectionné lors de la création | Choisissez un modèle vérifié pour appeler stables les outils | Raisonnement et exécution principaux | Tous les Agents | Le sélecteur filtre les modèles incompatibles selon le mode d'exécution |
| Modèles Plan / Small | Identiques au modèle principal | Gardez-les identiques au modèle principal au début | Décomposition des tâches, jugements simples et formatage | Uniquement [Renforcé : Claude Agent] | Pi et DeepSeek Harness n'affichent pas ces deux champs |
| Mode de permissions | Claude/DSH : [Confirmation à chaque fois] ; Pi : [Approbation intelligente] | Utilisez [Confirmation à chaque fois] en priorité pour les répertoires de projets réels | Détermine si les outils nécessitent une approbation | Tâches de fichiers, terminal et réseau | [Accès complet] peut supprimer des fichiers ou accéder au réseau |
| Détection de battement | Activée initialement pour les modes d'exécution pris en charge, intervalle de 30 minutes | Désactivez si aucune tâche continue | Permet à l'Agent de vérifier régulièrement le travail | Claude Agent, Pi | DeepSeek Harness ne propose pas la détection de battement ; utilisez des tâches planifiées pour les heures fixes |

### Cas utilisateur : Agent de vérification de contrat

Créez un Agent « Vérification de contrat », sélectionnez un modèle principal déjà vérifié, exigez dans le prompt une sortie selon « clauses à risque, position du texte original, impact, recommandations », liez la base de connaissances des politiques de l'entreprise et maintenez les permissions en [Confirmation à chaque fois]. Créez une nouvelle tâche pour chaque contrat et sélectionnez le répertoire de fichiers correspondant, afin d'éviter que les documents de différents clients ne se mélangent dans le même contexte.

<details>

<summary>Pourquoi ne vois-je pas les paramètres complets de MCP et des permissions lors de la création ? </summary>

L'assistant de création ne conserve que les étapes courantes. Après la création, ouvrez la fenêtre d'édition de l'Agent pour continuer la configuration dans [Base], [Outils intégrés], [Base de connaissances], [MCP], [Compétences] et [Avancé] ; les onglets spécifiques varient selon les capacités du mode d'exécution.

</details>
