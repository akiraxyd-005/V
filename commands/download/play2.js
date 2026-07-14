const ytdl = require('ytdl-core');

module.exports = {
    name: 'play2',
    category: 'download',
    description: 'Play audio from YouTube link',
    usage: '§play2 <YouTube URL>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §play2 <YouTube URL>\n\n*Example:* §play2 https://youtu.be/dQw4w9WgXcQ`);
        }

        const url = args[0];
        
        // Validate YouTube URL
        if (!ytdl.validateURL(url)) {
            return extra.reply('❌ Invalid YouTube URL. Please provide a valid YouTube link.');
        }

        await extra.reply('⏳ *Loading audio from YouTube...*');

        try {
            // Get video info
            const info = await ytdl.getInfo(url);
            const videoTitle = info.videoDetails.title;
            const videoDuration = info.videoDetails.lengthSeconds;
            const videoAuthor = info.videoDetails.author.name;
            const videoViews = info.videoDetails.viewCount;
            
            const durationMinutes = Math.floor(videoDuration / 60);
            const durationSeconds = videoDuration % 60;
            const durationString = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;

            await extra.reply(
                `🎵 *Playing Audio*\n\n` +
                `*Title:* ${videoTitle}\n` +
                `*Duration:* ${durationString}\n` +
                `*Views:* ${parseInt(videoViews).toLocaleString()}\n` +
                `*Channel:* ${videoAuthor}\n\n` +
                `⏳ *Streaming audio...*`
            );

            // Get audio stream
            const stream = ytdl(url, {
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
            await extra.reply('❌ Failed to load audio. Please check the URL and try again.');
        }
    }
};