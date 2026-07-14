module.exports = {
    name: 'video',
    category: 'download',
    description: 'Download video from various platforms',
    usage: '§video <platform> <url>',
    async execute(sock, msg, args, extra) {
        if (args.length < 2) {
            return extra.reply(
                `❌ *Usage:* §video <platform> <url>\n\n` +
                `*Platforms:* tiktok, instagram, twitter, facebook, youtube\n\n` +
                `*Example:* §video tiktok https://www.tiktok.com/@user/video/xxxxx`
            );
        }

        const platform = args[0].toLowerCase();
        const url = args[1];

        await extra.reply(
            `🎬 *Video Downloader*\n\n` +
            `*Platform:* ${platform}\n` +
            `*URL:* ${url}\n\n` +
            `_Video download requires premium APIs._\n\n` +
            `Try specific commands:\n` +
            `• §tiktok <url>\n` +
            `• §instagram <url>\n` +
            `• §twitter <url>`
        );
    }
};