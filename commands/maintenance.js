// maintenance.js — NEZUKO
let maintenanceMode = false;

async function maintenanceCommand(sock, chatId, message, args, isOwner) {
    if (!isOwner) {
        return sock.sendMessage(chatId, { text: '❌ Réservé au propriétaire du bot.' }, { quoted: message });
    }

    const arg = args[0]?.toLowerCase();
    if (!arg || !['on', 'off'].includes(arg)) {
        return sock.sendMessage(chatId, { text: '❌ Usage: .maintenance on | .maintenance off' }, { quoted: message });
    }

    maintenanceMode = arg === 'on';

    await sock.sendMessage(chatId, {
        image: { url: 'https://i.ibb.co/7NyMLkMq/IMG-20260921-WA0562.jpg' },
        caption: maintenanceMode
            ? `🔧 *MODE MAINTENANCE ACTIVÉ*\n\n⚠️ Le bot est temporairement en maintenance.\nSeul le propriétaire peut utiliser les commandes.\n\n> 🩸 CENTRAL-HEX · CENTRAL-HEX`
            : `✅ *MAINTENANCE TERMINÉE*\n\nLe bot est de nouveau opérationnel !\nTout le monde peut utiliser les commandes.\n\n> 🩸 CENTRAL-HEX · CENTRAL-HEX`
    }, { quoted: message });
}

function isInMaintenance() { return maintenanceMode; }
function setMaintenanceMode(value) { maintenanceMode = !!value; return maintenanceMode; }
module.exports = { maintenanceCommand, isInMaintenance, setMaintenanceMode };
