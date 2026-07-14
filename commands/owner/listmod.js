const fs = require('fs');
const modsPath = './database/mods.json';

module.exports = {
    name: 'listmod',
    category: 'owner',
    description: 'List all moderators',
    usage: '§listmod',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!fs.existsSync(modsPath)) {
            return extra.reply('✅ No moderators set.');
        }

        const mods = JSON.parse(fs.readFileSync(modsPath));
        const modList = Object.keys(mods);

        if (modList.length === 0) {
            return extra.reply('✅ No moderators set.');
        }

        let list = modList.map((id, i) => {
            return `${i+1}. @${id.split('@')[0]}`;
        }).join('\n');

        await extra.reply(
            `👮 *Moderators*\n\n${list}`,
            { mentions: modList }
        );
    }
};