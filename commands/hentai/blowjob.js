const hmtai = require('hmtai');

module.exports = {
    name: 'blowjob',
    category: 'hentai',
    description: 'Get random blowjob image',
    usage: '§blowjob',
    async execute(sock, msg, args, extra) {
        try {
            const image = await hmtai.nsfw.blowjob();
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: image },
                caption: '🔞 *Blowjob*'
            });
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch image. Please try again.');
        }
    }
};