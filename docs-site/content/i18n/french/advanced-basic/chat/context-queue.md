---
icon: layer-group
---
# Conversations longues, contexte et file d'attente des messages

Plus la conversation est longue, plus l'historique que le modèle doit lire est important. Lorsque l'utilisation du contexte approche de la limite, les contenus antérieurs peuvent ne plus participer à la réponse. Plutôt que d'ajouter continuellement « continuez », il est préférable de synthétiser régulièrement les conclusions et les questions en suspens.

<figure><img src="../../../../assets/e9e4f4f66770c61bcaf40ea6.webp" alt="Modifiez les paramètres avancés uniquement si vous devez changer le style de réponse ou la gestion des conversations longues ; en cas de doute, conservez les valeurs actuelles."><figcaption><p>Modifiez les paramètres avancés uniquement si vous devez changer le style de réponse ou la gestion des conversations longues ; en cas de doute, conservez les valeurs actuelles. </p></figcaption></figure>

### Gérer les conversations longues

{% stepper %}
{% step %}
#### 1. Observer les indications de contexte

Lorsque l'interface signale une pression accrue sur le contexte, cessez d'abord d'ajouter de grandes pièces jointes et vérifiez quels éléments de l'historique restent pertinents par rapport à l'objectif actuel.
{% endstep %}

{% step %}
#### 2. Demander au modèle de générer un résumé de transition

Demandez-lui de lister séparément « les faits confirmés, les conclusions actuelles, les problèmes en attente et les contraintes à ne pas perdre ». Cela est plus adapté à la poursuite du travail qu'une simple demande de « résumez ».
{% endstep %}

{% step %}
#### 3. Ouvrir un nouveau sujet pour continuer

Placez le résumé de transition et les fichiers nécessaires dans un nouveau sujet, et indiquez dans le premier message quel objectif sera traité ensuite. Conservez le sujet d'origine comme référence.
{% endstep %}
{% endstepper %}

### Ajuster la gestion globale du contexte

Chemin : [Paramètres] → [Général] → [Gestion du contexte]. Ces paramètres s'appliquent aux conversations avec l'assistant standard ; un assistant individuel peut les surcharger dans ses propres paramètres.

| Paramètre | Valeur par défaut du produit | Point de départ recommandé | Rôle | Cas d'usage | Remarques |
| -------- | -------- | ------- | ------------- | ------------- | --------------- |
| Nombre de messages récents à conserver | Illimité | Laisser illimité | N'envoyer au modèle que les derniers messages | Tâches courtes à fenêtre fixe | Une valeur trop faible peut faire oublier au modèle des exigences toujours valides |
| Activer la gestion du contexte | Activé | Conserver activé | Gérer les résultats d'outils très longs et la compression de l'historique | Conversations longues, tâches avec de nombreux appels d'outils | Désactivé, les grands résultats occupent plus facilement le contexte |
| Seuil de troncature de la sortie des outils | 50 000 caractères | Conserver la valeur par défaut | Stocker les grands résultats et permettre au modèle de les lire par segments | Résultats d'outils de pages web, journaux, documents longs | Ne supprime pas le résultat d'origine |
| Compression automatique | Activé | Conserver activé | Résumer l'historique antérieur lorsque la limite de la fenêtre est proche | Travail continu sur plusieurs tours | La compression est un résumé et ne garantit pas la conservation de chaque détail |
| Modèle de compression | Suivre le modèle actuel | Suivre d'abord le modèle actuel | Choisir le modèle qui génère le résumé de l'historique | Nécessité de contrôler séparément la vitesse ou le coût | Changer de modèle ajoute des variables de dépannage |

[Paramètres] → [Modèle par défaut] propose également [Réessais d'appel au modèle]. Désactivé par défaut ; une fois activé, il tente par défaut au maximum 3 fois avec un recul exponentiel et permet de choisir des modèles de secours dans l'ordre. Les réessais et les secours ne s'appliquent qu'avant que le modèle commence à produire une sortie ; ils ne reprennent pas une réponse déjà partiellement générée avec un autre modèle.

### Utiliser la file d'attente des messages

Tant que le modèle répond, vous pouvez ajouter la demande suivante à la file d'attente. C'est adapté pour ajouter une action de suivi claire, par exemple « après achèvement, organisez en trois conclusions ». Pendant l'exécution d'un Agent, utilisez le [Raccourci de guidage] pour corriger immédiatement la direction actuelle ; si vous devez tout recommencer, arrêtez la génération en cours et reformulez l'objectif.

<figure><img src="../../../../assets/a62a413bccd43d18b59ee293.webp" alt="En cas de pause, vous pouvez d'abord vérifier les résultats ; après la reprise, les messages en file d'attente seront envoyés dans l'ordre du haut vers le bas."><figcaption><p>En cas de pause, vous pouvez d'abord vérifier les résultats ; après la reprise, les messages en file d'attente seront envoyés dans l'ordre du haut vers le bas. </p></figcaption></figure>

Sur l'image : ① deux messages en file d'attente dans le sujet actuel ; ② reprise de l'envoi automatique. Après la reprise, les messages seront envoyés dans l'ordre du haut vers le bas.

{% hint style="info" %}
La file d'attente n'est pas un plan d'automatisation. Elle ne gère que les messages de suivi dans le sujet actuel ; pour une exécution à heure fixe, utilisez [Tâches planifiées].
{% endhint %}

#### Cas d'application : réviser un long rapport

Téléchargez d'abord le rapport et demandez de lister les problèmes par chapitre. Pendant le traitement par le modèle, ajoutez successivement à la file d'attente « après achèvement, organisez la liste des risques » et « enfin, générez une liste de contrôle ». Si vous devez vérifier les résultats de la première passe, vous pouvez mettre en pause l'envoi automatique ; rétablissez-le après confirmation. Cela évite de rester devant la conversation pour envoyer chaque message individuellement et empêche la demande suivante d'être exécutée avant la vérification.

<details>

<summary>Pourquoi le modèle a-t-il soudainement oublié les exigences formulées précédemment ? </summary>

Vérifiez d'abord si la conversation est trop longue, si le modèle a été changé, et si les exigences clés n'ont été formulées qu'une seule fois. Rédigez les règles stables dans la description explicite de la tâche actuelle ; pour une réutilisation à long terme, confiez-les au prompt de l'Agent ou aux compétences.

</details>

<details>

<summary>Pourquoi le modèle a-t-il soudainement oublié les exigences formulées précédemment ? </summary>

Vérifiez d'abord si la conversation est trop longue, si le modèle a été changé, et si les exigences clés n'ont été formulées qu'une seule fois. Rédigez les règles stables dans la description explicite de la tâche actuelle ; pour une réutilisation à long terme, confiez-les au prompt de l'Agent ou aux compétences.

</details>
