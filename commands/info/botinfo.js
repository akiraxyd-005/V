const os = require('os');
const config = require('../../config.json');

module.exports = {
    name: 'botinfo',
    category: 'info',
    description: 'Show bot information',
    usage: '§botinfo',
    async execute(sock, msg, args, extra) {
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        const memory = process.memoryUsage();
        const totalMemory = (memory.heapTotal / 1024 / 1024).toFixed(2);
        const usedMemory = (memory.heapUsed / 1024 / 1024).toFixed(2);
        
        await extra.reply(
            `🤖 *Bot Information*\n\n` +
            `*Name:* ${config.botName || 'VOLTARIA'}\n` +
            `*Version:* ${config.version || '3.4.0'}\n` +
            `*Prefix:* ${config.prefix || '§'}\n` +
            `*Uptime:* ${uptimeString}\n` +
            `*Memory:* ${usedMemory}MB / ${totalMemory}MB\n` +
            `*Platform:* ${os.platform()}\n` +
            `*Node.js:* ${process.version}\n` +
            `*Commands:* ${sock.commands?.size || 0}`
        );
    }
};