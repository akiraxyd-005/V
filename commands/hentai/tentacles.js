const hmtai = require('hmtai');

module.exports = {
    name: 'tentacles',
    category: 'hentai',
    description: 'Get random tentacles image',
    usage: '§tentacles',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.tentacles();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Tentacles*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};