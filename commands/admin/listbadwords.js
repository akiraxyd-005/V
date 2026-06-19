const fs = require('fs');
const badwordsPath = './database/badwords.json';

module.exports = {
    name: 'listbadwords',
    category: 'admin',
    description: 'List all bad words in the filter',
    usage: '§listbadwords',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!fs.existsSync(badwordsPath)) {
            return extra.reply('✅ No badwords set for this group.');
        }
        
        let badwords = JSON.parse(fs.readFileSync(badwordsPath));
        
        if (!badwords[extra.from] || badwords[extra.from].length === 0) {
            return extra.reply('✅ No badwords set for this group.');
        }
        
        const list = badwords[extra.from].map((w, i) => `${i+1}. ${w}`).join('\n');
        await extra.reply(`📋 *Badwords in this group:*\n\n${list}`);
    }
};