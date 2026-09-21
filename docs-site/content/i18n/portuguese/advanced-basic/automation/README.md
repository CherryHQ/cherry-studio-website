---
icon: gears
---
# Automação e Integração Externa

A automação no Cherry Studio não é um conjunto isolado de "configurações de robôs". O Agent é responsável por executar o trabalho, os canais são responsáveis por receber e enviar mensagens de plataformas externas, as tarefas agendadas são responsáveis por iniciar o Agent em horários específicos e o heartbeat é usado para que o Agent verifique periodicamente suas tarefas contínuas.

<figure><img src="../../../../assets/c348e2cb27a028b3789ac09b.webp" alt="Gatilhos, execução, notificações e histórico de execução são etapas distintas; primeiro execute o Agent manualmente com sucesso, depois integre gradualmente os outros componentes."><figcaption><p>Gatilhos, execução, notificações e histórico de execução são etapas distintas; primeiro execute o Agent manualmente com sucesso, depois integre gradualmente os outros componentes. </p></figcaption></figure>

## Como os quatro componentes se integram

| Capacidade | Responsabilidade | Casos de uso típicos |
| ----- | --------------- | ------------------ |
| Agent | Executa tarefas e gera resultados | Resumo, verificação, escrita, processamento de arquivos |
| Canal | Recebe mensagens externas e envia notificações | Robô de grupo no Feishu, chat privado no Telegram |
| Tarefa agendada | Executa o Agent em horários definidos | Relatórios diários, relatórios semanais, lembretes únicos |
| Heartbeat | O Agent verifica tarefas contínuas em intervalos | Monitorar fluxos longos, verificar pendências |

<figure><img src="../../../../assets/e2328ba60a3ff5012831c39e.webp" alt="Os canais são responsáveis por conectar o Agent ao Feishu, Telegram, QQ, WeChat, Discord ou Slack."><figcaption><p>Os canais são responsáveis por conectar o Agent ao Feishu, Telegram, QQ, WeChat, Discord ou Slack. </p></figcaption></figure>

## Ordem correta de configuração

{% stepper %}
{% step %}
### 1. Primeiro, execute a tarefa com sucesso em [Trabalho]

Confirme que o modelo, o prompt, o diretório de trabalho e as ferramentas do Agent geram os resultados esperados de forma estável.
{% endstep %}

{% step %}
### 2. Depois, deixe o Agent guiar a configuração do canal

Na conversa com o Agent, especifique a plataforma e o uso, por exemplo: "Conecte este Agent ao grupo do Feishu para receber solicitações de relatório diário". Prepare as permissões do robô e as credenciais conforme as instruções.
{% endstep %}

{% step %}
### 3. Verifique o status com a configuração manual

Abra [Configurações] → [Canais], verifique as credenciais, o Agent vinculado, o workspace, o escopo de sessões permitidas e o modo de permissão do canal, e envie uma mensagem de teste.
{% endstep %}

{% step %}
### 4. Por fim, crie a tarefa agendada

Você pode pedir diretamente ao Agent para criar, ou abrir [Configurações] → [Tarefas Agendadas] → [Nova]. Selecione o Agent já validado, o workspace, o horário e o canal de notificação.
{% endstep %}
{% endstepper %}

## Verificação antes de ir para produção

* O canal permite apenas os IDs de sessão ou canal necessários;
* A entrada externa usa [Herdar configurações do agente] ou permissões mais restritivas;
* O prompt da tarefa agendada não contém chaves ou caminhos que mudam;
* Execute manualmente [Executar] uma vez e consulte o registro de execução;
* Em caso de falha, localize a tarefa correspondente no Cherry Studio, evitando interpretar "não enviado" como "não executado".

## Caso de usuário: Relatório diário de operações em dias úteis

O Agent "Relatório diário de operações" lê dados do diretório de trabalho e gera o relatório diário com base nas habilidades da equipe. O canal do Feishu é responsável por enviar o resultado para o grupo designado, e a tarefa agendada é executada todas as manhãs em dias úteis. Antes de ir para produção, execute manualmente, depois envie uma mensagem ao robô no Feishu para estabelecer o destino de recebimento e, por fim, ative o agendamento.

<details>

<summary>Qual é a diferença entre heartbeat e tarefa agendada? </summary>

O heartbeat faz o Agent verificar tarefas contínuas em intervalos, adequado para "há novidades?"; a tarefa agendada tem um plano de execução e registro de execução definidos, adequado para "o que fazer às X horas todos os dias". Para relatórios diários fixos, prefira usar a tarefa agendada.

</details>
