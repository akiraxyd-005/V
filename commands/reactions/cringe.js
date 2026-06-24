const Anime_Images = require('anime-images-api');
const API = new Anime_Images();

module.exports = {
    name: 'cringe',
    category: 'reactions',
    description: 'Cringe at something',
    usage: '§cringe',
    async execute(sock, msg, args, extra) {
        const { image } = await API.sfw.cringe();
        
        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: image },
            caption: `😬 *${msg.pushName || 'Someone'}* is cringing!`
        });
    }
};