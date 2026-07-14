const fs = require('fs');
const bansPath = './database/bans.json';

module.exports = {
    name: 'ban',
    category: 'owner',
    description: 'Ban a user from using the bot',
    usage: '§ban @user <reason>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        let target = null;

        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            target = msg.message.extendedTextMessage.contextInfo.participant;
        }

        if (!target) {
            return extra.reply('❌ Tag or reply to a user to ban.');
        }

        const reason = args.length ? args.join(' ') : 'No reason provided';

        let bans = {};
        if (fs.existsSync(bansPath)) {
            bans = JSON.parse(fs.readFileSync(bansPath));
        }

        bans[target] = {
            reason: reason,
            date: new Date().toISOString(),
            bannedBy: msg.key.participant || msg.key.remoteJid
        };

        fs.writeFileSync(bansPath, JSON.stringify(bans, null, 2));

        await extra.reply(
            `🔨 *User Banned*\n\n` +
            `*User:* @${target.split('@')[0]}\n` +
            `*Reason:* ${reason}\n` +
            `*Date:* ${new Date().toLocaleString()}`,
            { mentions: [target] }
        );
    }
};