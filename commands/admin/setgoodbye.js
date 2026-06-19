const fs = require('fs');
const settingsPath = './database/settings.json';

module.exports = {
    name: 'setgoodbye',
    category: 'admin',
    description: 'Set goodbye message',
    usage: '§setgoodbye <message> (use @user for mention)',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §setgoodbye <message>\n\nExample: §setgoodbye @user left the group!`);
        }
        
        const message = args.join(' ');
        
        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }
        
        if (!settings[extra.from]) settings[extra.from] = {};
        settings[extra.from].goodbye = message;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        
        await extra.reply(`✅ Goodbye message set to:\n\n"${message}"`);
    }
};