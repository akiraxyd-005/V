const fs = require('fs');
const settingsPath = './database/settings.json';

module.exports = {
    name: 'antibad',
    category: 'admin',
    description: 'Toggle badword filter on/off',
    usage: '§antibad <on/off>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §antibad <on/off>\n\nExample: §antibad on`);
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
        settings[extra.from].antibad = status === 'on';
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        
        await extra.reply(`✅ Badword filter turned *${status.toUpperCase()}* for this group.`);
    }
};