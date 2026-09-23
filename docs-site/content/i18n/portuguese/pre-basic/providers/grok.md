# Grok

O Grok é um grande modelo de linguagem desenvolvido pela xAI, conhecido por seu "tom mais casual + integração com dados em tempo real do X (Twitter)".

## Obter a Chave de API

* Acesse o [xAI Console](https://console.x.ai/) para registrar uma conta
* `API Keys` → `Create API Key`, copie a chave `xai-...`

## Configurar no Cherry Studio

* Abra `Configurações → Serviços de modelos`, localize o Provider **Grok** e acesse a página de detalhes
* Insira `xai-...` em **Chave de API**
* O **Endereço de API** padrão é `https://api.x.ai`, não é necessário alterar
* Clique em **Obter lista de modelos** e adicione modelos como `grok-4`, `grok-4-fast`, etc.

## Usos recomendados

| Modelo | Cenário adequado |
|---|---|
| `grok-4` | O mais versátil, ideal para tarefas complexas |
| `grok-4-fast` | Cenários de alta vazão e baixa latência |
| `grok-3-mini` | Conversas diárias de baixo custo |

## Busca na web

Alguns modelos Grok possuem capacidade nativa de busca na web, indicada por um pequeno ícone de globo após o nome do modelo. Você pode ativar diretamente a opção "Web" na caixa de diálogo para usá-lo. Para mais detalhes, consulte [Modo Web](../../../../pre-basic/websearch).

{% hint style="info" %}
* O Grok requer acesso à rede internacional; usuários da China devem configurar um proxy
* A xAI oferece uma cota gratuita (renovada mensalmente), suficiente para uso diário
{% endhint %}

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e sugestões](../../question-contact/suggestions.md).
