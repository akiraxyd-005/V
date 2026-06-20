const fetch = require('node-fetch');

module.exports = {
    name: 'animequote',
    category: 'anime',
    description: 'Get random anime quote',
    usage: '§animequote',
    async execute(sock, msg, args, extra) {
        await extra.reply('⏳ *Fetching anime quote...*');

        try {
            const response = await fetch('https://api.animechan.io/v1/quotes/random');
            const data = await response.json();

            if (!data.success || !data.data) {
                return extra.reply('❌ Failed to fetch quote. Please try again.');
            }

            const quote = data.data;
            await extra.reply(
                `💬 *Anime Quote*\n\n` +
                `"${quote.content}"\n\n` +
                `- *${quote.character.name}* (${quote.anime.name})`
            );

        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to fetch quote. Please try again later.');
        }
    }
};