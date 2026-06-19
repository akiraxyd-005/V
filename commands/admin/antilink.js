const fs = require('fs');
const settingsPath = './database/antilink.json';

module.exports = {
    name: 'antilink',
    category: 'admin',
    description: 'Toggle link filter on/off',
    usage: '§antilink <on/off>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §antilink <on/off>\n\nExample: §antilink on`);
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
        settings[extra.from].antilink = status === 'on';
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        
        await extra.reply(`✅ Link filter turned *${status.toUpperCase()}* for this group.`);
    }
};