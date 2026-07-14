const fs = require('fs');
const modsPath = './database/mods.json';

module.exports = {
    name: 'delmod',
    category: 'owner',
    description: 'Remove a moderator',
    usage: '§delmod @user',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        let target = null;

        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }

        if (!target) {
            return extra.reply('❌ Tag a user to remove as moderator.');
        }

        let mods = {};
        if (fs.existsSync(modsPath)) {
            mods = JSON.parse(fs.readFileSync(modsPath));
        }

        if (!mods[target]) {
            return extra.reply(`⚠️ @${target.split('@')[0]} is not a moderator.`);
        }

        delete mods[target];
        fs.writeFileSync(modsPath, JSON.stringify(mods, null, 2));

        await extra.reply(`✅ Removed @${target.split('@')[0]} as moderator.`);
    }
};