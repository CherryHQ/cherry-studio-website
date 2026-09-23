# CherryAI (gratuit)

**CherryAI** est le service de modèle gratuit intégré à Cherry Studio. Il ne nécessite ni inscription auprès d'un service tiers ni clé API et permet de tester la conversation et les tâches textuelles de base.

### Où l'utiliser

Ouvrez `Paramètres → Services de modèles`, puis sélectionnez **CherryAI** dans la liste intégrée. Le service est préconfiguré dans l'application et ne nécessite généralement aucun réglage supplémentaire.

### Modèle actuellement disponible

Selon la configuration actuelle du serveur CherryAI, seul **Qwen3-8B** est proposé.

{% hint style="warning" %}
La disponibilité du modèle, le quota gratuit et les limites de débit peuvent évoluer avec la configuration du serveur. Référez-vous au modèle réellement affiché et utilisable dans Cherry Studio. Cette page ne constitue pas une garantie de disponibilité à long terme.
{% endhint %}

Pour utiliser d'autres modèles ou bénéficier d'un service plus stable, choisissez [CherryIN](../cherryin-1.md) ou un autre [fournisseur](../README.md).

## Qwen3-8B

**La plateforme de services MaaS réputée « SiliconFlow » offre gratuitement l'accès au modèle Qwen3-8B**. Membre haut de gamme de la série Qwen3 de Tongyi Qianwen, Qwen3-8B combine une taille compacte à des capacités puissantes, ce qui en fait un choix idéal pour les applications intelligentes et le développement efficace.

***

**🚀 Qu'est-ce que Qwen3-8B ?**

Qwen3-8B est un **modèle dense de 8 milliards de paramètres** de la troisième génération de la série de grands modèles Tongyi Qianwen, publié par Alibaba en avril 2025. Il est distribué sous la **licence open source Apache 2.0**, permettant son utilisation libre dans des contextes commerciaux et de recherche.

* **Nombre total de paramètres : 8 milliards**
* **Type d'architecture : Dense (structure purement dense)**
* **Longueur de contexte : 128K tokens**
* **Prise en charge multilingue : couvre 119 langues et dialectes**

Malgré sa taille réduite, Qwen3-8B offre des performances stables en matière de raisonnement, de code, de mathématiques et de capacités Agent. Il rivalise avec les modèles plus volumineux de la génération précédente et démontre une grande utilité pratique dans les applications réelles.

<figure><img src="../../../../../assets/618d119a9dbc9045fe192b52.webp" alt=""><figcaption></figcaption></figure>

***

**📚 Une base d'entraînement solide, une grande intelligence dans un petit modèle**

Qwen3-8B a été pré-entraîné sur **environ 36 billions de tokens de données multilingues de haute qualité**, incluant du texte web, des documents techniques, des bases de code et des données synthétiques de domaines spécialisés, offrant ainsi une large couverture des connaissances.

La phase d'entraînement ultérieur a introduit un **processus de renforcement en quatre étapes**, optimisant spécifiquement les capacités suivantes :

✅ Compréhension et génération du langage naturel\
✅ Raisonnement mathématique et analyse logique\
✅ Traduction et expression multilingues\
✅ Appel d'outils et planification de tâches

Grâce à l'amélioration globale du système d'entraînement, **les performances réelles de Qwen3-8B approchent, voire dépassent, celles de Qwen2.5-14B**, réalisant une transition significative en termes d'efficacité des paramètres.\\

<figure><img src="../../../../../assets/aa1fd23eb171a4a3e65366a2.webp" alt=""><figcaption></figcaption></figure>

***

**💡 Mode de raisonnement hybride : réflexion ou réponse rapide ?**

Qwen3-8B permet de basculer librement entre le **« mode réflexion » et le « mode non réflexion »**, offrant aux utilisateurs la possibilité de choisir la méthode de réponse selon la complexité de la tâche.

Contrôle du mode via les méthodes suivantes :

* **Paramètres API** : `enable_thinking=True/False`
* **Instructions de prompt** : Ajoutez `/think` ou `/no_think` à l'entrée

| Mode | Cas d'usage | Exemples |
| --------- | -------------- | ----------------------------- |
| **Mode réflexion** | Raisonnement complexe, problèmes de mathématiques, tâches de planification | <p>- Résolution de problèmes géométriques<br>- Élaboration d'une architecture de projet complète</p> |
| **Mode non réflexion** | Questions-réponses rapides, traduction, résumés | <p>- Consultation de la météo<br>- Traduction chinois-anglais</p> |

Cette conception permet aux utilisateurs de **trouver un équilibre libre entre la vitesse de réponse et la profondeur du raisonnement**, améliorant ainsi l'expérience d'utilisation.

***

**⚙️ Prise en charge native des capacités Agent, pour des applications intelligentes**

Qwen3-8B possède d'excellentes **capacités Agent**, facilitant son intégration dans divers systèmes d'automatisation :

🔹 **Appel de fonctions (Function Calling)** : Prend en charge les appels d'outils structurés\
🔹 **Compatibilité du protocole MCP** : Prise en charge native du protocole de contexte de modèle pour faciliter l'extension des capacités externes\
🔹 **Collaboration multi-outils** : Peut se connecter à des plugins de recherche, de calculatrice, d'exécution de code, etc.

Il est recommandé de l'utiliser en combinaison avec le **framework Qwen-Agent** pour construire rapidement des assistants intelligents dotés de capacités de mémoire, de planification et d'exécution.

***

**🌐 Prise en charge linguistique étendue, pour des applications mondiales**

Qwen3-8B prend en charge **119 langues et dialectes**, y compris le chinois, l'anglais, l'arabe, l'espagnol, le japonais, le coréen et l'indonésien. Il convient au développement de produits internationalisés, au service client translinguistique et à la génération de contenu multilingue.

Il excelle particulièrement dans la compréhension du chinois, prenant en charge les expressions en chinois simplifié, traditionnel et cantonais, ce qui le rend adapté aux marchés de Hong Kong, de Macao, de Taïwan et aux communautés chinoises à l'étranger.

***

**🧠 Capacités pratiques solides, couverture large des scénarios**

Qwen3-8B offre d'excellentes performances dans plusieurs scénarios d'application fréquents :

✅ **Génération de code** : Prend en charge les langages courants tels que Python, JavaScript et Java, capable de générer du code exécutable selon les besoins\
✅ **Raisonnement mathématique** : Performances stables sur des benchmarks comme GSM8K, adapté aux applications éducatives\
✅ **Création de contenu** : Rédaction d'e-mails, de rapports et de textes, avec une structure claire et un langage naturel\
✅ **Assistant intelligent** : Permet de construire des assistants IA légers pour la question-réponse sur des bases de connaissances personnelles, la gestion d'agenda et l'extraction d'informations

***

Expérimentez gratuitement Qwen3-8B dès maintenant via **SiliconFlow** et lancez votre voyage dans les applications IA légères !\\

📘 Utilisez-le immédiatement, l'IA à portée de main !

***

### Obtenir de l'aide et envoyer un retour

Pour toute question, tout bug ou toute suggestion d'amélioration, utilisez les canaux officiels indiqués dans [Retours et suggestions](../../../question-contact/suggestions.md).
