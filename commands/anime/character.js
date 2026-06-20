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
            const response = await fetch(`https://api.myanimelist.net/v2/characters?q=${encodeURIComponent(query)}&limit=1&fields=id,name,alternative_names,about`, {
                headers: {
                    'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID || 'YOUR_MAL_CLIENT_ID'
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                return extra.reply(`❌ No character found for "${query}".`);
            }

            const character = data.data[0].node;
            const name = character.name || 'Unknown';
            const altNames = character.alternative_names?.join(', ') || 'N/A';
            const about = character.about || 'No description available.';

            await extra.reply(
                `👤 *Character Info:*\n\n` +
                `*Name:* ${name}\n` +
                `*Alternative Names:* ${altNames}\n\n` +
                `*About:*\n${about.substring(0, 400)}...`
            );

        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to fetch character. Make sure you have set MAL_CLIENT_ID.');
        }
    }
};