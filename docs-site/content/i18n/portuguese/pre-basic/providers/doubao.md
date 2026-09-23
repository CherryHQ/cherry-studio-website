

# ByteDance (Doubao)

* Faça login no [Volcano Engine](https://console.volcengine.com/)
* Clique diretamente [aqui para acessar](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D)

<figure><img src="../../../../assets/748f7813cf1fde645a968c13.webp" alt=""><figcaption></figcaption></figure>

### Obter chave API

* Clique em [Gerenciamento de Chave API](https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey) na barra lateral inferior
* Crie uma Chave API

<figure><img src="../../../../assets/565501695d6ec77af56b0d94.webp" alt=""><figcaption></figcaption></figure>

* Após criar com sucesso, clique no ícone de olho 👁️ ao lado da Chave API e copie

<figure><img src="../../../../assets/abead8dd3efc80aa8dfe9b88.webp" alt=""><figcaption></figcaption></figure>

* Cole a Chave API copiada no CherryStudio e ative o interruptor do provedor.

<figure><img src="../../../../assets/fec7f5e64d98a659fa27ff9c.webp" alt=""><figcaption></figcaption></figure>

### Ativar e adicionar modelos

* Na barra lateral do Console Ark, acesse [Gerenciamento de Ativação](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D\&OpenTokenDrawer=false) para ativar os modelos necessários. Você pode ativar conforme necessidade os modelos da série Doubao e DeepSeek.

<figure><img src="../../../../assets/b921f99f2e21714c0ef9cafb.webp" alt=""><figcaption></figcaption></figure>

* No [documento da lista de modelos](https://www.volcengine.com/docs/82379/1330310#%E6%96%87%E6%9C%AC%E7%94%9F%E6%88%90), localize o **Model ID** correspondente ao modelo desejado.

<figure><img src="../../../../assets/cba9e28d82aef11147fc01c6.webp" alt="Exemplo de lista de Model IDs do Volcano Engine"><figcaption></figcaption></figure>

* Acesse as configurações de [Serviço de Modelos](../../cherrystudio/preview/settings/providers.md) do Cherry Studio, encontre "Volcano Engine"
* Clique em adicionar e cole o **Model ID** obtido anteriormente na caixa de texto Model ID

<figure><img src="../../../../assets/70c3827ffb29455676fb2fb0.webp" alt=""><figcaption></figcaption></figure>

* Repita este processo para adicionar modelos sequencialmente

### Endereço da API

Existem duas formas de escrever o endereço da API:

* Primeira (padrão do cliente): `https://ark.cn-beijing.volces.com/api/v3/`
* Segunda: `https://ark.cn-beijing.volces.com/api/v3/chat/completions#`

{% hint style="info" %}
Ambas as formas são equivalentes. Mantenha o padrão sem modificações.

Para diferenças entre terminações `/` e `#`, consulte a seção de endereço API nas configurações do provedor. [Clique para acessar](../../cherrystudio/preview/settings/providers.md#api-di-zhi)
{% endhint %}

<figure><img src="../../../../assets/91ce519c471ef98b7840a33e.webp" alt=""><figcaption><p>Exemplo de cURL da documentação oficial</p></figcaption></figure>