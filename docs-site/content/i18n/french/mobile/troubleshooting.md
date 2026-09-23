---
icon: circle-help
---

# Dépannage

Pour les problèmes de connexion, commencez par un court message sans pièces jointes pour en affiner la cause.

## Pourquoi ne puis-je pas discuter immédiatement après l'installation ?

Configurez une clé API, ajoutez un modèle, activez son fournisseur et choisissez-le pour votre agent. Vous pouvez [importer la configuration du bureau](desktop-sync.md) ou suivre le [démarrage rapide](quick-start.md).

L'abonnement au chat grand public d'une plateforme peut ne pas inclure de crédits API pour d'autres applications ; vérifiez auprès de la plateforme.

## Mon fournisseur existe, mais le sélecteur de modèle est vide

Vérifiez que le fournisseur et le modèle sont activés, ainsi que le type de modèle et les filtres. Les modèles d’embeddings (vectorisation) et de reranking (reclassement par pertinence) ne sont pas des modèles de conversation ordinaires. Les sélecteurs de texte et d’image peuvent proposer des modèles différents. Revenez à Tous et attendez la fin du premier téléchargement des informations sur les modèles.

Si aucun modèle n'est ajouté, [synchronisez ou ajoutez manuellement](model-management.md).

## Les mises à jour du modèle remplaceront-elles les clés ou les paramètres personnalisés ?

Les mises à jour des informations sur les modèles ne modifient pas les adresses ou les clés des fournisseurs, ni les valeurs que vous avez personnalisées et enregistrées pour vos modèles. Les champs qui suivent les valeurs par défaut peuvent hériter de nouvelles informations.

**La synchronisation du fournisseur de bureau remplace les adresses et les clés du fournisseur sélectionné.** Voir [Mises à jour du modèle](model-updates.md) et [Importation du bureau](desktop-sync.md).

## La synchronisation échoue, mais le chat fonctionne

La liste de modèles API est distincte du chat, et une plateforme peut prendre en charge uniquement ce dernier. Ajoutez manuellement son ID de modèle exact et vérifiez la connexion. L’échec de la découverte n’efface pas les modèles existants.

Non retourné ne signifie pas nécessairement interrompu ; voir [synchronisation du modèle](model-updates.md).

## Que signifient les erreurs de connexion ?

| Erreur | Vérifiez d'abord |
| --- | --- |
| 401 / Non autorisé | Clé complète, valide, enregistrée, activée |
| 403 / Interdit | Accès au compte, à la région, au modèle ou à l'organisation |
| 404 / Non trouvé | Adresse de base, API, ID de modèle exact, chemins de requête dupliqués |
| 429 / Trop de demandes | Limites de taux et crédits ; attendre plutôt que d'envoyer à plusieurs reprises |
| Panne de réseau / Timeout | Accessibilité du fournisseur, proxy et état du service |
| Contexte/demande trop volumineux | Réduisez les pièces jointes/l'historique ou choisissez un modèle approprié ; augmenter les limites configurées à lui seul n'aide pas |

Les fournisseurs peuvent utiliser différents codes. Lisez les détails de l'erreur et les instructions de la plate-forme. Voir [Configuration du fournisseur](providers-and-models.md).

## Pourquoi un paramètre modifié n’a-t-il pas pris effet ?

* Les adresses/clés de fournisseur et la création/modification de modèles nécessitent l’action Enregistrer/Ajouter de la page.
* Les modifications des agents existants, la sélection globale du modèle et la sélection API dans les listes de modèles sont enregistrées automatiquement ; recherchez les avis d’échec.
* Enregistrez les modifications du fournisseur avant les vérifications de connexion ou la synchronisation du modèle.
* Une modification globale du modèle par défaut ne met pas à jour tous les agents existants.

Voir [Gestion des modèles](model-management.md) et [Modification des agents](agents-and-tools.md).

## Pourquoi ne puis-je pas supprimer un modèle ?

Une valeur par défaut globale doit d'abord être modifiée ou effacée dans **Paramètres → Modèle par défaut**. Supprimer un autre modèle utilisé par un agent signifie choisir un remplaçant pour cet agent.

## Je peux prévisualiser une image, mais je ne peux pas l'envoyer

La prise en charge de l’aperçu et de la saisie du modèle diffère. Choisissez un modèle compatible avec la vision et vérifiez le format, le nombre d'images et la taille. L'activation d'un indicateur de capacité d'image ne peut pas ajouter de vision à un modèle texte uniquement.

Voir [discussion et fichiers](chat-and-files.md) pour les PDF numérisés, le texte de document vide et les pièces jointes volumineuses.

## Où se trouvent le bouton de recherche sur le Web et le bouton Plugins ?

Le commutateur de recherche Web se trouve dans l'éditeur d'agent ; activez-le, configurez les services et demandez une recherche dans le chat. Les plugins apparaissent dans la zone de saisie du message uniquement lorsque des connexions utilisables existent.

Les plugins connectés peuvent être utilisés directement ou nommés via **＋ → Greffons**. Voir [Recherche sur le Web](web-search.md) et [Connexions de plug-in](plugins.md).

## L'autorisation du plugin continue d'attendre

Revenez à Cherry Studio, vérifiez le statut et confirmez le compte/espace de travail. Rouvrez l'autorisation ou vérifiez à nouveau ; relancer une requête expirée. Les autorisations d’organisation manquantes doivent être traitées au niveau du service.

Les actions DingTalk doivent être redemandées après une autorisation supplémentaire. Les liens WeCom doivent être ouverts dans WeCom avant leur expiration. Voir [plugins](plugins.md).

## Pourquoi puis-je réessayer uniquement la dernière réponse ?

Réessayer remplace la dernière réponse en place. Utilisez une branche pour changer de direction plus tôt. Réessayer/supprimer n’annule pas les actions externes ; réessayer peut coûter plus cher. Voir [actions de réponse](chat-and-files.md).

## La compression du contexte supprime-t-elle ma conversation ?

L’histoire visible demeure. Les documents antérieurs sont résumés pour le modèle et certains détails originaux peuvent être absents. Fournissez à nouveau les éléments clés lorsque l’exactitude compte. Voir [longues conversations](chat-and-files.md).

## Pourquoi les images exportées sont-elles divisées et le code incomplet ?

Les images longues sont exportées par défaut vers les pages ; une option d’image longue unique est disponible. Les panneaux de code affichent un aperçu limité dans les images. Choisissez HTML ou Markdown pour le code complet. L'échec de la conversion peut modifier le format disponible, alors inspectez l'aperçu et l'étiquette de format.

Voir [partage et exportation](sharing-and-export.md) pour la sélection, le filigrane, le contenu de réflexion et les fichiers.

## La génération en arrière-plan s'arrête ou les notifications sont manquantes

Vérifiez **Paramètres → Notifications** et l'autorisation du système. Le système d'exploitation peut toujours restreindre le travail en arrière-plan. Inspectez la conversation/le dessin avant de réessayer. Voir [réponses en arrière-plan](settings-and-usage.md).

## Le couplage synchronise-t-il automatiquement l'historique des discussions ?

Non. Il importe la configuration du fournisseur sélectionné et les modèles activés, exclut les discussions et ne constitue pas une synchronisation continue. Conservez le contenu important séparément ; voir [importation de bureau](desktop-sync.md) et [données](data-privacy.md).

## Android bloque l'installation ou TestFlight ne peut pas rejoindre

Utilisez la [page de téléchargement officielle](https://cherryai.com/download?platform=mobile). Android peut avoir besoin d'une autorisation pour que l'application de téléchargement puisse installer les APK. Installez TestFlight avant d'ouvrir son invitation sur iPhone/iPad. La capacité, l’expiration de la build et la disponibilité du service peuvent affecter l’installation.

Voir [téléchargement et installation](installation.md).

## Les outils ne s'exécutent pas ou un fichier n'a pas été enregistré

* Un modèle répond uniquement par texte, attend l'approbation ou signale une autorisation manquante : vérifiez le modèle, les capacités, la connexion et l'accès dans [Laisser l'IA utiliser les outils](using-tools.md).
* Android ouvre l'application de calendrier ou l'écriture d'un événement a un résultat incertain : suivez [Calendrier et rappels](calendar-and-reminders.md) et inspectez les enregistrements existants avant de réessayer.
* La localisation échoue ou les données de santé sont vides ou partielles : voir [Emplacement et dossiers de santé](location-and-health.md). Un résultat vide ne prouve pas qu’aucun enregistrement n’existe.
* Vous obtenez un bloc de code sans fichier enregistré, ou les modifications laissent l'original inchangé : voir [Créer et modifier des fichiers](file-generation.md).
* Vous possédez un HTML mais souhaitez un PPT, ou vous ne pouvez pas modifier le texte du PPT individuellement : voir [HTML vers image et PPT](html-export.md).

## Comment signaler un problème non résolu ?

Indiquez les versions de l’application, de l’appareil et du système, les étapes de reproduction et le texte de l’erreur dans le [suivi des problèmes du dépôt de l’application](https://github.com/CherryHQ/cherry-studio-app/issues). Masquez d’abord les clés, les conversations privées et le contenu des fichiers.
