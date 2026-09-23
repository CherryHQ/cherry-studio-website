---
icon: bot
---

# Agentes e ferramentas

Um agente salva um nome, avatar, instruções, modelo e preferência de aprovação de ferramenta. Crie agentes separados para escrever, aprender ou trabalhar e, em seguida, inicie conversas independentes sobre tópicos individuais.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/agent-edit.webp"><img src="../../../assets/mobile/en/agent-edit.webp" alt="Salve instruções recorrentes e escolha modelo e modo de aprovação; exemplo de agente mostrado"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Salvar instruções recorrentes e escolher modelo e modo de aprovação; exemplo de agente mostrado</p></figcaption></figure>
</div>

## Crie um agente reutilizável

1. Abra a lista de agentes e toque em adicionar ou crie uma no seletor de agentes do cabeçalho da conversa.
2. Digite um nome, escolha um avatar e descreva como ele deve funcionar.
3. Selecione seu modelo. Pesquisa, plug-ins e ações de calendário precisam de um modelo de texto que suporte a chamada de ferramenta.
4. Escolha a aprovação da ferramenta e habilite os recursos necessários em Sistema. Adicione ferramentas personalizadas após salvar, se necessário.
5. Toque em **Guardar**. Criar a partir do seletor de bate-papo abre uma nova conversa; criar a partir da lista de gerenciamento retorna para lá.

Instruções de exemplo:

> Ajude a organizar meus materiais de trabalho. Comece com um resumo de três frases e, em seguida, liste os itens de ação. Marque proprietários e prazos ausentes como “Para confirmar” em vez de inventá-los. Responda em inglês.

Salve regras recorrentes nas instruções; anexe a tarefa e os documentos atuais no chat. Não armazene chaves ou senhas nas instruções do agente.

## As edições precisam ser salvas?

**A criação de um agente requer Salvar. A edição de um agente existente é salva automaticamente.**

Nome e instruções são salvos após uma breve pausa na digitação; alterações de avatar, modelo e aprovação são salvas imediatamente. Uma falha ao salvar mantém o rascunho no editor aberto e oferece Repetir. Resolva o erro antes de sair.

Um agente pode ser salvo sem modelo, mas não pode iniciar uma conversa até que você escolha um modelo disponível.

## Modos de aprovação

| Modo | Comportamento |
| --- | --- |
| Confirme quando necessário | Pergunta apenas quando as regras de uma ferramenta assim o exigem; algumas leituras podem prosseguir diretamente |
| Aprovação automática | Aprova operações elegíveis, preservando as permissões do sistema, restrições de ferramentas desativadas e limites de dados acessíveis |

Novos agentes, incluindo o agente Cherry inicial, atualmente têm como padrão **Aprovação automática**. Os agentes existentes mantêm sua configuração. Escolha Confirmar quando necessário se desejar confirmação de alterações de calendário, exclusão de lembretes ou ações de ferramentas externas que exijam aprovação.

A aprovação não pode tornar utilizável uma ferramenta indisponível. A **ferramenta de geração de imagens chamada por um modelo de texto ainda requer confirmação a cada vez**, pois consome créditos do provedor. Selecionar diretamente um modelo de imagem e pressionar Gerar é um fluxo de trabalho separado.

Quando uma aprovação aparecer, inspecione a ação e permita ou negue. As ferramentas negadas não são executadas; o agente pode responder a partir de informações existentes. Um prompt de permissão do sistema operacional ainda pode seguir a aprovação do aplicativo.

## Ferramentas do sistema no seu dispositivo

Use a seção **Sistema** do editor do agente para escolher seus recursos: pesquisa na web, geração de imagens, calendário, lembretes, saúde e localização. Somente os recursos suportados pela plataforma e pelo dispositivo são exibidos.

* Os agentes criados por meio do editor começam com calendário, lembretes, saúde e localização desativados. Ative-os conforme necessário; os agentes existentes mantêm suas configurações.
* Essas opções afetam o agente atual. Desativar a pesquisa na Web remove as ferramentas integradas de pesquisa e leitura de páginas; desabilitar a geração de imagens remove a ferramenta de desenho integrada usada por conversas de texto. Gerencie plug-ins e ferramentas MCP personalizadas separadamente em suas próprias configurações.
* Ativar uma opção do agente não concede permissão do sistema. Aprove o acesso quando solicitado, use **Gerir permissões do sistema** ou abra **Configurações → Permissões do sistema**.
* As alterações do agente existente são salvas automaticamente e aplicadas às solicitações subsequentes. Eles não desfazem uma operação já em andamento.

| Capacidade | Exemplo | Disponibilidade |
| --- | --- | --- |
| Calendário | “Listar os eventos de amanhã”; “Crie uma reunião de 30 minutos amanhã às 15h” | iOS e Android, sujeitos a acesso de leitura/gravação e suporte do sistema |
| Lembretes | “Lembre-me amanhã às 9h de enviar o pacote” | Permissões de lembrete iOS; não oferecido atualmente em Android |
| Registros de saúde | “Resuma os passos e treinos registrados esta semana” | iOS, para tipos de dados autorizados individualmente; não oferecido atualmente em Android |
| Localização atual | “Obtenha minha localização atual e ajude a planejar uma rota” | iOS e Android, com permissão de localização |
| Arquivos de aplicativos | “Salve esse resumo como um arquivo” | Anexos e arquivos gerados acessíveis à conversa |

Algumas operações de gravação no calendário do Android abrem um formulário do sistema que você deve preencher e salvar. Abrir esse formulário não significa que um evento foi salvo. Resultados de saúde vazios podem indicar ausência de registros ou falta de permissão para esse tipo de dado.

As ferramentas não podem inspecionar livremente todos os arquivos do telefone, assumir o controle de outros aplicativos ou operar remotamente o seu computador.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/agent-capabilities.webp"><img src="../../../assets/mobile/en/agent-capabilities.webp" alt="Habilite recursos para este agente e gerencie permissões do sistema quando necessário"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Habilite recursos para este agente e gerencie permissões do sistema quando necessário</p></figcaption></figure>
</div>

## Onde configuro outras ferramentas?

* **Pesquisa na Web:** configure os serviços de pesquisa/leitura de páginas em Configurações e peça para pesquisar no chat. Consulte [pesquisa na web](web-search.md).
* **Plugins:** conecte contas como Feishu ou Notion na barra lateral. Plugins conectados estão disponíveis em conversas; **＋ → Plugins** pode nomear explicitamente um. Consulte [plug-ins](plugins.md).
* **MCP personalizado:** MCP conecta serviços de ferramentas adicionais. Adicione um servidor em Configurações e ative-o no editor do agente salvo. Consulte [ferramentas personalizadas](plugins.md).
* **Desenho:** escolha um modelo de desenho em **Configurações → Modelo predefinido** e habilite **Geração de imagens** para o agente fornecer sua ferramenta de desenho. Você também pode selecionar um modelo de imagem diretamente.

## Por que uma ferramenta permanece indisponível após autorização?

Verifique o suporte à chamada de ferramenta do modelo, as opções de capacidade do agente, a conexão, a ativação do servidor/ferramenta e as permissões do sistema. As contas de plug-in também podem ser limitadas pela política da organização ou pelo acesso a recursos.

Forneça um alvo claro: um link de documento, intervalo de datas ou nome de calendário. Comece pedindo ao agente para ler e listar os itens relevantes e, em seguida, solicite alterações quando o alvo estiver claro.

Para etapas práticas e exemplos de solicitações, consulte [Permitir que a IA use ferramentas](using-tools.md), [Calendário e lembretes](calendar-and-reminders.md), [Registros de localização e saúde](location-and-health.md) e [Criar e editar arquivos](file-generation.md).
