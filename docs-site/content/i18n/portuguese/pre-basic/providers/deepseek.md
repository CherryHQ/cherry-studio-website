# DeepSeek

O DeepSeek é um dos principais fornecedores de modelos de linguagem de grande porte da China, reconhecido pela excelência das séries V3 / R1 em tarefas de programação e raciocínio, além de oferecer preços acessíveis.

## Obter a Chave de API

* Acesse a [DeepSeek Platform](https://platform.deepseek.com/) para registrar uma conta
* `API Keys` → `Criar chave API`, copie a chave `sk-...`
* Realize um depósito de qualquer valor (o mínimo de ¥1 é suficiente para ativar)

## Configuração no Cherry Studio

* Abra o `Configurações → Serviços de modelos`, localize o provedor **deepseek** e acesse a página de detalhes
* Insira a **Chave de API** em `sk-...`
* O **Endereço da API** padrão é `https://api.deepseek.com`, não é necessário alterar
* Clique em **Obter lista de modelos**

## Usos recomendados

| Modelo | Cenários adequados |
| ------------------- | ---------------------------------- |
| `deepseek-chat` | Conversas gerais, excelente custo-benefício |
| `deepseek-reasoner` | Matemática, código, raciocínio complexo. Observe que a saída incluirá blocos de pensamento `<thinking>` |

## Navegação nativa

Os modelos do DeepSeek com capacidade de navegação podem usar diretamente a busca na web nativa do provedor. Ao selecionar um modelo, verifique se há um ícone 🌐 ao lado do nome; o escopo específico de suporte pode mudar conforme as atualizações do provedor, portanto, não é recomendado basear-se apenas no nome do modelo.

Ao ativar o 🌐 em uma conversa, se a opção 【Priorizar serviço de busca configurado】 em 【Configurações】→【Busca na Web】 estiver ativada, o Cherry Studio priorizará o uso do serviço de busca configurado; apenas ao desativar essa opção, a navegação nativa do modelo será priorizada. Consulte o modo de navegação.

## Combinação com memória global

O DeepSeek não possui modelos de incorporação próprios. Se você for usar uma base de conhecimento:

* Recomenda-se usar modelos de incorporação de outros provedores (como o `bge-m3` da [SiliconFlow](siliconcloud.md) ou o `text-embedding-3-small` da [OpenAI](openai.md))
* O modelo de conversa pode continuar sendo o DeepSeek

{% hint style="info" %}
- Os preços do DeepSeek são cobrados por token, e a correspondência em cache pode reduzir significativamente os custos (consulte a documentação oficial)
- O conteúdo de pensamento do `deepseek-reasoner` é renderizado por padrão na conversa; é possível alternar o "Recolhimento automático do conteúdo de pensamento" em [Configurações da conversa](../../cherrystudio/preview/chat.md#dui-hua-she-zhi)
{% endhint %}

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e sugestões](../../question-contact/suggestions.md).
