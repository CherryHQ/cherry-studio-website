---
icon: arrows-rotate
---
# Atualização e Reversão

Selecione as instruções correspondentes com base na versão atual e no destino. O V1 e o V2 utilizam estruturas de dados diferentes; é obrigatório criar um backup antes de alternar entre versões principais.

{% hint style="danger" %}
Os dados e o formato de backup do V1 e do V2 não são compatíveis. Sessões, Agentes, configurações e arquivos adicionados no V2 não serão gravados automaticamente de volta no V1.
{% endhint %}

## Atualização e Migração para V2

{% hint style="warning" %}
Se for necessário reter os dados do V1, o caminho correto é: **V1.9.13 → V2 (conclusão direta da migração de dados)**. Não é necessário instalar primeiro uma versão intermediária específica da V2.
{% endhint %}

| Situação atual | O que deve ser feito |
| --------------- | ------------------------------------ |
| Ainda no V1, com necessidade de reter dados | Atualize o V1 para a versão 1.9.13 e, em seguida, instale diretamente o V2 para concluir a migração. |
| Já está usando o V2 | Atualize normalmente para o V2 e continue usando os dados atuais do V2; não clique em [Migrar novamente]. |
| Migração do V1 falhou anteriormente ou houve perda de dados | Faça um backup completo do V2 atual antes de usar [Migrar novamente] em [Configurações] → [Dados]. |
| Não precisa dos dados do V1 | Pode selecionar [Ignorar e usar valores padrão], mas os dados do V1 não serão migrados. |

{% hint style="danger" %}
[Migrar novamente] excluirá permanentemente os dados atuais do V2 e importará novamente a partir dos dados originais do V1, sem mesclar ou reter dados de ambos os lados. Não clique neste botão a menos que a migração do V1 tenha falhado anteriormente ou tenha havido perda de dados.
{% endhint %}

## Escolha do Caminho

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Lembrete de Atualização Destrutiva</strong></td><td>Confirme primeiro a incompatibilidade de dados, a migração novamente e as limitações de reversão.</td><td><a href="v2-breaking-update-notice.md">v2-breaking-update-notice.md</a></td></tr><tr><td><strong>Diferenças de Funcionalidades</strong></td><td>Entenda as mudanças na interface, Agentes, base de conhecimento e outros itens que precisam de verificação após a atualização.</td><td><a href="v1-v2-feature-differences.md">v1-v2-feature-differences.md</a></td></tr><tr><td><strong>Atualização do V1 para o V2</strong></td><td>Faça backup dos dados do V1 e use o V2 diretamente para concluir a migração.</td><td><a href="v1-to-v2-migration.md">v1-to-v2-migration.md</a></td></tr><tr><td><strong>Reversão do V2 para o V1</strong></td><td>Retorne aos dados originais do V1 e entenda quando é necessário processar o banco de dados do V2.</td><td><a href="v2-to-v1-downgrade.md">v2-to-v1-downgrade.md</a></td></tr></tbody></table>

## Preparação Antes da Alternância

1. Encerre conversas em andamento, Agentes, importações de base de conhecimento e tarefas de processamento de arquivos.
2. Crie um novo backup completo da versão atual e salve-o fora do diretório de dados do aplicativo.
3. Registre o diretório de dados do aplicativo atual; ao usar um diretório personalizado ou disco externo, confirme que o caminho está acessível normalmente.

{% hint style="warning" %}
Não exclua manualmente os dados do aplicativo para "desinstalar completamente". O processamento do banco de dados se aplica apenas a casos de descarte total dos dados do V2 ou de migração novamente; veja [Reversão do V2 para o V1](v2-to-v1-downgrade.md).
{% endhint %}

## Pontos de Download

* [Download oficial do Cherry Studio V2](https://cherryai.com.cn/download)
* [Download oficial do Cherry Studio V1](https://cherryai.com.cn/download/v1)
* Página de lançamento do V2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
