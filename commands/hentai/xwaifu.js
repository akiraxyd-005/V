const hmtai = require('hmtai');

module.exports = {
    name: 'xwaifu',
    category: 'hentai',
    description: 'Get random NSFW waifu image',
    usage: '§xwaifu',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.xwaifu();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *NSFW Waifu*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};