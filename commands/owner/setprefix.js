const fs = require('fs');
const configPath = './config.json';

module.exports = {
    name: 'setprefix',
    category: 'owner',
    description: 'Change bot prefix',
    usage: '§setprefix <new_prefix>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §setprefix <new_prefix>\n\n*Example:* §setprefix !`);
        }

        const newPrefix = args[0];

        if (newPrefix.length > 3) {
            return extra.reply('❌ Prefix must be 1-3 characters.');
        }

        let config = require('../../config.json');
        config.prefix = newPrefix;

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

        await extra.reply(`✅ Prefix changed to: *${newPrefix}*`);
    }
};