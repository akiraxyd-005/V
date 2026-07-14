const ytdl = require('ytdl-core');

module.exports = {
    name: 'ytmp3',
    category: 'download',
    description: 'Download YouTube audio as MP3',
    usage: '§ytmp3 <YouTube URL>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §ytmp3 <YouTube URL>\n\n*Example:* §ytmp3 https://youtu.be/xxxxx`);
        }

        const url = args[0];
        await extra.reply('⏳ *Downloading audio...*');

        try {
            // Note: You'll need ytdl-core and ffmpeg
            await extra.reply(
                `🎵 *YouTube MP3 Downloader*\n\n` +
                `*URL:* ${url}\n\n` +
                `_MP3 download requires additional setup._\n\n` +
                `Install: npm install ytdl-core ffmpeg-static`
            );
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to download audio. Please try again.');
        }
    }
};