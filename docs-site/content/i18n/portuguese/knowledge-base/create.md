---
icon: folder-open
---
# Criar base de conhecimento

As duas escolhas mais importantes na criação são o nome e o modelo de incorporação. Os materiais podem ser adicionados posteriormente, mas as fronteiras do nome e o método de recuperação afetarão a manutenção futura.

{% hint style="info" %}
Na primeira experiência, você pode definir o [Modelo de Incorporação] como [Não usar]. A base de conhecimento ainda usará a recuperação de palavras-chave BM25; basta primeiro executar o fluxo de importação e recuperação.
{% endhint %}

## Faça duas decisões antes de criar

### O nome deve indicar as fronteiras dos materiais

Prefira usar "objeto + finalidade", por exemplo [Política de Viagens de Funcionários], [Manual de Pós-venda do Produto] ou [Materiais de Pesquisa de Mercado]. Evite nomes como [Materiais] ou [Teste], que não permitem determinar o escopo do conteúdo no futuro.

### Escolha o método de incorporação

| Escolha | Cenário adequado | Método de recuperação | Pré-requisito |
| ------ | ------------- | ------------- | ------------ |
| Não usar | Primeira experiência, palavras-chave claras | Recuperação de palavras-chave BM25 | Nenhum |
| Modelo de incorporação em nuvem | A forma como o usuário faz perguntas difere significativamente do texto original dos materiais | Recuperação híbrida BM25 + vetores | O serviço do modelo correspondente deve estar disponível para chamadas |
| Modelo de incorporação local | Deseja concluir a vetorização localmente | Recuperação BM25 + vetores locais | Baixe primeiro em [Modelos Locais] |

## Etapas de criação

{% stepper %}
{% step %}
### 1. Abra a janela de criação

Abra a navegação à esquerda [Bases de Conhecimento] e clique no botão de adição acima da lista de bases de conhecimento.
{% endstep %}

{% step %}
### 2. Insira o nome

Insira um nome que indique o escopo, por exemplo [Política de Viagens de Funcionários].
{% endstep %}

{% step %}
### 3. Selecione o modelo de incorporação

Selecione um modelo de incorporação em nuvem ou local disponível; se a recuperação semântica não for necessária no momento, selecione [Não usar].

<figure><img src="../../../assets/7f1505c0527aeddf65937cdc.webp" alt="O nome define as fronteiras dos materiais; o modelo de incorporação determina se a recuperação vetorial será adicionada."><figcaption><p> O nome define as fronteiras dos materiais; o modelo de incorporação determina se a recuperação vetorial será adicionada. </p></figcaption></figure>
{% endstep %}

{% step %}
### 4. Clique em Criar

Após confirmar o nome e o modelo, clique em [Criar]. Após a criação, você entrará na base de conhecimento vazia.
{% endstep %}

{% step %}
### 5. Adicione o primeiro lote de materiais

Clique no botão Adicionar Materiais, importe um ou dois arquivos ou notas com respostas claras e aguarde a conclusão do processamento.
{% endstep %}
{% endstepper %}

## Usar modelo de incorporação local

Abra [Configurações] → [Modelos Locais] e baixe um modelo disponível na área [Modelos de Incorporação]. Os modelos e tamanhos de download exibidos na interface podem variar conforme o ambiente de instalação; considere a lista atual como referência.

<figure><img src="../../../assets/ba97a6075b29a5304d81dc79.webp" alt="Após o download, volte à página de criação ou configuração da base de conhecimento e selecione esse modelo."><figcaption><p> Após o download, volte à página de criação ou configuração da base de conhecimento e selecione esse modelo. </p></figcaption></figure>

{% hint style="warning" %}
A incorporação local significa apenas que a vetorização é concluída localmente. Se a análise de documentos, reordenação e chat usam a nuvem depende das respectivas seleções de serviço e modelo.
{% endhint %}

## Trocar o modelo após ter materiais

Ao ativar um modelo de incorporação em uma base de conhecimento que usa apenas BM25, é possível criar um índice vetorial. Ao trocar o modelo de incorporação em uma base de conhecimento que já possui vetores, a interface entrará no fluxo [Reconstruir Base de Conhecimento].

{% hint style="danger" %}
Antes de iniciar a reconstrução, confirme que o novo modelo pode ser chamado normalmente. Após a reconstrução, refaça o teste de recuperação; não troque o modelo e modifique a segmentação na mesma rodada, pois não será possível determinar a origem da variação nos resultados.
{% endhint %}

## Notas de configuração

| Item de configuração | Padrão do produto | Ponto de partida sugerido | Função | Cenário aplicável | Observações |
| ------ | ----- | ----------- | ---------- | ----------- | ------------------ |
| Nome | Vazio | Objeto + finalidade | Distinguir fronteiras de materiais | Todas as bases de conhecimento | Materiais com permissões ou ciclos de vida diferentes devem ser separados |
| Modelo de incorporação | Não usar | Na primeira experiência, não usar inicialmente | Determina se a recuperação vetorial será adicionada | Perguntas coloquiais, muitas expressões sinônimas | A cobrança e o processamento de dados de modelos em nuvem dependem do provedor |
| Modelo de incorporação local | Não baixado | Baixe quando houver necessidade de processamento local | Concluir a vetorização localmente | Offline ou requisitos de privacidade altos | Ainda é necessário verificar separadamente os modelos de análise, reordenação e chat |

## Resultado esperado

* A nova base de conhecimento aparece na lista, com um nome que a distingue das outras bases de conhecimento.
* Você sabe claramente se está usando recuperação por palavras-chave ou recuperação híbrida.
* O modelo em nuvem selecionado pode ser chamado, ou o modelo local já foi baixado.

## Caso de usuário

Xiao Lin criou pela primeira vez a base de conhecimento [Política de Viagens de Funcionários]. Ele primeiro selecionou [Não usar] para o modelo de incorporação, importou três políticas e concluiu o teste de recuperação. Após a consulta por palavras-chave se estabilizar, ele configurou o modelo de incorporação e comparou os resultados de perguntas coloquiais usando as mesmas questões.

O critério de conclusão é: após atualizar o método de recuperação, as perguntas fixas originais não regrediram e as perguntas coloquiais encontram a mesma política de forma mais estável.

## Perguntas frequentes

<details>

<summary> O que fazer se o botão Criar não estiver disponível? </summary>

Verifique se o nome está vazio e se o modelo selecionado ainda está disponível. Se o serviço do modelo não estiver configurado, você pode primeiro alterar para [Não usar] para concluir a criação.

</details>

<details>

<summary> Não usar o modelo de incorporação resultará em nenhuma busca? </summary>

Não. A base de conhecimento ainda usará a recuperação de palavras-chave BM25; quanto mais próximas forem as palavras da pergunta dos materiais, mais estáveis serão os resultados.

</details>

<details>

<summary> Cada tópico precisa de uma base de conhecimento separada? </summary>

Use "se devem ser recuperados juntos durante o uso" como critério. Materiais com permissões, ciclos de vida ou tópicos completamente diferentes são mais adequados para serem separados.

</details>

## Continue lendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong> Adicionar e organizar materiais </strong></td><td> Importe conteúdo e resolva conflitos de nomes idênticos. </td><td><a href="sources.md"> sources.md </a></td></tr><tr><td><strong> Verificar materiais e recuperação </strong></td><td> Aceite os resultados com perguntas reais. </td><td><a href="recall-test.md"> recall-test.md </a></td></tr><tr><td><strong> Configurações de modelo e recuperação </strong></td><td> Entenda incorporação, reordenação e reconstrução. </td><td><a href="emb-models-info.md"> emb-models-info.md </a></td></tr></tbody></table>
