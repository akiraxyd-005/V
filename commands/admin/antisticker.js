const fs = require('fs');
const settingsPath = './database/antisticker.json';

module.exports = {
    name: 'antisticker',
    category: 'admin',
    description: 'Toggle anti-sticker filter',
    usage: '§antisticker <on/off>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §antisticker <on/off>\n\nExample: §antisticker on`);
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
        settings[extra.from].antisticker = status === 'on';
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        
        await extra.reply(`✅ Anti-sticker filter turned *${status.toUpperCase()}* for this group.`);
    }
};