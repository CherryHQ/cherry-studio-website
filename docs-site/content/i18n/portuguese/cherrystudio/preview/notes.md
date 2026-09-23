---
icon: note-sticky
---
# Notas

As notas são o editor de Markdown integrado ao Cherry Studio, que facilita a organização de ideias, o salvamento de resultados parciais e o processamento adicional com o auxílio da IA e das capacidades de base de conhecimento, além das conversas com a IA.

### Abrir as notas

Clique em [Notas] na barra de abas superior ou no ícone do aplicativo [Notas] no [Launchpad].

<figure><img src="../../../../assets/14e04a73fa23719ebd35dde4.webp" alt=""><figcaption><p>Interface das notas: à esquerda, a árvore de diretórios e a lista de notas; à direita, o editor de Markdown</p></figcaption></figure>

### Criar a primeira nota

1. Clique no primeiro ícone [Nova nota] no canto superior esquerdo
2. Digite o conteúdo no editor à direita, com suporte a sintaxe Markdown e barra de ferramentas de texto rico
3. Clique com o botão direito na nota na lista de notas para nomeá-la

### Importar arquivos Markdown existentes

* Arraste e solte um arquivo `.md` ou um diretório contendo arquivos `.md` **arrastando** para a área de notas para importá-lo como nova nota ou nova pasta
* Você também pode clicar no segundo ícone [Nova pasta] no canto superior esquerdo para criar o diretório primeiro e, em seguida, arrastar os arquivos para dentro dele

### Funcionalidades do editor

A barra de ferramentas superior do editor de notas oferece recursos comuns de texto rico:

* **Formatação**: negrito (<kbd>B</kbd>), itálico (<kbd>I</kbd>), sublinhado (<kbd>U</kbd>), tachado
* **Estrutura**: código inline / títulos H1–H3 / lista não ordenada / lista ordenada / bloco de código / citação / lista de tarefas / fórmula
* **Incorporação**: tabelas, hiperlinks

<figure><img src="../../../../assets/d391f5ca5d92cb8fdf22ca63.webp" alt=""><figcaption><p>Editor após criar uma nova nota e escrever o conteúdo</p></figcaption></figure>

A barra de status inferior exibe o **número de caracteres** atual. O ícone **A✓** no canto inferior esquerdo ativa ou desativa a verificação ortográfica. O menu suspenso no canto inferior direito alterna entre **Pré-visualização em tempo real**, **Modo de código-fonte** ou **Modo de leitura**.

### Gerenciamento de diretórios

No topo da barra lateral esquerda, em ordem, estão: [Nova nota] / [Nova pasta] / [Ordenar] / [Favoritar] / [Pesquisar].

* **Ordenar**: 6 opções — nome do arquivo `A→Z` / `Z→A`, horário de atualização do mais recente para o mais antigo / do mais antigo para o mais recente, horário de criação do mais recente para o mais antigo / do mais antigo para o mais recente
* **Favoritar**: o botão de estrela alterna para a visão "Favoritos"
* **Pesquisar**: botão de lupa, basta digitar na caixa de pesquisa. **A pesquisa corresponde simultaneamente ao título e ao conteúdo**, e os itens que correspondem ao conteúdo terão uma etiqueta "Conteúdo" ou "Nome+Conteúdo" ao lado do título para indicar a origem

### Menu de botão direito (Integração com IA + Exportação)

Clicar com o **botão direito** em qualquer nota na árvore de diretórios à esquerda abre um menu de ações — esta é a entrada para a integração com IA e exportação em múltiplos formatos:

<figure><img src="../../../../assets/fd4004b475c63d7c924304e8.webp" alt=""><figcaption><p>Menu exibido ao clicar com o botão direito em uma única nota</p></figcaption></figure>

* **Gerar nome da nota** ✨: permite que a IA gere automaticamente um título com base no conteúdo (disponível apenas para arquivos)
* **Renomear** / **Abrir de fora** (exibir no Finder / Explorador de Arquivos)
* **Favoritar nota** / **Remover dos favoritos**
* **Exportar nota para base de conhecimento**: enviar para a [base de conhecimento](../../knowledge-base/knowledge-base.md) especificada
* **Exportar ›** menu secundário: Markdown / Word (.docx) / Notion / Yuque / Obsidian / Joplin / Siyuan, além de "Copiar como imagem / Exportar como imagem" — a exibição de cada item pode ser ativada ou desativada individualmente em [Configurações] → [Configurações de dados] → [Configurações do menu de exportação]
* **Excluir**

> O menu de botão direito para pastas é mais simples, contendo apenas: Nova nota / Nova pasta / Renomear / Abrir de fora / Excluir.

### Menu [⋯] no canto superior direito (Atalhos de visão e exportação)

O [⋯] no canto superior direito do título da nota é o atalho de **visão / exportação** para a **nota atual**. Não o confunda com o menu de botão direito:

<figure><img src="../../../../assets/b9b3ab0b2050382f16409b48.webp" alt=""><figcaption><p>Menu [⋯] no canto superior direito</p></figcaption></figure>

* **Copiar conteúdo**: copiar como texto puro
* **Exportar como Word**: gerar rapidamente `.docx` (para mais formatos, use "Exportar ›" no menu de botão direito)
* **Exportar como PDF**: exportar a nota atual como arquivo PDF
* **Imprimir**: chamar a impressão do sistema para a nota atual
* **Reduzir largura da coluna**: limitar o número máximo de caracteres por linha
* **Exibir sumário**: exibir a árvore de títulos da nota atual à direita
* **Configurações de fonte ›**: fonte padrão / fonte serifada, três tamanhos de fonte (pequeno / médio / grande)
* **Mais configurações**: abrir o painel de configurações de notas (três grupos de configurações: dados / editor / exibição)

### Diretório de trabalho e backup

O conteúdo das notas é armazenado como arquivos locais. O **diretório de trabalho** pode ser visualizado e modificado em [Configurações de dados] no painel de configurações de notas (aberto via [⋯] no canto superior direito → [Mais configurações]).

* Por padrão, armazenado no diretório de dados do aplicativo Cherry Studio
* Primeiro, [Selecione] um caminho personalizado e, em seguida, clique em [Aplicar] para alternar (as alterações não migram automaticamente os arquivos existentes; é necessário copiá-los manualmente); clique em [Restaurar padrão] para voltar ao diretório padrão
* Recomenda-se fazer backup combinando [WebDAV](../../pre-basic/data-settings/webdav.md) / [Armazenamento compatível com S3](../../pre-basic/data-settings/s3-compatible.md)

### Configurações do editor e de exibição

Abra o painel de configurações de notas via [⋯] no canto superior direito → [Mais configurações]. Além de [Configurações de dados], há outros dois grupos:

**Configurações do editor**

* **Visão padrão**: se as novas notas entram em [Modo de edição] ou [Modo de leitura] por padrão
* **Visão de edição padrão**: em modo de edição, se usa [Pré-visualização em tempo real] ou [Modo de código-fonte] por padrão

**Configurações de exibição**

* **Fonte**: fonte padrão / fonte serifada
* **Tamanho da fonte**: entre 10–30px
* **Reduzir largura da coluna**: limitar o número de caracteres por linha para evitar que linhas longas ocupem toda a tela
* **Exibir sumário**: exibir a árvore de títulos da nota atual à direita, facilitando a navegação dentro do documento

> A fonte e o tamanho da fonte podem ser ajustados neste painel de configurações de exibição ou alternados rapidamente via [⋯] no canto superior direito → [Configurações de fonte].

### Dicas e truques

* As notas suportam a sintaxe de lista de tarefas `- [ ]`, útil para tarefas diárias
* Arraste e solte arquivos `.md` (ou diretórios contendo `.md`) na árvore de diretórios para importação em lote
* Se, após restaurar as configurações entre dispositivos, o diretório de notas estiver vazio, copie os arquivos manualmente para o caminho indicado

{% hint style="info" %}
Para que a IA responda **diretamente** com base no conteúdo das notas, a maneira mais conveniente é **exportar a nota de destino para a base de conhecimento** e, em seguida, ativar essa base de conhecimento na conversa.
{% endhint %}

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, bugs ou sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e sugestões](../../question-contact/suggestions.md).
