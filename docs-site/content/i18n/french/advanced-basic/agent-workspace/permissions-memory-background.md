---
icon: shield-halved
---
# Autorisations, mémoire et tâches en arrière-plan

L'Agent peut effectuer des opérations sur les fichiers, le terminal et le réseau, ainsi qu'appeler des sous-agents et des tâches en arrière-plan. Les autorisations déterminent « s'il faut demander avant d'agir », la mémoire détermine « si l'information est encore connue la prochaine fois », et le panneau d'état à droite indique « ce qui se passe actuellement ».

<figure><img src="../../../../assets/ccb5ce9eb543d9f9d2ccccbd.webp" alt="Pour un usage quotidien, commencez par les autorisations par défaut ; le mode Planification uniquement convient pour examiner d'abord le plan, et l'accès complet doit être réservé aux tâches aux limites claires et réversibles."><figcaption><p>Pour un usage quotidien, commencez par les autorisations par défaut ; le mode Planification uniquement convient pour examiner d'abord le plan, et l'accès complet doit être réservé aux tâches aux limites claires et réversibles. </p></figcaption></figure>

### Modes d'autorisation

| Mode | Comportement | Cas d'usage | Remarques |
| -------- | ------------- | ------------- | ---------------- |
| 【Confirmation à chaque action】 | Demande confirmation avant d'éditer des fichiers ou d'exécuter des commandes | Point de départ par défaut, répertoires de projets réels | Les confirmations fréquentes peuvent être fastidieuses, mais offrent le meilleur contrôle |
| 【Acceptation automatique des éditions】 | Peut éditer des fichiers, demande confirmation avant d'exécuter des commandes | Organisation de documents, modifications de code réversibles | Vérifiez d'abord le répertoire de travail et l'état du contrôle de version |
| 【Approbation intelligente】 | La décision d'autorisation est prise par des contrôles de sécurité | Modèle compatible et limites de la tâche claires | Certains modèles peuvent toujours demander confirmation à chaque action |
| 【Planification uniquement】 | Planifie uniquement, sans éditer de fichiers | Revue de plans, audit avant mise en production | Convient pour examiner le plan avant exécution |
| 【Accès complet】 | Ignore les contrôles d'autorisation | Environnements isolés, fiables et réversibles | Peut supprimer des fichiers ou accéder au réseau, risque maximal |

La portée des autorisations varie selon le mode d'exécution : Pi ne propose pas le mode 【Planification uniquement】 et utilise par défaut le mode 【Approbation intelligente】 lors de la création d'un Agent Pi ; DeepSeek Harness ne propose pas le mode 【Approbation intelligente】 ; 【Renforcé : Claude Agent】 propose les cinq modes complets.

Chemin de configuration : navigation à gauche 【Travail】 → menu Agent → 【Éditer】 → 【Base】 → 【Mode d'autorisation】.

{% hint style="danger" %}
Les canaux peuvent remplacer individuellement le mode d'autorisation de l'Agent. Les points d'entrée de chat externes sont plus susceptibles de recevoir des commandes inattendues ; il est généralement recommandé de choisir 【Hériter des paramètres de l'agent】 ou un mode plus strict que celui de l'Agent. N'ouvrez pas l'accès complet simplement pour éviter quelques confirmations.
{% endhint %}

### Mémoire de l'Agent

La mémoire de l'Agent est associée à l'Agent, et non à une tâche ou à un répertoire de travail spécifique. Elle convient pour stocker des préférences à long terme, des faits de projet, des décisions techniques et des expériences ; les progrès ponctuels sont enregistrés comme des journaux horodatés, consultables par les tâches ultérieures.

Indiquez directement à l'Agent dans 【Travail】 :

```
Mémorisez cette règle : tous les textes chinois publiés utilisent la ponctuation pleine chasse et évitent les titres exagérés. Appliquez-la aux prochaines tâches concernées.
```

En cas de correction, précisez que l'ancienne information est obsolète et demandez la mise à jour de la mémoire. N'enregistrez pas de mots de passe, clés API, informations d'identification sensibles ou contenus temporaires non pertinents dans la mémoire à long terme.

### Sous-agents, flux de travail et commandes en arrière-plan

Pour les tâches complexes, l'Agent peut déléguer la recherche, l'organisation et la vérification à des sous-agents, ou orchestrer plusieurs étapes via des flux de travail. Les commandes longues peuvent s'exécuter en arrière-plan sans bloquer la conversation. L'Agent peut également, après votre confirmation, créer une nouvelle session ou envoyer une tâche à une session existante ; la requête est renvoyée immédiatement, et le résultat de complétion revient ensuite à la session d'origine, en conservant la source et l'état de livraison.

Le panneau 【État】 à droite permet de consulter :

* Les tâches en cours et terminées ;
* Les sous-agents et les flux de travail ;
* Les commandes en arrière-plan et l'option d'arrêt ;
* Le succès, l'échec et le nombre d'appels d'outils ;
* L'utilisation du contexte et les artefacts déclarés.

Après activation de 【Paramètres】 → 【Notifications】 → 【Notification de fin de conversation】, lors du travail sur d'autres onglets ou fenêtres, la fin d'une réponse de l'assistant, la complétion d'une tâche de l'Agent ou l'attente d'une approbation déclenchent une notification système ; le clic sur la notification ramène à la conversation correspondante.

<figure><img src="../../../../assets/401d6b23759ab97ded47c2b5.webp" alt="Les tâches longues permettent de consulter les artefacts, les sous-tâches, les commandes en arrière-plan et l'utilisation du contexte dans le panneau 【État】."><figcaption><p>Les tâches longues permettent de consulter les artefacts, les sous-tâches, les commandes en arrière-plan et l'utilisation du contexte dans le panneau 【État】. </p></figcaption></figure>

### Cas d'usage : maintenance continue des normes de projet

L'équipe enregistre les conventions de code stables dans la mémoire de l'Agent et crée des compétences pour les étapes détaillées de revue. Pour chaque revue de nouvelle branche, une tâche est ouverte, permettant à l'Agent d'utiliser des sous-agents pour vérifier respectivement les interfaces, les migrations de données et les tests, avant que l'Agent principal ne synthétise les conclusions. Lorsque les règles changent, la mémoire est mise à jour, sans modifier l'historique de chaque tâche.

<details>

<summary>La mémoire peut-elle remplacer la base de connaissances ? </summary>

Non. La mémoire convient pour un petit nombre de faits et d'expériences stables, utilisés à travers plusieurs tâches ; la base de connaissances convient pour des documents structurés et permet de contrôler la portée de recherche de l'Agent.

</details>

<details>

<summary>La tâche semble bloquée, où regarder en premier ? </summary>

Ouvrez d'abord le panneau 【État】 à droite pour vérifier si l'Agent attend une autorisation, si une commande en arrière-plan est toujours en cours, si une sous-tâche a échoué ou si le fournisseur est en cours de nouvelle tentative. Pour des détails plus approfondis sur la requête, activez ensuite le mode développeur pour consulter la chaîne d'appels.

</details>

<details>

<summary>La tâche semble bloquée, où regarder en premier ? </summary>

Ouvrez d'abord le panneau 【État】 à droite pour vérifier si l'Agent attend une autorisation, si une commande en arrière-plan est toujours en cours, si une sous-tâche a échoué ou si le fournisseur est en cours de nouvelle tentative. Pour des détails plus approfondis sur la requête, activez ensuite le mode développeur pour consulter la chaîne d'appels.

</details>
