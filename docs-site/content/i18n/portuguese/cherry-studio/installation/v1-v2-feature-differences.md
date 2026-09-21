---
icon: table-columns
---
# Diferenças de Funcionalidades

O V2 ajustou a estrutura de dados e várias entradas de funcionalidades. Antes de atualizar, verifique os itens que precisam de reconfiguração; para as etapas específicas, consulte [【Atualização do V1 para o V2】](v1-to-v2-migration.md).

## Alterações na migração do V2.0.2

| Situação | Tratamento no V2.0.2 | Observações |
| --------- | ----------------------- | ------------------------------ |
| Primeira migração do V1 | É possível instalar o V2.0.2 diretamente a partir do V1.9.13 | Não é mais necessário instalar o V2.0.0 primeiro. |
| Atualização normal do V2 | Atualize diretamente e continue usando os dados atuais do V2 | Não clique em [Migrar novamente]. |
| Remigração do V1 | Selecione [Migrar novamente] em [Configurações] → [Dados] | Os dados atuais do V2 serão excluídos permanentemente; use apenas em caso de falha na migração anterior ou dados omitidos. |

{% hint style="danger" %}
[Migrar novamente] não mescla os dados do V1 com os dados atuais do V2. Ele primeiro exclui os dados atuais do V2 e, em seguida, reimporta a partir dos dados do V1 retidos. Não clique neste botão a menos que a migração do V1 tenha falhado ou haja dados omitidos.
{% endhint %}

## Como os dados são tratados

| Tratamento | Escopo dos dados | O que fazer após a atualização |
| ---- | --------------------------------------------------------------------- | ------------- |
| Migração automática | Configurações, serviços de modelos e modelos, assistentes e grupos, sessões e mensagens, Agent e sessões, MCP, base de conhecimento e índices válidos, arquivos, pintura, tradução, notas, prompts, registros de uso | Verifique se os itens de uso frequente abrem normalmente. |
| Requer revisão | Credenciais Anthropic, serviço padrão de busca na web, permissões de ferramentas do Agent e vínculo com base de conhecimento, ordem dos prompts, itens falhos na base de conhecimento, CSS personalizado, favoritos na barra lateral, arquivos ausentes | Reconfirme conforme a tabela abaixo. |
| Não herdado | Histórico de tarefas agendadas do Agent, resultados expandidos de mapas do site da versão antiga, algumas referências de imagens temporárias, estado de abertura atual das notas, configurações de funcionalidades removidas | Recrie quando necessário. |

{% hint style="info" %}
A migração não exclui os dados originais do V1. Os novos dados do V2 não são sincronizados de volta para o V1, e os backups das duas versões não podem ser restaurados mutuamente.
{% endhint %}

## Principais diferenças

| Funcionalidade | V1 | V2 | O que fazer após a atualização |
| --------------- | ------------------------------- | --------------------------------------------- | -------------------------------- |
| Assistentes e prompts | Biblioteca de assistentes independente; frases rápidas podem ser associadas a assistentes | Assistentes gerenciados no chat e no Agent; frases rápidas mescladas em prompts globais | Verifique os grupos de assistentes e a ordem dos prompts. |
| Agent | Algumas configurações e áreas de trabalho seguem a sessão; autorizações antigas podem aprovar ferramentas automaticamente | Identidade, memória e configurações principais pertencem ao Agent; a área de trabalho é fixada após a criação da sessão; as ferramentas podem solicitar autorização novamente | Verifique modelos, área de trabalho, ferramentas e permissões. |
| Base de conhecimento do Agent | A ferramenta de conhecimento pode acessar a base de conhecimento global | Acessa apenas a base de conhecimento explicitamente vinculada | Reconfirme o vínculo da base de conhecimento para cada Agent. |
| Recuperação da base de conhecimento | Permite selecionar manualmente o modo de recuperação e a origem do mapa do site | Usa BM25 sem modelo de incorporação e recuperação híbrida com modelo de incorporação; mapas do site são tratados como URLs comuns | Verifique os modelos de incorporação e reordenação; reconstrua as origens falhas. |
| Busca na web | Permite selecionar o serviço no assistente ou na área de entrada; inclui busca local, compressão RAG e lista de bloqueio de assinaturas | Configure a busca por palavras-chave e a leitura de URLs separadamente em [Configurações] → [Busca na web]; opções antigas relacionadas foram removidas | Selecione novamente os dois serviços padrão e verifique as credenciais. |
| MCP | Serviços adicionados e mercado de descoberta de terceiros coexistem | Serviços adicionados continuam a ser migrados; o antigo mercado de descoberta de terceiros não está mais disponível | Verifique o status dos serviços; adicione novos serviços do mercado atual ou via JSON. |
| Serviço de modelos | Anthropic pode salvar credenciais OAuth | OAuth do Anthropic não é migrado; a região do AWS Bedrock é mantida; novos serviços estão desativados por padrão | Preencha novamente a API Key para o Anthropic e ative os serviços conforme necessário. |
| Arquivos | A relação de referência entre cópias de arquivos e objetos de negócio é fraca | Arquivos gerenciados são controlados por referência; a cópia gerenciada é limpa com atraso após a exclusão da última referência | Coloque arquivos de retenção longa em [Arquivos] ou exporte-os; os arquivos originais do usuário não serão excluídos. |
| Pintura, Mini App e barra lateral | Parâmetros e entradas localizados em áreas da versão antiga | Parâmetros de pintura movidos para a barra de ferramentas de prompts; Mini App na barra de abas superior; favoritos na barra lateral reiniciados | Familiarize-se com as novas entradas e reconfigure os favoritos. |
| CSS personalizado | Seletores do V1 têm efeito direto | O conteúdo é mantido, mas desativado por padrão após a migração | Adapte aos seletores do V2 antes de ativar. |
| Code CLI | Permite selecionar iFlow | iFlow substituído por Qoder | Use Qoder quando precisar de fluxos de trabalho relacionados. |

## Compatibilidade para desenvolvedores

<details>

<summary>Quais são as mudanças na API e nas integrações externas?</summary>

* O identificador de modelo do API Gateway foi alterado de `provider::model` para `provider:model`.
* Os itens retornados pela Knowledge API usam campos do V2.
* O endpoint MCP-over-HTTP foi removido, sem impacto no MCP dentro do aplicativo.
* Falhas na inicialização do SSE podem retornar diretamente um erro HTTP comum; o cliente deve ser compatível com os caminhos de erro HTTP e SSE.
* Os parâmetros da interface de tarefas agendadas foram alterados; os registros de execução históricos não serão migrados.

</details>

## Referências

* [Atualização do V1 para o V2](v1-to-v2-migration.md)
* [Download oficial do Cherry Studio V2](https://cherryai.com.cn/download)
* Página de lançamento do V2.0.2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
