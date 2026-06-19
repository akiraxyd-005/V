const fetch = require('node-fetch');

module.exports = {
    name: 'anime',
    category: 'anime',
    description: 'Search anime information',
    usage: '§anime <anime name>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §anime <anime name>\n\nExample: §anime Naruto`);
        }

        const query = args.join(' ');
        await extra.reply('⏳ *Searching anime...*');

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`);
            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                return extra.reply(`❌ No anime found for "${query}".`);
            }

            const anime = data.data[0];
            const title = anime.title || 'Unknown';
            const englishTitle = anime.title_english || 'N/A';
            const episodes = anime.episodes || 'Unknown';
            const status = anime.status || 'Unknown';
            const score = anime.score || 'N/A';
            const synopsis = anime.synopsis || 'No synopsis available.';
            const genres = anime.genres.map(g => g.name).join(', ') || 'N/A';
            const aired = anime.aired?.string || 'Unknown';
            const url = anime.url || '';

            await extra.reply(
                `🎌 *Anime Info:*\n\n` +
                `*Title:* ${title}\n` +
                `*English:* ${englishTitle}\n` +
                `*Episodes:* ${episodes}\n` +
                `*Status:* ${status}\n` +
                `*Score:* ${score}\n` +
                `*Aired:* ${aired}\n` +
                `*Genres:* ${genres}\n\n` +
                `*Synopsis:*\n${synopsis.substring(0, 300)}...\n\n` +
                `🔗 ${url}`
            );

        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to fetch anime info. Please try again later.');
        }
    }
};