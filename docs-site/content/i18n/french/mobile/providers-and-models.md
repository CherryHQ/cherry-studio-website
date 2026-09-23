---
icon: key-round
---

# Fournisseurs et modèles

Un fournisseur est la plateforme fournissant un service d’IA ; un modèle est l'IA particulière que vous utilisez via cette plate-forme. Le même modèle peut être disponible auprès de plusieurs fournisseurs, chacun avec ses propres identifiants.

Pour commencer, saisissez une **Clé API**, ajoutez un modèle et activez le fournisseur. Une clé API est un identifiant fourni par votre fournisseur pour permettre à Cherry Studio d’accéder à son service. Cherry Studio n’inclut pas de crédits d’utilisation des modèles ; leur disponibilité et les frais dépendent de votre compte chez le fournisseur.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/iphone-add-provider.webp"><img src="../../../assets/mobile/en/iphone-add-provider.webp" alt="Ajouter un écran de fournisseur dans Cherry Studio Mobile sur iPhone"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Rechercher dans le catalogue des fournisseurs ou créer un fournisseur personnalisé</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/en/ipad-add-provider.webp"><img src="../../../assets/mobile/en/ipad-add-provider.webp" alt="Ajouter un écran de fournisseur dans Cherry Studio Mobile sur iPad"></a><figcaption><p><strong>iPad · Interface en anglais</strong> · Le même catalogue de fournisseurs dans la présentation tablette</p></figcaption></figure>
</div>

## Ajouter un fournisseur intégré

1. Ouvrez **Paramètres → Service modèle** et appuyez sur le bouton Ajouter.
2. Recherchez un fournisseur et appuyez sur **Ajouter**. Les entrées intégrées fournissent des paramètres de connexion communs.
3. Entrez la clé API de ce fournisseur. Conservez l'adresse suggérée et l'option API, sauf indication contraire du fournisseur.
4. Enregistrez, récupérez la liste des modèles, sélectionnez les modèles souhaités et confirmez. Si la liste n'est pas disponible, ajoutez un modèle manuellement.
5. Terminez la configuration et vérifiez le commutateur du fournisseur dans la liste des services modèles. Allumez-le s'il reste désactivé, puis sélectionnez le modèle dans une conversation.

Modifiez un fournisseur existant au lieu de l'ajouter à nouveau. Vous pouvez désactiver temporairement un fournisseur et le réactiver ultérieurement.

## Ajouter un fournisseur personnalisé

Faites appel à un fournisseur personnalisé lorsque votre plateforme est absente du catalogue ou fournit une adresse dédiée.

1. Choisissez **Fournisseur personnalisé** et entrez un nom reconnaissable.
2. Sélectionnez le format API documenté par la plateforme. OpenAI, Anthropic et Gemini décrivent les formats de connexion ; choisissez celui pris en charge par votre plateforme.
3. Saisissez le **URL de base**, l'adresse de base utilisée pour se connecter au service et sa clé API.
4. Vérifiez le **URL de requête** affiché et enregistrez.
5. Récupérez des modèles ou ajoutez manuellement l'ID de modèle exact à partir de la plate-forme. Revenez à la liste des fournisseurs et activez son commutateur si nécessaire.

### Quelle adresse figure dans l'URL de base ?

Utilisez l'adresse de base du fournisseur, telle que `https://api.example.com/v1`. N'utilisez pas sa page de connexion/tableau de bord et ne collez pas une URL de demande complète se terminant par `/chat/completions`. L'application ajoute le chemin de la requête ; l'inclure deux fois entraîne une adresse incorrecte. Les URL complètes reconnues affichent une suggestion de correction.

Certaines passerelles nécessitent une adresse sans version API automatiquement insérée. Lorsque le fournisseur l'exige, ajoutez `#`, par exemple `https://api.example.com#`, et vérifiez l'aperçu de l'URL de la demande. Sinon, laissez le marqueur de côté.

Un fournisseur prenant en charge plusieurs API peut avoir des adresses distinctes et un API par défaut. La modification de la valeur par défaut peut affecter les modèles qui la suivent ; lisez la confirmation avant de continuer.

## Modifier un fournisseur et gérer les clés

Ouvrez l'onglet **Configuration** du fournisseur pour modifier son nom, son adresse et ses clés. Les notes clés facultatives, telles que « Personnel » ou « Sauvegarde », sont des étiquettes d'identification et ne modifient pas les autorisations.

* Ajoutez une clé par entrée. Les clés peuvent être modifiées, activées, désactivées ou supprimées séparément ; n'en collez pas plusieurs dans un seul champ.
* La fermeture d'un éditeur de clé conserve les modifications dans le brouillon de la page. Appuyez sur l'action **Enregistrer** de la page pour enregistrer l'adresse et les clés ensemble.
* Gardez au moins une clé valide activée. Un fournisseur dont toutes les clés sont désactivées ne peut pas effectuer de demandes normales.
* Une invite d'annulation des modifications signifie qu'il reste des modifications non enregistrées.

Les demandes de chat prises en charge peuvent essayer une autre clé activée après une erreur d'autorisation ou de limite de débit, à condition qu'aucune réponse n'ait démarré. Cela ne couvre pas toutes les erreurs, générations d’images ou demandes de liste de modèles, et n’augmente pas les crédits du compte.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/provider-config.webp"><img src="../../../assets/mobile/en/provider-config.webp" alt="Enregistrez les modifications apportées au fournisseur avec le bouton en haut à droite ; les clés affichées sont des exemples non fonctionnels"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Enregistrez les modifications apportées au fournisseur avec le bouton en haut à droite ; les clés affichées sont des exemples non fonctionnels</p></figcaption></figure>
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/provider-key.webp"><img src="../../../assets/mobile/en/provider-key.webp" alt="Les notes clés aident à identifier les comptes ; enregistrer le fournisseur après avoir fermé cette feuille"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Les notes clés aident à identifier les comptes ; enregistrer le fournisseur après avoir fermé cette feuille</p></figcaption></figure>
</div>

## Vérifiez la connexion

Enregistrez d'abord, ouvrez **Vérification du modèle**, sélectionnez un modèle et exécutez la vérification. La page affiche l'adresse et le résultat de la demande.

Le succès s'applique à cette configuration et au modèle sélectionné, et non à tous les modèles de la plateforme. La vérification d'une connexion n'active pas le fournisseur ; vérifiez son commutateur dans la liste des fournisseurs.

## Choisissez les modèles et les valeurs par défaut

Le sélecteur de modèle de conversation modifie le modèle de l'agent actuel. Le fournisseur doit être activé et le modèle disponible. Recherchez ou utilisez les filtres **Tous**, **Gratuit** et **Image** pour affiner la liste. Si les modèles disparaissent, revenez à **Tous**.

La vision reflète la prise en charge de la saisie d'images enregistrées ; La gratuité reflète les prix enregistrés. Les capacités réelles, les allocations gratuites et les quotas dépendent du fournisseur.

Dans **Paramètres → Modèle par défaut**, sélectionnez les modèles par défaut et de génération d’images. Le choix d’un modèle ou l’effacement de la sélection est enregistré immédiatement. Les agents existants conservent leur propre modèle ; modifier le modèle par défaut global ne modifie pas tous les agents.

## Guides associés

* [Ajouter, modifier et gérer des modèles](model-management.md) : capacités, limites, tarification et suppression.
* [Informations sur le modèle et mises à jour de la liste](model-updates.md) : mises à jour automatiques versus synchronisation manuelle.
* [Importer la configuration depuis le bureau](desktop-sync.md) : réutiliser une configuration existante.
* [Dépannage](troubleshooting.md) : erreurs de connexion et récupération.
