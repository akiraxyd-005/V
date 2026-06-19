const fs = require('fs');
const badwordsPath = './database/badwords.json';

module.exports = {
    name: 'removebadword',
    category: 'admin',
    description: 'Remove bad words from the filter list',
    usage: '§removebadword <word>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        const word = args[0]?.toLowerCase();
        
        if (!word) {
            return extra.reply(`❌ *Usage:* §removebadword <word>\n\nExample: §removebadword spam`);
        }
        
        if (!fs.existsSync(badwordsPath)) {
            return extra.reply('❌ No badwords list found.');
        }
        
        let badwords = JSON.parse(fs.readFileSync(badwordsPath));
        
        if (!badwords[extra.from] || !badwords[extra.from].includes(word)) {
            return extra.reply(`⚠️ *${word}* is not in the bad words list.`);
        }
        
        badwords[extra.from] = badwords[extra.from].filter(w => w !== word);
        fs.writeFileSync(badwordsPath, JSON.stringify(badwords, null, 2));
        
        await extra.reply(`✅ Removed *${word}* from bad words list.`);
    }
};