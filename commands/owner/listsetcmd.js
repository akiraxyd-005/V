const fs = require('fs');
const customPath = './database/customcmd.json';

module.exports = {
    name: 'listsetcmd',
    category: 'owner',
    description: 'List all custom commands',
    usage: '§listsetcmd',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!fs.existsSync(customPath)) {
            return extra.reply('✅ No custom commands set.');
        }

        const custom = JSON.parse(fs.readFileSync(customPath));
        const cmdList = Object.keys(custom);

        if (cmdList.length === 0) {
            return extra.reply('✅ No custom commands set.');
        }

        let list = cmdList.map((cmd, i) => {
            return `${i+1}. ${cmd} → ${custom[cmd].response || custom[cmd]}`;
        }).join('\n');

        await extra.reply(
            `📋 *Custom Commands*\n\n${list}\n\n` +
            `*Total:* ${cmdList.length} commands`
        );
    }
};