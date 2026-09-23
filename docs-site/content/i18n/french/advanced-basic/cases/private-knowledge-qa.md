---
icon: lock
---
# Questions-réponses sur une base de connaissances privée

L'équipe des ressources humaines souhaite que les collègues puissent consulter les politiques en vigueur, sans que l'Agent ne complète les réponses avec des connaissances générales. Ce cas d'usage regroupe la portée des documents, les tests de récupération et les règles de réponse ; en l'absence de contenu, l'Agent doit l'indiquer clairement.

<figure><img src="../../../../assets/203ae7d1fc3c8b76bd8af0a8.webp" alt="Créez une base de connaissances distincte pour chaque thème afin d'éviter le mélange entre documents actuels et obsolètes."><figcaption><p>Créez une base de connaissances distincte pour chaque thème afin d'éviter le mélange entre documents actuels et obsolètes. </p></figcaption></figure>

<figure><img src="../../../../assets/24f5e32e3c72df907aaed3a6.webp" alt="N'ajustez les paramètres RAG en fonction de la structure des documents que si les résultats de récupération sont instables."><figcaption><p>N'ajustez les paramètres RAG en fonction de la structure des documents que si les résultats de récupération sont instables. </p></figcaption></figure>

<figure><img src="../../../../assets/c00520c08c9364fe13caad57.webp" alt="① Testez avec des questions réelles ; ② Vérifiez les documents retournés, les extraits de texte et les scores de pertinence. N'utilisez la base de connaissances avec l'Agent qu'une fois ces résultats stables."><figcaption><p>① Testez avec des questions réelles ; ② Vérifiez les documents retournés, les extraits de texte et les scores de pertinence. N'utilisez la base de connaissances avec l'Agent qu'une fois ces résultats stables. </p></figcaption></figure>

## Processus

{% stepper %}
{% step %}
### 1. Créer une base de connaissances à thème unique

Regroupez les documents en vigueur et supprimez les doublons et les versions obsolètes. Indiquez clairement le thème et le périmètre d'application dans les noms de fichiers.
{% endstep %}

{% step %}
### 2. Tester la récupération avec des questions réelles

Testez au moins les clauses susceptibles de prêter à confusion, les formulations courantes et les questions sans réponse. Ajustez les documents ou les paramètres RAG jusqu'à obtenir des extraits stables.
{% endstep %}

{% step %}
### 3. Créer un Agent dédié

Associez uniquement cette base de connaissances et exigez dans le prompt de « privilégier les documents ; indiquer l'absence de réponse si rien n'est trouvé ; ne pas compléter les politiques avec des connaissances générales ». Limitez les autorisations au minimum nécessaire.
{% endstep %}

{% step %}
### 4. Déployer progressivement

Commencez par une utilisation interne pour la recherche d'informations, sans remplacer directement les approbations ou les jugements professionnels. Collectez les questions mal répondues et corrigez les documents et les tests de récupération en conséquence.
{% endstep %}
{% endstepper %}

## Règles des questions d'exemple

```
Donnez d’abord la conclusion, puis indiquez le nom du document et le passage concerné. En cas de contradiction entre les sources, signalez-la sans choisir à notre place. Si la base de connaissances ne contient pas la réponse, écrivez clairement « Aucune information trouvée dans les documents actuels ».
```

## Combinaisons recommandées et critères d'achèvement

| Élément | Pratique recommandée |
| ----- | --------------------------- |
| Base de connaissances | Un thème par ensemble de documents, suppression des doublons et versions obsolètes |
| Test de récupération | Tester simultanément les formulations standard, courantes et les questions sans réponse |
| Agent | Associer uniquement les bases de connaissances nécessaires, exiger la citation des documents sans complétion |
| Critère d'achèvement | Trouver le paragraphe correct ; lister les documents contradictoires ; indiquer clairement l'absence de réponse |

{% hint style="danger" %}
Le contenu de la base de connaissances privée est traité par les modèles d'incorporation et de conversation que vous avez sélectionnés. Avant utilisation, vérifiez les exigences de confidentialité des documents et le périmètre du service, et n'importez pas de clés ou d'identifiants de compte comme documents de connaissance.
{% endhint %}
