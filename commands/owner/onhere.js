const fs = require('fs');
const offPath = './database/offhere.json';

module.exports = {
    name: 'onhere',
    category: 'owner',
    description: 'Turn on bot in current chat',
    usage: '§onhere',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        const chatId = msg.key.remoteJid;

        if (!fs.existsSync(offPath)) {
            return extra.reply('✅ Bot is already active in this chat.');
        }

        let offChats = JSON.parse(fs.readFileSync(offPath));

        if (!offChats[chatId]) {
            return extra.reply('✅ Bot is already active in this chat.');
        }

        delete offChats[chatId];
        fs.writeFileSync(offPath, JSON.stringify(offChats, null, 2));

        await extra.reply(`🔊 Bot turned ON in this chat.`);
    }
};