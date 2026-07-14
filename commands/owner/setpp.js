module.exports = {
    name: 'setpp',
    category: 'settings',
    description: 'Set bot WhatsApp profile picture',
    usage: '§setpp <image> or reply to an image',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        let imageUrl = null;
        let imageBuffer = null;
        
        // Check if replying to an image
        if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            const quotedMsg = msg.message.extendedTextMessage.contextInfo.quotedMessage;
            
            if (quotedMsg.imageMessage) {
                imageUrl = quotedMsg.imageMessage.url;
            } else if (quotedMsg.videoMessage) {
                imageUrl = quotedMsg.videoMessage.url;
            }
        }
        
        // Check if user sent an image directly
        if (msg.message.imageMessage) {
            imageUrl = msg.message.imageMessage.url;
        }
        
        if (!imageUrl) {
            return extra.reply(
                `❌ *Usage:* §setpp\n\n` +
                `• Send an image with §setpp\n` +
                `• Reply to an image with §setpp\n\n` +
                `*Supported formats:* JPG, PNG, WebP`
            );
        }
        
        await extra.reply('⏳ *Updating profile picture...*');
        
        try {
            // Download image
            const response = await fetch(imageUrl);
            imageBuffer = await response.buffer();
            
            // Update profile picture
            await sock.updateProfilePicture(msg.key.remoteJid, imageBuffer);
            
            await extra.reply('✅ Profile picture updated successfully!');
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to update profile picture. Please try again.');
        }
    }
};