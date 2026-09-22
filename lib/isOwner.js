const settings = require('../settings');

// Numéros ayant un accès complet : le propriétaire + tous les créateurs.
function getPrivilegedNumbers() {
    const nums = [settings.ownerNumber, ...(settings.creatorNumbers || [])];
    return nums
        .map(n => String(n).split(':')[0].split('@')[0].trim())
        .filter(Boolean);
}

async function isOwnerOrSudo(senderId, sock = null, chatId = null) {
    const privileged = getPrivilegedNumbers();
    const senderClean = String(senderId).split(':')[0].split('@')[0];

    // 1. Correspondance directe par numéro nettoyé
    if (privileged.includes(senderClean)) return true;

    // 2. Le senderId contient l'un des numéros privilégiés (cas JID composites)
    if (privileged.some(n => senderId.includes(n))) return true;

    // 3. Dans les groupes : gestion du LID WhatsApp
    if (sock && chatId && chatId.endsWith('@g.us')) {
        try {
            const metadata = await sock.groupMetadata(chatId);
            const participants = metadata.participants || [];

            for (const p of participants) {
                const pId = (p.id || '').split(':')[0].split('@')[0];
                const pLid = (p.lid || '').split(':')[0].split('@')[0];

                if (privileged.includes(pId)) {
                    const senderLid = senderId.split(':')[0].split('@')[0];
                    if (
                        p.id === senderId ||
                        p.lid === senderId ||
                        pLid === senderLid ||
                        pId === senderClean
                    ) {
                        return true;
                    }
                }
            }
        } catch (e) {
            console.error('❌ [isOwner] Erreur groupMetadata:', e.message);
        }
    }

    return false;
}

module.exports = isOwnerOrSudo;
