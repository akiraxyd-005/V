module.exports = {
    name: 'sora',
    category: 'ai',
    description: 'AI video generation (Sora)',
    usage: '§sora <prompt>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §sora <prompt>\n\nExample: §sora A cat walking on the moon`);
        }
        
        const prompt = args.join(' ');
        
        await extra.reply(`🎬 *Sora Video Generation Request*\n\n` +
            `*Prompt:* ${prompt}\n\n` +
            `_Sora video generation coming soon!_`);
    }
};