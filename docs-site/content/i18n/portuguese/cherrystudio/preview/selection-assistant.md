---
icon: highlighter
---
# Assistente de Seleção

O Assistente de Seleção (Selection Assistant) permite que, após **selecionar texto em qualquer aplicativo**, você utilize uma barra de ferramentas flutuante para invocar a IA e realizar operações como tradução, explicação, otimização e resumo, sem precisar colar o conteúdo de volta no Cherry Studio.

{% hint style="info" %}
**Diferença em relação ao [Assistente Rápido](quick-assistant.md)**:

* **Assistente Rápido**: usa um atalho global para abrir uma janela de **entrada ativa**, onde você digita sua pergunta
* **Assistente de Seleção**: após selecionar o texto, exibe uma barra de ferramentas **específica para o conteúdo selecionado**, permitindo executar operações predefinidas com um clique
{% endhint %}

### Suporte a Plataformas

* ✅ **macOS**: Suporte completo, mas é necessário conceder a **permissão de Acessibilidade** na primeira ativação
* ✅ **Windows**: Suporte completo, sem necessidade de permissões especiais
* ⚠️ **Linux**: Suporte completo apenas no modo **X11**; no modo Wayland, a barra de ferramentas pode não se posicionar corretamente junto ao texto selecionado. Além disso, é necessário adicionar o usuário atual ao grupo `input` (`sudo usermod -aG input $USER`) para obter permissão de monitoramento de teclas

### Ativar o Assistente de Seleção

Abra [Configurações] → [Assistente de Seleção]:

<figure><img src="../../../../assets/9c1fa1dc2820ccee7bd169f3.webp" alt=""><figcaption><p>Painel de configurações do Assistente de Seleção</p></figcaption></figure>

1. Ative o interruptor **Ativar**
2. Usuários do **macOS** verão uma janela solicitando a **permissão de Acessibilidade** na primeira ativação:

   <figure><img src="../../../../assets/ed99fa5f9b3118d263e09cd2.webp" alt=""><figcaption><p>Prompt de permissão de Acessibilidade na primeira ativação</p></figcaption></figure>

   Clique em **Ir para Configurações** → na janela [Configurações do Sistema] → [Privacidade e Segurança] → [Acessibilidade], localize o Cherry Studio e ative o interruptor → volte ao Cherry Studio e ative novamente.
3. (Opcional) Em [Barra de Ferramentas] → [Método de Seleção], escolha o método de gatilho (as opções variam conforme a plataforma):
   * **Seleção**: exibe a barra de ferramentas imediatamente após selecionar o texto (padrão)
   * **Tecla Ctrl** (apenas Windows): exibe a barra de ferramentas apenas após selecionar o texto e **segurar a tecla Ctrl** (evita acionamentos acidentais)
   * **Atalho**: exibe a barra de ferramentas após selecionar o texto e pressionar o atalho; o atalho pode ser alterado em [Configurações] → [Atalhos]

<figure><img src="../../../../assets/f45f2fd96c9bb25af9825da7.webp" alt=""><figcaption><p>Painel de configurações após ativação: Método de Seleção / Modo Compacto / Seguir Barra de Ferramentas…</p></figcaption></figure>

### Operações Integradas

O Assistente de Seleção oferece 7 operações integradas, com **5 ativadas por padrão**: Tradução / Explicação / Resumo / Busca / Copiar. O **ícone Cherry à esquerda da barra de ferramentas não é um botão de operação** — ele serve apenas como alça de arraste para mover a barra de ferramentas inteira.

| Operação | Ativada por Padrão | Uso |
|---|---|---|
| **Tradução** | ✅ | Tradução inteligente: prioriza a tradução para o idioma de destino; se já estiver no idioma de destino, traduz para o idioma alternativo |
| **Explicação** | ✅ | Pede à IA para explicar o conteúdo |
| **Resumo** | ✅ | Pede à IA para resumir o conteúdo selecionado em um parágrafo |
| **Busca** | ✅ | Usa o texto selecionado para consultar um mecanismo de busca (padrão Google, alterável via ícone ⋯ à direita de cada item) |
| **Copiar** | ✅ | Copia o texto selecionado |
| **Otimização** | Pendente | Pede à IA para reescrever de forma mais fluida / profissional; requer arrastar para a área de ativação nas configurações |
| **Citação** | Pendente | Envia o texto selecionado como citação para a conversa atual; requer arrastar para a área de ativação nas configurações |

<figure><img src="../../../../assets/29cffab07ecb8317865312ee.webp" alt=""><figcaption><p>Seção [Funções] do painel de configurações: itens acima estão ativados; arraste itens da área inferior para cima para ativá-los</p></figcaption></figure>

### Operações Personalizadas

Em [Configurações] → [Assistente de Seleção] → [Funções], você pode:

* **Editar** os prompts das operações integradas
* **Adicionar** operações personalizadas (nome + prompt + modelo padrão)
* **Arrastar** para ajustar a ordem das operações na barra de ferramentas
* Arrastar operações menos usadas para a área de armazenamento inferior para "desativá-las"

### Aparência da Barra de Ferramentas / Janela de Resultados

Barra de Ferramentas:
* **Modo Compacto**: exibe apenas ícones, sem texto, economizando espaço na tela

Janela de Resultados (seção [Janela de Funções]):
* **Seguir Barra de Ferramentas**: a janela aparece junto à barra de ferramentas (padrão ativado); se desativado, a janela permanece sempre centralizada
* **Lembrar Tamanho**: mantém o tamanho da janela ajustado manualmente na próxima vez
* **Fechar Automaticamente**: fecha ao clicar fora da janela
* **Manter no Topo**: mantém a janela sempre flutuante acima de outros aplicativos
* **Opacidade**: ajustável de 20% a 100%

### Mecanismos de Busca

A operação integrada [Busca] do Assistente de Seleção permite escolher mecanismos predefinidos (Google, Bing, DuckDuckGo, etc.). A configuração está em [Configurações] → [Assistente de Seleção] → [Funções]: localize o item **Busca**, clique no ícone de engrenagem à direita da linha para abrir o diálogo [Configurar Mecanismo de Busca], onde você pode escolher entre os predefinidos ou adicionar um mecanismo personalizado, usando `{{queryString}}` na URL para indicar a posição do termo de busca.

### Filtro de Aplicativos (Avançado)

Em [Configurações] → [Assistente de Seleção] → [Avançado] → [Filtro de Aplicativos], você pode configurar **lista negra / lista branca** para que o Assistente de Seleção funcione apenas em aplicativos especificados (lista branca) ou não apareça em aplicativos específicos (lista negra).

* **macOS**: insira o Bundle ID do aplicativo (ex.: `com.google.Chrome`, `com.apple.mail`)
* **Windows**: insira o nome do arquivo executável do aplicativo (ex.: `chrome.exe`, `Cherry Studio.exe`)

### Modelo Utilizado

O Assistente de Seleção usa por padrão o [Modelo de Conversa Padrão Global](../../pre-basic/settings/default-models.md), mas você também pode especificar um modelo individual para cada operação.

### Dicas e Sugestões

* No macOS, se a barra de ferramentas não aparecer, verifique se o Cherry Studio está marcado em [Configurações do Sistema] → [Privacidade e Segurança] → [Acessibilidade]
* A barra de ferramentas aparece frequentemente por seleção acidental de texto? Alterne para o modo de gatilho **Tecla Ctrl**
* Muitos ícones na barra de ferramentas ocupando espaço? Ative o **Modo Compacto**
* Deseja operações em cadeia, como "traduzir e depois ler em voz alta"? Copie o resultado da "Tradução" e use o [Assistente Rápido](quick-assistant.md) para continuar o processamento

***

### Obter Ajuda e Enviar Feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou uso, consulte os canais oficiais fornecidos em [Feedback e Sugestões](../../question-contact/suggestions.md).
