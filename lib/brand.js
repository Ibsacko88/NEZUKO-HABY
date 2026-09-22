// lib/brand.js 鈥� Constantes d'identit茅 visuelle du bot NEZUKO
// Centralise le nom, l'image et les informations utilis茅es par les commandes.

const BOT_NAME = 'NEZUKO';
const BOT_TITLE = '饾棥饾棙饾棴饾棬饾棡饾棦'; // texte styl茅 utilis茅 dans les cadres ASCII
const BOT_IMAGE = 'https://i.ibb.co/7NyMLkMq/IMG-20260921-WA0562.jpg';

// 馃洜锔� Cr茅ateurs / d茅veloppeurs du bot (acc猫s total via sudo)
const CREATORS = [
    { name: 'IB-SACKO', number: '224621963059' },
    { name: 'SALGA', number: '224662675862' }
];

// 馃憫 Propri茅taire officiel du bot
const OWNER_NAME = 'HABY HINATA';
const OWNER_NUMBER = '224664014102';

const SYSTEM_NAME = 'CENTRAL-HEX';

// Pas de contexte de transfert vers une cha卯ne WhatsApp externe : on reste neutre.
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

