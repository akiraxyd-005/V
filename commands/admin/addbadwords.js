const fs = require('fs');
const path = require('path');
const badwordsPath = path.join(__dirname, '../../database/badwords.json');

module.exports = {
    name: 'addbadword',
    category: 'admin',
    description: 'Add bad words to the filter list',
    usage: '§addbadword <word>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        const word = args[0]?.toLowerCase();
        
        if (!word) {
            return extra.reply(`❌ *Usage:* §addbadword <word>\n\nExample: §addbadword spam`);
        }
        
        let badwords = {};
        if (fs.existsSync(badwordsPath)) {
            badwords = JSON.parse(fs.readFileSync(badwordsPath));
        }
        
        if (!badwords[extra.from]) badwords[extra.from] = [];
        
        if (badwords[extra.from].includes(word)) {
            return extra.reply(`⚠️ *${word}* is already in the bad words list.`);
        }
        
        badwords[extra.from].push(word);
        fs.writeFileSync(badwordsPath, JSON.stringify(badwords, null, 2));
        
        await extra.reply(`✅ Added *${word}* to bad words list.`);
    }
};