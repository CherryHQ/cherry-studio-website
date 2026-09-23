---
icon: lightbulb
---
# Casos de uso de base de conhecimento

A confiabilidade de uma base de conhecimento não depende da quantidade de materiais, mas da clareza dos limites, da manutenibilidade das fontes e da capacidade de recuperar consistentemente evidências corretas para problemas reais.

{% hint style="info" %}
Os parâmetros abaixo servem apenas como ponto de partida. Comece executando o fluxo de importação, recuperação e uso com 3 a 10 materiais representativos, e depois expanda com base em um conjunto fixo de perguntas.
{% endhint %}

## Comece projetando com o mesmo método

{% stepper %}
{% step %}
### 1. Defina a tarefa final

Especifique a decisão ou o entregável que o usuário precisa realizar, como consultar políticas, diagnosticar falhas ou gerar relatórios de pesquisa.
{% endstep %}

{% step %}
### 2. Estabeleça os limites dos materiais

Inclua na mesma base de conhecimento apenas os materiais que devem ser recuperados juntos durante o uso. Separe prioritariamente conteúdos com permissões, ciclos de vida, modelos de produto ou versões diferentes.
{% endstep %}

{% step %}
### 3. Escolha as fontes e o método de atualização

Defina quem mantém os documentos, notas, diretórios e páginas da web, quando substituí-los e se é necessário manter versões históricas.
{% endstep %}

{% step %}
### 4. Prepare perguntas de aceitação

Prepare 3 a 10 perguntas reais, cobrindo fatos precisos, regras condicionais, perguntas coloquiais e versões que podem ser confundidas.
{% endstep %}

{% step %}
### 5. Ajuste o esquema de recuperação

Mantenha inicialmente uma configuração simples. Adicione embeddings quando o BM25 não for suficiente para lidar com expressões sinônimas; adicione reordenação quando os candidatos corretos aparecerem, mas a ordem for instável.
{% endstep %}

{% step %}
### 6. Integre ao chat ou ao Agent

Use chat padrão para uma única troca de perguntas e respostas; vincule um Agent quando for necessária pesquisa em múltiplas etapas, comparação e entrega de arquivos. Verifique cada fonte individualmente antes do lançamento.
{% endstep %}
{% endstepper %}

## Caso de usuário 1: Perguntas e respostas sobre políticas internas

### Objetivo

Permitir que os funcionários consultem aprovações de viagens, padrões de hospedagem e exceções de reembolso, e que possam abrir as fontes para verificar o texto original.

### Organização dos materiais

* Base de conhecimento: [Política de Viagens de Funcionários]
* Item: [Fluxo de aprovação de viagens]
* Item: [Consulta rápida de padrões de hospedagem]
* Item: [Perguntas frequentes sobre viagens]

<figure><img src="../../../assets/2414cfc005a860f127a4fd96.webp" alt="As cláusulas da política e as perguntas frequentes são mantidas separadamente, de modo que a atualização de uma delas não exija a recriação de todos os materiais."><figcaption><p>As cláusulas da política e as perguntas frequentes são mantidas separadamente, de modo que a atualização de uma delas não exija a recriação de todos os materiais.</p></figcaption></figure>

### Configuração recomendada

| Item | Ponto de partida | Quando ajustar |
| ---- | ---------- | ----------------- |
| Recuperação | Comece com BM25 | Adicione embeddings quando a linguagem dos funcionários diferir significativamente da redação da política |
| Reordenação | Não usar inicialmente | Ative quando os candidatos corretos já aparecerem, mas a ordem for instável |
| Versão dos materiais | Manter apenas a versão atual | Inclua o ano no nome quando a auditoria histórica exigir a coexistência de versões |
| Requisitos de resposta | Separar conclusão, condições e fontes | Marque explicitamente quando os materiais não especificarem |

### Perguntas de aceitação

1. Qual é o valor máximo de reembolso para hospedagem em viagem?
2. O aluguel de carro no exterior pode ser reembolsado?
3. Quem aprova quando o custo total estimado excede 5.000 yuans?
4. Como é tratado o caso de reservar um hotel sem aprovação prévia?

### Prompt de chat

> Responda apenas com base na "Política de Viagens de Funcionários". Dê a conclusão primeiro, depois liste as condições aplicáveis e as fontes; se os materiais não especificarem, escreva "não especificado na política", não preencha com conhecimento comum.

{% hint style="success" %}
Quando a aceitação for aprovada, a mesma política deve ser recuperada tanto pela pergunta original quanto pela pergunta coloquial, e os valores, papéis e condições na resposta devem ser diretamente suportados pelas citações.
{% endhint %}

## Caso de usuário 2: Assistente de pós-venda de produtos

### Objetivo

Organizar manuais oficiais, códigos de falha e casos revisados para que o suporte técnico forneça primeiro sugestões de diagnóstico seguras e rastreáveis.

### Limites dos materiais

| Base de conhecimento ou grupo de materiais | Conteúdo | Princípio de manutenção |
| ------- | ------------- | ------------- |
| Manual oficial | Especificações, limites de garantia, etapas padrão | Manter modelo e versão do documento |
| Códigos de falha | Uma seção por falha | Indicar firmware e modelo de dispositivo aplicáveis |
| Casos revisados | Casos com causa e solução confirmadas | Não importar diretamente registros de chat não revisados |

Quando as regras diferirem significativamente entre modelos, divida em bases de conhecimento independentes por modelo para evitar que códigos de falha idênticos competam entre si.

### Configuração de recuperação e Agent

* Verifique primeiro o sumário, tabelas e texto em duas colunas em PDFs.
* Códigos de falha dependem de termos precisos, mantenha o BM25.
* Adicione um modelo de embeddings quando a descrição do cliente for mais coloquial.
* Vincule o manual oficial e os casos revisados ao Agent de pós-venda, ativando apenas [Busca na base de conhecimento].

> Diagnostique em três etapas com base no modelo do dispositivo, no código de falha e nos sintomas. Indique em cada etapa se a base vem do manual oficial ou de um caso revisado. Ao envolver desmontagem, uso de eletricidade ou limpeza de dados, avise primeiro dos riscos e aguarde confirmação.

### Critérios de aceitação

* Não aplicar etapas de outros modelos ao modelo atual.
* Avisos de segurança devem aparecer antes das etapas operacionais.
* Separar regras oficiais de sugestões de casos.
* Transferir para atendimento humano quando não houver suporte dos materiais, não especular.

## Caso de usuário 3: Materiais de pesquisa e relatórios

### Objetivo

Extrair evidências verificáveis de artigos, notas de entrevistas e capturas de páginas da web, e depois usar um Agent para gerar um relatório comparativo com fontes.

### Organização dos materiais

* Crie bases por pergunta de pesquisa, não coloque todos os artigos em uma única base grande.
* Os nomes dos arquivos devem incluir autor, ano e título curto.
* As notas de entrevista devem indicar o papel do entrevistado, a data e se podem ser citadas.
* Registre a data de captura dos materiais da web, pois a base de conhecimento armazena a captura no momento da importação.

<figure><img src="../../../assets/8cd27fa50051cc96320b280a.webp" alt="Valide primeiro a cobertura das fontes com perguntas fixas na base de pesquisa, antes de entregar ao Agent para síntese entre documentos."><figcaption><p>Valide primeiro a cobertura das fontes com perguntas fixas na base de pesquisa, antes de entregar ao Agent para síntese entre documentos.</p></figcaption></figure>

### Prompt do Agent

> Procure evidências de "por que os usuários abandonam a configuração inicial" na base de conhecimento de pesquisa vinculada. Liste primeiro as visões originais e limitações por fonte, depois sintetize consensos, divergências e hipóteses a serem verificadas. Gere um relatório em Markdown; não escreva inferências como se fossem palavras originais dos entrevistados.

### Da evidência ao entregável

<figure><img src="../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="Mantenha primeiro as evidências e limitações, e depois deixe o Agent organizar em relatório; não deixe o produto final ocultar as fontes originais."><figcaption><p>Mantenha primeiro as evidências e limitações, e depois deixe o Agent organizar em relatório; não deixe o produto final ocultar as fontes originais.</p></figcaption></figure>

### Critérios de aceitação

* Consensos devem ser suportados por pelo menos duas fontes independentes.
* Divergências devem manter suas respectivas condições, sem forçar a fusão.
* Citações, inferências e sugestões devem ter identificação clara.
* Capturas de páginas da web e versões de artigos devem ser rastreáveis.

## Notas de configuração: Tabela de design reutilizável

| Item | Pergunta a responder |
| ---- | ---------------------- |
| Objetivo | Que decisão o usuário deve tomar ou que resultado deve entregar? |
| Limites | Quais materiais devem ser recuperados juntos e quais devem ser separados? |
| Fontes | Como atualizar arquivos, notas, diretórios e páginas da web? |
| Análise | Que tipo de documento tem maior probabilidade de ter problemas de OCR, tabelas ou ordem? |
| Recuperação | O BM25 é suficiente? Quando são necessários embeddings e reordenação? |
| Perguntas de aceitação | Quais 3 a 10 perguntas representam o uso real? |
| Tratamento de falhas | O que fazer em caso de nenhum resultado, versões conflitantes ou falta de suporte dos materiais? |
| Manutenção | Quem é responsável por substituir materiais, reindexar e fazer backup? |

{% hint style="warning" %}
Não considere "importar muitos materiais" como critério de conclusão. Quanto mais materiais, mais necessária é a gestão explícita de versões duplicadas, mistura de permissões e competição de ruído.
{% endhint %}

## Perguntas frequentes

<details>

<summary>Políticas, manuais e casos devem estar na mesma base de conhecimento?</summary>

Depende se eles devem ser recuperados juntos na mesma pergunta e se as permissões e ciclos de atualização são consistentes. Quando as diferenças forem significativas, dividir as bases facilita o controle dos limites das fontes.

</details>

<details>

<summary>Posso importar todos os chats de suporte diretamente na base de casos?</summary>

Não é recomendado. Revise primeiro as causas, soluções e conteúdo de privacidade, importando apenas casos confirmados e reutilizáveis.

</details>

<details>

<summary>O que fazer antes de expandir os materiais?</summary>

Mantenha um conjunto fixo de perguntas de aceitação, importe em lotes e reteste. Se novos materiais piorarem os resultados, será possível localizar rapidamente qual lote de conteúdo causou o problema.

</details>

## Continue lendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Introdução à base de conhecimento</strong></td><td>Execute primeiro a criação, importação, recuperação e uso.</td><td><a href="knowledge-base.md">knowledge-base.md</a></td></tr><tr><td><strong>Usando com Agent</strong></td><td>Configure pesquisa em múltiplas etapas e permissões de materiais.</td><td><a href="agent.md">agent.md</a></td></tr><tr><td><strong>Perguntas frequentes</strong></td><td>Localize problemas de materiais, recuperação ou respostas a partir dos sintomas.</td><td><a href="troubleshooting.md">troubleshooting.md</a></td></tr></tbody></table>
