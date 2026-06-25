const config = require('../../config.json');

module.exports = {
    name: 'owner',
    category: 'info',
    description: 'Show bot owner information',
    usage: '§owner',
    async execute(sock, msg, args, extra) {
        const owners = config.owner || ['254108720384'];
        const ownerList = owners.map(o => `• @${o.split('@')[0]}`).join('\n');
        
        await extra.reply(
            `👑 *Bot Owner*\n\n` +
            `${ownerList}\n\n` +
            `📱 *Contact:* wa.me/${owners[0].split('@')[0]}\n` +
            `💬 *Support:* §support`
        );
    }
};