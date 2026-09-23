---
icon: microchip
---
# Modelos locais

Os modelos locais são pequenos modelos integrados ao Cherry Studio, **prontos para uso offline após o download**: não utilizam a API de nenhum provedor e não exigem a inserção de uma API Key. Eles têm tamanho reduzido, rodam no seu próprio computador e são destinados a cobrir capacidades básicas que "não valem a pena configurar um modelo em nuvem separado".

Abra `Configurações → Modelos locais` para gerenciá-los:

<figure><img src="../../../../assets/3ef4a2e692da5a39fccf7406.webp" alt=""><figcaption><p>Modelos locais: ① Dois modelos locais integrados — Modelo de incorporação local + Modelo de OCR local (ambos exibem "Pronto" na imagem; clique no ícone de exclusão à direita para removê-los)</p></figcaption></figure>

Atualmente, há duas categorias de modelos locais integrados:

| Modelo local | Base | Tamanho | Uso |
| ------------- | -------------------- | -------- | --------------------------------------------------------------- |
| **Modelo de incorporação local** | Qwen3 Embedding 0.6B | Aprox. 614 MB | Converte texto em vetores, usado em cenários de [base de conhecimento](../../knowledge-base/knowledge-base.md) como busca e recuperação |
| **Modelo de OCR local** | PaddleOCR PP-OCRv6 | Aprox. 140 MB | Reconhecimento offline de texto em imagens / documentos digitalizados, chamado pela função [OCR](ocr.md) |

### Download e status

* Ao lado do nome do modelo, um selo de status é exibido: nos cartões não baixados, há um botão de largura total "**Baixar**" na **parte inferior**; clique para iniciar o download. Após a conclusão, o selo muda para **Pronto**.
* Modelos prontos podem ser removidos clicando no ícone de **exclusão** à direita, liberando espaço em disco; podem ser baixados novamente quando necessário. (Se o modelo de incorporação ainda estiver em uso pela base de conhecimento, a exclusão será negada e os pesos serão mantidos.)
* Em algumas plataformas / arquiteturas que não suportam inferência local, o painel exibirá "**A plataforma atual não suporta modelos locais**", e o download não estará disponível.

Durante o download, se um espelho não estiver disponível, o Cherry Studio tentará automaticamente outras fontes de download. Após a conclusão, o processo de inferência do modelo de incorporação local é executado localmente, sem necessidade de conexão à internet.

{% hint style="warning" %}
Se a página exibir a mensagem [Arquivo de modelo incompleto, baixe novamente para reparar.], isso indica que arquivos necessários estão ausentes no cache local. Exclua ou baixe novamente o modelo para corrigir; não tente juntar manualmente os arquivos do modelo.
{% endhint %}

{% hint style="info" %}
Os modelos locais são **opcionais**. Se você já configurou um modelo de incorporação em nuvem nos [Serviços de modelo](providers.md) ou se o OCR nativo do sistema atende às suas necessidades, pode não baixá-los.
{% endhint %}

### Quando usar modelos locais

* **Sem modelo de incorporação em nuvem / não deseja pagar separadamente pela base de conhecimento**: baixe o modelo de incorporação local para que a base de conhecimento possa indexar e buscar totalmente offline.
* **Necessidade de OCR offline**: em cenários sem internet ou onde não se deseja enviar imagens a terceiros, baixe o modelo de OCR local e selecione "PaddleOCR local" nas [Configurações de OCR](ocr.md).
* **Privacidade em primeiro lugar**: todos os cálculos são realizados localmente; o conteúdo não sai do seu computador.

{% hint style="warning" %}
Os modelos locais são uma solução leve "suficiente para o básico". Se você exige alta precisão na busca ou na taxa de reconhecimento, os [modelos de incorporação](../../knowledge-base/emb-models-info.md) em nuvem e serviços de OCR mais robustos geralmente oferecem melhor desempenho.
{% endhint %}

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidade durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e sugestões](../../question-contact/suggestions.md).
