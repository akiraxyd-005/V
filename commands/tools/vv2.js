module.exports = {
    name: 'vv2',
    category: 'tools',
    description: 'View a view-once message (alternative)',
    usage: '§vv2 (reply to a view-once message)',
    async execute(sock, msg, args, extra) {
        if (!msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            return extra.reply('❌ Reply to a view-once message.');
        }
        
        const quotedMsg = msg.message.extendedTextMessage.contextInfo.quotedMessage;
        
        if (quotedMsg.imageMessage?.viewOnce || quotedMsg.videoMessage?.viewOnce) {
            try {
                // Forward the view-once message
                const forwardMsg = {
                    image: quotedMsg.imageMessage || quotedMsg.videoMessage,
                    caption: '📷 *View-Once Message*\n\n_Content has been viewed._'
                };
                
                await sock.sendMessage(msg.key.remoteJid, forwardMsg);
            } catch (error) {
                await extra.reply('❌ Failed to view the message.');
            }
        } else {
            await extra.reply('❌ This is not a view-once message.');
        }
    }
};