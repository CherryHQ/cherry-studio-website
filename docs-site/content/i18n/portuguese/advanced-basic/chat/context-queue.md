---
icon: layer-group
---
# Conversas longas, contexto e mensagens em fila

Quanto mais longa for a conversa, mais histórico o modelo precisa ler. Quando o uso do contexto se aproxima do limite, os conteúdos mais antigos podem não continuar a participar na resposta. Em vez de continuar adicionando "continue" repetidamente, é melhor organizar periodicamente as conclusões e as questões pendentes.

<figure><img src="../../../../assets/e9e4f4f66770c61bcaf40ea6.webp" alt="Ajuste as configurações avançadas apenas quando precisar mudar o estilo de resposta ou o tratamento de conversas longas; se não tiver certeza, mantenha os valores atuais."><figcaption><p>Ajuste as configurações avançadas apenas quando precisar mudar o estilo de resposta ou o tratamento de conversas longas; se não tiver certeza, mantenha os valores atuais. </p></figcaption></figure>

### Gerenciamento de conversas longas

{% stepper %}
{% step %}
#### 1. Observar as indicações de contexto

Quando a interface indicar que a pressão de contexto está aumentando, pare de adicionar anexos grandes e verifique quais itens do histórico ainda estão relacionados ao objetivo atual.
{% endstep %}

{% step %}
#### 2. Pedir ao modelo para gerar um resumo de transição

Peça que ele liste separadamente "fatos confirmados, conclusões atuais, problemas pendentes e restrições que não podem ser perdidas". Isso é mais adequado para continuar o trabalho do que um simples "resuma".
{% endstep %}

{% step %}
#### 3. Iniciar um novo tópico para continuar

Coloque o resumo de transição e os arquivos necessários em um novo tópico. Na primeira mensagem, especifique qual objetivo será tratado a seguir. Mantenha o tópico original como referência.
{% endstep %}
{% endstepper %}

### Ajuste do gerenciamento global de contexto

Caminho: [Configurações] → [Geral] → [Gerenciamento de Contexto]. Essas configurações se aplicam a conversas com assistentes padrão; um assistente individual também pode sobrescrevê-las em suas próprias configurações.

| Item de configuração | Valor padrão do produto | Ponto de partida sugerido | Função | Cenário de aplicação | Observações |
| -------- | -------- | ------- | ------------- | ------------- | --------------- |
| Número de mensagens recentes a manter | Sem limite | Sem limite inicialmente | Envia apenas as últimas mensagens ao modelo | Tarefas curtas com janela fixa | Um valor muito baixo pode fazer o modelo esquecer requisitos ainda válidos |
| Habilitar gerenciamento de contexto | Ativado | Manter ativado | Gerencia resultados de ferramentas muito longos e compacta o histórico | Conversas longas, tarefas com muitas chamadas de ferramentas | Ao desativar, resultados grandes ocupam mais facilmente o contexto |
| Limite de truncamento de saída de ferramentas | 50000 caracteres | Manter padrão | Armazena resultados grandes e permite que o modelo os leia em partes | Resultados de ferramentas de páginas web, logs e documentos longos | Não equivale a excluir o resultado original |
| Compactação automática | Ativado | Manter ativado | Resume o histórico mais antigo quando se aproxima do limite da janela | Trabalho contínuo em várias rodadas | A compactação é um resumo e não garante a retenção de cada detalhe |
| Modelo de compactação | Segue o modelo atual | Seguir o modelo atual inicialmente | Seleciona o modelo que gera o resumo do histórico | Quando é necessário controlar separadamente velocidade ou custo | Trocar o modelo adiciona variáveis à depuração |

[Configurações] → [Modelo Padrão] também oferece [Tentativas de chamada de modelo]. Desativado por padrão; ao ativar, tenta no máximo 3 vezes por padrão e usa backoff exponencial, além de permitir a seleção de modelos de fallback em sequência. As tentativas e o fallback só têm efeito antes que o modelo comece a gerar a saída; não retoma uma resposta parcialmente gerada com outro modelo.

### Uso da fila de mensagens

Enquanto o modelo ainda está respondendo, você pode adicionar o próximo pedido à fila. Isso é adequado para adicionar uma ação subsequente clara, por exemplo, "após concluir, organize em três conclusões". Se precisar corrigir imediatamente a direção atual durante a execução de um Agent, use o [Atalho de Direcionamento]; se precisar recomeçar completamente, pare a geração atual e reespecifique o objetivo.

<figure><img src="../../../../assets/a62a413bccd43d18b59ee293.webp" alt="Durante a pausa, você pode verificar os resultados primeiro; após retomar, as mensagens em fila continuarão a ser enviadas na ordem de cima para baixo."><figcaption><p>Durante a pausa, você pode verificar os resultados primeiro; após retomar, as mensagens em fila continuarão a ser enviadas na ordem de cima para baixo. </p></figcaption></figure>

Na imagem: ① Duas mensagens em fila no tópico atual; ② Retomar o envio automático. Após retomar, as mensagens continuarão a ser enviadas na ordem de cima para baixo.

{% hint style="info" %}
A fila não é um plano de automação. Ela é responsável apenas pelas mensagens subsequentes no tópico atual; para executar em horários fixos, use [Tarefas Agendadas].
{% endhint %}

#### Caso de aplicação: Revisão de um relatório longo

Primeiro, faça o upload do relatório e peça para listar os problemas por seção. Enquanto o modelo processa, adicione à fila, em sequência, "após concluir, organize a lista de riscos" e "por fim, gere a lista de verificação". Se precisar verificar os resultados da primeira rodada primeiro, pode pausar o envio automático; após confirmar que está tudo certo, retome. Assim, não é preciso ficar monitorando a conversa para enviar cada mensagem individualmente, evitando que o próximo requisito seja executado antes da verificação.

<details>

<summary>Por que o modelo esqueceu de repente um requisito mencionado anteriormente? </summary>

Primeiro, verifique se a conversa está muito longa, se o modelo foi alterado e se o requisito crítico apareceu apenas uma vez. Escreva regras estáveis nas instruções claras da tarefa atual; para reutilização de longo prazo, use o prompt do Agent ou habilidades.

</details>

<details>

<summary>Por que o modelo esqueceu de repente um requisito mencionado anteriormente? </summary>

Primeiro, verifique se a conversa está muito longa, se o modelo foi alterado e se o requisito crítico apareceu apenas uma vez. Escreva regras estáveis nas instruções claras da tarefa atual; para reutilização de longo prazo, use o prompt do Agent ou habilidades.

</details>
