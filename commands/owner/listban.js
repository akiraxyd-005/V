const fs = require('fs');
const bansPath = './database/bans.json';

module.exports = {
    name: 'listban',
    category: 'owner',
    description: 'List all banned users',
    usage: '§listban',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!fs.existsSync(bansPath)) {
            return extra.reply('✅ No users are banned.');
        }

        const bans = JSON.parse(fs.readFileSync(bansPath));
        const banList = Object.keys(bans);

        if (banList.length === 0) {
            return extra.reply('✅ No users are banned.');
        }

        let list = banList.map((id, i) => {
            const ban = bans[id];
            return `${i+1}. @${id.split('@')[0]} - ${ban.reason || 'No reason'} (${new Date(ban.date).toLocaleDateString()})`;
        }).join('\n');

        await extra.reply(
            `🔨 *Banned Users*\n\n${list}`,
            { mentions: banList }
        );
    }
};