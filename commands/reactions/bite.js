const Anime_Images = require('anime-images-api');
const API = new Anime_Images();

module.exports = {
    name: 'bite',
    category: 'reactions',
    description: 'Bite someone',
    usage: '§bite @user or reply to a message',
    async execute(sock, msg, args, extra) {
        let target = null;
        const sender = msg.key.participant || msg.key.remoteJid;
        
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            const quotedMsg = msg.message.extendedTextMessage.contextInfo.quotedMessage;
            if (quotedMsg) {
                target = msg.message.extendedTextMessage.contextInfo.participant;
            }
        }
        
        if (!target) {
            return extra.reply('❌ *Usage:* §bite @user or reply to someone\'s message');
        }
        
        const senderName = msg.pushName || 'Someone';
        const targetName = target.split('@')[0];
        
        // Check if they're targeting themselves
        if (target === sender) {
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: (await API.sfw.bite()).image },
                caption: `🦷 *${senderName}* bit themselves! 😂`
            });
            return;
        }
        
        const { image } = await API.sfw.bite();
        
        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: image },
            caption: `🦷 *${senderName}* bit *@${targetName}*!`,
            mentions: [target]
        });
    }
};