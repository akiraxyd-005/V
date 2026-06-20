const fetch = require('node-fetch');

module.exports = {
    name: 'waifu',
    category: 'anime',
    description: 'Get random waifu image',
    usage: '§waifu',
    async execute(sock, msg, args, extra) {
        await extra.reply('⏳ *Finding waifu...*');

        try {
            const response = await fetch('https://api.waifu.pics/sfw/waifu');
            const data = await response.json();

            if (!data.url) {
                return extra.reply('❌ Failed to fetch waifu. Please try again.');
            }

            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: data.url },
                caption: '🌸 *Waifu*'
            });

        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to fetch waifu.');
        }
    }
};