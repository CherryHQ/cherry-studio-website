---
icon: globe
---
# Organização de Materiais Multilíngues

A equipe de marketing recebeu um conjunto de materiais que inclui documentos, capturas de tela e terminologia de produto, necessitando de tradução para outro idioma, mantendo nomes, números e formatação consistentes. Uma tabela de termos e uma tradução piloto de pequena escala podem reduzir a necessidade de retrabalho em todo o material.

<figure><img src="../../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="Primeiro, confirme a precisão da busca dos materiais; em seguida, o Agent padroniza a terminologia e o formato de saída; por fim, uma verificação manual é realizada para o conteúdo crítico."><figcaption><p>Primeiro, confirme a precisão da busca dos materiais; em seguida, o Agent padroniza a terminologia e o formato de saída; por fim, uma verificação manual é realizada para o conteúdo crítico. </p></figcaption></figure>

<figure><img src="../../../../assets/5428125ff9f2c41e29e8c2ed.webp" alt="O lado esquerdo mantém o texto original, enquanto o lado direito exibe a tradução real. Antes da entrega, é possível verificar termo a termo conceitos-chave como gradualidade, métricas de monitoramento e processos de rollback."><figcaption><p>O lado esquerdo mantém o texto original, enquanto o lado direito exibe a tradução real. Antes da entrega, é possível verificar termo a termo conceitos-chave como gradualidade, métricas de monitoramento e processos de rollback. </p></figcaption></figure>

## Fluxo de Operação

{% stepper %}
{% step %}
### 1. Primeiro, crie uma tabela de termos

Liste nomes de produtos, nomes de funcionalidades, nomes de pessoas, unidades e expressões legais que não podem ser alteradas. Para cada termo, especifique o uso na língua de destino.
{% endstep %}

{% step %}
### 2. Use um pequeno trecho para calibrar o estilo

Em [Tradução], processe primeiro um capítulo representativo para confirmar o nível de formalidade, a formatação dos títulos e a terminologia, antes de traduzir o arquivo inteiro.
{% endstep %}

{% step %}
### 3. Realize uma verificação OCR separada para imagens

Após enviar as capturas de tela, verifique primeiro o texto reconhecido, especialmente números, nomes de botões e tabelas. Erros de reconhecimento devem ser corrigidos antes da tradução.
{% endstep %}

{% step %}
### 4. Peça ao Agent para realizar uma verificação de consistência

Coloque o texto original, a tradução e a tabela de termos no diretório de trabalho e peça ao Agent para listar inconsistências terminológicas, omissões de tradução, diferenças numéricas e problemas de links, sem substituir diretamente o conteúdo jurídico.
{% endstep %}
{% endstepper %}

## Verificação Antes da Entrega

* Os nomes de produtos e os caminhos da interface estão consistentes com a interface real;
* Números, datas, moedas e unidades não foram alterados;
* Links Markdown, blocos de código e legendas de imagens foram preservados;
* Conteúdo jurídico, médico ou de segurança foi revisado por especialistas.

## Combinações Recomendadas e Critérios de Conclusão

| Item | Prática Recomendada |
| ---- | --------------------------------- |
| Entrada de Tradução | Use [Tradução] para textos curtos e capturas de tela; delegue a organização de múltiplos arquivos ao Agent |
| Terminologia | Forneça primeiro a lista de nomes de produtos, termos próprios e palavras não traduzidas |
| Arquivos | Salve o original e a tradução em diretórios separados, mantendo a correspondência dos nomes de arquivo originais |
| Critério de Conclusão | Números, links e termos próprios consistentes; texto das imagens verificado por amostragem; alterações de layout marcadas na nota de entrega |

{% hint style="warning" %}
O histórico facilita a reutilização, mas também armazena o conteúdo traduzido. Após processar materiais sensíveis, verifique e limpe os registros de acordo com seus requisitos de gestão de dados.
{% endhint %}
