---
icon: crop
---
# Capture d'écran, annotation et OCR

Cherry Studio permet de capturer une zone de l'écran via un raccourci clavier global, d'ajouter des rectangles, des flèches, des traits de pinceau, du texte ou des zones floutées, puis de copier ou d'enregistrer le résultat. Une fois l'OCR local activé, il est également possible de sélectionner et de copier directement le texte présent dans la capture.

### Objectifs et prérequis

* Chemin : [Paramètres] → [Capture d'écran] ;
* Sur macOS, la première utilisation nécessite l'autorisation d'enregistrement de l'écran. Après autorisation, redémarrez l'application conformément aux instructions de la page ;
* L'OCR nécessite le téléchargement du modèle de reconnaissance de texte via [Paramètres] → [Modèles locaux] ;
* La fonction de capture d'écran est désactivée par défaut. La reconnaissance automatique du texte est activée par défaut, mais l'OCR ne s'exécute pas si le modèle n'est pas prêt.

### Glossaire

| Terme | Définition |
| ----- | ------------------------------- |
| Raccourci clavier global | Raccourci qui peut être déclenché même si le focus n'est pas sur Cherry Studio |
| OCR | Reconnaissance du texte dans une image pour le rendre sélectionnable et copiable |
| Floutage | Masquage des comptes, chemins, clés ou autres zones sensibles dans la capture |

### Chemin d'accès

[Paramètres] → [Capture d'écran] → Activer [Activer la capture d'écran] → Appuyer sur le raccourci de capture → Sélectionner la zone → Annoter ou reconnaître le texte → Copier ou enregistrer.

### Étapes de procédure

{% stepper %}
{% step %}
#### 1. Activer la capture d'écran et vérifier les autorisations

Ouvrez [Paramètres] → [Capture d'écran] et activez [Activer la capture d'écran]. Si macOS affiche [Autorisation d'enregistrement de l'écran], sélectionnez [Autoriser]. Une fois l'autorisation accordée, cliquez sur [Redémarrer maintenant].
{% endstep %}

{% step %}
#### 2. Configurer le raccourci clavier

Le raccourci par défaut est `Command+Shift+A` sur macOS, et `Ctrl+Shift+A` sur Windows et Linux. Cliquez sur [Configurer le raccourci] pour accéder à la ligne correspondante. Si le système ou une autre application utilise déjà ce raccourci, un message de conflit s'affichera.
{% endstep %}

{% step %}
#### 3. Sélectionner et annoter

Après avoir appuyé sur le raccourci, faites glisser pour sélectionner la zone. Utilisez [Rectangle], [Flèche], [Pinceau] et [Texte] pour souligner les points clés, et [Floutage] pour masquer les informations sensibles. Le panneau des propriétés permet d'ajuster la couleur, l'épaisseur de ligne et la taille de police.
{% endstep %}

{% step %}
#### 4. Copier le texte ou l'image

Si le modèle OCR est prêt, la page reconnaîtra automatiquement le texte. Vous pouvez également cliquer sur [Reconnaître le texte]. Sélectionnez directement le texte ou choisissez [Copier tout le texte]. Une fois l'annotation terminée, choisissez [Copier et fermer] ou [Enregistrer l'image].
{% endstep %}
{% endstepper %}

### Résultat attendu

La capture ne contient que la zone sélectionnée. Les annotations sont claires et les informations sensibles sont masquées. Après copie, vous pouvez coller l'image dans l'application cible, ou coller le texte OCR en tant que texte modifiable.

### Captures d'écran clés

<figure><img src="../../../../assets/461349e8fcf48c13693a40e9.webp" alt="① [Capture d'écran] est un raccourci clavier global modifiable. Après modification, testez-le d'abord dans une fenêtre autre que Cherry Studio."><figcaption><p>① [Capture d'écran] est un raccourci clavier global modifiable. Après modification, testez-le d'abord dans une fenêtre autre que Cherry Studio. </p></figcaption></figure>

### Détails de configuration

| Paramètre | Valeur par défaut | Point de départ recommandé | Fonction | Cas d'usage | Remarques |
| ------ | ---------------------- | ------------- | ----------- | ------------ | -------------- |
| Activer la capture d'écran | Désactivé | Activer si nécessaire | Enregistre le raccourci clavier global de capture | Captures quotidiennes, tutoriels, signalement de problèmes | Nécessite l'autorisation d'enregistrement de l'écran sur macOS |
| Raccourci de capture | `Command/Ctrl+Shift+A` | Conserver la valeur par défaut, modifier en cas de conflit | Déclenche la capture depuis n'importe quelle application | Utilisation fréquente entre applications | Ne se déclenche pas en cas de conflit avec d'autres applications |
| Reconnaissance automatique du texte | Activé | Conserver activé si vous copiez souvent le texte des captures | Exécute automatiquement l'OCR après la capture | Captures d'erreurs, tableaux, texte d'interface | Nécessite le téléchargement du modèle OCR local |

<figure><img src="../../../../assets/d417de7a25de7a4aceba3624.webp" alt="Capture d'écran, annotation et OCR — Illustration"><figcaption></figcaption></figure>

### Cas d'usage

Un testeur capture une erreur de configuration, encadre le message d'erreur avec un rectangle, masque le compte et le chemin local avec du floutage, puis copie le résultat vers l'assistant de signalement de problèmes. Ensuite, il copie le code d'erreur depuis la même capture et le colle dans les étapes de reproduction, évitant ainsi les erreurs de saisie manuelle.

### Questions fréquentes

<details>

<summary>Que faire si le raccourci clavier ne répond pas ? </summary>

Vérifiez que [Activer la capture d'écran] est activé, puis regardez si un message de conflit apparaît à côté du raccourci. Sur macOS, vérifiez également l'autorisation d'enregistrement de l'écran et redémarrez l'application après autorisation. Sur Windows et Linux, essayez une combinaison de touches non utilisée par le système.

</details>

<details>

<summary>Pourquoi ne puis-je pas copier le texte ? </summary>

Ouvrez [Paramètres] → [Modèles locaux] et vérifiez que l'état du modèle OCR est « Prêt ». La reconnaissance du texte est impossible pendant l'annotation. Terminez ou annulez l'annotation en cours, puis exécutez l'OCR.

</details>

### Références

* Signalement de problèmes et suggestions de fonctionnalités
* Barre d'outils de saisie et outils d'efficacité
