const fs = require('fs');
const settingsPath = './database/owner.json';

module.exports = {
    name: 'autolike',
    category: 'owner',
    description: 'Toggle auto-like on messages',
    usage: '§autolike <on/off>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §autolike <on/off>`);
        }

        const status = args[0].toLowerCase();
        if (!['on', 'off'].includes(status)) {
            return extra.reply('❌ Please specify *on* or *off*.');
        }

        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }

        settings.autolike = status === 'on';
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        await extra.reply(`✅ Auto-like turned *${status.toUpperCase()}*.`);
    }
};