const fetch = require('node-fetch');

module.exports = {
    name: 'music',
    category: 'download',
    description: 'Search and download music',
    usage: '§music <song name>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §music <song name>\n\n*Example:* §music Blinding Lights`);
        }

        const query = args.join(' ');
        await extra.reply(`⏳ *Searching for "${query}"...*`);

        try {
            // Note: You'll need a music API like Spotify, Deezer, or YouTube Music
            await extra.reply(
                `🎵 *Music Search*\n\n` +
                `*Query:* ${query}\n\n` +
                `_Music download requires a premium API._\n\n` +
                `Try using:\n` +
                `• §play ${query}\n` +
                `• §song ${query}`
            );
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to search music. Please try again.');
        }
    }
};