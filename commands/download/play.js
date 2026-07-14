const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    category: 'download',
    description: 'Search and play audio from YouTube',
    usage: '§play <song name>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §play <song name>\n\n*Example:* §play Blinding Lights`);
        }

        const query = args.join(' ');
        await extra.reply(`🔍 *Searching for "${query}"...*`);

        try {
            // Search for the video
            const searchResults = await ytSearch(query);
            
            if (!searchResults || !searchResults.videos.length) {
                return extra.reply(`❌ No results found for "${query}".`);
            }

            const video = searchResults.videos[0];
            const videoUrl = video.url;
            const videoTitle = video.title;
            const videoDuration = video.duration.timestamp || 'Unknown';
            const videoViews = video.views || 'Unknown';
            const videoAuthor = video.author.name || 'Unknown';
            const videoThumbnail = video.thumbnail || '';

            await extra.reply(
                `🎵 *Playing Audio*\n\n` +
                `*Title:* ${videoTitle}\n` +
                `*Duration:* ${videoDuration}\n` +
                `*Views:* ${videoViews}\n` +
                `*Channel:* ${videoAuthor}\n\n` +
                `⏳ *Streaming audio...*`
            );

            // Get audio stream
            const stream = ytdl(videoUrl, {
                filter: 'audioonly',
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            });

            // Send audio to WhatsApp
            await sock.sendMessage(msg.key.remoteJid, {
                audio: stream,
                mimetype: 'audio/mpeg',
                fileName: `${videoTitle}.mp3`,
                caption: `🎵 *${videoTitle}*\n\n_Powered by Voltaria Nexus_`
            });

        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to play audio. Please try again.');
        }
    }
};