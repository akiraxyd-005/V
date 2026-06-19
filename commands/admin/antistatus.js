const fs = require('fs');
const settingsPath = './database/antistatus.json';

module.exports = {
    name: 'antistatus',
    category: 'admin',
    description: 'Toggle anti-status view protection',
    usage: '§antistatus <on/off>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §antistatus <on/off>\n\nExample: §antistatus on`);
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
        settings[extra.from].antistatus = status === 'on';
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        
        await extra.reply(`✅ Anti-status view protection turned *${status.toUpperCase()}* for this group.`);
    }
};