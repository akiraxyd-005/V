module.exports = {
    name: 'hidetag',
    category: 'admin',
    description: 'Send message tagging all members (hides mentions)',
    usage: '§hidetag <message>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply('❌ Provide a message.\nExample: §hidetag Group meeting at 5PM');
        }
        
        const message = args.join(' ');
        const groupMetadata = await sock.groupMetadata(msg.key.remoteJid);
        const participants = groupMetadata.participants.map(p => p.id);
        
        await sock.sendMessage(msg.key.remoteJid, {
            text: `🔇 *HIDDEN TAG*\n\n${message}`,
            mentions: participants
        });
    }
};