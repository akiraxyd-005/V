const Anime_Images = require('anime-images-api');
const API = new Anime_Images();

module.exports = {
    name: 'kiss',
    category: 'reactions',
    description: 'Kiss someone',
    usage: '§kiss @user or reply to a message',
    async execute(sock, msg, args, extra) {
        let target = null;
        const sender = msg.key.participant || msg.key.remoteJid;
        
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            target = msg.message.extendedTextMessage.contextInfo.participant;
        }
        
        if (!target) {
            return extra.reply('❌ *Usage:* §kiss @user or reply to someone\'s message');
        }
        
        const senderName = msg.pushName || 'Someone';
        const targetName = target.split('@')[0];
        
        if (target === sender) {
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: (await API.sfw.kiss()).image },
                caption: `💋 *${senderName}* kissed themselves- that's not how people use mirrors vro🥀`
            });
            return;
        }
        
        const { image } = await API.sfw.kiss();
        
        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: image },
            caption: `💋 *${senderName}* kissed *@${targetName}*!`,
            mentions: [target]
        });
    }
};