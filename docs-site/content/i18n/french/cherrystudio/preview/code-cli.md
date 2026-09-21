---
icon: terminal
---
# Compagnon de codage

【Compagnon de codage】permet d'installer, de configurer et de démarrer les outils de ligne de commande de programmation courants. Cherry Studio reconnaît ses propres installations gérées et détecte également les CLI déjà disponibles dans l'environnement de connexion du système ; les outils système restent gérés par le gestionnaire de paquets d'origine.

<figure><img src="../../../../assets/565c03d38bfd4fabef8d3013.webp" alt="Vérifiez d'abord que l'outil est installé et que sa version est disponible, puis configurez la connexion au modèle et le répertoire du projet."><figcaption><p>Vérifiez d'abord que l'outil est installé et que sa version est disponible, puis configurez la connexion au modèle et le répertoire du projet. </p></figcaption></figure>

## Fonctionnalités de la page

* Vérifier si l'outil est installé et s'il existe des mises à jour disponibles ;
* Installer ou mettre à jour les copies d'outils gérées par Cherry Studio ;
* Détecter les outils déjà présents dans le PATH système ;
* Sélectionner le fournisseur et le modèle pour les CLI nécessitant un service de modèle ;
* Conserver la méthode de connexion native pour les CLI utilisant leur propre compte ;
* Lancer l'outil après avoir sélectionné le répertoire de travail et le terminal détecté par le système.

La page inclut actuellement des outils tels que Claude Code, OpenAI Codex, Gemini CLI, OpenCode, Qwen Code, Kimi Code, Qoder CLI et GitHub Copilot CLI. Les éléments visibles peuvent varier selon les mises à jour du produit ; référez-vous à la liste de la page.

## Processus d'utilisation

{% stepper %}
{% step %}
### 1. Ouvrir la navigation latérale 【Compagnon de codage】

Sélectionnez l'outil souhaité et vérifiez d'abord son statut : non installé, géré par Cherry Studio ou provenant du système.
{% endstep %}

{% step %}
### 2. Terminer l'installation ou la connexion

Cliquez sur 【Installer】 si l'outil n'est pas installé. Pour les CLI qui fournissent leur propre connexion de compte, suivez les instructions de la page pour effectuer la connexion native ; il n'est pas nécessaire de sélectionner un fournisseur depuis Cherry Studio.
{% endstep %}

{% step %}
### 3. Configurer la connexion au modèle

Pour les outils nécessitant le service de modèle de Cherry Studio, sélectionnez un fournisseur et un modèle compatibles. La page filtre selon le type d'interface requis par le CLI ; les fournisseurs incompatibles ne sont pas listés.
{% endstep %}

{% step %}
### 4. Sélectionner le répertoire et le terminal

Le répertoire de travail détermine l'emplacement de démarrage du CLI. Le terminal ne peut être choisi que dans la liste détectée par le système ; la saisie manuelle du chemin d'un exécutable de terminal personnalisé n'est plus proposée.
{% endstep %}

{% step %}
### 5. Démarrer et vérifier

Cliquez sur 【Démarrer】 et exécutez une vérification en lecture seule dans le terminal. Confirmez que le compte, le modèle et le répertoire sont corrects avant d'effectuer des modifications de fichiers ou d'exécuter des commandes.
{% endstep %}
{% endstepper %}

## Modes de modèle pour Claude Code

Lors de la configuration de Claude Code, 【Modèle】 propose deux modes :

* 【Général】 : toutes les requêtes utilisent le même modèle, configuration simple ;
* 【Détail】 : configurez séparément Fable, Opus, Sonnet, Haiku et Subagent dans 【Cartographie des rôles de modèle】. La colonne 【Modèle de requête réel】 dans le tableau indique le modèle finalement utilisé par chaque rôle ; vous pouvez également activer le contexte 【1M】 pour les rôles concernés si nécessaire.

Utilisez le mode 【Détail】 uniquement si vous devez réellement attribuer des modèles différents aux rôles de sous-tâches en arrière-plan, de compression ou de titres. Les rôles laissés vides suivront le modèle principal. Après modification, effectuez d'abord une petite tâche pour vérifier que chaque rôle peut effectuer des requêtes normalement.

## Cas d'usage : Démarrer l'outil de codage dans le répertoire du projet

| Choix | Point de départ recommandé | Cas d'usage | Remarques |
| ----- | ----------------------------- | ------------ | ---------------- |
| Source d'installation | Utilisez d'abord la version système si elle existe | L'équipe gère déjà les CLI de manière centralisée | Les mises à jour et le désinstallation restent gérées par le gestionnaire de paquets d'origine |
| Connexion au modèle | Sélectionnez d'abord une connexion déjà validée dans Cherry Studio | CLI nécessitant un service de modèle | Les outils avec connexion de compte native suivent le processus natif |
| Répertoire de travail | Sélectionnez uniquement le répertoire du projet actuel | Modification de code, exécution de vérifications | Vérifiez le chemin du terminal après le démarrage |
| Première commande | Vérification en lecture seule de l'état du projet | Validation du compte, du modèle et du répertoire | Autorisez l'écriture de fichiers uniquement après confirmation |

### Critères de réussite

La page identifie la source d'installation ; le terminal s'ouvre dans le bon répertoire ; la commande minimale en lecture seule réussit ; le compte ou le modèle affiché par l'outil correspond aux attentes.

## Distinguer les sources d'installation

| Source | Ce que fait Cherry Studio | Comment vous devez le gérer |
| ---------------- | ------------------ | ------------------ |
| Géré par Cherry Studio | Installe, met à jour et désinstalle la copie gérée | Gérez-le dans 【Compagnon de codage】 ou 【Dépendances d'environnement】 |
| PATH système | Détecte et utilise directement, sans écraser | Mettez à jour ou désinstallez via le gestionnaire de paquets d'origine |
| Intégré à l'application | Utilise directement, ne propose pas de désinstallation au niveau système | Mis à jour avec Cherry Studio |

{% hint style="warning" %}
Après la désinstallation de la copie gérée par Cherry Studio, si un exécutable du même nom existe encore dans le système, la page basculera automatiquement sur la version système. En cas de changement de version ou de comportement, vérifiez d'abord quelle source est actuellement utilisée.
{% endhint %}

<details>

<summary>Pourquoi ne trouve-t-on pas un terminal ou un CLI déjà installé ? </summary>

Cherry Studio détecte les outils à partir de l'environnement de connexion et des emplacements standard. Vérifiez que la commande est exécutable dans un terminal de connexion, puis redémarrez l'application pour actualiser l'environnement. Les chemins portables ou non standard doivent actuellement être lancés manuellement depuis ce terminal.

</details>
