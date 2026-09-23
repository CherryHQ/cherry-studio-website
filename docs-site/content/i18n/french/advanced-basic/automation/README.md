---
icon: gears
---
# Automatisation et interactions externes

L'automatisation dans Cherry Studio ne se résume pas à un simple ensemble de « paramètres de robot ». L'Agent exécute les tâches, les canaux gèrent la réception et l'envoi de messages depuis des plateformes externes, les tâches planifiées lancent l'Agent à des heures précises, et le battement de cœur permet à l'Agent de vérifier périodiquement ses tâches continues.

<figure><img src="../../../../assets/c348e2cb27a028b3789ac09b.webp" alt="La déclenchement, l'exécution, la notification et l'historique d'exécution sont des étapes distinctes ; commencez par exécuter manuellement l'Agent, puis intégrez progressivement les autres composants."><figcaption><p>La déclenchement, l'exécution, la notification et l'historique d'exécution sont des étapes distinctes ; commencez par exécuter manuellement l'Agent, puis intégrez progressivement les autres composants. </p></figcaption></figure>

## Comment ces quatre éléments collaborent

| Fonction | Rôle | Cas d'usage typique |
| ----- | --------------- | ------------------ |
| Agent | Exécute les tâches et génère les résultats | Synthèse, vérification, rédaction, traitement de fichiers |
| Canal | Reçoit les messages externes et envoie des notifications | Robot de groupe Feishu, messagerie privée Telegram |
| Tâche planifiée | Exécute l'Agent à des heures définies | Rapports quotidiens, rapports hebdomadaires, rappels ponctuels |
| Battement de cœur | L'Agent vérifie les tâches continues à intervalles réguliers | Surveillance de processus longs, vérification des éléments en attente |

<figure><img src="../../../../assets/e2328ba60a3ff5012831c39e.webp" alt="Les canaux permettent de connecter l'Agent à Feishu, Telegram, QQ, WeChat, Discord ou Slack."><figcaption><p>Les canaux permettent de connecter l'Agent à Feishu, Telegram, QQ, WeChat, Discord ou Slack. </p></figcaption></figure>

## Ordre de configuration recommandé

{% stepper %}
{% step %}
### 1. D'abord, tester la tâche dans [Travail]

Vérifiez que le modèle, le prompt, le répertoire de travail et les outils de l'Agent produisent de manière stable les résultats attendus.
{% endstep %}

{% step %}
### 2. Ensuite, demander à l'Agent de configurer le canal

Précisez la plateforme et l'objectif dans la conversation avec l'Agent, par exemple « Connecter cet Agent au groupe Feishu pour recevoir les demandes de rapport quotidien ». Préparez les autorisations et les identifiants du robot selon les instructions.
{% endstep %}

{% step %}
### 3. Vérifier l'état via la configuration manuelle

Ouvrez [Paramètres] → [Canaux], vérifiez les identifiants, l'Agent lié, l'espace de travail, la portée des sessions autorisées et le mode d'autorisation du canal, puis envoyez un message de test.
{% endstep %}

{% step %}
### 4. Enfin, créer la tâche planifiée

Vous pouvez demander à l'Agent de la créer, ou ouvrir [Paramètres] → [Tâches planifiées] → [Nouveau]. Sélectionnez l'Agent validé, l'espace de travail, l'heure et le canal de notification.
{% endstep %}
{% endstepper %}

## Vérifications avant mise en production

* Les canaux n'autorisent que les sessions ou les identifiants de canal nécessaires ;
* Les points d'entrée externes utilisent [Hériter des paramètres de l'Agent] ou des autorisations plus strictes ;
* Les prompts des tâches planifiées ne contiennent pas de clés ou de chemins variables ;
* Effectuez d'abord une [Exécution] manuelle et consultez l'historique d'exécution ;
* En cas d'échec, vous pouvez identifier la tâche correspondante dans Cherry Studio, afin de ne pas confondre « non envoyé » avec « non exécuté ».

## Cas d'usage : Rapport quotidien d'exploitation en semaine

L'Agent « Rapport quotidien d'exploitation » lit les données depuis le répertoire de travail et génère le rapport selon les compétences de l'équipe. Le canal Feishu transmet le résultat au groupe désigné, et la tâche planifiée s'exécute chaque matin en semaine. Avant la mise en production, exécutez manuellement la tâche, puis envoyez un message au robot dans Feishu pour définir la cible de réception, et activez enfin le plan.

<details>

<summary>Quelle est la différence entre le battement de cœur et la tâche planifiée ? </summary>

Le battement de cœur permet à l'Agent de vérifier les tâches continues à intervalles réguliers, ce qui convient à « y a-t-il des nouveautés ? ». La tâche planifiée dispose d'un plan d'exécution précis et d'un historique d'exécution, ce qui convient à « que faire à quelle heure chaque jour ? ». Pour un rapport quotidien fixe, privilégiez la tâche planifiée.

</details>
