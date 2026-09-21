---
icon: language
---
# Tradução de arquivos, imagens e textos longos

A [Tradução] pode processar texto inserido diretamente, bem como imagens ou documentos enviados. As imagens passam primeiro por reconhecimento de texto, enquanto os documentos são processados conforme o formato e o conteúdo; o histórico pode ser marcado como favorito, reaberto e reutilizado.

<figure><img src="../../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="A tradução é parte do fluxo de trabalho de conteúdo: primeiro confirme os materiais de entrada, depois padronize a terminologia e verifique o produto final."><figcaption><p> A tradução é parte do fluxo de trabalho de conteúdo: primeiro confirme os materiais de entrada, depois padronize a terminologia e verifique o produto final. </p></figcaption></figure>

### Escolha do método de entrada

| Material | Prática recomendada | Pontos de verificação |
| -------- | -------------------- | ---------------- |
| Texto curto | Colar diretamente | Tom, nomes próprios, contexto |
| Capturas de tela ou digitalizações | Enviar imagem e usar OCR | Erros de reconhecimento, tabelas e números |
| PDF | Enviar arquivo e escolher se deseja instalar o BabelDOC | Layout em duas colunas, fontes, tabelas, notas de rodapé e número de páginas |
| Outros documentos longos | Enviar arquivo | Hierarquia de títulos, parágrafos, notas de rodapé e formatação |
| Markdown | Verificar usando a pré-visualização | Se links, blocos de código e marcações foram preservados |

#### Exemplo: Tradução de texto curto

Selecione [Detecção automática] como idioma de origem, [Inglês] como idioma de destino, insira o texto em chinês e clique em [Traduzir]. Após o resultado aparecer, verifique primeiro os significados-chave como "lançamento gradual", "métricas de monitoramento" e "processo de rollback", depois copie ou salve em anotações.

<figure><img src="../../../../assets/5428125ff9f2c41e29e8c2ed.webp" alt="① O texto original é mantido à esquerda; ② a tradução é exibida à direita. Antes da entrega, verifique item por item o lançamento gradual, as métricas de monitoramento e o processo de rollback."><figcaption><p> ① O texto original é mantido à esquerda; ② a tradução é exibida à direita. Antes da entrega, verifique item por item o lançamento gradual, as métricas de monitoramento e o processo de rollback. </p></figcaption></figure>

#### O que verificar após o resultado

| Item de verificação | Exemplo |
| ----- | ------------------ |
| Significado-chave | "Lançamento gradual" não pode ser traduzido literalmente apenas pela cor |
| Nomes próprios | Nomes de produtos, equipes e recursos devem permanecer consistentes |
| Números e condições | Datas, proporções, valores e palavras de negação não podem ser omitidos |
| Tom | Notificações, contratos e textos de marketing devem usar o tom adequado |

Textos curtos podem ser verificados frase por frase; para arquivos e textos longos, verifique primeiro por amostragem títulos, tabelas, números e termos repetidos, antes de decidir se a entrega será completa.

### Tradução de PDF preservando o layout

Após enviar um PDF com texto extraível, a página detectará o BabelDOC. Na primeira utilização, selecione [Instalar BabelDOC]; quando as dependências estiverem prontas, a pré-visualização à esquerda exibirá o texto original, a tradução em PDF à direita, e o progresso será exibido conforme: verificação de recursos, análise, tradução, formatação e renderização.

{% stepper %}
{% step %}
#### 1. Enviar PDF e verificar dependências

Clique em [Arraste ou clique para enviar imagem/documento] para selecionar um PDF. Se a página indicar que faltam dependências ou que a versão está desatualizada, instale ou atualize o BabelDOC; a instalação é gerenciada centralmente pelas [Dependências de ambiente] do Cherry Studio.
{% endstep %}

{% step %}
#### 2. Selecionar modelo de tradução e idioma de destino

A tradução de PDF requer que o modelo atual possa ser chamado através do gateway de API local. Se o modelo não estiver disponível, volte para [Configurações] → [Serviços de modelo] para verificar a conexão, em vez de reinstalar o BabelDOC repetidamente.
{% endstep %}

{% step %}
#### 3. Comparar o resultado em duas colunas

Após a conclusão da tradução, compare página por página o texto original e a tradução, verificando com atenção tabelas, legendas de figuras, cabeçalhos e rodapés, notas de rodapé e quebras de linha. Clique no botão de download para salvar a tradução em PDF separadamente.
{% endstep %}

{% step %}
#### 4. Continuar a partir do histórico

A tradução de PDF aparecerá no [Histórico de traduções] e em [Arquivos]. O histórico permite reabrir a pré-visualização em duas colunas, localizar o arquivo de tradução ou salvar o resultado; ao excluir o registro, o arquivo de tradução correspondente também será removido.
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
PDFs digitalizados ou apenas com imagens não suportam atualmente a tradução preservando o layout. Se a página indicar a necessidade de OCR, reconheça primeiro o texto das imagens para um texto verificável e, em seguida, use o fluxo de tradução padrão.
{% endhint %}

### Etapas de tradução

{% stepper %}
{% step %}
#### 1. Primeiro confirme o idioma de origem e o idioma de destino

O reconhecimento automático é adequado para idiomas mistos ou desconhecidos; para materiais formais como contratos e documentos técnicos, recomenda-se confirmar o idioma manualmente para reduzir erros de julgamento.
{% endstep %}

{% step %}
#### 2. Selecionar o método de tradução

Use o modelo configurado quando for necessário contexto, tom e consistência terminológica; para frases comuns e curtas, é possível escolher um método mais leve. Os itens disponíveis específicos dependem da página atual.
{% endstep %}

{% step %}
#### 3. Verificação por seções

Verifique primeiro nomes, números, datas, palavras de negação e unidades. Para tradução de imagens, verifique também o resultado do OCR; se o reconhecimento estiver incorreto, a tradução subsequente também estará incorreta.
{% endstep %}

{% step %}
#### 4. Favoritar, exportar ou reutilizar o resultado

No [Histórico de traduções], visualize, favorite e reutilize traduções de texto; resultados de PDF podem ser pré-visualizados em duas colunas, abertos como arquivo ou salvos separadamente. Antes da entrega formal, salve a tabela de termos e as revisões manuais nos materiais do projeto.
{% endstep %}
{% endstepper %}

#### Caso de aplicação: Preparação de materiais de produto multilíngues

Primeiro, organize os nomes de produtos, nomes de recursos e termos proibidos de alteração em uma descrição. Envie o manual em chinês, traduza primeiro um capítulo e confirme a terminologia, depois processe o texto completo; imagens promocionais devem ser enviadas separadamente para tradução via OCR. Após a conclusão, coloque os termos confirmados e as traduções no diretório de trabalho do projeto, permitindo que o Agent verifique uniformemente títulos, links e números, mas sem permitir que ele altere declarações jurídicas por conta própria.

{% hint style="danger" %}
Conteúdo relacionado a saúde, direito, finanças e segurança requer revisão por profissionais. A tradução automática pode aumentar a eficiência, mas não substitui a revisão por um responsável.
{% endhint %}
