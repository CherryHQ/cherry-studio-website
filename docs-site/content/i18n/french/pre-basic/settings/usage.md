---
icon: chart-line
---
# Statistiques d'utilisation

Les statistiques d'utilisation **récapitulent vos appels de modèles dans Cherry Studio sous forme de tableau de bord visuel** : coût engagé, nombre de Tokens consommés, nombre de requêtes envoyées, modèle le plus utilisé, le tout en un coup d'œil. Elles vous aident à estimer les coûts, à détecter les consommations anormales et à arbitrer l'usage entre différents modèles.

Ouvrez `Paramètres → Statistiques d’utilisation`. La page est divisée en trois sections : **Aperçu / Exploration / Requêtes**. En haut à droite, vous pouvez basculer entre **Derniers 30 jours / Derniers 90 jours / Dernière année** ; toutes les données sont calculées sur la période sélectionnée.

<figure><img src="../../../../assets/9ccf4fd668065e8e789301e5.webp" alt=""><figcaption><p>Statistiques d'utilisation [Aperçu] : cartes d'indicateurs en haut + carte de chaleur de l'activité quotidienne en bas (le coût total est masqué sur l'image) </p></figcaption></figure>

### Aperçu

Un ensemble de cartes d'indicateurs en haut :

| Indicateur | Signification |
| --- | --- |
| **Coût total** | Coût estimé sur la période (converti selon les tarifs publics de chaque modèle, à titre indicatif uniquement) |
| **Nombre de requêtes** | Nombre total de requêtes initiées |
| **Total des Tokens** | Volume total de Tokens en entrée + sortie |
| **Taux de cache** | Proportion de lectures de cache de prompt (lectures de cache ÷ entrées observables) ; plus il est élevé, plus vous économisez |
| **Jours actifs / Plus longue série** | Nombre de jours avec des enregistrements d'utilisation et nombre de jours consécutifs d'utilisation |
| **Pic d'activité** | Date du jour le plus utilisé et volume de Tokens correspondant |
| **Modèle le plus utilisé** | Modèle ayant consommé le plus sur la période |
| **Moyenne quotidienne** | Volume moyen de Tokens et nombre de requêtes par jour |

La **carte de chaleur de l'activité quotidienne** en bas affiche l'intensité d'utilisation par jour. Vous pouvez basculer entre les dimensions **Tokens / Coût** ; plus la couleur est foncée, plus l'utilisation du jour est élevée.

### Exploration / Analyse

Basculez sur **Exploration** pour analyser la répartition de l'utilisation : découpez par **Groupe** (fournisseur / modèle / clé API / assistant·Agent), sélectionnez un **Indicateur**, puis visualisez la distribution et les tendances via des **graphiques en barres / courbes / camembert / segments**.

### Détails des requêtes

**Requêtes** liste chaque enregistrement de requête, facilitant l'identification des requêtes responsables de la majeure partie de la consommation.

> Pour voir les détails d'un jour spécifique ? Cliquez sur un jour dans la **carte de chaleur de l'activité quotidienne** de l'Aperçu ; la zone d'exploration (Analyse + Requêtes) **descendra** au niveau de ce jour, et le titre deviendra « Détails du [jour] ». Cliquez sur « Effacer le filtre de date » pour revenir.

{% hint style="info" %}
Le coût est une **estimation** : il est converti selon les tarifs publics des modèles. La facturation réelle reste soumise aux factures des fournisseurs de modèles. Les modèles gratuits et locaux ne génèrent aucun coût.
{% endhint %}

***

### Obtenir de l'aide et envoyer des retours

Si vous avez des questions, des bugs ou des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
