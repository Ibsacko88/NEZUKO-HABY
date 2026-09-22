require('dotenv').config();
// 🧹 Redirige le stockage temporaire hors de /tmp système (évite les erreurs
// ENOSPC sur certains hébergeurs) et nettoie automatiquement les vieux fichiers.
const fs = require('fs');
const path = require('path');

const customTemp = path.join(process.cwd(), 'temp');
if (!fs.existsSync(customTemp)) fs.mkdirSync(customTemp, { recursive: true });
process.env.TMPDIR = customTemp;
process.env.TEMP = customTemp;
process.env.TMP = customTemp;

setInterval(() => {
    fs.readdir(customTemp, (err, files) => {
        if (err) return;
        for (const file of files) {
            const filePath = path.join(customTemp, file);
            fs.stat(filePath, (err, stats) => {
                if (!err && Date.now() - stats.mtimeMs > 3 * 60 * 60 * 1000) {
                    fs.unlink(filePath, () => {});
                }
            });
        }
    });
}, 3 * 60 * 60 * 1000);

const settings = require('./settings');
require('./config.js');
const isOwnerOrSudo = require('./lib/isOwner');
const isAdmin = require('./lib/isAdmin');

// ── Les 9 commandes de NEZUKO ────────────────────────────────
const menuCommand = require('./commands/menu');
const pingCommand = require('./commands/ping');
const ownerCommand = require('./commands/owner');
const pairCommand = require('./commands/pair');
const muteCommand = require('./commands/mute');
const unmuteCommand = require('./commands/unmute');
const { handleAntideleteCommand, handleMessageRevocation, storeMessage } = require('./commands/antidelete');
const hummCommand = require('./commands/humm');
const waouhCommand = require('./commands/waouh');
// ─────────────────────────────────────────────────────────────

const MODE_FILE = path.join(__dirname, 'data/messageCount.json');

function readIsPublic() {
    try {
        const data = JSON.parse(fs.readFileSync(MODE_FILE));
        return typeof data.isPublic === 'boolean' ? data.isPublic : true;
    } catch {
        return true;
    }
}
function writeIsPublic(isPublic) {
    let data = {};
    try { data = JSON.parse(fs.readFileSync(MODE_FILE)); } catch {}
    data.isPublic = isPublic;
    fs.writeFileSync(MODE_FILE, JSON.stringify(data, null, 2));
}

async function handleMessages(sock, messageUpdate) {
    let chatId = null;
    try {
        const { messages, type } = messageUpdate;
        if (type !== 'notify') return;

        const message = messages[0];
        if (!message?.message) return;

        chatId = message.key.remoteJid;
        const senderId = message.key.fromMe
            ? (sock.user?.id?.split(':')[0].split('@')[0] + '@s.whatsapp.net')
            : (message.key.participant || message.key.remoteJid);

        const isGroup = chatId.endsWith('@g.us');
        const isChannel = chatId.endsWith('@newsletter');
        if (isChannel) return;

        const senderIsOwnerOrSudo = await isOwnerOrSudo(senderId, sock, chatId);
        const isOwnerMsg = message.key.fromMe || senderIsOwnerOrSudo;

        // ── Antidelete : mémorise chaque message reçu (no-op si désactivé) ──
        try {
            if (message.message) storeMessage(sock, message);
        } catch (e) { /* non critique */ }

        // ── Antidelete : détection d'une suppression ──
        try {
            if (message.message?.protocolMessage?.type === 0) {
                await handleMessageRevocation(sock, message);
                return;
            }
        } catch (e) { /* non critique */ }

        // Extraction du texte du message
        const rawText = (
            message.message?.conversation?.trim() ||
            message.message?.extendedTextMessage?.text?.trim() ||
            message.message?.imageMessage?.caption?.trim() ||
            message.message?.videoMessage?.caption?.trim() ||
            ''
        );
        if (!rawText) return;

        const parts = rawText.trim().split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage || null;

        // ── Mode privé : seul le propriétaire/créateur peut utiliser le bot ──
        const isPublic = readIsPublic();
        if (!isPublic && !isOwnerMsg) return;

        switch (cmd) {
            case 'menu':
            case 'help':
                await menuCommand(sock, chatId, message);
                break;

            case 'ping':
                await pingCommand(sock, chatId, message);
                break;

            case 'owner':
                await ownerCommand(sock, chatId, message);
                break;

            case 'mode': {
                if (!isOwnerMsg) {
                    await sock.sendMessage(chatId, { text: '❌ Seul le propriétaire peut changer le mode.' }, { quoted: message });
                    return;
                }
                const action = args[0]?.toLowerCase();
                if (!action || (action !== 'public' && action !== 'private')) {
                    await sock.sendMessage(chatId, {
                        text: `🌍 *Mode actuel :* ${readIsPublic() ? 'public' : 'private'}\n\nUsage : mode public | mode private`
                    }, { quoted: message });
                    return;
                }
                writeIsPublic(action === 'public');
                await sock.sendMessage(chatId, { text: `✅ Le bot est maintenant en mode *${action}*.` }, { quoted: message });
                break;
            }

            case 'pair':
                await pairCommand(sock, chatId, message, args);
                break;

            case 'mute': {
                if (!isGroup) return;
                const minutes = parseInt(args[0], 10);
                await muteCommand(sock, chatId, senderId, message, Number.isFinite(minutes) ? minutes : null);
                break;
            }

            case 'unmute':
                if (!isGroup) return;
                await unmuteCommand(sock, chatId, senderId, message);
                break;

            case 'antidelete': {
                if (!isOwnerMsg) {
                    await sock.sendMessage(chatId, { text: '❌ Réservé au propriétaire du bot.' }, { quoted: message });
                    return;
                }
                await handleAntideleteCommand(sock, chatId, message, args[0]?.toLowerCase());
                break;
            }

            case 'humm':
                await hummCommand(sock, chatId, senderId, quotedMessage, message);
                break;

            case 'waouh':
                await waouhCommand(sock, chatId, senderId, quotedMessage, message);
                break;

            default:
                // Mot non reconnu → silence total (pas de spam dans les groupes)
                return;
        }
    } catch (error) {
        console.error('❌ Erreur dans le gestionnaire de messages:', error.message);
        if (chatId) {
            try {
                await sock.sendMessage(chatId, { text: '❌ Une erreur est survenue lors du traitement de la commande.' });
            } catch (e2) { /* ignore */ }
        }
    }
}

async function handleGroupParticipantUpdate() { /* aucune fonctionnalité liée aux arrivées/départs dans NEZUKO */ }
async function handleStatus() { /* aucune fonctionnalité liée aux statuts dans NEZUKO */ }

module.exports = {
    handleMessages,
    handleGroupParticipantUpdate,
    handleStatus
};

