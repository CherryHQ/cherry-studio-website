---
icon: refresh-cw
---

# Mise à jour des informations et des listes de modèles

« Mettre à jour » peut signifier plusieurs choses. Une mise à jour des informations sur le modèle ne change pas le modèle que vous avez choisi, n'accorde pas d'autorisations de compte et n'ajoute pas automatiquement chaque nouveau modèle à votre liste.

| Ce que tu veux | Où le faire | Quels changements |
| --- | --- | --- |
| Nouveaux noms de modèles, capacités, limites ou tarifs | Ouvrir l'onglet **Modèles** d'un fournisseur | Les informations de modèle partagées utilisées par l'application |
| Modèles actuellement renvoyés par une plateforme | Appuyez sur **Synchroniser** dans l'onglet Modèles de ce fournisseur. | Un aperçu des ajouts et des modèles non restitués ; vous sélectionnez les modifications à appliquer |
| La configuration existante de votre ordinateur | Choisissez **Synchronisation depuis l’application de bureau** | Configuration du fournisseur sélectionné et modèles activés manquants |
| Nouvelles fonctionnalités et correctifs de l'application | Mise à jour via le canal d'installation officiel | L'application elle-même |

## Quand les informations sur le modèle sont-elles mises à jour ?

Lors de la première utilisation, l'application télécharge les informations sur le modèle en arrière-plan. La sélection, la création et la modification du modèle peuvent afficher les états de chargement ou de nouvelle tentative jusqu'à la fin. Vérifiez le réseau et réessayez après un premier téléchargement échoué.

Les informations téléchargées sont stockées sur votre appareil. Les lancements ultérieurs utilisent ces informations enregistrées sans les télécharger à nouveau à chaque démarrage. **L'ouverture de l'onglet Modèles d'un fournisseur** déclenche une tentative de mise à jour en arrière-plan.

**Informations sur les modèles mises à jour** apparaît uniquement lorsqu'une version plus récente a été appliquée et que vous restez sur l'écran Modèles. Un catalogue inchangé, un échec d’actualisation en arrière-plan ou la sortie de la page ne peuvent produire aucune notification. Le silence ne signifie pas nécessairement l'échec.

## Que se passe-t-il hors ligne ?

Un catalogue enregistré existant reste utilisable en cas d'échec d'une actualisation. Un échec de téléchargement n’efface pas la configuration de votre modèle. La première utilisation sans informations enregistrées nécessite toujours une connexion Internet.

La navigation hors ligne dans les informations enregistrées ne rend pas les modèles cloud disponibles hors ligne ; l'envoi d'une demande nécessite toujours une connexion à votre fournisseur.

## Mes modifications seront-elles écrasées ?

Les mises à jour des informations distantes ne modifient ni les valeurs que vous avez personnalisées et enregistrées pour vos modèles, ni vos modèles personnalisés. Les champs qui suivent les valeurs par défaut héritent des nouvelles informations : leur nom, leurs capacités ou leur prix peuvent donc changer.

Ces mises à jour ne modifient pas vos **clés API, adresses de fournisseur ou paramètres d'authentification** et n'activent pas de fournisseur. Effacez une limite de jetons saisie manuellement et enregistrez-la si vous souhaitez qu'elle suive à nouveau la valeur par défaut du catalogue/de l'application.

## Récupérer la liste de modèles d'un fournisseur

1. Ouvrez **Paramètres → Service modèle → Votre fournisseur → Modèles**.
2. Enregistrez toutes les modifications de configuration du fournisseur, puis appuyez sur **Synchroniser**.
3. Passez en revue les ajouts et modèles disponibles **non renvoyés par le service à distance**.
4. Sélectionnez les modifications souhaitées et appuyez sur **Mise à jour**. Rien n'est sélectionné automatiquement.
5. Lisez la confirmation avant d’appliquer des suppressions.

La récupération de la liste n'active pas le fournisseur. Les résultats échoués ou vides conservent les modèles existants ; réparer la configuration, réessayer ou [ajouter un modèle manuellement](model-management.md).

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/model-sync.webp"><img src="../../../assets/mobile/en/model-sync.webp" alt="Examiner et sélectionner les modèles avant d'appliquer les modifications ; la liste des fournisseurs peut changer"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Examiner et sélectionner les modèles avant d'appliquer les modifications ; la liste des fournisseurs peut changer</p></figcaption></figure>
</div>

## « Non retourné » signifie-t-il qu'un modèle a été abandonné ?

Pas nécessairement. Les clés, les autorisations de compte, les API de liste incomplètes et les erreurs temporaires peuvent affecter les résultats.

Les modèles ne sont pas automatiquement supprimés après une seule réponse. La suppression nécessite votre sélection et confirmation ; l’historique des conversations demeure. Les modèles protégés peuvent être ignorés ; voir [règles de suppression de modèle](model-management.md). Ne supprimez pas de manière groupée des modèles fonctionnels simplement parce qu’ils n’ont pas été renvoyés.

## Pourquoi le chat fonctionne-t-il lorsque la synchronisation échoue ?

La découverte de modèles et le chat utilisent des adresses de requête différentes. Certaines plates-formes prennent en charge le chat mais n'exposent pas de liste de modèles API.

Les paramètres du fournisseur personnalisé affichent le **URL de requête de la liste des modèles** distinct. Si la plateforme ne le prend pas en charge, copiez l'ID de modèle exact de la plateforme, ajoutez-le manuellement et vérifiez la connexion.

## Un nouveau modèle existe, mais je ne le vois pas

Vérifiez que :

1. Vous avez ouvert l'onglet Modèles pour permettre une mise à jour des informations.
2. Vous avez synchronisé avec le fournisseur concerné ou ajouté manuellement le modèle.
3. Votre compte/clé peut y accéder.
4. Le fournisseur et le modèle sont activés et le filtre du sélecteur est défini sur Tous.

Les informations sur le modèle, l'accès au compte et les modèles ajoutés localement sont distincts. L'application doit également prendre en charge le format de connexion du modèle.
