const Anime_Images = require('anime-images-api');
const API = new Anime_Images();

module.exports = {
    name: 'dance',
    category: 'reactions',
    description: 'Dance with someone',
    usage: '§dance @user or reply to a message',
    async execute(sock, msg, args, extra) {
        let target = null;
        const sender = msg.key.participant || msg.key.remoteJid;
        
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            target = msg.message.extendedTextMessage.contextInfo.participant;
        }
        
        if (!target) {
            return extra.reply('❌ *Usage:* §dance @user or reply to someone\'s message');
        }
        
        const senderName = msg.pushName || 'Someone';
        const targetName = target.split('@')[0];
        
        if (target === sender) {
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: (await API.sfw.dance()).image },
                caption: `💃 *${senderName}* is dancing alone! 🕺`
            });
            return;
        }
        
        const { image } = await API.sfw.dance();
        
        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: image },
            caption: `💃 *${senderName}* is dancing with *@${targetName}*!`,
            mentions: [target]
        });
    }
};