const fs = require('fs');
const settingsPath = './database/owner.json';

module.exports = {
    name: 'mode',
    category: 'owner',
    description: 'Toggle bot mode (public/private)',
    usage: '§mode <public/private>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §mode <public/private>\n\n*Public:* Anyone can use\n*Private:* Only owner/mods`);
        }

        const mode = args[0].toLowerCase();
        if (!['public', 'private'].includes(mode)) {
            return extra.reply('❌ Please specify *public* or *private*.');
        }

        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }

        settings.mode = mode;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        await extra.reply(`✅ Bot mode set to: *${mode.toUpperCase()}*`);
    }
};