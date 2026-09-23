---
icon: file-text
---

# Criar e editar arquivos

Um agente pode salvar o texto como um arquivo para você visualizar, revisar e compartilhar. Isso é adequado para listas de verificação, notas de reuniões, dados de tabelas e páginas da web simples.

## Salvar uma resposta como um arquivo

Selecione um modelo de texto que suporte chamadas de ferramenta e solicite explicitamente um **arquivo salvo** com um nome de arquivo:

> Transforme os conselhos de viagem acima em uma lista de verificação Markdown. Salve-o como week-packing-list.md e forneça um arquivo que eu possa abrir.

Markdown é um formato de texto para títulos, listas e tabelas. Para texto simples, solicite um arquivo `.txt`.

O texto mostrado durante a geração é o conteúdo que está sendo preparado, e não um arquivo já salvo. Aguarde a conclusão e abra o cartão de arquivo resultante. Você também pode encontrá-lo em **Ficheiros** na barra lateral.

Se a resposta contiver apenas um bloco de código, prossiga com: “Salve este conteúdo como um arquivo real, não apenas exiba-o na resposta”.

## Qual formato devo escolher?

| Resultado desejado | Formato | Exemplo |
| --- | --- | --- |
| Texto simples | TXT | “Salve-o como call-notes.txt.” |
| Um artigo com títulos, listas e tabelas | Markdown | “Salve-o como Meeting-Notes.md.” |
| Dados para um aplicativo de planilha | CSV | “Use colunas de item, quantidade e notas; salve como shopping-list.csv.” |
| Uma página ou apresentação projetada | HTML | “Crie um arquivo HTML independente chamado project-overview.html.” |

A ferramenta integrada de gravação de arquivos salva texto, até 1 MB por arquivo. **Nomear um arquivo como `.docx`, `.xlsx` ou `.pptx` não o transforma em um documento válido do Office.** CSV abre em aplicativos de planilha, mas não contém planilhas de pasta de trabalho, estilos ou gráficos.

Para PPT, crie uma apresentação HTML e use [HTML para imagem e PPT](html-export.md). Um plugin conectado pode oferecer outros recursos de criação de documentos; suas capacidades reais determinam o que está disponível.

## Ler e editar um arquivo existente

1. Na conversa, escolha **＋ → Ficheiro** e selecione ou carregue um arquivo.
2. Especifique exatamente o que alterar, a substituição e o que deve permanecer inalterado.
3. Abra o arquivo revisado e verifique o resultado.

Por exemplo:

> No shopping-list.csv anexado, altere a quantidade de guarda-chuva de 1 para 2. Mantenha todas as outras linhas inalteradas.

> No Meeting-notes.md que você acabou de criar, substitua “Entregar na próxima segunda-feira” por “Entregar na próxima quarta-feira”. Guarde todo o resto.

Arquivos de texto podem ser editados diretamente. Documentos PDF e Office suportados podem fornecer conteúdo extraído para leitura do modelo, mas o editor integrado não pode modificar diretamente seu layout original e estrutura de arquivo. Peça para extrair e organizar o conteúdo em um novo arquivo Markdown. Consulte [Bate-papo e arquivos](chat-and-files.md) para formatos de anexo e limites de leitura.

### A edição substitui o original?

* A edição de um arquivo carregado ou criado por uma resposta anterior salva uma nova versão, como `meeting-notes v2.md`, e mantém a fonte.
* Dentro de uma resposta, o agente pode refinar seu rascunho atual repetidamente e terminar com um arquivo, em vez de produzir uma nova versão para cada alteração.

Esta não é uma sincronização contínua. Editar uma cópia importada em Cherry Studio não atualiza o original em outro lugar do telefone ou no armazenamento em nuvem.

### Por que não consegue encontrar o texto para substituir?

A edição corresponde ao texto original. Redação alterada, frases repetidas e diferenças de espaços ou pontuação podem impedir uma correspondência clara. Peça ao agente para reler a passagem relevante e identificar uma frase mais longa ou contexto circundante. Solicite a substituição de todas as ocorrências somente quando for isso que você pretende.

## Ler parte de um arquivo significa que ele leu tudo?

Não. Arquivos grandes podem precisar de múltiplas leituras e a extração de documentos tem seus próprios limites. Para uma revisão completa, peça ao agente para continuar nas seções não lidas e indicar quaisquer lacunas. Se a extração já omitiu parte da fonte, leituras adicionais não poderão recuperá-la; divida o documento e forneça-o novamente.

As ferramentas de leitura usam anexos acessíveis ou arquivos gerados nesta conversa. Eles não verificam todos os arquivos do seu telefone. Para continuar em uma nova conversa, selecione novamente o arquivo através do menu de anexos.

## Encontre, visualize e compartilhe arquivos

Abra **Ficheiros** na barra lateral para navegar por tipo e alternar entre visualizações de lista e grade. Toque em um arquivo para visualizá-lo. Formatos sem visualização interna podem ser abertos em outro aplicativo do sistema.

O menu **Mais** no canto superior direito da visualização oferece compartilhamento e abertura com outros aplicativos. Arquivos de texto também oferecem cópia. Quando um arquivo longo é exibido apenas parcialmente, a cópia inclui apenas a parte visível; o compartilhamento usa o arquivo original completo.

Os arquivos são armazenados neste dispositivo. Salve material importante no aplicativo Arquivos do sistema ou em outro armazenamento por meio de compartilhamento e confirme que você pode abri-lo antes de limpar os arquivos locais ou desinstalar o Cherry Studio. A exportação de mensagens de bate-papo usa um fluxo de trabalho separado: [Compartilhamento e exportação](sharing-and-export.md).

A leitura, criação e edição de arquivos de texto integrados geralmente são executadas diretamente, inclusive no modo **Pergunte quando necessário**. Consulte [Aprovação de ferramenta](using-tools.md).
