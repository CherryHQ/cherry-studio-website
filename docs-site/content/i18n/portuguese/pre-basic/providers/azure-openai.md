# Azure OpenAI

O Azure OpenAI é um serviço de modelos OpenAI hospedado pela Microsoft na plataforma Azure, ideal para equipes que necessitam de conformidade empresarial, garantias de residência de dados ou integração com o ecossistema Microsoft.

## Preparação prévia

* Assinatura do Azure ativada
* Solicitação e aprovação de acesso ao Azure OpenAI Service realizadas no Azure Portal
* Pelo menos um **Recurso (Resource)** e uma **Implantação (Deployment)** criados

## Obter a Chave de API

* Azure Portal → seu recurso do Azure OpenAI → `Keys and Endpoint`
* Copie `KEY 1` ou `KEY 2` e anote o `Endpoint` (formato: `https://<your-name>.openai.azure.com/`)

## Configuração no Cherry Studio

* Abra `Configurações → Serviços de modelos`, localize o provedor **Azure OpenAI** e acesse a página de detalhes
* **Chave de API**: insira a chave copiada
* **Endereço da API**: insira o Endpoint do recurso (sem o caminho final)
* **Versão da API**: insira a versão da API da sua implantação no campo específico (por exemplo, `2024-08-01-preview`)
* Clique em **Obter lista de modelos** ou adicione manualmente o nome dos modelos já implantados no Azure (ou seja, o Nome da Implantação, e não o ID original do modelo OpenAI)

{% hint style="warning" %}
**Nome da Implantação vs. ID do Modelo**: no Azure, utiliza-se o nome atribuído à implantação (por exemplo, `gpt-4o-prod`), e não o ID original como `gpt-4o`. Um erro de preenchimento resultará em erro 404.
{% endhint %}

## Usos recomendados

* **gpt-4o / gpt-4o-mini**: conversas gerais, Agent
* **gpt-4 turbo**: contexto longo
* **text-embedding-3-**\*: modelos de incorporação, utilizáveis em bases de conhecimento

## Problemas comuns

* **401 Não autorizado**: verifique se a chave está correta e se há barras finais desnecessárias no Endpoint
* **404 Não encontrado**: verifique se o Nome da Implantação corresponde ao do Azure e se a Versão da API foi preenchida
* **429 Limitado**: verifique as cotas do Azure (página Quota & Limits)

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e sugestões](../../question-contact/suggestions.md).
