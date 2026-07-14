const hmtai = require('hmtai');

module.exports = {
    name: 'thighs',
    category: 'hentai',
    description: 'Get random thighs image',
    usage: '§thighs',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.thighs();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Thighs*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};