module.exports = {
    name: 'device',
    category: 'info',
    description: 'Show device information',
    usage: '§device',
    async execute(sock, msg, args, extra) {
        const userAgent = msg.message?.deviceSentMessage || 'Unknown';
        
        await extra.reply(
            `📱 *Device Information*\n\n` +
            `*User:* ${msg.pushName || 'Unknown'}\n` +
            `*Platform:* WhatsApp Web\n` +
            `*Chat ID:* ${msg.key.remoteJid}\n` +
            `*Message Type:* ${msg.type || 'Unknown'}`
        );
    }
};