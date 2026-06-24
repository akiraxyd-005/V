const Anime_Images = require('anime-images-api');
const API = new Anime_Images();

module.exports = {
    name: 'wave',
    category: 'reactions',
    description: 'Wave at someone',
    usage: '§wave @user or reply to a message',
    async execute(sock, msg, args, extra) {
        let target = null;
        const sender = msg.key.participant || msg.key.remoteJid;
        
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            target = msg.message.extendedTextMessage.contextInfo.participant;
        }
        
        if (!target) {
            return extra.reply('❌ *Usage:* §wave @user or reply to someone\'s message');
        }
        
        const senderName = msg.pushName || 'Someone';
        const targetName = target.split('@')[0];
        
        if (target === sender) {
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: (await API.sfw.wave()).image },
                caption: `👋 *${senderName}* waved at themselves-seek help❤️‍🩹`
            });
            return;
        }
        
        const { image } = await API.sfw.wave();
        
        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: image },
            caption: `👋 *${senderName}* waved at *@${targetName}*!`,
            mentions: [target]
        });
    }
};