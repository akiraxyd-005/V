const hmtai = require('hmtai');

module.exports = {
    name: 'creampie',
    category: 'hentai',
    description: 'Get random creampie image',
    usage: '§creampie',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.creampie();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Creampie*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};

