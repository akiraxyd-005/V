const fs = require('fs');
const settingsPath = './database/animenews.json';

module.exports = {
    name: 'animenews',
    category: 'anime',
    description: 'Toggle anime news auto-send in group',
    usage: '§animenews <on/off>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §animenews <on/off>\n\nExample: §animenews on`);
        }

        const status = args[0].toLowerCase();
        if (!['on', 'off'].includes(status)) {
            return extra.reply('❌ Please specify *on* or *off*.');
        }

        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }

        if (!settings[extra.from]) settings[extra.from] = {};
        settings[extra.from].animenews = status === 'on';
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        await extra.reply(`✅ Anime news auto-send turned *${status.toUpperCase()}* for this group.`);
    }
};