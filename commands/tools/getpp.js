module.exports = {
    name: 'getpp',
    category: 'tools',
    description: 'Get profile picture of a user',
    usage: '§getpp @user or reply to a message',
    async execute(sock, msg, args, extra) {
        let target = msg.key.participant || msg.key.remoteJid;
        
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            target = msg.message.extendedTextMessage.contextInfo.participant;
        }
        
        try {
            const ppUrl = await sock.getProfilePictureUrl(target);
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: ppUrl },
                caption: `🖼️ *Profile Picture*\n\n*User:* @${target.split('@')[0]}`,
                mentions: [target]
            });
        } catch (error) {
            await extra.reply(`❌ No profile picture found for this user.`);
        }
    }
};