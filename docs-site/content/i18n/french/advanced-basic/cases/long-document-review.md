---
icon: file-lines
---
# Relecture de documents longs

Un responsable produit reçoit un document de grande envergure et doit identifier les erreurs factuelles, les lacunes structurelles et les modifications actionnables, tout en conservant le brouillon original et le processus de validation humaine. La méthode suivante convient aux rapports, aux réglementations, aux dossiers d'appel d'offres et aux propositions de produit.

## Combinaison recommandée

* 【Dialogue】 : comparer rapidement les angles de relecture de différents modèles ;
* 【Travail】 Agent : lire le répertoire de travail et générer un brouillon révisé ;
* Base de connaissances : fournir des réglementations, des termes techniques ou des documents historiques ;
* 【Fichiers】 à droite : vérifier le brouillon original et les livrables.

<figure><img src="../../../../assets/861fd559d589c892d6c82334.webp" alt="Les réglementations, les termes techniques et les documents historiques peuvent servir de sources pour la base de connaissances, tandis que le brouillon original reste dans un répertoire de travail distinct."><figcaption><p>Les réglementations, les termes techniques et les documents historiques peuvent servir de sources pour la base de connaissances, tandis que le brouillon original reste dans un répertoire de travail distinct. </p></figcaption></figure>

<figure><img src="../../../../assets/d3679aebd8f1fdf0aa6058bf.webp" alt="① Saisir le texte original et les critères de relecture ; ② Les résultats réels identifient les lacunes point par point et conservent les informations non confirmées en tant qu'éléments à vérifier."><figcaption><p>① Saisir le texte original et les critères de relecture ; ② Les résultats réels identifient les lacunes point par point et conservent les informations non confirmées en tant qu'éléments à vérifier. </p></figcaption></figure>

## Processus opérationnel

{% stepper %}
{% step %}
### 1. Préparer le brouillon original et les critères de relecture

Placer le brouillon original dans un répertoire de travail distinct et créer une note de relecture concise précisant le public cible, l'objectif, les faits intangibles et le format de livraison.
{% endstep %}

{% step %}
### 2. Effectuer d'abord une calibration à petite échelle

Sélectionner un chapitre et demander à l'Agent de produire une sortie selon le format « problème, emplacement dans le texte original, impact, suggestion ». Valider l'adéquation de l'échelle avant de traiter l'ensemble du document.
{% endstep %}

{% step %}
### 3. Distinguer les faits de la formulation

Exiger que l'Agent liste séparément les faits nécessitant une vérification, sans masquer les incertitudes par des retouches linguistiques. Revenir aux sources originales pour vérifier les chiffres clés.
{% endstep %}

{% step %}
### 4. Générer un nouveau fichier et finaliser manuellement

Exiger la conservation du fichier original et la génération d'une liste des problèmes et d'un brouillon révisé dans `review/`. Utiliser 【Fichiers】 à droite pour vérifier paragraphe par paragraphe, puis exporter ou partager.
{% endstep %}
{% endstepper %}

## Exemple de tâche

```
Relisez proposal.docx dans le dossier actuel. Pour chaque section, relevez les erreurs factuelles, les lacunes de structure et les problèmes de formulation en indiquant leur emplacement. Ne modifiez pas l’original ; après validation de la liste, créez la version révisée et les points à vérifier dans review/.
```

## Préparation avant utilisation et critères d'achèvement

| Élément | Préparation recommandée |
| ---- | -------------------------------- |
| Fichiers | Placer le texte original, les exigences de relecture et le répertoire de sortie séparément |
| Combinaison recommandée | Agent dédié + répertoire de travail contenant uniquement les fichiers du projet + 【Confirmation par étape】 |
| Méthode de contrôle | Vérifier d'abord un chapitre, confirmer le format de citation et l'échelle des jugements |
| Critères d'achèvement | Chaque commentaire est accompagné de l'emplacement dans le texte original ; les parties non lues sont clairement marquées ; le fichier original n'est pas écrasé |

Convient à la relecture structurée de contrats, rapports, thèses ou normes ; lorsque des conclusions juridiques, médicales ou financières sont impliquées, la sortie ne peut servir que de document d'appoint.

{% hint style="info" %}
Lorsque le document est très long, ne pas coller le texte complet à plusieurs reprises dans une même conversation. Demander à l'Agent de lire directement le répertoire de travail et de laisser des livrables intermédiaires par chapitre facilite la revue et la récupération.
{% endhint %}
