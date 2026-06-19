const fs = require('fs');
const warnsPath = './database/warns.json';

module.exports = {
    name: 'warns',
    category: 'admin',
    description: 'View warnings for a member',
    usage: '§warns @user',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        let target = null;
        
        if (msg.message.extendedTextMessage) {
            target = msg.message.extendedTextMessage.contextInfo.participant;
            if (!target) {
                const mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid;
                if (mentioned && mentioned.length) {
                    target = mentioned[0];
                }
            }
        }
        
        if (!target) {
            return extra.reply('❌ Tag or reply to a user to view their warnings.');
        }
        
        if (!fs.existsSync(warnsPath)) {
            return extra.reply('✅ This user has no warnings.');
        }
        
        let warns = JSON.parse(fs.readFileSync(warnsPath));
        
        if (!warns[extra.from] || !warns[extra.from][target] || warns[extra.from][target].length === 0) {
            return extra.reply(`✅ @${target.split('@')[0]} has no warnings.`);
        }
        
        const userWarns = warns[extra.from][target];
        let warnList = userWarns.map((w, i) => 
            `${i+1}. ${w.reason} (${new Date(w.date).toLocaleDateString()})`
        ).join('\n');
        
        await extra.reply(
            `⚠️ *Warnings for @${target.split('@')[0]}*\n\n` +
            `*Total:* ${userWarns.length}\n\n` +
            `${warnList}`
        );
    }
};