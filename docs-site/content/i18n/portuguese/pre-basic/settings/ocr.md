---
icon: scanner-image
---
# OCR

OCR (Reconhecimento Óptico de Caracteres) é responsável por **converter o texto em imagens em texto copiável e legível por IA**. As seguintes tarefas dependem dele:

* Arrastar uma captura de tela / documento digitalizado para a caixa de diálogo e querer que a IA leia o texto dentro dela
* Adicionar faturas ou materiais em formato de imagem ao [Base de Conhecimento](../../knowledge-base/knowledge-base.md), com a expectativa de poder pesquisá-los no futuro
* Um [Agente](../../advanced-basic/agent.md) abrindo uma imagem local para análise

O OCR é uma página de configurações independente. Você configura o mecanismo de reconhecimento uma vez em [Configurações] → [OCR], e todos os locais que usam reconhecimento de texto em imagens utilizarão a mesma configuração.

<figure><img src="../../../../assets/31140d519a5957ff8945fd3a.webp" alt=""><figcaption><p>Configurações de OCR: ① Selecione o mecanismo de reconhecimento no menu suspenso no canto superior direito (a imagem mostra Mistral), insira a chave de API e o endereço de API do mecanismo selecionado abaixo</p></figcaption></figure>

### Selecionar o mecanismo de reconhecimento

O menu suspenso no canto superior direito do painel é usado para alternar entre mecanismos de OCR, **o mecanismo selecionado se torna o padrão**. Mecanismos integrados:

| Mecanismo | Método de conexão / execução | Para quem é adequado |
| --- | --- | --- |
| **System OCR** | Offline, sem configuração | Usa o reconhecimento nativo do sistema (macOS Live Text / Windows OCR), pronto para uso e mais rápido |
| **PaddleOCR** | Preencha a chave de API ([Comunidade Paddle Star](https://aistudio.baidu.com/paddleocr/)); se for auto-hospedado, aponte o endereço de API para o seu serviço. Modelo de análise opcional | Para quem não quer usar recursos locais, mas deseja a qualidade de reconhecimento do Paddle |
| **PaddleOCR Local** | Offline, requer download prévio do modelo de OCR local em [Configurações] → [Modelos Locais] (aprox. 140MB) | Bom reconhecimento de chinês e execução totalmente local, priorizando privacidade |
| **Tesseract OCR** | Offline, integrado | OCR open source clássico, suporta múltiplos idiomas, pode ser usado como alternativa |
| **Mistral** | Chave de API Mistral | Usa um modelo de linguagem multimodal para reconhecimento, mais inteligente para layouts complexos / manuscritos |
| **Intel OV OCR** | Execução local (Intel OpenVINO, aceleração NPU) | **Aparece apenas em Windows + Intel Core Ultra (com NPU) e com o modelo OV implantado**, não visível em outros dispositivos |

{% hint style="success" %}
Não sabe qual escolher? Comece com **System OCR** — a maioria das capturas de tela e documentos digitalizados claros podem ser processados diretamente, sem nenhuma configuração. Se o resultado do reconhecimento não for satisfatório, troque para PaddleOCR Local ou Mistral.
{% endhint %}

Quando System OCR é selecionado, o painel exibe <mark style="color:green;">Mecanismo macOS Live Text / Windows OCR detectado como disponível</mark> (se o sistema não for suportado, essa opção não aparecerá no menu suspenso).

{% hint style="warning" %}
* Antes de selecionar "PaddleOCR Local", baixe o "Modelo de OCR Local" em [Configurações] → [Modelos Locais], caso contrário, não será possível chamá-lo.
* **Tesseract** (e System OCR no Windows) permite selecionar os idiomas a serem reconhecidos no menu suspenso "Idioma" do painel.
{% endhint %}

### Diferença em relação ao processamento de documentos

Muitas pessoas confundem OCR com [Processamento de Documentos](doc-process.md). A distinção em uma frase:

* **OCR**: Gerencia o reconhecimento de texto em **imagens / documentos digitalizados** (imagem → texto).
* **Processamento de Documentos**: Gerencia a análise estruturada de **PDFs / documentos com layout complexo** (PDFs com tabelas, múltiplas colunas → texto organizado).

Os dois são independentes e têm configurações separadas. Parágrafos de texto em PDFs de texto puro, `.md`/`.txt`/`.docx` não passam por nenhum dos dois e podem ser lidos diretamente.

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, bugs ou sugestões de melhoria de funcionalidades durante a configuração ou uso, consulte os canais oficiais fornecidos em [Feedback e Sugestões](../../question-contact/suggestions.md).
