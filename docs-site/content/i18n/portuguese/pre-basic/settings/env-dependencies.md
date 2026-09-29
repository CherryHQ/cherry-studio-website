---
icon: terminal
---
# Dependências de Ambiente

As dependências de ambiente são usadas para **gerenciar as ferramentas binárias e os runtimes necessários para que o Cherry Studio execute algumas funcionalidades avançadas**. Algumas capacidades de [serviços MCP](../../advanced-basic/extensions/mcp), [habilidades](../../advanced-basic/extensions/skills.md) e [Agent](../../advanced-basic/agent.md) dependem, em nível inferior, da chamada de ferramentas de linha de comando como `uv` e `bun`. O Cherry Studio centraliza tudo aqui, para que você não precise instalar e configurar manualmente via linha de comando.

Abra `Configurações → Dependências do ambiente`:

<figure><img src="../../../../assets/edd81af2d8627638562b77e3.webp" alt=""><figcaption><p>Dependências de Ambiente: Ferramentas embutidas e instaláveis</p></figcaption></figure>

### Embutidas e instaláveis

Cada ferramenta é exibida em formato de cartão, com indicação de status:

* Ferramentas marcadas com <mark style="color:blue;">**Embutida**</mark> são distribuídas junto com o Cherry Studio, prontas para uso imediato, sem necessidade de configuração.
* Nos cartões de ferramentas não instaladas, aparece um botão **Instalar**. Ao clicar, o Cherry Studio baixa e instala automaticamente no diretório do aplicativo, sem afetar o ambiente do seu sistema.
* Os cartões fornecem links para o repositório de código-fonte, a documentação oficial e uma opção para abrir o diretório local de instalação.

Lista de ferramentas comuns:

| Ferramenta | Função |
| --- | --- |
| **uv** | Ferramenta de gerenciamento de pacotes Python para serviços MCP e instalação de dependências |
| **Bun** | Runtime JavaScript usado por serviços MCP e ferramentas relacionadas |
| **fd** | Ferramenta rápida de busca de arquivos, alternativa ao `find` |
| **ripgrep (rg)** | Ferramenta rápida de busca de texto, alternativa ao `grep` |
| **RTK** | Ferramenta CLI de proxy que comprime a saída do terminal e reduz o consumo de tokens de LLM |
| **Lark CLI** | CLI oficial do Feishu, cobrindo mais de 200 comandos para mensagens / documentos / planilhas multidimensionais / calendário, etc. |

A página também lista em cartões ferramentas como `gh` (GitHub CLI), `ntn` (Notion CLI) e `pi`, que podem ser instaladas com um clique conforme a necessidade. (CLIs de programação, como Claude Code / Codex, são gerenciados na página [Parceiros de Criação de Código](../../cherrystudio/preview/code-cli.md) e não nesta página.)

### Adicionar ferramenta

O botão "**Adicionar ferramenta**" no canto superior direito permite usar a ferramenta mise para adicionar ferramentas fora da lista embutida (por exemplo, `github:sharkdp/fd`, `uv`, `bun`).

### Configurações avançadas de instalação

Clique no ícone de configurações no canto superior direito para abrir "**Configurações avançadas de instalação**" e ajustar a forma de download das ferramentas (todos os campos podem ficar em branco para usar os padrões):

* **Espelho do GitHub**: Adiciona um prefixo de proxy para downloads de Releases do GitHub (ex.: `https://ghfast.top`), útil quando a conexão direta não é estável.
* **Token do GitHub**: Aumenta o limite de taxa da API do GitHub durante a consulta de ferramentas (salvo em texto simples localmente).
* **Espelho npm / Endereço de índice pip**: Define espelhos para ferramentas do tipo `npm:` / `pipx:` (se ficar em branco, um espelho é selecionado automaticamente na China continental).
* **Verificar assinatura da ferramenta**: Verifica as assinaturas Sigstore / SLSA das ferramentas; geralmente deve permanecer ativado.

{% hint style="info" %}
Usuários comuns geralmente não precisam interagir aqui — quando uma ferramenta é necessária, a funcionalidade relacionada (como a instalação de um serviço MCP) geralmente o levará de volta a esta página para instalação com um clique. Esta página funciona mais como uma entrada para "verificação e complementação do ambiente de execução".
{% endhint %}

{% hint style="warning" %}
Se um serviço MCP ou habilidade retornar um erro indicando "uv / bun não encontrado / comando inexistente", verifique primeiro aqui se a ferramenta correspondente está instalada ou com status "Embutida" (o status de instalação é atualizado automaticamente; o botão no canto superior direito é **Verificar atualizações**, usado para buscar a versão mais recente das ferramentas).
{% endhint %}

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhoria de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e Sugestões](../../question-contact/suggestions.md).
