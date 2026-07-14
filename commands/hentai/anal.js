const hmtai = require('hmtai');

module.exports = {
    name: 'anal',
    category: 'hentai',
    description: 'Get random anal image',
    usage: '§anal',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.anal();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Anal*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};