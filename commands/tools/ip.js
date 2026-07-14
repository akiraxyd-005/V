const fetch = require('node-fetch');

module.exports = {
    name: 'ip',
    category: 'tools',
    description: 'Get IP information',
    usage: '§ip <ip>',
    async execute(sock, msg, args, extra) {
        const ip = args[0] || await fetch('https://api.ipify.org').then(r => r.text());
        
        try {
            const response = await fetch(`http://ip-api.com/json/${ip}`);
            const data = await response.json();
            
            if (data.status === 'fail') {
                return extra.reply(`❌ Invalid IP address: ${ip}`);
            }
            
            await extra.reply(
                `🌍 *IP Information*\n\n` +
                `*IP:* ${data.query}\n` +
                `*Country:* ${data.country} (${data.countryCode})\n` +
                `*Region:* ${data.regionName}\n` +
                `*City:* ${data.city}\n` +
                `*ISP:* ${data.isp}\n` +
                `*Organization:* ${data.org}\n` +
                `*Timezone:* ${data.timezone}\n` +
                `*Lat/Lon:* ${data.lat}, ${data.lon}`
            );
        } catch (error) {
            await extra.reply(`❌ Failed to fetch IP information.`);
        }
    }
};