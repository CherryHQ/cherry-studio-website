---
icon: language
---
# Traduction de fichiers, d'images et de longs documents

La fonction [Traduction] peut traiter du texte saisi directement, ainsi que des images ou des documents téléversés. Pour les images, le texte est d'abord reconnu ; pour les documents, le traitement dépend du format et du contenu. L'historique permet de mettre en favoris, de rouvrir et de réutiliser les éléments.

<figure><img src="../../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="La traduction fait partie du flux de travail de contenu : il convient d'abord de vérifier les matériaux d'entrée, puis d'unifier la terminologie et de contrôler le livrable final."><figcaption><p>La traduction fait partie du flux de travail de contenu : il convient d'abord de vérifier les matériaux d'entrée, puis d'unifier la terminologie et de contrôler le livrable final. </p></figcaption></figure>

### Choisir la méthode d'entrée

| Matériel | Pratique recommandée | Points de contrôle |
| -------- | -------------------- | ---------------- |
| Texte court | Collage direct | Ton, termes propres, contexte |
| Capture d'écran ou scan | Téléversement d'image et utilisation de l'OCR | Erreurs de reconnaissance, tableaux et chiffres |
| PDF | Téléversement du fichier et choix d'installer BabelDOC | Mise en page en deux colonnes, polices, tableaux, notes de bas de page et nombre de pages |
| Autres longs documents | Téléversement du fichier | Niveaux de titres, paragraphes, notes de bas de page et formatage |
| Markdown | Vérification via l'aperçu | Conservation des liens, des blocs de code et des balises |

#### Exemple : traduction d'un texte court

Sélectionnez [Détection automatique] comme langue source et [Anglais] comme langue cible, saisissez le texte chinois puis cliquez sur [Traduire]. Une fois le résultat affiché, vérifiez d'abord les significations clés telles que « gris », « indicateurs de surveillance » et « processus de retour arrière », puis copiez-le ou enregistrez-le dans vos notes.

<figure><img src="../../../../assets/5428125ff9f2c41e29e8c2ed.webp" alt="① Le texte source est conservé à gauche ; ② la traduction est affichée à droite. Avant la livraison, vérifiez point par point la publication en gris, les indicateurs de surveillance et le processus de retour arrière."><figcaption><p>① Le texte source est conservé à gauche ; ② la traduction est affichée à droite. Avant la livraison, vérifiez point par point la publication en gris, les indicateurs de surveillance et le processus de retour arrière. </p></figcaption></figure>

#### Points à vérifier après l'obtention du résultat

| Élément de contrôle | Exemple |
| ----- | ------------------ |
| Signification clé | « Publication en gris » ne doit pas être traduit littéralement par la couleur |
| Termes propres | Les noms de produits, d'équipes et de fonctionnalités doivent rester cohérents |
| Chiffres et conditions | Les dates, les proportions, les montants et les négations ne doivent pas être omis |
| Ton | Adoptez le ton approprié selon qu'il s'agit d'une notification, d'un contrat ou d'un texte marketing |

Pour les textes courts, une vérification phrase par phrase est possible. Pour les fichiers et les longs documents, commencez par un contrôle aléatoire des titres, des tableaux, des chiffres et des termes répétés, puis décidez si la livraison complète est nécessaire.

### Traduction de PDF en conservant la mise en page

Après le téléversement d'un PDF dont le texte est extractible, la page détecte BabelDOC. Lors de la première utilisation, sélectionnez [Installer BabelDOC] ; une fois les dépendances prêtes, l'aperçu du texte source s'affiche à gauche et le PDF traduit à droite, avec un suivi de progression couvrant les ressources de contrôle, l'analyse, la traduction, la mise en page et le rendu.

{% stepper %}
{% step %}
#### 1. Téléverser le PDF et vérifier les dépendances

Cliquez sur [Glisser-déposer ou cliquer pour téléverser une image/document] pour sélectionner un PDF. Si la page indique une dépendance manquante ou une version obsolète, installez ou mettez à jour BabelDOC ; l'installation est gérée de manière centralisée par les [Dépendances d'environnement] de Cherry Studio.
{% endstep %}

{% step %}
#### 2. Choisir le modèle de traduction et la langue cible

La traduction de PDF nécessite que le modèle actuel soit accessible via la passerelle d'API locale. Si le modèle n'est pas disponible, retournez d'abord à [Paramètres] → [Services de modèles] pour vérifier la connexion, au lieu de réinstaller BabelDOC à plusieurs reprises.
{% endstep %}

{% step %}
#### 3. Comparer le résultat en deux colonnes

Une fois la traduction terminée, comparez page par page le texte source et la traduction, en portant une attention particulière aux tableaux, aux légendes, aux en-têtes et pieds de page, aux notes de bas de page et aux retours à la ligne. Utilisez le bouton de téléchargement pour enregistrer le PDF traduit séparément.
{% endstep %}

{% step %}
#### 4. Reprendre depuis l'historique

La traduction de PDF apparaît dans [Historique de traduction] et [Fichiers]. L'historique permet de rouvrir l'aperçu en deux colonnes, de localiser le fichier traduit ou d'enregistrer le résultat ; lors de la suppression d'une entrée, le fichier traduit correspondant est également récupéré.
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
Les PDF scannés ou purement graphiques ne sont pas encore pris en charge pour la traduction avec conservation de la mise en page. Si la page indique qu'un OCR est nécessaire, reconnaissez d'abord le texte des images en un texte révisable, puis utilisez le flux de traduction standard.
{% endhint %}

### Étapes de traduction

{% stepper %}
{% step %}
#### 1. Confirmer d'abord la langue source et la langue cible

La détection automatique convient aux langues mixtes ou inconnues ; pour les documents formels tels que les contrats et les documents techniques, il est recommandé de confirmer manuellement la langue afin de réduire les erreurs de détection.
{% endstep %}

{% step %}
#### 2. Choisir la méthode de traduction

Utilisez le modèle configuré si le contexte, le ton et la cohérence terminologique sont nécessaires ; pour les phrases courantes, une méthode plus légère peut être choisie. Les options disponibles dépendent de la page actuelle.
{% endstep %}

{% step %}
#### 3. Vérifier par sections

Vérifiez d'abord les noms, les chiffres, les dates, les négations et les unités. Pour la traduction d'images, vérifiez également les résultats de l'OCR ; en cas d'erreur de reconnaissance, la traduction ultérieure sera également fausse.
{% endstep %}

{% step %}
#### 4. Mettre en favoris, exporter ou réutiliser le résultat

Dans [Historique de traduction], consultez, mettez en favoris et réutilisez les traductions de texte ; les résultats PDF peuvent être consultés en aperçu en deux colonnes, ouverts en tant que fichiers ou enregistrés séparément. Avant la livraison officielle, enregistrez la liste des termes et les révisions manuelles dans les ressources du projet.
{% endstep %}
{% endstepper %}

#### Cas d'application : préparation de documents produits multilingues

Commencez par compiler une liste des noms de produits, des noms de fonctionnalités et des termes interdits à modifier. Téléversez le manuel en chinois, traduisez d'abord un chapitre et confirmez la terminologie, puis traitez l'ensemble du document ; téléversez séparément les images promotionnelles pour une traduction par OCR. Une fois terminé, placez les termes confirmés et les traductions dans le répertoire de travail du projet, et demandez à l'Agent de vérifier uniformément les titres, les liens et les chiffres, sans lui permettre de modifier lui-même les déclarations juridiques.

{% hint style="danger" %}
Les contenus relatifs à la santé, au droit, aux finances et à la sécurité nécessitent une relecture par des professionnels. La traduction automatique peut améliorer l'efficacité, mais ne remplace pas la relecture par un responsable identifié.
{% endhint %}
