---
icon: timeline
---
# Chaîne d'appels et mode développeur

La chaîne d'appels permet d'examiner les requêtes de modèle, les appels d'outils et les interactions MCP qui se produisent à l'intérieur d'une conversation ou d'une tâche Agent. Elle est utile pour le débogage et l'analyse des performances, mais n'est pas une fonctionnalité à activer pour un usage quotidien.

<figure><img src="../../../../assets/7cb797e89c5a180b57971c67.webp" alt="Lors du débogage des appels MCP, vérifiez d'abord le serveur et l'authentification, puis utilisez la chaîne d'appels pour déterminer si la requête a atteint les phases d'exécution de l'Agent et des outils."><figcaption><p>Lors du débogage des appels MCP, vérifiez d'abord le serveur et l'authentification, puis utilisez la chaîne d'appels pour déterminer si la requête a atteint les phases d'exécution de l'Agent et des outils. </p></figcaption></figure>

### Méthode d'activation

{% stepper %}
{% step %}
#### 1. Ouvrir [Paramètres] → [Général]

Activez [Activer le mode développeur] dans la section [Mode développeur].
{% endstep %}

{% step %}
#### 2. Redémarrer Cherry Studio

Le mode développeur prend effet après le redémarrage. Avant de redémarrer, vérifiez l'état des tâches Agent en cours d'exécution.
{% endstep %}

{% step %}
#### 3. Reproduire le problème

Renvoyez un message de test minimal, en conservant uniquement les modèles et outils nécessaires, afin de réduire les appels inutiles.
{% endstep %}

{% step %}
#### 4. Ouvrir la chaîne d'appels

Dans le panneau latéral droit de la conversation ou de l'Agent, accédez à [Chaîne d'appels]. Sélectionnez un nœud pour afficher les entrées, les sorties, la durée et l'état. Pour les tâches Agent, vous pouvez également voir le nom de l'Agent, les opérations et le nombre d'appels d'outils.
{% endstep %}
{% endstepper %}

### Comment interpréter les nœuds courants

| Nœud | Points à vérifier | Problèmes courants |
| -------- | ------------------ | ---------------- |
| Requête de modèle | Modèle, entrées, sorties, Jetons et état | Erreurs du fournisseur, contexte trop long, sortie vide |
| Appel d'outil | Nom de l'outil, paramètres, résultat | Erreurs de paramètres, attente d'autorisation, retour anormal de l'outil |
| Appel MCP | Nom du service, type de connexion, entrées et sorties | Déconnexion du serveur, échec d'authentification, erreur distante |
| Exécution Agent | Agent, opérations, nombre d'outils et état | Échec de sous-tâche, processus non terminé |
| Requête HTTP | Méthode, URL, état et réponse | Adresse incorrecte, problème réseau ou d'authentification |

{% hint style="danger" %}
La chaîne d'appels peut contenir des prompts, des contenus de fichiers, des en-têtes de requête et des paramètres d'outils. Avant de partager des captures d'écran ou d'exporter des informations, supprimez impérativement les clés API, les en-têtes Authorization, les cookies, les adresses e-mail, les chemins locaux et les données métier.
{% endhint %}

### Cas utilisateur : un outil MCP renvoie un résultat vide

Vérifiez d'abord que le serveur fonctionne correctement dans la page de paramètres MCP, puis demandez à l'Agent d'appeler un seul outil. Si la chaîne d'appels montre que la requête a atteint le serveur mais que la sortie est vide, le problème provient probablement des données ou des paramètres côté serveur, et non d'un défaut de liaison de l'Agent. S'il n'y a aucun nœud MCP, retournez dans [MCP] de l'Agent pour vérifier la liaison.

<details>

<summary>Pourquoi ne vois-je toujours pas la chaîne d'appels après activation ? </summary>

Vérifiez que l'application a bien été redémarrée et relancez une requête après le redémarrage. Les messages historiques générés avant l'activation ne reçoivent pas automatiquement de données d'appel.

</details>

<details>

<summary>Pourquoi ne vois-je toujours pas la chaîne d'appels après activation ? </summary>

Vérifiez que l'application a bien été redémarrée et relancez une requête après le redémarrage. Les messages historiques générés avant l'activation ne reçoivent pas automatiquement de données d'appel.

</details>
