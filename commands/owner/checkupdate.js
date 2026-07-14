const fetch = require('node-fetch');

module.exports = {
    name: 'checkupdate',
    category: 'owner',
    description: 'Check for bot updates',
    usage: '§checkupdate',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        await extra.reply('⏳ *Checking for updates...*');

        try {
            const response = await fetch(
                'https://api.github.com/repos/akiraxyd-005/Voltaria-v2.0/releases/latest'
            );
            const data = await response.json();

            if (data.tag_name) {
                await extra.reply(
                    `🔄 *Update Check*\n\n` +
                    `*Latest Version:* ${data.tag_name}\n` +
                    `*Current Version:* 3.4.0\n\n` +
                    `*Release Notes:*\n${data.body?.substring(0, 300) || 'No release notes.'}\n\n` +
                    `*Download:* ${data.html_url}`
                );
            } else {
                await extra.reply('✅ You are on the latest version.');
            }
        } catch (error) {
            await extra.reply('❌ Failed to check for updates.');
        }
    }
};