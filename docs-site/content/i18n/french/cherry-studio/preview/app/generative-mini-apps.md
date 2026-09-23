---
icon: wand-magic-sparkles
---
# Mini-apps génératives

Les mini-apps génératives sont des applications Web locales exécutées dans la section [Mini-apps] de Cherry Studio. Leur interface et leur flux de travail sont personnalisables et peuvent appeler les modèles d'IA configurés dans Cherry Studio via `window.cherry`, transformant un modèle générique en assistant de rédaction, extracteur d'informations, outil d'apprentissage ou application métier dédiée.

La différence avec les mini-apps de type site Web ne réside pas dans l'apparence, mais dans la source des capacités : une mini-app de type site Web ouvre simplement une URL ; une mini-app générative doit être empaquetée en `.miniapp`, installée et autorisée avant de pouvoir accéder aux capacités d'IA de Cherry, aux données en bac à sable, aux fichiers, aux notifications, au réseau et au presse-papiers.

{% hint style="info" %}
Cherry Studio fournit l'environnement d'exécution, le mécanisme d'autorisation et les interfaces d'IA. Vous pouvez développer vous-même la mini-app, ou utiliser un outil de programmation par IA pour générer le HTML, le CSS et le JavaScript, puis l'empaqueter et l'installer selon les instructions de cette page.
{% endhint %}

## Objectifs et prérequis

Après avoir parcouru cette page, vous serez en mesure de :

* Installer et utiliser une mini-app générative fournie par un tiers ;
* Créer votre propre paquet `.miniapp` à partir d'un besoin simple ;
* Permettre à la mini-app d'appeler le [Modèle par défaut] ou le [Modèle rapide] de Cherry Studio ;
* Vérifier les autorisations, les journaux d'activité, le stockage, les mises à jour et l'état du désinstallation.

Pour utiliser une mini-app existante, il suffit de disposer d'un fichier `.miniapp` de confiance ou d'une URL d'installation. Pour en créer une, vous devez pouvoir éditer des fichiers Web et créer des archives ZIP ; pour tester les fonctionnalités d'IA, configurez d'abord un modèle de conversation fonctionnel dans Cherry Studio.

## Terminologie

| Terme | Nom dans l'interface | Définition sur cette page |
| ------ | ------------- | ----------------------------------------- |
| Mini-app générative | [Mini-apps génératives] | Mini-app à interface et flux personnalisables, capable d'appeler les capacités d'IA de Cherry Studio |
| Mini-app locale | [Mini-apps locales] | Type de mini-app installée via un paquet `.miniapp` et exécutée dans un bac à sable isolé |
| Mini-app de type site Web | [Sites Web] | Page Web ouverte via une URL, sans capacité `window.cherry` |
| Autorisations | [Autorisations] | Portée des capacités demandées lors de l'installation et examinées par l'utilisateur |
| Emplacements de modèles | [Modèle par défaut], [Modèle rapide] | Deux emplacements de modèles sélectionnés par l'utilisateur pour la mini-app ; la mini-app ne voit ni le fournisseur, ni le nom du modèle, ni la clé API |

## Chemin d'accès

Utiliser une mini-app existante : `【Lanceur】→【Mini-apps génératives】→【Mini-app locale】→sélectionner un fichier ou saisir une URL d’installation→vérifier les autorisations→【Installer】`

Vous pouvez également y accéder depuis la page Mini-apps : `【Lanceur】→【Mini-apps】→【Ajouter une mini-app】 en haut à droite→【Mini-app locale】`

Gérer les mini-apps installées : `【Mini-apps】→clic droit sur la mini-app→【Afficher les détails】`

## Étapes de procédure

### Installation et première utilisation

{% stepper %}
{% step %}
### Ouvrir l'entrée d'installation

Cliquez sur [Mini-apps génératives] dans le [Lanceur], ou accédez à [Mini-apps] puis cliquez sur [Ajouter une mini-app] en haut à droite. Dans le panneau affiché, basculez sur [Mini-apps locales].
{% endstep %}

{% step %}
### Choisir la source d'installation

Glissez-déposez un paquet `.miniapp` dans la zone d'installation, ou cliquez sur [Sélectionner un fichier…]. Si le développeur fournit une URL d'installation HTTPS, vous pouvez également coller l'URL puis cliquer sur [Charger].
{% endstep %}

{% step %}
### Examiner les autorisations

La page de confirmation d'installation affiche le nom, la version, la description et toutes les autorisations de la mini-app. Les autorisations obligatoires ne peuvent pas être désactivées ; les autorisations facultatives sont cochées par défaut, vous pouvez les décocher avant l'installation ou les ajuster après installation.

Ne continuez que si l'usage de la mini-app correspond aux autorisations demandées et que la source est de confiance. Les mini-apps nécessitant l'IA affichent généralement [Capacité IA] → [Conversation].
{% endstep %}

{% step %}
### Installer et ouvrir

Cliquez sur [Installer]. Une fois l'installation terminée, la mini-app apparaît dans la grille [Mini-apps] ; cliquez sur l'icône pour l'exécuter.
{% endstep %}
{% endstepper %}

### Sélectionner les modèles d'IA pour la mini-app

1. Dans la grille [Mini-apps], faites un clic droit sur la mini-app cible et sélectionnez [Voir les détails].
2. Basculez sur [Paramètres] et localisez [Modèles d'IA].
3. Configurez le [Modèle par défaut] et le [Modèle rapide] selon l'usage de la mini-app. Si laissés vides, ils suivent respectivement le modèle par défaut global et le modèle rapide global de Cherry Studio.
4. Rouvrez la mini-app et déclenchez une opération d'IA. Si aucun modèle n'est disponible, la mini-app doit indiquer que l'IA est temporairement indisponible.

Le [Modèle par défaut] convient aux tâches principales comme la génération de longs textes ou l'analyse complexe ; le [Modèle rapide] convient aux tâches à faible latence comme la suggestion de titres, la reformulation de phrases courtes ou l'extraction de balises. L'emplacement utilisé en fin de compte est déterminé par la conception de la mini-app.

### Créer une version minimale

Une mini-app générative est essentiellement un projet Web statique. L'arborescence minimale nécessite deux fichiers :

```
my-writer/
├── manifest.json
└── index.html
```

Créez d'abord `manifest.json` pour déclarer les informations de l'application et les autorisations `ai.chat` :

```json
{
  "id": "com.example.my-writer",
  "name": { "zh": "Assistant de reformulation", "en": "Rewrite Helper" },
  "description": "Saisissez un texte et faites-le reformuler par un modèle d’IA de Cherry Studio.",
  "version": "1.0.0",
  "entry": "index.html",
  "permissions": ["ai.chat"]
}
```

`id` Il est recommandé d'utiliser un format de domaine inversé que vous contrôlez, ne contenant que des lettres minuscules, des chiffres, des points et des tirets. `com.cherrystudio.*` est une plage réservée officiellement, ne l'utilisez pas.

Ensuite, dans `index.html`, appelez l'IA via l'objet global `cherry`. L'exemple ci-dessous vérifie d'abord la disponibilité du [Modèle par défaut], puis affiche le texte en flux segment par segment :

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="/__cherry/theme.css" />
    <title>Assistant de reformulation</title>
  </head>
  <body>
    <textarea id="source" placeholder="Saisissez le texte à reformuler"></textarea>
    <button id="rewrite">Reformuler</button>
    <pre id="result"></pre>

    <script>
      const button = document.querySelector('#rewrite')
      const source = document.querySelector('#source')
      const result = document.querySelector('#result')

      button.addEventListener('click', async () => {
        const capability = await cherry.ai.getCapabilities({ model: 'default' })
        if (!capability.available) {
          result.textContent = 'Configurez d’abord un modèle disponible dans les détails de la mini-app.'
          return
        }

        result.textContent = ''
        await cherry.ai.chat(
          {
            model: 'default',
            reasoning: 'off',
            messages: [
              { role: 'system', content: 'Vous êtes un éditeur de texte chinois. Conservez le sens tout en rendant la formulation plus claire.' },
              { role: 'user', content: source.value }
            ]
          },
          {
            callId: `rewrite-${Date.now()}`,
            onChunk: (text) => {
              result.textContent += text
            }
          }
        )
      })
    </script>
  </body>
</html>
```

`window.cherry` et `cherry` pointent vers le même ensemble d'interfaces hôte, aucun SDK n'est nécessaire. La mini-app ne peut envoyer que des messages texte ; l'entrée d'images et l'appel d'outils ne sont pas pris en charge pour le moment. Elle spécifie uniquement l'utilisation de l'emplacement `default` ou `quick`, sans accéder au nom du modèle, aux informations du fournisseur ou à la clé API.

### Empaquetage et test

1. Vérifiez que `manifest.json` se trouve à la racine du projet et que le fichier d'entrée correspond à `entry`.
2. Exécutez la compression dans le répertoire du projet ; sur macOS ou Linux, vous pouvez utiliser :

```bash
zip -r ../my-writer.miniapp . -x '.*' -x '__MACOSX/*'
```

Sous Windows PowerShell, vous pouvez d'abord générer un ZIP, puis changer l'extension en `.miniapp` :

```powershell
Compress-Archive -Path .\* -DestinationPath ..\my-writer.zip
Rename-Item ..\my-writer.zip my-writer.miniapp
```

3. Dans la zone d'installation [Mini-apps locales] de Cherry Studio, sélectionnez le `my-writer.miniapp` généré.
4. Vérifiez que la page d'installation ne demande que les autorisations attendues, puis installez, ouvrez et testez la saisie, la sortie IA, les messages d'erreur et l'état après réouverture.
5. Pour le débogage, ouvrez les [Outils de développeur] dans la barre d'outils de la mini-app pour consulter les erreurs de page et les requêtes bloquées par le bac à sable.

{% hint style="warning" %}
Ne compressez pas le dossier du projet entier depuis un répertoire parent, assurez-vous que la racine de l'archive contient directement `manifest.json`. Cherry Studio reconnaît également les archives avec un seul niveau de dossier englobant, mais une structure de racine claire facilite le dépannage.
{% endhint %}

## Résultat attendu

Après l'installation, vous devriez voir la nouvelle icône dans la grille [Mini-apps]. Une fois ouverte, saisissez du texte et cliquez sur le bouton ; la zone de résultats affichera continuellement le texte renvoyé par le modèle. Faites un clic droit sur la mini-app pour accéder à [Voir les détails], où vous pouvez consulter l'autorisation [Capacité IA] demandée, l'emplacement de modèle utilisé et les derniers enregistrements d'appels.

Si l'installation réussit mais que l'IA est indisponible, vérifiez d'abord les modèles dans [Voir les détails] → [Paramètres], puis vérifiez si [Capacité IA] → [Conversation] est autorisée dans [Autorisations].

## Captures d'écran clés

<figure><img src="../../../../../assets/e5eba0b497cc060dda3fe81c.webp" alt="Entrée [Mini-apps génératives] dans le Lanceur."><figcaption><p>Entrée [Mini-apps génératives] dans le Lanceur. </p></figcaption></figure>

1. Cliquez sur [Mini-apps génératives] pour ouvrir le panneau [Ajouter une mini-app].

<figure><img src="../../../../../assets/68bb09ec12fa8bbc76f5056c.webp" alt="Les mini-apps locales supportent l'installation depuis un fichier ou une URL."><figcaption><p>Les mini-apps locales supportent l'installation depuis un fichier ou une URL. </p></figcaption></figure>

1. Glissez-déposez un paquet `.miniapp` ou cliquez sur [Sélectionner un fichier…].
2. Vous pouvez également saisir l'URL d'installation HTTPS fournie par le développeur.

<figure><img src="../../../../../assets/de4dd1594767eab1bc306a63.webp" alt="La page [Autorisations] liste les capacités hôte auxquelles la mini-app est autorisée à accéder."><figcaption><p>La page [Autorisations] liste les capacités hôte auxquelles la mini-app est autorisée à accéder. </p></figcaption></figure>

1. Vérifiez que les autorisations [Capacité IA] ainsi que réseau, presse-papiers, fichiers, données et notifications correspondent à l'usage de la mini-app.

<figure><img src="../../../../../assets/c6d6fce45e39a96b639f24ee.webp" alt="Gérez les emplacements de modèles d'IA dans les détails de la mini-app."><figcaption><p>Gérez les emplacements de modèles d'IA dans les détails de la mini-app. </p></figcaption></figure>

1. Le [Modèle par défaut] gère les principales requêtes IA de la mini-app ; s'il est vide, il suit le modèle par défaut global.
2. Le [Modèle rapide] gère les requêtes à faible latence spécifiées par la mini-app ; s'il est vide, il suit le modèle rapide global.

{% hint style="info" %}
L'interface et la sortie réelles de la mini-app sont déterminées par la mini-app elle-même ; l'image ci-dessus utilise un exemple de test de capacités officiel pour illustrer l'emplacement des autorisations et de la gestion des modèles après installation.
{% endhint %}

## Notes de configuration

| Paramètre | Valeur par défaut du produit | Point de départ recommandé | Rôle | Cas d'usage | Remarques |
| ----- | --------------------- | ------------------------ | ----------------------- | -------------- | ----------------------- |
| Source d'installation | — | Utiliser un fichier `.miniapp` local pour le premier test | Détermine l'installation depuis un paquet local ou une URL HTTPS | Tests personnels, distribution d'équipe | Vérifiez d'abord l'éditeur, le code source et les autorisations des mini-apps tierces |
| Autorisation IA | Déclarée par la mini-app ; les autorisations facultatives sont cochées par défaut à l'installation | N'accorder que les autorisations nécessaires à la fonctionnalité | Autorise l'appel de `cherry.ai.chat()` | Toutes les fonctionnalités IA | Les autorisations obligatoires ne peuvent pas être révoquées individuellement ; désinstallez si vous ne faites plus confiance |
| Modèle par défaut | Suit le modèle par défaut global | Utilisez un modèle de conversation vérifié et fonctionnel | Gère les tâches principales de génération et d'analyse | Longs textes, instructions complexes, sortie structurée | Les appels comptent dans l'utilisation du service du modèle correspondant |
| Modèle rapide | Suit le modèle rapide global | Choisissez un modèle plus réactif pour les tâches courtes | Gère les tâches à faible latence | Modification de titres, complétion, classification, extraction de balises | La mini-app doit explicitement sélectionner `quick` pour l'utiliser |
| Mode de raisonnement | Désactivé si non transmis par la mini-app | Désactivé d'abord pour les reformulations simples | Permet aux modèles supportant le raisonnement de raisonner d'abord | Analyses complexes, planification | Les modèles ne supportant pas le basculement ignorent ce paramètre |
| Thème de style | Suit le thème clair/sombre de Cherry Studio | Référence `/__cherry/theme.css` | Utilise les variables de couleur fournies par l'hôte | Toutes les interfaces personnalisées | Les ressources CDN externes sont bloquées par le bac à sable, elles doivent être empaquetées dans l'application |

### Quelles autres capacités peuvent être appelées

| Capacité | Usage | Déclaration |
| --------------------- | ----------------------- | ---------------------------------- |
| `cherry.storage` | Enregistrer les paramètres et l'état sous forme de chaînes de caractères | `storage.*` ou méthodes spécifiques |
| `cherry.file` | Enregistrer, lire et exporter des fichiers dans le bac à sable propre à la mini-application | `file.*` ou méthodes spécifiques |
| `cherry.notification` | Envoyer des notifications système via Cherry Studio | `notification.show` |
| `cherry.network` | Accéder aux domaines HTTPS déclarés dans le manifeste | `network.fetch`, et remplir la liste des domaines `network` |
| `cherry.clipboard` | Lire et écrire du texte brut lorsque la mini-application est visible et possède le focus clavier | `clipboard.read`, `clipboard.write` |
| `cherry.app` | Lire la version de l'application, la langue et les autorisations actuelles | Aucune déclaration requise |

Les mini-applications locales ne peuvent pas utiliser directement `localStorage`, les `fetch` du navigateur, les cookies, les boîtes de dialogue ou les CDN externes. Utilisez `cherry.storage` pour enregistrer l'état, et `cherry.network.fetch` pour les connexions réseau, en déclarant les domaines autorisés dans le manifeste.

## Cas d'usage

| Scénario | Entrée | Action de la mini-application | Indicateur de réussite |
| ------- | ----------- | ------------------------- | -------------- |
| Rédaction et reformulation | Brouillon, ton et nombre de mots requis | Générer le contenu avec le [Modèle par défaut] et proposer des titres alternatifs avec le [Modèle rapide] | Conserver le sens initial et basculer rapidement entre différentes formulations |
| Synthèse de comptes rendus | Compte rendu de réunion collé | Extraire les conclusions, les responsables et les échéances, puis les formater selon une mise en page fixe | Chaque action a un responsable et un champ horaire |
| Traduction multilingue | Texte source, langue cible et glossaire | Fixer les termes et le format de sortie dans le message système, afficher la traduction en flux | Cohérence des termes techniques et préservation de la structure des paragraphes |
| Extraction d'informations structurées | Contrat, CV ou texte de retour | Exiger du modèle un retour selon des champs fixes, puis vérifier les éléments manquants côté page | Champs obligatoires complets, contenu anormal signalé |
| Exercices d'apprentissage | Notes, types de questions et niveau de difficulté | Générer des questions, des indices et des explications, et enregistrer la progression dans les données du bac à sable | Poursuite de l'exercice précédent après réouverture |
| Flux de travail sectoriels | Modèles d'équipe et règles métier | Combiner saisie, traitement IA, validation humaine et export dans une seule interface | Tâches répétitives réalisées de manière stable selon le même processus |

{% hint style="warning" %}
Les résultats des mini-applications génératives sont toujours produits par le modèle sélectionné. Pour les usages à haut risque (médical, juridique, financier) et les données impactant des opérations officielles, une revue par une personne qualifiée est obligatoire.
{% endhint %}

## FAQ

<details>

<summary>Pourquoi ne puis-je pas appeler Cherry AI après avoir saisi une URL de site web ?</summary>

[Site web] sert uniquement à ouvrir des pages web et n'injecte pas `window.cherry` dans la page. Veuillez créer l'application sous forme de paquet `.miniapp` et l'installer via [Mini-application locale].

</details>

<details>

<summary>La mini-application peut-elle voir ma clé API ou mon fournisseur de modèle ?</summary>

Non. La mini-application ne demande que les emplacements [Modèle par défaut] ou [Modèle rapide]. Cherry Studio exécute les appels à sa place et n'expose ni le nom du modèle, ni les informations du fournisseur, ni la clé API à la mini-application.

</details>

<details>

<summary>Pourquoi l'IA est-elle signalée comme indisponible après l'installation ?</summary>

Ouvrez d'abord [Voir les détails] → [Paramètres] pour vérifier qu'un modèle est disponible dans l'emplacement de modèle concerné ; puis allez dans [Autorisations] pour confirmer que [Capacité IA] → [Conversation] est autorisée. Si cette autorisation est obligatoire mais que vous ne faites plus confiance à l'application, désinstallez-la directement.

</details>

<details>

<summary>Comment vérifier quelles capacités la mini-application a appelées ?</summary>

Ouvrez [Voir les détails] → [Journal d'activité]. Cet enregistrement liste les appels externes (IA, réseau, presse-papiers, export de fichiers) ainsi que les appels refusés, mais ne contient ni les prompts, ni les réponses du modèle, ni le contenu du presse-papiers ou des fichiers.

</details>

<details>

<summary>Quelle est la différence entre mise à jour, retour arrière et effacement des données ?</summary>

La mise à jour conserve les données du bac à sable et demande à nouveau confirmation en cas de nouvelles autorisations ; un retour arrière vers la version précédente est possible après la mise à jour. L'effacement des données supprime les données et fichiers enregistrés par la mini-application, mais conserve l'application ; la désinstallation supprime l'application, les autorisations et les données.

</details>

## Références

* [Documentation de développement et liste communautaire des MiniApps Cherry Studio](https://github.com/CherryHQ/cherry-studio-miniapps/blob/main/README.zh-CN.md)
* [Documentation de référence officielle des MiniApps](https://github.com/CherryHQ/cherry-studio/tree/main/docs/references/mini-app)
* [Format du manifeste](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/manifest.md)
* [Interfaces de capacités](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/capabilities.md)
* [Emballage, mise à jour et désinstallation](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/packaging.md)
