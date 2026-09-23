---
icon: shield-check
---

# Données, confidentialité et autorisations

Les conversations et la configuration sont stockées sur l'appareil actuel. Les modèles cloud et les outils connectés reçoivent toujours les informations nécessaires à vos demandes.

## Où vont les données ?

| Caractéristique | Données impliquées |
| --- | --- |
| Discussion dans le cloud/génération d'images | Le fournisseur sélectionné reçoit des messages, les messages précédents inclus dans la requête, des images, le contenu du document analysé ou des invites de dessin. |
| Recherche/lecture de pages | Le service sélectionné reçoit des mots-clés ou des URL ; le matériel retourné participe aux réponses modèles |
| Plugins/outils personnalisés | Les services connectés traitent les demandes autorisées ; le contenu récupéré peut être fourni au modèle |
| Calendrier, rappels, emplacement | Les informations sur l'appareil autorisé sont lues ou modifiées ; des résultats pertinents peuvent participer aux réponses |
| Importation de bureau | Adresses des fournisseurs sélectionnés, clés et transfert de configuration du modèle pris en charge sur le réseau local |

La conservation dépend de la politique et des paramètres de compte de chaque service. Le stockage local ne rend pas une conversation cloud entièrement hors ligne.

## Rapports d'utilisation et d'erreurs anonymes

La première utilisation ou une mise à jour de la politique de confidentialité vous demande d'**accepter et de continuer** ou de **refuser** après avoir expliqué l'utilisation des données anonymes. Modifiez votre choix plus tard dans **Paramètres → Confidentialité**.

* **Partagez des données d'utilisation anonymes :** inclut l'identité de l'installation, les versions de l'application/du système, les modèles utilisés et les quantités de jetons ; pas le texte de la conversation, les fichiers ou les clés API.
* **Envoyer des rapports d'erreurs anonymes :** permet d'enquêter sur les plantages et les échecs, avec un paramètre distinct.

La désactivation des rapports d'utilisation ne bloque pas les messages que vous envoyez aux fournisseurs de modèles et ne révoque pas l'accès au plugin. Gérez ces connexions séparément.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/privacy-settings.webp"><img src="../../../assets/mobile/en/privacy-settings.webp" alt="Les rapports d'erreurs anonymes et les données d'utilisation sont des options indépendantes"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Les rapports d'erreurs anonymes et les données d'utilisation sont des options indépendantes</p></figcaption></figure>
</div>

## Clés et autorisation du plugin

Les clés API accordent l’accès au service de modèle. Tenez-les à l’écart des instructions des agents, des captures d’écran publiques et des rapports de problèmes. Si elle est exposée, révoquez la clé auprès du fournisseur et remplacez-la dans l'application.

Les informations d'identification du plug-in intégrées utilisent le stockage sécurisé de l'appareil et ne sont pas transférées par importation de bureau. Les en-têtes d'authentification statiques pour les serveurs MCP personnalisés sont stockés localement avec la configuration du serveur et nécessitent également une manipulation minutieuse.

## Gérer les autorisations système

Ouvrez **Paramètres → Autorisations système**. L'approbation de l'outil et l'autorisation du système d'exploitation peuvent apparaître séparément et les deux peuvent être requises.

| Symptôme | Que vérifier |
| --- | --- |
| Seules quelques photos sont visibles | L'accès aux photos sélectionnées peut être activé ; ajuster la sélection/l'autorisation du système |
| Aucune invite après avoir refusé l'accès | Modifier les autorisations Cherry Studio dans les paramètres système |
| La lecture du calendrier fonctionne, mais pas sa modification | Vérifiez séparément les autorisations de lecture et d’écriture |
| Pas de dossier de santé | Confirmer que les enregistrements existent et que le type de données est autorisé |
| Le couplage fonctionne mais la configuration ne peut pas se charger | Vérifiez l'accès au réseau local et [importation de bureau](desktop-sync.md) |

Les commutateurs de capacité de l'agent contrôlent si cet agent peut utiliser les outils intégrés associés ; les autorisations système contrôlent l’accès de l’application aux données de l’appareil. Gérez séparément les plugins et les outils MCP personnalisés. La désactivation de la capacité d'un agent ne révoque pas l'autorisation du système ; utilisez les paramètres système pour révoquer l’accès. L'approbation automatique des outils ne contourne pas les autorisations du système. Android ne propose actuellement pas les outils de rappel et de dossier de santé iOS.

## Avant de changer d'appareil ou de supprimer des données d'application

Le couplage d'appareils n'est pas une sauvegarde complète ou une synchronisation automatique du chat. Il importe principalement la configuration et les modèles du fournisseur, pas l'historique des conversations.

[Exportez les messages et fichiers importants](sharing-and-export.md) avant de désinstaller, d'effacer les données de l'application ou de changer d'appareil. Enregistrez-les en dehors de Cherry Studio ou sur un autre appareil et confirmez leur ouverture. Une copie uniquement dans la bibliothèque de fichiers de l'application peut être supprimée avec les données de l'application. Les images HTML et Markdown préservent le travail mais ne constituent pas des sauvegardes restaurables de tous les paramètres de l'application.

## La suppression de l’historique annule-t-elle les actions ?

Non. La suppression ou la réponse à nouveau n’annule pas les modifications du calendrier, les documents externes modifiés ou les messages envoyés, et ne rembourse pas les coûts du modèle. Inspectez le résultat réel dans le service concerné si une annulation est nécessaire.

## Que doit contenir un rapport de bug ?

Indiquez les versions de l’application, de l’appareil et du système, les étapes, le résultat attendu, le résultat obtenu et le texte de l’erreur. Masquez les clés réelles, les URL contenant des identifiants, les conversations privées et le contenu des fichiers avant de publier des captures d’écran ou des détails.
