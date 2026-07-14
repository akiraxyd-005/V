const ytdl = require('ytdl-core');

module.exports = {
    name: 'ytmp4',
    category: 'download',
    description: 'Download YouTube video as MP4',
    usage: '§ytmp4 <YouTube URL>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §ytmp4 <YouTube URL>\n\n*Example:* §ytmp4 https://youtu.be/xxxxx`);
        }

        const url = args[0];
        await extra.reply('⏳ *Downloading video...*');

        try {
            // Note: You'll need ytdl-core and ffmpeg
            await extra.reply(
                `🎬 *YouTube MP4 Downloader*\n\n` +
                `*URL:* ${url}\n\n` +
                `_MP4 download requires additional setup._\n\n` +
                `Install: npm install ytdl-core ffmpeg-static`
            );
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to download video. Please try again.');
        }
    }
};