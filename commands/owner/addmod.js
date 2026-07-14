const fs = require('fs');
const modsPath = './database/mods.json';

module.exports = {
    name: 'addmod',
    category: 'owner',
    description: 'Add a moderator',
    usage: '§addmod @user',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        let target = null;

        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }

        if (!target) {
            return extra.reply('❌ Tag a user to add as moderator.');
        }

        let mods = {};
        if (fs.existsSync(modsPath)) {
            mods = JSON.parse(fs.readFileSync(modsPath));
        }

        if (mods[target]) {
            return extra.reply(`⚠️ @${target.split('@')[0]} is already a moderator.`);
        }

        mods[target] = {
            added: new Date().toISOString(),
            addedBy: msg.key.participant || msg.key.remoteJid
        };

        fs.writeFileSync(modsPath, JSON.stringify(mods, null, 2));

        await extra.reply(`✅ Added @${target.split('@')[0]} as moderator.`);
    }
};