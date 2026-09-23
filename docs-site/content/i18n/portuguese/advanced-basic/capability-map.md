---
icon: route
---
# Mapa de Capacidades Avançadas

Os tutoriais avançados não listam item por item o menu de configurações, mas partem de "o que você deseja realizar". Primeiro, escolha o objetivo mais próximo e, em seguida, acesse o tutorial correspondente.

<figure><img src="../../../assets/f99c1bfff81d92511c921169.webp" alt="Primeiro, selecione a entrada principal para concluir a tarefa mínima; após obter resultados estáveis, adicione base de conhecimento, habilidades, MCP, canais ou tarefas agendadas."><figcaption><p>Primeiro, selecione a entrada principal para concluir a tarefa mínima; após obter resultados estáveis, adicione base de conhecimento, habilidades, MCP, canais ou tarefas agendadas. </p></figcaption></figure>

{% hint style="success" %}
Ao precisar configurar um conjunto de tutoriais, canais, tarefas agendadas ou capacidades de extensão, informe ao Agent seus objetivos prioritariamente em [Trabalho]. O Agent pode ajudar a identificar o que falta e guiá-lo na configuração comum; quando for necessário verificar contas, chaves ou parâmetros exatos, ajuste manualmente em [Configurações].
{% endhint %}

<figure><img src="../../../assets/8fe4d938af469d667d4071df.webp" alt="O painel de início à esquerda oferece nove entradas principais; escolha a mais próxima da sua tarefa para começar."><figcaption><p>O painel de início à esquerda oferece nove entradas principais; escolha a mais próxima da sua tarefa para começar. </p></figcaption></figure>

Descrição do gráfico: primeiro selecione a entrada principal conforme o objetivo; após o fluxo se estabilizar, adicione habilidades, MCP, canais ou tarefas agendadas.

### Selecionar entrada por objetivo

| O que você deseja realizar | Entrada recomendada | Capacidades utilizadas |
| ------------- | ----------------------- | --------------------- |
| Comparar múltiplas respostas, organizar discussões longas | [Conversa] | Multi-modelos, ramificação de mensagens, contexto, citações e artefatos |
| Processar arquivos ou concluir tarefas em múltiplas etapas | [Trabalho] | Agent, diretório de trabalho, ferramentas, permissões e painel de status |
| Responder com estabilidade usando seus próprios materiais | [Base de Conhecimento] → teste de recuperação, depois vincular ao Agent | Arquivos/páginas web/notas, RAG, escopo de busca |
| Gerar imagens a partir de artigos ou editar imagens | [Desenho], ou ativar [Gerar Imagem] no Agent | Modelos, imagem de referência, edição local, aprimoramento |
| Traduzir texto, capturas de tela ou documentos longos | [Tradução] | OCR, processamento de documentos, histórico e favoritos |
| Consolidar rascunhos e continuar processando | [Notas] | Markdown, busca, exportação, adição à base de conhecimento |
| Capturar interface, anotar e copiar texto | [Configurações] → [Captura de Tela] ative e use o atalho global | Captura de área, anotação, mosaico, OCR |
| Abrir aplicativos web frequentes | [Mini Programa] | Ferramentas web integradas e sites adicionados |
| Navegar, pré-visualizar e organizar arquivos locais | [Arquivos] | Lista de arquivos, pré-visualização e processamento posterior |
| Conectar ferramentas externas ou métodos de trabalho fixos | Primeiro deixe o Agent avaliar, depois verifique em [Configurações] | Habilidades, MCP, ferramentas integradas |
| Usar o Agent a partir de plataformas externas | Primeiro deixe o Agent guiar a configuração em [Trabalho] | Canais, escopo permitido, modo de permissão |
| Gerar relatórios diários ou lembretes conforme plano | Primeiro execute o Agent, depois crie [Tarefa Agendada] | Agent, diretório de trabalho, canais, registros de execução |
| Visualizar materiais e tarefas simultaneamente | Botão direito na aba → [Abrir em nova janela] | Multi-janelas, abas fixas, busca global |
| Gerenciar linha de comando de programação | Painel de início [Parceiro de Código] | Code CLI, conexão de modelos, diretórios e terminal |
| Fazer programas locais chamarem modelos ou depurar | [Configurações] → [Gateway de API] / [Geral] | API compatível, cadeia de chamadas, modo desenvolvedor |

### Ordem de estudo recomendada

{% stepper %}
{% step %}
#### 1. Primeiro domine o espaço de trabalho do Agent

Aprenda a criar Agent, selecionar diretório de trabalho, entender a divisão de tarefas dos modelos e as permissões. As extensões, automações e casos de projeto subsequentes são construídos sobre esta base.
{% endstep %}

{% step %}
#### 2. Depois conecte materiais e capacidades

Use base de conhecimento para materiais de longo prazo, habilidades para métodos repetitivos e MCP para sistemas externos. Adicione apenas uma capacidade por vez e valide com tarefas pequenas.
{% endstep %}

{% step %}
#### 3. Por último, automatize ou conecte externamente

Configure canais, tarefas agendadas, Code CLI ou API externa apenas após os resultados manuais se estabilizarem. Assim, quando surgirem problemas, será mais fácil identificar qual etapa está envolvida.
{% endstep %}
{% endstepper %}

### Ler por módulo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Conversa Avançada</strong></td><td>Multi-modelos, ramificação, contexto e artefatos</td><td><a href="chat/README.md">chat/README.md</a></td></tr><tr><td><strong>Espaço de Trabalho do Agent</strong></td><td>Da configuração à execução e entrega de arquivos</td><td><a href="agent-workspace/README.md">agent-workspace/README.md</a></td></tr><tr><td><strong>Fluxo de Trabalho de Conhecimento e Conteúdo</strong></td><td>Base de conhecimento, notas, desenho e tradução</td><td><a href="knowledge-content/README.md">knowledge-content/README.md</a></td></tr><tr><td><strong>Estender as Capacidades do Agent</strong></td><td>Habilidades e MCP</td><td><a href="extensions/README.md">extensions/README.md</a></td></tr><tr><td><strong>Automação e Alcance Externo</strong></td><td>Canais, tarefas agendadas e heartbeat</td><td><a href="automation/README.md">automation/README.md</a></td></tr><tr><td><strong>Bancada de Trabalho Eficiente</strong></td><td>Multi-janelas, ferramentas de produtividade e busca</td><td><a href="workbench/README.md">workbench/README.md</a></td></tr><tr><td><strong>Desenvolvimento e Diagnóstico</strong></td><td>Code CLI, Gateway de API e cadeia de chamadas</td><td><a href="developer-tools/README.md">developer-tools/README.md</a></td></tr><tr><td><strong>Casos de Aplicação</strong></td><td>Nove fluxos de trabalho completos</td><td><a href="cases/README.md">cases/README.md</a></td></tr></tbody></table>

{% hint style="warning" %}
Diretórios de trabalho, MCP, canais e modos de alta permissão ampliam o escopo de dados acessíveis pelo Agent. Forneça apenas os diretórios, ferramentas e contas necessários para a tarefa atual; não coloque API Key, chaves de robô ou materiais privados em conversas públicas e capturas de tela.
{% endhint %}
