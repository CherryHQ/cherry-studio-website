# Zhipu GLM-4.5-Air

Pour permettre à chaque développeur et utilisateur de découvrir facilement les capacités des modèles de langage de pointe, **Zhipu met gratuitement le modèle GLM-4.5-Air à la disposition des utilisateurs de Cherry Studio**. Conçu comme un modèle de base efficace pour les applications d'agents, GLM-4.5-Air offre un excellent équilibre entre performance et coût, ce qui en fait un choix idéal pour construire des applications intelligentes.

***

**🚀 Qu'est-ce que GLM-4.5-Air ?**

GLM-4.5-Air est le dernier modèle de langage haute performance de Zhipu. Il adopte une architecture avancée **d'experts mixtes (Mixture-of-Experts, MoE)**, réduisant considérablement la consommation de ressources de calcul tout en maintenant des capacités de raisonnement exceptionnelles.

* **Nombre total de paramètres : 106 milliards**
* **Paramètres activés : 12 milliards**

Grâce à une conception optimisée, GLM-4.5-Air atteint une efficacité de déduction supérieure. Il est adapté au déploiement dans des environnements aux ressources limitées, tout en étant capable de traiter des tâches complexes.

<figure><img src="../../../../../assets/1b291d4ab67ec7340ee83f00.avif" alt=""><figcaption></figcaption></figure>

***

**📚 Processus d'entraînement unifié, fondations solides de l'intelligence**

GLM-4.5-Air partage le même processus d'entraînement que la série phare, garantissant des capacités générales robustes :

1. **Pré-entraînement à grande échelle** : Entraîné sur un corpus généraliste de **15 000 milliards de jetons**, pour construire une compréhension large des connaissances ;
2. **Optimisation de domaines spécifiques** : Entraînement renforcé sur des tâches clés telles que la génération de code, le raisonnement logique et l'interaction avec les agents ;
3. **Prise en charge des contextes longs** : Longueur de contexte étendue à **128K jetons**, permettant de traiter de longs documents, des conversations complexes ou de grands projets de code ;
4. **Renforcement par apprentissage** : Amélioration des capacités de décision du modèle en matière de planification du raisonnement et d'appel d'outils via l'apprentissage par renforcement (RL).

Ce système d'entraînement confère à GLM-4.5-Air d'excellentes capacités de généralisation et d'adaptabilité aux tâches.

<figure><img src="../../../../../assets/e01818538525bbb7871e628e.avif" alt=""><figcaption></figcaption></figure>

***

**⚙️ Capacités clés optimisées pour les agents**

GLM-4.5-Air est profondément adapté aux scénarios d'application des agents et dispose des capacités pratiques suivantes :

✅ **Prise en charge de l'appel d'outils** : Permet d'appeler des outils externes via des interfaces standardisées pour automatiser les tâches\
✅ **Navigation web et extraction d'informations** : Peut être utilisé avec des extensions de navigateur pour comprendre et interagir avec du contenu dynamique\
✅ **Assistance en génie logiciel** : Prend en charge l'analyse des exigences, la génération de code, la détection et la correction de défauts\
✅ **Prise en charge du développement front-end** : Bonne compréhension et capacité de génération pour les technologies front-end telles que HTML, CSS et JavaScript

Ce modèle peut être intégré flexiblement dans des cadres d'agents de code tels que **Claude Code, Roo Code**, ou utilisé comme moteur central pour n'importe quel Agent personnalisé.

<figure><img src="../../../../../assets/afea88a8e302808122e56c19.avif" alt=""><figcaption></figcaption></figure>

***

**💡 Mode de « réflexion » intelligent, réponse flexible à toutes les requêtes**

GLM-4.5-Air prend en charge le **mode de raisonnement hybride**. Les utilisateurs peuvent contrôler l'activation de la réflexion approfondie via le paramètre `thinking.type` :

* `enabled` : Active la réflexion, adapté aux tâches complexes nécessitant un raisonnement étape par étape ou une planification
* `disabled` : Désactive la réflexion, utilisé pour les requêtes simples ou les réponses immédiates
* La configuration par défaut est le **mode de réflexion dynamique**, où le modèle détermine automatiquement si une analyse approfondie est nécessaire

| Type de tâche | Exemples |
| ------------------ | ----------------------------------------------- |
| **Tâches simples** (réflexion recommandée : désactivée) | <p>- Interroger « l'année de fondation de Zhipu AI »<br>- Traduire « I love you » en chinois</p> |
| **Tâches intermédiaires** (réflexion recommandée : activée) | <p>- Comparer les avantages et inconvénients de l'avion et du TGV entre Pékin et Shanghai<br>- Expliquer pourquoi Jupiter a de nombreux satellites</p> |
| **Tâches complexes** (réflexion fortement recommandée : activée) | <p>- Expliquer comment les experts collaborent dans un modèle MoE<br>- Analyser s'il faut acheter un ETF basé sur les informations du marché</p> |

***

**🌟 Haute efficacité et faible coût, déploiement simplifié**

GLM-4.5-Air offre un excellent équilibre entre performance et coût, particulièrement adapté au déploiement dans des environnements de production réels :

* ⚡ **Vitesse de génération supérieure à 100 jetons/seconde**, réponse rapide, prise en charge des interactions à faible latence
* 💰 **Coût API très bas** : Entrée à seulement **0,8 CNY/million de jetons**, sortie à **2 CNY/million de jetons**
* 🖥️ Peu de paramètres activés, faible demande de puissance de calcul, facile à exécuter en local ou dans le cloud avec une forte concurrence

Une véritable expérience de service IA « haute performance, faible barrière à l'entrée ».

<figure><img src="../../../../../assets/ff57d653e87ca354c1fb0473.avif" alt=""><figcaption></figcaption></figure>

***

**🧠 Focus sur les capacités pratiques : génération de code intelligente**

GLM-4.5-Air offre des performances stables en matière de génération de code et prend en charge :

* Les principaux langages tels que **Python, JavaScript, Java**
* La génération de code **clairement structuré et hautement maintenable** à partir d'instructions en langage naturel
* La réduction des sorties stéréotypées, en se rapprochant des besoins réels des scénarios de développement

Adapté aux tâches de développement fréquentes telles que la construction de prototypes rapides, l'automatisation de l'auto-complétion et la correction de bugs.

***

Expérimentez gratuitement **GLM-4.5-Air** dès maintenant et lancez votre voyage de développement d'agents !\
Que vous souhaitiez créer un assistant automatisé, un compagnon de programmation ou explorer les applications IA de la prochaine génération, GLM-4.5-Air sera votre moteur IA efficace et fiable.

📘 Connectez-vous immédiatement et libérez votre créativité !

***

### Obtenir de l'aide et soumettre des retours

Si vous avez des questions, des bugs ou des suggestions d'amélioration de fonctionnalités lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../../question-contact/suggestions.md).
