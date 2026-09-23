---
icon: searchengin
---


# Déploiement et configuration de SearXNG

CherryStudio prend en charge les recherches sur le web via SearXNG, un projet open source pouvant être déployé localement ou sur un serveur. Son mode de configuration diffère légèrement des autres solutions nécessitant des fournisseurs d'API.

**Lien du projet SearXNG** : [SearXNG](https://github.com/searxng/searxng)

## Avantages de SearXNG

* Open source et gratuit, sans API nécessaire
* Respect élevé de la vie privée
* Hautement personnalisable

## Déploiement local

### 1. Déploiement direct via Docker

Comme SearXNG ne nécessite pas de configuration environnementale complexe, vous pouvez le déployer simplement en fournissant un port libre sans utiliser docker compose. La méthode la plus rapide consiste à utiliser Docker pour extraire directement l'image et la déployer.

#### 1. Télécharger et configurer [Docker](https://www.docker.com/)

<figure><img src="../../../assets/36a2223ad6a74755f9438450.webp" alt=""><figcaption></figcaption></figure>

Après l'installation, choisissez un chemin de stockage pour l'image :

<figure><img src="../../../assets/f7572e7242786dec7c27bb91.png" alt=""><figcaption></figcaption></figure>

#### 2. Rechercher et extraire l'image SearXNG

Entrez **searxng** dans la barre de recherche :

<figure><img src="../../../assets/b52b7668925a50513c3ab7a2.webp" alt=""><figcaption></figcaption></figure>

Extraire l'image :

<figure><img src="../../../assets/5dafa0076ead5eeb692be20b.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/b1fe9a5844d2d6f7bc0a838a.png" alt=""><figcaption></figcaption></figure>

#### 3. Exécuter l'image

Après l'extraction réussie, accédez à la page **Images** :

<figure><img src="../../../assets/7c1012848c3c6094596c91a1.png" alt=""><figcaption></figcaption></figure>

Sélectionnez l'image extraite et cliquez sur Exécuter :

<figure><img src="../../../assets/221bbed549ef2ac3b0a864bf.webp" alt=""><figcaption></figcaption></figure>

Ouvrez les paramètres pour configurer :

<figure><img src="../../../assets/0d16c62b496005cda1bffce3.png" alt=""><figcaption></figcaption></figure>

Exemple avec le port `8085` :

<figure><img src="../../../assets/9886d746078c3285007a8da6.png" alt=""><figcaption></figcaption></figure>

Après le succès de l'exécution, cliquez sur le lien pour ouvrir l'interface frontale de SearXNG :

<figure><img src="../../../assets/4a60cdbf629c607c929177a0.png" alt=""><figcaption></figcaption></figure>

Cette page indique que le déploiement a réussi :

<figure><img src="../../../assets/70293f8a218c352fd7d84ad5.webp" alt=""><figcaption></figcaption></figure>

## Déploiement sur serveur

Comme l'installation de Docker sous Windows peut être complexe, les utilisateurs peuvent déployer SearXNG sur un serveur et le partager avec d'autres. Malheureusement, SearXNG ne prend pas encore en charge l'authentification nativement, permettant ainsi à d'autres personnes de scanner et d'utiliser abusivement votre instance déployée.

Cherry Studio prend désormais en charge la configuration de [l'authentification HTTP de base (RFC7617)](https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/WWW-Authenticate). Si vous exposez votre SearXNG déployé sur Internet, **il est impératif** de configurer cette authentification via un logiciel de proxy inverse comme Nginx. Voici un bref tutoriel qui nécessite des connaissances de base en administration Linux.

### Déployer SearXNG

De manière similaire, utilisez Docker pour le déploiement. Supposons que vous ayez déjà installé Docker CE sur le serveur selon le [tutoriel officiel](https://docs.docker.com/engine/install). Voici des commandes complètes pour une installation neuve sous Debian :

```bash
sudo apt update
sudo apt install git -y

# Extraire le dépôt officiel
cd /opt
git clone https://github.com/searxng/searxng-docker.git
cd /opt/searxng-docker

# Si la bande passante de votre serveur est limitée, définissez sur false
export IMAGE_PROXY=true

# Modifier le fichier de configuration
cat <<EOF > /opt/searxng-docker/searxng/settings.yml
# voir https://docs.searxng.org/admin/settings/settings.html#settings-use-default-settings
use_default_settings: true
server:
  # base_url est défini dans la variable d'environnement SEARXNG_BASE_URL, voir .env et docker-compose.yml
  secret_key: $(openssl rand -hex 32)
  limiter: false  # peut être désactivé pour une instance privée
  image_proxy: $IMAGE_PROXY
ui:
  static_use_hash: true
redis:
  url: redis://redis:6379/0
search:
  formats:
    - html
    - json
EOF
```

Si vous devez modifier le port d'écoute local ou réutiliser un Nginx existant, éditez le fichier `docker-compose.yaml` comme suit :

```yaml
version: "3.7"

services:
# Si Caddy n'est pas nécessaire et que vous réutilisez un Nginx local existant, supprimez cette section.
  caddy:
    container_name: caddy
    image: docker.io/library/caddy:2-alpine
    network_mode: host
    restart: unless-stopped
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy-data:/data:rw
      - caddy-config:/config:rw
    environment:
      - SEARXNG_HOSTNAME=${SEARXNG_HOSTNAME:-http://localhost}
      - SEARXNG_TLS=${LETSENCRYPT_EMAIL:-internal}
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
# Si Caddy n'est pas nécessaire et que vous réutilisez un Nginx local existant, supprimez cette section.
  redis:
    container_name: redis
    image: docker.io/valkey/valkey:8-alpine
    command: valkey-server --save 30 1 --loglevel warning
    restart: unless-stopped
    networks:
      - searxng
    volumes:
      - valkey-data2:/data
    cap_drop:
      - ALL
    cap_add:
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"

  searxng:
    container_name: searxng
    image: docker.io/searxng/searxng:latest
    restart: unless-stopped
    networks:
      - searxng
    # Par défaut mappé sur le port 8080 de l'hôte, si vous voulez écouter sur 8000, remplacez par "127.0.0.1:8000:8080"
    ports:
      - "127.0.0.1:8080:8080"
    volumes:
      - ./searxng:/etc/searxng:rw
    environment:
      - SEARXNG_BASE_URL=https://${SEARXNG_HOSTNAME:-localhost}/
      - UWSGI_WORKERS=${SEARXNG_UWSGI_WORKERS:-4}
      - UWSGI_THREADS=${SEARXNG_UWSGI_THREADS:-4}
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"

networks:
  searxng:

volumes:
# Si Caddy n'est pas nécessaire et que vous réutilisez un Nginx local existant, supprimez cette section
  caddy-data:
  caddy-config:
# Si Caddy n'est pas nécessaire et que vous réutilisez un Nginx local existant, supprimez cette section
  valkey-data2:
```

Exécutez `docker compose up -d` pour démarrer. Visualisez les journaux avec `docker compose logs -f searxng`.

### Déployer le proxy inverse Nginx et l'authentification HTTP de base

Si vous utilisez des panneaux de serveur comme Baota ou 1Panel, consultez leur documentation pour ajouter un site et configurer le proxy inverse Nginx. Modifiez ensuite le fichier de configuration Nginx comme dans l'exemple ci-dessous :

```conf
server
{
    listen 443 ssl;

    # Votre nom d'hôte
    server_name search.example.com;

    # index index.html;
    # root /data/www/default;

    # Si SSL est configuré, ajoutez ces deux lignes
    ssl_certificate    /path/to/your/cert/fullchain.pem;
    ssl_certificate_key    /path/to/your/cert/privkey.pem;

    # HSTS
    # add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";

    # Configuration proxy inverse standard
    location / {
        # Ajoutez ces deux lignes dans le bloc location, conservez le reste
        auth_basic "Veuillez saisir votre nom d'utilisateur et mot de passe";
        auth_basic_user_file /etc/nginx/conf.d/search.htpasswd;

        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_protocol_addr;
        proxy_pass http://127.0.0.1:8000;
        client_max_body_size 0;
    }

    # access_log  ...;
    # error_log  ...;
}
```

Supposons que le fichier de configuration Nginx soit dans `/etc/nginx/conf.d`, placez-y également le fichier de mots de passe.

Exécutez la commande (remplacez `example_name` et `example_password` par vos identifiants) :

```bash
echo "example_name:$(openssl passwd -5 'example_password')" > /etc/nginx/conf.d/search.htpasswd
```

Redémarrez Nginx (ou rechargez la configuration).

Ouvrez ensuite la page web. Vous devriez être invité à saisir vos identifiants. Entrez ceux définis précédemment pour vérifier la configuration.

<figure><img src="../../../assets/a98dfc8aa250c49f1823c605.webp" alt=""><figcaption></figcaption></figure>

## Configuration dans Cherry Studio

Une fois SearXNG déployé localement ou sur serveur, procédez à la configuration dans CherryStudio.

Accédez à la page des paramètres de recherche web et sélectionnez Searxng :

<figure><img src="../../../assets/320df59f8a1726a1ad711483.webp" alt=""><figcaption></figcaption></figure>

La validation échoue si vous entrez directement l'URL du déploiement local :

<figure><img src="../../../assets/84394efb52fd620e87b4be56.webp" alt=""><figcaption></figcaption></figure>

Cela est dû au format JSON non activé par défaut. Modifiez le fichier de configuration.

Revenez à Docker, dans l'onglet Fichiers, trouvez le dossier avec les étiquettes :

<figure><img src="../../../assets/c60179784ede7bfc8e494149.png" alt=""><figcaption></figcaption></figure>

Déroulez et trouvez un autre dossier étiqueté :

<figure><img src="../../../assets/1f1f1979eff7079b81e44712.webp" alt=""><figcaption></figcaption></figure>

Localisez le fichier de configuration **settings.yml** :

<figure><img src="../../../assets/b5404fe79eedd68313f52e50.webp" alt=""><figcaption></figcaption></figure>

Ouvrez l'éditeur de fichiers :

<figure><img src="../../../assets/256b0f0b130cd6a0675dbf68.webp" alt=""><figcaption></figcaption></figure>

À la ligne 78, seul le format html est présent :

<figure><img src="../../../assets/73dae19728e0277674c00972.webp" alt=""><figcaption></figcaption></figure>

Ajoutez le format json, enregistrez et réexécutez l'image :

<figure><img src="../../../assets/502cd1dfbd21b235e6ad930e.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/6a338a946c3d09f4c0a85280.webp" alt=""><figcaption></figcaption></figure>

Revenez dans Cherry Studio pour valider :

<figure><img src="../../../assets/09ba5a8e53909465e8b82a3a.webp" alt=""><figcaption></figcaption></figure>

L'adresse peut être locale : <http://localhost>:port\
Ou l'adresse Docker : <http://host.docker.internal>:port

Pour les déploiements serveur avec proxy inverse et format json activé, la validation retournera l'erreur 401 si l'authentification HTTP est configurée :

<figure><img src="../../../assets/bfbbd576e166a5b3c91459da.webp" alt=""><figcaption></figcaption></figure>

Configurez l'authentification HTTP de base dans le client avec vos identifiants :

<figure><img src="../../../assets/bae78c4b90bb9bf592e3df6d.webp" alt=""><figcaption></figcaption></figure>

La validation devrait alors réussir.

### Autres configurations

SearXNG possède désormais une capacité de recherche par défaut. Pour personnaliser les moteurs de recherche, configurez manuellement.

Notez que ces préférences n'affectent pas la configuration appelée par le grand modèle :

<figure><img src="../../../assets/2f90523a92a6e8faee642306.webp" alt=""><figcaption></figcaption></figure>

Pour configurer les moteurs utilisés par le grand modèle, modifiez le fichier de configuration :

<figure><img src="../../../assets/bac57409b07fe4274bb7b557.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/7af6ac822e82923466bd47ad.webp" alt=""><figcaption></figcaption></figure>

Référence de configuration linguistique :

<figure><img src="../../../assets/00af4cfe633cb13aaab9064b.webp" alt=""><figcaption></figcaption></figure>

Si le contenu est trop long, copiez-le dans un IDE local, modifiez-le et collez-le dans le fichier de configuration.

## Causes courantes d'échec de validation

### Format de retour sans JSON

Ajoutez json aux formats de retour dans le fichier de configuration :

<figure><img src="../../../assets/e1254790f7d2b06d59aac1fc.webp" alt=""><figcaption></figcaption></figure>

### Moteur de recherche mal configuré

Cherry Studio sélectionne par défaut les moteurs avec des catégories web et general. Google étant souvent inaccessible en Chine, forcez l'utilisation de Baidu :

```
use_default_settings:
  engines:
    keep_only:
      - baidu
engines:
  - name: baidu
    engine: baidu 
    categories: 
      - web
      - general
    disabled: false
```

### Taux de requêtes trop élevé

Désactivez le limiteur de SearXNG dans les paramètres :

<figure><img src="../../../assets/73d1cfd3257ee30da6d76d01.webp" alt=""><figcaption></figcaption></figure>