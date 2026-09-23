---
icon: presentation
---

# Converter HTML em imagem ou PPT

Os arquivos HTML podem conter layouts, cores e imagens projetados. Abra um arquivo HTML salvo em Cherry Studio para compartilhá-lo como uma imagem ou PPT – útil para propostas, cartões de estudo e apresentações curtas.

## Prepare um arquivo HTML

Carregue um arquivo existente ou peça a um modelo que suporte chamadas de ferramenta para criar um:

> Transforme a visão geral do projeto acima em uma apresentação HTML independente com três páginas: metas, plano e próximas etapas. Use uma proporção de 16:9, tipo legível e nenhuma imagem ou fonte online. Salve-o como project-overview.html. Dê a cada página seu próprio contêiner com class="slide".

A última frase informa ao modelo como marcar as páginas. Você pode copiá-lo sem escrever código sozinho. Um único cartão de informações não precisa de marcadores de página.

Aguarde até que o arquivo termine de ser salvo e abra seu cartão ou encontre-o em **Ficheiros** na barra lateral. Se você tiver apenas um bloco de código HTML no chat, primeiro peça ao modelo para [salvá-lo como um arquivo](file-generation.md).

## Compartilhe como imagem ou PPT

1. Abra o arquivo HTML completo e revise seu texto, imagens e layout.
2. Toque em **Mais** no canto superior direito.
3. Escolha **Partilhar como imagem** ou **Partilhar como PPT**.
4. Aguarde a preparação, captura da página e gravação do arquivo. Use **Cancelar** na área de progresso para parar, se necessário.
5. Escolha um destino no menu de compartilhamento do sistema.

O arquivo PNG ou PPTX gerado também fica em **Arquivos** para abrir ou compartilhar depois. Fechar o menu de compartilhamento não significa que o arquivo foi salvo em outro destino.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/html-preview.webp"><img src="../../../assets/mobile/en/html-preview.webp" alt="Abra um arquivo HTML salvo; este é um arquivo de demonstração de autoria"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Abra um arquivo HTML salvo; este é um arquivo de demonstração de autoria</p></figcaption></figure>
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/html-export-menu.webp"><img src="../../../assets/mobile/en/html-export-menu.webp" alt="Use o menu arquivo para compartilhar como imagem ou PPT"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Use o menu arquivo para compartilhar como imagem ou PPT</p></figcaption></figure>
</div>

## Como os formatos diferem?

| Formato | Melhor para | Resultado |
| --- | --- | --- |
| Imagem (PNG) | Visualização rápida e cartões informativos | Uma imagem de todo o documento; várias páginas empilhadas verticalmente |
| PPT (PPTX) | Apresentando uma página por vez | Uma imagem de cada página colocada em um slide 16:9 |

**Textos e gráficos no PPT fazem parte de imagens de páginas, e não de objetos editáveis individualmente.** Para alterar o conteúdo, revise o HTML e converta novamente. Compartilhe o HTML também se o destinatário precisar da fonte original editável.

HTML com marcadores de página explícitos é convertido página por página. Uma página longa comum é cortada verticalmente em seções 16:9, que podem cortar parágrafos ou tabelas; não é automaticamente redesenhado como uma apresentação. Peça ao modelo páginas separadas e menos lotadas, se isso acontecer.

Páginas com proporções diferentes mantêm suas proporções e podem ter margens brancas. A conversão usa um layout de página mais amplo, por isso pode ser diferente da visualização restrita do telefone.

## O que acontece com marcas d'água e conteúdo interativo?

A conversão segue **Configurações → Geral → Marca de água na partilha**. Quando ativado, adiciona um rodapé à imagem ou ao slide PPT final. A configuração afeta os arquivos recém-gerados; alterá-lo posteriormente não reconstrói os resultados salvos.

A conversão abre uma nova cópia do HTML salvo. Ele não copia botões clicados, painéis expandidos ou formulários preenchidos durante a visualização. Animações e vídeos não se tornam conteúdo PPT reproduzível. Peça ao modelo para salvar o estado desejado como conteúdo de página estática.

## Por que a conversão não está disponível ou falha?

* **O arquivo não é HTML:** Markdown, texto simples e blocos de código de bate-papo não possuem essas ações de conversão.
* **Apenas parte de um arquivo longo carregado:** HTML incompleto não pode ser convertido. Encurte ou divida. O conteúdo vazio também não pode ser convertido.
* **Falha ao carregar imagens ou fontes:** os recursos on-line devem estar acessíveis. Peça uma versão sem dependências externas.
* **O documento é muito longo:** PPT suporta no máximo 64 páginas e as imagens têm limites de tamanho. Reduza o conteúdo, divida arquivos ou use páginas de apresentação separadas em vez de uma imagem longa.
* **O layout muda constantemente ou o aplicativo fica em segundo plano:** páginas dinâmicas complexas podem falhar. Mantenha o aplicativo em primeiro plano e use layouts estáticos quando necessário.

O HTML original permanece disponível após falha ou cancelamento. Resolva a causa relatada antes de tentar novamente. Depois de compartilhar um arquivo importante, confirme a contagem de páginas e o conteúdo no aplicativo receptor.
