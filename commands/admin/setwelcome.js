const fs = require('fs');
const settingsPath = './database/settings.json';

module.exports = {
    name: 'setwelcome',
    category: 'admin',
    description: 'Set welcome message',
    usage: '§setwelcome <message> (use @user for mention)',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §setwelcome <message>\n\nExample: §setwelcome Welcome @user to the group!`);
        }
        
        const message = args.join(' ');
        
        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }
        
        if (!settings[extra.from]) settings[extra.from] = {};
        settings[extra.from].welcome = message;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        
        await extra.reply(`✅ Welcome message set to:\n\n"${message}"`);
    }
};