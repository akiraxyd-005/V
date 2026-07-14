module.exports = {
    name: 'setbio',
    category: 'settings',
    description: 'Set bot WhatsApp profile bio',
    usage: '§setbio <text>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(
                `❌ *Usage:* §setbio <text>\n\n` +
                `*Example:* §setbio Powered by Voltaria Nexus\n\n` +
                `*Note:* Max 139 characters`
            );
        }
        
        const bio = args.join(' ');
        
        if (bio.length > 139) {
            return extra.reply('❌ Bio is too long. Maximum 139 characters.');
        }
        
        try {
            await sock.updateProfileStatus(bio);
            await extra.reply(`✅ Bio updated successfully!\n\n*New Bio:* ${bio}`);
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to update bio. Please try again.');
        }
    }
};