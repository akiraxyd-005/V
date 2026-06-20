const fetch = require('node-fetch');

module.exports = {
    name: 'neko',
    category: 'anime',
    description: 'Get random neko image',
    usage: '§neko',
    async execute(sock, msg, args, extra) {
        await extra.reply('⏳ *Finding neko...*');

        try {
            const response = await fetch('https://nekos.life/api/v2/img/neko');
            const data = await response.json();

            if (!data.url) {
                return extra.reply('❌ Failed to fetch neko. Please try again.');
            }

            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: data.url },
                caption: '🐱 *Neko*'
            });

        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to fetch neko.');
        }
    }
};