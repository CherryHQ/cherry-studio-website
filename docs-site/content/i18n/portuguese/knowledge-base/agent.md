---
icon: robot
---
# Usando com Agent

Ao vincular uma base de conhecimento a um Agent, o Agent pode buscar e ler materiais autorizados em tarefas de múltiplas etapas; quando for necessário atualizar os materiais, é possível ativar a gestão da base de conhecimento.

{% hint style="info" %}
Conversas comuns são adequadas para perguntas e respostas pontuais, enquanto Agents são ideais para pesquisa contínua, comparação, geração de arquivos e verificação por etapas. O Agent acessa apenas as bases de conhecimento vinculadas na configuração.
{% endhint %}

## Diferenças entre conversa comum e Agent

| Conversa comum | Agent |
| ------------ | --------------- |
| Seleção temporária da base de conhecimento antes de cada mensagem | Vinculação de longo prazo na configuração do Agent |
| Adequada para perguntas instantâneas e comparações curtas | Adequada para pesquisa em múltiplas etapas e entrega de arquivos |
| Respostas principalmente com base em fragmentos recuperados | Pode buscar materiais e gerenciar a base de conhecimento conforme as permissões |
| O escopo dos materiais é definido pela conversa atual | O escopo acessível é definido pela configuração do Agent |

## Configurando um Agent somente leitura de base de conhecimento

{% stepper %}
{% step %}
### 1. Primeiro, valide a base de conhecimento

Confirme que os materiais-alvo estão prontos e realize testes de recuperação com perguntas reais. O Agent não pode corrigir conteúdo ausente ou segmentação incorreta.
{% endstep %}

{% step %}
### 2. Abra a janela de edição do Agent

Acesse [Trabalho], selecione o Agent desejado e abra [Editar Agente] no menu.
{% endstep %}

{% step %}
### 3. Vincule as bases de conhecimento mínimas necessárias

Abra a aba [Bases de Conhecimento] e clique em [Adicionar Base de Conhecimento]. Vincule apenas as bases necessárias para esta tarefa, evitando interferências entre materiais de diferentes departamentos ou versões.
{% endstep %}

{% step %}
### 4. Ative a busca na base de conhecimento

Abra [Ferramentas Integradas] e ative [Busca na Base de Conhecimento]. Para pesquisa somente leitura, perguntas e respostas, resumos e comparações, isso geralmente é suficiente.

<figure><img src="../../../assets/39a4ea66c712c2736e5ccf34.webp" alt="A busca é para leitura, a gestão é para alterar materiais; comece com a menor permissão possível por padrão."><figcaption><p> A busca é para leitura, a gestão é para alterar materiais; comece com a menor permissão possível por padrão. </p></figcaption></figure>
{% endstep %}

{% step %}
### 5. Teste com tarefas de limites claros

Exija que o Agent liste as fontes antes de apresentar conclusões; se os materiais não oferecerem suporte, isso deve ser explicitado, sem permitir preenchimento com conhecimento geral.
{% endstep %}

{% step %}
### 6. Valide as fontes e os entregáveis

Verifique de qual base de conhecimento cada conclusão se origina, se os fatos e recomendações nos arquivos estão separados e se as partes sem evidência foram marcadas.
{% endstep %}
{% endstepper %}

## Como escolher entre ferramentas integradas, bases de conhecimento, habilidades e MCP

<figure><img src="../../../assets/cc38d8a6378ca8270ceda746.webp" alt="Use bases de conhecimento para consultar materiais, habilidades para métodos repetitivos e MCP para acessar sistemas externos; não substitua tarefas claras por ampliação de permissões."><figcaption><p> Use bases de conhecimento para consultar materiais, habilidades para métodos repetitivos e MCP para acessar sistemas externos; não substitua tarefas claras por ampliação de permissões. </p></figcaption></figure>

## Busca e gestão de bases de conhecimento

| Capacidade | O que pode fazer | Tarefas aplicáveis | Recomendação padrão |
| ----- | -------------- | ----------- | ----------- |
| Busca na base de conhecimento | Buscar, listar e ler bases de conhecimento vinculadas | Perguntas e respostas, pesquisa, resumos, comparações | Manter ativado |
| Gestão da base de conhecimento | Adicionar, remover ou atualizar documentos da base de conhecimento | Manutenção de materiais aprovada | Desativado por padrão, ativar temporariamente conforme necessário |

{% hint style="warning" %}
Vincular uma base de conhecimento apenas concede o escopo de acesso, não cria uma cópia separada. Após a atualização ou reindexação dos materiais, o Agent usará o conteúdo atualizado na próxima busca.
{% endhint %}

{% hint style="danger" %}
Após ativar [Gestão da Base de Conhecimento], adicionar, remover e atualizar alterará os materiais ou o índice. Antes de aprovar, confirme a base de conhecimento-alvo, os itens específicos, o método de resolução de conflitos de nomes e o plano de reversão.
{% endhint %}

## Como as configurações do Agent atuam em conjunto

<figure><img src="../../../assets/4c243884204ecf445fc42f9d.webp" alt="O modelo determina a compreensão e a geração, a base de conhecimento fornece evidências e as permissões determinam até que ponto o Agent pode executar."><figcaption><p> O modelo determina a compreensão e a geração, a base de conhecimento fornece evidências e as permissões determinam até que ponto o Agent pode executar. </p></figcaption></figure>

## Modelos de tarefas recomendados

### Pesquisar e gerar relatório

> Encontre todas as regulamentações sobre aprovação de viagens internacionais e seguros nas bases de conhecimento vinculadas. Primeiro, liste as fontes e pontos de conflito, depois gere uma lista de verificação em Markdown. Não preencha conteúdo sem suporte dos materiais.

### Atualizar perguntas frequentes

> Busque os itens existentes sobre reembolso de hospedagem e compare o regulamento mais recente com o FAQ antigo. Primeiro, apresente a lista de alterações propostas; após a aprovação, atualize os documentos relevantes.

### Comparação entre múltiplas bases de conhecimento

> Busque evidências separadamente nas bases de conhecimento "Manual do Produto" e "Casos de Pós-venda", organizando-as em três colunas: "Regras oficiais / Casos reais / Sugestões de discurso". Mantenha o nome da fonte para cada conclusão.

## Notas de configuração

| Item de configuração | Ponto de partida recomendado | Quando aumentar | Controle de riscos |
| ----- | ---------- | ------------ | ------------- |
| Bases de conhecimento vinculadas | 1 base relacionada à tarefa | Quando houver necessidade real de comparação entre bases | Especifique o uso de cada base no prompt |
| Busca na base de conhecimento | Ativado | Sempre que a tarefa exigir consulta de materiais | Valide se as fontes estão dentro do escopo vinculado |
| Gestão da base de conhecimento | Desativado | Quando for necessário adicionar, remover ou atualizar | Aprove item por item e faça backup dos materiais importantes primeiro |
| Requisitos de saída | Separar fatos, inferências e recomendações | Quando for necessário gerar relatórios ou arquivos | Mantenha o nome da fonte para cada fato |

## Caso de usuário

Xiao Lin vinculou [Manual Oficial] e [Casos de Revisão] ao Agent de pós-venda, ativando apenas a busca na base de conhecimento. Ele exigiu que o Agent listasse avisos de segurança, etapas oficiais e sugestões de casos por modelo de dispositivo, separando os três. Quando descobriu que casos antigos precisavam de atualização, ativou temporariamente a ferramenta de gestão, verificou a lista de alterações propostas antes de aprovar.

O critério de conclusão é: o Agent não acessa materiais não vinculados, não apresenta sugestões de casos como regras oficiais e todas as operações de escrita têm objetivo claro e resultado de validação.

## Validação de resultados

* As fontes provêm apenas das bases de conhecimento vinculadas ao Agent atual.
* Os resultados da busca cobrem cada condição da tarefa.
* Os entregáveis separam fatos dos materiais, inferências do Agent e recomendações.
* As operações de gestão descrevem o objetivo, o impacto e o resultado.
* Após atualizar os materiais, execute novamente as perguntas fixas de recuperação.

## Perguntas frequentes

<details>

<summary> A conversa comum encontra, por que o Agent não encontra? </summary>

Verifique se a base de conhecimento-alvo está vinculada ao Agent atual e se [Busca na Base de Conhecimento] está ativada. Os escopos de vinculação de diferentes Agents não se herdam mutuamente.

</details>

<details>

<summary> Quando não se deve ativar a gestão da base de conhecimento? </summary>

Para pesquisa somente leitura, bases de conhecimento de regulamentos compartilhados pela equipe e bases que preservam versões históricas, ative apenas a busca por padrão. Ative a gestão temporariamente e aprove item por item quando for necessário atualizar.

</details>

<details>

<summary> O que fazer se o Agent quiser operar uma base de conhecimento não vinculada? </summary>

Não amplie para todas as bases de conhecimento. Após confirmar que a tarefa realmente necessita, adicione a base-alvo ao Agent atual ou use um Agent que já tenha essa base vinculada.

</details>

## Continue lendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong> Usar em conversas </strong></td><td> Complete uma pergunta e resposta instantânea com fontes. </td><td><a href="chat.md">chat.md</a></td></tr><tr><td><strong> Dados, privacidade e manutenção </strong></td><td> Entenda os limites de permissões, serviços em nuvem e backups. </td><td><a href="data.md">data.md</a></td></tr><tr><td><strong> Casos de aplicação de bases de conhecimento </strong></td><td> Refira fluxos de trabalho de pós-venda e pesquisa. </td><td><a href="cases.md">cases.md</a></td></tr></tbody></table>
