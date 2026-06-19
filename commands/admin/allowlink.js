const fs = require('fs');
const allowedPath = './database/allowedlinks.json';

module.exports = {
    name: 'allowlink',
    category: 'admin',
    description: 'Allow specific domains in link filter',
    usage: '§allowlink <domain>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §allowlink <domain>\n\nExample: §allowlink youtube.com`);
        }
        
        const domain = args[0].toLowerCase();
        let allowed = {};
        if (fs.existsSync(allowedPath)) {
            allowed = JSON.parse(fs.readFileSync(allowedPath));
        }
        
        if (!allowed[extra.from]) allowed[extra.from] = [];
        
        if (allowed[extra.from].includes(domain)) {
            return extra.reply(`⚠️ *${domain}* is already allowed.`);
        }
        
        allowed[extra.from].push(domain);
        fs.writeFileSync(allowedPath, JSON.stringify(allowed, null, 2));
        
        await extra.reply(`✅ Added *${domain}* to allowed links list.`);
    }
};