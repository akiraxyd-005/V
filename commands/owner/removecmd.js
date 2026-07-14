const fs = require('fs');
const customPath = './database/customcmd.json';

module.exports = {
    name: 'removecmd',
    category: 'owner',
    description: 'Remove a custom command',
    usage: '§removecmd <command_name>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §removecmd <command_name>\n\n*Example:* §removecmd hello`);
        }

        const cmdName = args[0].toLowerCase();

        if (!fs.existsSync(customPath)) {
            return extra.reply('❌ No custom commands found.');
        }

        let custom = JSON.parse(fs.readFileSync(customPath));

        if (!custom[cmdName]) {
            return extra.reply(`❌ Command "${cmdName}" not found.`);
        }

        delete custom[cmdName];
        fs.writeFileSync(customPath, JSON.stringify(custom, null, 2));

        await extra.reply(`✅ Removed custom command: ${cmdName}`);
    }
};