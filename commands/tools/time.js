module.exports = {
    name: 'time',
    category: 'tools',
    description: 'Get current time',
    usage: '§time <timezone>',
    async execute(sock, msg, args, extra) {
        const timezone = args[0] || 'UTC';
        
        try {
            const now = new Date();
            const options = {
                timeZone: timezone,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            
            const formatter = new Intl.DateTimeFormat('en-US', options);
            
            await extra.reply(
                `🕐 *Current Time*\n\n` +
                `*Timezone:* ${timezone}\n` +
                `*Time:* ${formatter.format(now)}\n` +
                `*UTC:* ${now.toUTCString()}`
            );
        } catch (error) {
            await extra.reply(`❌ Invalid timezone: ${timezone}`);
        }
    }
};