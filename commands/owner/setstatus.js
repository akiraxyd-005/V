module.exports = {
    name: 'setstatus',
    category: 'settings',
    description: 'Set bot WhatsApp status (presence)',
    usage: '§setstatus <online/offline/typing/recording>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(
                `❌ *Usage:* §setstatus <status>\n\n` +
                `*Available statuses:*\n` +
                `• online - Show as online\n` +
                `• offline - Show as offline\n` +
                `• typing - Show as typing\n` +
                `• recording - Show as recording\n\n` +
                `*Example:* §setstatus online`
            );
        }
        
        const status = args[0].toLowerCase();
        const validStatuses = ['online', 'offline', 'typing', 'recording'];
        
        if (!validStatuses.includes(status)) {
            return extra.reply(
                `❌ Invalid status.\n\n` +
                `*Available statuses:* ${validStatuses.join(', ')}`
            );
        }
        
        try {
            await sock.sendPresenceUpdate(status, msg.key.remoteJid);
            await extra.reply(`✅ Status updated to: *${status}*`);
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to update status. Please try again.');
        }
    }
};