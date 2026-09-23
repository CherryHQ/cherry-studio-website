# Anthropic

Claude d'Anthropic est l'un des modèles les plus adaptés en tant que backend pour [Cherry Agent](../../advanced-basic/agent.md), car l'Agent nécessite un point de terminaison du protocole Anthropic.

## Obtenir la clé API

* Inscrivez-vous sur [Anthropic Console](https://console.anthropic.com/)
* Accédez à `Settings → API Keys` → `Create Key` et copiez la clé `sk-ant-...` générée

## Configuration dans Cherry Studio

* Ouvrez `Paramètres → Services de modèles`, trouvez le fournisseur **Anthropic** et accédez à la page de détails
* Saisissez `sk-ant-...` dans **Clé API**
* L'**Adresse API** est par défaut `https://api.anthropic.com`, aucune modification n'est nécessaire
* Cliquez sur **Obtenir la liste des modèles**, puis ajoutez des modèles tels que `claude-opus-4`, `claude-sonnet-4`, `claude-haiku-4`

## Utilisations recommandées

| Modèle | Scénarios adaptés |
|---|---|
| `claude-opus-4` | Raisonnement avancé / programmation / tâches Agent complexes |
| `claude-sonnet-4` | Conversations générales et Agent quotidien, meilleur rapport qualité-prix |
| `claude-haiku-4` | Scénarios à haut débit, réponses rapides à faible coût |

## Configuration pour les scénarios Agent

Sélectionnez ce fournisseur comme source de modèle par défaut lors de la configuration de [Cherry Agent](../../advanced-basic/agent.md) pour bénéficier directement des capacités Agent du protocole Anthropic.

{% hint style="info" %}
* L'API Anthropic n'est pas directement accessible depuis la Chine continentale ; un proxy est requis (voir [Paramètres généraux → Mode proxy](../settings/general.md))
* Les utilisateurs ayant un abonnement Claude Code peuvent également utiliser la même clé et le même point de terminaison pour se connecter à Cherry Studio
* Les modèles Claude sont facturés par jeton ; surveillez l'utilisation en cas de contexte long
{% endhint %}

***

### Obtenir de l'aide et envoyer des retours

Si vous rencontrez des questions, des bugs ou avez des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
