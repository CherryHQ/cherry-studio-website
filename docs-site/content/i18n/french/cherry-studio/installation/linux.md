---
icon: linux
---
# Linux

## 1. Télécharger le paquet d'installation

Ouvrez la [page de téléchargement officielle](https://cherryai.com.cn/download/v2) et sélectionnez **Linux**. Le site officiel propose différents formats de paquets d'installation selon le système et l'architecture :

| Cas d'usage | Recommandation |
| ------------------------ | ----------------------- |
| Ubuntu, Debian, Linux Mint | Sélectionnez le paquet `.deb` correspondant à l'architecture. |
| Fedora, RHEL, openSUSE | Sélectionnez le paquet `.rpm` correspondant à l'architecture. |
| Autres distributions ou exécution portable | Sélectionnez le paquet `.AppImage` correspondant à l'architecture. |

Les appareils Intel / AMD choisissent généralement la version x64 (ou x86\_64) ; les appareils ARM choisissent la version ARM64 (ou aarch64). En cas de doute sur l'architecture, exécutez `uname -m` dans le terminal : `x86_64` correspond à x64, `aarch64` ou `arm64` correspond à ARM64.

## 2. Installer et démarrer

* `.deb` et `.rpm` : utilisez de préférence l'installateur de logiciels ou le gestionnaire de paquets de la distribution pour ouvrir le paquet d'installation, puis lancez Cherry Studio depuis le menu des applications.
* `.AppImage` : accordez les droits d'exécution au fichier, puis double-cliquez pour l'exécuter ; vous pouvez également lancer `chmod +x nom-du-fichier.AppImage` dans le terminal avant de démarrer.

## Impossible de démarrer

Vérifiez d'abord que le paquet d'installation correspond à l'architecture du système. Si AppImage ne démarre pas et affiche des erreurs liées à `FUSE` ou `libfuse`, installez les composants de compatibilité appropriés conformément à la documentation officielle de votre distribution.

Si le démarrage reste impossible, veuillez joindre à votre retour d'information la distribution, l'environnement de bureau, l'architecture de l'appareil, le nom du paquet d'installation et le message d'erreur complet.

## Étapes suivantes

Une fois l'interface principale de Cherry Studio affichée, poursuivez avec le démarrage rapide.
