const fetch = require('node-fetch');

module.exports = {
    name: 'price',
    category: 'tools',
    description: 'Get cryptocurrency price',
    usage: '§price <symbol>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(
                `❌ *Usage:* §price <symbol>\n\n` +
                `*Examples:*\n` +
                `§price bitcoin\n` +
                `§price eth\n` +
                `§price doge`
            );
        }
        
        const symbol = args[0].toLowerCase();
        
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&include_24hr_change=true`
            );
            const data = await response.json();
            
            if (!data[symbol]) {
                return extra.reply(`❌ Cryptocurrency "${symbol}" not found.`);
            }
            
            const price = data[symbol].usd;
            const change = data[symbol].usd_24h_change?.toFixed(2) || 'N/A';
            const changeEmoji = change > 0 ? '🟢' : change < 0 ? '🔴' : '⚪';
            
            await extra.reply(
                `💰 *Price: ${symbol.toUpperCase()}*\n\n` +
                `*USD:* $${price.toFixed(2)}\n` +
                `*24h Change:* ${changeEmoji} ${change}%`
            );
        } catch (error) {
            await extra.reply('❌ Failed to fetch price. Please try again.');
        }
    }
};