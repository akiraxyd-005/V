const hmtai = require('hmtai');

module.exports = {
    name: 'yuri',
    category: 'hentai',
    description: 'Get random yuri image',
    usage: '§yuri',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.yuri();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Yuri*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};