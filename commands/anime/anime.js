const fetch = require('node-fetch');

module.exports = {
    name: 'anime',
    category: 'anime',
    description: 'Search anime using MyAnimeList',
    usage: '§anime <anime name>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §anime <anime name>\n\nExample: §anime Naruto`);
        }

        const query = args.join(' ');
        await extra.reply('⏳ *Searching MyAnimeList...*');

        try {
            const response = await fetch(`https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(query)}&limit=1&fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,media_type,status,genres,num_episodes,rating,studios`, {
                headers: {
                    'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID || 'YOUR_MAL_CLIENT_ID'
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                return extra.reply(`❌ No anime found for "${query}".`);
            }

            const anime = data.data[0].node;
            const title = anime.title || 'Unknown';
            const englishTitle = anime.alternative_titles?.en || 'N/A';
            const episodes = anime.num_episodes || 'Unknown';
            const status = anime.status || 'Unknown';
            const score = anime.mean || 'N/A';
            const synopsis = anime.synopsis || 'No synopsis available.';
            const genres = anime.genres?.map(g => g.name).join(', ') || 'N/A';
            const startDate = anime.start_date || 'Unknown';
            const endDate = anime.end_date || 'Ongoing';
            const rating = anime.rating || 'N/A';
            const mediaType = anime.media_type || 'Unknown';
            const studios = anime.studios?.map(s => s.name).join(', ') || 'N/A';
            const rank = anime.rank || 'N/A';
            const popularity = anime.popularity || 'N/A';
            const members = anime.num_list_users || 'N/A';

            await extra.reply(
                `🎌 *Anime Info:*\n\n` +
                `*Title:* ${title}\n` +
                `*English:* ${englishTitle}\n` +
                `*Type:* ${mediaType}\n` +
                `*Episodes:* ${episodes}\n` +
                `*Status:* ${status}\n` +
                `*Score:* ${score}\n` +
                `*Rank:* #${rank}\n` +
                `*Popularity:* #${popularity}\n` +
                `*Members:* ${members}\n` +
                `*Rating:* ${rating}\n` +
                `*Aired:* ${startDate} to ${endDate}\n` +
                `*Studios:* ${studios}\n` +
                `*Genres:* ${genres}\n\n` +
                `*Synopsis:*\n${synopsis.substring(0, 350)}...`
            );

        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to fetch anime. Make sure you have set MAL_CLIENT_ID in environment variables.');
        }
    }
};