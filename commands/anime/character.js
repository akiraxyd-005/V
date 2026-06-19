const fetch = require('node-fetch');

module.exports = {
    name: 'character',
    category: 'anime',
    description: 'Search anime character info',
    usage: '§character <character name>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §character <character name>\n\nExample: §character Naruto`);
        }

        const query = args.join(' ');
        await extra.reply('⏳ *Searching character...*');

        try {
            const response = await fetch(`https://api.jikan.moe/v4/characters?q=${encodeURIComponent(query)}&limit=1`);
            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                return extra.reply(`❌ No character found for "${query}".`);
            }

            const character = data.data[0];
            const name = character.name || 'Unknown';
            const nickname = character.nicknames?.[0] || 'N/A';
            const about = character.about || 'No description available.';
            const url = character.url || '';

            await extra.reply(
                `👤 *Character Info:*\n\n` +
                `*Name:* ${name}\n` +
                `*Nickname:* ${nickname}\n\n` +
                `*About:*\n${about.substring(0, 300)}...\n\n` +
                `🔗 ${url}`
            );

        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to fetch character info. Please try again later.');
        }
    }
};