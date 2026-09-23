# Groq

Groq (atenção: não é o Grok da xAI) é um serviço de inferência conhecido por **aceleração de hardware LPU e latência ultrabaixa**, hospedando principalmente modelos open source como Llama / Mixtral / Whisper, com velocidade de saída geralmente várias vezes superior à de serviços de nuvem comuns.

## Obter a Chave de API

* Acesse [GroqCloud](https://console.groq.com/) para criar uma conta
* `API Keys` → `Create API Key`, copie a chave `gsk_...`

## Configurar no Cherry Studio

* Abra `Configurações → Serviços de modelos`, localize o Provider **Groq** e acesse a página de detalhes
* Em **Chave de API**, insira `gsk_...`
* O **Endereço de API** padrão é `https://api.groq.com/openai/v1`, não é necessário alterar
* Clique em **Obter lista de modelos**

## Usos recomendados

| Modelo | Cenário adequado |
| ------------------------- | ---------- |
| `llama-3.3-70b-versatile` | Conversas gerais, velocidade extremamente rápida |
| `llama-3.1-8b-instant` | Tarefas simples, resposta em milissegundos |
| `mixtral-8x7b-32768` | Contexto longo |
| `whisper-large-v3` | Transcrição de voz para texto |

## Casos de uso

* **Chatbots em tempo real**: a resposta "quase instantânea" do Groq é ideal para integração com IM (em conjunto com [Canais](../../advanced-basic/automation/channels.md))
* **Alta concorrência**: o número de tokens por segundo é significativamente superior ao de serviços de nuvem comuns
* **Sem exigência de modelos mais recentes**: o Groq hospeda principalmente modelos open source da família Llama, sem modelos proprietários como GPT-5 / Claude-4

## Diferença entre Grok e Groq

| | [Grok](grok.md) | Groq |
| -- | --------------- | --------------- |
| Empresa | xAI (Musk) | Groq Inc. |
| Foco | Modelos de linguagem proprietários + acesso à web | Hardware LPU + inferência de modelos open source |
| Modelos | `grok-4` e outros proprietários | `llama-3.x` e outros open source |

{% hint style="warning" %}
Grok (xAI) e Groq são frequentemente confundidos. Na lista de Providers do Cherry Studio, são itens independentes; preste atenção na distinção.
{% endhint %}

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e sugestões](../../question-contact/suggestions.md).
