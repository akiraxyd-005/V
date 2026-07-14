module.exports = {
    name: 'capcut',
    category: 'download',
    description: 'Download CapCut template/video',
    usage: '§capcut <url>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §capcut <url>\n\n*Example:* §capcut https://www.capcut.com/t/xxxxx`);
        }

        await extra.reply(
            `🎬 *CapCut Downloader*\n\n` +
            `_This feature requires a premium API._\n\n` +
            `Try using:\n` +
            `• §tiktok <url>\n` +
            `• §instagram <url>\n` +
            `• §ytmp4 <url>`
        );
    }
};