---
icon: arrow-right-arrow-left
---
# Atualização da V1 para a V2

{% hint style="danger" %}
A migração é unidirecional: os dados da V1 podem ser importados para a V2, mas os novos dados da V2 não serão sincronizados de volta para a V1. Antes de atualizar, mantenha uma cópia de segurança completa da V1 e uma cópia do diretório de dados inteiro da V1, feita após encerrar completamente o aplicativo.
{% endhint %}

{% hint style="warning" %}
O caminho correto para preservar os dados é: **V1.9.13 → V2.0.2 (concluir a migração de dados diretamente)**. Não é mais necessário instalar a V2.0.0 primeiro.
{% endhint %}

## Selecione conforme a situação atual

| Situação atual | Ação |
| --------------- | ------------------------------------ |
| Ainda na V1, precisa preservar os dados | Atualize a V1 para a 1.9.13 e instale a V2.0.2 diretamente seguindo as etapas desta página. |
| Já está usando a V2 | Atualize normalmente para a V2.0.2 e continue usando os dados atuais da V2; não clique em [Migrar novamente]. |
| Migração da V1 falhou anteriormente ou houve perda de dados | Faça uma cópia de segurança completa da V2 atual antes de usar [Migrar novamente] para recomeçar a partir da V1. |
| Não precisa dos dados da V1 | Pode selecionar [Ignorar e usar padrões], começando com a configuração padrão; os dados da V1 não serão importados. |

## Confirmações antes da atualização

* A V1 deve ser no mínimo a 1.9.12; recomenda-se atualizar para a versão final 1.9.13 e iniciar o aplicativo pelo menos uma vez.
* Para a primeira migração, pode usar diretamente a V2.0.2.
* Diretórios de dados personalizados ou discos externos devem permitir leitura e escrita normalmente.
* Todas as tarefas de conversas, Agent, importação de base de conhecimento e processamento de arquivos devem estar concluídas.

{% hint style="warning" %}
O assistente de migração lê o diretório de dados atual da V1, não o arquivo ZIP de backup da V1. O backup é usado para recuperação em caso de imprevistos e não pode substituir o diretório de dados original na migração.
{% endhint %}

## Etapas de operação

{% stepper %}
{% step %}
### Atualize e faça backup da V1

Atualize a V1 para a 1.9.13. Na página de backup de dados, desative [Backup simplificado], crie um backup completo e salve o backup fora do diretório de dados do aplicativo.
{% endstep %}

{% step %}
### Copie o diretório de dados inteiro da V1

Confirme a localização do diretório nas configurações de dados da V1 e copie o diretório inteiro após encerrar completamente o Cherry Studio. Não copie apenas o arquivo de banco de dados.
{% endstep %}

{% step %}
### Verifique diretórios personalizados

Ao usar um disco externo, volume de rede ou outra localização personalizada, confirme que o caminho está montado e permite leitura e escrita. Se o caminho não estiver acessível, não altere para o diretório padrão para continuar a migração.
{% endstep %}

{% step %}
### Inicie a V2.0.2 pela primeira vez

Obtenha o pacote de instalação da V2.0.2 compatível com o sistema e o chip em [Download oficial da V2](https://cherryai.com.cn/download), ou use a [página de lançamentos do GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) ou a [página de lançamentos do GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2). Encerre completamente a V1 antes de instalar e iniciar.
{% endstep %}

{% step %}
### Conclua o [Assistente de Migração de Dados]

Verifique a localização dos dados exibida pelo assistente e selecione [Iniciar migração]. Durante a migração, não feche o aplicativo, não mova o diretório de dados e não desconecte o disco externo.
{% endstep %}

{% step %}
### Verifique os resultados e reinicie

Após a conclusão da migração, expanda primeiro as mensagens de aviso e selecione [Reiniciar aplicativo].
{% endstep %}
{% endstepper %}

## Verificações após a atualização

* Verifique os serviços de modelos comuns, a API Key e o modelo padrão.
* Verifique os grupos de assistentes, os prompts, as permissões do Agent e as vinculações da base de conhecimento.
* Abra as conversas, bases de conhecimento e arquivos comuns; reconstrua apenas as fontes de conhecimento que exibirem falha.
* Em [Configurações] → [Busca na web], reconfirme os serviços de busca por palavras-chave e leitura de URLs.
* Verifique os favoritos na barra lateral e o CSS personalizado.
* Em [Configurações] → [Dados], crie um novo backup completo da V2.

Para mais mudanças de interface, consulte [Diferenças de funcionalidades](v1-v2-feature-differences.md).

## Use [Migrar novamente] apenas em caso de falha na migração

Se a migração da V1 tiver falhado anteriormente ou houver perda de dados, a V2.0.2 permite selecionar [Migrar novamente] em [Configurações] → [Dados]. Essa operação reiniciará o aplicativo e executará a migração novamente a partir dos dados preservados da V1.

{% hint style="danger" %}
[Migrar novamente] excluirá permanentemente os dados atuais da V2 e não mesclará os dados da V1 com os da V2. A menos que a migração da V1 tenha falhado anteriormente ou haja perda de dados, não clique neste botão. É obrigatório criar um backup completo da V2 atual antes da operação; novos conteúdos da V2 que devam ser preservados também devem ser exportados separadamente.
{% endhint %}

## Em caso de falha na migração

| Opção | Quando usar | Observações |
| ---------- | --------------- | ---------------------------------------------- |
| [Tentar novamente] | Após corrigir problemas de diretório, disco ou dados temporários | Opção preferencial; não sai do fluxo de migração. |
| [Salvar informações do problema] | Se a nova tentativa falhar e for necessário pedir ajuda | O arquivo é salvo apenas localmente e pode conter caminhos, conteúdo ou credenciais; forneça apenas à equipe de suporte do Cherry Studio. |
| [Ignorar e usar padrões] | Se decidir explicitamente não importar os dados da V1 | Limpa os dados parciais da V2 já gravados nesta sessão e começa com a configuração padrão; não haverá mais prompts automáticos de migração. |
| [Continuar usando a V1] | Se não for possível migrar no momento e for necessário retomar o trabalho | Reinstale a V1 e continue usando o diretório de dados original da V1. |

{% hint style="danger" %}
Em caso de falha na migração ou seleção acidental de [Ignorar e usar padrões], não exclua o banco de dados por conta própria e não reinstale repetidamente por cima. Mantenha os dados originais e o backup da V1 e entre em contato com a equipe de suporte do Cherry Studio.
{% endhint %}

## Perguntas frequentes

<details>

<summary>Tenho apenas o backup ZIP da V1, posso migrar diretamente?</summary>

Não. Primeiro, restaure e confirme que os dados estão normais em uma versão compatível da V1, mantenha o diretório de dados completo e, em seguida, inicie a migração para a V2.

</details>

<details>

<summary>Preciso reconstruir os índices de todas as bases de conhecimento?</summary>

Não. Índices válidos serão migrados; apenas as fontes que exibirem falha, estiverem sem modelo de incorporação ou não puderem ser lidas serão processadas.

</details>

## Referências

* [Download oficial do Cherry Studio V2](https://cherryai.com.cn/download)
* [Download oficial do Cherry Studio V1](https://cherryai.com.cn/download/v1)
* Página de lançamento da V2.0.2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
* [Documentação oficial de design da migração](https://github.com/CherryHQ/cherry-studio/blob/main/src/main/data/migration/v2/README.md#version-compatibility-gate)
* [Relato de problemas e sugestões de funcionalidades](../../question-contact/suggestions.md)
