const fetch = require('node-fetch');

module.exports = {
    name: 'random',
    category: 'anime',
    description: 'Get random anime recommendation',
    usage: '§random',
    async execute(sock, msg, args, extra) {
        await extra.reply('⏳ *Finding random anime...*');

        try {
            const response = await fetch(`https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=50&fields=id,title,main_picture,alternative_titles,synopsis,mean,rank,num_episodes,genres`, {
                headers: {
                    'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID || 'YOUR_MAL_CLIENT_ID'
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                return extra.reply('❌ Failed to fetch random anime.');
            }

            const randomIndex = Math.floor(Math.random() * data.data.length);
            const anime = data.data[randomIndex].node;
            const title = anime.title || 'Unknown';
            const englishTitle = anime.alternative_titles?.en || 'N/A';
            const episodes = anime.num_episodes || 'Unknown';
            const score = anime.mean || 'N/A';
            const synopsis = anime.synopsis || 'No synopsis available.';
            const genres = anime.genres?.map(g => g.name).join(', ') || 'N/A';
            const rank = anime.rank || 'N/A';

            await extra.reply(
                `🎲 *Random Anime:*\n\n` +
                `*Title:* ${title}\n` +
                `*English:* ${englishTitle}\n` +
                `*Episodes:* ${episodes}\n` +
                `*Score:* ${score}\n` +
                `*Rank:* #${rank}\n` +
                `*Genres:* ${genres}\n\n` +
                `*Synopsis:*\n${synopsis.substring(0, 300)}...`
            );

        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to fetch random anime.');
        }
    }
};