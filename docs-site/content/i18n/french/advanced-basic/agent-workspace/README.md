---
icon: robot
---
# Espace de travail de l'Agent

L'Agent est conçu pour les tâches ayant un objectif clair, nécessitant l'utilisation d'outils ou de fichiers, et pouvant s'étendre sur plusieurs étapes. L'entrée se trouve dans la navigation latérale gauche sous l'onglet 【Travail】, et non dans l'onglet supérieur des anciens tutoriels.

{% hint style="success" %}
La méthode de configuration la plus simple consiste d'abord à indiquer à l'Agent ce que vous souhaitez accomplir, puis à lui demander de vérifier les modèles, outils, bases de connaissances ou canaux manquants. Pour un contrôle précis, ouvrez ensuite la fenêtre d'édition de l'Agent ou les 【Paramètres】 pour effectuer des ajustements manuels.
{% endhint %}

<figure><img src="../../../../assets/2573aee0510e0d6abdabab7f.webp" alt="Espace de travail de l'Agent — Illustration"><figcaption></figcaption></figure>

<figure><img src="../../../../assets/e7c3b90701b9b2b38da25043.webp" alt="Espace de travail de l'Agent — Illustration"><figcaption></figcaption></figure>

### Composition de l'espace de travail

| Élément | Rôle | Quand s'en préoccuper |
| ----- | ----------------- | ----------------- |
| Agent | Stocke le rôle, le modèle, les prompts et les capacités | Pour les tâches récurrentes du même type |
| Tâche | Enregistre une session de travail continue | Créez une tâche distincte pour chaque objectif afin de préserver le contexte |
| Dossier de travail | Périmètre des fichiers que l'Agent peut traiter directement | Pour les tâches de code, de tri de documents ou de génération de fichiers |
| Zone de saisie | Envoie les objectifs, les pièces jointes et appelle les outils | Pour lancer une tâche ou ajouter des exigences |
| Panneau latéral droit | Affiche l'état, les fichiers, les sous-tâches et le flux de messages | Pour suivre les tâches longues, vérifier les livrables ou dépanner |

### Démarrer une tâche

{% stepper %}
{% step %}
#### 1. Ouvrir 【Travail】 et sélectionner l'Agent

Sélectionnez directement un Agent existant s'il convient. Sinon, cliquez sur 【Ajouter un agent】, choisissez d'abord le mode d'exécution dans 【Informations de base】, puis finalisez la création en quatre étapes : prompt système, compétences et base de connaissances. Le mode d'exécution ne peut pas être modifié après la création.
{% endstep %}

{% step %}
#### 2. Sélectionner le dossier de travail

Si vous devez traiter des fichiers locaux, sélectionnez le dossier correspondant à la tâche en cours. En l'absence de fichiers, vous pouvez utiliser l'espace de travail par défaut créé par l'application. Une tâche correspond à un espace de travail, afin d'éviter que l'Agent ne cherche dans des dossiers non pertinents.
{% endstep %}

{% step %}
#### 3. Décrire la tâche par le résultat attendu

Indiquez à l'Agent ce qu'il doit livrer, les ressources utilisables, les contraintes et les critères de réussite. Par exemple :

```
Lisez les comptes rendus de réunion du dossier actuel, puis rassemblez les décisions, les responsables et les échéances dans action-items.md. Ne modifiez pas les fichiers d’origine.
```
{% endstep %}

{% step %}
#### 4. Vérifier le processus et les livrables dans le panneau latéral droit

【État】 affiche les tâches actives, les sous-agents, les flux de travail et les commandes en arrière-plan ; 【Fichiers】 permet d'apercevoir et d'éditer les livrables textuels ; en activant le mode développeur, vous pouvez également consulter la 【Chaîne d'appels】.
{% endstep %}
{% endstepper %}

### Rappels sur la passerelle API

Le fonctionnement de l'Agent dépend de la passerelle API de Cherry Studio. Si la passerelle n'est pas activée, l'application affichera un message 【Activer et démarrer】. Vous pouvez également vérifier le port, l'état d'exécution et les éventuels blocages par les logiciels de sécurité locaux via 【Paramètres】 → 【Passerelle API】.

{% hint style="warning" %}
La passerelle API est une dépendance d'exécution de l'Agent, mais cela ne signifie pas qu'il faut exposer l'interface au réseau. Maintenez l'utilisation locale par défaut ; ne copiez l'URL et la clé API que si vous devez explicitement permettre à d'autres programmes de l'appeler.
{% endhint %}

### Un seul Agent ou plusieurs Agents

* Même rôle, mêmes capacités mais tâches différentes : réutilisez un Agent et créez plusieurs tâches.
* Rôle, périmètre des ressources ou permissions différents : créez plusieurs Agents.
* Un objectif nécessitant des recherches parallèles ou une collaboration multi-étapes : utilisez d'abord un Agent avec des sous-agents ou des flux de travail, sans créer immédiatement de nombreux Agents manuellement.

### Cas d'usage : organiser les documents de projet

Un chef de produit place les spécifications de besoins, les comptes rendus d'entretiens et les documents concurrents dans le même dossier. Il crée un Agent « Organisation des besoins », lie la base de connaissances produit et utilise la permission 【Confirmation à chaque étape】. L'Agent lit d'abord les documents, puis écrit la liste des besoins et les questions à confirmer dans un nouveau fichier. Le chef de produit modifie directement le texte dans 【Fichiers】 à droite, tandis que les documents d'origine restent inchangés.

<details>

<summary>Pourquoi l'Agent ne voit-il pas les capacités nouvellement liées ?</summary>

Les modifications de l'Agent sont enregistrées automatiquement. La réponse en cours de génération n'est pas interrompue ; les changements de modèle, de compétences, de MCP et de base de connaissances prendront effet à partir du prochain message. Si le problème persiste, vérifiez que la capacité est activée, puis envoyez un nouveau message.

</details>

<details>

<summary>La suppression du dossier de travail supprime-t-elle aussi les fichiers sur le disque ?</summary>

Lors de la suppression d'un dossier de travail dans la liste des tâches, seules l'enregistrement du dossier dans Cherry Studio et les enregistrements des tâches associées sont supprimés. Le dossier réel sur le disque n'est pas supprimé. Les opérations sur les fichiers effectuées par l'Agent pendant l'exécution de la tâche restent soumises au mode de permission sélectionné.

</details>

<details>

<summary>La suppression du dossier de travail supprime-t-elle aussi les fichiers sur le disque ?</summary>

Lors de la suppression d'un dossier de travail dans la liste des tâches, seules l'enregistrement du dossier dans Cherry Studio et les enregistrements des tâches associées sont supprimés. Le dossier réel sur le disque n'est pas supprimé. Les opérations sur les fichiers effectuées par l'Agent pendant l'exécution de la tâche restent soumises au mode de permission sélectionné.

</details>
