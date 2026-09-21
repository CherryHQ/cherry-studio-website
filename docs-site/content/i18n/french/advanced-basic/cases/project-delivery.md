---
icon: folder
---
# Livraison de fichiers de projet par l'Agent

Les collègues opérationnels doivent organiser un ensemble de documents épars en index, résumés et fichiers de livraison. Pour éviter toute modification accidentelle des originaux, il est nécessaire de définir à l'avance le répertoire de travail de l'Agent, la portée des modifications autorisées et la méthode de validation.

## Tâches appropriées

* Organiser des documents épars en table des matières et index ;
* Générer plusieurs documents à partir d'un modèle ;
* Modifier du code et laisser une description des changements ;
* Renommer, convertir ou vérifier des fichiers en lot.

<figure><img src="../../../../assets/2573aee0510e0d6abdabab7f.webp" alt="L'espace de travail de l'Agent regroupe la tâche, le modèle, le répertoire de travail et les fichiers de livraison sur la même page."><figcaption><p>L'espace de travail de l'Agent regroupe la tâche, le modèle, le répertoire de travail et les fichiers de livraison sur la même page. </p></figcaption></figure>

<figure><img src="../../../../assets/401d6b23759ab97ded47c2b5.webp" alt="Pour les tâches longues, vérifiez d'abord le panneau [État] pour savoir si la tâche est en cours d'exécution, en attente d'approbation ou terminée."><figcaption><p>Pour les tâches longues, vérifiez d'abord le panneau [État] pour savoir si la tâche est en cours d'exécution, en attente d'approbation ou terminée. </p></figcaption></figure>

<figure><img src="../../../../assets/4e1d6cc47405edfe8d6fe315.webp" alt="Après la génération des livrables, ouvrez-les réellement pour les vérifier. L'aperçu du site web dans l'image affiche déjà le titre, les éléments de contrôle et les recommandations, ce n'est pas un espace réservé vide."><figcaption><p>Après la génération des livrables, ouvrez-les réellement pour les vérifier. L'aperçu du site web dans l'image affiche déjà le titre, les éléments de contrôle et les recommandations, ce n'est pas un espace réservé vide. </p></figcaption></figure>

## Processus opérationnel

{% stepper %}
{% step %}
### 1. Sélectionner le répertoire de travail minimal

Sélectionnez uniquement le répertoire du projet actuel. Assurez-vous que les fichiers importants disposent d'une sauvegarde ou d'un historique de versions, et commencez avec la permission [Confirmation à chaque étape].
{% endstep %}

{% step %}
### 2. Définir clairement la portée modifiable et non modifiable

Précisez quels fichiers sont en lecture seule, où placer les livrables, quelles opérations nécessitent une confirmation préalable, ainsi que les critères d'achèvement.
{% endstep %}

{% step %}
### 3. Demander d'abord à l'Agent de dresser un plan

Pour les tâches à haut risque, utilisez [Planification uniquement]. Après avoir confirmé la liste des fichiers et les étapes, passez au mode permettant l'édition pour l'exécution.
{% endstep %}

{% step %}
### 4. Vérifier l'état et les fichiers à droite

Pour les tâches longues, vérifiez d'abord si l'[État] est en attente d'approbation ; après la génération des livrables, prévisualisez-les dans [Fichiers]. Confirmez l'absence d'erreurs avant la transmission, sans remplacer la validation par la simple fin de la tâche.
{% endstep %}
{% endstepper %}

## Exemple de tâche

```
Organisez le dossier actuel. Les fichiers de raw/ sont en lecture seule ; créez dans deliverables/ un index, un résumé et la liste des documents manquants. Demandez confirmation avant toute suppression, tout remplacement ou renommage groupé. Terminez par la liste des fichiers ajoutés et modifiés.
```

## Combinaisons recommandées

| Capacité | Utilisation suggérée | Pourquoi |
| ---- | ------------ | ----------------- |
| Répertoire de travail | Utiliser un répertoire indépendant pour chaque projet | Clarté des limites des fichiers et de l'emplacement de livraison |
| Permissions | Maintenir [Confirmation à chaque étape] pour la modification des fichiers | Facilite la détection des suppressions accidentelles, des écrasements et des écritures hors périmètre |
| Panneau d'état | Vérifier les livrables et les étapes échouées avant la fin | Ne pas se fier uniquement à « l'Agent a terminé » |
| Nouvelle tâche | Ouvrir une nouvelle tâche pour une nouvelle phase ou un nouveau client | Éviter que les exigences historiques n'affectent la livraison actuelle |

{% hint style="danger" %}
[L'accès complet] réduit les confirmations, mais augmente l'impact des erreurs. N'envisagez son utilisation temporaire que dans des répertoires isolés, fiables et réversibles.
{% endhint %}
