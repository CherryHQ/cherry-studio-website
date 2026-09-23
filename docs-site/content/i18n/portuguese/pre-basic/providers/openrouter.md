# OpenRouter

O OpenRouter é um **gateway unificado** que permite acessar modelos de conversação de mais de 200 fornecedores (GPT, Claude, Gemini, Llama, DeepSeek, entre outros) com uma única chave, com cobrança por token. É ideal para comparar múltiplos modelos ou para usuários que não desejam registrar contas individualmente em cada fornecedor.

## Obter a Chave de API

* Acesse [OpenRouter](https://openrouter.ai/) para criar uma conta
* `Settings → Keys` → `Create Key`, copie a chave `sk-or-...`
* Realize um recarga de qualquer valor (mínimo de US$ 1)

## Configurar no Cherry Studio

* Abra `Configurações → Serviços de modelos`, localize o provedor **OpenRouter** e acesse a página de detalhes
* Insira a **Chave de API** em `sk-or-...`
* O **Endereço da API** é `https://openrouter.ai/api` por padrão, não é necessário alterar
* Clique em **Obter lista de modelos**, o OpenRouter retornará centenas de modelos disponíveis

## Uso recomendado

Os IDs de modelos do OpenRouter têm o formato `<vendor>/<model>`:

| Exemplo de ID do modelo | Quem é realmente |
| ----------------------------------- | ------------------------- |
| `openai/gpt-4o` | OpenAI GPT-4o |
| `anthropic/claude-sonnet-4` | Anthropic Claude Sonnet 4 |
| `google/gemini-2.0-flash` | Google Gemini Flash |
| `meta-llama/llama-3.3-70b-instruct` | Meta Llama 3.3 70B |
| `deepseek/deepseek-chat` | DeepSeek V3 |
| `x-ai/grok-4` | xAI Grok |

## Casos de uso

* **Comparação A/B de múltiplos modelos**: alterne livremente entre modelos no mesmo provedor do Cherry Studio, sem necessidade de trocar de provedor
* **Evitar registros individuais**: uma única chave e uma única fatura para usar mais de 200 modelos
* **Modelos menos comuns**: muitos fornecedores menores oferecem seus modelos apenas no OpenRouter (como Cohere, Reka, entre outros)

## Busca na web nativa e leitura de URLs

Os modelos de conversação do OpenRouter podem usar busca na web nativa e leitura de conteúdo de URLs. Ao selecionar um modelo, verifique o ícone 🌐 ao lado do nome e ative o 🌐 na barra de entrada da conversa.

Se a opção 【Priorizar serviço de busca configurado】 em 【Configurações】→【Busca na web】 estiver ativada, o Cherry Studio priorizará o uso de serviços de busca externos; ao desativar essa opção, o sistema passará a priorizar as capacidades nativas dos modelos do OpenRouter. Os fornecedores podem cobrar separadamente por solicitações de busca na web; os custos reais estão sujeitos à fatura do OpenRouter.

## Relação com o protocolo Anthropic

O OpenRouter encapsula todos os modelos upstream no formato do protocolo OpenAI por padrão. Isso significa que:

* ✅ Conversas comuns, base de conhecimento e assistentes rápidos estão disponíveis
* ⚠️ [Cherry Agent](../../advanced-basic/agent.md) **recomenda usar diretamente** Anthropic / CherryIN, em vez do OpenRouter (o Agent requer o protocolo nativo da Anthropic)

{% hint style="info" %}
- O OpenRouter aplica uma pequena margem sobre o preço original dos fornecedores (geralmente 5-10%), em troca da conveniência de "uma conta universal"
- Alguns modelos podem usar a versão "free" (gratuita com limite de taxa); ao filtrar, observe os itens com o sufixo `(free)`
- Consulte a tabela de preços detalhada em [OpenRouter Models](https://openrouter.ai/models)
{% endhint %}

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e sugestões](../../question-contact/suggestions.md).
