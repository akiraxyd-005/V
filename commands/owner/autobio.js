const fs = require('fs');
const settingsPath = './database/owner.json';

module.exports = {
    name: 'autobio',
    category: 'owner',
    description: 'Toggle auto-updating bio',
    usage: '§autobio <on/off> <interval> <text>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(
                `❌ *Usage:* §autobio <on/off> <interval> <text>\n\n` +
                `*Example:* §autobio on 60 "Voltaria Nexus | ${new Date().toLocaleString()}"`
            );
        }

        const status = args[0].toLowerCase();
        if (!['on', 'off'].includes(status)) {
            return extra.reply('❌ Please specify *on* or *off*.');
        }

        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath));
        }

        if (status === 'off') {
            settings.autobio = false;
            fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
            return extra.reply('✅ Auto-bio disabled.');
        }

        const interval = parseInt(args[1]) || 60;
        const text = args.slice(2).join(' ') || 'Voltaria Nexus | ©NEXUS';

        settings.autobio = {
            enabled: true,
            interval: interval * 1000,
            text: text,
            lastUpdate: Date.now()
        };

        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        await extra.reply(
            `✅ Auto-bio enabled!\n\n` +
            `*Interval:* ${interval} seconds\n` +
            `*Text:* ${text}`
        );
    }
};