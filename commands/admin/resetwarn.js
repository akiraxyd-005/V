const fs = require('fs');
const warnsPath = './database/warns.json';

module.exports = {
    name: 'resetwarn',
    category: 'admin',
    description: 'Reset warnings for a member',
    usage: '§resetwarn @user',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!msg.message.extendedTextMessage) {
            return extra.reply('❌ Reply to or tag the user to reset warnings.');
        }
        
        let target = msg.message.extendedTextMessage.contextInfo.participant;
        if (!target) {
            const mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid;
            if (mentioned && mentioned.length) {
                target = mentioned[0];
            }
        }
        
        if (!target) {
            return extra.reply('❌ Tag or reply to the user to reset warnings.');
        }
        
        if (!fs.existsSync(warnsPath)) {
            return extra.reply('❌ No warnings found for this user.');
        }
        
        let warns = JSON.parse(fs.readFileSync(warnsPath));
        
        if (!warns[extra.from] || !warns[extra.from][target]) {
            return extra.reply('✅ This user has no warnings.');
        }
        
        delete warns[extra.from][target];
        fs.writeFileSync(warnsPath, JSON.stringify(warns, null, 2));
        
        await extra.reply(`✅ Reset all warnings for @${target.split('@')[0]}.`);
    }
};