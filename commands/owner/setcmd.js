const fs = require('fs');
const customPath = './database/customcmd.json';

module.exports = {
    name: 'setcmd',
    category: 'owner',
    description: 'Set a custom command',
    usage: '§setcmd <command_name> <response>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (args.length < 2) {
            return extra.reply(
                `❌ *Usage:* §setcmd <command_name> <response>\n\n` +
                `*Example:* §setcmd hello Hello there!`
            );
        }

        const cmdName = args[0].toLowerCase();
        const response = args.slice(1).join(' ');

        let custom = {};
        if (fs.existsSync(customPath)) {
            custom = JSON.parse(fs.readFileSync(customPath));
        }

        custom[cmdName] = {
            response: response,
            created: new Date().toISOString()
        };

        fs.writeFileSync(customPath, JSON.stringify(custom, null, 2));

        await extra.reply(`✅ Custom command created!\n\n*Command:* ${cmdName}\n*Response:* ${response}`);
    }
};