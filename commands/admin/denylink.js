const fs = require('fs');
const allowedPath = './database/allowedlinks.json';

module.exports = {
    name: 'denylink',
    category: 'admin',
    description: 'Remove allowed domain from link filter',
    usage: '§denylink <domain>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §denylink <domain>\n\nExample: §denylink youtube.com`);
        }
        
        const domain = args[0].toLowerCase();
        
        if (!fs.existsSync(allowedPath)) {
            return extra.reply('❌ No allowed links list found.');
        }
        
        let allowed = JSON.parse(fs.readFileSync(allowedPath));
        
        if (!allowed[extra.from] || !allowed[extra.from].includes(domain)) {
            return extra.reply(`⚠️ *${domain}* is not in the allowed list.`);
        }
        
        allowed[extra.from] = allowed[extra.from].filter(d => d !== domain);
        fs.writeFileSync(allowedPath, JSON.stringify(allowed, null, 2));
        
        await extra.reply(`✅ Removed *${domain}* from allowed links list.`);
    }
};