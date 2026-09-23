---
icon: scanner-image
---
# OCR

L'OCR (Optical Character Recognition, reconnaissance optique de caractères) permet de **convertir le texte des images en texte copiable et lisible par l'IA**. Les fonctionnalités suivantes en dépendent :

* Glisser une capture d'écran / un scan dans la fenêtre de dialogue pour que l'IA en lise le contenu
* Ajouter des factures ou documents au format image à la [base de connaissances](../../knowledge-base/knowledge-base.md) pour pouvoir les rechercher ultérieurement
* Ouvrir une image locale par un [Agent](../../advanced-basic/agent.md) pour l'analyser

L'OCR dispose d'une page de configuration indépendante. Vous configurez le moteur de reconnaissance une seule fois dans [Paramètres] → [OCR], et cette configuration est appliquée à tous les endroits où la lecture d'images est utilisée.

<figure><img src="../../../../assets/31140d519a5957ff8945fd3a.webp" alt=""><figcaption><p>Paramètres OCR : ① Sélection du moteur de reconnaissance via le menu déroulant en haut à droite (illustration : Mistral), saisie de la clé API et de l'adresse API du moteur sélectionné ci-dessous</p></figcaption></figure>

### Sélection du moteur de reconnaissance

Le menu déroulant en haut à droite du panneau permet de changer de moteur OCR. **Le moteur sélectionné devient le moteur par défaut**. Moteurs intégrés :

| Moteur | Mode d'accès / d'exécution | Pour qui |
| --- | --- | --- |
| **System OCR** | Hors ligne, sans configuration | Utilise la reconnaissance intégrée au système (macOS Live Text / Windows OCR), prêt à l'emploi et le plus rapide |
| **PaddleOCR** | Saisie de la clé API ([Communauté Paddle Star](https://aistudio.baidu.com/paddleocr/)) ; en cas de déploiement auto-hébergé, pointez l'adresse API vers votre service. Modèle d'analyse optionnel | Pour ceux qui ne veulent pas consommer de ressources locales tout en bénéficiant de la qualité de reconnaissance de Paddle |
| **PaddleOCR local** | Hors ligne, nécessite le téléchargement préalable du modèle OCR local dans [Paramètres] → [Modèles locaux] (environ 140 Mo) | Bonne reconnaissance du chinois, exécution entièrement locale, priorité à la confidentialité |
| **Tesseract OCR** | Hors ligne, intégré | OCR open source classique, multilingue, solution de secours |
| **Mistral** | Clé API Mistral | Reconnaissance via un grand modèle multimodal, plus intelligent pour les mises en page complexes / l'écriture manuscrite |
| **Intel OV OCR** | Exécution locale (Intel OpenVINO, accélération NPU) | **N'apparaît que sur Windows + Intel Core Ultra (avec NPU) et si le modèle OV est déployé**, invisible sur les autres appareils |

{% hint style="success" %}
Vous ne savez pas lequel choisir ? Commencez par **System OCR** — il gère la grande majorité des captures d'écran et des scans clairs sans aucune configuration. Si la qualité de reconnaissance est insuffisante, passez à PaddleOCR local ou Mistral.
{% endhint %}

Lorsque System OCR est sélectionné, le panneau affiche <mark style="color:green;">Moteur macOS Live Text / Windows OCR détecté et disponible</mark> (si le système ne le prend pas en charge, cette option n'apparaît pas dans le menu déroulant).

{% hint style="warning" %}
* Avant de sélectionner « PaddleOCR local », téléchargez le « Modèle OCR local » dans [Paramètres] → [Modèles locaux], sinon il ne pourra pas être appelé.
* **Tesseract** (et System OCR sur Windows) permet de cocher les langues à reconnaître dans le menu déroulant « Langue » du panneau.
{% endhint %}

### Différence avec le traitement des documents

Beaucoup confondent OCR et [traitement des documents](doc-process.md). La distinction en une phrase :

* **OCR** : Reconnaissance du texte dans les **images / scans** (image → texte).
* **Traitement des documents** : Analyse structurée des **PDF / documents complexes** (PDF avec tableaux, colonnes multiples → texte ordonné).

Les deux sont indépendants et configurés séparément. Les paragraphes de texte des PDF texte pur, `.md`/`.txt`/`.docx` ne passent par aucun des deux et sont lus directement.

***

### Obtenir de l'aide et envoyer des retours

Si vous avez des questions, des bugs ou des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
