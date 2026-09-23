---
icon: terminal
---
# Parceiro de Codificação

O [Parceiro de Codificação] é usado para instalar, configurar e iniciar ferramentas de linha de comando comuns para programação. O Cherry Studio reconhece as instalações gerenciadas por ele e também detecta CLIs já disponíveis no ambiente de login do sistema; as ferramentas do sistema continuam sendo mantidas pelo gerenciador de pacotes original.

<figure><img src="../../../../assets/565c03d38bfd4fabef8d3013.webp" alt="Confirme primeiro que a ferramenta está instalada e que a versão está disponível, antes de configurar a conexão do modelo e o diretório do projeto."><figcaption><p>Confirme primeiro que a ferramenta está instalada e que a versão está disponível, antes de configurar a conexão do modelo e o diretório do projeto. </p></figcaption></figure>

## O que a página pode fazer

* Verificar se a ferramenta está instalada e se há atualizações disponíveis;
* Instalar ou atualizar as cópias de ferramentas gerenciadas pelo Cherry Studio;
* Detectar ferramentas já existentes no PATH do sistema;
* Selecionar o provedor e o modelo para CLIs que exigem serviço de modelo;
* Manter o método de login nativo para CLIs que usam login com conta própria;
* Iniciar após selecionar o diretório de trabalho e o terminal detectado pelo sistema.

A página atualmente inclui ferramentas como Claude Code, OpenAI Codex, Gemini CLI, OpenCode, Qwen Code, Kimi Code, Qoder CLI e GitHub Copilot CLI. Os itens visíveis podem mudar com as atualizações do produto; consulte a lista da página como referência.

## Fluxo de uso

{% stepper %}
{% step %}
### 1. Abra [Parceiro de Codificação] na navegação à esquerda

Selecione a ferramenta necessária e verifique primeiro se o status é "não instalado", "gerenciado pelo Cherry Studio" ou "do sistema".
{% endstep %}

{% step %}
### 2. Conclua a instalação ou o login

Se não estiver instalado, clique em [Instalar]. Para CLIs que fornecem login com conta própria, conclua o login nativo seguindo as instruções da página; não é necessário selecionar um provedor no Cherry Studio.
{% endstep %}

{% step %}
### 3. Configure a conexão do modelo

Para ferramentas que exigem o serviço de modelo do Cherry Studio, selecione um provedor e um modelo compatíveis. A página filtra com base no tipo de interface exigido pela CLI; provedores incompatíveis não serão listados.
{% endstep %}

{% step %}
### 4. Selecione o diretório e o terminal

O diretório de trabalho determina onde a CLI será iniciada. O terminal pode ser selecionado apenas da lista detectada pelo sistema; o caminho para executáveis de terminal personalizados não é mais fornecido.
{% endstep %}

{% step %}
### 5. Inicie e verifique

Clique em [Iniciar] e execute uma verificação somente leitura no terminal. Confirme que a conta, o modelo e o diretório estão corretos antes de executar modificações de arquivos ou comandos.
{% endstep %}
{% endstepper %}

## Modos de modelo do Claude Code

Ao configurar o Claude Code, o campo [Modelo] oferece dois modos:

* [Geral]: todos os pedidos usam o mesmo modelo, com configuração simples;
* [Detalhado]: configure Fable, Opus, Sonnet, Haiku e Subagent separadamente em [Mapeamento de Papéis de Modelo]. O [Modelo de Pedido Real] na tabela é o modelo final usado por cada papel; se necessário, você também pode ativar o contexto [1M] para o papel correspondente.

Use [Detalhado] apenas se realmente precisar especificar modelos diferentes para papéis como subtarefas em segundo plano, compressão ou títulos. Papéis em branco seguirão o modelo principal. Após as alterações, use uma pequena tarefa para confirmar que cada papel faz pedidos normalmente.

## Cenário de uso: iniciar ferramentas de codificação no diretório do projeto

| Seleção | Ponto de partida sugerido | Cenário aplicável | Observações |
| ----- | ----------------------------- | ------------ | ---------------- |
| Origem da instalação | Se já houver uma versão do sistema, use-a primeiro | A equipe já gerencia CLIs de forma unificada | Atualizações e desinstalações continuam sendo responsabilidade do gerenciador de pacotes original |
| Conexão do modelo | Selecione primeiro uma conexão já verificada como disponível no Cherry Studio | CLIs que exigem serviço de modelo | Ferramentas com login de conta própria devem seguir o fluxo nativo |
| Diretório de trabalho | Selecione apenas o diretório do projeto atual | Modificar código, executar verificações | Após iniciar, confirme o caminho onde o terminal está localizado |
| Primeiro comando | Verificação somente leitura do status do projeto | Verificar conta, modelo e diretório | Permita escrita em arquivos apenas após confirmar que está tudo certo |

### Critérios de conclusão

A página reconhece a origem da instalação; o terminal abre no diretório correto; o comando mínimo somente leitura tem sucesso; a conta ou o modelo exibido pela ferramenta corresponde ao esperado.

## Diferencie as origens de instalação

| Origem | O que o Cherry Studio faz | Como você deve manter |
| ---------------- | ------------------ | ------------------ |
| Gerenciado pelo Cherry Studio | Instala, atualiza e desinstala a cópia gerenciada correspondente | Gerencie em [Parceiro de Codificação] ou [Dependências de Ambiente] |
| PATH do sistema | Detecta e usa diretamente, sem sobrescrever | Atualize ou desinstale com o gerenciador de pacotes original |
| Embutido no aplicativo | Usa diretamente, não oferece desinstalação em nível de sistema | Atualizado junto com o Cherry Studio |

{% hint style="warning" %}
Após desinstalar a cópia gerenciada pelo Cherry Studio, se ainda houver um executável com o mesmo nome no sistema, a página voltará automaticamente para a versão do sistema. Em caso de mudanças de versão ou comportamento, confirme primeiro qual origem está sendo usada.
{% endhint %}

<details>

<summary>Por que não consigo encontrar um terminal ou CLI já instalado? </summary>

O Cherry Studio detecta ferramentas a partir do ambiente de login e de posições padrão. Confirme que o comando pode ser executado no terminal de login e, em seguida, reinicie o aplicativo para atualizar o ambiente. Caminhos portáteis ou não padrão atualmente precisam ser iniciados manualmente a partir desse terminal.

</details>
