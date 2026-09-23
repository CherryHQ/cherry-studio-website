---
icon: flask
---
# Revisão de pesquisa com múltiplos modelos

Uma equipe de produto está se preparando para uma revisão trimestral: os materiais internos já estão completos, mas ainda é necessário complementar com informações públicas e comparar as perspectivas oferecidas por diferentes modelos. O objetivo final é entregar um relatório de pesquisa que permita verificar as fontes, distinguindo claramente fatos de julgamentos.

<figure><img src="../../../../assets/290e0288048d57cd868cb443.webp" alt="No início da pesquisa, defina os modelos de comparação e o escopo das questões, evitando alterar os critérios arbitrariamente no meio do processo."><figcaption><p>No início da pesquisa, defina os modelos de comparação e o escopo das questões, evitando alterar os critérios arbitrariamente no meio do processo. </p></figcaption></figure>

<figure><img src="../../../../assets/49842a248b90a5707753efa1.webp" alt="Insira diferentes hipóteses em ramos independentes e, ao final, retorne à linha principal para consolidar as conclusões confirmadas."><figcaption><p>Insira diferentes hipóteses em ramos independentes e, ao final, retorne à linha principal para consolidar as conclusões confirmadas. </p></figcaption></figure>

<figure><img src="../../../../assets/20eae1a141993f3367a544b0.webp" alt="① Especifique claramente as dimensões de verificação e as condições conhecidas na pergunta; ② Estruture os resultados de forma uniforme para facilitar a comparação contínua, perguntas adicionais e verificação manual."><figcaption><p>① Especifique claramente as dimensões de verificação e as condições conhecidas na pergunta; ② Estruture os resultados de forma uniforme para facilitar a comparação contínua, perguntas adicionais e verificação manual. </p></figcaption></figure>

## Combinação recomendada

* [Diálogo] Múltiplos modelos: identificar consensos, divergências e lacunas;
* Agente de pesquisa: avançar nas tarefas, dividir subtarefas e gerar relatórios;
* Base de conhecimento: recuperar materiais internos;
* Busca na web ou MCP confiável: complementar com fontes externas;
* Diretório de trabalho: armazenar materiais brutos e produtos finais.

## Fluxo de operação

{% stepper %}
{% step %}
### 1. Comparar perspectivas com a mesma pergunta

Em [Diálogo], selecione vários modelos e solicite que listem separadamente conclusões, hipóteses, fontes e itens incertos. Organize os conflitos reais em questões a serem investigadas.
{% endstep %}

{% step %}
### 2. Criar um Agente de pesquisa

Vincule as bases de conhecimento e habilidades de pesquisa relevantes, mantendo a permissão em [Confirmação por tarefa]. No diretório de trabalho, separe os materiais brutos do diretório de saída `report/`.
{% endstep %}

{% step %}
### 3. Atribuir subtarefas

Peça ao Agente que verifique separadamente a linha do tempo dos fatos, as variações de dados e as perspectivas externas, e que o Agente principal compare os conflitos. As informações que não puderem ser confirmadas devem ser mantidas como pendentes de verificação, sem forçar a consolidação.
{% endstep %}

{% step %}
### 4. Gerar o relatório e realizar revisão manual

O relatório deve incluir conclusões, fontes, itens incertos e ações subsequentes. Verifique as citações, datas e números em [Arquivos] à direita antes de publicar.
{% endstep %}
{% endstepper %}

## Tarefa de exemplo

```
Revise os materiais do projeto no diretório atual e complemente-os com informações públicas. Separe fatos, avaliações e recomendações e preserve os links das fontes externas. Verifique separadamente cronograma, dados e riscos e gere o relatório em report/review.md. Não altere os arquivos em raw/.
```

## Preparação prévia e critérios de conclusão

| Item | Preparação sugerida |
| ---- | ------------------------------- |
| Questão de pesquisa | Escreva em uma frase clara a conclusão a ser comparada |
| Requisitos de fontes | Defina o intervalo de tempo, a região e as fontes aceitáveis |
| Combinação recomendada | Comparação de múltiplos modelos para coletar diferenças, ramos para perguntas adicionais, notas para salvar conclusões confirmadas |
| Critério de conclusão | Cada conclusão principal deve ser rastreável até a fonte; divergências listadas separadamente; conteúdo não confirmado não deve ser apresentado como fato |

Este caso é adequado para pesquisas que exigem comparação de perspectivas e revisão de processos decisórios, mas não é apropriado para tratar a votação de múltiplos modelos diretamente como julgamento de fatos.

{% hint style="danger" %}
Tópicos de alto risco, como finanças, saúde e direito, não podem depender exclusivamente das conclusões dos modelos. O relatório deve manter as fontes e ser revisado por pessoas com experiência ou qualificações correspondentes.
{% endhint %}
