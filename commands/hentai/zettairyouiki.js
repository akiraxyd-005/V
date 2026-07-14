const hmtai = require('hmtai');

module.exports = {
    name: 'zettairyouiki',
    category: 'hentai',
    description: 'Get random zettai ryouiki image (thigh-highs)',
    usage: '§zettairyouiki',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.zettaiRyouiki();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Zettai Ryouiki*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};
