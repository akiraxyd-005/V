const hmtai = require('hmtai');

module.exports = {
    name: 'lewd',
    category: 'hentai',
    description: 'Get random lewd image',
    usage: '§lewd',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.lewd();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Lewd*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};