

# GitHub Copilot

Pour utiliser GitHub Copilot, vous devez d'abord disposer d'un compte GitHub et souscrire au service GitHub Copilot. L'abonnement gratuit est possible, mais la version gratuite ne prend pas en charge le dernier modèle Claude 3.7. Pour plus de détails, consultez le [site officiel de GitHub Copilot](https://github.com/features/copilot).

## Obtenir le Device Code

Cliquez sur « Se connecter à GitHub » pour obtenir le Device Code et copiez-le.

<figure><img src="../../../../assets/c55a91f9cdc6b88106e1d281.webp" alt="Exemple d'obtention du Device Code"><figcaption><p>Obtenir le Device Code</p></figcaption></figure>

## Remplir le Device Code dans le navigateur et autoriser

Après avoir obtenu le Device Code, cliquez sur le lien pour ouvrir le navigateur. Connectez-vous à votre compte GitHub, saisissez le Device Code et autorisez l'accès.

<figure><img src="../../../../assets/1bf59331d4a2754ff20e7379.webp" alt="Autorisation GitHub"><figcaption><p>Autorisation GitHub</p></figcaption></figure>

Après autorisation réussie, revenez à Cherry Studio et cliquez sur « Connecter GitHub ». Une fois connecté, votre nom d'utilisateur et votre avatar GitHub s'afficheront.

<figure><img src="../../../../assets/dd64cd1857b5e69446d98398.webp" alt="Connexion GitHub réussie"><figcaption><p>Connexion GitHub réussie</p></figcaption></figure>

## Cliquer sur « Gérer » pour obtenir la liste des modèles

Cliquez sur le bouton « Gérer » ci-dessous pour récupérer automatiquement la liste des modèles actuellement pris en charge.

<figure><img src="../../../../assets/c0545b25325df32cd70fbad9.webp" alt="Obtenir la liste des modèles"><figcaption><p>Obtenir la liste des modèles</p></figcaption></figure>

## Questions fréquentes

### Échec d'obtention du Device Code, veuillez réessayer

<figure><img src="../../../../assets/1fc3819d4c2caff7331c82bb.webp" alt="Échec d'obtention du Device Code"><figcaption><p>Échec d'obtention du Device Code</p></figcaption></figure>

Les requêtes actuelles utilisent Axios, qui ne prend pas en charge les proxy SOCKS. Utilisez un proxy système ou HTTP, ou ne configurez pas de proxy dans CherryStudio pour utiliser un proxy global. Assurez-vous d'abord que votre connexion réseau est normale pour éviter cet échec.