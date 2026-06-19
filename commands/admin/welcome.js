const fs = require('fs');
const settingsPath = './database/settings.json';

module.exports = {
    name: 'welcome',
    category: 'admin',
    description: 'View welcome message settings',
    usage: '§welcome',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }
        
        const groupSettings = settings[extra.from] || {};
        const welcome = groupSettings.welcome || 'Not set';
        const welcomeDm = groupSettings.welcomeDm || 'Not set';
        
        await extra.reply(
            `📋 *Welcome Settings*\n\n` +
            `*Welcome Message:* ${welcome}\n` +
            `*Welcome DM:* ${welcomeDm}\n\n` +
            `Use §setwelcome to change welcome message\n` +
            `Use §setwelcomedm to change DM message`
        );
    }
};