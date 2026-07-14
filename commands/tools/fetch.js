const fetch = require('node-fetch');

module.exports = {
    name: 'fetch',
    category: 'tools',
    description: 'Fetch content from a URL',
    usage: '§fetch <url>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §fetch <url>\n\n*Example:* §fetch https://api.github.com`);
        }
        
        const url = args[0];
        
        try {
            await extra.reply('⏳ *Fetching URL...*');
            
            const response = await fetch(url);
            const content = await response.text();
            
            const preview = content.substring(0, 1500);
            const truncated = content.length > 1500 ? '\n\n... (truncated)' : '';
            
            await extra.reply(
                `🌐 *Fetched URL*\n\n` +
                `*URL:* ${url}\n` +
                `*Status:* ${response.status} ${response.statusText}\n` +
                `*Content-Type:* ${response.headers.get('content-type') || 'Unknown'}\n\n` +
                `*Preview:*\n${preview}${truncated}`
            );
        } catch (error) {
            await extra.reply(`❌ Failed to fetch URL.\n\n*Error:* ${error.message}`);
        }
    }
};