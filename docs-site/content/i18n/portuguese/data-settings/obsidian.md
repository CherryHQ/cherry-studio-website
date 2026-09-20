---
description: 数据设置→Obsidian配置
icon: gem
---

{% hint style="warning" %}
Este documento foi traduzido do chinês por IA e ainda não foi revisado.
{% endhint %}

# Tutorial de Configuração do Obsidian

Cherry Studio suporta integração com o Obsidian para exportar conversas completas ou individuais para a sua biblioteca do Obsidian.

{% hint style="warning" %}
Este processo não requer instalação de plugins adicionais do Obsidian. No entanto, como o mecanismo de importação do Cherry Studio é semelhante ao Obsidian Web Clipper, recomenda-se atualizar o Obsidian para a versão mais recente (atual versão mínima: **1.7.2**) para evitar [falhas na importação de conversas extensas](https://github.com/obsidianmd/obsidian-clipper/releases/tag/0.7.0).
{% endhint %}

## Tutorial Atualizado

{% hint style="info" %}
Comparado à versão antiga, a nova funcionalidade de exportação para o Obsidian seleciona automaticamente o caminho da biblioteca, eliminando a necessidade de inserir manualmente nomes de bibliotecas ou pastas.
{% endhint %}

### Passo 1: Configurar o Cherry Studio

Abra _Configurações_ → _Configurações de Dados_ → Menu _Configuração do Obsidian_ no Cherry Studio. Os nomes das bibliotecas do Obsidian abertas localmente aparecerão automaticamente na lista suspensa. Selecione sua biblioteca alvo:

<figure><img src="../../../assets/449d1a8ce3c2bcc5f7e7158f.webp" alt=""><figcaption></figcaption></figure>

### Passo 2: Exportar Conversas

#### Exportar Conversa Completa

Retorne à interface de conversa do Cherry Studio. Clique com o botão direito na conversa, selecione _Exportar_ e clique em _Exportar para Obsidian_:

<figure><img src="../../../assets/ceedc9e8d1dabc9d39035c30.webp" alt=""><figcaption></figcaption></figure>

Uma janela será aberta para ajustar as **Propriedades** da nota, o **local da pasta** no Obsidian e o **método de processamento**:

* **Biblioteca**: Selecione outra biblioteca do menu suspenso
* **Caminho**: Selecione a pasta de destino para a nota exportada
* Propriedades da nota do Obsidian:
  * Tags
  * Data de criação (created)
  * Origem (source)
* **Métodos de processamento** disponíveis:
  * **Novo (substituir se existir)**: Cria uma nova nota na pasta especificada, substituindo notas existentes com mesmo nome
  * **Prepend**: Adiciona o conteúdo ao início de uma nota existente com mesmo nome
  * **Anexar**: Adiciona o conteúdo ao final de uma nota existente com mesmo nome

{% hint style="info" %}
Apenas o primeiro método inclui Propriedades. Os outros dois métodos não incluem Propriedades.
{% endhint %}

<figure><img src="../../../assets/f0b3dbe0fb29172b330958e5.webp" alt=""><figcaption><p>Configurar propriedades da nota</p></figcaption></figure>

<figure><img src="../../../assets/cb66a0409ef6e24286102647.webp" alt=""><figcaption><p>Selecionar caminho</p></figcaption></figure>

<figure><img src="../../../assets/15f4032a3a159c08df6cf1b3.webp" alt=""><figcaption><p>Escolher método de processamento</p></figcaption></figure>

Após selecionar todas as opções, clique em OK para exportar a conversa completa.

#### Exportar Mensagem Individual

Clique no _menu de três linhas_ abaixo da mensagem, selecione _Exportar_ e clique em _Exportar para Obsidian_:

<figure><img src="../../../assets/6851b3aa7d82a4a919e2e8b0.webp" alt=""><figcaption><p>Exportar mensagem individual</p></figcaption></figure>

A mesma janela de configuração de propriedades e métodos de processamento será exibida. Siga os mesmos passos do [tutorial acima](obsidian.md#dao-chu-wan-zheng-dui-hua).

### Exportação Concluída

🎉 Parabéns! Você concluiu toda a configuração de integração do Cherry Studio com o Obsidian. Aproveite!

<figure><img src="../../../assets/6fce517b2e745598598db14c.webp" alt=""><figcaption><p>Exportado para o Obsidian</p></figcaption></figure>

<figure><img src="../../../assets/0ea57dab41aa40f6e0298917.webp" alt=""><figcaption><p>Verificar resultado</p></figcaption></figure>

***

## Tutorial Antigo (para Cherry Studio <v1.1.13)

### Passo 1: Preparar o Obsidian

Abra sua biblioteca do Obsidian e crie uma `pasta` para salvar as conversas exportadas (exemplo: pasta "Cherry Studio"):

<figure><img src="../../../assets/a492ac55a35d0e0afc9e33a9.webp" alt=""><figcaption></figcaption></figure>

Anote o nome da `Biblioteca` destacado no canto inferior esquerdo.

### Passo 2: Configurar o Cherry Studio

Em _Configurações_ → _Configurações de Dados_ → Menu _Configuração do Obsidian_ do Cherry Studio, insira o nome da `Biblioteca` e da `Pasta` obtidos no [Passo 1](obsidian.md#di-yi-bu):

<figure><img src="../../../assets/e7da08d7e70d410c2ae09fee.webp" alt=""><figcaption></figcaption></figure>

O campo `Tags globais` é opcional para definir tags padrão em todas as notas exportadas.

### Passo 3: Exportar Conversas

#### Exportar Conversa Completa

Clique com o botão direito na conversa, selecione _Exportar_ e clique em _Exportar para Obsidian_:

<figure><img src="../../../assets/c8b256177ded017f9beaf29c.webp" alt=""><figcaption><p>Exportar conversa completa</p></figcaption></figure>

Configure as **Propriedades** da nota e escolha um **método de processamento**:
* **Novo (substituir se existir)**
* **Prepend**
* **Anexar**

<figure><img src="../../../assets/23b06f100f14cffe09a12878.webp" alt=""><figcaption><p>Configurar propriedades da nota</p></figcaption></figure>

{% hint style="info" %}
Apenas o primeiro método inclui Propriedades.
{% endhint %}

#### Exportar Mensagem Individual

Clique no _menu de três linhas_ abaixo da mensagem e selecione _Exportar para Obsidian_:

<figure><img src="../../../assets/53a5477e29c3e58af139fe15.webp" alt=""><figcaption><p>Exportar mensagem individual</p></figcaption></figure>

Siga os mesmos passos do [tutorial acima](obsidian.md#dao-chu-wan-zheng-dui-hua).

### Exportação Concluída

🎉 Parabéns! Você concluiu toda a configuração de integração. Aproveite!

<figure><img src="../../../assets/6fce517b2e745598598db14c.webp" alt=""><figcaption><p>Exportado para o Obsidian</p></figcaption></figure>

<figure><img src="../../../assets/0ea57dab41aa40f6e0298917.webp" alt=""><figcaption><p>Verificar resultado</p></figcaption></figure>