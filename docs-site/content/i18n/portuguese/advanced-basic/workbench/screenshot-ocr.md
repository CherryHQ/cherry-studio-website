---
icon: crop
---
# Captura de tela, anotações e OCR

O Cherry Studio permite capturar uma área da tela por meio de atalhos globais, adicionar retângulos, setas, pincel, texto ou mosaico, e copiar ou salvar o resultado. Com o OCR local ativado, você também pode selecionar e copiar diretamente o texto presente na captura.

### Objetivo e pré-requisitos

* Caminho: [Configurações] → [Captura de tela];
* No macOS, é necessário permitir a gravação de tela na primeira utilização; após a autorização, reinicie o aplicativo conforme indicado na página;
* O OCR requer o download do modelo de reconhecimento de texto em [Configurações] → [Modelos locais];
* A função de captura de tela está desativada por padrão, enquanto o reconhecimento automático de texto está ativado por padrão, mas o OCR não será executado se o modelo não estiver pronto.

### Termos

| Termo | Significado |
| ----- | ------------------------------- |
| Atalho global | Atalho que pode ser acionado mesmo quando o foco não está no Cherry Studio |
| OCR | Reconhecimento de texto em imagens, permitindo selecionar e copiar o texto |
| Mosaico | Ocultar contas, caminhos, chaves ou outras áreas sensíveis na captura |

### Caminho de operação

[Configurações] → [Captura de tela] → Ativar [Habilitar captura de tela] → Pressionar o atalho de captura → Selecionar a área → Anotar ou reconhecer texto → Copiar ou salvar.

### Passos de operação

{% stepper %}
{% step %}
#### 1. Habilitar a captura de tela e verificar permissões

Abra [Configurações] → [Captura de tela] e ative [Habilitar captura de tela]. Se o macOS exibir [Permissão de gravação de tela], selecione [Autorizar]; após a conclusão, clique em [Reiniciar agora].
{% endstep %}

{% step %}
#### 2. Configurar atalhos

O atalho padrão é `Command+Shift+A` no macOS e `Ctrl+Shift+A` no Windows e Linux. Clique em [Configurar atalho] para ir à linha correspondente; se o sistema ou outro aplicativo já estiver usando essa combinação, a página exibirá um aviso de conflito.
{% endstep %}

{% step %}
#### 3. Selecionar e anotar

Pressione o atalho e arraste para selecionar a área. Use [Retângulo], [Seta], [Pincel] e [Texto] para destacar pontos importantes, e [Mosaico] para ocultar informações sensíveis; o painel de propriedades permite ajustar cor, espessura da linha e tamanho da fonte.
{% endstep %}

{% step %}
#### 4. Copiar texto ou imagem

Quando o modelo de OCR estiver pronto, a página reconhecerá o texto automaticamente; você também pode clicar em [Reconhecer texto]. Selecione o texto diretamente ou escolha [Copiar todo o texto]; após concluir as anotações, selecione [Copiar e fechar] ou [Salvar imagem].
{% endstep %}
{% endstepper %}

### Resultado esperado

A captura contém apenas a área selecionada; as anotações são claras e as informações sensíveis estão ocultas; após copiar, é possível colar a imagem no aplicativo de destino ou colar o texto do OCR como texto editável.

### Capturas de tela principais

<figure><img src="../../../../assets/461349e8fcf48c13693a40e9.webp" alt="① [Captura de tela] é um atalho global modificável; após a alteração, teste uma vez em uma janela que não seja do Cherry Studio."><figcaption><p>① [Captura de tela] é um atalho global modificável; após a alteração, teste uma vez em uma janela que não seja do Cherry Studio. </p></figcaption></figure>

### Notas de configuração

| Item de configuração | Valor padrão do produto | Ponto de partida sugerido | Função | Cenários aplicáveis | Observações |
| ------ | ---------------------- | ------------- | ----------- | ------------ | -------------- |
| Habilitar captura de tela | Desativado | Ativar quando necessário | Registra o atalho global de captura de tela | Capturas do dia a dia, tutoriais, feedback de problemas | O macOS requer permissão de gravação de tela |
| Atalho de captura de tela | `Command/Ctrl+Shift+A` | Manter o padrão, alterar apenas em caso de conflito | Dispara a captura de qualquer aplicativo | Uso frequente entre aplicativos | Não será acionado se houver conflito com outros aplicativos |
| Reconhecimento automático de texto | Ativado | Manter ativado se você copia frequentemente texto de capturas | Executa OCR automaticamente após a captura | Capturas de erros, tabelas, texto de interface | Requer o download do modelo local de OCR |

<figure><img src="../../../../assets/d417de7a25de7a4aceba3624.webp" alt="Captura de tela, anotações e OCR — Imagem ilustrativa"><figcaption></figcaption></figure>

### Caso de usuário

Um profissional de testes captura uma configuração incorreta, usa um retângulo para marcar a mensagem de erro, aplica mosaico para ocultar a conta e o caminho local, e depois copia para o assistente de feedback de problemas. Em seguida, copia o código de erro da mesma captura e cola nos passos de reprodução, evitando erros de digitação manual.

### Perguntas frequentes

<details>

<summary>O que fazer se o atalho não responder? </summary>

Confirme que [Habilitar captura de tela] está ativado e verifique se há um aviso de conflito ao lado do atalho. No macOS, verifique também a permissão de gravação de tela e reinicie após a autorização; no Windows e Linux, tente usar uma combinação que não esteja em uso pelo sistema.

</details>

<details>

<summary>Por que não consigo copiar o texto? </summary>

Abra [Configurações] → [Modelos locais] e confirme que o status do modelo de OCR é "pronto". Não é possível reconhecer o texto durante o processo de anotação; conclua ou desfaça a anotação atual antes de executar o OCR.

</details>

### Referências

* Feedback de problemas e sugestões de funcionalidades
* Barra de ferramentas de entrada e ferramentas de produtividade
