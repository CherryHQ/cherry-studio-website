# Guide d'intégration de la plateforme ModelScope (ModelScope)


{% hint style="warning" %}
Ce document a été traducido del chino por IA y aún no ha sido revisado.
{% endhint %}



## Qu'est-ce que ModelScope ?
> ModelScope est une nouvelle génération de plateforme partagée de modèles en tant que service (MaaS) open source, dédiée à fournir aux développeurs IA une solution de services de modèles **flexible, facile à utiliser et à faible coût**, rendant l'application des modèles plus simple !
>
> Grâce à la **capacité de service d'inférence par API**, la plateforme standardise les modèles open source en interfaces API pouvant être appelées, permettant aux développeurs d'intégrer légèrement et rapidement les capacités des modèles dans diverses applications IA, prenant en charge des scénarios innovants comme l'appel d'outils et le prototypage.

### Principaux avantages
- ✅ **Quota gratuit** : Offre **2000 appels API gratuits par jour** ([règles de facturation](#règles-de-facturation-et-de-quotas))
- ✅ **Bibliothèque de modèles riche** : Couvre plus de 1000 modèles open source dans les domaines NLP, CV, audio, multimodal, etc.
- ✅ **Prêt à l'emploi** : Aucun déploiement requis, appel rapide via API RESTful   

---

## Processus d'intégration avec Cherry Studio
### Étape 1 : Obtenir un jeton API ModelScope
1. **Connexion à la plateforme**
   - Visitez le [site officiel de ModelScope](https://modelscope.cn) → Cliquez sur **Connexion** en haut à droite → Choisissez le mode d'authentification
   ![Interface de connexion](../../../../assets/81ab1f79d9eb105d47adeb7c.webp)
2. **Création d'un jeton d'accès**
   - Accédez à **[Paramètres du compte → Jetons d'accès](https://modelscope.cn/my/myaccesstoken)**
   - Cliquez sur **`Créer un jeton`** → Remplissez la description → **Copiez le jeton généré** (*exemple ci-dessous*)
   ![Exemple de création de jeton](../../../../assets/183749676e4437e61ed9168f.webp)
   > 🔑 **Important** : La divulgation du jeton compromettra la sécurité de votre compte !

### Étape 2 : Configuration de Cherry Studio
- Ouvrez **Cherry Studio** → **Paramètres → Services de modèles → ModelScope**
- Collez le jeton copié dans le champ `Clé API`
  ![Interface de configuration](../../../../assets/6c187aa7fa2ce14286cce6e6.webp)
- Cliquez sur **`Enregistrer`** pour terminer l'autorisation

### Étape 3 : Appel de l'API de modèle
1. **Rechercher les modèles compatibles API**
   - Visitez la [bibliothèque de modèles ModelScope](https://modelscope.cn/models)
   - Critères de filtrage : **Cochez `API-Inference`** (ou repérez l'icône `API` sur la carte du modèle)
   ![Filtrage des modèles API](../../../../assets/e74196f9b0677f509232b2a7.webp)
   > La couverture des modèles API-Inference est principalement déterminée par leur popularité dans la communauté (basée sur les likes, téléchargements, etc.). La liste des modèles pris en charge évolue donc avec les nouvelles versions des modèles open source.
2. **Obtenir l'ID du modèle**
   - Allez sur la page de détails du modèle cible → Copiez **Model ID** (format : `damo/nlp_structbert_sentiment-classification_chinese-base`)
   ![Copie du Model ID](../../../../assets/b280b347b848c9336100c083.webp)
3. **Saisie dans Cherry Studio**
   - Entrez l'ID dans le champ `ID du modèle` de la page de configuration → Sélectionnez le type de tâche → Finalisez la configuration
   ![Saisie de l'ID de modèle](../../../../assets/a5685729023ae084554989bd.webp)

---

## Règles de facturation et de quotas
### Informations importantes
-  **Quota gratuit** : Chaque utilisateur bénéficie de **2000 appels API par jour** (*selon les dernières règles du site officiel*)
- 🔁 **Réinitialisation du quota** : Réinitialisation automatique quotidienne à 00:00 UTC+8, **pas de report ou d'accumulation inter-jours**
- 💡 **Dépassement de quota** :
  - Lorsque la limite quotidienne est atteinte, l'API renvoie une `erreur 429`
  - Solutions : Basculer vers un compte secondaire / Utiliser une autre plateforme / Optimiser la fréquence d'appel

### Vérifier le quota restant
- Connectez-vous à ModelScope → Cliquez sur **`Nom d'utilisateur`** en haut à droite → **`Statut d'utilisation de l'API`**
  ![Emplacement de vérification du quota](../../../../assets/cf9952cb6a67762a088ade28.webp)

> ️ Remarque : L'API d'inférence offre 2000 appels gratuits par jour. Pour des besoins supérieurs, envisagez d'utiliser des services cloud comme Alibaba Cloud Bailian.