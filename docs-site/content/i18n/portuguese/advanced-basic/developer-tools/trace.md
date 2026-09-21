---
icon: timeline
---
# Rastreamento de chamadas e modo de desenvolvedor

O rastreamento de chamadas é usado para visualizar as solicitações de modelo, as chamadas de ferramentas e as interações MCP que ocorrem dentro de uma conversa ou tarefa do Agent. Ele é adequado para solução de problemas e análise de desempenho, não sendo uma função obrigatória para o chat diário.

<figure><img src="../../../../assets/7cb797e89c5a180b57971c67.webp" alt="Ao investigar chamadas MCP, primeiro confirme o servidor e a autenticação, e use o rastreamento de chamadas para determinar se a solicitação entrou nas etapas de execução do Agent e das ferramentas."><figcaption><p>Ao investigar chamadas MCP, primeiro confirme o servidor e a autenticação, e use o rastreamento de chamadas para determinar se a solicitação entrou nas etapas de execução do Agent e das ferramentas. </p></figcaption></figure>

### Como ativar

{% stepper %}
{% step %}
#### 1. Abra [Configurações] → [Geral]

Na área [Modo de desenvolvedor], ative [Habilitar modo de desenvolvedor].
{% endstep %}

{% step %}
#### 2. Reinicie o Cherry Studio

O modo de desenvolvedor entra em vigor após a reinicialização. Antes de reiniciar, confirme o status das tarefas do Agent em execução.
{% endstep %}

{% step %}
#### 3. Reproduza o problema

Envie novamente uma mensagem de teste mínima, mantendo apenas os modelos e ferramentas necessários, para reduzir chamadas irrelevantes.
{% endstep %}

{% step %}
#### 4. Abra o rastreamento de chamadas

No painel à direita da conversa ou do Agent, acesse [Rastreamento de chamadas], selecione um nó para visualizar entrada, saída, tempo de execução e status. Nas tarefas do Agent, você também pode ver o nome do Agent, a operação e a quantidade de chamadas de ferramentas.
{% endstep %}
{% endstepper %}

### Como interpretar os nós comuns

| Nó | Pontos de verificação | Problemas comuns |
| -------- | ------------------ | ---------------- |
| Solicitação de modelo | Modelo, entrada, saída, Token e status | Erros do provedor, contexto muito longo, saída vazia |
| Chamada de ferramenta | Nome da ferramenta, parâmetros, resultado | Erros de parâmetros, espera de permissão, retorno anormal da ferramenta |
| Chamada MCP | Nome do serviço, tipo de conexão, entrada e saída | Servidor desconectado, falha de autenticação, erro remoto |
| Execução do Agent | Agent, operação, quantidade de ferramentas e status | Falha em subtarefas, fluxo não finalizado |
| Solicitação HTTP | Método, URL, status e resposta | Endereço incorreto, problemas de rede ou autenticação |

{% hint style="danger" %}
O rastreamento de chamadas pode conter prompts, conteúdo de arquivos, cabeçalhos de solicitação e parâmetros de ferramentas. Antes de compartilhar capturas de tela ou exportar informações, é obrigatório remover API Key, Authorization, Cookie, e-mail, caminhos locais e dados de negócios.
{% endhint %}

### Caso de usuário: Ferramenta MCP retorna resultado vazio

Primeiro, confirme na página de configurações MCP que o servidor está normal e, em seguida, faça o Agent chamar apenas uma ferramenta. Se o rastreamento de chamadas mostrar que a solicitação chegou ao servidor, mas a saída está vazia, o problema provavelmente está nos dados do servidor ou nos parâmetros, e não na falta de vínculo do Agent. Se não houver nenhum nó MCP, volte à seção [MCP] do Agent para verificar o vínculo.

<details>

<summary>Por que ainda não consigo ver o rastreamento de chamadas após ativar? </summary>

Confirme que o aplicativo foi reiniciado e que uma nova solicitação foi feita após a reinicialização. As mensagens históricas geradas antes da ativação não terão os dados de chamada preenchidos automaticamente.

</details>

<details>

<summary>Por que ainda não consigo ver o rastreamento de chamadas após ativar? </summary>

Confirme que o aplicativo foi reiniciado e que uma nova solicitação foi feita após a reinicialização. As mensagens históricas geradas antes da ativação não terão os dados de chamada preenchidos automaticamente.

</details>
