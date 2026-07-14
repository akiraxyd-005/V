const hmtai = require('hmtai');

module.exports = {
    name: 'masturbation',
    category: 'hentai',
    description: 'Get random masturbation image',
    usage: '§masturbation',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.masturbation();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Masturbation*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};