---
icon: triangle-exclamation
---
# Aviso de Atualização Quebradora

O V2 não é uma atualização de substituição comum. Ele alterou a estrutura de dados e ajustou as entradas e o comportamento de recursos como assistentes, Agent, base de conhecimento, pesquisa na web e arquivos.

{% hint style="danger" %}
Os dados do V1 podem ser migrados apenas em direção única para o V2. Novas conversas, Agents, configurações e arquivos criados no V2 não serão sincronizados de volta para o V1, e os backups do V1 e do V2 não podem ser restaurados entre si.
{% endhint %}

## O V2.0.2 pode migrar diretamente do V1

Se precisar reter os dados do V1, siga a operação **V1.9.13 → V2.0.2 (migração de dados concluída diretamente)**, sem a necessidade de usar o V2.0.0 como intermediário.

| Situação atual | O que deve ser feito |
| --------------- | --------------------------------- |
| Ainda no V1, precisa reter dados | Atualize o V1 para a versão 1.9.13, faça um backup completo e instale diretamente o V2.0.2. |
| Já está usando o V2 | Atualize normalmente para o V2.0.2 e continue usando os dados atuais do V2. |
| Migração do V1 falhou anteriormente ou houve dados omitidos | Primeiro, faça um backup completo do V2 atual e, em seguida, considere usar [Migrar novamente]. |
| Não precisa dos dados do V1 | Pode escolher [Ignorar e usar valores padrão], mas os dados do V1 não serão migrados. |

{% hint style="danger" %}
A atualização normal para o V2.0.2 não requer clicar em [Migrar novamente]. Essa operação excluirá permanentemente os dados atuais do V2 e reimportará a partir dos dados originais do V1; não clique nela, a menos que a migração do V1 tenha falhado anteriormente ou tenha havido dados omitidos.
{% endhint %}

## O que deve ser concluído antes da atualização

1. Atualize o V1 para a versão 1.9.13 e inicie-o normalmente pelo menos uma vez.
2. Desative [Backup Simplificado] e crie um backup completo do V1.
3. Saia completamente do Cherry Studio e, em seguida, copie todo o diretório de dados do V1.
4. Ao usar um diretório personalizado ou um disco externo, confirme que o caminho está montado e permite leitura e gravação.

O assistente de migração lê o diretório de dados atual do V1, não o arquivo ZIP de backup. O backup é usado para recuperação em caso de imprevistos e não pode substituir o diretório de dados original na migração.

## [Migrar novamente] não é fusão de dados

O V2.0.2 adicionou [Migrar novamente] em [Configurações] → [Dados]. Ele é usado apenas para corrigir casos em que a migração do V1 falhou anteriormente ou houve dados omitidos.

Antes da operação, será solicitado confirmar os seguintes itens:

* Os dados atuais do V2 serão excluídos permanentemente e a operação não pode ser desfeita.
* Os dados originais do V1 serão mantidos e reimportados após a reinicialização.
* É necessário criar um backup completo do V2 atual antes.

Um backup completo não faz com que os dados do V1 e do V2 sejam mesclados automaticamente. Para novos conteúdos do V2 que precisam ser retidos, exporte-os individualmente ou mantenha um backup completo antes.

{% hint style="danger" %}
O item [Dados residuais da versão v1] em [Configurações] → [Dados] → [Limpar cache] excluirá os dados originais do V1 necessários para [Migrar novamente]. Não limpe este item até confirmar que o resultado da migração está completo e que um backup independente foi retido.
{% endhint %}

## Verificações principais após a atualização

* Serviços de modelo, API Key e modelo padrão; o OAuth da Anthropic não será migrado, sendo necessário usar a API Key.
* Grupos de assistentes, ordem de prompts, permissões de ferramentas do Agent e vínculos da base de conhecimento.
* Fontes de falha na base de conhecimento, serviços de pesquisa por palavras-chave e leitura de URLs na pesquisa na web.
* CSS personalizado, favoritos na barra lateral e arquivos ausentes.

Para uma comparação completa, consulte [Diferenças de Funcionalidades](v1-v2-feature-differences.md).

## Falha na migração ou necessidade de reversão

* Prefira usar [Tentar novamente], corrigindo problemas no diretório de dados, disco ou dados antes de continuar.
* [Salvar informações do problema] salva apenas localmente; o arquivo pode conter caminhos, conteúdo ou credenciais, devendo ser fornecido apenas à equipe de suporte do Cherry Studio.
* [Ignorar e usar valores padrão] iniciará com a configuração padrão, e os dados do V1 não serão migrados.
* Para retornar normalmente ao V1, não é necessário excluir o banco de dados, nem restaurar um backup do V2 para o V1.

{% hint style="danger" %}
Não exclua ou substitua o banco de dados por conta própria. Em caso de operação incorreta, impossibilidade de confirmar o diretório de dados ou necessidade de remigração, mantenha todos os backups e diretórios de dados antes de entrar em contato com a equipe de suporte do Cherry Studio.
{% endhint %}

## Continue lendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Diferenças de Funcionalidades</strong></td><td>Veja o que é migrado automaticamente, o que precisa de revisão e o que não será herdado.</td><td><a href="v1-v2-feature-differences.md">v1-v2-feature-differences.md</a></td></tr><tr><td><strong>Atualização do V1 para o V2</strong></td><td>Conclua backup, migração e verificação na ordem correta de versões.</td><td><a href="v1-to-v2-migration.md">v1-to-v2-migration.md</a></td></tr><tr><td><strong>Reversão do V2 para o V1</strong></td><td>Entenda as precauções para reversão, backup e tratamento do banco de dados.</td><td><a href="v2-to-v1-downgrade.md">v2-to-v1-downgrade.md</a></td></tr></tbody></table>

## Entradas de download

* [Download oficial do V1](https://cherryai.com.cn/download/v1)
* Página de lançamento do V2.0.2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
* [Download oficial do V2](https://cherryai.com.cn/download)
