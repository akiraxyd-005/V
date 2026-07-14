const fs = require('fs');
const settingsPath = './database/owner.json';

module.exports = {
    name: 'broadcast',
    category: 'owner',
    description: 'Broadcast a message to all groups',
    usage: '§broadcast <message>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §broadcast <message>\n\n*Example:* §broadcast Bot will be down for maintenance.`);
        }

        const broadcastMsg = args.join(' ');
        await extra.reply('⏳ *Broadcasting message...*');

        try {
            const chats = await sock.getChats();
            let sent = 0;
            let failed = 0;

            for (const chat of chats) {
                if (chat.id._serialized.includes('g.us')) {
                    try {
                        await sock.sendMessage(chat.id._serialized, {
                            text: `📢 *BROADCAST*\n\n${broadcastMsg}\n\n_© Powered by NEXUS_`
                        });
                        sent++;
                    } catch (e) {
                        failed++;
                    }
                }
            }

            await extra.reply(
                `📢 *Broadcast Complete*\n\n` +
                `*Sent:* ${sent} groups\n` +
                `*Failed:* ${failed} groups`
            );
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to broadcast message.');
        }
    }
};