---
icon: box-archive
---
# Adicionar e organizar materiais

A base de conhecimento suporta arquivos, notas do Cherry Studio, diretórios locais e endereços de páginas web individuais. Após a importação, é necessário verificar o status de processamento, o conteúdo principal e os Chunks, além de reindexar quando os materiais forem atualizados.

{% hint style="info" %}
O critério de conclusão não é "o arquivo já aparece na lista", mas sim que o material seja legível, os Chunks estejam completos e que perguntas reais recuperem a fonte correta.
{% endhint %}

## Selecionar a entrada correta

<figure><img src="../../../assets/4622da2093d43942d7ee443e.webp" alt="Selecione a entrada com base na origem do material: use [Arquivo] para poucos arquivos, [Diretório] para conjuntos de arquivos do mesmo tipo, [Nota] para conteúdo do Cherry Studio e [Link] para páginas web públicas."><figcaption><p>Selecione a entrada com base na origem do material: use [Arquivo] para poucos arquivos, [Diretório] para conjuntos de arquivos do mesmo tipo, [Nota] para conteúdo do Cherry Studio e [Link] para páginas web públicas. </p></figcaption></figure>

| Entrada | Tipo de material adequado | Relação após importação | Principais observações |
| -- | ----------------------- | ----------- | ------------------ |
| Arquivo | PDF, Office, Markdown, texto, etc. | Salva uma cópia gerenciada | Selecione no máximo 20 itens por vez |
| Nota | Conteúdo já organizado no Cherry Studio | Importa um snapshot do conteúdo no momento da importação | Alterações subsequentes na nota original não são sincronizadas automaticamente |
| Diretório | Um conjunto de arquivos locais sobre o mesmo tema | Cria entradas de material com base no conteúdo do diretório | Não importe diretórios inteiros com conteúdo irrelevante |
| Link | Uma única página web de acesso público | Salva um snapshot da página no momento da captura | Páginas de login, renderizadas por scripts ou com restrições de acesso podem ser incompletas |

{% hint style="warning" %}
Os arquivos suportados incluem PDF, DOCX, DOC, PPTX, XLSX, XLS, MD, TXT, CSV, HTML e EPUB. PDFs digitalizados ou conteúdo em formato de imagem também requerem verificação de OCR.
{% endhint %}

## Adicionar e validar materiais

{% stepper %}
{% step %}
### 1. Selecionar a origem do material

Abra a base de conhecimento, clique no botão Adicionar material e selecione [Arquivo], [Nota], [Diretório] ou [Link].
{% endstep %}

{% step %}
### 2. Confirmar o conteúdo selecionado

Arquivos e notas podem ser selecionados em lote; a adição interativa permite no máximo 20 itens por vez. Para mais materiais, adicione em lotes ou use a entrada de Diretório.
{% endstep %}

{% step %}
### 3. Resolver conflitos de nomes

Se o novo material tiver o mesmo nome de uma entrada existente, selecione [Manter todos] ou [Substituir]. Ao atualizar regulamentos, manuais e snapshots de notas, geralmente selecione [Substituir].

{% hint style="warning" %}
Selecionar [Manter todos] fará com que o conteúdo antigo e novo participem simultaneamente da recuperação. Faça isso apenas se precisar consultar diferentes versões em paralelo, indicando a data ou versão no nome.
{% endhint %}
{% endstep %}

{% step %}
### 4. Aguardar a conclusão do processamento

O material passa por etapas de cópia, leitura, segmentação e indexação. Se nenhum modelo de incorporação estiver configurado, vetores não serão criados, mas um índice de palavras-chave ainda será estabelecido.

<figure><img src="../../../assets/2414cfc005a860f127a4fd96.webp" alt="Após o material entrar em estado disponível, verifique aleatoriamente o conteúdo principal e os Chunks."><figcaption><p>Após o material entrar em estado disponível, verifique aleatoriamente o conteúdo principal e os Chunks. </p></figcaption></figure>
{% endstep %}

{% step %}
### 5. Verificar aleatoriamente o conteúdo principal e os Chunks

Abra o material para visualizar o conteúdo principal ou acesse os Chunks pelo menu da linha do material. Verifique principalmente a ordem dos títulos, tabelas, texto OCR e se frases-chave foram divididas incorretamente.
{% endstep %}

{% step %}
### 6. Concluir o teste de recuperação

Use uma pergunta com resposta clara para verificar a fonte e o fragmento corretos. Após atualizar o material, realize o teste novamente com o mesmo conjunto de perguntas.

<figure><img src="../../../assets/b44776524449cdefe62eaed3.webp" alt="Na validação final, considere a fonte, a integridade dos fragmentos e a ordenação, não apenas se resultados foram retornados."><figcaption><p>Na validação final, considere a fonte, a integridade dos fragmentos e a ordenação, não apenas se resultados foram retornados. </p></figcaption></figure>
{% endstep %}
{% endstepper %}

## Status do material e métodos de tratamento

| Fenômeno | Possível causa | Método de tratamento |
| ----------- | ------------------ | ------------------ |
| Processamento demorado | Arquivo grande, analisador ou modelo indisponível | Verifique o arquivo original, o processamento de documentos e o modelo de incorporação |
| Exibição de erro | Falha na cópia, leitura, segmentação ou indexação | Abra a mensagem de erro e trate conforme a etapa falha |
| Conteúdo principal ausente ou ilegível | Processador de arquivo incompatível, conteúdo digitalizado sem OCR | Altere o método de processamento de documentos ou configure OCR |
| Chunk sem frases-chave | Limites de segmentação inadequados | Ajuste a segmentação e execute [Reindexar] |
| Versões antiga e nova recuperadas simultaneamente | Material com mesmo nome selecionado como [Manter todos] | Exclua a entrada antiga ou reimporte selecionando [Substituir] |

## Reindexação e exclusão

Após alterações na segmentação, analisador ou configurações de incorporação, as entradas antigas não aplicam automaticamente as novas configurações. Use [Reindexar] para um único material ou selecione materiais em lote para reindexação.

{% hint style="danger" %}
Excluir uma entrada remove a cópia gerenciada e o índice da base de conhecimento atual. Isso não exclui o arquivo original ou a nota original, mas confirme antes da exclusão se a base de conhecimento contém a única cópia.
{% endhint %}

## Configurações

| Item de configuração | Padrão do produto | Ponto de partida sugerido | Função | Cenário aplicável | Observações |
| ------ | ------- | ---------- | --------------- | ---------- | ---------------- |
| Quantidade por adição | Máximo de 20 itens | Adicione primeiro uma pequena quantidade de materiais representativos | Controla a escala de uma importação | Primeira criação da base ou solução de problemas | Valide a análise e a recuperação antes de importações em massa |
| Tratamento de nomes iguais | Seleção em caso de conflito | Priorize [Substituir] para atualizações de material | Decide se entradas antigas e novas coexistem | Atualização de regulamentos, manuais e notas | [Manter todos] pode fazer com que conteúdo antigo participe da recuperação |
| Reindexação | Execução manual | Execute após mudanças de configuração | Permite que materiais antigos usem nova análise, segmentação ou modelo | Otimização ou correção de materiais | É obrigatório refazer o teste de recuperação após a conclusão |

## Caso de usuário

Xiao Lin atualiza o regulamento de viagens a trabalho mensalmente. Ele importa o novo arquivo com o mesmo nome e seleciona [Substituir]. Após o processamento do material, verifica aleatoriamente o conteúdo principal e os Chunks, e testa regras de hospedagem, transporte e aprovação com perguntas fixas.

O critério de conclusão é: as regras antigas não aparecem mais nos resultados de recuperação, e as condições e valores das novas regras são recuperados de forma consistente.

## Perguntas frequentes

<details>

<summary>Após modificar a nota original, a base de conhecimento é atualizada automaticamente? </summary>

Não. A nota importa um snapshot do conteúdo no momento da importação. Após a modificação, é necessário reimportar selecionando [Substituir] ou executar [Reindexar] no material correspondente.

</details>

<details>

<summary>Por que a página web capturou apenas parte do conteúdo? </summary>

Páginas web que exigem login, dependem de renderização por scripts ou têm restrições de acesso podem não ser capturadas completamente. Você pode usar arquivos ou notas para salvar o conteúdo principal antes de importar.

</details>

<details>

<summary>Excluir uma entrada da base de conhecimento exclui o arquivo original? </summary>

Não exclui o arquivo original ou a nota original, mas remove a cópia gerenciada e o índice da base de conhecimento.

</details>

## Continuar lendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Análise de documentos e OCR </strong></td><td>Trata conteúdo principal ausente, ilegível e conteúdo digitalizado. </td><td><a href="document-preprocessing.md">document-preprocessing.md </a></td></tr><tr><td><strong>Verificar materiais e recuperação </strong></td><td>Valide a qualidade da busca com perguntas fixas. </td><td><a href="recall-test.md">recall-test.md </a></td></tr><tr><td><strong>Dados, privacidade e manutenção </strong></td><td>Entenda backups, exclusão e limites do serviço. </td><td><a href="data.md">data.md </a></td></tr></tbody></table>
