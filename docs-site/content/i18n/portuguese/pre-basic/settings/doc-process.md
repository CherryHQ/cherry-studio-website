---
icon: file-code
---
# Processamento de Documentos

Em resumo: **esta é a configuração central do Cherry Studio para ler "PDFs / documentos com layout complexo" e convertê-los em texto estruturado.**

PDFs com tabelas, múltiplas colunas ou páginas digitalizadas (artigos acadêmicos, contratos, relatórios de pesquisa, etc.) geralmente são lidos de forma desorganizada se enviados diretamente ao modelo. O processamento de documentos usa primeiro um motor de análise especializado para convertê-los em texto com estrutura clara, antes de enviá-los para a conversa ou para o [Base de Conhecimento](../../knowledge-base/knowledge-base.md).

{% hint style="info" %}
**Processamento de Documentos vs OCR**: são duas páginas de configuração separadas.

* **Processamento de Documentos** (esta página): gerencia a análise estruturada de **PDFs / documentos com layout complexo**.
* **[OCR](ocr.md)**: gerencia o reconhecimento de texto em **imagens / documentos digitalizados**.

Para PDFs de texto puro simples, `.md`/`.txt`/`.docx`, nenhum dos dois é necessário; basta ler diretamente.
{% endhint %}

### Ponto de Acesso à Configuração

Abra [Configurações] → [Processamento de Documentos] e selecione o motor de análise no menu suspenso no canto superior direito. **O motor selecionado se torna o padrão**.

<figure><img src="../../../../assets/dbc7765b46b45fec4b345e04.webp" alt=""><figcaption><p>Configurações de Processamento de Documentos: ① Selecione o motor de análise no menu suspenso no canto superior direito (padrão MinerU); abaixo, insira a chave de API e o endereço de API do motor selecionado</p></figcaption></figure>

### Motores de Análise Integrados

O processamento de documentos possui 5 motores integrados, com **MinerU** como padrão:

| Motor | Descrição | Método de Conexão |
| --- | --- | --- |
| **MinerU** (padrão) | Ferramenta open source de alta qualidade para extração de PDF da OpenDataLab | Chave de API ([mineru.net/apiManage](https://mineru.net/apiManage)) |
| **PaddleOCR** | Sistema de reconhecimento OCR do PaddlePaddle (Baidu) | Insira a chave de API ([Comunidade PaddlePaddle](https://aistudio.baidu.com/paddleocr/)); se for auto-hospedado, aponte o endereço de API para o seu serviço |
| **Doc2x** | Motor avançado de restauração de arquivos | Chave de API ([open.noedgeai.com](https://open.noedgeai.com/apiKeys)) |
| **Mistral** | Serviço de análise e compreensão de arquivos | Chave de API ([mistral.ai](https://mistral.ai/api-keys)) |
| **Open MinerU** | Serviço MinerU que pode ser auto-hospedado, ideal para equipes que desejam controlar o fluxo de processamento | Após o auto-hospedamento, insira o endereço de API (insira a chave de API conforme necessário) |

### Configurar MinerU (Solução Padrão)

{% stepper %}
{% step %}
### Inserir a Chave de API

No campo [Chave de API], insira a chave obtida do MinerU (clique em "Obter Chave" à direita para ir à página de solicitação; múltiplas chaves podem ser separadas por vírgulas).
{% endstep %}

{% step %}
### Confirmar o Endereço de API

Mantenha o [Endereço de API] no valor padrão.
{% endstep %}

{% step %}
### Usar Diretamente na Base de Conhecimento / Conversa

Ao importar PDFs complexos, as configurações de análise deste local serão aplicadas automaticamente. Não é necessária configuração adicional ao alternar para a Base de Conhecimento ou para a conversa.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
**Usar Outro Motor**: selecione-o no menu suspenso e insira a [Chave de API] / [Endereço de API] correspondente. A seleção o torna o padrão. **PaddleOCR** e **Open MinerU** suportam auto-hospedagem — após a implantação, insira o endereço do seu próprio serviço no campo [Endereço de API].
{% endhint %}

### Relação com a Base de Conhecimento

* O processamento de documentos é responsável apenas pela etapa "documento complexo → texto estruturado";
* O texto convertido continua para a vetorização pelo [Modelo de Incorporação](../../knowledge-base/emb-models-info.md) e para o armazenamento na base;
* Para o fluxo detalhado de "Ativar na Base de Conhecimento", consulte [Pré-processamento de Documentos na Base de Conhecimento](../../knowledge-base/document-preprocessing.md).

### Dicas e Sugestões

* O MinerU apresenta resultados significativamente melhores para PDFs com tabelas / layout de múltiplas colunas; é a primeira escolha para artigos acadêmicos, etc.;
* Se o objetivo for reconhecer **texto em imagens** (capturas de tela, digitalizações) e não a estrutura do PDF, use [OCR](ocr.md).

***

### Obter Ajuda e Enviar Feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e Sugestões](../../question-contact/suggestions.md).
