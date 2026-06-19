const fs = require('fs');
const warnsPath = './database/warns.json';

module.exports = {
    name: 'warn',
    category: 'admin',
    description: 'Warn a member',
    usage: '§warn @user <reason>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!msg.message.extendedTextMessage) {
            return extra.reply('❌ Reply to or tag the user to warn.');
        }
        
        let target = msg.message.extendedTextMessage.contextInfo.participant;
        if (!target) {
            const mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid;
            if (mentioned && mentioned.length) {
                target = mentioned[0];
            }
        }
        
        if (!target) {
            return extra.reply('❌ Tag or reply to the user to warn.');
        }
        
        const reason = args.length ? args.join(' ') : 'No reason provided';
        
        let warns = {};
        if (fs.existsSync(warnsPath)) {
            warns = JSON.parse(fs.readFileSync(warnsPath));
        }
        
        if (!warns[extra.from]) warns[extra.from] = {};
        if (!warns[extra.from][target]) warns[extra.from][target] = [];
        
        const warnId = warns[extra.from][target].length + 1;
        warns[extra.from][target].push({
            id: warnId,
            reason: reason,
            date: new Date().toISOString(),
            warnedBy: msg.key.participant || msg.key.remoteJid
        });
        
        fs.writeFileSync(warnsPath, JSON.stringify(warns, null, 2));
        
        await extra.reply(
            `⚠️ *Warned @${target.split('@')[0]}*\n\n` +
            `*Reason:* ${reason}\n` +
            `*Warn Count:* ${warns[extra.from][target].length}\n` +
            `*Warn ID:* #${warnId}`
        );
    }
};