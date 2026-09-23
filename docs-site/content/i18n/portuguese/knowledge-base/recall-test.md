---
icon: flask
---
# Verificação de Recursos e Recuperação

O teste de recuperação verifica diretamente se a pergunta encontra o trecho correto, sem passar primeiro pelo modelo de chat para refinamento. Ele ajuda a identificar se o problema está nos recursos, na análise, na segmentação ou nas configurações de busca.

{% hint style="info" %}
Prepare 3 a 5 perguntas reais cujas respostas você já conhece e use-as repetidamente após cada atualização de recursos, modelos ou segmentação. Perguntas fixas facilitam a identificação de regressões em comparação com testes improvisados.
{% endhint %}

## Preparar perguntas de teste

Recomenda-se cobrir três tipos de perguntas:

* Fatos precisos, por exemplo: "Qual é o limite de hospedagem nas principais cidades do país?"
* Regras condicionais, por exemplo: "Em que circunstâncias o aluguel de carro no exterior pode ser reembolsado?"
* Itens suscetíveis a confusão, por exemplo: "Quem deve aprovar adicionalmente viagens de negócios acima de 5.000 yuan?"

Não use apenas títulos de recursos ou frases exatas do texto original para testes, pois isso superestima o desempenho real.

## Concluir um teste de recuperação

{% stepper %}
{% step %}
### 1. Abrir o teste de recuperação

Abra a navegação à esquerda [Base de Conhecimento] → selecione a base de conhecimento → acesse [Teste de Recuperação].
{% endstep %}

{% step %}
### 2. Inserir uma pergunta real

Insira uma pergunta com resposta clara e execute o teste. A pergunta deve se aproximar da linguagem cotidiana; não copie deliberadamente o texto original dos recursos.
{% endstep %}

{% step %}
### 3. Verificar origem e trecho

Confirme que a origem está correta e que o trecho contém simultaneamente as condições e a conclusão necessárias para a resposta.

<figure><img src="../../../assets/b44776524449cdefe62eaed3.webp" alt="Não verifique apenas se há resultados; examine também a origem, a integridade do trecho e a ordem."><figcaption><p>Não verifique apenas se há resultados; examine também a origem, a integridade do trecho e a ordem. </p></figcaption></figure>
{% endstep %}

{% step %}
### 4. Identificar o problema com base nos sintomas

Se não houver nenhum trecho correto, verifique primeiro os recursos, a análise e a segmentação. Se os trechos corretos aparecerem, mas a ordem for instável, considere então o modelo de incorporação, a reordenação ou o Top K.
{% endstep %}

{% step %}
### 5. Ajustar um item por vez e retestar

Modifique apenas uma configuração por rodada. Se envolver análise, segmentação ou índice, execute [Reindexar] primeiro e, em seguida, reteste usando o mesmo conjunto de perguntas.
{% endstep %}
{% endstepper %}

## Como interpretar os resultados

| Sintoma | Descrição | Próxima etapa |
| ------------- | --------------------- | ---------------------- |
| Origem correta aparece primeiro, trecho completo | Recuperação basicamente adequada | Teste algumas variações de pergunta |
| Nenhum resultado correto | Recursos não prontos, conteúdo ausente, grande diferença na formulação da pergunta ou limiar muito alto | Verifique em sequência os recursos, o texto principal, os Chunks e as configurações de busca |
| Origem correta, mas o trecho falta frases-chave | Análise ou limites de segmentação não ideais | Verifique os Chunks, ajuste e reindexe |
| Versões antigas e novas aparecem simultaneamente | Recursos com o mesmo nome foram todos mantidos | Exclua itens antigos ou use [Substituir] para reimportar |
| Itens corretos frequentemente aparecem no final | Muitos candidatos ou ordenação instável | Limpe os recursos, considere modelo de incorporação ou reordenação |
| Recuperação correta, mas resposta do chat imprecisa | O problema provavelmente está no prompt ou no modelo de chat | Mantenha as configurações de recuperação, ajuste a pergunta e o modelo de chat |

{% hint style="warning" %}
O modelo de chat não consegue recuperar recursos-chave que não foram encontrados na etapa de recuperação. Se o resultado da recuperação for inadequado, não tente resolver o problema trocando repetidamente o modelo de chat.
{% endhint %}

## Ciclo de otimização

<figure><img src="../../../assets/8cd27fa50051cc96320b280a.webp" alt="Perguntas fixas → Verificar resultados → Identificar nível → Ajustar um item → Reindexar se necessário → Retestar."><figcaption><p>Perguntas fixas → Verificar resultados → Identificar nível → Ajustar um item → Reindexar se necessário → Retestar. </p></figcaption></figure>

Ordem recomendada:

1. Confirme que os recursos estão corretos, sem duplicatas ou versões desatualizadas.
2. Verifique o texto principal analisado e os Chunks.
3. Se houver grande diferença entre a formulação da pergunta e o texto original, considere o modelo de incorporação.
4. Se os candidatos forem aproximadamente corretos, mas a ordem for instável, considere então o modelo de reordenação.
5. Após os ajustes, reindexe e repita o mesmo conjunto de testes.

<figure><img src="../../../assets/5bd8c12bd8d08e785c6a4c42.webp" alt="Se os trechos não forem completos, verifique as configurações de segmentação; as alterações afetam apenas novos recursos, e os antigos precisam ser reindexados."><figcaption><p>Se os trechos não forem completos, verifique as configurações de segmentação; as alterações afetam apenas novos recursos, e os antigos precisam ser reindexados. </p></figcaption></figure>

## Descrição das configurações

| Item de configuração | Padrão do produto | Ponto de partida sugerido | Função | Cenário de aplicação | Observações |
| ------ | ------------ | -------- | ---------- | ---------- | ----------------- |
| Número de perguntas de teste | — | 3 a 5 | Estabelecer uma linha de base de qualidade repetível | Todas as bases de conhecimento | Cubra fatos precisos, regras condicionais e perguntas suscetíveis a confusão |
| Top K | 6, opcional 1 a 50 | Mantenha 6 inicialmente | Controla a quantidade final de trechos | Equilíbrio entre cobertura e ruído | Aumentar pode ocupar mais contexto |
| Limiar de similaridade | 0.0, exibido apenas após configurar reordenação | Comece com 0.0 | Filtra resultados de baixa pontuação após a reordenação | Ainda há ruído após a reordenação | Definir muito alto removerá trechos corretos |
| Método de reteste | — | Altere apenas um item por rodada | Determinar a origem da mudança nas configurações | Otimização, atualização de recursos ou modelos | Após modificar segmentação ou modelos, reindexe primeiro |

## Resultado esperado

* A origem correta aparece consistentemente nos primeiros resultados.
* O trecho contém as condições e a conclusão necessárias para responder à pergunta.
* Ao usar uma formulação natural diferente, os resultados permanecem estáveis.
* Após atualizar recursos ou configurações, as perguntas fixas não apresentam regressão significativa.

## Caso de usuário

Xiao Lin descobriu que "padrão de despesas de hospedagem" era encontrado usando o texto original, mas "quanto posso reembolsar por hotel" era instável. Ele primeiro confirmou que os recursos e os Chunks estavam normais, depois configurou o modelo de incorporação e retestou. Após os trechos corretos aparecerem, ocasionalmente ficavam no final, então ele adicionou o modelo de reordenação.

O critério de conclusão é: três formulações diferentes devem encontrar o mesmo padrão de hospedagem nos primeiros resultados, e o trecho deve conter as cidades aplicáveis e o limite de valor.

## Perguntas frequentes

<details>

<summary>Não há nenhum trecho correto; devo aumentar o Top K primeiro? </summary>

Verifique primeiro o texto principal dos recursos e os Chunks. Se houver erros de análise ou segmentação, aumentar o Top K apenas retornará mais trechos incorretos ou incompletos.

</details>

<details>

<summary>Por que não consigo ver o limiar de similaridade? </summary>

O [Limiar de similaridade] só é exibido nas configurações da base de conhecimento após selecionar um modelo de reordenação.

</details>

<details>

<summary>A recuperação está correta, mas a resposta do chat ainda é imprecisa. O que fazer? </summary>

Mantenha as configurações atuais de recuperação e verifique a formulação da pergunta, o contexto da conversa e o modelo de chat. Neste ponto, o problema geralmente não está mais na camada de busca de recursos.

</details>

## Leitura adicional

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Modelos e configurações de busca </strong></td><td>Ajuste incorporação, reordenação, Top K e segmentação. </td><td><a href="emb-models-info.md">emb-models-info.md </a></td></tr><tr><td><strong>Análise de documentos e OCR </strong></td><td>Trata texto ausente, caracteres ilegíveis e conteúdo digitalizado. </td><td><a href="document-preprocessing.md">document-preprocessing.md </a></td></tr><tr><td><strong>Uso em conversas </strong></td><td>Após a recuperação ser adequada, use a base de conhecimento para perguntas. </td><td><a href="chat.md">chat.md </a></td></tr></tbody></table>
