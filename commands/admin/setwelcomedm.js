const fs = require('fs');
const settingsPath = './database/settings.json';

module.exports = {
    name: 'setwelcomedm',
    category: 'admin',
    description: 'Set welcome DM message',
    usage: '§setwelcomedm <message>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §setwelcomedm <message>\n\nExample: §setwelcomedm Welcome to the group!`);
        }
        
        const message = args.join(' ');
        
        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }
        
        if (!settings[extra.from]) settings[extra.from] = {};
        settings[extra.from].welcomeDm = message;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        
        await extra.reply(`✅ Welcome DM set to:\n\n"${message}"`);
    }
};