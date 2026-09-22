# NEZUKO-HABY
# 🩸 NEZUKO

Bot WhatsApp multi-device **sans préfixe** — tape simplement le nom d'une commande (ex. `menu`, `ping`, `owner`) et le bot répond directement.

Créé par **IB-SACKO** & **SALGA** · Propriétaire **HABY HINATA** · Système **CENTRAL-HEX**

---

## ⚡ Connexion (aucune installation pour l'utilisateur final)

1. Déploie le bot sur ton propre serveur/hébergeur Node.js (voir plus bas).
2. Ouvre la page d'accueil (`/`) servie par `web.js`.
3. Entre ton numéro WhatsApp (avec l'indicatif pays) et clique sur **Obtenir le code**, ou choisis l'onglet **QR Code**.
4. Sur ton téléphone : WhatsApp → ⋮ → Appareils liés → Lier un appareil → Lier avec un numéro de téléphone → entre le code (ou scanne le QR).
5. C'est prêt : tape `menu` dans n'importe quelle conversation.

## 📋 Les 9 commandes

| Commande | Description |
|---|---|
| `menu` | Affiche le menu du bot |
| `ping` | Vitesse de réponse du bot |
| `owner` | Contact des créateurs et du propriétaire |
| `mode public/private` | Change le mode d'accès au bot (propriétaire) |
| `pair <numéro>` | Génère un code de connexion depuis WhatsApp |
| `mute [minutes]` | Ferme le groupe (admin) — `unmute` pour rouvrir |
| `antidelete on/off` | Récupère les messages supprimés (propriétaire) |
| `humm` | Récupère un média vue-unique (en réponse) |
| `waouh` | Récupère un média vue-unique (en réponse) |

## 🛡️ Dashboard admin

Accessible sur `/admin` (mot de passe défini par `ADMIN_PASSWORD` dans `.env`) :
- État de connexion, mémoire, uptime, version
- Basculer mode public/privé et mode maintenance
- Liste des sessions WhatsApp connectées
- Redémarrage du bot
- Mise à jour du code depuis un lien ZIP (ex. "Download ZIP" GitHub)

## ⚙️ Installation

```bash
git clone <ton-dépôt>
cd NEZUKO
npm install
cp .env.example .env   # puis renseigne ADMIN_PASSWORD
node web.js
```

Le serveur démarre sur le port `3000` (configurable via `PORT`). Ouvre `http://localhost:3000` pour connecter un numéro.

### Fonctionnement 24/7

Le bot inclut un **auto-ping intégré** qui empêche les hébergeurs comme Render de le mettre en veille par inactivité (définis `APP_URL` dans le `.env` avec ton URL publique, ou laisse vide sur Render qui la fournit automatiquement).

Par défaut, une seule session WhatsApp peut être active en même temps (`MAX_SESSIONS=1` dans le `.env`) — cela protège la mémoire du serveur sur les hébergeurs gratuits (512 Mo). Augmente cette valeur uniquement si ton serveur a plus de RAM.

### Déploiement (Docker / Railway / Koyeb)

Le projet inclut un `Dockerfile`, un `railway.toml` et un `koyeb.yaml` prêts à l'emploi si tu préfères déployer sur une plateforme plutôt qu'en local — mais ce n'est pas obligatoire : le bot fonctionne aussi bien sur un simple VPS ou en local avec `node web.js`.

## 🔧 Configuration (`.env`)

| Variable | Rôle |
|---|---|
| `OWNER_NUMBER` / `OWNER_NAME` | Numéro et nom du propriétaire |
| `CREATOR_NUMBERS` / `CREATOR_NAMES` | Numéros et noms des créateurs (séparés par une virgule) |
| `ADMIN_PASSWORD` | Mot de passe du dashboard `/admin` |
| `COMMAND_MODE` | `public` ou `private` par défaut |
| `MAX_SESSIONS` | Nombre de sessions WhatsApp simultanées autorisées |

## 👤 Créateurs & Communauté

- 🛠️ Créateurs : **IB-SACKO** (+224 621 963 059) & **SALGA** (+224 662 675 862)
- 👑 Propriétaire : **HABY HINATA** (+224 664 014 102)
- 💎 Système : **CENTRAL-HEX**

---

<div align="center">Propulsé par 🩸 <b>CENTRAL-HEX</b></div>
