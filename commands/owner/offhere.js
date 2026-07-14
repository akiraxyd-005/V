const fs = require('fs');
const offPath = './database/offhere.json';

module.exports = {
    name: 'offhere',
    category: 'owner',
    description: 'Turn off bot in current chat',
    usage: '§offhere',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        const chatId = msg.key.remoteJid;

        let offChats = {};
        if (fs.existsSync(offPath)) {
            offChats = JSON.parse(fs.readFileSync(offPath));
        }

        offChats[chatId] = {
            disabled: true,
            date: new Date().toISOString()
        };

        fs.writeFileSync(offPath, JSON.stringify(offChats, null, 2));

        await extra.reply(`🔇 Bot turned OFF in this chat. Use §onhere to re-enable.`);
    }
};