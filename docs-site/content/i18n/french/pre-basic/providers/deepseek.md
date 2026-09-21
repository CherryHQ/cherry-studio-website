# DeepSeek

DeepSeek est l'un des principaux fournisseurs de grands modèles en Chine. Ses séries V3 / R1 sont réputées pour leurs performances en programmation et en raisonnement, tout en offrant des tarifs abordables.

## Obtenir une clé API

* Inscrivez-vous sur la [plateforme DeepSeek](https://platform.deepseek.com/)
* Allez dans `API Keys` → `Créer une clé API` et copiez la clé `sk-...`
* Effectuez un dépôt de fonds (un minimum de 1 ¥ suffit pour activer le service)

## Configuration dans Cherry Studio

* Ouvrez `Paramètres → Services de modèles`, trouvez le fournisseur **deepseek** et accédez à sa page de détails
* Saisissez votre **clé API** dans `sk-...`
* L'**adresse API** est par défaut `https://api.deepseek.com`, aucune modification n'est nécessaire
* Cliquez sur **Obtenir la liste des modèles**

## Utilisation recommandée

| Modèle | Cas d'usage approprié |
| ------------------- | ---------------------------------- |
| `deepseek-chat` | Conversations générales, excellent rapport qualité-prix |
| `deepseek-reasoner` | Mathématiques, code, raisonnement complexe. Notez que la sortie inclut un bloc de réflexion `<thinking>` |

## Recherche web native

Les modèles DeepSeek prenant en charge la recherche web peuvent utiliser directement la recherche web native du fournisseur. Lors de la sélection d'un modèle, vérifiez la présence de l'icône 🌐 à côté du nom ; la plage de prise en charge peut évoluer avec les mises à jour du fournisseur, il est donc déconseillé de se baser uniquement sur le nom du modèle.

Une fois l'icône 🌐 activée dans la conversation, si l'option 【Utiliser en priorité le service de recherche configuré】 dans 【Paramètres】→【Recherche web】 reste activée, Cherry Studio privilégiera le service de recherche configuré. Si vous désactivez cette option, la recherche web native du modèle sera alors privilégiée. Consultez le mode Recherche web pour plus de détails.

## Association avec la mémoire globale

DeepSeek ne propose pas de modèle d'embedding. Si vous souhaitez utiliser une base de connaissances :

* Il est recommandé d'utiliser un modèle d'embedding d'un autre fournisseur (par exemple `bge-m3` de [SiliconFlow](siliconcloud.md) ou `text-embedding-3-small` de [OpenAI](openai.md))
* Vous pouvez continuer à utiliser DeepSeek comme modèle de conversation

{% hint style="info" %}
- Les tarifs de DeepSeek sont calculés par jeton ; les correspondances de cache peuvent réduire significativement les coûts (consultez la documentation officielle)
- Le contenu de réflexion de `deepseek-reasoner` est affiché par défaut dans la conversation ; vous pouvez activer le « repliement automatique du contenu de réflexion » dans [Paramètres de conversation](../../cherrystudio/preview/chat.md#dui-hua-she-zhi)
{% endhint %}

***

### Obtenir de l'aide et envoyer des retours

Si vous rencontrez des questions, des bugs ou avez des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
