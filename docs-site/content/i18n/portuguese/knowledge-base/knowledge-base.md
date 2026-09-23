---
icon: compass
---

# Introdução às bases de conhecimento

Uma base de conhecimento organiza arquivos, notas, pastas e páginas web para consultas recorrentes. Confira se a busca encontra os trechos corretos antes de usar a base no chat ou com um Agent.

{% hint style="info" %}
O modelo de embedding é opcional. Selecione **Nenhum (None)** para começar com busca por palavras-chave BM25. Adicione um modelo quando precisar de busca semântica. O modelo de reranking também é opcional.
{% endhint %}

## Crie sua primeira base

1. <a id="criar-base-de-conhecimento"></a>Abra **Base de conhecimento** na navegação à esquerda e use o botão de adicionar acima da lista. Escolha um nome específico, como “Política de viagens da equipe”.

2. <a id="adicionar-modelos-de-embedding"></a>No primeiro teste, configure **Modelo de embedding** como **Nenhum (None)**. Adicione um modelo depois se precisar reconhecer sinônimos ou perguntas com outras palavras.

3. <a id="adicionar-dados-de-múltiplas-fontes"></a><a id="adicionar-arquivos-e-vetorizar"></a>Abra a base e adicione um **Arquivo**, uma **Nota**, uma **Pasta** ou um **Link**. Comece com poucos materiais relevantes.

4. Aguarde o processamento e examine o texto extraído e os **Chunks**. Verifique caracteres ilegíveis, páginas ausentes e ordem incorreta.

5. <a id="pesquisar-na-base-de-conhecimento"></a>Abra **Teste de recuperação (Retrieval Test)** e faça uma pergunta real cuja resposta você conhece. Confira se a fonte correta aparece entre os primeiros resultados.

6. <a id="gerar-respostas-com-base-de-conhecimento-em-diálogos"></a>Quando a recuperação estiver confiável, selecione a base na área de entrada do chat ou associe-a na página de edição do Agent.

![Fontes: arquivos, notas, pastas e links](../../../assets/4622da2093d43942d7ee443e.webp)

## Confira antes de confiar nas respostas

Mantenha de 3 a 5 perguntas reais e repita os testes após alterar dados ou configurações. Se a busca falhar, examine primeiro o texto e os Chunks. O modelo de chat não pode recuperar fatos essenciais que não foram encontrados.

Os preços e o tratamento de dados dos modelos de embedding ou reranking na nuvem dependem do provedor. Separe materiais com diferentes requisitos de acesso.
