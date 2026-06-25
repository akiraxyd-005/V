module.exports = {
    name: 'cinfo',
    category: 'info',
    description: 'Get WhatsApp channel information',
    usage: '§cinfo https://whatsapp.com/channel/xxxxx or reply to a channel link',
    async execute(sock, msg, args, extra) {
        let channelLink = null;
        
        // Check if user provided a link in args
        if (args.length > 0) {
            const potentialLink = args[0];
            if (potentialLink.includes('whatsapp.com/channel/')) {
                channelLink = potentialLink;
            }
        }
        
        // Check if replying to a message with a channel link
        if (!channelLink && msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            const quotedMsg = msg.message.extendedTextMessage.contextInfo.quotedMessage;
            if (quotedMsg.conversation) {
                const match = quotedMsg.conversation.match(/https:\/\/whatsapp\.com\/channel\/[^\s]+/);
                if (match) {
                    channelLink = match[0];
                }
            }
            if (quotedMsg.extendedTextMessage?.text) {
                const match = quotedMsg.extendedTextMessage.text.match(/https:\/\/whatsapp\.com\/channel\/[^\s]+/);
                if (match) {
                    channelLink = match[0];
                }
            }
        }
        
        if (!channelLink) {
            return extra.reply(
                `✖ Provide a channel link or reply to one.\n\n` +
                `*Usage:*\n` +
                `• §cinfo https://whatsapp.com/channel/xxxxx\n` +
                `• Reply to a channel link with §cinfo`
            );
        }
        
        await extra.reply('⏳ *Fetching channel information...*');
        
        try {
            // Extract channel ID from link
            const channelIdMatch = channelLink.match(/channel\/([^\/\s]+)/);
            if (!channelIdMatch) {
                return extra.reply('✖ Invalid channel link format.');
            }
            
            const channelId = channelIdMatch[1] + '@newsletter';
            
            // Fetch channel metadata
            const channelMetadata = await sock.groupMetadata(channelId);
            
            const name = channelMetadata.subject || 'Unknown Channel';
            const subscribers = channelMetadata.size || 0;
            const verified = channelMetadata.verified ? '✅ Verified' : '✖ Not Verified';
            const created = channelMetadata.creation ? new Date(channelMetadata.creation * 1000).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }) : 'Unknown';
            const description = channelMetadata.desc || 'No description available.';
            const link = channelLink;
            
            // Format subscriber count
            const subscriberCount = subscribers >= 1000 ? 
                (subscribers / 1000).toFixed(1) + 'K' : 
                subscribers.toString();
            
            await extra.reply(
                `◆ *Channel Information*\n\n` +
                `*Name:* ${name}\n` +
                `*Subscribers:* ${subscriberCount}\n` +
                `*Verified:* ${verified}\n` +
                `*Created:* ${created}\n` +
                `*Link:* ${link}\n\n` +
                `*Description:*\n${description}\n\n` +
                `> ©POWERED BY N£XUS`
            );
            
        } catch (error) {
            console.error(error);
            
            // Check if error is due to invalid channel
            if (error.message?.includes('404')) {
                return extra.reply(
                    `✖ Channel not found.\n\n` +
                    `Please make sure the channel link is valid and the bot can access it.\n` +
                    `*Link provided:* ${channelLink}`
                );
            }
            
            // Check if channel ID format is invalid
            if (error.message?.includes('invalid')) {
                return extra.reply(
                    `✖ Invalid channel ID format.\n\n` +
                    `*Link provided:* ${channelLink}\n` +
                    `Make sure it's a valid WhatsApp channel link.`
                );
            }
            
            await extra.reply(
                `❌ *Error:* Failed to fetch channel information.\n\n` +
                `*Possible reasons:*\n` +
                `• Channel link is invalid\n` +
                `• Channel is private\n` +
                `• Bot is not a member of the channel\n` +
                `• Network error\n\n` +
                `*Link provided:* ${channelLink}`
            );
        }
    }
};