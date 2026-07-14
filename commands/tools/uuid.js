const crypto = require('crypto');

module.exports = {
    name: 'uuid',
    category: 'tools',
    description: 'Generate a UUID',
    usage: '§uuid <count>',
    async execute(sock, msg, args, extra) {
        const count = Math.min(parseInt(args[0]) || 1, 5);
        
        let uuids = [];
        for (let i = 0; i < count; i++) {
            uuids.push(crypto.randomUUID());
        }
        
        await extra.reply(
            `🔑 *Generated UUID${count > 1 ? 's' : ''}*\n\n` +
            uuids.map((uuid, i) => `${i+1}. ${uuid}`).join('\n')
        );
    }
};