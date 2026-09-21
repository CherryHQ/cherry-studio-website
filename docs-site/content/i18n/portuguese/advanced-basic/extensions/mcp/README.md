---
icon: network-wired
---
# MCP e Ferramentas Externas

O MCP é a forma de conectar o Agent a ferramentas e recursos externos. O Cherry Studio pode gerenciar servidores MCP, servidores integrados, o mercado de serviços e entradas de alguns provedores, vinculando os servidores conectados a um Agent específico.

### Quando o MCP é necessário

<figure><img src="../../../../../assets/d2a9cd99b66df87ce02e196e.webp" alt="MCP e Ferramentas Externas — Imagem ilustrativa"><figcaption></figcaption></figure>

<figure><img src="../../../../../assets/79e45524b78de312b0ea7d2b.webp" alt="MCP e Ferramentas Externas — Imagem ilustrativa"><figcaption></figcaption></figure>

* O Agent precisa chamar serviços além das ferramentas integradas do Cherry Studio;
* A equipe já possui bancos de dados, navegadores ou sistemas de negócios que oferecem interfaces MCP;
* Deseja que as mesmas capacidades externas sejam reutilizadas por vários Agents;
* É necessário fornecer ferramentas, recursos ou prompts ao modelo de forma unificada.

Use habilidades para fluxos fixos e vincule diretamente o banco de conhecimento do Cherry Studio apenas para busca. Não é necessário configurar o MCP apenas para ser "mais avançado".

### Adicionar servidor

Caminho: [Configurações] → [MCP] → [Servidores MCP] → [Adicionar].

{% stepper %}
{% step %}
#### 1. Confirmar o método de conexão

Comandos locais geralmente usam entrada e saída padrão; serviços remotos geralmente fornecem endereços SSE ou HTTP com transmissão contínua. Preencha de acordo com a configuração fornecida pelo provedor do serviço; não tente adivinhar pelo nome.
{% endstep %}

{% step %}
#### 2. Preencher a configuração e verificar permissões

Servidores locais requerem comando, parâmetros e variáveis de ambiente; servidores remotos requerem URL, e alguns serviços também exigem autorização. Antes de salvar, confirme a origem do comando e o escopo dos dados.
{% endstep %}

{% step %}
#### 3. Iniciar e visualizar ferramentas

Ative o servidor, aguarde o status ficar normal e, em seguida, abra os detalhes para verificar as ferramentas, recursos e prompts fornecidos. Em caso de falha na conexão, verifique primeiro os logs do servidor.

Na lista de ferramentas, expanda uma ferramenta para ver a descrição completa em Markdown, bem como parâmetros, tipos, marcadores de obrigatoriedade e valores enumerados exibidos por nível. Verifique os parâmetros obrigatórios antes de chamar; parâmetros de objeto ou matriz devem ser expandidos camada por camada para evitar adivinhar o formato de entrada apenas pelo nome da ferramenta.
{% endstep %}

{% step %}
#### 4. Vincular ao Agent

Abra [Trabalho] → Menu Agent → [Editar] → [MCP] e ative o servidor. Servidores não iniciados não podem ser vinculados e usados corretamente.
{% endstep %}
{% endstepper %}

### Servidores integrados e mercado de serviços

[MCP Integrado] fornece capacidades comuns que podem ser instaladas ou ativadas diretamente; [Mercado de Serviços] é usado para gerenciar fontes de mercado de terceiros. Antes de instalar, ainda é necessário verificar instruções, comandos, variáveis de ambiente e permissões; a entrada integrada não significa que todas as operações do serviço externo sejam sem riscos.

<figure><img src="../../../../../assets/3892f8eaa6ef4645921a382d.webp" alt="① A lista integrada indica se é necessária conta, API Key ou configuração de diretório; após a instalação, ainda é necessário concluir a configuração e verificar a conexão."><figcaption><p>① A lista integrada indica se é necessária conta, API Key ou configuração de diretório; após a instalação, ainda é necessário concluir a configuração e verificar a conexão. </p></figcaption></figure>

O QVeris está localizado em [Servidores Integrados] e é usado para permitir que o Agent descubra, inspecione e chame capacidades externas. Após a instalação, é necessário configurar `QVERIS_API_KEY`; não insira chaves em prompts do Agent, habilidades ou capturas de tela públicas.

### Usar prompts e recursos MCP na área de entrada

Além das ferramentas, os servidores podem fornecer "prompts" e "recursos". Após o servidor estar vinculado ao assistente ou Agent atual, abra o painel [+] na área de entrada:

* Selecione [Prompts MCP] para inserir o modelo do servidor na caixa de entrada; os parâmetros obrigatórios do modelo aparecerão como campos preenchíveis;
* Selecione [Recursos MCP] para escolher arquivos, registros ou outros recursos dos servidores vinculados;
* Recursos de texto curtos serão inseridos diretamente na caixa de entrada; recursos maiores ou binários serão tratados como referências, lidos pelo modelo que suporta chamadas de ferramentas quando necessário.

{% hint style="info" %}
O painel exibe apenas os servidores conectados no escopo da conversa atual que realmente fornecem a capacidade correspondente. Se [Prompts MCP] ou [Recursos MCP] não estiverem visíveis, verifique primeiro a aba correspondente nos detalhes do servidor e, em seguida, confirme se o assistente ou Agent atual está vinculado a esse servidor.
{% endhint %}

### Sugestões de configuração

| Item de configuração | Padrão do produto | Ponto de partida sugerido | Função | Cenário aplicável | Observações |
| -------- | -------------- | ----------------- | --------- | ------------- | ------------ |
| Status do servidor | Definido pela configuração após a adição | Ative e verifique um por vez | Controla se o servidor está disponível | Integração inicial, solução de problemas | Difícil localizar quando vários serviços falham simultaneamente |
| Vinculação do Agent | Não vincula automaticamente todos os servidores | Vincule apenas os servidores necessários para o Agent atual | Controla o escopo de capacidades | Divisão de trabalho entre múltiplos Agents | Evita que ferramentas irrelevantes ocupem o contexto |
| Variáveis de ambiente | Não preenche chaves automaticamente | Use credenciais com privilégios mínimos exigidos pelo serviço | Fornece autenticação ou parâmetros de execução | Serviços privados | Oculte conteúdo sensível antes de capturas de tela e exportações |
| Aprovação de ferramentas | Definido pelo modo de permissão do Agent | Mantenha confirmação para ferramentas de gravação ou cobrança | Previne operações acidentais | Bancos de dados, arquivos, APIs externas | Entradas de canal podem usar modos mais estritos |

### Caso de usuário: Conectar banco de dados do projeto a um Agent de análise

O administrador fornece uma conexão MCP somente leitura, o usuário verifica em [Configurações] → [MCP] se o servidor está normal e vincula apenas ao Agent "Análise de Dados". O Agent usa ferramentas somente leitura para obter dados e grava o relatório no diretório de trabalho; ferramentas que envolvem atualização de dados não são ativadas. Assim, mesmo que ocorra um mal-entendido no prompt, o banco de dados de negócios não será modificado diretamente.

<details>

<summary>MCP e Gateway de API: qual a diferença? </summary>

O MCP conecta ferramentas externas ao Cherry Studio; o Gateway de API fornece as capacidades de modelo do Cherry Studio a outros programas via API compatível. A direção do fluxo de dados é oposta.

</details>

<details>

<summary>O servidor mostra como conectado, mas o Agent ainda não encontra as ferramentas. O que fazer? </summary>

Verifique se o Agent está vinculado ao servidor, se as ferramentas foram desativadas e se há solicitações de permissão pendentes. Após modificar a configuração do Agent, envie uma nova mensagem para que o tempo de execução carregue as novas ferramentas.

</details>

<details>

<summary>O servidor mostra como conectado, mas o Agent ainda não encontra as ferramentas. O que fazer? </summary>

Verifique se o Agent está vinculado ao servidor, se as ferramentas foram desativadas e se há solicitações de permissão pendentes. Após modificar a configuração do Agent, envie uma nova mensagem para que o tempo de execução carregue as novas ferramentas.

</details>

<figure><img src="../../../../../assets/3892f8eaa6ef4645921a382d.webp" alt="MCP e Ferramentas Externas — Imagem ilustrativa"><figcaption></figcaption></figure>
