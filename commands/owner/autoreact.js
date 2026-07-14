const fs = require('fs');
const settingsPath = './database/owner.json';

module.exports = {
    name: 'autoreact',
    category: 'owner',
    description: 'Toggle auto-reaction to messages',
    usage: '§autoreact <on/off> <emoji>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(
                `❌ *Usage:* §autoreact <on/off> <emoji>\n\n` +
                `*Example:* §autoreact on 👋`
            );
        }

        const status = args[0].toLowerCase();
        if (!['on', 'off'].includes(status)) {
            return extra.reply('❌ Please specify *on* or *off*.');
        }

        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }

        if (status === 'off') {
            settings.autoreact = false;
            fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
            return extra.reply('✅ Auto-react disabled.');
        }

        const emoji = args[1] || '👋';
        settings.autoreact = {
            enabled: true,
            emoji: emoji
        };

        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        await extra.reply(`✅ Auto-react enabled with emoji: ${emoji}`);
    }
};