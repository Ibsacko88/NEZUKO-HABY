require('dotenv').config();

const settings = {
  packname: process.env.PACK_NAME || 'NEZUKO',
  author: process.env.PACK_AUTHOR || 'IB-SACKO & SALGA',
  botName: process.env.BOT_NAME || 'NEZUKO',

  // 👑 Propriétaire officiel du bot
  botOwner: process.env.OWNER_NAME || 'HABY HINATA',
  ownerNumber: process.env.OWNER_NUMBER || '224664014102',

  // 🛠️ Créateurs / développeurs du bot (accès total via sudo)
  creatorNames: (process.env.CREATOR_NAMES || 'IB-SACKO,SALGA').split(','),
  creatorNumbers: (process.env.CREATOR_NUMBERS || '224621963059,224662675862').split(','),

  system: process.env.SYSTEM_NAME || 'CENTRAL-HEX',

  prefix: '', // Bot sans préfixe : "menu" suffit
  giphyApiKey: process.env.GIPHY_API_KEY || '',
  commandMode: process.env.COMMAND_MODE || 'public',
  maxStoreMessages: 30,
  storeWriteInterval: 10000,
  description: 'Bot WhatsApp multifonctions - NEZUKO',
  version: process.env.BOT_VERSION || '1.0.0',
};

module.exports = settings;

