---
icon: window-restore
---
# Janelas múltiplas e abas

Tópicos de conversa, tarefas de Agent e abas comuns podem ser extraídos da janela atual. A operação não duplica o conteúdo, apenas altera a posição de exibição.

<figure><img src="../../../../assets/b695c03a2d68db6c3e947867.webp" alt="Clique com o botão direito na aba de destino e selecione [Abrir em nova janela]; páginas usadas com frequência podem ser fixadas primeiro para evitar fechamento acidental."><figcaption><p>Clique com o botão direito na aba de destino e selecione [Abrir em nova janela]; páginas usadas com frequência podem ser fixadas primeiro para evitar fechamento acidental. </p></figcaption></figure>

## Abrir de um tópico ou tarefa

{% stepper %}
{% step %}
### 1. Localizar o tópico ou tarefa de Agent de destino

Clique com o botão direito no item de destino na lista de tópicos à esquerda ou na lista de tarefas de Agent.
{% endstep %}

{% step %}
### 2. Selecionar o método de abertura

Selecionar [Abrir em nova aba] mantém o item na janela principal; selecionar [Abrir em nova janela] cria diretamente uma janela independente, e a lista atual continua disponível para uso.
{% endstep %}

{% step %}
### 3. Gerenciar a janela independente

Clique em [Manter no topo] na parte superior para manter a janela à frente das outras; clique em [Voltar para a janela principal] para retornar o conteúdo atual à janela principal e fechar a janela independente.
{% endstep %}
{% endstepper %}

## Extrair de uma aba

Clique com o botão direito na aba na parte superior da janela principal e selecione [Abrir em nova janela]. Esta operação move a aba para uma janela independente e a remove da barra de abas da janela principal.

## Operações comuns de abas

* [Mover para o extremo esquerdo]: move a aba atual para a frente das abas comuns;
* [Fixar aba]: reduz a um ícone fixado e mantém na parte esquerda da barra de abas;
* [Fechar outras abas]: mantém apenas a página atual;
* [Fechar abas à direita]: organiza um lote de páginas temporárias;
* Arrastar abas: ajusta a ordem de abas do mesmo tipo.

## Cenário de uso: consultar materiais e monitorar tarefas simultaneamente

Mantenha a conversa de materiais na janela principal, abra a tarefa de Agent em execução [em nova janela] e mantenha a janela da tarefa no topo. Os materiais permanecem na conversa original, e a tarefa não reinicia devido à extração da janela. Após o término da tarefa, clique em [Voltar para a janela principal] para evitar o acúmulo de janelas independentes por longos períodos.

### Layout recomendado

A janela principal é responsável por materiais e buscas, enquanto a janela independente mantém apenas uma tarefa que requer monitoramento contínuo; use [Fixar aba] para abas comuns de projetos idênticos e feche páginas temporárias assim que concluídas.

### Critérios de conclusão

Os materiais ainda podem retornar à conversa original, a tarefa de Agent não reiniciou devido à extração da janela, e após o término da tarefa, retornou à janela principal ou a janela independente foi fechada.

{% hint style="warning" %}
Manter no topo altera apenas a hierarquia de exibição, não aumenta a prioridade da tarefa e não impede o hibernação do sistema. Para execução contínua em segundo plano, verifique o status do Agent e as configurações de energia do sistema.
{% endhint %}

<details>

<summary>Por que não é possível abrir abas internas ocultas em uma janela independente? </summary>

A janela independente opera em torno de um único conteúdo. Para abrir outros tópicos ou tarefas, use o menu de botão direito para abrir uma nova janela, ou primeiro clique em [Voltar para a janela principal] e depois gerencie as abas.

</details>
