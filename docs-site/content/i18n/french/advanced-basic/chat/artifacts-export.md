---
icon: box-archive
---
# Artefacts, citations et exportation

Une réponse peut contenir simultanément du texte, du code, des fichiers, des images, des citations et des éléments éditables. Vérifiez d'abord les artefacts, puis décidez de copier, télécharger, exporter ou de confier le traitement à l'Agent.

<figure><img src="../../../../assets/5c0f5f563432facacf7942d6.webp" alt="Une fois l'artefact final atteint, vérifiez le contenu, la source et le fichier avant de décider de copier, exporter ou de confier le tri à l'Agent."><figcaption><p>Une fois l'artefact final atteint, vérifiez le contenu, la source et le fichier avant de décider de copier, exporter ou de confier le tri à l'Agent. </p></figcaption></figure>

### Prévisualiser avant de livrer

Cliquez sur un artefact dans le message ou le panneau de fichiers de l'Agent pour ouvrir l'aperçu correspondant à droite. Pour le HTML, vous pouvez vérifier la mise en page et les interactions ; les PDF, Word, PowerPoint, images et textes sont affichés selon leur format ; `.xlsx` les tableurs permettent de consulter directement les feuilles de calcul, le style des cellules, les cellules fusionnées, les résultats des formules, les images et les graphiques.

<figure><img src="../../../../assets/4e1d6cc47405edfe8d6fe315.webp" alt="① La zone d'aperçu sert à vérifier le contenu complet ; ② la barre d'outils permet de zoomer, télécharger, maximiser ou changer de vue."><figcaption><p>① La zone d'aperçu sert à vérifier le contenu complet ; ② la barre d'outils permet de zoomer, télécharger, maximiser ou changer de vue. </p></figcaption></figure>

1. Indiquez le format de l'artefact dans la conversation et ouvrez l'aperçu à droite.
2. Vérifiez que le contenu et la mise en page sont complets.
3. S'il manque des éléments, revenez à la conversation pour préciser les modifications, puis rouvrez l'aperçu pour vérifier.
4. Une fois la complétude confirmée, téléchargez, copiez ou confiez la sauvegarde à l'Agent.

L'objectif de l'aperçu est de détecter les omissions à l'avance, et non simplement de confirmer que « le contenu a été généré ». Si la page doit être utilisée par des collègues, vérifiez au moins une fois les liens, les boutons et les fichiers téléchargés.

{% hint style="info" %}
Si le résultat ne contient qu'un bloc de code sans aperçu, ajoutez dans la même conversation « Veuillez générer un artefact HTML complet et directement prévisualisable » et précisez les sections que la page doit contenir.
{% endhint %}

#### Cas d'application : vérification avant publication

Saisissez « Transformez la liste de vérification avant publication en un artefact HTML complet et directement prévisualisable, contenant trois sections : préparation au lancement, surveillance et acceptation, conditions de retour arrière ». Une fois l'aperçu ouvert, vérifiez d'abord que les trois parties sont complètes, puis téléchargez le fichier ou confiez la sauvegarde à l'Agent dans le répertoire du projet.

#### Cas d'application : vérification d'un tableau de données

Ouvrez le tableau budgétaire `.xlsx` généré par l'Agent, passez en revue chaque feuille de calcul, puis vérifiez les titres fusionnés, le format des montants, les résultats des formules et les graphiques. Cliquez pour développer les cellules au contenu long ; utilisez le zoom pour bien voir les images ou les graphiques. L'aperçu sert à l'acceptation, mais ne remplace pas les capacités complètes d'édition et de recalculation d'Excel.

### Effectuer trois vérifications préalables

1. **Contenu** : les chiffres, les dates, les noms propres et les conclusions sont-ils conformes aux sources originales ?
2. **Source** : les résultats en ligne conservent-ils des liens accessibles ? Les citations soutiennent-elles réellement les affirmations correspondantes ?
3. **Fichier** : le nom, le format et le contenu du fichier s'ouvrent-ils correctement ? Contient-il des informations qui ne devraient pas être partagées ?

### Destinations courantes

| Résultat | Pratique recommandée |
| ---------------- | ------------------------------------- |
| Texte finalisé | Copier dans l'application cible ou enregistrer comme note |
| Markdown à modifier en continu | Placer dans le répertoire de travail de l'Agent et continuer l'édition dans le panneau 【Fichiers】 |
| Ressources réutilisables | Organiser puis ajouter à la base de connaissances, sans importer en bloc les discussions temporaires |
| Images | Ouvrir l'image originale pour vérifier les dimensions et les détails, puis télécharger |
| Tableaux `.xlsx` | Vérifier les feuilles, les styles, les résultats des formules, les images et les graphiques dans l'aperçu intégré, puis effectuer les modifications finales avec un logiciel de tableur |
| Code ou commandes | Lire d'abord et vérifier dans un environnement réversible, sans exécuter directement des commandes inconnues |

{% hint style="warning" %}
« Génération réussie » indique uniquement que le modèle a renvoyé du contenu, cela ne signifie pas que le fichier est prêt à être publié. Les documents destinés à l'extérieur doivent toujours être vérifiés quant aux faits, aux droits d'auteur, à la confidentialité et aux exigences de marque.
{% endhint %}

#### Cas d'application : organiser une discussion en document livrable

L'équipe discute d'abord du plan d'action dans 【Conversation】, confirme le public cible, les délais et les limites budgétaires, puis demande au modèle de générer un plan structuré. Ensuite, confiez ce plan à l'Agent de contenu dans 【Travail】 pour générer un `campaign-plan.md` dans le répertoire spécifié. Révisez enfin le document dans le panneau 【Fichiers】 à droite, afin d'éviter de copier tel quel des dizaines de tours de discussion dans le document officiel.

<details>

<summary>Pourquoi les liens de citation ne s'ouvrent-ils pas ? </summary>

Les liens peuvent être expirés, nécessiter une connexion, ou les résultats de recherche ne fournissent que des résumés. Utilisez la source originale pour revérifier ; ne vous appuyez pas uniquement sur une source inaccessible pour des conclusions clés.

</details>

<details>

<summary>Pourquoi les liens de citation ne s'ouvrent-ils pas ? </summary>

Les liens peuvent être expirés, nécessiter une connexion, ou les résultats de recherche ne fournissent que des résumés. Utilisez la source originale pour revérifier ; ne vous appuyez pas uniquement sur une source inaccessible pour des conclusions clés.

</details>
