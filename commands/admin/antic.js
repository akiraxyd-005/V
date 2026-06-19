const fs = require('fs');
const settingsPath = './database/antic.json';

module.exports = {
    name: 'antic',
    category: 'admin',
    description: 'Toggle anti-command spam protection',
    usage: '§antic <on/off>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §antic <on/off>\n\nExample: §antic on`);
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
        settings[extra.from].antic = status === 'on';
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        
        await extra.reply(`✅ Anti-command spam protection turned *${status.toUpperCase()}* for this group.`);
    }
};