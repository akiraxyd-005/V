module.exports = {
    name: 'tgsticker',
    category: 'download',
    description: 'Convert Telegram sticker to image',
    usage: '§tgsticker <sticker_url>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §tgsticker <sticker_url>\n\n*Example:* §tgsticker https://t.me/addstickers/xxxxx`);
        }

        await extra.reply(
            `🎨 *Telegram Sticker Converter*\n\n` +
            `_This feature requires a premium API._\n\n` +
            `Try using:\n` +
            `• Send the sticker directly\n` +
            `• Use external converter tools`
        );
    }
};