---
icon: bridge
---
# Gateway de API

O Gateway de API expõe as capacidades dos modelos configurados no Cherry Studio para programas locais por meio de APIs HTTP compatíveis com OpenAI e Anthropic. Ele também é o serviço interno necessário para a execução do Agent.

Caminho: 【Configurações】→【Gateway de API】.

<figure><img src="../../../../assets/69025f11c87bd83f70af4a07.webp" alt="Antes de conectar programas externos, verifique o status e a porta; forneça a chave apenas para programas locais confiáveis ou redes controladas."><figcaption><p>Antes de conectar programas externos, verifique o status e a porta; forneça a chave apenas para programas locais confiáveis ou redes controladas. </p></figcaption></figure>

## Diferenciar o uso do Agent de chamadas externas

* Usar apenas o Agent do Cherry Studio: siga o prompt do aplicativo para 【Ativar e Iniciar】, sem necessidade de copiar a URL ou a chave para outros programas;
* Programas locais precisam chamar o Cherry Studio: inicie o gateway, copie a URL e a chave de API e selecione a interface compatível conforme a documentação da API;
* Permitir acesso de outros dispositivos: isso amplia o escopo de exposição, exigindo verificação própria do escuta de rede, firewall e controle de acesso; não é recomendado abrir sem medidas de segurança.

## Inicialização e conexão

{% stepper %}
{% step %}
### 1. Verificar a porta

Quando o gateway está parado, a porta pode ser modificada. Selecione uma porta não ocupada por outros programas; em caso de conflito de porta, o serviço não consegue iniciar corretamente.
{% endstep %}

{% step %}
### 2. Iniciar o gateway

Clique em 【Iniciar】. Após o status mudar para 【Em execução】, a página exibirá a URL disponível e fornecerá a entrada para a 【Documentação da API】.
{% endstep %}

{% step %}
### 3. Configurar a autorização

Programas externos usam `Authorization: Bearer <chave API>`. A página permite copiar diretamente o cabeçalho de autorização; não insira a chave em repositórios de código ou capturas de tela.
{% endstep %}

{% step %}
### 4. Validar com uma solicitação mínima

Primeiro, solicite a lista de modelos ou envie um texto curto conforme a documentação da API, antes de integrar o aplicativo completo. Em caso de erro, registre o status HTTP e a resposta, sem expor o cabeçalho de autorização completo.
{% endstep %}
{% endstepper %}

## Cenário de uso: permitir que scripts locais chamem modelos

Primeiro, confirme em 【Configurações】→【Serviços de Modelos】 que o modelo conversa normalmente, e depois inicie o Gateway de API. O script deve armazenar apenas o endereço local do gateway e a chave, solicitando primeiro a lista de modelos e, em seguida, enviando um texto curto. Antes de integrar o programa completo, confirme que o cliente suporta interfaces compatíveis com OpenAI ou Anthropic.

| Configuração | Ponto de partida sugerido | Função | Observações |
| ------ | ---------- | --------- | ----------------- |
| Escopo de escuta | Apenas uso local | Reduz a exposição de rede | Não abra diretamente para a LAN ou internet apenas para facilitar a depuração |
| Chave de API | Gerenciada separadamente para o gateway atual | Valida solicitações do cliente | Não insira em repositórios, capturas de tela ou logs compartilhados |
| Solicitação de validação | Primeiro verifique a lista de modelos e texto curto | Valida conexão e geração separadamente | Em caso de falha, registre o código de status, sem registrar a chave completa |

### Critérios de conclusão

O gateway exibe 【Em execução】; a lista de modelos é legível; a solicitação de texto curto é bem-sucedida; após parar o gateway, o cliente não consegue continuar chamando.

## Operações de segurança

{% hint style="danger" %}
A chave de API pode chamar os serviços de modelos configurados no Cherry Studio. Em caso de vazamento da chave, primeiro pare o gateway, clique em 【Regenerar】 com o gateway parado e, em seguida, atualize todos os clientes locais.
{% endhint %}

* Quando o gateway está em execução, a porta e a chave permanecem somente leitura; pare antes de modificar;
* Não exiba a chave em repositórios públicos, Issues, logs ou capturas de tela de tutoriais;
* Armazene a chave apenas nos programas que precisam chamá-la;
* O uso e os custos ainda são gerados pelo provedor de modelos real; os registros do Cherry Studio podem ser vistos em 【Configurações】→【Estatísticas de Uso】.

<details>

<summary>Qual é a relação entre o Gateway de API e os Serviços de Modelos? </summary>

Os Serviços de Modelos armazenam as conexões com os provedores upstream; o Gateway de API converte essas capacidades em interfaces compatíveis. O gateway em si não fornece modelos; ainda é necessário pelo menos um provedor e um modelo disponíveis.

</details>

<details>

<summary>O que fazer se a porta estiver normal, mas o cliente retornar não autorizado? </summary>

Confirme que o cabeçalho da solicitação é `Authorization: Bearer ...`, sem aspas ou espaços extras, e verifique se a chave usada pelo cliente ainda é o valor atual da página.

</details>
