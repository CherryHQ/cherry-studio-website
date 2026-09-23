# OpenRouter

OpenRouter est une **passerelle unifiée** qui permet d'accéder aux modèles de dialogue de plus de 200 fournisseurs (GPT, Claude, Gemini, Llama, DeepSeek, etc.) avec une seule clé API. La facturation est basée sur les jetons, ce qui convient aux utilisateurs souhaitant comparer plusieurs modèles ou éviter de créer un compte séparé chez chaque fournisseur.

## Obtenir la clé API

* Inscrivez-vous sur [OpenRouter](https://openrouter.ai/)
* `Settings → Keys` → `Create Key`, copiez la clé `sk-or-...`
* Effectuez un dépôt de fonds (minimum 1 $)

## Configuration dans Cherry Studio

* Ouvrez `Paramètres → Services de modèles`, trouvez le fournisseur **OpenRouter** et accédez à la page de détails
* Saisissez votre **clé API** dans `sk-or-...`
* L'**adresse API** est par défaut `https://openrouter.ai/api`, aucune modification n'est nécessaire
* Cliquez sur **Obtenir la liste des modèles**, OpenRouter renverra plusieurs centaines de modèles disponibles

## Utilisation recommandée

Les identifiants de modèles OpenRouter sont au format `<vendor>/<model>` :

| Exemple d'identifiant de modèle | Fournisseur réel |
| ----------------------------------- | ------------------------- |
| `openai/gpt-4o` | OpenAI GPT-4o |
| `anthropic/claude-sonnet-4` | Anthropic Claude Sonnet 4 |
| `google/gemini-2.0-flash` | Google Gemini Flash |
| `meta-llama/llama-3.3-70b-instruct` | Meta Llama 3.3 70B |
| `deepseek/deepseek-chat` | DeepSeek V3 |
| `x-ai/grok-4` | xAI Grok |

## Cas d'usage

* **Comparaison A/B de plusieurs modèles** : changez de modèle librement sous le même fournisseur Cherry Studio, sans changer de fournisseur
* **Éviter les inscriptions multiples** : une seule clé et une seule facture pour utiliser plus de 200 modèles
* **Modèles moins courants** : de nombreux petits fournisseurs ne sont disponibles que via OpenRouter (Cohere, Reka, etc.)

## Recherche web native et lecture d'URL

Les modèles de dialogue OpenRouter peuvent utiliser la recherche web native et la lecture de contenu d'URL. Lors de la sélection d'un modèle, vérifiez l'icône 🌐 à côté du nom et activez 🌐 dans la barre de saisie de la conversation.

Si l'option 【Privilégier le service de recherche configuré】 dans 【Paramètres】→【Recherche web】 reste activée, Cherry Studio privilégiera le service de recherche externe. Une fois cette option désactivée, les capacités natives du modèle OpenRouter seront privilégiées. Les fournisseurs peuvent facturer séparément les requêtes web ; les coûts réels sont déterminés par la facture OpenRouter.

## Relation avec le protocole Anthropic

OpenRouter encapsule par défaut tous les modèles amont au format du protocole OpenAI. Cela signifie que :

* ✅ Les conversations standard, la base de connaissances et les assistants rapides sont disponibles
* ⚠️ Pour [Cherry Agent](../../advanced-basic/agent.md), il est **recommandé d'utiliser directement** Anthropic / CherryIN plutôt qu'OpenRouter (Agent nécessite le protocole natif Anthropic)

{% hint style="info" %}
- OpenRouter applique une légère majoration par rapport aux prix du fournisseur (généralement 5-10 %), en échange d'un compte unique universel
- Certains modèles sont disponibles en version "free" (gratuit avec limitation de débit) ; lors du filtrage, notez les entrées avec le suffixe `(free)`
- Consultez le tableau des prix détaillé sur [OpenRouter Models](https://openrouter.ai/models)
{% endhint %}

***

### Obtenir de l'aide et envoyer des retours

Si vous avez des questions, des bugs ou des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
