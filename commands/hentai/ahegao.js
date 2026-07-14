const hmtai = require('hmtai');

module.exports = {
    name: 'ahegao',
    category: 'hentai',
    description: 'Get random ahegao image',
    usage: '§ahegao',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.ahegao();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Ahegao*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};