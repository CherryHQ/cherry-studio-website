---
icon: grid-2
---
# Mini-apps

Les mini-apps permettent d'exécuter des services web et des utilitaires locaux installés dans Cherry Studio. En plus d'accéder aux versions web des fournisseurs d'IA, vous pouvez installer des mini-apps génératives personnalisées qui appellent les modèles d'IA configurés dans Cherry Studio via des interfaces autorisées.

### Distinguer les deux types de mini-apps

| Type | Méthode d'ajout | Appel de Cherry AI | Cas d'usage |
| ----- | ---------------------------- | -------------- | ----------------------------------- |
| Site web | Saisir le nom, l'URL et le logo | Non | Épingler des sites web fréquents dans Cherry Studio, en conservant l'état de connexion propre à chaque site |
| Mini-app locale | Installer un paquet `.miniapp` ou l'installer depuis l'URL fournie par le développeur | Oui, avec autorisation lors de l'installation | Rédaction IA personnalisée, résumés, traduction, extraction d'informations et flux de travail verticaux |

{% hint style="info" %}
Si vous souhaitez créer une « mini-app personnalisée capable d'appeler Cherry AI », utilisez le type 【Mini-app locale】 plutôt que le type 【Site web】 qui ne requiert qu'une URL. Consultez le tutoriel complet dans [Mini-apps génératives](generative-mini-apps.md).
{% endhint %}

### Accéder aux mini-apps

{% stepper %}
{% step %}
### Ouvrir le lanceur

Cliquez sur `+` dans la barre d'onglets supérieure, ou ouvrez directement le 【Lanceur】.
{% endstep %}

{% step %}
### Accéder aux mini-apps

Cliquez sur l'icône de l'application 【Mini-apps】.
{% endstep %}

{% step %}
### Sélectionner un service

Sélectionnez le service à ouvrir dans la grille des mini-apps.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../../assets/014d34ba53fb03d6d894116c.webp" alt=""><figcaption><p>Grille des mini-apps, incluant des dizaines de services intégrés ; cliquez sur <code>+</code> en haut à droite pour ajouter n'importe quel site web</p></figcaption></figure>

Au centre de la page se trouve une **barre de recherche** ; `+` en haut à droite sert à ajouter des sites web personnalisés, et `☰` ouvre les 【Paramètres d'affichage des mini-apps】.

### Paramètres

Dans 【Paramètres】→【Mini-apps】, vous pouvez effectuer les ajustements suivants :

* **Afficher / Masquer les mini-apps** : Faites glisser les mini-apps vers la gauche ou la droite dans les deux zones pour contrôler leur visibilité
* **Trier les mini-apps** : Faites glisser vers le haut ou le bas pour réorganiser les mini-apps
* **Filtrage des zones de mini-apps** : Masque automatiquement les mini-apps auxquelles vous n'avez pas accès, selon vos choix
* **Nombre de mini-apps en cache** : Si le nombre de mini-apps ouvertes simultanément dépasse cette limite, certaines mini-apps passeront en état inactif

### Ajouter et gérer

Les mini-apps de Cherry Studio prennent en charge les opérations suivantes :

* **Ajouter au lanceur** : Ajoutez les mini-apps fréquemment utilisées au lanceur pour un accès rapide via l'entrée `+`. Gérez-les dans 【Paramètres】→【Mini-apps】, ou faites un clic droit sur l'icône de la mini-app et sélectionnez **Ajouter au lanceur**
* **Ajouter à la barre latérale** : Épinglez les mini-apps fréquemment utilisées à la barre latérale gauche pour un accès en un clic ; faites un clic droit sur l'icône de la mini-app pour sélectionner **Ajouter à la barre latérale** ou **Retirer de la barre latérale**
* **Maintenir actif (Keep Alive)** : Empêche la fenêtre de la mini-app d'être détruite immédiatement lors du changement de vue, évitant ainsi de devoir vous reconnecter ou recharger à la réouverture
* **Ajouter un site web** : Cliquez sur `+` en haut à droite de la page, saisissez le nom, l'URL et le logo dans 【Site web】 pour l'ajouter à la grille
* **Installer une mini-app locale** : Cliquez sur `+` en haut à droite de la page, basculez sur 【Mini-app locale】, sélectionnez le paquet `.miniapp` ou saisissez l'URL d'installation fournie par le développeur. Confirmez les autorisations pour finaliser l'installation
* **Voir les détails d'une mini-app locale** : Faites un clic droit sur la mini-app locale, sélectionnez 【Voir les détails】 pour gérer les autorisations, les modèles d'IA, l'espace de stockage, les journaux d'activité et les mises à jour
* **Supprimer / Modifier** : Les mini-apps de type site web peuvent être modifiées ou supprimées via un clic droit ; les mini-apps locales peuvent être désinstallées via 【Voir les détails】

Une fois une mini-app ouverte, sa fenêtre intègre une barre d'outils : **Retour**, **Avance**, **Actualiser**, **Ouvrir dans le navigateur**. Vous pouvez également choisir d'ouvrir les liens internes dans la fenêtre par défaut ou dans le navigateur système.

<figure><img src="../../../../../assets/efa6c8dd5b1bb7b7cd417561.webp" alt=""><figcaption><p>Barre d'outils de la fenêtre de mini-app : retour / avance / actualiser à gauche, ouvrir dans le navigateur, ajouter au lanceur, mode d'ouverture des liens internes à droite</p></figcaption></figure>

### Conseils et astuces

* Les mini-apps de type site web utilisent la version web du service ; l'état de connexion, les cookies et les paramètres sont stockés localement et isolés du navigateur système
* Les mini-apps locales s'exécutent dans un bac à sable indépendant et ne peuvent pas lire les fichiers d'autres mini-apps ou du système ; seules les capacités que vous avez autorisées peuvent être appelées
* Si une mini-app échoue à se charger, faites un clic droit → Actualiser, ou vérifiez les paramètres du proxy (voir [Paramètres généraux](../../../pre-basic/settings/general.md))

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Mini-apps génératives</strong></td><td>Créer, installer et gérer des mini-apps personnalisées capables d'appeler Cherry AI</td><td><a href="generative-mini-apps.md">generative-mini-apps.md</a></td></tr></tbody></table>

En cas de problème, veuillez soumettre un retour via [Retours et suggestions](../../../question-contact/suggestions.md).

***

### Obtenir de l'aide et soumettre un retour

Si vous rencontrez des questions, des bugs ou avez des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../../question-contact/suggestions.md).
