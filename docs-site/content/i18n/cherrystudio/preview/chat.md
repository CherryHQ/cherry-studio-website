---
icon: message
---
# Interface de conversation


{% hint style="warning" %}
Ce document a été traducido del chino por IA y aún no ha sido revisado.
{% endhint %}




## Assistants et sujets

### Assistant

L'**Assistant** permet de personnaliser les paramètres du modèle sélectionné pour l'utiliser, comme les préréglages de prompts et de paramètres. Ces réglages permettent d'aligner le modèle sur vos attentes de travail.

L'**Assistant par défaut du système** contient des paramètres génériques (sans prompt). Vous pouvez l'utiliser directement ou chercher des préréglages adaptés dans la [page des agents](agents.md).

### Sujets

L'**Assistant** est le parent des **Sujets**. Un assistant unique peut créer plusieurs sujets (conversations). Tous les sujets partagent les mêmes paramètres et prompts de l'assistant.

<figure><img src="../../../assets/e863b9cdc2435c9d7b1e91dc.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/30a39ba0a96eb6d826217c4f.webp" alt=""><figcaption></figcaption></figure>

## Boutons de la zone de dialogue

<figure><img src="../../../assets/fdcf8e3b0e55a63504fc7238.webp" alt=""><figcaption></figcaption></figure>

![](../../../assets/9e536331083a5a27f68997fb.webp) **Nouveau sujet** Crée un nouveau sujet dans l'assistant actuel.

![](../../../assets/4eda1305312bb9263e1ec6f8.webp) **Importer image ou document**  
- Images : nécessitent une prise en charge par le modèle  
- Documents : analysés automatiquement en texte comme contexte pour le modèle.

![](../../../assets/40fe4b3b13727e200a014ce3.webp) **Recherche web** Configurez d'abord les paramètres dans les réglages. Les résultats alimentent le contexte du modèle. Voir [Mode connecté](../../websearch/).

![](../../../assets/4bb46bc5c948c8853b078a89.webp) **Base de connaissances** Active la base de connaissances. Voir [Tutoriel base de connaissances](../../knowledge-base/knowledge-base.md).

![](<../../../assets/51c01fe5fc3adb9ea1476e03.webp>) **Serveur MCP** Active la fonctionnalité de serveur MCP. Voir [Guide MCP](../../advanced-basic/mcp/).

![](../../../assets/15bdbd61f9536315d90638e4.webp) **Générer une image** Non affiché par défaut. Pour les modèles compatibles (ex : Gemini), activez manuellement pour générer des images.

{% hint style="info" %}
Pour des raisons techniques, vous devez activer manuellement ce bouton pour générer des images. Il sera retiré après optimisation.
{% endhint %}

![](../../../assets/b1d22b708b5dbb0b805c338e.webp) **Choisir un modèle** Change le modèle pour les réponses suivantes tout en conservant le contexte.

![](../../../assets/aafbbb367102e03f884b3f2a.webp) **Phrases rapides** Utilisez des phrases prédéfinies dans les réglages. Supporte les variables.

![](../../../assets/774377d648904a9721ad6ea9.webp) **Effacer les messages** Supprime tout le contenu du sujet actuel.

![](../../../assets/b9c97923dbc2b65e7524cb9f.webp) **Agrandir** Agrandit la zone de dialogue pour les longs textes.

![](../../../assets/17ba49e1932f3db8841a4e84.webp) **Effacer le contexte** Réinitialise le contexte du modèle sans supprimer le contenu ("oubli" des conversations précédentes).

![](<../../../assets/29727668499dc7278b547488.webp>) **Estimation Tokens** Affiche :  
- `Contexte actuel`  
- `Contexte max` (∞ = illimité)  
- `Caractères saisis`  
- `Tokens estimés`

{% hint style="info" %}
Cette estimation est indicative. Les Tokens réels varient selon les modèles. Consultez les données du fournisseur.
{% endhint %}

![](../../../assets/aa570a6b1df6367e1f9ba250.webp) **Traduire** Traduit le contenu actuel en anglais.

## Paramètres de conversation

<figure><img src="../../../assets/0cca9215941b637287b69a09.webp" alt=""><figcaption></figcaption></figure>

### Paramètres du modèle

Synchronisés avec les `Paramètres du modèle` des paramètres de l'assistant. Voir [Édition de l'assistant](chat.md#bian-ji-zhu-shou).

{% hint style="info" %}
Seuls ces paramètres de modèle s'appliquent à l'assistant actuel. Les autres paramètres sont globaux (ex : style de bulles appliqué à tous les sujets).
{% endhint %}

### Paramètres des messages

#### <mark style="color:blue;">**`Séparateur de messages`**</mark> :

Ajoute une ligne de séparation entre le contenu et les actions.

{% tabs %}
{% tab title="Activé" %}
<figure><img src="../../../assets/27c00f0e8b8976ff9e7f76fe.webp" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Désactivé" %}
<figure><img src="../../../assets/43e2016cdf7003d8e73c0cc2.webp" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

#### <mark style="color:blue;">**`Utiliser les polices serif`**</mark> :

Change le style de police. Personnalisation via [CSS personnalisé](../../personalization-settings/).

#### <mark style="color:blue;">**`Afficher les numéros de ligne des blocs de code`**</mark> :

Affiche les numéros de ligne pour les extraits de code.

{% tabs %}
{% tab title="Désactivé" %}
<figure><img src="../../../assets/375eca868b4baada5b582357.webp" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Activé" %}
<figure><img src="../../../assets/cae91ce08edf117d619235bc.webp" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

#### <mark style="color:blue;">**`Blocs de code repliables`**</mark> :

Replie automatiquement les blocs de code longs.

#### <mark style="color:blue;">**`Retour à la ligne dans les blocs de code`**</mark> :

Retourne à la ligne automatiquement pour les longues lignes de code.

#### <mark style="color:blue;">**`Repli automatique des processus de réflexion`**</mark> :

Replie automatiquement le raisonnement des modèles après réflexion.

#### <mark style="color:blue;">**`Style des messages`**</mark> :

Bulle de discussion ou style liste.

#### <mark style="color:blue;">**`Thème des blocs de code`**</mark> :

Change le style d'affichage des extraits de code.

#### <mark style="color:blue;">**`Moteur de formules mathématiques`**</mark> :

* **KaTeX** : Rendu rapide (optimisé performance)
* **MathJax** : Rendu lent mais complet (plus de symboles)

#### <mark style="color:blue;">**`Taille de police des messages`**</mark> :

Ajuste la taille du texte.

### Paramètres de saisie

#### <mark style="color:blue;">**`Afficher l'estimation de Tokens`**</mark> :

Affiche les Tokens estimés pour le texte saisi (indicatif).

#### <mark style="color:blue;">**`Coller les longs textes en tant que fichier`**</mark> :

Transforme les longs textes collés en fichiers pour éviter les interférences.

#### <mark style="color:blue;">**`Rendu Markdown pour les messages entrants`**</mark> :

Désactivé : Ne rend que les réponses du modèle.  
Activé : Rend aussi les messages envoyés.

{% tabs %}
{% tab title="Désactivé" %}
<figure><img src="../../../assets/08d2b8f358084fe92f0f0165.webp" alt="" width="563"><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Activé" %}
<figure