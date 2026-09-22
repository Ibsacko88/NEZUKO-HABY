const settings = require('../settings');
const { BOT_IMAGE } = require('../lib/brand');

function heure() {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}
function dateJour() {
    return new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

async function menuCommand(sock, chatId, message) {
    const pushName = message.pushName || 'Utilisateur';

    const caption = `╔════✦𝗡𝗘𝗭𝗨𝗞𝗢✦════✰
║»✰ *ʙᴏᴛ ɴᴀᴍᴇ* : ${settings.botName}
║»✰ *ᴜsᴇʀɴᴀᴍᴇ* : ${pushName}
║»✰ *ᴅᴇᴠᴇʟᴏᴘᴇʀ* : ${settings.creatorNames.join(' & ')}
║»✰ *⏰ ʜᴇᴜʀᴇ* : ${heure()}
║»✰ *📅 ᴅᴀᴛᴇ* : ${dateJour()}
╚══════════════════✰
                 𝐂𝐄𝐍𝐓𝐑𝐀-𝐇𝐄𝐗
╔══════𝗚𝗘𝗡𝗘𝗥𝗔𝗟══════>
║❒ menu → Affiche ce menu
║❒ ping → Vitesse de réponse du bot
║❒ owner → Contact du créateur et du propriétaire
║❒ mode public/private → Change le mode d'accès au bot
║❒ pair <numéro> → Génère un code de connexion WhatsApp
║❒ mute [minutes] → Ferme le groupe (tape *unmute* pour rouvrir)
║❒ antidelete on/off → Récupère les messages supprimés
║❒ humm → Récupère un média vue-unique (en réponse)
║❒ waouh → Récupère un média vue-unique (en réponse)
╚══════════════════✰`;

    try {
        await sock.sendMessage(chatId, {
            image: { url: BOT_IMAGE },
            caption
        }, { quoted: message });
    } catch (e) {
        console.error('❌ [menu]', e.message);
        await sock.sendMessage(chatId, { text: caption }, { quoted: message });
    }
}

module.exports = menuCommand;
