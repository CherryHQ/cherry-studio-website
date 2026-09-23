---
icon: wand-magic-sparkles
---
# Criação de Agent e divisão de tarefas entre modelos

Ponto de entrada: navegação à esquerda [Trabalho] → [Adicionar Agente].

O assistente de criação é dividido em quatro etapas: [Informações Básicas], [Prompt do Sistema], [Habilidades] e [Base de Conhecimento]. Na primeira etapa, você também precisa selecionar o modo de execução; o modo de execução determina a divisão de tarefas entre os modelos disponíveis para o Agent, o modo de permissões e algumas ferramentas, e não pode ser alterado após a criação.

<figure><img src="../../../../assets/0797ee2c9878cf471b44fe2e.webp" alt="Criação de Agent e divisão de tarefas entre modelos — Imagem ilustrativa"><figcaption></figcaption></figure>

### Como escolher o modo de execução

| Modo de Execução | Principais Características | Configuração de Modelos | Permissões e Restrições |
| ------------------ | ------------------- | -------------------- | ------------------------------------ |
| [Reforçado: Claude Agent] | Capacidade completa, adequado para tarefas complexas e de múltiplas etapas | Modelo principal, Modelo Plan, Modelo Small | Suporta todos os modos de permissão e detecção de batimento |
| [Rápido: Pi] | Resposta rápida e baixo custo, adequado para tarefas diárias de arquivos e codificação | Apenas configuração do modelo principal | Não oferece [Apenas Planejamento]; padrão [Aprovação Inteligente] na criação |
| [DeepSeek Harness] | Compatível com vários serviços de modelos, suporta execução orientada a objetivos | Apenas configuração do modelo principal | Não oferece [Aprovação Inteligente] e detecção de batimento; suporta `/compact`, `/goal` |

{% hint style="warning" %}
O modo de execução não pode ser alterado após a criação. Se houver mudanças fundamentais nos objetivos, na compatibilidade de modelos ou nas necessidades de permissão, crie um novo Agent em vez de continuar modificando o Agent antigo.
{% endhint %}

### Como preencher as quatro etapas

{% stepper %}
{% step %}
#### 1. Informações Básicas

Escreva o nome como cargo ou tipo de tarefa, por exemplo, "Verificação de Contrato" ou "Planejamento de Conteúdo". Primeiro, selecione o modo de execução e, em seguida, selecione os modelos compatíveis listados na página. A descrição é usada apenas para ajudar a identificar o uso; o modelo principal é responsável pela inferência e execução principais.
{% endstep %}

{% step %}
#### 2. Escrever o Prompt do Sistema

Defina claramente o papel, os objetivos, os limites e o formato de saída. Em vez de acumular adjetivos, forneça regras executáveis: primeiro liste os riscos, depois cite o texto original e, por fim, forneça sugestões de modificação; quando houver informações insuficientes, marque explicitamente, não especule.
{% endstep %}

{% step %}
#### 3. Selecionar Habilidades

Selecione apenas as habilidades relacionadas ao modo de trabalho de longo prazo deste Agent. As habilidades podem ser instaladas em [Configurações] → [Habilidades] ou, posteriormente, você pode pedir ao Agent para localizar e instalá-las.
{% endstep %}

{% step %}
#### 4. Vincular Base de Conhecimento

Vincule apenas as bases de conhecimento que o Agent realmente precisa consultar. Quando não há base de conhecimento vinculada, as ferramentas de busca e gerenciamento de base de conhecimento não aparecerão na lista de ferramentas desse Agent.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../assets/0d33fc961386a770a40db97d.webp" alt="Primeiro selecione o modelo principal; configure o Modelo Plan e o Modelo Small apenas quando a tarefa realmente necessitar de divisão de planejamento ou processamento leve."><figcaption><p>Primeiro selecione o modelo principal; configure o Modelo Plan e o Modelo Small apenas quando a tarefa realmente necessitar de divisão de planejamento ou processamento leve. </p></figcaption></figure>

### Configuração contínua após a criação

Abra o menu na lista de Agents e selecione Editar para ajustar o seguinte:

* [Básico]: visualizar o modo de execução e ajustar os modelos, permissões e configurações de batimento suportados por esse modo;
* [Prompt]: descrição do papel, regras de processamento e limites de comportamento;
* [Ferramentas Integradas]: arquivos, busca, imagens, notificações, tarefas agendadas, memória, sub-agentes e fluxos de trabalho, entre outros;
* [Base de Conhecimento]: limitar as bases de conhecimento acessíveis pelo Agent;
* [MCP]: vincular servidores MCP já conectados;
* [Habilidades]: selecionar habilidades instaladas;
* [Avançado]: definir variáveis de ambiente para ferramentas realmente necessárias.

{% hint style="info" %}
A janela de edição atual salva as alterações automaticamente. Se ainda houver conteúdo pendente de salvamento antes de fechar a janela, o aplicativo concluirá o salvamento primeiro; em caso de falha no salvamento, a janela permanecerá aberta e exibirá um erro.
{% endhint %}

### Ponto de partida recomendado

| Item de Configuração | Padrão do Produto | Ponto de Partida Sugerido | Função | Cenário Aplicável | Observações |
| --------------- | ----------------------------- | ----------------------- | -------------- | ------------------ | ---------------------------------- |
| Modo de Execução | [Reforçado: Claude Agent] | Use [Reforçado: Claude Agent] quando não tiver certeza | Determina a divisão de modelos, permissões e escopo de ferramentas | Todos os Agents | Não pode ser alterado após a criação |
| Modelo Principal | Usa o modelo selecionado na criação | Selecione um modelo verificado que chame ferramentas com estabilidade | Inferência e execução principais | Todos os Agents | O seletor filtra modelos incompatíveis conforme o modo de execução |
| Modelos Plan / Small | Mesmos que o modelo principal | Mantenha inicialmente os mesmos que o modelo principal | Decomposição de tarefas, julgamentos simples e formatação | Apenas [Reforçado: Claude Agent] | Pi e DeepSeek Harness não exibem esses dois campos |
| Modo de Permissão | Claude/DSH é [Confirmação por Vez]; Pi é [Aprovação Inteligente] | Prefira [Confirmação por Vez] para diretórios de projetos reais | Determina se as ferramentas precisam de aprovação | Tarefas de arquivos, terminal e rede | [Acesso Total] pode excluir arquivos ou acessar a rede |
| Detecção de Batimento | Inicialmente ativado nos modos de execução suportados, intervalo de 30 minutos | Pode ser desativado se não houver tarefas contínuas | Permite que o Agent verifique periodicamente o trabalho | Claude Agent, Pi | DeepSeek Harness não oferece detecção de batimento; use tarefas agendadas para horários fixos |

### Caso de Usuário: Agent de Verificação de Contrato

Crie um Agent de "Verificação de Contrato", selecione um modelo principal verificado, exija no prompt que a saída siga o formato "cláusulas de risco, localização no texto original, impacto, sugestão", vincule a base de conhecimento de políticas da empresa e mantenha as permissões em [Confirmação por Vez]. Crie uma nova tarefa para cada contrato e selecione o diretório de arquivos correspondente, evitando que materiais de diferentes clientes se misturem no mesmo contexto.

<details>

<summary>Por que não vi as configurações completas de MCP e permissões durante a criação? </summary>

O assistente de criação mantém apenas as etapas comuns. Após a conclusão da criação, abra a janela de edição do Agent para continuar a configuração em [Básico], [Ferramentas Integradas], [Base de Conhecimento], [MCP], [Habilidades] e [Avançado]; as abes específicas variam conforme as capacidades do modo de execução.

</details>
