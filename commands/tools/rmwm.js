module.exports = {
    name: 'rmwm',
    category: 'tools',
    description: 'Remove watermark from image (placeholder)',
    usage: '§rmwm <image> or reply to an image',
    async execute(sock, msg, args, extra) {
        await extra.reply(
            `🖼️ *Watermark Removal*\n\n` +
            `_This feature is coming soon!_\n\n` +
            `For now, try using:\n` +
            `• §removebg (remove background)\n` +
            `• §enhance (enhance image)`
        );
    }
};