const hmtai = require('hmtai');

module.exports = {
    name: 'boobs',
    category: 'hentai',
    description: 'Get random boobs image',
    usage: '§boobs',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.boobs();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Boobs*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};