# LM Studio

LM Studio est une **interface graphique locale pour les grands modèles** populaire, permettant de télécharger, de quantifier et d'inférer divers modèles open source sur votre machine. Cherry Studio peut se connecter au service local de LM Studio en tant que front-end, offrant une meilleure expérience de conversation tout en préservant la confidentialité locale.

## Prérequis

1. Téléchargez et installez le client depuis le [site officiel de LM Studio](https://lmstudio.ai/)
2. Téléchargez au moins un modèle dans LM Studio (il est recommandé d'essayer d'abord Llama 3.x 8B ou la série Qwen)
3. Ouvrez l'onglet **Server** en haut de LM Studio et cliquez sur **Start Server** (port par défaut `1234`)

## Configuration dans Cherry Studio

* Ouvrez `Paramètres → Services de modèles`, trouvez le fournisseur **LM Studio** et accédez à la page de détails
* L'**adresse API** est par défaut `http://localhost:1234` ; si vous avez modifié le port de LM Studio, mettez à jour cette valeur en conséquence
* La **clé API** peut rester vide (l'inférence locale ne nécessite pas d'authentification), ou vous pouvez l'activer dans LM Studio et saisir la clé
* Cliquez sur **Récupérer la liste des modèles**, Cherry Studio récupérera automatiquement les modèles chargés dans LM Studio

{% hint style="info" %}
**La liste des modèles est vide ?** LM Studio n'expose que les modèles **déjà `Load` en mémoire** ; les modèles non chargés n'apparaîtront pas dans la liste. Retournez dans LM Studio, chargez d'abord un modèle, puis cliquez à nouveau sur « Récupérer la liste des modèles ».
{% endhint %}

## Utilisation recommandée

| Scénario | Recommandation |
| -------------------- | --------------------------------------------------------------------- |
| Conversations sensibles à la confidentialité | Choisissez un petit modèle (moins de 8B) à exécuter localement, entièrement hors ligne |
| Apple Silicon (puces M) | Utilisez le backend MLX dans LM Studio, l'efficacité est nettement supérieure à celle de llama.cpp |
| Modèles d'embedding | LM Studio peut également charger des modèles d'embedding, utiles pour les bases de connaissances |

## Différences avec Ollama

| | LM Studio | [Ollama](ollama.md) |
| ---- | ------------- | ------------------- |
| Forme | Interface graphique + Serveur | Ligne de commande / Service en arrière-plan |
| Gestion des modèles | Navigation/Téléchargement via GUI | `ollama pull` |
| API | Compatible OpenAI | Compatible OpenAI |
| Convient à | Les utilisateurs préférant l'interaction graphique | Les utilisateurs préférant la ligne de commande / le déploiement Docker |

Les deux peuvent être connectés à Cherry Studio, choisissez selon vos préférences.

## Questions fréquentes

* **Cherry Studio ne peut pas se connecter** : vérifiez que le serveur dans LM Studio est démarré (statut point vert)
* **Réponses très lentes** : le modèle est trop grand / la mémoire vidéo est insuffisante, utilisez un modèle plus petit ou une quantification plus élevée (par exemple Q4 → Q3)
* **Caractères illisibles / sortie tronquée** : la longueur du contexte dépasse la limite du modèle, augmentez `n_ctx` dans LM Studio

***

### Obtenir de l'aide et envoyer des retours

Si vous avez des questions, des bugs ou des suggestions d'amélioration lors de la configuration ou de l'utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
