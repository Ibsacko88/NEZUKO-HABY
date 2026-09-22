// lib/brand.js — Constantes d'identité visuelle du bot NEZUKO
// Centralise le nom, l'image et les informations utilisées par les commandes.

const BOT_NAME = 'NEZUKO';
const BOT_TITLE = '𝗡𝗘𝗭𝗨𝗞𝗢'; // texte stylé utilisé dans les cadres ASCII
const BOT_IMAGE = 'https://i.ibb.co/7NyMLkMq/IMG-20260921-WA0562.jpg';

// 🛠️ Créateurs / développeurs du bot (accès total via sudo)
const CREATORS = [
    { name: 'IB-SACKO', number: '224621963059' },
    { name: 'SALGA', number: '224662675862' }
];

// 👑 Propriétaire officiel du bot
const OWNER_NAME = 'HABY HINATA';
const OWNER_NUMBER = '224664014102';

const SYSTEM_NAME = 'CENTRAL-HEX';

// Pas de contexte de transfert vers une chaîne WhatsApp externe : on reste neutre.
const channelInfo = {};

module.exports = {
    BOT_NAME,
    BOT_TITLE,
    BOT_IMAGE,
    CREATORS,
    OWNER_NAME,
    OWNER_NUMBER,
    SYSTEM_NAME,
    channelInfo
};
