---
icon: circle-help
---

# Solução de problemas

Para problemas de conexão, comece com uma mensagem curta sem anexos para identificar a causa.

## Por que não consigo conversar imediatamente após a instalação?

Configure uma chave API, adicione um modelo, habilite seu provedor e escolha-o para seu agente. Você pode [importar configuração de desktop](desktop-sync.md) ou seguir [início rápido](quick-start.md).

Uma assinatura de chat para consumidores pode não incluir créditos de API para outros aplicativos; confirme isso com a plataforma.

## Meu provedor existe, mas o seletor de modelo está vazio

Verifique a ativação do provedor/modelo, a finalidade do modelo e os filtros. Incorporar/reclassificar entradas não são modelos comuns de chat. Os seletores de texto/imagem podem mostrar modelos diferentes. Volte para Todos e aguarde o primeiro download das informações do modelo.

Se nenhum modelo for adicionado, [sincronize ou adicione manualmente](model-management.md).

## As atualizações do modelo substituirão chaves ou configurações personalizadas?

As atualizações de informações do modelo não alteram endereços/chaves do provedor nem reescrevem substituições de modelo salvas. Os campos padrão podem herdar novas informações.

**A sincronização do provedor de desktop substitui endereços e chaves de provedores selecionados.** Consulte [atualizações de modelo](model-updates.md) e [importação de desktop](desktop-sync.md).

## A sincronização falha, mas o chat funciona

A lista de modelos API é separada do chat e uma plataforma pode suportar apenas o último. Adicione manualmente o ID exato do modelo e verifique a conexão. A descoberta com falha não limpa os modelos existentes.

Não devolvido não significa necessariamente descontinuado; consulte [sincronização de modelo](model-updates.md).

## O que significam erros de conexão?

| Erro | Verifique primeiro |
| --- | --- |
| 401 / Não autorizado | Chave completa, válida, salva e habilitada |
| 403 / Proibido | Acesso à conta, região, modelo ou organização |
| 404 / Não encontrado | Endereço base, API, ID exato do modelo, caminhos de solicitação duplicados |
| 429 / Muitos pedidos | Limites de taxas e créditos; espere em vez de enviar repetidamente |
| Falha de rede/tempo limite | Acessibilidade do provedor, proxy e status do serviço |
| Contexto/solicitação muito grande | Reduza anexos/histórico ou escolha um modelo adequado; aumentar os limites configurados por si só não ajuda |

Os provedores podem usar códigos diferentes. Leia os detalhes do erro e as instruções da plataforma. Consulte [configuração do provedor](providers-and-models.md).

## Por que uma configuração alterada não entrou em vigor?

* Endereços/chaves de provedor e criação/edição de modelo exigem a ação Salvar/Adicionar da página.
* Edições de agentes existentes, seleção de modelo global e seleção de API em listas de modelos são salvas automaticamente; procure avisos de falha.
* Salve as alterações do provedor antes das verificações de conexão ou da sincronização do modelo.
* Uma mudança global no modelo padrão não atualiza todos os agentes existentes.

Consulte [gerenciamento de modelo](model-management.md) e [edição de agente](agents-and-tools.md).

## Por que não consigo excluir um modelo?

Um padrão global deve ser alterado ou apagado primeiro em **Configurações → Modelo predefinido**. Excluir outro modelo usado por um agente significa escolher um substituto para esse agente.

## Posso visualizar uma imagem, mas não consigo enviá-la

O suporte para visualização e entrada de modelo é diferente. Escolha um modelo com capacidade de visão e verifique o formato, a contagem de imagens e o tamanho. Alternar um sinalizador de capacidade de imagem não pode adicionar visão a um modelo somente de texto.

Consulte [bate-papo e arquivos](chat-and-files.md) para PDFs digitalizados, textos de documentos vazios e anexos grandes.

## Onde estão o botão de pesquisa na web e o botão Plugins?

A opção de pesquisa na Web está no editor do agente; habilite-o, configure serviços e solicite uma pesquisa no chat. Os plug-ins aparecem no campo de mensagem somente quando existem conexões utilizáveis.

Plugins conectados podem ser usados diretamente ou nomeados através de **＋ → Plugins**. Consulte [pesquisa na web](web-search.md) e [conexões de plug-in](plugins.md).

## A autorização do plugin continua aguardando

Retorne para Cherry Studio, verifique o status e confirme a conta/área de trabalho. Reabra a autorização ou verifique novamente; reiniciar uma solicitação expirada. As permissões de organização ausentes devem ser tratadas no serviço.

As ações DingTalk precisam ser solicitadas novamente após autorização adicional. Os links WeCom devem ser abertos em WeCom antes de expirarem. Consulte [plug-ins](plugins.md).

## Por que só posso tentar novamente a resposta mais recente?

Tentar novamente substitui a resposta mais recente. Crie uma ramificação em uma nova conversa para explorar outra direção a partir de uma mensagem anterior. Tentar novamente/excluir não reverte ações externas; tentar novamente pode custar mais. Consulte [ações de resposta](chat-and-files.md).

## A compactação de contexto exclui minha conversa?

A história visível permanece. O material anterior está resumido para o modelo e alguns detalhes originais podem estar ausentes. Forneça material importante novamente quando a exatidão for importante. Consulte [conversas longas](chat-and-files.md).

## Por que as imagens exportadas estão divididas e o código está incompleto?

As exportações de imagens longas são padrão para páginas; uma opção de imagem única longa está disponível. Os painéis de código mostram uma visualização limitada em imagens. Escolha HTML ou Markdown para o código completo. A falha na conversão pode alterar o formato disponível, portanto, inspecione a visualização e o rótulo de formato.

Consulte [compartilhamento e exportação](sharing-and-export.md) para seleção, marca d'água, conteúdo de pensamento e arquivos.

## A geração em segundo plano é interrompida ou as notificações estão faltando

Verifique **Configurações → Notificações** e permissão do sistema. O sistema operacional ainda pode restringir o trabalho em segundo plano. Inspecione a conversa/desenho antes de tentar novamente. Consulte [respostas em segundo plano](settings-and-usage.md).

## O emparelhamento sincroniza automaticamente o histórico de bate-papo?

Não. Ele importa a configuração do provedor selecionado e os modelos habilitados, não importa conversas e não é sincronização contínua. Preservar conteúdo importante separadamente; consulte [importação de desktop](desktop-sync.md) e [dados](data-privacy.md).

## Android bloqueia a instalação ou TestFlight não pode ingressar

Use a [página oficial de download](https://cherryai.com/download?platform=mobile). Android pode precisar de permissão para que o aplicativo de download instale APKs. Instale TestFlight antes de abrir seu convite em iPhone/iPad. A capacidade, a expiração do build e a disponibilidade do serviço podem afetar a instalação.

Consulte [download e instalação](installation.md).

## As ferramentas não funcionam ou um arquivo não foi salvo

* Um modelo só responde por texto, aguarda aprovação ou relata falta de permissão: verifique o modelo, os recursos, a conexão e o acesso em [Permitir que a IA use ferramentas](using-tools.md).
* Android abre o aplicativo de calendário ou a gravação de um evento tem um resultado incerto: siga [Calendário e lembretes](calendar-and-reminders.md) e inspecione os registros existentes antes de tentar novamente.
* A localização falha ou os dados de saúde estão vazios ou parciais: consulte [Registros de localização e saúde](location-and-health.md). Um resultado vazio não prova que não existem registros.
* Você obtém um bloco de código sem um arquivo salvo ou as edições deixam o original inalterado: consulte [Criar e editar arquivos](file-generation.md).
* Você tem HTML, mas deseja um PPT ou não pode editar o texto do PPT individualmente: consulte [HTML para imagem e PPT](html-export.md).

## Como faço para relatar um problema não resolvido?

Informe as versões do aplicativo, dispositivo e sistema, os passos para reproduzir o problema e o texto do erro no [registro de problemas do aplicativo](https://github.com/CherryHQ/cherry-studio-app/issues). Antes de publicar, oculte ou remova chaves, conversas privadas e conteúdo de arquivos.
