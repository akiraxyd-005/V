const fs = require('fs');
const slowPath = './database/slowmode.json';

module.exports = {
    name: 'slowmode',
    category: 'owner',
    description: 'Set slow mode for group',
    usage: '§slowmode <seconds>',
    isOwner: true,
    isGroup: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(
                `❌ *Usage:* §slowmode <seconds>\n\n` +
                `*Example:* §slowmode 5\n` +
                `§slowmode off (to disable)`
            );
        }

        const chatId = msg.key.remoteJid;
        let slowData = {};
        if (fs.existsSync(slowPath)) {
            slowData = JSON.parse(fs.readFileSync(slowPath));
        }

        if (args[0].toLowerCase() === 'off') {
            delete slowData[chatId];
            fs.writeFileSync(slowPath, JSON.stringify(slowData, null, 2));
            return extra.reply(`✅ Slow mode disabled.`);
        }

        const seconds = parseInt(args[0]);
        if (isNaN(seconds) || seconds < 1 || seconds > 60) {
            return extra.reply('❌ Please provide a valid number between 1-60 seconds.');
        }

        slowData[chatId] = {
            interval: seconds,
            lastMessage: {}
        };

        fs.writeFileSync(slowPath, JSON.stringify(slowData, null, 2));

        await extra.reply(`✅ Slow mode set to ${seconds} seconds.`);
    }
};