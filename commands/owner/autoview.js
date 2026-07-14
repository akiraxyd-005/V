const fs = require('fs');
const settingsPath = './database/owner.json';

module.exports = {
    name: 'autoview',
    category: 'owner',
    description: 'Toggle auto-viewing of status updates',
    usage: '§autoview <on/off>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §autoview <on/off>`);
        }

        const status = args[0].toLowerCase();
        if (!['on', 'off'].includes(status)) {
            return extra.reply('❌ Please specify *on* or *off*.');
        }

        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }

        settings.autoview = status === 'on';
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        await extra.reply(`✅ Auto-view turned *${status.toUpperCase()}*.`);
    }
};