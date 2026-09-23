---
icon: plug
---

# Plugins e ferramentas externas

Os plug-ins permitem que um agente acesse outros serviços dentro de sua autorização, como leitura de documentos Feishu, organização de páginas Notion ou localização de rotas com Amap.

O modelo interpreta a sua solicitação; o plugin acessa o serviço. Selecione primeiro um modelo de texto que suporte chamadas de ferramentas.

## Conecte e use um plugin

1. Abra **Plugins** na barra lateral e selecione um serviço.
2. Leia seus recursos, exemplos e permissões e toque em **Ligar**.
3. Conclua a autorização da conta ou insira a chave de serviço necessária.
4. Volte para Cherry Studio e confirme a conta/espaço de trabalho se solicitado, até mostrar **Conectado**.
5. Faça um pedido específico no chat. Opcionalmente, use **＋ → Plugins** para inserir o plugin de destino e adicione sua pergunta.

Por exemplo: “Use Feishu para resumir três conclusões deste documento: [link].” O nome inserido aparece no campo de mensagem e na mensagem enviada.

Os plug-ins conectados funcionam entre agentes sem autorização separada para cada um. Selecionar um plugin no campo de mensagem torna explícito o serviço pretendido. A opção **＋ → Plugins** no campo de mensagem do chat fica oculta quando nenhum plugin utilizável está conectado.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/plugins.webp"><img src="../../../assets/mobile/en/plugins.webp" alt="Escolha um serviço da lista de plugins"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Escolha um serviço da lista de plugins</p></figcaption></figure>
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/plugin-feishu.webp"><img src="../../../assets/mobile/en/plugin-feishu.webp" alt="Leia recursos, exemplos e detalhes de autorização antes de conectar"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Leia recursos, exemplos e detalhes de autorização antes de conectar</p></figcaption></figure>
</div>

## Conexões comuns

| Plug-in | Útil para | Notas de conexão |
| --- | --- | --- |
| Feishu | Documentos, tabelas base, tarefas, calendários | Configure um aplicativo Feishu e autorize sua conta; a aprovação da organização pode ser necessária. Esta conexão atualmente suporta contas Feishu, não contas Lark internacionais |
| Notion | Encontrar/ler/editar páginas e registros de banco de dados | Autorize um espaço de trabalho e confirme a conta; as permissões do espaço de trabalho ainda se aplicam |
| GitHub | Leia repositórios/discussões e gerencie problemas/pull requests | Use autorização de aplicativo ou token de acesso pessoal; o acesso da organização pode precisar de aprovação |
| Amap | Locais, serviços próximos, clima, rotas | Use um **Chave do serviço web** da plataforma Amap; consultas de rota não leem automaticamente a localização do dispositivo |
| DingTalk | Documentos, calendário, tarefas, outras operações de escritório | Autorizar uma conta e organização; algumas ações requerem autorização adicional |
| WeCom | Documentos autorizados, planilhas, cronogramas e outros dados de escritório | Cole o link de autorização gerado no Assistente de transferência de arquivos do WeCom, abra-o lá e retorne para Cherry Studio |

Um recurso listado não é uma promessa de acesso à conta. Planos, configurações da organização, permissões de recursos e cotas determinam o que sua conta pode usar.

### Preparando Feishu

O “aplicativo” neste fluxo é uma configuração de autorização Feishu, não outro aplicativo de telefone para instalar. Siga o link **Configurar aplicativo** ou o guia de configuração da página de conexão. Se estiver usando um aplicativo existente, insira seu ID e segredo do aplicativo, habilite as permissões necessárias para documentos/tarefas/calendário e autorize sua conta pessoal.

Conceder apenas parte das permissões ainda pode permitir uma conexão utilizável. Para adicionar recursos depois, habilite as permissões correspondentes do aplicativo, conclua a aprovação da organização e atualize a autorização. Reconectar por si só não concede as permissões ausentes.

### Aprovação adicional DingTalk

Conclua a autorização da ação solicitada em DingTalk, retorne e **solicite a operação novamente**. A autorização não reproduz automaticamente a ação que falhou.

### Link WeCom expirado

Os links duram cinco minutos. Gere um novo link e abra-o dentro do WeCom, em vez de apenas em um navegador comum.

## O que posso fazer depois de conectar?

Comece com uma leitura. Substitua o texto entre colchetes por seus links, nomes ou datas e verifique as fontes e a cobertura do resultado.

| Plug-in | Solicitação adaptável | O que verificar |
| --- | --- | --- |
| Feishu | "Leia este documento: [link]. Liste conclusões, tarefas, proprietários e prazos. Marque as informações ausentes como não confirmadas; não crie tarefas ainda." | Se os proprietários e as datas são explícitos; a criação de tarefas é uma próxima etapa separada |
| Notion | "Leia esta página: [link]. Resuma o progresso recente do projeto e retenha os links das fontes." | Acesso ao espaço de trabalho e se o conteúdo relevante da página foi totalmente lido |
| GitHub | “Leia as discussões dos problemas da semana passada em [URL do repositório], agrupe-as por tópico e inclua links.” | Visibilidade do repositório, intervalo de datas e se as conclusões da discussão foram confirmadas |
| Amap | “Compare o transporte público de [cidade e ponto de partida] até [destino], incluindo caminhadas, transferências e duração estimada.” | Cidade e endereço para nomes de lugares duplicados; as estimativas não são horários de partida ao vivo |
| DingTalk | "Leia este documento: [link] e resuma o material sobre [tópico]. Não edite." | Acesso à organização e documentos, além de qualquer autorização adicional em DingTalk |
| WeCom | "Leia este documento: [link]. Resuma três conclusões principais com fontes, sem edição." | O acesso e as ferramentas da conta autorizada realmente disponíveis na conexão |

### Transforme notas de documentos em tarefas salvas

Por exemplo, use duas solicitações com Feishu:

1. "Leia estas notas de reunião: [link]. Liste as tarefas propostas, os proprietários e os prazos, mas não os crie."
2. Após verificação: "Crie apenas os itens 1 e 2 como tarefas Feishu com os proprietários e datas que confirmamos. Retorne os resultados e links."

A leitura de documentos, a pesquisa de pessoas e a criação de tarefas devem estar disponíveis quando necessário. Resolva primeiro nomes duplicados e datas pouco claras. Uma tabela de tarefas no chat não é prova de que as tarefas foram salvas. Tarefas e convites também podem notificar outras pessoas.

### Ler e atualizar tabelas ou bancos de dados base

Forneça o link da tabela e a visualização e, em seguida, indique o filtro: "Registros somente leitura com status Em andamento nesta visualização. Liste nomes e prazos sem fazer alterações". Um projeto pode ter diversas tabelas ou visualizações com nomes semelhantes.

Antes de editar, identifique o registro e o campo exatos. Solicitar ao agente que indique a cobertura quando os resultados tiverem paginação ou limites; uma consulta não é necessariamente o banco de dados inteiro. A conexão Notion atual não fornece manipulação de anexos ou acesso a agentes Notion.

### As ferramentas podem funcionar juntas?

As ferramentas conectadas disponíveis podem cooperar em uma tarefa — por exemplo, ler um documento e [salvar um arquivo de lista de verificação](file-generation.md). Ao copiar material entre serviços, especifique o destino e o conteúdo exato e verifique cada resultado. O sucesso em uma etapa não é revertido automaticamente se outra falhar.

Para aprovação, verificações de resultados e tratamento de falhas, consulte [Permitir que a IA use ferramentas](using-tools.md).

## Fechei a autorização, mas não está conectado

Fechar um navegador não cancela a autorização nem prova que a conexão foi bem-sucedida. Retorne à página de conexão, use **Abrir página de autorização** ou **Verifique novamente** se necessário e conclua a confirmação da conta.

Reinicie solicitações expiradas ou negadas. Para trocar de conta, siga as instruções para desconectar primeiro a conta existente.

## Desconectar e revogar

Use o gerenciamento de conexão ou o menu de detalhes do **Desligar**. Isso remove o acesso local.

Se a revogação remota não for confirmada, use **Gerir autorização** no site do provedor. A remoção local e a revogação do lado do provedor nem sempre terminam juntas.

As credenciais do plug-in permanecem neste dispositivo e não são transferidas pela importação da configuração da área de trabalho; outro telefone precisa de uma conexão separada. O conteúdo recuperado pode ser usado pelo modelo. Consulte [dados e privacidade](data-privacy.md).

## Adicione um serviço MCP personalizado

**MCP** conecta um agente a serviços de ferramentas adicionais. Use isto quando você já tiver um endereço de servidor de ferramentas remoto; plug-ins integrados são mais simples quando atendem às suas necessidades.

1. Abra **Configurações → MCP → Adicionar servidor**.
2. Insira o endereço do servidor fornecido, de preferência `https://`.
3. Se a autenticação for necessária, preencha **Cabeçalhos** com uma entrada `Name=Value` por linha, como `Authorization=Bearer your-token`, usando as instruções do serviço.
4. Salve, aguarde a conexão e inspecione a lista **Ferramentas**. Desative ferramentas indesejadas.
5. Habilite o servidor correspondente no editor do agente alvo e envie uma nova solicitação. Se o agente for novo, salve-o primeiro e reabra seu editor para configurar as ferramentas.

O servidor deve estar conectado e habilitado, a ferramenta habilitada globalmente e o servidor correspondente habilitado para o agente. A aprovação automática não ignora nenhum desses requisitos.

Este campo aceita endereços remotos, não comandos de inicialização da área de trabalho, como `npx` ou `uvx`. iOS pode bloquear `http://` simples; prefira o endereço seguro do serviço.

## Um plugin conectado ainda não consegue realizar a tarefa

Verifique o status da conexão e o suporte para chamada de ferramenta de modelo. Forneça o link/nome/intervalo de datas de destino. Erros de permissão precisam ser reparados no serviço, e não alterações nas instruções do agente.

Para gravações, primeiro peça para ler e listar as alterações propostas. A confirmação da execução depende da [aprovação da ferramenta](agents-and-tools.md).
