---
icon: key-round
---

# Provedores e modelos

O aplicativo móvel chama os modelos por meio dos provedores que você configura. O Cherry Studio fornece a experiência do cliente: ele não intermedeia créditos de modelos nem altera os preços e as políticas de dados do provedor.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/iphone-add-provider.webp"><img src="../../../assets/mobile/iphone-add-provider.webp" alt="Tela de adicionar provedor no Cherry Studio Mobile no iPhone"></a><figcaption><p><strong>iPhone</strong> · Pesquise no catálogo de provedores ou crie um provedor personalizado</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-add-provider.webp"><img src="../../../assets/mobile/ipad-add-provider.webp" alt="Tela de adicionar provedor no Cherry Studio Mobile no iPad"></a><figcaption><p><strong>iPad</strong> · O mesmo catálogo de provedores no layout para tablet</p></figcaption></figure>
</div>

## Adicionar um provedor integrado

1. Abra as configurações do serviço de modelos e selecione **Adicionar provedor**.
2. Pesquise e escolha o provedor.
3. Informe a chave de API e os demais valores exigidos por esse provedor.
4. Busque ou adicione modelos e ative os que pretende usar.

## Usar um provedor personalizado

Para um serviço que implemente um formato de API compatível, escolha **Provedor personalizado** e informe nome, Base URL, chave de API e ID do modelo. A Base URL deve ser o endereço da API indicado na documentação do provedor, e não a URL do painel de controle.

## Escolher um modelo

Abra o seletor de modelos em uma conversa ou em um agente para alternar entre os modelos ativados. Compreensão de imagens, chamada de ferramentas e geração de imagens dependem do provedor e do modelo específico.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/iphone-models.webp"><img src="../../../assets/mobile/iphone-models.webp" alt="Seletor de modelos no Cherry Studio Mobile no iPhone"></a><figcaption><p><strong>iPhone</strong> · Navegue pelos modelos ativados por provedor</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-models.webp"><img src="../../../assets/mobile/ipad-models.webp" alt="Seletor de modelos no Cherry Studio Mobile no iPad"></a><figcaption><p><strong>iPad</strong> · Verifique os recursos do modelo e as informações de contexto</p></figcaption></figure>
</div>

## Erros de conexão comuns

* **401 / não autorizado**: verifique se a chave de API está completa, se não expirou e se a conta tem permissão.
* **404 / modelo não encontrado**: confira a Base URL e o ID do modelo; não use o nome exibido no lugar do ID.
* **429 / requisições em excesso**: aguarde o limite de taxa ser restabelecido e verifique saldo e cotas do provedor.
* **Tempo esgotado ou falha de rede**: confirme que a rede atual alcança o provedor e revise as configurações de proxy.
