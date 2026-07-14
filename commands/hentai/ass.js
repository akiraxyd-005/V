const hmtai = require('hmtai');

module.exports = {
    name: 'ass',
    category: 'hentai',
    description: 'Get random ass image',
    usage: '§ass',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.ass();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Ass*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};