---
icon: terminal
---
# Parceiro de Códigos (Code CLI)

O [Parceiro de Códigos] é usado para instalar, configurar e iniciar ferramentas de linha de comando de programação comuns. O Cherry Studio distingue entre versões hospedadas pelo aplicativo, versões já existentes no PATH do sistema e o login de conta próprio da ferramenta, não sobrescrevendo automaticamente as instalações do sistema.

<figure><img src="../../../../assets/2e66cc9312c27cf740b2eb62.webp" alt="① Selecione a ferramenta à esquerda e confirme o status de instalação; ② à direita, selecione o gateway unificado, a conta oficial da ferramenta ou um serviço de modelo compatível."><figcaption><p>① Selecione a ferramenta à esquerda e confirme o status de instalação; ② à direita, selecione o gateway unificado, a conta oficial da ferramenta ou um serviço de modelo compatível. </p></figcaption></figure>

### O que a página pode fazer

* Verificar se a ferramenta está instalada e se há atualizações disponíveis;
* Instalar, atualizar ou remover cópias de ferramentas hospedadas pelo Cherry Studio;
* Detectar ferramentas já existentes no PATH do sistema;
* Selecionar provedor, modelo e parâmetros para CLIs que requerem serviço de modelo;
* Manter o método de login nativo para CLIs que usam login com conta própria;
* Iniciar após selecionar o diretório de trabalho e o terminal detectado pelo sistema.

A página inclui ferramentas como Claude Code, OpenAI Codex, Gemini CLI, OpenCode, Qwen Code, Kimi Code, Qoder CLI, GitHub Copilot CLI, Pi e DeepSeek Harness. Os itens visíveis podem mudar com as atualizações do produto; consulte a lista da página como referência.

### Fluxo de inicialização geral

{% stepper %}
{% step %}
#### 1. Abra o [Parceiro de Códigos] a partir do [Painel de Inicialização]

Selecione a ferramenta necessária e verifique primeiro se o status é não instalado, hospedado pelo Cherry Studio ou originário do sistema.
{% endstep %}

{% step %}
#### 2. Conclua a instalação ou o login

Se não estiver instalado, clique em [Instalar]. Para CLIs que fornecem login de conta por meio da própria ferramenta, conclua o login nativo seguindo as instruções da página; não é necessário selecionar um provedor no Cherry Studio.
{% endstep %}

{% step %}
#### 3. Configure a conexão do modelo

Para ferramentas que requerem serviço de modelo do Cherry Studio, você pode selecionar o [Gateway Unificado] ou um provedor e modelo compatíveis. A página filtra com base no tipo de interface exigido pelo CLI; provedores incompatíveis não serão listados.
{% endstep %}

{% step %}
#### 4. Selecione o diretório e o terminal

O diretório de trabalho determina o local de inicialização do CLI. O terminal só pode ser selecionado da lista detectada pelo sistema; após a inicialização, use primeiro um comando somente de leitura para confirmar o caminho atual.
{% endstep %}

{% step %}
#### 5. Inicie e verifique

Clique em [Iniciar], confirme se a conta ou o modelo está correto e, em seguida, execute modificações de arquivos ou comandos. Se precisar ajustar a intensidade de raciocínio, permissões ou opções exclusivas da ferramenta, abra [Configurações].
{% endstep %}
{% endstepper %}

### DeepSeek Harness

<figure><img src="../../../../assets/ceedc835426c7413a36609ba.webp" alt="① Se não estiver instalado, conclua primeiro a instalação hospedada; após a instalação, configure o provedor compatível, as permissões padrão e o modo Agent, e depois inicie a Web UI."><figcaption><p>① Se não estiver instalado, conclua primeiro a instalação hospedada; após a instalação, configure o provedor compatível, as permissões padrão e o modo Agent, e depois inicie a Web UI. </p></figcaption></figure>

O fluxo do DeepSeek Harness difere do de CLIs de terminal comuns: após a instalação e a seleção do provedor, ele é executado sob hospedagem do Cherry Studio e pode abrir uma Web UI independente. Nos parâmetros, você pode selecionar o modo Agent padrão e as permissões padrão:

| Configuração | Casos adequados | Observações |
| -------- | -------------------------- | ------------- |
| [Padrão] | Pode usar arquivos, Shell, busca, habilidades, planejamento e subagentes | Maior superfície de ferramentas; use permissões controladas primeiro |
| [Código PTC] | Necessário combinar operações de ferramentas em várias etapas por meio do Code Mode | Mais adequado para tarefas de codificação complexas |
| [Minimalista] | Apenas Shell persistente e editor de texto necessários | Menos dependências, menor escopo de capacidade |
| [Somente Leitura] | Inspecionar projeto, sem escrever arquivos | Operações de risco ainda solicitarão confirmação |
| [Escrita no Workspace] | Permite modificar o workspace DSH atual | Não significa acesso a arquivos fora do workspace |
| [Acesso Total] | Ambiente isolado, confiável e recuperável | Não solicita confirmação de operações; maior risco |

### Distinga as origens de instalação

| Origem | O que o Cherry Studio faz | Como você deve manter |
| ---------------- | ------------------ | ----------------- |
| Hospedado pelo Cherry Studio | Instala, atualiza e desinstala a cópia hospedada correspondente | Gerencie em [Parceiro de Códigos] ou [Dependências de Ambiente] |
| PATH do sistema | Detecta e usa diretamente, sem sobrescrever | Atualize ou desinstale usando o gerenciador de pacotes original |
| Conta oficial da ferramenta | Mantém o fluxo de login próprio da ferramenta | Gerencie conta e autorizações na interface da ferramenta |

<figure><img src="../../../../assets/2e66cc9312c27cf740b2eb62.webp" alt="Parceiro de Códigos (Code CLI) — Imagem ilustrativa"><figcaption></figcaption></figure>

{% hint style="warning" %}
Após desinstalar a cópia hospedada pelo Cherry Studio, se ainda houver um executável com o mesmo nome no sistema, a página fará fallback automaticamente para a versão do sistema. Quando o comportamento mudar, confirme primeiro qual origem está sendo usada.
{% endhint %}

### Caso de usuário: Iniciar ferramenta de codificação no diretório do projeto

O desenvolvedor primeiro seleciona o diretório do projeto atual, escolhe uma conexão de modelo já validada e, em seguida, inicia o Pi ou outro CLI. O primeiro comando apenas lê o status do repositório; após confirmar que a conta, o modelo e o diretório estão corretos, permita que a ferramenta modifique arquivos e execute verificações.

<details>

<summary>Por que não consigo encontrar o terminal ou CLI já instalado? </summary>

O Cherry Studio detecta ferramentas a partir do ambiente de login e de localizações padrão. Confirme que o comando pode ser executado no terminal de login e, em seguida, reinicie o aplicativo para atualizar o ambiente. Caminhos portáteis ou não padrão atualmente precisam ser iniciados manualmente a partir desse terminal.

</details>

<details>

<summary>Por que não consigo encontrar o terminal ou CLI já instalado? </summary>

O Cherry Studio detecta ferramentas a partir do ambiente de login e de localizações padrão. Confirme que o comando pode ser executado no terminal de login e, em seguida, reinicie o aplicativo para atualizar o ambiente. Caminhos portáteis ou não padrão atualmente precisam ser iniciados manualmente a partir desse terminal.

</details>
