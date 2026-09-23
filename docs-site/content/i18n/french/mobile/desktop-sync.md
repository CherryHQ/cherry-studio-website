---
icon: monitor-smartphone
---

# Importer la configuration depuis un ordinateur

Réutilisez les fournisseurs de modèles pris en charge déjà configurés dans Cherry Studio sur votre ordinateur, sans saisir à nouveau chaque adresse et clé.

**Cela importe la configuration du fournisseur et les modèles activés, et non l'historique des conversations ou le contrôle à distance de votre ordinateur.** Le couplage n'active pas la synchronisation automatique continue ; réexécutez-le lorsque vous souhaitez importer les modifications.

## Connectez votre ordinateur

1. Connectez les deux appareils au même réseau local, tel que le Wi-Fi de votre maison, et faites fonctionner le Cherry Studio Desktop.
2. Ouvrez **Connexions des appareils** sur le bureau et affichez son code QR d'appairage.
3. Sur mobile, ouvrez **Paramètres → Connexions des appareils → Scanner le code QR**. Autorisez les autorisations de la caméra et du réseau local lorsque cela est demandé.
4. Scannez et passez à la sélection du fournisseur. L'intégration dès la première exécution offre le même itinéraire de synchronisation du bureau.

Si la caméra n'est pas disponible, utilisez le champ manuel pour coller le contenu QR de couplage depuis le bureau. Il attend des données de couplage, et non un lien de site Web ordinaire.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/desktop-pair.webp"><img src="../../../assets/mobile/en/desktop-pair.webp" alt="Ouvrez les connexions de l'appareil et scannez le code d'appairage affiché sur votre ordinateur"></a><figcaption><p><strong>iPhone · Interface en anglais</strong> · Ouvrez les connexions de l'appareil et scannez le code d'appairage affiché sur votre ordinateur.</p></figcaption></figure>
</div>

## Sélectionner et importer des fournisseurs

Utilisez **Fournisseurs de synchronisation depuis le bureau** dans les détails de l'appareil couplé. Vous pouvez également choisir **Synchronisation depuis l’application de bureau** dans le menu de la liste des services de modèles et sélectionner l'ordinateur.

1. Attendez que les fournisseurs de bureau activés se chargent.
2. Sélectionnez les fournisseurs à importer.
3. Lisez l'avis indiquant que les adresses et les clés sélectionnées seront remplacées tandis que les modèles existants resteront.
4. Synchronisez et examinez les décomptes ajoutés, mis à jour et ignorés.
5. Sélectionnez un modèle importé dans le chat. Lors de l'intégration, passez à l'étape de sélection du modèle de discussion.

## Qu'arrive-t-il aux paramètres mobiles existants ?

| Article | Résultat |
| --- | --- |
| Fournisseur sélectionné | Reçoit la configuration et les clés du bureau, et devient activé sur mobile |
| Modèle de bureau activé manquant sur mobile | Ajouté |
| Même modèle déjà sur mobile | Paramètres mobiles existants conservés ; pas de doublon |
| Fournisseurs/modèles uniquement mobiles | Conservé |
| Fournisseurs/modèles de bureau désactivés | Exclus de l'importation |
| Historique des discussions et attributions de comptes de plugins | Non importé |

Si vous utilisez des clés API différentes sur ordinateur et mobile, faites particulièrement attention à la première ligne. Un fournisseur peut voir ses informations d’identification remplacées même lorsqu’aucun nouveau modèle n’a besoin d’être ajouté.

## Pourquoi certains fournisseurs ne sont-ils pas disponibles ?

Lisez la raison affichée à côté du fournisseur :

* **Authentification non prise en charge :** une connexion sur ordinateur peut ne pas fournir de clé exportable utilisable sur mobile. Configurez une méthode prise en charge séparément sur mobile.
* **Aucune clé API utilisable :** assurez-vous que le bureau dispose d'au moins une clé valide et activée.
* **Configuration illisible :** mettez à jour le mobile ou ignorez cette entrée et importez les autres.

Les services de modèles locaux tels que Ollama et LM Studio sont exclus. Le couplage ne transforme pas un modèle exécuté sur votre ordinateur en un service exécuté sur votre téléphone.

## Couplé avec succès, mais impossible de synchroniser

Le couplage stocke les informations d’identification de connexion ; la récupération de la configuration nécessite toujours un ordinateur accessible. Gardez le bureau en marche et vérifiez les paramètres du réseau local partagé, de l'isolation du réseau invité, du pare-feu et du proxy.

Sur iPhone/iPad, activez l'autorisation de réseau local de Cherry Studio dans les paramètres système si elle a été précédemment refusée. Si l'application indique que le couplage doit être réparé, scannez un nouveau code QR de bureau.

## La suppression d’un appareil révoque-t-elle les deux côtés ?

**Supprimer le périphérique** sur mobile supprime uniquement les informations de connexion enregistrées sur ce téléphone. Pour révoquer également l'autorisation du bureau, supprimez l'appareil mobile dans les connexions des appareils du bureau.

L'importation de configuration n'est pas une sauvegarde complète. [Exportez les conversations et fichiers importants](sharing-and-export.md) séparément.
