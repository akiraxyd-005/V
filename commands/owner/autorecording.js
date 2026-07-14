const fs = require('fs');
const settingsPath = './database/owner.json';

module.exports = {
    name: 'autorecording',
    category: 'owner',
    description: 'Toggle auto-recording presence',
    usage: '§autorecording <on/off>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §autorecording <on/off>`);
        }

        const status = args[0].toLowerCase();
        if (!['on', 'off'].includes(status)) {
            return extra.reply('❌ Please specify *on* or *off*.');
        }

        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }

        settings.autorecording = status === 'on';
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        await extra.reply(`✅ Auto-recording turned *${status.toUpperCase()}*.`);
    }
};