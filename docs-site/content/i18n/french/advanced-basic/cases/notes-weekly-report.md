---
icon: calendar-week
---
# Génération de rapports hebdomadaires à partir de notes

Le responsable de projet a accumulé des notes de réunion, des mises à jour d'avancement et des tâches éparses au cours de la semaine. Il souhaite les organiser le vendredi en un rapport hebdomadaire à structure stable et aux faits vérifiables. L'essentiel est d'unifier d'abord la méthode d'enregistrement, puis de laisser l'Agent consolider les informations, plutôt que de lui faire deviner les états manquants.

<figure><img src="../../../../assets/037b73b62e47ca15c0537f83.webp" alt="Enregistrer de manière continue selon la même structure facilite la vérification des états et des responsables lors du récapitulatif de fin de semaine."><figcaption><p>Enregistrer de manière continue selon la même structure facilite la vérification des états et des responsables lors du récapitulatif de fin de semaine. </p></figcaption></figure>

<figure><img src="../../../../assets/cd9eea7189b1b6cf20d2b08d.webp" alt="① À gauche, conserver les enregistrements bruts et le récapitulatif de la semaine ; ② À droite, le rapport hebdomadaire contient déjà du contenu réel, permettant de continuer à le modifier manuellement, à l'apercevoir et à l'exporter."><figcaption><p>① À gauche, conserver les enregistrements bruts et le récapitulatif de la semaine ; ② À droite, le rapport hebdomadaire contient déjà du contenu réel, permettant de continuer à le modifier manuellement, à l'apercevoir et à l'exporter. </p></figcaption></figure>

## Processus

{% stepper %}
{% step %}
### 1. Unifier la méthode d'enregistrement

Enregistrer les éléments chaque jour dans le même dossier de notes, en incluant au moins la date, le résultat, le responsable et l'état. Ne pas présenter les tâches non terminées comme livrées.
{% endstep %}

{% step %}
### 2. Récapituler manuellement le vendredi

Fusionner les éléments en double, compléter les chiffres clés et les liens. Placer le contexte de long terme dans la base de connaissances et laisser les changements de la semaine dans la note actuelle.
{% endstep %}

{% step %}
### 3. Demander à l'Agent de générer un brouillon

Exiger une sortie structurée en « Terminé cette semaine, En cours, Risques, Plan de la semaine prochaine » et lister les éléments à compléter en cas de données manquantes.
{% endstep %}

{% step %}
### 4. Vérifier et exporter

Confirmer les états, les chiffres et les responsables, puis finaliser et exporter dans [Notes]. Le format stable peut être transformé en compétence pour être réutilisé la semaine suivante.
{% endstep %}
{% endstepper %}

## Tâche d'exemple

```
Lisez les notes de la semaine et préparez un brouillon de rapport hebdomadaire. Regroupez les éléments identiques tout en conservant les changements d’état selon la date, sans supposer qu’une tâche est terminée. Placez les responsables, chiffres ou prochaines étapes manquants dans « À compléter ».
```

## Combinaisons recommandées et critères d'achèvement

| Élément | Pratique recommandée |
| ----- | --------------------------------- |
| Saisie quotidienne | Enregistrer les notes par date ou par projet, n'écrire que des faits et des tâches à faire |
| Agent | Utiliser une structure de rapport hebdomadaire fixe, lire les notes de la semaine avant de générer |
| Sortie | Écrire le rapport hebdomadaire dans un fichier indépendant, sans écraser les notes brutes |
| Critère d'achèvement | Chaque progression doit pouvoir être retracée jusqu'à la note d'origine ; les tâches non terminées doivent avoir un responsable ou une prochaine étape ; aucune donnée inventée |

Convient pour organiser le travail déjà enregistré en rapport hebdomadaire, ne convient pas pour laisser l'Agent deviner les résultats d'une semaine à partir de souvenirs épars.

{% hint style="info" %}
Avant de générer automatiquement le rapport hebdomadaire à heure fixe, l'exécuter manuellement pendant quelques semaines. Ne créer la tâche planifiée qu'après que le format d'entrée soit stable et que la gestion des informations manquantes soit fiable.
{% endhint %}
