const fetch = require('node-fetch');

module.exports = {
    name: 'random',
    category: 'anime',
    description: 'Get random anime recommendation',
    usage: '§random',
    async execute(sock, msg, args, extra) {
        await extra.reply('⏳ *Finding random anime...*');

        try {
            const response = await fetch('https://api.jikan.moe/v4/random/anime');
            const data = await response.json();

            if (!data.data) {
                return extra.reply('❌ Failed to fetch random anime. Please try again.');
            }

            const anime = data.data;
            const title = anime.title || 'Unknown';
            const englishTitle = anime.title_english || 'N/A';
            const episodes = anime.episodes || 'Unknown';
            const score = anime.score || 'N/A';
            const synopsis = anime.synopsis || 'No synopsis available.';
            const genres = anime.genres.map(g => g.name).join(', ') || 'N/A';

            await extra.reply(
                `🎲 *Random Anime:*\n\n` +
                `*Title:* ${title}\n` +
                `*English:* ${englishTitle}\n` +
                `*Episodes:* ${episodes}\n` +
                `*Score:* ${score}\n` +
                `*Genres:* ${genres}\n\n` +
                `*Synopsis:*\n${synopsis.substring(0, 300)}...`
            );

        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to fetch random anime. Please try again later.');
        }
    }
};