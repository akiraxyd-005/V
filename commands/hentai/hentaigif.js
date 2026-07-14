const hmtai = require('hmtai');

module.exports = {
    name: 'hentaigif',
    category: 'hentai',
    description: 'Get random hentai GIF',
    usage: '§hentaigif',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.hentaigif();
            
            await sock.sendMessage(msg.key.remoteJid, {
                video: { url: image },
                caption: '🔞 *Hentai GIF*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch GIF. Please try again.');
        }
    }
};