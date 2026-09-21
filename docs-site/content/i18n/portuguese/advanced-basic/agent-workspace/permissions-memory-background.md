---
icon: shield-halved
---
# Permissões, Memória e Tarefas em Segundo Plano

O Agent pode executar operações em arquivos, terminal e rede, além de chamar subagentes e tarefas em segundo plano. As permissões determinam "se deve perguntar antes", a memória determina "se ainda saberá da próxima vez" e o painel de status à direita informa "o que está sendo feito agora".

<figure><img src="../../../../assets/ccb5ce9eb543d9f9d2ccccbd.webp" alt="No uso diário, comece com as permissões padrão; o modo apenas para planejamento é adequado para visualizar o plano primeiro, e o acesso total deve ser usado apenas para tarefas com limites claros e reversíveis."><figcaption><p>No uso diário, comece com as permissões padrão; o modo apenas para planejamento é adequado para visualizar o plano primeiro, e o acesso total deve ser usado apenas para tarefas com limites claros e reversíveis. </p></figcaption></figure>

### Modos de Permissão

| Modo | Comportamento | Cenário de Aplicação | Observações |
| -------- | ------------- | ------------- | ---------------- |
| 【Confirmação por Ação】 | Pergunta antes de editar arquivos ou executar comandos | Ponto de partida padrão, diretórios de projetos reais | Pode exigir confirmações frequentes em operações extensas, mas oferece o maior controle |
| 【Aceitação Automática de Edições】 | Permite editar arquivos, mas pergunta antes de executar comandos | Organização de documentos, modificações de código reversíveis | Verifique primeiro o diretório de trabalho e o estado do controle de versão |
| 【Aprovação Inteligente】 | A decisão de liberação é feita por verificações de segurança | Modelos compatíveis e tarefas com limites claros | Alguns modelos ainda podem perguntar ação por ação |
| 【Apenas Planejamento】 | Apenas planeja, não edita arquivos | Revisão de planos, auditoria pré-lançamento | Adequado para visualizar o plano antes de executar |
| 【Acesso Total】 | Pula as verificações de permissão | Ambientes isolados, confiáveis e reversíveis | Pode excluir arquivos ou acessar a rede, apresentando o maior risco |

O escopo de permissões oferecido pelos diferentes modos de execução não é exatamente o mesmo: o Pi não oferece o modo 【Apenas Planejamento】 e, ao criar um novo Agent Pi, o padrão é 【Aprovação Inteligente】; o DeepSeek Harness não oferece 【Aprovação Inteligente】; o 【Reforçado: Claude Agent】 oferece os cinco modos completos.

Caminho de configuração: navegação à esquerda 【Trabalho】 → Menu Agent → 【Editar】 → 【Básico】 → 【Modo de Permissão】.

{% hint style="danger" %}
Os canais podem sobrescrever individualmente o modo de permissão do Agent. Entradas de chat externas são mais suscetíveis a instruções inesperadas; geralmente, deve-se escolher 【Herdar Configurações do Agente】 ou um modo mais restrito que o do Agent. Não abra o acesso total apenas para evitar algumas confirmações.
{% endhint %}

### Memória do Agent

A memória do Agent acompanha o Agent, não uma tarefa específica ou um diretório de trabalho. É adequada para salvar preferências de longo prazo, fatos do projeto, decisões técnicas e experiências; o progresso pontual deve ser registrado como logs com data e hora, para busca em tarefas subsequentes.

Informe diretamente ao Agent em 【Trabalho】:

```
Lembre-se: todo texto em chinês destinado à publicação deve usar pontuação de largura completa e evitar títulos exagerados. Aplique essa regra às próximas tarefas relacionadas.
```

Ao precisar de correções, especifique claramente que a informação antiga está obsoleta e solicite a atualização da memória. Não insira senhas, API Keys, informações de identidade privadas ou conteúdo irrelevante de curto prazo na memória de longo prazo.

### Subagentes, Fluxos de Trabalho e Comandos em Segundo Plano

Em tarefas complexas, o Agent pode distribuir pesquisa, organização e verificação para subagentes ou orquestrar múltiplas etapas por meio de fluxos de trabalho. Comandos demorados podem ser executados em segundo plano, sem bloquear toda a conversa. O Agent também pode, após sua confirmação, criar outra sessão ou enviar tarefas para uma sessão existente; a solicitação retorna imediatamente, e o resultado da conclusão volta para a sessão de origem, preservando a origem e o status de entrega.

Em 【Status】 à direita, é possível visualizar:

* Tarefas em andamento e concluídas;
* Subagentes e fluxos de trabalho;
* Comandos em segundo plano e opção de parada;
* Sucesso, falha e quantidade de chamadas de ferramentas;
* Uso de contexto e artefatos declarados.

Ao ativar 【Configurações】 → 【Notificações】 → 【Notificação de Conclusão da Conversa】, ao trabalhar em outras abas ou janelas, a conclusão da resposta do assistente, a conclusão de tarefas do Agent ou a espera por aprovação serão notificadas por notificações do sistema; clicar na notificação retorna à conversa correspondente.

<figure><img src="../../../../assets/401d6b23759ab97ded47c2b5.webp" alt="Em tarefas longas, é possível visualizar artefatos, subtarefas, comandos em segundo plano e uso de contexto em 【Status】."><figcaption><p>Em tarefas longas, é possível visualizar artefatos, subtarefas, comandos em segundo plano e uso de contexto em 【Status】. </p></figcaption></figure>

### Caso de Usuário: Manutenção Contínua de Normas do Projeto

A equipe insere convenções de código estáveis na memória do Agent e cria habilidades com etapas detalhadas de revisão. A cada revisão de nova branch, abre-se uma tarefa, permitindo que o Agent use subagentes para verificar interfaces, migração de dados e testes separadamente, e o Agent principal consolida as conclusões. Quando as regras mudam, a memória é atualizada, sem necessidade de alterar o histórico de cada tarefa.

<details>

<summary> A memória pode substituir a base de conhecimento? </summary>

Não. A memória é adequada para fatos e experiências em pequena quantidade, estáveis e usados entre tarefas; a base de conhecimento é adequada para documentação sistematizada e permite controlar o escopo de busca do Agent.

</details>

<details>

<summary> A tarefa parece travada, onde olhar primeiro? </summary>

Abra primeiro o 【Status】 à direita e verifique se está aguardando permissões, se há comandos em segundo plano ainda em execução, se subtarefas falharam ou se o provedor está tentando novamente. Para detalhes mais aprofundados da solicitação, abra o modo desenvolvedor para visualizar a cadeia de chamadas.

</details>

<details>

<summary> A tarefa parece travada, onde olhar primeiro? </summary>

Abra primeiro o 【Status】 à direita e verifique se está aguardando permissões, se há comandos em segundo plano ainda em execução, se subtarefas falharam ou se o provedor está tentando novamente. Para detalhes mais aprofundados da solicitação, abra o modo desenvolvedor para visualizar a cadeia de chamadas.

</details>
