---
icon: message-circle
---

# Conversas e arquivos

Use uma conversa para um tópico e um agente para escolher seu modelo e instruções reutilizáveis. Tópicos separados podem ter conversas separadas com o mesmo agente.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/iphone-conversation.webp"><img src="../../../assets/mobile/en/iphone-conversation.webp" alt="Conversa Cherry Studio Mobile em iPhone"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Mensagens, detalhes do modelo e ações de resposta em uma coluna</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/en/ipad-conversation.webp"><img src="../../../assets/mobile/en/ipad-conversation.webp" alt="Conversa Cherry Studio Mobile em iPad"></a><figcaption><p><strong>iPad · Interface em inglês</strong> · Uma área de leitura mais ampla para respostas longas e conteúdo de arquivo</p></figcaption></figure>
</div>

## Inicie uma conversa ou mude de modelo

Escolha **Novo chat** na barra lateral, selecione um agente e modelo e envie uma mensagem. Uma nova conversa começa como um rascunho; enviar a primeira mensagem cria sua história.

Altere os modelos no seletor de modelos da conversa. Isto atualiza o modelo do agente atual para a próxima solicitação; as respostas existentes não são reescritas.

Coloque preferências duradouras, como “Forneça a conclusão antes das etapas”, em [instruções do agente](agents-and-tools.md). Coloque requisitos para uma pergunta na própria mensagem.

## Encontre conversas anteriores

* As conversas recentes na barra lateral podem ser exibidas em ordem de data ou agrupadas por agente pelo menu da lista. Toque no nome de um agente para expandir ou recolher o grupo. O modo de visualização escolhido é mantido quando você fecha e abre o aplicativo novamente.
* O botão de pesquisa ao lado do título da barra lateral pesquisa **títulos de conversas e conteúdo de mensagens**. Antes de digitar, mostra as conversas recentes.
* Um resultado de mensagem abre a conversa nessa mensagem. Navegue pelo histórico próximo ou escolha **Voltar às mensagens mais recentes**.
* Mantenha uma conversa na barra lateral pressionada para renomeá-la ou excluí-la. [Exportar](sharing-and-export.md) tudo o que você deseja manter primeiro.

A pesquisa localiza a mensagem inteira sem destacar todas as palavras-chave contidas nela. Ele pesquisa conversas, não todos os arquivos do seu telefone.

## Adicionar imagens

Toque em **＋** ao lado da entrada para escolher fotos, tirar uma foto ou adicionar uma imagem por meio de Arquivos. Selecione um modelo que entenda imagens; o filtro imagem pode ajudar.

Por exemplo, anexe uma foto e pergunte “Transforme a lista de verificação desta imagem em uma tabela”. Especifique qual parte é importante.

Os formatos de solicitação suportados são JPEG, PNG, GIF e WebP. O limite atual do aplicativo é de 9 imagens, 10 MB por imagem e 20 MB combinados; modelos individuais podem ter limites mais baixos. Converta formatos incompatíveis para JPEG ou PNG.

O aplicativo pode compactar imagens e tentar novamente uma solicitação muito grande, mas a compactação não corrige modelos não suportados, muitas imagens ou todos os erros de rede.

## Anexe documentos ou arquivos existentes

1. Toque em **＋ → Ficheiros**.
2. Escolha um arquivo existente ou carregue um usando o seletor do sistema.
3. Dê uma tarefa específica, como “Resuma a segunda seção e liste seus itens de ação”.

Arquivos de texto simples têm um limite de 1 MB por arquivo; os documentos têm um limite de 20 MB. Conteúdo longo pode ser encurtado para caber nos limites de leitura ou modelo, com aviso. Não presuma que todo o arquivo foi incluído. A extração de texto PDF processa no máximo as primeiras 100 páginas.

### Qual analisador de documentos devo escolher?

Abra **Configurações → Analisador de documentos**. A seleção é salva imediatamente e aplicada ao processamento subsequente do documento; não reescreve as respostas anteriores.

| Opção | Melhor para | Troca |
| --- | --- | --- |
| Integrado | Resumos e perguntas sobre documentos baseados principalmente em texto | Extrai texto de PDF, DOCX, XLSX e PPTX com menor uso do modelo |
| AnyDoc | Documentos complexos onde títulos e tabelas são importantes | Preserva mais estrutura para documentos não PDF, geralmente usando mais tokens |

PDFs ainda usam extração de texto do sistema. A troca de analisadores não transforma as páginas digitalizadas em texto selecionável. Se nenhum texto for encontrado, forneça uma cópia em texto ou envie as páginas relevantes como imagens para um modelo de visão.

**O suporte à visualização é diferente do suporte à entrada do modelo.** Os modelos recebem o conteúdo do documento analisado. Arquivos de áudio, vídeo ou arquivos compactados não se tornam anexos utilizáveis ​​simplesmente alterando os sinalizadores de capacidade do modelo.

## Copiar, tentar novamente, ramificar ou excluir

| Ação | Quando usar | Resultado |
| --- | --- | --- |
| Selecione o texto ou copie | Mantenha parte ou toda uma resposta | Use a seleção de texto ou a ação de copiar a resposta |
| Responda novamente | A última resposta falhou, foi interrompida ou é insatisfatória | Processa a pergunta original novamente e substitui a resposta mais recente |
| Ramifique para um novo bate-papo | Explore outra direção a partir de um ponto anterior | Continua em uma conversa separada, mantendo o original |
| Excluir este turno | Remover uma troca | Remove seus registros de perguntas, respostas e ferramentas intervenientes |

Responder novamente só está disponível para a resposta mais recente, depois que a geração termina ou é interrompida. Não são mantidas várias versões da resposta para alternar entre elas. Para explorar outra direção a partir de uma resposta anterior, crie uma ramificação em uma nova conversa.

Os resultados da ferramenta concluídos podem ser retidos ao retomar uma resposta interrompida. Tentar novamente ou excluir **não desfaz alterações na agenda, arquivos editados ou conteúdo enviado**. Tentar novamente pode gerar custos adicionais. Copie, compartilhe ou ramifique primeiro se precisar da resposta anterior.

A exclusão do turno é permanente e não reembolsa o uso. Aguarde a conclusão da geração/operações ou interrompa-as antes de excluir.

## Profundidade de pensamento e longas conversas

Os modelos suportados fornecem um controle de **profundidade de pensamento**. Os níveis disponíveis dependem do modelo; nem todos permitem desativar o raciocínio ou oferecem o mesmo número de níveis. Use os níveis padrão ou mais rápidos para perguntas simples e considere mais reflexão para análises complexas. Níveis mais altos podem demorar mais e usar mais tokens.

**Contexto compactado/Contexto compactado** significa que as informações anteriores estão sendo resumidas para abrir espaço para conversas contínuas ou trabalho com ferramentas. A história visível permanece, mas o resumo pode omitir detalhes. Reafirme restrições importantes, números ou citações exatas na próxima mensagem, quando necessário.

A compactação não permite acomodar anexos de qualquer tamanho. Reduza o material ou inicie uma nova conversa se a solicitação ainda ultrapassar os limites.

Consulte [respostas e notificações em segundo plano](settings-and-usage.md) para interrupções e [compartilhamento e exportação](sharing-and-export.md) para compartilhar diversas mensagens.

Para resultados salvos e revisões, consulte [Criar e editar arquivos](file-generation.md). Para transformar um arquivo HTML salvo em uma imagem ou apresentação, consulte [HTML para imagem e PPT](html-export.md).
