# Anthropic

O Claude da Anthropic é um dos modelos mais adequados para atuar como backend do [Cherry Agent](../../advanced-basic/agent.md), pois o Agent requer um endpoint do protocolo Anthropic.

## Obter a Chave de API

* Acesse o [Anthropic Console](https://console.anthropic.com/) para registrar uma conta
* Vá para `Settings → API Keys` → `Create Key` e copie a chave `sk-ant-...` gerada

## Configurar no Cherry Studio

* Abra `Configurações → Serviços de modelos`, localize o Provider **Anthropic** e acesse a página de detalhes
* Insira a `sk-ant-...` em **Chave de API**
* O **Endereço da API** padrão é `https://api.anthropic.com`, não é necessário alterar
* Clique em **Obter lista de modelos** e adicione modelos como `claude-opus-4`, `claude-sonnet-4`, `claude-haiku-4`

## Usos recomendados

| Modelo | Cenários adequados |
|---|---|
| `claude-opus-4` | Raciocínio mais avançado / Programação / Tarefas complexas de Agent |
| `claude-sonnet-4` | Conversas gerais e Agent do dia a dia, melhor custo-benefício |
| `claude-haiku-4` | Cenários de alto throughput, respostas rápidas com baixo custo |

## Configuração para cenários de Agent

Ao configurar este Provider no [Cherry Agent](../../advanced-basic/agent.md) como fonte de modelo padrão, você obtém diretamente as capacidades de Agent do protocolo Anthropic.

{% hint style="info" %}
* Na China continental, não é possível acessar diretamente a API da Anthropic; é necessário usar um proxy próprio (consulte [Configurações gerais → Modo de proxy](../settings/general.md))
* Usuários com assinatura do Claude Code também podem usar a mesma chave + endpoint para se conectar ao Cherry Studio
* Os modelos Claude são cobrados por token; em contextos longos, fique atento ao uso
{% endhint %}

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e sugestões](../../question-contact/suggestions.md).
