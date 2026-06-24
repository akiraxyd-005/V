const Anime_Images = require('anime-images-api');
const API = new Anime_Images();

module.exports = {
    name: 'glomp',
    category: 'reactions',
    description: 'Glomp someone',
    usage: '§glomp @user',
    async execute(sock, msg, args, extra) {
        let target = 'someone';
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        
        const { image } = await API.sfw.glomp();
        
        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: image },
            caption: `🤗 *${msg.pushName || 'Someone'}* glomped *@${target.split('@')[0]}*!`,
            mentions: [target]
        });
    }
};