const fetch = require('node-fetch');

module.exports = {
    name: 'foxxgirl',
    category: 'anime',
    description: 'Get random fox girl image',
    usage: '§foxxgirl',
    async execute(sock, msg, args, extra) {
        await extra.reply('⏳ *Finding fox girl...*');

        try {
            const response = await fetch('https://api.waifu.pics/sfw/fox_girl');
            const data = await response.json();

            if (!data.url) {
                return extra.reply('❌ Failed to fetch fox girl. Please try again.');
            }

            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: data.url },
                caption: '🦊 *Fox Girl*'
            });

        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to fetch fox girl.');
        }
    }
};