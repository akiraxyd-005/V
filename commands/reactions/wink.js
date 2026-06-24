const Anime_Images = require('anime-images-api');
const API = new Anime_Images();

module.exports = {
    name: 'wink',
    category: 'reactions',
    description: 'Wink at someone',
    usage: '§wink @user',
    async execute(sock, msg, args, extra) {
        let target = 'someone';
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        
        const { image } = await API.sfw.wink();
        
        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: image },
            caption: `😉 *${msg.pushName || 'Someone'}* winked at *@${target.split('@')[0]}*!`,
            mentions: [target]
        });
    }
};