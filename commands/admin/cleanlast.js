module.exports = {
    name: 'cleanlast',
    category: 'admin',
    description: 'Delete last X messages',
    usage: '§cleanlast <number>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        const count = parseInt(args[0]);
        
        if (!count || count < 1 || count > 100) {
            return extra.reply('❌ Provide a number between 1-100.\nExample: §cleanlast 10');
        }
        
        const messages = await sock.loadMessages(msg.key.remoteJid, count + 1);
        
        for (let message of messages) {
            try {
                await sock.sendMessage(msg.key.remoteJid, {
                    delete: message.key
                });
            } catch (e) {
                // Skip if can't delete
            }
        }
        
        await extra.reply(`✅ Deleted last ${count} messages.`);
    }
};