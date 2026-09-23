---
icon: shield-check
---

# Dados, privacidade e permissões

As conversas e configurações são armazenadas no dispositivo atual. Os modelos de nuvem e as ferramentas conectadas ainda recebem as informações necessárias para suas solicitações.

## Para onde vão os dados?

| Recurso | Dados envolvidos |
| --- | --- |
| Geração de chat/imagem na nuvem | O provedor selecionado recebe mensagens, o histórico incluído na solicitação, imagens, o conteúdo extraído dos documentos ou instruções para gerar imagens |
| Pesquisa/leitura de página | O serviço selecionado recebe palavras-chave ou URLs; o material devolvido participa das respostas do modelo |
| Plug-ins/ferramentas personalizadas | Os serviços conectados processam solicitações autorizadas; o conteúdo recuperado pode ser fornecido ao modelo |
| Calendário, lembretes, localização | Os dados do dispositivo cujo acesso foi autorizado são lidos ou alterados; os resultados relevantes podem ser usados nas respostas |
| Importação de área de trabalho | Endereços de provedores selecionados, chaves e transferência de configuração de modelo compatível pela rede local |

A retenção depende da política e das configurações da conta de cada serviço. O armazenamento local não torna uma conversa na nuvem totalmente offline.

## Relatórios anônimos de uso e erros

O primeiro uso ou uma atualização da política de privacidade solicita que você **Concorde e continue** ou **Discorde** após explicar o uso de dados anônimos. Altere sua escolha posteriormente em **Configurações → Privacidade**.

* **Compartilhe dados de uso anônimos:** inclui identidade de instalação, versões de aplicativos/sistemas, modelos usados e quantidades de tokens; não é texto de conversa, arquivos ou chaves API.
* **Enviar relatórios de erros anônimos:** ajuda a investigar travamentos e falhas, com uma configuração separada.

Desativar relatórios de uso não bloqueia mensagens enviadas a provedores de modelos nem revoga o acesso ao plug-in. Gerencie essas conexões separadamente.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/privacy-settings.webp"><img src="../../../assets/mobile/en/privacy-settings.webp" alt="Relatórios de erros anônimos e dados de uso são opções independentes"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Relatórios de erros anônimos e dados de uso são opções independentes</p></figcaption></figure>
</div>

## Autorização de chaves e plugins

As chaves API concedem acesso ao serviço de modelo. Mantenha-os fora das instruções dos agentes, das capturas de tela públicas e dos relatórios de problemas. Se exposta, revogue a chave no provedor e substitua-a no aplicativo.

As credenciais de plug-in integradas usam o armazenamento seguro do dispositivo e não são transferidas pela importação de desktop. Os cabeçalhos de autenticação estática para servidores MCP personalizados são armazenados localmente com a configuração do servidor e também precisam de manuseio cuidadoso.

## Gerenciar permissões do sistema

Abra **Configurações → Permissões do sistema**. A aprovação da ferramenta e a autorização do sistema operacional podem aparecer separadamente e ambas podem ser necessárias.

| Sintoma | O que verificar |
| --- | --- |
| Apenas algumas fotos estão visíveis | O acesso às fotos selecionadas pode ser ativado; ajustar a seleção/permissão do sistema |
| Nenhum aviso após negar acesso | Altere as permissões Cherry Studio nas configurações do sistema |
| É possível ler o calendário, mas não editar os eventos | Verifique as permissões de leitura e gravação separadamente |
| Sem registros de saúde | Confirme se os registros existem e se o tipo de dados está autorizado |
| O emparelhamento funciona, mas a configuração não pode ser carregada | Verifique o acesso à rede local e [importação de desktop](desktop-sync.md) |

As opções de capacidade do agente controlam se esse agente pode usar as ferramentas integradas relacionadas; as permissões do sistema controlam o acesso do aplicativo aos dados do dispositivo. Gerencie plug-ins e ferramentas MCP personalizadas separadamente. Desabilitar a capacidade de um agente não revoga a permissão do sistema; use as configurações do sistema para revogar o acesso. A aprovação automática da ferramenta não ignora as permissões do sistema. Android atualmente não oferece o lembrete iOS e ferramentas de registro de saúde.

## Antes de trocar de dispositivo ou remover dados de aplicativos

O emparelhamento de dispositivos não é um backup completo ou sincronização automática de bate-papo. Ele importa principalmente configurações e modelos do provedor, não o histórico de conversas.

[Exporte mensagens e arquivos importantes](sharing-and-export.md) antes de desinstalar, apagar os dados do aplicativo ou trocar de dispositivo. Salve-os fora do Cherry Studio ou em outro dispositivo e confirme que abrem. Uma cópia armazenada apenas na biblioteca de arquivos do aplicativo pode ser apagada junto com os dados do aplicativo. Imagens, HTML e Markdown preservam o conteúdo, mas não são backups que restauram todas as configurações do aplicativo.

## A exclusão do histórico desfaz ações?

Não. Excluir ou responder novamente não desfaz alterações de calendário, edição de documentos externos ou mensagens enviadas e não reembolsa custos de modelo. Inspecione o resultado real no serviço relevante se for necessária uma reversão.

## O que um relatório de bug deve incluir?

Informe as versões do aplicativo, dispositivo e sistema, os passos, o resultado esperado, o resultado real e o texto do erro. Antes de publicar capturas de tela ou detalhes, oculte ou remova chaves reais, URLs que contenham credenciais, conversas privadas e conteúdo de arquivos.
