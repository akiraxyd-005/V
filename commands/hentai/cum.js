const hmtai = require('hmtai');

module.exports = {
    name: 'cum',
    category: 'hentai',
    description: 'Get random cum image',
    usage: '§cum',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.cum();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Cum*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};