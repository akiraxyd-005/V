const ytdl = require('ytdl-core');

module.exports = {
    name: 'ytv',
    category: 'download',
    description: 'Download YouTube video',
    usage: '§ytv <YouTube URL>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §ytv <YouTube URL>\n\n*Example:* §ytv https://youtu.be/xxxxx`);
        }

        const url = args[0];
        await extra.reply('⏳ *Downloading YouTube video...*');

        try {
            // Note: You'll need ytdl-core and ffmpeg
            await extra.reply(
                `🎬 *YouTube Video Downloader*\n\n` +
                `*URL:* ${url}\n\n` +
                `_Video download requires additional setup._\n\n` +
                `Install: npm install ytdl-core ffmpeg-static`
            );
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to download video. Please try again.');
        }
    }
};