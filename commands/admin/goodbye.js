const fs = require('fs');
const settingsPath = './database/settings.json';

module.exports = {
    name: 'goodbye',
    category: 'admin',
    description: 'View goodbye settings',
    usage: '§goodbye',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }
        
        const groupSettings = settings[extra.from] || {};
        const goodbye = groupSettings.goodbye || 'Not set';
        
        await extra.reply(
            `📋 *Goodbye Settings*\n\n` +
            `*Goodbye Message:*\n${goodbye}`
        );
    }
};