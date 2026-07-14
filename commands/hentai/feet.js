const hmtai = require('hmtai');

module.exports = {
    name: 'feet',
    category: 'hentai',
    description: 'Get random feet image',
    usage: '§feet',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.feet();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Feet*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};