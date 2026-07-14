const fetch = require('node-fetch');

module.exports = {
    name: 'ss',
    category: 'tools',
    description: 'Take a screenshot of a website',
    usage: '§ss <url>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §ss <url>\n\n*Example:* §ss https://google.com`);
        }
        
        const url = args[0];
        await extra.reply('⏳ *Taking screenshot...*');
        
        try {
            const screenshotUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url`;
            
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: screenshotUrl },
                caption: `📸 *Screenshot*\n\n*URL:* ${url}`
            });
        } catch (error) {
            await extra.reply(`❌ Failed to take screenshot. Please try again.`);
        }
    }
};