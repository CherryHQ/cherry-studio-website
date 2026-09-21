# DeepSeek V3.2

Les utilisateurs de Cherry Studio peuvent désormais expérimenter gratuitement **DeepSeek V3.2** via le service intégré **CherryIN** — le modèle MoE à attention sparse de pointe publié par DeepSeek le 1er décembre 2025, qui intègre pour la première fois le « raisonnement » nativement dans l'appel d'outils, une option idéale pour les agents avancés et les scénarios à long contexte.

***

## Qu'est-ce que DeepSeek V3.2 ?

DeepSeek V3.2 est une itération basée sur V3.2-Exp, adoptant une architecture Mixture-of-Experts (MoE) et introduisant le mécanisme d'attention sparse **DeepSeek Sparse Attention (DSA)**. Il réduit significativement les coûts d'inférence sur les longs contextes tout en maintenant une échelle massive de paramètres totaux.

- Architecture : MoE + DeepSeek Sparse Attention (DSA) + Multi-Head Latent Attention (MLA)
- Paramètres totaux : 685B
- Paramètres activés par token : environ 37B
- Nombre d'experts : 256 experts par couche
- Licence open source : MIT
- Date de publication : 1er décembre 2025 (V3.2-Exp publié le 29 septembre 2025)

V3.2 est accompagné de la version **DeepSeek-V3.2-Speciale** destinée à l'API, qui atteint un niveau de performance équivalent à une médaille d'or aux compétitions IMO, CMO, ICPC World Finals et IOI 2025 sur les tâches de raisonnement complexe.

<figure><img src="../../../../../assets/8ed4c04255cbd56ac0625741.webp" alt=""><figcaption></figcaption></figure>

***

## Un processus de formation et d'alignement solide et continu

DeepSeek V3.2 reprend le pipeline de formation éprouvé de la série V3, avec des extensions clés pour les scénarios d'agents :

1. **Pré-entraînement à grande échelle** : Formation de base sur un corpus multilingue massif et de haute qualité, couvrant le code, les mathématiques et les connaissances scientifiques.
2. **Introduction de l'attention sparse** : Entraînement du modèle principal et de l'indexeur lightning sur des séquences de 128K, où chaque token de requête sélectionne 2048 tokens clé-valeur pour l'attention.
3. **Synthèse de données d'agent à grande échelle** : Nouvelle méthode de synthèse de données d'entraînement pour agents, couvrant plus de 1 800 environnements et plus de 85 000 instructions complexes.
4. **Fusion du raisonnement et de l'appel d'outils** : V3.2 est le premier modèle DeepSeek à intégrer nativement le « raisonnement » dans l'appel d'outils, permettant d'utiliser les outils aussi bien en « mode raisonnement » qu'en « mode non raisonnement ».

<figure><img src="../../../../../assets/58623875cc487b3cbbd60955.jpeg" alt=""><figcaption></figcaption></figure>

***

## Capacités de pointe

DeepSeek V3.2 met en avant des capacités globales « au niveau de GPT-5 », avec des renforcements majeurs en matière d'agents et de raisonnement complexe :

- ✅ **Raisonnement natif + appel d'outils** : Premier modèle DeepSeek à intégrer le raisonnement dans l'utilisation d'outils
- ✅ **Capacité de raisonnement de premier ordre** : V3.2-Speciale atteint un niveau de médaille d'or aux IMO / CMO / ICPC World Finals / IOI 2025
- ✅ **Code et tâches de développement** : Hérite des fortes capacités de code de la série V3
- ✅ **Stabilité du long contexte** : Capacité d'analyse de documents longs et de bases de code grâce au DSA
- ✅ **Appel d'outils structuré** : Idéal pour construire des agents de planification et d'exécution multi-étapes

<figure><img src="../../../../../assets/b271db8ec88f1910b620786b.webp" alt=""><figcaption></figcaption></figure>

***

## DeepSeek Sparse Attention : plus long, plus économe

Le DSA est l'amélioration technologique centrale de V3.2, réalisée via **indexeur lightning + sélection fine de tokens** :

- Première implémentation d'une attention sparse fine sur un grand modèle
- Réduction de la complexité de l'attention centrale par rapport à O(L²)
- Accélération significative de l'entraînement et de l'inférence sur les longs contextes, tout en maintenant une qualité de sortie quasi identique à l'attention dense

| Scénario | Usage recommandé | Exemple |
| --- | --- | --- |
| Conversations courtes / Q&R simples | Appel direct | Q&R quotidien, résumés |
| Tâches de complexité moyenne | Activation de l'appel d'outils | Analyse de données, refactoring de code |
| Tâches d'agent complexes | Raisonnement + appel d'outils | Planification multi-étapes, analyse de base de code, revue de documents longs |

***

## Ouvert, accessible et favorable à l'écosystème

- ⚡ Accélération de l'inférence sur les longs contextes grâce au DSA
- 💰 **Utilisation gratuite** via CherryIN dans Cherry Studio
- 🖥️ Poids open source, licence MIT, support dès le premier jour par les principaux frameworks d'inférence comme vLLM et SGLang

<figure><img src="../../../../../assets/b35d1fa4d3aa4dceba690581.webp" alt=""><figcaption></figcaption></figure>

***

## Focus sur les capacités pratiques : code et agents

DeepSeek V3.2 excelle particulièrement dans les flux de travail de développement réels :

- Génération et refactoring de code multilingue
- Compréhension du contexte au niveau du dépôt de code et génération de correctifs
- Chaîne d'outils pour agents : appels stables d'outils externes, recherche, exécution de code
- Mathématiques et raisonnement complexe : support de problèmes de niveau compétition

***

## Comment l'utiliser dans Cherry Studio ?

1. Ouvrez Cherry Studio et accédez à **Paramètres → Services de modèles**.
2. Trouvez le fournisseur **CherryIN** et activez-le.
3. Sélectionnez **DeepSeek V3.2** dans la liste des modèles.
4. Retournez à l'interface de chat et basculez sur **DeepSeek V3.2** dans le sélecteur de modèle en haut pour commencer la conversation.

> 💡 Astuce : Le quota de modèles gratuits fourni par CherryIN est pris en charge par Cherry Studio officiel, idéal pour l'expérience quotidienne et les évaluations ; pour les environnements de production, il est recommandé de combiner avec l'API officielle de DeepSeek.

***

📘 **Expérimentez DeepSeek V3.2 dès maintenant et lancez-vous dans le raisonnement de pointe et les agents !**

***

### Obtenir de l'aide et soumettre des retours

Si vous avez des questions, des bugs ou des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../../question-contact/suggestions.md).
