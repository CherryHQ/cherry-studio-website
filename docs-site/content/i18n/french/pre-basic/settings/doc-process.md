---
icon: file-code
---
# Traitement des documents

En résumé : **c'est la configuration centrale de Cherry Studio pour convertir les « PDF / documents à mise en page complexe » en texte structuré.**

Les PDF contenant des tableaux, des colonnes multiples ou des pages scannées (articles académiques, contrats, rapports de recherche, etc.) sont souvent interprétés de manière erratique par les modèles. Le traitement des documents utilise d'abord un moteur de parsing dédié pour les convertir en texte clair et structuré, avant de les transmettre à la conversation ou à la [base de connaissances](../../knowledge-base/knowledge-base.md).

{% hint style="info" %}
**Traitement des documents vs OCR** : il s'agit de deux pages de configuration distinctes.

* **Traitement des documents** (cette page) : gère l'analyse structurée des **PDF / documents à mise en page complexe**.
* **[OCR](ocr.md)** : gère la reconnaissance de texte dans les **images / documents scannés**.

Pour les PDF de texte simple, les paragraphes de texte dans `.md`/`.txt`/`.docx`, ni l'un ni l'autre n'est nécessaire ; le texte peut être lu directement.
{% endhint %}

### Point d'accès à la configuration

Ouvrez [Paramètres] → [Traitement des documents], sélectionnez le moteur de parsing dans le menu déroulant en haut à droite. **Le moteur sélectionné devient le moteur par défaut.**

<figure><img src="../../../../assets/dbc7765b46b45fec4b345e04.webp" alt=""><figcaption><p>Paramètres du traitement des documents : ① Sélection du moteur de parsing via le menu déroulant en haut à droite (MinerU par défaut) ; en dessous, saisissez la clé API et l'adresse API du moteur choisi</p></figcaption></figure>

### Moteurs de parsing intégrés

Le traitement des documents intègre 5 moteurs, avec **MinerU** par défaut :

| Moteur | Description | Mode d'intégration |
| --- | --- | --- |
| **MinerU** (par défaut) | Outil open source de haute qualité pour l'extraction de PDF par OpenDataLab | Clé API ([mineru.net/apiManage](https://mineru.net/apiManage)) |
| **PaddleOCR** | Système de reconnaissance OCR de Baidu Paddle | Saisir la clé API ([Communauté Paddle Star](https://aistudio.baidu.com/paddleocr/)) ; en cas de déploiement autonome, pointer l'adresse API vers votre service |
| **Doc2x** | Moteur avancé de restauration de fichiers | Clé API ([open.noedgeai.com](https://open.noedgeai.com/apiKeys)) |
| **Mistral** | Service d'analyse et de compréhension de fichiers | Clé API ([mistral.ai](https://mistral.ai/api-keys)) |
| **Open MinerU** | Service MinerU déployable en autonomie, adapté aux équipes souhaitant contrôler leur chaîne de traitement | Saisir l'adresse API après déploiement (clé API facultative selon les besoins) |

### Configuration de MinerU (solution par défaut)

{% stepper %}
{% step %}
### Saisir la clé API

Dans le champ [Clé API], saisissez la clé obtenue auprès de MinerU (cliquez sur « Obtenir la clé » à droite pour accéder à la page de demande ; plusieurs clés peuvent être séparées par des virgules).
{% endstep %}

{% step %}
### Confirmer l'adresse API

Laissez l'[Adresse API] sur sa valeur par défaut.
{% endstep %}

{% step %}
### Utilisation directe dans la base de connaissances / la conversation

Lors de l'importation de PDF complexes, les paramètres de parsing définis ici sont appliqués automatiquement. Aucun réglage supplémentaire n'est nécessaire lors du passage à la base de connaissances ou à la conversation.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
**Changer de moteur** : sélectionnez-le dans le menu déroulant, saisissez sa [Clé API] / [Adresse API] ; la sélection le rend par défaut. **PaddleOCR** et **Open MinerU** prennent en charge le déploiement autonome — après déploiement, saisissez votre propre adresse de service dans [Adresse API].
{% endhint %}

### Relation avec la base de connaissances

* Le traitement des documents ne gère que l'étape « document complexe → texte structuré » ;
* Le texte converti passe ensuite par le [modèle d'embedding](../../knowledge-base/emb-models-info.md) pour la vectorisation et l'indexation ;
* Pour le processus détaillé d'activation dans la base de connaissances, consultez [Prétraitement des documents dans la base de connaissances](../../knowledge-base/document-preprocessing.md).

### Conseils et astuces

* MinerU offre des résultats nettement supérieurs pour les PDF avec tableaux / mise en page multicolonne ; c'est le choix recommandé pour les articles académiques, etc. ;
* Si vous devez reconnaître du **texte dans des images** (captures d'écran, scans) plutôt que la structure d'un PDF, utilisez [OCR](ocr.md).

***

### Obtenir de l'aide et envoyer des retours

Si vous rencontrez des questions, des bugs ou avez des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
