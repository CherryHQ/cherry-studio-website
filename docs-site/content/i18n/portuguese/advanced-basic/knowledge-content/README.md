---
icon: brain
---
# Fluxo de trabalho de conhecimento e conteúdo

Bancos de conhecimento, notas, pintura e tradução não são ferramentas isoladas. Elas são responsáveis, respectivamente, por organizar materiais, consolidar conteúdo, criar materiais visuais e processar arquivos multilíngues, e todas podem ser usadas pelo Agent.

<figure><img src="../../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="Primeiro, use testes de recuperação com problemas reais e, em seguida, permita que o Agent crie relatórios, traduções ou imagens com base nos materiais."><figcaption><p>Primeiro, use testes de recuperação com problemas reais e, em seguida, permita que o Agent crie relatórios, traduções ou imagens com base nos materiais. </p></figcaption></figure>

## Como os quatro pontos de entrada se dividem

| Entrada | Adequado para | Próximos passos comuns |
| ----- | ---------------------- | -------------- |
| 【Banco de Conhecimento】 | Permitir que os materiais sejam recuperados por perguntas | Vincular a um assistente de conversa ou Agent |
| 【Notas】 | Escrever, organizar e manter conteúdo Markdown a longo prazo | Exportar documentos ou adicionar ao banco de conhecimento |
| 【Pintura】 | Gerar, editar, mesclar e aprimorar imagens | Baixar ou usar em tarefas de conteúdo |
| 【Tradução】 | Processar texto, imagens e documentos | Favoritar resultados, reutilizar histórico ou continuar editando |

{% hint style="success" %}
Se o objetivo é "usar esses materiais para concluir uma entrega", informe diretamente ao Agent em 【Trabalho】 onde estão os materiais e o que deve ser produzido. Entre no módulo correspondente apenas quando for necessário organizar manualmente o banco de dados, ajustar imagens ou confirmar traduções parágrafo por parágrafo.
{% endhint %}

<figure><img src="../../../../assets/203ae7d1fc3c8b76bd8af0a8.webp" alt="Ao criar um novo banco de conhecimento, primeiro dê um nome e, em seguida, selecione o modelo de incorporação usado para a recuperação."><figcaption><p>Ao criar um novo banco de conhecimento, primeiro dê um nome e, em seguida, selecione o modelo de incorporação usado para a recuperação. </p></figcaption></figure>

## Dos materiais à entrega

{% stepper %}
{% step %}
### 1. Primeiro, organize as fontes

Adicione materiais de referência de longo prazo ao banco de conhecimento e mantenha rascunhos em edição nas notas ou no diretório de trabalho. Não importe todas as conversas temporárias não confirmadas para o banco de conhecimento.
{% endstep %}

{% step %}
### 2. Verifique se as informações-chave podem ser recuperadas

Use o teste de recuperação no banco de conhecimento para garantir que perguntas reais encontrem os trechos corretos. Se a recuperação falhar, corrija primeiro os materiais e as configurações; não deixe o Agent adivinhar.
{% endstep %}

{% step %}
### 3. Depois, crie texto, traduções e imagens

Peça ao Agent que redija o conteúdo com base nos materiais; refine as imagens e traduções em 【Pintura】 e 【Tradução】, respectivamente. Por fim, uma pessoa deve verificar os fatos e a expressão.
{% endstep %}
{% endstepper %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Construção de banco de conhecimento e teste de recuperação</strong></td><td>Da importação de materiais à verificação da recuperação</td><td><a href="knowledge-base.md">knowledge-base.md</a></td></tr><tr><td><strong>Notas, banco de conhecimento e Agent</strong></td><td>Permitindo o fluxo suave de rascunhos, materiais e tarefas</td><td><a href="notes-knowledge-agent.md">notes-knowledge-agent.md</a></td></tr><tr><td><strong>Geração, edição e aprimoramento de imagens</strong></td><td>Criando imagens utilizáveis a partir de modelos</td><td><a href="painting-workflow.md">painting-workflow.md</a></td></tr><tr><td><strong>Tradução de arquivos, imagens e textos longos</strong></td><td>Processando diferentes formatos e reutilizando resultados anteriores</td><td><a href="translation-workflow.md">translation-workflow.md</a></td></tr></tbody></table>
