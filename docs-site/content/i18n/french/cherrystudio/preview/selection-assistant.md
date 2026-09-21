---
icon: highlighter
---
# Assistant de sélection

L'Assistant de sélection (Selection Assistant) vous permet, après avoir **sélectionné du texte dans n'importe quelle application**, d'utiliser une barre d'outils flottante pour effectuer des opérations d'IA telles que la traduction, l'explication, l'optimisation ou la résumation, sans avoir à coller le contenu dans Cherry Studio.

{% hint style="info" %}
**Différence avec l'[Assistant rapide](quick-assistant.md)** :

* **Assistant rapide** : ouvre une fenêtre de **saisie active** via un raccourci clavier global, où vous tapez votre question
* **Assistant de sélection** : affiche une barre d'outils **ciblée sur le contenu sélectionné** après la sélection du texte, permettant d'exécuter des opérations prédéfinies en un clic
{% endhint %}

### Prise en charge des plateformes

* ✅ **macOS** : prise en charge complète, mais l'activation initiale nécessite l'octroi de l'**autorisation d'accessibilité**
* ✅ **Windows** : prise en charge complète, aucune autorisation spéciale requise
* ⚠️ **Linux** : prise en charge complète uniquement en mode **X11** ; en mode Wayland, la barre d'outils peut ne pas suivre la position du texte sélectionné. Il est également nécessaire d'ajouter l'utilisateur actuel au groupe `input` (`sudo usermod -aG input $USER`) pour obtenir les droits d'écoute des touches

### Activation de l'Assistant de sélection

Ouvrez [Paramètres] → [Assistant de sélection] :

<figure><img src="../../../../assets/9c1fa1dc2820ccee7bd169f3.webp" alt=""><figcaption><p>Panneau de paramètres de l'Assistant de sélection</p></figcaption></figure>

1. Activez l'interrupteur **Activer**
2. Les utilisateurs **macOS** verront une fenêtre pop-up demandant l'**autorisation d'accessibilité** lors de la première activation :

   <figure><img src="../../../../assets/ed99fa5f9b3118d263e09cd2.webp" alt=""><figcaption><p>Demande d'autorisation d'accessibilité lors de la première activation</p></figcaption></figure>

   Cliquez sur **Aller aux paramètres** → dans [Paramètres système] → [Confidentialité et sécurité] → [Accessibilité], trouvez Cherry Studio et activez l'interrupteur → retournez dans Cherry Studio et activez à nouveau.
3. (Facultatif) Dans [Barre d'outils] → [Méthode de sélection], choisissez le mode de déclenchement (les options varient selon la plateforme) :
   * **Sélection** : la barre d'outils apparaît immédiatement après la sélection du texte (par défaut)
   * **Touche Ctrl** (Windows uniquement) : la barre d'outils n'apparaît qu'après la sélection du texte **et la pression maintenue de la touche Ctrl** (pour éviter les déclenchements accidentels)
   * **Raccourci clavier** : la barre d'outils apparaît après la sélection du texte et l'appui sur le raccourci clavier, modifiable dans [Paramètres] → [Raccourcis clavier]

<figure><img src="../../../../assets/f45f2fd96c9bb25af9825da7.webp" alt=""><figcaption><p>Panneau de paramètres après activation : méthode de sélection / mode compact / barre d'outils flottante…</p></figcaption></figure>

### Opérations intégrées

L'Assistant de sélection propose 7 opérations intégrées, **dont 5 sont activées par défaut** : Traduire / Expliquer / Résumer / Rechercher / Copier. L'**icône Cherry** à gauche de la barre d'outils n'est pas un bouton d'action — c'est simplement la poignée de déplacement de la barre d'outils, permettant de déplacer l'ensemble de la barre en la maintenant.

| Opération | Activée par défaut | Usage |
|---|---|---|
| **Traduire** | ✅ | Traduction intelligente : traduit prioritairement vers la langue cible ; si le texte est déjà dans la langue cible, traduit vers la langue de secours |
| **Expliquer** | ✅ | Demande à l'IA d'expliquer ce contenu |
| **Résumer** | ✅ | Demande à l'IA de résumer le contenu sélectionné en un paragraphe |
| **Rechercher** | ✅ | Utilise le texte sélectionné pour interroger un moteur de recherche (Google par défaut, modifiable via l'icône ⋯ à droite de chaque élément) |
| **Copier** | ✅ | Copie le texte sélectionné |
| **Optimiser** | À activer | Demande à l'IA de réécrire le texte pour le rendre plus fluide / plus professionnel, à activer en le glissant dans la zone d'activation des paramètres |
| **Citer** | À activer | Envoie le texte sélectionné sous forme de citation dans la conversation actuelle, à activer en le glissant dans la zone d'activation des paramètres |

<figure><img src="../../../../assets/29cffab07ecb8317865312ee.webp" alt=""><figcaption><p>Section [Fonctions] du panneau de paramètres : les éléments du haut sont activés, glissez les éléments de la zone inférieure vers le haut pour les activer</p></figcaption></figure>

### Opérations personnalisées

Dans [Paramètres] → [Assistant de sélection] → [Fonctions], vous pouvez :

* **Modifier** les invites des opérations intégrées
* **Ajouter** des opérations personnalisées (nom + invite + modèle par défaut)
* **Glisser-déposer** pour réorganiser l'ordre des opérations dans la barre d'outils
* Glisser les opérations peu utilisées dans la zone de stockage inférieure pour les « désactiver »

### Apparence de la barre d'outils / de la fenêtre de résultats

Barre d'outils :
* **Mode compact** : affiche uniquement les icônes, sans texte, pour économiser l'espace écran

Fenêtre de résultats (section [Fenêtre de fonctions]) :
* **Suivre la barre d'outils** : la fenêtre apparaît collée à la barre d'outils (activé par défaut), sinon elle reste toujours centrée
* **Mémoriser la taille** : conserve la taille de la fenêtre ajustée manuellement pour la prochaine session
* **Fermeture automatique** : se ferme en cliquant en dehors de la fenêtre
* **Toujours au premier plan** : reste toujours au-dessus des autres applications
* **Opacité** : réglable de 20 % à 100 %

### Moteur de recherche

L'opération [Rechercher] intégrée à l'Assistant de sélection permet de choisir un moteur prédéfini (Google, Bing, DuckDuckGo, etc.). L'accès à la configuration se trouve dans [Paramètres] → [Assistant de sélection] → [Fonctions] : trouvez l'entrée **Rechercher**, cliquez sur l'icône d'engrenage à droite de la ligne pour ouvrir la boîte de dialogue [Paramètres du moteur de recherche], où vous pouvez choisir parmi les moteurs prédéfinis ou en ajouter un personnalisé, en utilisant `{{queryString}}` dans l'URL pour indiquer l'emplacement du terme de recherche.

### Filtres d'applications (avancé)

Vous pouvez configurer une **liste noire / liste blanche** dans [Paramètres] → [Assistant de sélection] → [Avancé] → [Filtres d'applications], afin que l'Assistant de sélection ne fonctionne que dans les applications spécifiées (liste blanche) ou ne s'affiche pas dans les applications spécifiées (liste noire).

* **macOS** : saisissez l'identifiant de bundle de l'application (par exemple `com.google.Chrome`, `com.apple.mail`)
* **Windows** : saisissez le nom du fichier exécutable de l'application (par exemple `chrome.exe`, `Cherry Studio.exe`)

### Modèle utilisé

L'Assistant de sélection utilise par défaut le [modèle de conversation global par défaut](../../pre-basic/settings/default-models.md), mais vous pouvez également spécifier un modèle distinct pour chaque opération.

### Conseils et astuces

* Sur macOS, si la barre d'outils n'apparaît pas, vérifiez que Cherry Studio est coché dans [Paramètres système] → [Confidentialité et sécurité] → [Accessibilité]
* La barre d'outils apparaît trop souvent par erreur lors de la sélection de texte ? Passez au mode de déclenchement **Touche Ctrl**
* Trop d'icônes dans la barre d'outils qui encombre l'écran ? Activez le **mode compact**
* Vous souhaitez effectuer des opérations en chaîne comme « traduire puis lire à voix haute » ? Copiez le résultat de la « Traduction » puis utilisez l'[Assistant rapide](quick-assistant.md) pour continuer le traitement

***

### Obtenir de l'aide et envoyer des retours

Si vous avez des questions, des bugs ou des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
