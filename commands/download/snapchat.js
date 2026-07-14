module.exports = {
    name: 'snapchat',
    category: 'download',
    description: 'Download Snapchat content',
    usage: '§snapchat <url>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §snapchat <url>\n\n*Example:* §snapchat https://www.snapchat.com/xxxxx`);
        }

        await extra.reply(
            `📸 *Snapchat Downloader*\n\n` +
            `_This feature requires a premium API._\n\n` +
            `Try using:\n` +
            `• §tiktok <url>\n` +
            `• §instagram <url>\n` +
            `• §twitter <url>`
        );
    }
};