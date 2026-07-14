const hmtai = require('hmtai');

module.exports = {
    name: 'panties',
    category: 'hentai',
    description: 'Get random panties image',
    usage: '§panties',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.panties();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Panties*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};