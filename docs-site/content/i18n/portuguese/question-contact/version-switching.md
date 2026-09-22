---
icon: arrow-right-arrow-left
---
# Atualização e Reversão de Versão

Ao alternar entre V1 e V2, selecione primeiro a documentação correspondente:

* [Diferenças de Funcionalidades](../cherry-studio/installation/v1-v2-feature-differences.md)
* [Atualização da V1 para V2](../cherry-studio/installation/v1-to-v2-migration.md)
* [Reversão da V2 para V1](../cherry-studio/installation/v2-to-v1-downgrade.md)

{% hint style="danger" %}
Antes de alternar a versão, crie um backup completo dentro do aplicativo, saia completamente do Cherry Studio e copie todo o diretório de dados. Backups da V1 e da V2 não podem ser restaurados entre si.
{% endhint %}

## Migração de Dados da V1 para V2

A V2 já suporta migração direta da V1.9.13, sem precisar de uma versão intermediária específica da V2.

| Situação Atual | O Que Fazer |
| --------------- | ---------------------------------- |
| Ainda na V1, precisa reter dados | Atualize a V1 para 1.9.13 e instale diretamente a V2 para concluir a migração. |
| Já está usando a V2 | Atualize normalmente para a V2 e continue usando os dados atuais da V2. |
| Migração da V1 falhou ou houve perda de dados anteriormente | Faça um backup completo da V2 atual antes de usar [Migrar Novamente]. |
| Não precisa dos dados da V1 | Pode selecionar [Ignorar e Usar Padrões], mas os dados da V1 não serão migrados. |

{% hint style="danger" %}
O [Migrar Novamente] em [Configurações] → [Dados] exclui permanentemente os dados atuais da V2 e reimporta a partir dos dados originais da V1. Ele não mescla os dados de ambos os lados; não clique nele a menos que a migração da V1 tenha falhado ou tenha havido perda de dados.
{% endhint %}

## Pontos de Download

* [Download Oficial da V1](https://cherryai.com.cn/download/v1)
* Página de lançamento da V2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
* [Download Oficial da V2](https://cherryai.com.cn/download)

Para mais informações sobre backups, falhas de migração e observações sobre o banco de dados, consulte [【Atualização e Reversão】](../cherry-studio/installation/upgrade-downgrade.md).
