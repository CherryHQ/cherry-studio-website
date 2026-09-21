---
icon: comments
---
# Uso em conversas

Após o teste de recuperação ser aprovado, você pode selecionar um ou mais bancos de conhecimento em uma conversa normal, permitindo que o modelo responda com base nos fragmentos recuperados e exiba as fontes.

{% hint style="info" %}
A conversa organiza a resposta, enquanto o banco de conhecimento fornece as evidências. Primeiro, confirme os fragmentos corretos no [Teste de Recuperação] e, em seguida, avalie se o prompt ou o modelo de chat precisa de ajustes.
{% endhint %}

## Pré-requisitos

| Item de verificação | Status aprovado |
| ----- | ---------------- |
| Modelo de chat | Suporta chamadas de ferramentas |
| Materiais do banco de conhecimento | Pelo menos um material está pronto |
| Mensagem atual | Não possui arquivos anexados simultaneamente |
| Qualidade da recuperação | Perguntas-chave encontram a fonte correta e o fragmento completo |

{% hint style="warning" %}
Quando a mensagem atual possui anexos, a seleção do banco de conhecimento fica desabilitada. Remova os anexos primeiro e, em seguida, selecione o banco de conhecimento na área de entrada.
{% endhint %}

## Concluir uma pergunta e resposta com fontes

{% stepper %}
{% step %}
### 1. Selecione um modelo que suporte chamadas de ferramentas

Crie ou abra uma conversa normal e confirme no seletor de modelos que o modelo atual suporta chamadas de ferramentas. Se a entrada do banco de conhecimento indicar capacidade insuficiente, troque o modelo primeiro.
{% endstep %}

{% step %}
### 2. Abra a seleção do banco de conhecimento

Clique no botão de adição no canto inferior esquerdo da área de entrada, selecione [Banco de Conhecimento] e marque um ou mais bancos de destino.
{% endstep %}

{% step %}
### 3. Confirme o status da seleção

O nome do banco de conhecimento deve aparecer na área de entrada. Se a pergunta envolver apenas um tópico, priorize a seleção de apenas um banco para reduzir a competição de fragmentos irrelevantes.

<figure><img src="../../../assets/5baecf3a1e479cb5a9627b45.webp" alt="Antes de enviar, confirme que o banco de conhecimento selecionado e a pergunta atual pertencem ao mesmo escopo de materiais."><figcaption><p>Antes de enviar, confirme que o banco de conhecimento selecionado e a pergunta atual pertencem ao mesmo escopo de materiais. </p></figcaption></figure>
{% endstep %}

{% step %}
### 4. Escreva claramente a tarefa, o escopo e o formato

Por exemplo: `Responda somente com base na base de conhecimento selecionada sobre os limites de hospedagem nas principais cidades da China. Separe por nível do cargo e indique a fonte de cada item.`
{% endstep %}

{% step %}
### 5. Abra a verificação de fontes

Verifique o nome da fonte, o conteúdo do fragmento e as condições de aplicação. Conteúdo não especificado nos materiais não deve ser completado como fato.
{% endstep %}

{% step %}
### 6. Em caso de falha, retorne ao teste de recuperação

Use a mesma pergunta para verificar os fragmentos retornados pelo banco de conhecimento. Se a recuperação estiver incorreta, corrija primeiro os materiais, a análise ou a busca; se a recuperação estiver correta, ajuste o prompt e o modelo de chat.

<figure><img src="../../../assets/b44776524449cdefe62eaed3.webp" alt="Quando a resposta da conversa não for ideal, os resultados de recuperação ajudam a determinar se o problema está na camada de busca ou na camada de resposta."><figcaption><p>Quando a resposta da conversa não for ideal, os resultados de recuperação ajudam a determinar se o problema está na camada de busca ou na camada de resposta. </p></figcaption></figure>
{% endstep %}
{% endstepper %}

## Como a resposta é formada

<figure><img src="../../../assets/192b7298d3bc060e6d5897c9.webp" alt="O modelo de chat vê os fragmentos finais recuperados, não lê automaticamente todos os materiais do banco de conhecimento."><figcaption><p>O modelo de chat vê os fragmentos finais recuperados, não lê automaticamente todos os materiais do banco de conhecimento. </p></figcaption></figure>

## Modelos de perguntas recomendados

### Consultar uma regra específica

> Responda apenas com base no banco de conhecimento selecionado: qual é o limite de hospedagem para cidades de primeira linha no país? Se os padrões variarem por nível de cargo, liste-os separadamente e indique a fonte após cada item.

### Comparar múltiplos materiais

> Compare as diferenças de aprovação entre viagens de negócios domésticas e internacionais. Organize em uma tabela com "Condições de gatilho, Aprovador, Materiais antes da partida"; marque como "Não especificado" onde os materiais não fornecerem detalhes.

### Exigir distinção entre fatos e sugestões

> Primeiro, liste os fatos suportados pelo texto original da política; em seguida, forneça sugestões operacionais separadamente. As sugestões não devem ser apresentadas como requisitos da política, e cada fato deve manter o nome da fonte.

{% hint style="success" %}
Uma boa pergunta contém simultaneamente quatro elementos: a tarefa a ser concluída, o escopo de materiais permitido, o formato de saída esperado e como lidar com lacunas nos materiais.
{% endhint %}

## Selecionar um ou vários bancos de conhecimento

| Situação | Sugestão | Motivo |
| --------- | -------------- | --------------- |
| Pergunta sobre política ou produto único | Selecione apenas um banco | Reduz a competição de fragmentos irrelevantes |
| Comparação entre departamentos ou produtos | Selecione vários bancos e explique o uso de cada um | Ajuda o modelo a manter os limites das fontes |
| Resultados misturados de vários bancos | Divida em várias perguntas para verificação separada | Confirme primeiro que cada banco pode recuperar independentemente |
| Pesquisa de múltiplas etapas de longo prazo | Use um Agent vinculado ao banco de conhecimento | Mais adequado para busca contínua, organização e entrega de arquivos |

## Notas de configuração

| Item de configuração | Ponto de partida recomendado | Função | Observações |
| ----- | ----------- | --------- | ------------ |
| Quantidade de bancos de conhecimento | 1 | Controla o escopo dos materiais | Aumente apenas se houver necessidade real de múltiplos bancos |
| Escopo da pergunta | Escreva explicitamente "apenas com base no banco de conhecimento" | Reduz a completude por conhecimento comum | Conclusões importantes ainda devem ser verificadas com as fontes |
| Formato de saída | Tabela ou lista itemizada | Facilita a verificação item a item | Exija "Não especificado" em vez de suposições |
| Pergunta de regressão | Use a mesma pergunta do teste de recuperação | Distingue problemas de busca e de resposta | Altere apenas uma variável por rodada |

## Consolidar conteúdo de conversa no banco de conhecimento

O Cherry Studio pode salvar mensagens, tópicos ou notas no banco de conhecimento. Antes de salvar, remova suposições do modelo, conteúdo duplicado e discussões temporárias, e use títulos que indiquem o tópico e a versão.

Após salvar, um novo instantâneo de material é criado, sem sincronização em tempo real com a conversa ou nota original. Atualizações de conteúdo exigem novo salvamento ou substituição.

## Caso de usuário

Xiaolin fez uma pergunta sobre o limite de hospedagem no [Regulamento de Viagens de Funcionários]. A primeira resposta incluiu conhecimento comum do modelo. Ele alterou o prompt para "escrever 'não especificado' quando os materiais não especificarem" e exigiu que cada item mantivesse a fonte. Em seguida, abriu cada citação para verificar o nível da cidade, o cargo e o valor.

O critério de conclusão é: cada valor deve ser diretamente suportado pelo fragmento citado, e exceções não especificadas na política não devem ser completadas autonomamente pelo modelo.

## Perguntas frequentes

<details>

<summary>Por que a entrada do banco de conhecimento está cinza? </summary>

Selecione primeiro um modelo que suporte chamadas de ferramentas e remova os anexos da mensagem atual; em seguida, confirme que existe pelo menos um banco de conhecimento com materiais prontos.

</details>

<details>

<summary>Por que a resposta não tem fontes? </summary>

Confirme que a área de entrada ainda exibe o banco de conhecimento selecionado e coloque a mesma pergunta no teste de recuperação. Se não houver recuperação correta, corrija o banco de conhecimento primeiro.

</details>

<details>

<summary>O que fazer se a fonte estiver correta, mas a conclusão for imprecisa? </summary>

Exija que o modelo responda apenas com base nas citações, divida a tarefa em itens de fato menores e verifique manualmente as conclusões importantes. Neste caso, geralmente trata-se de um problema de prompt, capacidade do modelo ou organização do contexto.

</details>

## Continue lendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Verificar materiais e recuperação </strong></td><td>Confirme primeiro que os fragmentos corretos podem ser encontrados de forma consistente. </td><td><a href="recall-test.md">recall-test.md </a></td></tr><tr><td><strong>Usar com Agent </strong></td><td>Permita que o banco de conhecimento participe de tarefas de múltiplas etapas e entrega de arquivos. </td><td><a href="agent.md">agent.md </a></td></tr><tr><td><strong>Casos de aplicação de banco de conhecimento </strong></td><td>Reutilize casos de políticas, pós-venda e pesquisa. </td><td><a href="cases.md">cases.md </a></td></tr></tbody></table>
