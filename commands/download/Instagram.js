const fetch = require('node-fetch');

module.exports = {
    name: 'instagram',
    category: 'download',
    description: 'Download Instagram video/reel',
    usage: '§instagram <url>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §instagram <url>\n\n*Example:* §instagram https://www.instagram.com/reel/xxxxx`);
        }

        const url = args[0];
        await extra.reply('⏳ *Downloading Instagram content...*');

        try {
            const response = await fetch(`https://api.instagram.com/oembed?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            if (!data || !data.thumbnail_url) {
                return extra.reply('❌ Failed to fetch Instagram content. Please check the URL.');
            }

            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: data.thumbnail_url },
                caption: `📸 *Instagram*\n\n*Title:* ${data.title || 'No title'}\n*Author:* ${data.author_name || 'Unknown'}\n\n_Note: For videos, please use a dedicated downloader API._`
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to download. Make sure the URL is valid and public.');
        }
    }
};