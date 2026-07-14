module.exports = {
    name: 'getprivacy',
    category: 'settings',
    description: 'Get current privacy settings',
    usage: '§getprivacy',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        try {
            // Fetch privacy settings
            const privacySettings = await sock.getPrivacySettings();
            
            await extra.reply(
                `🔐 *Privacy Settings*\n\n` +
                `*Last Seen:* ${privacySettings.lastseen || 'Unknown'}\n` +
                `*Profile Photo:* ${privacySettings.profile || 'Unknown'}\n` +
                `*Status:* ${privacySettings.status || 'Unknown'}\n` +
                `*Read Receipts:* ${privacySettings.readreceipts || 'Unknown'}\n` +
                `*Groups:* ${privacySettings.groups || 'Unknown'}\n` +
                `*Voice Calls:* ${privacySettings.voicecalls || 'Unknown'}`
            );
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to fetch privacy settings.');
        }
    }
};