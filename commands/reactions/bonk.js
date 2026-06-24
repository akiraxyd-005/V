const Anime_Images = require('anime-images-api');
const API = new Anime_Images();

module.exports = {
    name: 'bonk',
    category: 'reactions',
    description: 'Bonk someone',
    usage: '§bonk @user or reply to a message',
    async execute(sock, msg, args, extra) {
        let target = null;
        const sender = msg.key.participant || msg.key.remoteJid;
        
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            target = msg.message.extendedTextMessage.contextInfo.participant;
        }
        
        if (!target) {
            return extra.reply('❌ *Usage:* §bonk @user or reply to someone\'s message');
        }
        
        const senderName = msg.pushName || 'Someone';
        const targetName = target.split('@')[0];
        
        if (target === sender) {
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: (await API.sfw.bonk()).image },
                caption: `🔨 *${senderName}* bonked themselves! 🤦`
            });
            return;
        }
        
        const { image } = await API.sfw.bonk();
        
        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: image },
            caption: `🔨 *${senderName}* bonked *@${targetName}*!`,
            mentions: [target]
        });
    }
};