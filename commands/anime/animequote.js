const fetch = require('node-fetch');

module.exports = {
    name: 'animequote',
    category: 'anime',
    description: 'Get random anime quote',
    usage: '§animequote',
    async execute(sock, msg, args, extra) {
        await extra.reply('⏳ *Fetching anime quote...*');

        try {
            const response = await fetch('https://animechan.xyz/api/random');
            const data = await response.json();

            if (!data || !data.quote) {
                return extra.reply('❌ Failed to fetch quote. Please try again.');
            }

            await extra.reply(
                `💬 *Anime Quote*\n\n` +
                `"${data.quote}"\n\n` +
                `- *${data.character}* (${data.anime})`
            );

        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to fetch quote. Please try again later.');
        }
    }
};