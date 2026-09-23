---
icon: grid-2
---
# Mini Apps

【Mini Apps】permite que serviços web e ferramentas locais instaladas sejam executados no Cherry Studio. Além de abrir as versões web de vários provedores de IA, você também pode instalar mini apps generativos personalizados que chamam os modelos de IA configurados no Cherry Studio por meio de interfaces autorizadas.

### Diferencie os dois tipos de mini apps

| Tipo | Método de adição | Pode chamar Cherry AI? | Cenários adequados |
| ----- | ---------------------------- | -------------- | ----------------------------------- |
| Site | Preencha nome, URL e Logo | Não | Fixe sites frequentes no Cherry Studio, mantendo o estado de login de cada site |
| Mini app local | Instale o pacote `.miniapp` ou instale a partir da URL fornecida pelo desenvolvedor | Sim, com autorização na instalação | Escrita, resumo, tradução, extração de informações e fluxos de trabalho verticais personalizados com IA |

{% hint style="info" %}
Se você deseja criar um "mini app personalizado que pode chamar o Cherry AI", use o 【Mini app local】, em vez do 【Site】 que apenas preenche a URL. Consulte o tutorial completo em [Mini apps generativos](generative-mini-apps.md).
{% endhint %}

### Acessar Mini Apps

{% stepper %}
{% step %}
### Abrir o Launchpad

Clique em `+` na barra de abas superior ou abra diretamente o 【Launchpad】.
{% endstep %}

{% step %}
### Acessar Mini Apps

Clique no ícone do aplicativo 【Mini Apps】.
{% endstep %}

{% step %}
### Selecionar serviço

Selecione o serviço que deseja abrir na grade de mini apps.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../../assets/014d34ba53fb03d6d894116c.webp" alt=""><figcaption><p>Grade de mini apps, com dezenas de serviços integrados; clique em <code>+</code> no canto superior direito para adicionar qualquer página web</p></figcaption></figure>

No centro da página há uma **caixa de pesquisa**; `+` no canto superior direito é usado para adicionar páginas web personalizadas, e `☰` abre as 【Configurações de exibição de mini apps】.

### Configurações

Em 【Configurações】→【Mini Apps】, você pode fazer os seguintes ajustes:

* **Mostrar / Ocultar mini apps**: Arraste os mini apps para a esquerda ou para a direita para as duas áreas, controlando a visibilidade
* **Ordenar mini apps**: Arraste para cima ou para baixo para ordenar os mini apps
* **Filtrar área de mini apps**: Com base na sua seleção, oculta automaticamente os mini apps que você não pode acessar
* **Quantidade de cache de mini apps**: Se o número de mini apps abertos simultaneamente exceder este valor, alguns mini apps entrarão em estado inativo

### Adicionar e Gerenciar

Os mini apps do Cherry Studio suportam as seguintes operações:

* **Adicionar ao Launchpad**: Adicione mini apps frequentes ao Launchpad para abrir rapidamente pela entrada `+`. Gerencie em 【Configurações】→【Mini Apps】 ou clique com o botão direito no ícone do mini app e selecione **Adicionar ao Launchpad**
* **Adicionar à barra lateral**: Fixe mini apps frequentes na barra lateral esquerda para acesso com um clique; clique com o botão direito no ícone do mini app para selecionar **Adicionar à barra lateral** ou **Remover da barra lateral**
* **Manter ativo (Keep Alive)**: Impede que a janela do mini app seja destruída imediatamente ao alternar, evitando a necessidade de fazer login novamente ou recarregar ao voltar
* **Adicionar site**: Clique em `+` no canto superior direito da página, preencha nome, URL e Logo em 【Site】 para adicioná-lo à grade
* **Instalar mini app local**: Clique em `+` no canto superior direito da página, alterne para 【Mini app local】, selecione o pacote `.miniapp` ou preencha a URL de instalação fornecida pelo desenvolvedor. Confirme as permissões para concluir a instalação
* **Ver detalhes do mini app local**: Clique com o botão direito no mini app local, selecione 【Ver detalhes】 para gerenciar permissões, modelos de IA, armazenamento, logs de atividades e atualizações
* **Excluir / Editar**: Mini apps do tipo site podem ser editados ou excluídos com o botão direito; mini apps locais podem ser desinstalados em 【Ver detalhes】

Após abrir um mini app, sua janela possui uma barra de ferramentas integrada: **Voltar**, **Avançar**, **Atualizar**, **Abrir no navegador**. Você também pode alternar se os links internos da página devem ser abertos na janela padrão ou no navegador do sistema.

<figure><img src="../../../../../assets/efa6c8dd5b1bb7b7cd417561.webp" alt=""><figcaption><p>Barra de ferramentas da janela do mini app: Voltar / Avançar / Atualizar à esquerda, Abrir no navegador, Adicionar ao Launchpad, Método de abertura de links internos à direita</p></figcaption></figure>

### Dicas e truques

* Mini apps do tipo site usam a versão web do serviço; estado de login, Cookies e configurações são salvos localmente e isolados do navegador do sistema
* Mini apps locais são executados em um sandbox independente e não podem ler arquivos de outros mini apps ou do computador; apenas as capacidades que você autorizou podem ser chamadas
* Se um mini app falhar ao carregar, clique com o botão direito → Atualizar, ou verifique as configurações de proxy (consulte [Configurações gerais](../../../pre-basic/settings/general.md))

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Mini apps generativos</strong></td><td>Crie, instale e gerencie mini apps personalizados que podem chamar o Cherry AI</td><td><a href="generative-mini-apps.md">generative-mini-apps.md</a></td></tr></tbody></table>

Em caso de problemas, envie seu feedback em [Feedback e sugestões](../../../question-contact/suggestions.md).

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, bugs ou sugestões de melhorias de funcionalidade durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e sugestões](../../../question-contact/suggestions.md).
