---
description: cherry studio使用「火山引擎」接入deepseekR1联网功能，喂饭教程。
hidden: True
icon: globe-pointer
---

{% hint style="warning" %}
Este documento foi traduzido do chinês por IA e ainda não foi revisado.
{% endhint %}

# Integração do Volcano Engine com Acesso à Internet

### 1. Acessar/Registrar uma conta do «Volcano Engine» <a href="#rclz7" id="rclz7"></a>

Visite o site oficial: [https://www.volcengine.com/](https://www.volcengine.com/)

<figure><img src="../../../assets/98bfb5c300d7cd815aedf4c7.webp" alt=""><figcaption><p>Site oficial do Volcano Engine</p></figcaption></figure>

### 2. Criar «Meu Aplicativo» com acesso à internet <a href="#gvzaa" id="gvzaa"></a>

2.1. Faça login no Volcano Engine e acesse a página «Volcano Ark»: [https://console.volcengine.com/ark](https://console.volcengine.com/ark)

2.2. **Clique sequencialmente em:** <mark style="color:red;">**«Meus Aplicativos» → «Criar Aplicativo» → «Sem Código» → «Bate-papo Individual»**</mark>

<figure><img src="../../../assets/ee60f999a4dccbbdce8881e5.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/fec0d788d8d23f729247d79d.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/9e4bb430ed758a3ffe559a59.webp" alt=""><figcaption></figcaption></figure>

### 3. Preencher informações e publicar o aplicativo <a href="#zzdfe" id="zzdfe"></a>

**Nome do aplicativo**: Escolha qualquer nome conforme exigido. (Campos com <mark style="color:red;">**\* são obrigatórios**</mark>, outros são opcionais)

<mark style="color:red;">**Chave: Ative o plugin de internet (requer ativação prévia)**</mark>

<figure><img src="../../../assets/5235ef3b0757059a7fd00447.webp" alt=""><figcaption></figcaption></figure>

#### 3.1. Ativar o recurso de plugin de internet (observe custos e uso gratuito) <a href="#mwn38" id="mwn38"></a>

<figure><img src="../../../assets/c4170cccee5de8c993b0b586.webp" alt=""><figcaption><p>Clique em "Comprar Agora" e siga até ver esta tela, indicando ativação bem-sucedida.</p></figcaption></figure>

<figure><img src="../../../assets/2d729a056d0bd71aa627b48a.webp" alt=""><figcaption><p>Verifique o status: ativação concluída</p></figcaption></figure>

Retorne à tela «Preencher Informações do Aplicativo» e continue.

<figure><img src="../../../assets/47360c539ee128f39b86020c.webp" alt=""><figcaption></figcaption></figure>

#### 3.2. Configurações avançadas de «Busca na Internet» <a href="#sp6uz" id="sp6uz"></a>

Escolha conforme sua necessidade:

* Para controle preciso de entrada/saída: use **«Chamada Personalizada»**;
* Para simplicidade: **«Chamada Automática»** (padrão);
* Se prioriza atualização em tempo real: **«Forçar Ativação»**.

<figure><img src="../../../assets/e886e47fc99c10deaf5e80e3.webp" alt=""><figcaption></figcaption></figure>

#### 3.3. Publicar o aplicativo <a href="#fe1gf" id="fe1gf"></a>

Clique em **«Publicar»** no canto superior direito para finalizar.

<figure><img src="../../../assets/09b6fa788839c08e605d9128.webp" alt=""><figcaption></figcaption></figure>

### 4. Obter a API Key <a href="#jtqlu" id="jtqlu"></a>

Siga: **«Guia de Chamada de API» → «Selecionar e copiar API Key» → «Ver e Selecionar»**

Copie a API Key e cole-a posteriormente no cherry studio (veja detalhes abaixo).

<figure><img src="../../../assets/8322870a4161de7ff5d860f5.webp" alt=""><figcaption></figcaption></figure>

**Nota**: Sem API Key? Clique em **«Criar API Key»** no canto superior direito do pop-up.

<figure><img src="../../../assets/9100d8ab913d8976f53cd0c7.webp" alt=""><figcaption></figcaption></figure>

### 5. Usar a API Key no cherry studio para acesso à internet com deepseek-R1 <a href="#lrefj" id="lrefj"></a>

#### 5.1. Acesse cherry studio → «Configurações» → «Nome qualquer» → «Tipo: OpenAI» <a href="#dvrbv" id="dvrbv"></a>

<figure><img src="../../../assets/6b84bd9cf3e91737c3b3a7a3.webp" alt="" width="375"><figcaption></figcaption></figure>

<figure><img src="../../../assets/dacbd055825146aa4031a7e7.webp" alt="" width="375"><figcaption></figcaption></figure>

#### 5.2. Configurar URL e Key <a href="#mt8y0" id="mt8y0"></a>

<figure><img src="../../../assets/d85bb2796ec18d77b27164e3.webp" alt=""><figcaption></figcaption></figure>

<mark style="color:purple;">Dica: Se o endereço não for encontrado ou não for do nó de Pequim, verifique aqui (não esqueça "/"):</mark>

<figure><img src="../../../assets/ef3bcae1b0f5e786077b2373.webp" alt=""><figcaption></figcaption></figure>

#### 5.3. Adicionar nome do modelo <a href="#qmh3i" id="qmh3i"></a>

**Copie o nome do modelo indicado em texto pequeno**, caso contrário ocorrerá erro.

<figure><img src="../../../assets/53b0e97b6a0b9680e673974e.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/7a43cd735df850805b24394c.webp" alt=""><figcaption></figcaption></figure>

### 6. Visualização do resultado <a href="#peb2p" id="peb2p"></a>

<figure><img src="../../../assets/769e08e7462e840976de738b.webp" alt=""><figcaption></figcaption></figure>