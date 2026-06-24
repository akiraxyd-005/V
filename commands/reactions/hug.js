const Anime_Images = require('anime-images-api');
const API = new Anime_Images();

module.exports = {
    name: 'hug',
    category: 'reactions',
    description: 'Hug someone',
    usage: '§hug @user',
    async execute(sock, msg, args, extra) {
        let target = 'someone';
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        
        const { image } = await API.sfw.hug();
        
        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: image },
            caption: `🤗 *${msg.pushName || 'Someone'}* hugged *@${target.split('@')[0]}*!`,
            mentions: [target]
        });
    }
};