module.exports = {
    name: 'vv',
    category: 'tools',
    description: 'View a view-once message',
    usage: '§vv (reply to a view-once message)',
    async execute(sock, msg, args, extra) {
        if (!msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            return extra.reply('❌ Reply to a view-once message.');
        }
        
        const quotedMsg = msg.message.extendedTextMessage.contextInfo.quotedMessage;
        
        // Check if it's a view-once message
        if (quotedMsg.imageMessage?.viewOnce || quotedMsg.videoMessage?.viewOnce) {
            const viewOnceMsg = quotedMsg.imageMessage || quotedMsg.videoMessage;
            
            await extra.reply('📷 *View-Once Message*\n\n_This content has been viewed._');
        } else {
            await extra.reply('❌ This is not a view-once message.');
        }
    }
};