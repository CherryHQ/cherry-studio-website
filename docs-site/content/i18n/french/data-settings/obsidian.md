---
icon: gem
---


```markdown
# Tutoriel de configuration d'Obsidian

Cherry Studio prend en charge l'intégration avec Obsidian pour exporter des conversations complètes ou des messages individuels vers une bibliothèque Obsidian.

{% hint style="warning" %}
Ce processus ne nécessite pas l'installation de plugiciels Obsidian supplémentaires. Cependant, puisque le principe d'importation de Cherry Studio vers Obsidian est similaire à Obsidian Web Clipper, il est recommandé de mettre à jour Obsidian vers la dernière version (la version actuelle d'Obsidian doit être supérieure à **1.7.2**). Ceci évite les [échecs d'importation lors de conversations trop longues](https://github.com/obsidianmd/obsidian-clipper/releases/tag/0.7.0).
{% endhint %}

## Tutoriel récent

{% hint style="info" %}
Comparée à l'ancienne version, la nouvelle fonction d'exportation vers Obsidian sélectionne automatiquement le chemin de la bibliothèque, sans nécessiter la saisie manuelle du nom de bibliothèque ou du dossier.
{% endhint %}

### Étape 1 : Configurer Cherry Studio

Ouvrez les _Paramètres_ de Cherry Studio → _Paramètres des données_ → Menu _Configuration d'Obsidian_. Les noms des bibliothèques Obsidian ouvertes localement apparaîtront dans la liste déroulante. Sélectionnez votre bibliothèque cible :

<figure><img src="../.gitbook/assets/image (142).webp" alt=""><figcaption></figcaption></figure>

### Étape 2 : Exporter une conversation

#### Exporter une conversation complète

Retournez à l'interface de conversation de Cherry Studio, cliquez droit sur une conversation, sélectionnez _Exporter_, puis cliquez sur _Exporter vers Obsidian_ :

<figure><img src="../.gitbook/assets/image (143).webp" alt=""><figcaption></figcaption></figure>

Une fenêtre s'affiche pour configurer les **Propriétés** de la note, l'**emplacement du dossier** dans Obsidian et le **mode de traitement** :

* **Bibliothèque** : Sélectionnez d'autres bibliothèques via le menu déroulant
* **Chemin** : Choisissez le dossier de destination via le menu déroulant
* Propriétés de la note Obsidian :
  * Étiquettes (tags)
  * Date de création (created)
  * Source (source)
* **Modes de traitement** disponibles :
  * **Nouveau (remplace si existant)** : Crée une nouvelle note dans le dossier spécifié, remplace les notes existantes homonymes
  * **Préfixer** : Ajoute le contenu au début d'une note existante homonyme
  * **Suffixer** : Ajoute le contenu à la fin d'une note existante homonyme

{% hint style="info" %}
Seul le premier mode inclut les propriétés. Les deux autres modes ne les conservent pas.
{% endhint %}

<figure><img src="../.gitbook/assets/image (144).webp" alt=""><figcaption><p>Configurer les propriétés de la note</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (145).webp" alt=""><figcaption><p>Sélectionner le chemin</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (146).webp" alt=""><figcaption><p>Choisir le mode de traitement</p></figcaption></figure>

Après sélection, cliquez sur **Confirmer** pour exporter la conversation vers le dossier cible d'Obsidian.

#### Exporter un message individuel

Cliquez sur le _menu à trois barres_ sous un message → _Exporter_ → _Exporter vers Obsidian_ :

<figure><img src="../.gitbook/assets/image (147).webp" alt=""><figcaption><p>Exporter un message individuel</p></figcaption></figure>

La même fenêtre de configuration que pour une conversation complète s'affiche. Suivez les [instructions ci-dessus](obsidian.md#dao-chu-wan-zheng-dui-hua) pour finaliser.

### Exportation réussie

🎉 Félicitations ! Vous avez terminé la configuration d'intégration Obsidian et mené à bien le processus d'exportation.

<figure><img src="../.gitbook/assets/image (140).webp" alt=""><figcaption><p>Exportation vers Obsidian</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (139).webp" alt=""><figcaption><p>Vérifier le résultat</p></figcaption></figure>

***

## Ancien tutoriel (pour Cherry Studio < v1.1.13)

### Étape 1 : Préparer Obsidian

Ouvrez une bibliothèque Obsidian et créez un `dossier` pour les conversations exportées (exemple : dossier Cherry Studio) :

<figure><img src="../.gitbook/assets/image (127).webp" alt=""><figcaption></figcaption></figure>

Notez le nom de `bibliothèque` encadré en bas à gauche.

### Étape 2 : Configurer Cherry Studio

Dans _Paramètres_ → _Paramètres des données_ → _Configuration d'Obsidian_, saisissez le nom de `bibliothèque` et de `dossier` obtenus à l'[étape 1](obsidian.md#di-yi-bu) :

<figure><img src="../.gitbook/assets/image (129).webp" alt=""><figcaption></figcaption></figure>

Le champ `Étiquettes globales` est optionnel pour définir les étiquettes des notes exportées.

### Étape 3 : Exporter une conversation

#### Conversation complète

Cliquez droit sur une conversation → _Exporter_ → _Exporter vers Obsidian_ :

<figure><img src="../.gitbook/assets/image (138).webp" alt=""><figcaption><p>Exporter une conversation complète</p></figcaption></figure>

Configurer les **Propriétés** et le **mode de traitement** (identique à la version récente).

#### Message individuel

Cliquez sur le _menu à trois barres_ → _Exporter_ → _Exporter vers Obsidian_ :

<figure><img src="../.gitbook/assets/image (141).webp" alt=""><figcaption><p>Exporter un message individuel</p></figcaption></figure>

### Exportation réussie

🎉 Félicitations ! Profitez de l'intégration Obsidian 🎉

<figure><img src="../.gitbook/assets/image (140).webp" alt=""><figcaption><p>Exportation vers Obsidian</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (139).webp" alt=""><figcaption><p>Vérifier le résultat</p></figcaption></figure>
```