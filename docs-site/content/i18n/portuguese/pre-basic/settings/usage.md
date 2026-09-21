---
icon: chart-line
---
# Estatísticas de Uso

As estatísticas de uso **consolidam o uso dos modelos no Cherry Studio em um painel visual**: quanto você gastou, quantos Tokens foram usados, quantas requisições foram feitas e qual modelo é o mais utilizado, tudo de forma clara. Isso ajuda a estimar custos, identificar consumos anômalos e facilitar a escolha entre diferentes modelos.

Abra `Configurações → Estatísticas de uso`. A página é dividida em três seções: **Visão Geral / Explorar / Requisições**. No canto superior direito, você pode alternar entre **Últimos 30 dias / Últimos 90 dias / Último ano**, e todos os dados são calculados com base no intervalo selecionado.

<figure><img src="../../../../assets/9ccf4fd668065e8e789301e5.webp" alt=""><figcaption><p>Estatísticas de Uso [Visão Geral]: cartões de métricas no topo + mapa de calor de atividade diária abaixo (o custo total na imagem foi ocultado)</p></figcaption></figure>

### Visão Geral

Um conjunto de cartões de métricas no topo:

| Métrica | Significado |
| --- | --- |
| **Custo Total** | Estimativa de gastos no intervalo (convertida com base nos preços públicos de cada modelo, apenas para referência) |
| **Número de Requisições** | Total de requisições iniciadas |
| **Total de Tokens** | Volume total de Tokens de entrada + saída |
| **Taxa de Acerto de Cache** | Proporção de acertos no cache de prompt (leituras de cache acertadas ÷ entradas observáveis); quanto maior, mais economia |
| **Dias Ativos / Maior Sequência de Dias** | Dias com registro de uso e dias consecutivos de uso |
| **Dia de Pico** | Data com o maior uso diário e seu volume de Tokens |
| **Modelo com Maior Uso** | Modelo com maior consumo no intervalo |
| **Média Diária** | Média de Tokens e número de requisições por dia |

O **mapa de calor de Atividade Diária** abaixo exibe a intensidade do uso por dia. Você pode alternar entre as dimensões **Token / Custo**, onde cores mais escuras indicam maior uso naquele dia.

### Explorar / Análise

Ao alternar para **Explorar**, você pode realizar análises detalhadas do uso: dividir por **Grupo** (fornecedor / modelo / chave de API / assistente·Agent), selecionar uma **Métrica** e visualizar a distribuição e as tendências usando gráficos como **barras / linhas / pizza / segmentos**.

### Detalhes das Requisições

**Requisições** lista os registros individuais de cada requisição, facilitando a identificação de quais requisições geraram o maior consumo.

> Deseja ver por um dia específico? Clique em um dia no mapa de calor de **Atividade Diária** na Visão Geral. A área de Exploração (Análise + Requisições) será **detalhada** para aquele dia, e o título mudará para "Detalhes de [Data]"; clique em "Limpar filtro de data" para voltar.

{% hint style="info" %}
O custo é um **valor estimado**: ele é convertido com base nos preços públicos dos modelos, mas a cobrança real segue as faturas dos provedores de cada modelo. Modelos gratuitos e modelos locais não geram custos.
{% endhint %}

***

### Obter Ajuda e Enviar Feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e Sugestões](../../question-contact/suggestions.md).
