module.exports = {
    name: 'botall',
    category: 'admin',
    description: 'Tag all members with bot mention',
    usage: '§botall <message>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        const chat = await sock.groupMetadata(msg.key.remoteJid);
        const participants = chat.participants;
        const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        
        let message = args.length ? args.join(' ') : '📢 Attention everyone!';
        let mentions = [];
        
        for (let participant of participants) {
            if (participant.id !== botNumber) {
                mentions.push(participant.id);
            }
        }
        
        // Add bot mention
        mentions.push(botNumber);
        
        await sock.sendMessage(msg.key.remoteJid, {
            text: `👾 *BOT TAG ALL*\n\n${message}`,
            mentions: mentions
        });
    }
};