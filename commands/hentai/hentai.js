const hmtai = require('hmtai');

module.exports = {
    name: 'hentai',
    category: 'hentai',
    description: 'Get random hentai image',
    usage: '§hentai',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.hentai();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Hentai*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};