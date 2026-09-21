---
icon: circle-question
---

# Perguntas frequentes

Ao encontrar um problema na base de conhecimento, primeiro identifique se a falha ocorre na importação, análise, divisão em trechos, recuperação ou resposta. Altere apenas uma variável por vez para saber qual ajuste realmente funcionou.

{% hint style="info" %}
A forma mais rápida de localizar o problema é usar a mesma pergunta real em toda a verificação: o texto contém a resposta, o Chunk está completo, a recuperação está correta e a resposta é fiel à fonte?
{% endhint %}

## Diagnóstico rápido em 5 etapas

{% stepper %}
{% step %}
### 1. Verifique o status dos materiais

Os materiais devem estar com o status 【Pronto】. Se permanecerem em processamento por muito tempo ou exibirem um erro, consulte a mensagem e confirme se o arquivo, o processador e o serviço de modelo estão disponíveis.
{% endstep %}

{% step %}
### 2. Verifique o texto analisado

Abra a visualização do texto e confirme se a resposta realmente está presente, se o texto digitalizado foi reconhecido e se colunas e tabelas estão na ordem correta.
{% endstep %}

{% step %}
### 3. Verifique os Chunks

Confirme se as condições e conclusões necessárias para responder estão em trechos compreensíveis. Evite que cabeçalhos, rodapés e sumários ocupem os resultados.

<figure><img src="../../../assets/5bd8c12bd8d08e785c6a4c42.webp" alt="Segmentação inteligente, separador, tamanho do trecho e sobreposição nas configurações avançadas da base de conhecimento"><figcaption><p>Se o texto estiver correto, mas os trechos estiverem incompletos, ajuste a divisão e reindexe os materiais antigos.</p></figcaption></figure>
{% endstep %}

{% step %}
### 4. Execute um teste de recuperação

Verifique o nome da fonte, a relevância e o conteúdo do trecho. Não encontrar nenhum trecho correto e encontrar o trecho correto muito abaixo na classificação são problemas diferentes.

<figure><img src="../../../assets/b44776524449cdefe62eaed3.webp" alt="Lista de resultados do teste de recuperação com nome da fonte, relevância e trecho encontrado"><figcaption><p>Primeiro confirme que a camada de recuperação retorna a evidência correta; depois ajuste o prompt da conversa.</p></figcaption></figure>
{% endstep %}

{% step %}
### 5. Verifique a conversa ou o Agent

Se a recuperação estiver correta, mas a resposta estiver errada, confirme se a base de conhecimento foi selecionada ou vinculada, peça uma resposta baseada somente nas fontes e divida a pergunta em fatos menores.
{% endstep %}
{% endstepper %}

## Onde relatar o problema

<figure><img src="../../../assets/66f4111676793ffe87e7a979.webp" alt="Fluxograma para escolher o canal de feedback conforme o tipo de problema"><figcaption><p>Faça primeiro o diagnóstico mínimo. Se o problema puder ser reproduzido, inclua etapas sem dados sensíveis, o erro e o resultado esperado.</p></figcaption></figure>

{% hint style="danger" %}
Não publique chaves de API, conteúdo de arquivos internos, endereços de e-mail ou caminhos locais sensíveis em capturas de tela, logs ou materiais de exemplo.
{% endhint %}

## Criação e importação

<details>

<summary>É possível criar uma base de conhecimento sem um modelo de embeddings?</summary>

Sim. Ao selecionar 【Não usar】, a pesquisa por palavras-chave BM25 continuará disponível. Adicione um modelo de embeddings quando precisar corresponder expressões diferentes.

</details>

<details>

<summary>Quais fontes e formatos de arquivo são compatíveis?</summary>

As fontes incluem arquivos, notas do Cherry Studio, diretórios locais e links da Web. Os formatos compatíveis incluem PDF, DOCX, DOC, PPTX, XLSX, XLS, Markdown, TXT, CSV, HTML e EPUB.

</details>

<details>

<summary>Quantos itens podem ser adicionados de uma vez?</summary>

Cada seleção interativa aceita até 20 itens. Para adicionar mais materiais, faça várias seleções ou use a opção de diretório.

</details>

<details>

<summary>Para materiais com o mesmo nome, devo escolher 【Manter todos】 ou 【Substituir】?</summary>

Ao atualizar políticas, manuais ou versões de notas, normalmente escolha 【Substituir】. Use 【Manter todos】 somente quando as versões realmente precisarem coexistir e inclua a data ou versão no nome.

</details>

<details>

<summary>O que fazer quando um material fica em processamento?</summary>

Verifique se o arquivo pode ser aberto, se o processador e o OCR estão disponíveis e se o serviço de modelo está configurado. Use a mensagem de erro para identificar se a falha ocorreu na leitura, análise ou geração de embeddings.

</details>

## Análise e recuperação

<details>

<summary>Por que um PDF digitalizado não contém texto?</summary>

Documentos digitalizados exigem OCR. Acesse 【Configurações】→【Processamento de documentos】, selecione um OCR disponível e reindexe o documento. Para layouts complexos, experimente um processador de documentos especializado.

</details>

<details>

<summary>Por que o resultado não muda após alterar as configurações de Chunk?</summary>

As novas configurações não reprocessam automaticamente os materiais antigos. Execute 【Reindexar】 nos itens relacionados e repita o teste com a mesma pergunta.

</details>

<details>

<summary>O que fazer quando o teste de recuperação não retorna nenhum resultado?</summary>

Verifique, nesta ordem, o status do material, se o texto contém a resposta, se as palavras-chave originais encontram resultados, se os embeddings foram concluídos, se o limiar de reordenação está alto demais e se o Top K está baixo demais.

</details>

<details>

<summary>O que fazer quando a fonte está correta, mas o trecho está incompleto?</summary>

Examine os Chunks e confirme se as condições e conclusões foram separadas. Aumente moderadamente o tamanho do Chunk ou a sobreposição, ou reorganize materiais mal estruturados como notas claras e reindexe-os.

</details>

<details>

<summary>O que fazer quando o resultado correto aparece muito abaixo?</summary>

Remova primeiro os materiais duplicados e desatualizados; depois considere um modelo de embeddings. Quando os candidatos estiverem corretos, mas a ordem for instável, adicione reordenação e ajuste novamente o limiar.

</details>

<details>

<summary>Qual valor usar para Top K?</summary>

Comece com 6 e use perguntas fixas para comparar omissões, ruído e tempo de resposta. O Top K pode variar de 1 a 50; aumentá-lo não é uma correção universal.

</details>

## Conversas e Agent

<details>

<summary>O que fazer quando a base de conhecimento não está disponível na conversa?</summary>

Selecione um modelo compatível com chamadas de ferramentas e remova os anexos da mensagem atual. Confirme também que pelo menos uma base de conhecimento contém materiais prontos.

</details>

<details>

<summary>O que fazer quando a resposta não exibe as fontes?</summary>

Confirme se uma base de conhecimento está realmente selecionada na área de entrada e use a mesma pergunta no teste de recuperação. Se o teste não retornar o trecho correto, corrija primeiro a base de conhecimento.

</details>

<details>

<summary>A recuperação está correta, mas a resposta continua imprecisa. O que fazer?</summary>

Peça ao modelo para responder somente com base nas citações, divida a tarefa em fatos menores e verifique manualmente as conclusões importantes. Nesse caso, o problema costuma estar no prompt, no modelo ou na organização do contexto.

</details>

<details>

<summary>Por que o Agent não encontra a base de conhecimento?</summary>

Abra 【Editar Agent】→【Base de conhecimento】, vincule a base desejada ao Agent atual e ative 【Pesquisa na base de conhecimento】 em 【Ferramentas integradas】.

</details>

<details>

<summary>O gerenciamento da base de conhecimento altera os materiais?</summary>

Sim. O 【Gerenciamento da base de conhecimento】 permite adicionar, excluir ou atualizar documentos. Não o ative para tarefas somente de leitura; antes de operações de gravação, verifique o destino, o impacto e a forma de reversão.

</details>

## Modelos, dados e backup

<details>

<summary>Por que a troca do modelo de embeddings exige uma reconstrução?</summary>

Vetores gerados por modelos de embeddings diferentes não podem ser combinados diretamente. Confirme primeiro que o novo modelo funciona, mantenha um backup completo e reconstrua o índice vetorial existente.

</details>

<details>

<summary>Qual é a relação entre reordenação e limiar de similaridade?</summary>

A reordenação atribui novas pontuações aos trechos candidatos, e o limiar remove os resultados com pontuação baixa. Se nenhum modelo de reordenação estiver configurado, o limiar de similaridade não aparecerá nas configurações da base de conhecimento.

</details>

<details>

<summary>O fluxo fica totalmente offline após baixar um modelo de embeddings local?</summary>

Não necessariamente. Para que o fluxo seja totalmente offline, a análise, o OCR, a reordenação e o chat também precisam usar recursos locais.

</details>

<details>

<summary>Alterações no arquivo original ou na página da Web são atualizadas automaticamente?</summary>

Não. Arquivos, notas e páginas da Web são armazenados com o conteúdo existente no momento da importação. Adicione novamente o material com o mesmo nome, escolha 【Substituir】 e execute um teste de recuperação.

</details>

<details>

<summary>O backup reduzido inclui os arquivos da base de conhecimento?</summary>

Não inclui os arquivos de dados completos da base de conhecimento. Use um backup completo antes de migrar ou excluir dados e, após a restauração, valide os materiais e a recuperação.

</details>

## Referência de configuração: linha de base para diagnóstico

| Item | Ponto de partida recomendado | Quando ajustar |
| ----- | ---------------------------- | ------------- |
| Top K | 6 | Quando trechos corretos forem omitidos ou houver ruído demais |
| Limiar de similaridade | Comece em 0,0 após configurar a reordenação | Quando houver muito ruído com pontuação baixa e ainda existir margem para os trechos corretos |
| Chunk | Mantenha a segmentação inteligente padrão | Quando condições e conclusões forem separadas ou os trechos forem longos demais |
| Modelo de embeddings | Adicione somente quando o BM25 não for suficiente | Quando perguntas coloquiais ou sinônimos não encontrarem resultados de forma consistente |
| Modelo de reordenação | Adicione quando os candidatos estiverem corretos, mas a ordem for instável | Não serve para corrigir erros de análise ou texto ausente |

## Caso de uso

Xiaolin percebeu que a pergunta sobre o “limite de despesas de hospedagem” recebia uma resposta incorreta no chat. Primeiro, executou um teste de recuperação com a mesma pergunta e constatou que a fonte correta não aparecia. Ao abrir o texto, descobriu que as colunas do PDF estavam fora de ordem. Depois de trocar o processador e reindexar o documento, a recuperação e a resposta do chat voltaram ao normal.

Esse processo alterou apenas uma variável do analisador, permitindo confirmar a causa raiz em vez de aumentar ao mesmo tempo Top K, Chunk e o limiar na tentativa de encontrar uma solução.

{% hint style="warning" %}
Se o problema persistir, registre a versão do aplicativo, o sistema operacional, o processador, os modelos de embeddings e reordenação, o erro completo, uma amostra mínima sem dados sensíveis, o resultado da recuperação e a fonte esperada.
{% endhint %}

## Continue lendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Análise de documentos e OCR</strong></td><td>Resolva problemas de digitalização, ordem incorreta e tabelas ausentes.</td><td><a href="document-preprocessing.md">document-preprocessing.md</a></td></tr><tr><td><strong>Configurações de modelo e recuperação</strong></td><td>Entenda embeddings, reordenação, limiares e reconstrução.</td><td><a href="emb-models-info.md">emb-models-info.md</a></td></tr><tr><td><strong>Dados, privacidade e manutenção</strong></td><td>Confira os limites de backups e serviços em nuvem.</td><td><a href="data.md">data.md</a></td></tr></tbody></table>
