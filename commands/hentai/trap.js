const hmtai = require('hmtai');

module.exports = {
    name: 'trap',
    category: 'hentai',
    description: 'Get random trap image',
    usage: '§trap',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.trap();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Trap*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};