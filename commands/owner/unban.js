const fs = require('fs');
const bansPath = './database/bans.json';

module.exports = {
    name: 'unban',
    category: 'owner',
    description: 'Unban a user',
    usage: '§unban @user',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        let target = null;

        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }

        if (!target) {
            return extra.reply('❌ Tag a user to unban.');
        }

        if (!fs.existsSync(bansPath)) {
            return extra.reply('✅ No users are banned.');
        }

        let bans = JSON.parse(fs.readFileSync(bansPath));

        if (!bans[target]) {
            return extra.reply(`⚠️ @${target.split('@')[0]} is not banned.`);
        }

        delete bans[target];
        fs.writeFileSync(bansPath, JSON.stringify(bans, null, 2));

        await extra.reply(`✅ Unbanned @${target.split('@')[0]}.`);
    }
};