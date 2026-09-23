# Moonshot AI (Kimi)

A Moonshot AI é uma equipe renomada de modelos de linguagem de grande escala na China, cujo produto principal é o **Kimi**, conhecido por seu **contexto ultralongo** (com capacidade de até 2 milhões de caracteres), ideal para enviar grandes blocos de documentos ou código para processamento pela IA.

## Obter a Chave de API

* Acesse a [Plataforma Aberta da Moonshot](https://platform.moonshot.cn/) para registrar uma conta
* Entre em `Gerenciamento de chaves API` para criar uma chave `sk-...`
* Realize um recarga de qualquer valor para ativar (o valor mínimo é muito baixo)

## Configurar no Cherry Studio

* Abra `Configurações → Serviços de modelos`, localize o provedor **Moonshot AI** e acesse a página de detalhes
* Insira a chave `sk-...`
* O endereço da API é `https://api.moonshot.cn` por padrão
* Clique em **Obter lista de modelos**

## Usos recomendados

| Modelo | Cenários adequados |
|---|---|
| `moonshot-v1-8k` | Contexto curto, barato e rápido |
| `moonshot-v1-32k` | Contexto médio, suficiente para o dia a dia |
| `moonshot-v1-128k` | Contexto longo, análise de documentos, revisão de código |
| `kimi-k2-* / k2.5-*` | Lançamento mais recente, com maior capacidade de raciocínio |

## Cenários adequados

* **Análise de PDFs / documentos ultralongos**: a vantagem do contexto longo da Moonshot é mais evidente
* **Revisão de grandes blocos de código**: permite inserir arquivos completos de uma vez, sem necessidade de divisão
* **Resumo de e-books inteiros**: modelos de contexto longo eliminam a necessidade de fatiamento manual

{% hint style="info" %}
* A função de "cache de contexto" da Moonshot pode reduzir significativamente o consumo de tokens em conversas repetidas; consulte a documentação oficial para mais detalhes
* O Kimi possui uma interface de chat própria na versão web, mas ao integrar a API através do Cherry Studio, você pode aproveitar recursos estendidos como assistentes, base de conhecimento e ferramentas MCP do Cherry Studio
{% endhint %}

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e Sugestões](../../question-contact/suggestions.md).
