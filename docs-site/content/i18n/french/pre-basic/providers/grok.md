# Grok

Grok est un grand modèle développé par xAI, réputé pour son ton plus décontracté et son accès aux données en temps réel de X (Twitter).

## Obtenir une clé API

* Inscrivez-vous sur [xAI Console](https://console.x.ai/)
* `API Keys` → `Create API Key`, copiez la clé `xai-...`

## Configuration dans Cherry Studio

* Ouvrez `Paramètres → Services de modèles`, trouvez le fournisseur **Grok** et accédez à la page de détails
* Saisissez `xai-...` dans le champ **Clé API**
* L'**Adresse API** est par défaut `https://api.x.ai`, aucune modification n'est nécessaire
* Cliquez sur **Obtenir la liste des modèles**, puis ajoutez des modèles tels que `grok-4`, `grok-4-fast`, etc.

## Utilisations recommandées

| Modèle | Scénarios adaptés |
|---|---|
| `grok-4` | Le plus performant en général, idéal pour les tâches complexes |
| `grok-4-fast` | Scénarios à haut débit et faible latence |
| `grok-3-mini` | Conversations quotidiennes à faible coût |

## Recherche en ligne

Certains modèles Grok disposent d'une capacité de recherche en ligne intégrée, indiquée par une petite icône de globe terrestre après le nom du modèle. Vous pouvez activer directement l'option « En ligne » dans la zone de dialogue. Pour plus de détails, consultez [Mode en ligne](../../../../pre-basic/websearch).

{% hint style="info" %}
* Grok nécessite un accès réseau international ; les utilisateurs en Chine doivent configurer un proxy
* xAI offre un quota gratuit (renouvelé mensuellement), suffisant pour une utilisation courante
{% endhint %}

***

### Obtenir de l'aide et envoyer des retours

Si vous rencontrez des questions, des bugs ou avez des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
