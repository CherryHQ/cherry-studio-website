# Groq

Groq (attention : ce n'est pas Grok de xAI) est un service d'inférence réputé pour son **accélération matérielle LPU et sa latence ultra-faible**. Il héberge principalement des modèles open source tels que Llama / Mixtral / Whisper, avec des vitesses de sortie généralement plusieurs fois supérieures à celles de l'inférence cloud standard.

## Obtenir une clé API

* Inscrivez-vous sur [GroqCloud](https://console.groq.com/)
* `API Keys` → `Create API Key`, copiez la clé `gsk_...`

## Configuration dans Cherry Studio

* Ouvrez `Paramètres → Services de modèles`, trouvez le fournisseur **Groq** et accédez à la page de détails
* Saisissez `gsk_...` dans le champ **Clé API**
* L'**Adresse API** est par défaut `https://api.groq.com/openai/v1`, aucune modification n'est nécessaire
* Cliquez sur **Obtenir la liste des modèles**

## Utilisations recommandées

| Modèle | Cas d'usage |
| ------------------------- | ---------- |
| `llama-3.3-70b-versatile` | Conversation générale, vitesse très élevée |
| `llama-3.1-8b-instant` | Tâches simples, réponse en millisecondes |
| `mixtral-8x7b-32768` | Contexte long |
| `whisper-large-v3` | Transcription audio |

## Cas d'usage

* **Chatbots en temps réel** : la réponse « quasi instantanée » de Groq est idéale pour l'intégration IM (avec [canal](../../advanced-basic/automation/channels.md))
* **Forte concurrence** : le nombre de jetons par seconde est nettement supérieur à celui de l'inférence cloud standard
* **Indifférence à la dernière version des modèles** : Groq héberge principalement des modèles open source de la famille Llama, sans modèles propriétaires comme GPT-5 / Claude-4

## Distinction entre Grok et Groq

| | [Grok](grok.md) | Groq |
| -- | --------------- | --------------- |
| Entreprise | xAI (Musk) | Groq Inc. |
| Spécialité | Modèles propriétaires + accès web | Matériel LPU + inférence de modèles open source |
| Modèles | Propriétaires comme `grok-4` | Open source comme `llama-3.x` |

{% hint style="warning" %}
Grok (xAI) et Groq sont souvent confondus. Dans la liste des fournisseurs de Cherry Studio, ce sont deux entrées distinctes. Veuillez faire attention à la distinction.
{% endhint %}

***

### Obtenir de l'aide et envoyer des retours

Si vous avez des questions, des bugs ou des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
