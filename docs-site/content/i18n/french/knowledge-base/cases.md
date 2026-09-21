---
icon: lightbulb
---
# Cas d'application de la base de connaissances

La fiabilité d'une base de connaissances ne dépend pas du volume de documents, mais de la clarté des limites, de la maintenabilité des sources et de la capacité à récupérer de manière stable les preuves correctes pour les questions réelles.

{% hint style="info" %}
Les paramètres suivants ne sont que des points de départ. Commencez par tester l'importation, la récupération et l'utilisation avec 3 à 10 documents représentatifs, puis élargissez la base en fonction d'un ensemble de questions fixe.
{% endhint %}

## Concevoir d'abord avec la même méthode

{% stepper %}
{% step %}
### 1. Définir la tâche finale

Préciser le jugement ou le livrable attendu par l'utilisateur, par exemple la consultation de règlements, le dépannage ou la génération d'un rapport de recherche.
{% endstep %}

{% step %}
### 2. Délimiter le périmètre des documents

Seuls les documents qui doivent être recherchés ensemble lors de l'utilisation doivent être placés dans la même base de connaissances. Les contenus ayant des permissions, des cycles de vie, des modèles de produits ou des versions différents doivent être séparés par priorité.
{% endstep %}

{% step %}
### 3. Choisir les sources et la méthode de mise à jour

Indiquer qui maintient les fichiers, notes, répertoires et pages web, quand ils sont remplacés et s'il faut conserver les versions historiques.
{% endstep %}

{% step %}
### 4. Préparer les questions de validation

Préparer 3 à 10 questions réelles couvrant des faits précis, des règles conditionnelles, des formulations courantes et des versions facilement confondues.
{% endstep %}

{% step %}
### 5. Ajuster la stratégie de recherche

Conserver d'abord une configuration simple. Ajouter des embeddings si BM25 ne gère pas bien les expressions synonymes ; ajouter un réordonnancement si les candidats corrects apparaissent mais dans un ordre instable.
{% endstep %}

{% step %}
### 6. Intégrer à la conversation ou à l'Agent

Utiliser une conversation standard pour une seule question-réponse ; lier un Agent pour la recherche multi-étapes, la comparaison et la livraison de fichiers. Vérifier chaque source avant la mise en production.
{% endstep %}
{% endstepper %}

## Cas utilisateur 1 : Questions sur les règles internes

### Objectif

Permettre aux employés de consulter les approbations de voyages d'affaires, les normes d'hébergement et les exceptions de remboursement, et d'ouvrir les sources pour vérifier le texte original.

### Organisation des documents

* Base de connaissances : 【Règlement des voyages d'affaires】
* Entrée : 【Processus d'approbation des voyages d'affaires】
* Entrée : 【Référence rapide des normes d'hébergement】
* Entrée : 【FAQ des voyages d'affaires】

<figure><img src="../../../assets/2414cfc005a860f127a4fd96.webp" alt="Les clauses réglementaires et la FAQ sont maintenues séparément ; la mise à jour de l'un ne nécessite pas de refaire tous les documents."><figcaption><p>Les clauses réglementaires et la FAQ sont maintenues séparément ; la mise à jour de l'un ne nécessite pas de refaire tous les documents.</p></figcaption></figure>

### Configuration recommandée

| Élément | Point de départ | Quand ajuster |
| ---- | ---------- | ----------------- |
| Recherche | Commencer avec BM25 | Ajouter des embeddings si la formulation des employés diffère beaucoup du langage réglementaire |
| Réordonnancement | Ne pas utiliser au départ | Activer si les candidats corrects apparaissent mais dans un ordre instable |
| Version des documents | Conserver uniquement la version actuelle | Indiquer l'année dans le nom si l'audit historique nécessite la coexistence |
| Exigences de réponse | Séparer conclusion, conditions et sources | Marquer explicitement si les documents ne le précisent pas |

### Questions de validation

1. Quel est le montant maximum remboursable pour l'hébergement lors d'un voyage d'affaires ?
2. Le location de voiture à l'étranger est-elle remboursable ?
3. Qui approuve si le coût total estimé dépasse 5 000 yuans ?
4. Que se passe-t-il si un hôtel est réservé sans approbation préalable ?

### Prompt de conversation

> Répondre uniquement sur la base du « Règlement des voyages d'affaires ». Donner d'abord la conclusion, puis lister les conditions applicables et les sources ; écrire « Non précisé dans le règlement » si les documents ne le disent pas, ne pas compléter avec des connaissances générales.

{% hint style="success" %}
Lors de la validation réussie, la même règle est trouvée aussi bien avec la formulation originale que courante, et les montants, rôles et conditions dans la réponse sont directement soutenus par les citations.
{% endhint %}

## Cas utilisateur 2 : Assistant après-vente produit

### Objectif

Organiser les manuels officiels, les codes de panne et les cas approuvés pour permettre au service client de fournir d'abord des conseils de dépannage sûrs et traçables.

### Périmètre des documents

| Base de connaissances ou groupe de documents | Contenu | Principes de maintenance |
| ------- | ------------- | ------------- |
| Manuel officiel | Spécifications, limites de garantie, étapes standard | Conserver le modèle et la version du document |
| Codes de panne | Une section par panne | Indiquer le firmware et le modèle d'équipement applicables |
| Cas approuvés | Cas avec cause et solution confirmées | Ne pas importer directement les conversations non approuvées |

Si les règles diffèrent significativement selon les modèles, séparer en bases de connaissances indépendantes par modèle pour éviter la concurrence entre codes de panne identiques.

### Configuration de recherche et de l'Agent

* Vérifier d'abord le sommaire, les tableaux et le texte en deux colonnes des PDF.
* Les codes de panne dépendent de termes précis, conserver BM25.
* Ajouter un modèle d'embeddings si la description du client est très courante.
* Lier le manuel officiel et les cas approuvés à l'Agent après-vente, n'activer que 【Recherche dans la base de connaissances】.

> Diagnostiquer en trois étapes selon le modèle d'équipement, le code de panne et les symptômes. Indiquer à chaque étape si la source est le manuel officiel ou un cas approuvé. En cas de démontage, d'utilisation électrique ou d'effacement de données, avertir d'abord des risques et attendre confirmation.

### Critères de validation

* Ne pas appliquer les étapes d'un autre modèle au modèle actuel.
* Les avertissements de sécurité apparaissent avant les étapes opérationnelles.
* Les règles officielles et les suggestions de cas sont séparées.
* Transférer à un humain si aucune source ne soutient, ne pas deviner.

## Cas utilisateur 3 : Documents de recherche et rapports

### Objectif

Extraire des preuves vérifiables de thèses, notes d'entretiens et instantanés web, puis générer un rapport comparatif avec sources via l'Agent.

### Organisation des documents

* Créer une base par question de recherche, ne pas tout mettre dans une grande base.
* Les noms de fichiers incluent l'auteur, l'année et un titre court.
* Les notes d'entretien indiquent le rôle de l'interviewé, la date et si citation est possible.
* Les documents web enregistrent la date de capture, car la base conserve l'instantané importé.

<figure><img src="../../../assets/8cd27fa50051cc96320b280a.webp" alt="La base de recherche est d'abord validée avec des questions fixes pour la couverture des sources, puis l'Agent fait la synthèse inter-documentaire."><figcaption><p>La base de recherche est d'abord validée avec des questions fixes pour la couverture des sources, puis l'Agent fait la synthèse inter-documentaire.</p></figcaption></figure>

### Prompt de l'Agent

> Chercher dans la base de connaissances de recherche liée les preuves de « pourquoi les utilisateurs abandonnent la configuration initiale ». Lister d'abord les points de vue et limites par source, puis synthétiser consensus, divergences et hypothèses à vérifier. Générer un rapport Markdown ; ne pas présenter les inférences comme des citations directes des interviewés.

### Des preuves aux livrables

<figure><img src="../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="Conserver d'abord les preuves et limites, puis laisser l'Agent organiser le rapport ; ne pas laisser le produit final masquer les sources originales."><figcaption><p>Conserver d'abord les preuves et limites, puis laisser l'Agent organiser le rapport ; ne pas laisser le produit final masquer les sources originales.</p></figcaption></figure>

### Critères de validation

* Le consensus est soutenu par au moins deux sources indépendantes.
* Les divergences conservent leurs conditions respectives, sans fusion forcée.
* Les citations, inférences et suggestions sont clairement identifiées.
* Les instantanés web et les versions de thèses sont traçables.

## Notes de configuration : Tableau de conception réutilisable

| Élément | Question à répondre |
| ---- | ---------------------- |
| Objectif | Quel jugement final ou quel résultat l'utilisateur doit-il produire ? |
| Périmètre | Quels documents doivent être recherchés ensemble, lesquels doivent être séparés ? |
| Sources | Comment mettre à jour les fichiers, notes, répertoires et pages web ? |
| Analyse | Quels types de documents sont les plus sujets aux problèmes d'OCR, de tableaux ou d'ordre ? |
| Recherche | BM25 est-il suffisant ? Quand avoir besoin d'embeddings et de réordonnancement ? |
| Questions de validation | Quelles 3 à 10 questions représentent l'utilisation réelle ? |
| Gestion des échecs | Que faire en cas d'absence de résultats, de versions conflictuelles ou de manque de sources ? |
| Maintenance | Qui est responsable du remplacement des documents, de la réindexation et des sauvegardes ? |

{% hint style="warning" %}
Ne pas considérer « beaucoup de documents importés » comme un critère de réussite. Plus il y a de documents, plus la gestion explicite des versions dupliquées, des permissions mélangées et du bruit est nécessaire.
{% endhint %}

## Questions fréquentes

<details>

<summary>Les règlements, manuels et cas doivent-ils être dans la même base de connaissances ?</summary>

Vérifier s'ils doivent être recherchés ensemble pour la même question, et si les permissions et cycles de mise à jour sont cohérents. Séparer les bases facilite le contrôle des limites de sources si les différences sont marquées.

</details>

<details>

<summary>La base de cas peut-elle importer directement toutes les conversations du service client ?</summary>

Non recommandé. D'abord vérifier les causes, solutions et contenus de confidentialité, n'importer que les cas confirmés et réutilisables.

</details>

<details>

<summary>Que faire avant d'élargir les documents ?</summary>

Conserver un ensemble de questions de validation fixes, importer par lots et retester. Si de nouveaux documents dégradent les résultats, il est facile de localiser le lot responsable.

</details>

## Continuer la lecture

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Initiation à la base de connaissances</strong></td><td>Tester d'abord la création, l'importation, la récupération et l'utilisation.</td><td><a href="knowledge-base.md">knowledge-base.md</a></td></tr><tr><td><strong>Utilisation avec un Agent</strong></td><td>Configurer la recherche multi-étapes et les permissions des documents.</td><td><a href="agent.md">agent.md</a></td></tr><tr><td><strong>Questions fréquentes</strong></td><td>Localiser les problèmes de documents, de récupération ou de réponse à partir des symptômes.</td><td><a href="troubleshooting.md">troubleshooting.md</a></td></tr></tbody></table>
