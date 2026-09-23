---
icon: arrow-rotate-left
---
# Downgrade de V2 para V1

O downgrade é adequado quando a V2 está temporariamente impactando o trabalho crítico e você ainda possui dados da V1 utilizáveis. Ele não converte os dados da V2 para o formato da V1.

{% hint style="danger" %}
Conversas, Agentes, configurações e arquivos adicionados na V2 não retornarão para a V1. Backups da V2 também não podem ser restaurados na V1; antes de fazer o downgrade, mantenha separadamente o backup mais recente da V2 e o backup original da V1 ou uma cópia do diretório de dados.
{% endhint %}

## Downgrade padrão

{% stepper %}
{% step %}
### Parar tarefas e fazer backup da V2

Encerre as conversas em andamento, Agentes e tarefas de processamento de arquivos. Crie um novo backup completo da V2 em [Configurações] → [Dados] e salve-o fora do diretório de dados do aplicativo.
{% endstep %}

{% step %}
### Confirmar que os dados da V1 ainda estão presentes

Localize a cópia do diretório de dados da V1 mantida antes da atualização ou o backup da V1. Se houver apenas o backup da V1, ele precisa ser restaurado em uma versão compatível da V1; não é possível importá-lo para a V2.
{% endstep %}

{% step %}
### Baixar e instalar a V1

Saia completamente da V2, obtenha o pacote de instalação correspondente ao seu sistema atual em [Download oficial da V1](https://cherryai.com.cn/download/v1) e conclua a instalação.
{% endstep %}

{% step %}
### Iniciar usando os dados originais da V1

Inicie a V1 e utilize o diretório de dados da V1 de antes da atualização. Não o sobrescreva com o banco de dados da V2 ou com backups da V2.
{% endstep %}

{% step %}
### Verificar antes de continuar o trabalho

Verifique as conversas frequentes, serviços de modelos, base de conhecimento e arquivos. Não exclua nenhum backup da V1 ou da V2 até confirmar que os dados da V1 estão normais.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
O downgrade padrão não requer a exclusão do banco de dados. Manter os dados da V2 facilita o retorno à V2 no futuro e evita a exclusão acidental de conteúdo que ainda não foi exportado.
{% endhint %}

{% hint style="danger" %}
A opção [Configurações] → [Dados] → [Remigrar] na V2 não é uma entrada para downgrade. Ela exclui permanentemente os dados atuais da V2 e reimporta a partir dos dados originais da V1; não clique nela, a menos que a migração anterior da V1 tenha falhado ou tenha havido dados omitidos.
{% endhint %}

## Quando lidar com o banco de dados da V2

É necessário lidar com o banco de dados apenas nas seguintes situações:

* Você está explicitamente abandonando todos os dados atuais da V2, mantendo apenas os dados da V1;
* É necessário executar novamente a migração de V1 → V2.

Isso não é uma etapa comum de downgrade. A operação afetará todas as conversas, Agentes, configurações e outros dados da V2, não apenas a limpeza de um lote de registros de teste.

### Método seguro de tratamento

1. Saia completamente da V1 e da V2, confirmando que não há tarefas em segundo plano.
2. Abra [Configurações] → [Dados] → [Dados do Aplicativo] na V1 1.9.13 e acesse o diretório de dados do aplicativo atual.
3. Mova os seguintes itens para a área de trabalho ou outro local seguro; não os exclua diretamente:
   * `Data/cherrystudio.sqlite`
   * `Data/cherrystudio.sqlite-shm` e `Data/cherrystudio.sqlite-wal` (se existirem)
   * `Data/Agents/.claude`
4. Inicie a V1 e verifique os dados originais da V1. Se for necessário remigrar, inicie a V2 para concluir a migração.
5. Somente após confirmar que os dados da V1 estão utilizáveis e que o backup da V2 pode ser localizado, decida se deseja excluir os arquivos movidos anteriormente.

{% hint style="danger" %}
Não mova o banco de dados enquanto o aplicativo estiver em execução, não mova apenas `cherrystudio.sqlite` omitindo os arquivos `-shm` ou `-wal` no mesmo diretório, e não substitua o banco de dados da V2 pelo da V1. Se não puder determinar o diretório de dados atual ou a finalidade dos arquivos, interrompa a operação e entre em contato com a equipe de suporte do Cherry Studio.
{% endhint %}

## Perguntas frequentes

<details>

<summary>As novas conversas da V2 podem ser trazidas de volta para a V1?</summary>

Não. Exporte o conteúdo que deseja manter na V2; a V1 continuará usando apenas os dados originais da V1.

</details>

<details>

<summary>Baixar a V1 converte automaticamente os dados da V2?</summary>

Não. O pacote de instalação apenas instala o aplicativo; ele não converte dados ou formatos de backup.

</details>

<details>

<summary>Posso simplesmente excluir o banco de dados e tentar novamente?</summary>

Não é recomendado. Mova e mantenha os arquivos primeiro, e decida sobre a exclusão após a verificação; se excluídos por engano e sem backups utilizáveis, os dados da V2 podem não ser recuperáveis.

</details>

<details>

<summary>Após o downgrade, se eu voltar para a V2 novamente, qual versão devo instalar?</summary>

Se você continuar usando os dados da V2 anteriores, pode instalar diretamente a V2, desde que não clique em [Remigrar]. Se a migração anterior da V1 falhou ou houve dados omitidos, você pode usar [Configurações] → [Dados] → [Remigrar] após fazer um backup completo da V2 atual; essa operação exclui permanentemente os dados atuais da V2 e reimporta a partir da V1.

</details>

## Referências

* [Download oficial do Cherry Studio V1](https://cherryai.com.cn/download/v1)
* [Download oficial do Cherry Studio V2](https://cherryai.com.cn/download)
* Página de lançamento da V2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
* [Feedback de problemas e sugestões de funcionalidades](../../question-contact/suggestions.md)
