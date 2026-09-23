---
icon: plug
---

# Plugins et outils externes

Les plugins permettent à un agent d'accéder à d'autres services dans le cadre de votre autorisation, tels que la lecture de documents Feishu, l'organisation de pages Notion ou la recherche d'itinéraires avec Amap.

Le modèle comprend votre demande et le plugin accède au service correspondant. Sélectionnez d’abord un modèle de texte prenant en charge les appels d’outils.

## Connectez-vous et utilisez un plugin

1. Ouvrez **Greffons** dans la barre latérale et sélectionnez un service.
2. Lisez ses capacités, exemples et autorisations, puis appuyez sur **Connecter**.
3. Complétez l'autorisation du compte ou entrez la clé de service requise.
4. Revenez à Cherry Studio et confirmez le compte/espace de travail si demandé, jusqu'à ce qu'il affiche **Connecté**.
5. Faites une demande spécifique dans le chat. Utilisez éventuellement **＋ → Greffons** pour insérer le plugin cible, puis ajoutez votre question.

Par exemple : « Utilisez Feishu pour résumer trois conclusions de ce document : [lien] ». Le nom inséré apparaît dans la zone de saisie et dans le message envoyé.

Les plugins connectés sont utilisables par les différents agents sans nouvelle autorisation. Choisir un plugin dans la zone de saisie indique le service à utiliser pour cette demande. L’option **＋ → Greffons** dans la zone de saisie du chat est masquée lorsqu’aucun plugin utilisable n’est connecté.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/plugins.webp"><img src="../../../assets/mobile/en/plugins.webp" alt="Choisissez un service dans la liste des plugins"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Choisissez un service dans la liste des plugins</p></figcaption></figure>
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/plugin-feishu.webp"><img src="../../../assets/mobile/en/plugin-feishu.webp" alt="Lisez les fonctionnalités, les exemples et les détails d'autorisation avant de vous connecter"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Lisez les fonctionnalités, les exemples et les détails d'autorisation avant de vous connecter</p></figcaption></figure>
</div>

## Connexions communes

| Plugin | Utile pour | Notes de connexion |
| --- | --- | --- |
| Feishu | Documents, tables de base, tâches, calendriers | Configurez une application Feishu et autorisez votre compte ; l’approbation de l’organisation peut être requise. Cette connexion prend actuellement en charge les comptes Feishu, et non les comptes internationaux Lark. |
| Notion | Rechercher/lire/modifier des pages et des enregistrements de base de données | Autoriser un espace de travail et confirmer le compte ; les autorisations de l'espace de travail s'appliquent toujours |
| GitHub | Lire les référentiels/discussions et gérer les problèmes/demandes d'extraction | Utilisez l'autorisation de l'application ou un jeton d'accès personnel ; l'accès à l'organisation peut nécessiter une approbation |
| Amap | Lieux, services à proximité, météo, itinéraires | Utilisez un **Clé du service Web** de la plateforme Amap ; les requêtes d'itinéraire ne lisent pas automatiquement l'emplacement de l'appareil |
| DingTalk | Documents, calendrier, tâches, autres opérations de bureau | Autoriser un compte et une organisation ; certaines actions nécessitent une autorisation supplémentaire |
| WeCom | Documents autorisés, feuilles de calcul, calendriers, autres données de bureau | Collez le lien d'autorisation généré dans l'assistant de transfert de fichiers de WeCom et ouvrez-le ici, puis revenez à Cherry Studio. |

Une fonctionnalité répertoriée ne constitue pas une promesse d’accès au compte. Les forfaits, les paramètres de l'organisation, les autorisations de ressources et les quotas déterminent ce que votre compte peut utiliser.

### Préparation du Feishu

L'« application » dans ce flux est une configuration d'autorisation Feishu, et non une autre application téléphonique à installer. Suivez le lien **Configurer l'application** ou le guide de configuration de la page de connexion. Si vous utilisez une application existante, entrez son App ID et App Secret, activez les autorisations nécessaires pour les documents/tâches/calendrier, puis autorisez votre compte personnel.

La connexion peut rester utilisable même si seule une partie des autorisations a été accordée. Pour ajouter des fonctionnalités, activez les autorisations correspondantes dans l’application Feishu, obtenez l’approbation de l’organisation si nécessaire et actualisez l’autorisation de votre compte. Une simple reconnexion ne donne pas les autorisations manquantes.

### Homologation supplémentaire DingTalk

Complétez l'autorisation d'action demandée dans DingTalk, puis revenez et **demandez à nouveau l'opération**. L'autorisation ne rejoue pas automatiquement l'action ayant échoué.

### Lien WeCom expiré

Les liens durent cinq minutes. Générez un nouveau lien et ouvrez-le dans WeCom, plutôt que uniquement dans un navigateur ordinaire.

## Que puis-je faire après la connexion ?

Commencez par une lecture. Remplacez le texte entre crochets par vos liens, noms ou dates, puis vérifiez les sources et la couverture du résultat.

| Plugin | Demande adaptable | Que vérifier |
| --- | --- | --- |
| Feishu | "Lisez ce document : [lien]. Répertoriez les conclusions, les tâches, les propriétaires et les délais. Marquez les informations manquantes comme non confirmées ; ne créez pas encore de tâches. " | Si les propriétaires et les dates sont explicites ; la création de tâches est une prochaine étape distincte |
| Notion | "Lisez cette page : [lien]. Résumez les progrès récents du projet et conservez les liens sources. " | Accès à l'espace de travail et si le contenu de la page pertinent a été entièrement lu |
| GitHub | "Lisez les discussions sur les problèmes de la semaine dernière dans [URL du référentiel], regroupez-les par sujet et incluez des liens." | Visibilité du référentiel, plage de dates et confirmation des conclusions des discussions |
| Amap | "Comparez les transports publics de [ville et point de départ] à [destination], y compris la marche, les transferts et la durée estimée." | Ville et adresse pour les noms de lieux en double ; les estimations ne sont pas des heures de départ en direct |
| DingTalk | "Lisez ce document : [lien] et résumez les éléments sur [sujet]. Ne le modifiez pas." | Accès à l'organisation et aux documents, ainsi que toute autre autorisation dans DingTalk |
| WeCom | "Lisez ce document : [lien]. Résumez trois conclusions clés avec les sources, sans édition. " | L'accès au compte autorisé et les outils réellement disponibles sur la connexion |

### Transformez les notes du document en tâches enregistrées

Par exemple, utilisez deux requêtes avec Feishu :

1. "Lisez ces notes de réunion : [lien]. Répertoriez les tâches proposées, les propriétaires et les délais, mais ne les créez pas. "
2. Après vérification : "Créez uniquement les éléments 1 et 2 en tant que tâches Feishu avec les propriétaires et les dates que nous avons confirmés. Renvoyez les résultats et les liens."

La lecture de documents, la recherche de personnes et la création de tâches doivent toutes être disponibles en cas de besoin. Résolvez d’abord les noms en double et les dates peu claires. Un tableau des tâches dans le chat ne constitue pas une preuve que les tâches ont été enregistrées. L'affectation et les invitations peuvent également informer d'autres personnes.

### Lire et mettre à jour des tables de base ou des bases de données

Fournissez le lien et la vue de la table, puis indiquez le filtre : "Lecture uniquement des enregistrements avec le statut En cours dans cette vue. Répertoriez les noms et les délais sans apporter de modifications. " Un projet peut avoir plusieurs tables ou vues portant des noms similaires.

Avant de modifier, identifiez l’enregistrement et le champ exacts. Demandez à l'agent d'indiquer la couverture lorsque les résultats ont une pagination ou des limites ; une requête ne correspond pas nécessairement à la totalité de la base de données. La connexion Notion actuelle ne permet pas la gestion des pièces jointes ni l'accès aux agents Notion.

### Les outils peuvent-ils fonctionner ensemble ?

Les outils connectés disponibles peuvent coopérer dans une seule tâche, par exemple lire un document et [enregistrer un fichier de liste de contrôle](file-generation.md). Lors de la copie de matériel entre services, spécifiez la destination et le contenu exact, puis vérifiez chaque résultat. Le succès d’une étape n’est pas automatiquement annulé si une autre échoue.

Pour l'approbation, les vérifications des résultats et la gestion des échecs, voir [Laisser l'IA utiliser les outils](using-tools.md).

## J'ai fermé l'autorisation, mais elle n'est pas connectée

La fermeture d'un navigateur n'annule pas l'autorisation et ne prouve pas que la connexion a réussi. Revenez à la page de connexion, utilisez **Ouvrir la page d'autorisation** ou **Vérifiez à nouveau** si nécessaire et terminez la confirmation du compte.

Redémarrez les demandes expirées ou refusées. Pour changer de compte, suivez les instructions pour déconnecter d'abord le compte existant.

## Déconnecter et révoquer

Utilisez la gestion des connexions ou le menu détail pour **Déconnecter**. Cela supprime l'accès local.

Si la révocation à distance n'est pas confirmée, utilisez **Gérer l'autorisation** sur le site Web du fournisseur. La suppression locale et la révocation du côté du fournisseur ne se terminent pas toujours ensemble.

Les informations d'identification du plug-in restent sur cet appareil et ne sont pas transférées par l'importation de la configuration du bureau ; un autre téléphone a besoin d'une connexion séparée. Le contenu récupéré peut être utilisé par le modèle. Voir [données et confidentialité](data-privacy.md).

## Ajouter un service MCP personnalisé

**MCP** connecte un agent à des services d'outils supplémentaires. Utilisez-le lorsque vous disposez déjà d’une adresse de serveur d’outils distant ; les plugins intégrés sont plus simples lorsqu'ils répondent à vos besoins.

1. Ouvrez **Paramètres → MCP → Ajouter un serveur**.
2. Saisissez l'adresse du serveur fournie, de préférence `https://`.
3. Si une authentification est requise, remplissez les **En-têtes** avec une entrée `Name=Value` par ligne, telle que `Authorization=Bearer your-token`, en suivant les instructions du service.
4. Enregistrez, attendez la connexion et inspectez la liste **Outils**. Désactivez les outils indésirables.
5. Activez le serveur correspondant dans l'éditeur de l'agent cible, puis envoyez une nouvelle requête. Si l'agent est nouveau, enregistrez-le d'abord et rouvrez son éditeur pour configurer les outils.

Le serveur doit être connecté et activé, l'outil activé globalement et le serveur correspondant activé pour l'agent. L’approbation automatique ne contourne aucune de ces exigences.

Ce champ accepte les adresses distantes, pas les commandes de démarrage du bureau telles que `npx` ou `uvx`. iOS peut bloquer le `http://` simple ; préférez l’adresse sécurisée du service.

## Un plugin connecté ne peut toujours pas faire la tâche

Vérifiez l’état de la connexion et la prise en charge des appels d’outils de modèle. Fournissez le lien/nom/plage de dates cible. Les erreurs d'autorisation doivent être réparées au niveau du service, et non modifiées dans les instructions de l'agent.

Pour les écritures, demandez-lui d'abord de lire et de lister les modifications proposées. Le fait que l'exécution demande une confirmation dépend de [l'approbation de l'outil](agents-and-tools.md).
