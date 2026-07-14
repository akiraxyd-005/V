module.exports = {
    name: 'restart',
    category: 'owner',
    description: 'Restart the bot',
    usage: '§restart',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        await extra.reply('🔄 *Restarting bot...*');
        
        setTimeout(() => {
            process.exit(0);
        }, 2000);
    }
};