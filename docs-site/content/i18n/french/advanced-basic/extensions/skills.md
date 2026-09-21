---
icon: graduation-cap
---
# Compétences et bibliothèque de capacités

Une compétence est un ensemble de consignes de travail réutilisables et de ressources associées. Elle ne gère pas la connexion aux systèmes externes, mais indique à l'Agent le processus, les normes et le format à suivre pour accomplir une tâche.

{% hint style="success" %}
Lorsqu'une méthode de travail spécifique est requise, indiquez d'abord votre objectif à l'Agent dans l'onglet 【Travail】 et demandez-lui de rechercher ou d'installer la compétence appropriée. N'ouvrez 【Paramètres】→【Compétences】 que si vous devez vérifier la source, gérer les compétences en masse ou en importer depuis un fichier local.
{% endhint %}

<figure><img src="../../../../assets/cc38d8a6378ca8270ceda746.webp" alt="Les méthodes réutilisées à plusieurs reprises conviennent à la création de compétences ; les ressources, les opérations intégrées et les systèmes externes utilisent chacun leur entrée dédiée."><figcaption><p>Les méthodes réutilisées à plusieurs reprises conviennent à la création de compétences ; les ressources, les opérations intégrées et les systèmes externes utilisent chacun leur entrée dédiée. </p></figcaption></figure>

### Installation de compétences

Chemin manuel : 【Paramètres】→【Compétences】.

La page prend en charge quatre sources :

* Recherche en ligne dans le registre de compétences ;
* Sélection de 【GitHub】 dans la recherche en ligne, puis collage du lien du fichier `SKILL.md` d'une compétence ;
* Installation depuis un fichier ZIP local ;
* Installation depuis un dossier contenant `SKILL.md`.

<figure><img src="../../../../assets/f0dcb151fa939ce15cda1e00.webp" alt="① Après avoir sélectionné 【GitHub】, collez le lien du fichier SKILL.md de la compétence cible ; la page analyse d'abord la compétence spécifique, puis propose l'installation."><figcaption><p>① Après avoir sélectionné 【GitHub】, collez le lien du fichier `SKILL.md` de la compétence cible ; la page analyse d'abord la compétence spécifique, puis propose l'installation. </p></figcaption></figure>

{% stepper %}
{% step %}
#### 1. Vérifier d'abord l'usage

Décrivez en une phrase le problème que la compétence doit résoudre, par exemple « organiser les comptes rendus de réunion en décisions, responsables et échéances ». Des noms similaires ne signifient pas des processus identiques ; lisez la description avant d'installer.
{% endstep %}

{% step %}
#### 2. Vérifier la source et le contenu

Ouvrez les détails de la compétence pour confirmer ce qu'elle demande à l'Agent, si elle contient des scripts, et si des outils supplémentaires ou des comptes externes sont nécessaires. N'utilisez pas directement les compétences de source inconnue sur des dossiers sensibles.
{% endstep %}

{% step %}
#### 3. Associer à l'Agent

Vérifiez d'abord dans 【Paramètres】→【Compétences】 que l'interrupteur global de cette compétence est activé, puis ouvrez 【Travail】→ Menu Agent →【Modifier】→【Compétences】 pour l'activer pour cet Agent. Le changement de compétence est automatiquement enregistré avec la configuration de l'Agent et prend effet à partir du prochain message.
{% endstep %}

{% step %}
#### 4. Valider avec une tâche réelle

Fournissez à l'Agent un petit échantillon, vérifiez que les étapes, le format de sortie et les limites correspondent aux attentes, avant de l'utiliser pour des tâches en masse ou planifiées.
{% endstep %}
{% endstepper %}

### Activation globale et activation par Agent

<figure><img src="../../../../assets/a05d3125f16b5cb41dd2e05b.webp" alt="① L'interrupteur à droite de la carte contrôle si la compétence est disponible pour tous les Agents ; une fois désactivé, la compétence n'apparaît plus dans la fenêtre de modification de l'Agent."><figcaption><p>① L'interrupteur à droite de la carte contrôle si la compétence est disponible pour tous les Agents ; une fois désactivé, la compétence n'apparaît plus dans la fenêtre de modification de l'Agent. </p></figcaption></figure>

| État | Effet | Quand l'utiliser |
| -------- | ------------------------ | ------------------------- |
| Activation globale | Permet à la compétence d'apparaître dans le catalogue de compétences disponibles de l'Agent | La source de la compétence est fiable, et elle peut encore être utilisée par un ou plusieurs Agents |
| Désactivation globale | Suspend l'utilisation de la compétence par tous les Agents, mais conserve le contenu installé | Désactivation temporaire, dépannage ou attente d'un contrôle de sécurité |
| Activation par Agent | Permet uniquement à l'Agent actuel de charger cette compétence | Le processus correspond aux responsabilités à long terme de l'Agent actuel |

<figure><img src="../../../../assets/f0dcb151fa939ce15cda1e00.webp" alt="Compétences et bibliothèque de capacités — Illustration"><figcaption></figcaption></figure>

La désactivation de l'interrupteur global ne désinstalle pas la compétence ; après réactivation, il faut toujours vérifier l'état d'activation de chaque Agent. La désinstallation supprime le contenu de la compétence et nettoie les associations.

### Comment choisir entre compétence, invite et MCP

| Besoin | À choisir | Raison |
| -------------- | ----------- | ------------- |
| Exigence temporaire unique | Invite de la tâche actuelle | Pas besoin d'ajouter une configuration à long terme |
| Réutilisation multiple du même processus | Compétence | Peut enregistrer simultanément les consignes, les modèles et les ressources |
| Définition du rôle à long terme de l'Agent | Invite système de l'Agent | Doit être respectée pour chaque tâche |
| Accès à une base de données ou à un service externe | MCP | La compétence elle-même ne fournit pas de capacité de connexion |

### Cas d'usage : Compétence de rapport hebdomadaire d'équipe

L'équipe a rédigé les rubriques du rapport hebdomadaire, le ton, la vérification des données et les expressions interdites sous forme de compétence, associée à l'Agent « Organisation du rapport hebdomadaire ». Chaque semaine, il suffit de fournir les ressources de la semaine ; l'Agent produit une structure fixe selon la compétence ; si les données proviennent de systèmes externes, combinez MCP, au lieu d'écrire les détails de compte et d'interface dans le corps de la compétence.

{% hint style="danger" %}
La désinstallation de la compétence la retire de la bibliothèque de capacités globale et nettoie les associations dans l'espace de travail de l'Agent. Avant d'exécuter, assurez-vous qu'aucune tâche n'utilise actuellement cette compétence ; les compétences personnalisées par l'équipe doivent conserver des fichiers sources récupérables.
{% endhint %}

<details>

<summary>Pourquoi l'Agent n'utilise-t-il pas la compétence après l'installation ? </summary>

Vérifiez d'abord que la compétence n'est pas désactivée globalement, puis activez-la dans 【Compétences】 de la fenêtre de modification de l'Agent, ou demandez à l'Agent de finaliser l'association. Envoyez ensuite un nouveau message pour tester.

</details>

<details>

<summary>Une compétence peut-elle contenir des programmes ? </summary>

Un paquet de compétences peut contenir des consignes, des ressources et des scripts. La possibilité d'exécuter des scripts dépend également des outils de l'Agent, du répertoire de travail, des dépendances d'environnement et du mode de permissions.

</details>

<details>

<summary>Une compétence peut-elle contenir des programmes ? </summary>

Un paquet de compétences peut contenir des consignes, des ressources et des scripts. La possibilité d'exécuter des scripts dépend également des outils de l'Agent, du répertoire de travail, des dépendances d'environnement et du mode de permissions.

</details>
