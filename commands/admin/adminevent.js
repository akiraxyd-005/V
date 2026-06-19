const fs = require('fs');
const settingsPath = './database/settings.json';

module.exports = {
    name: 'adminevent',
    category: 'admin',
    description: 'Toggle admin event notifications (join/leave)',
    usage: '§adminevent <on/off>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §adminevent <on/off>\n\nExample: §adminevent on`);
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
        settings[extra.from].adminevent = status === 'on';
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        
        await extra.reply(`✅ Admin event notifications turned *${status.toUpperCase()}* for this group.`);
    }
};