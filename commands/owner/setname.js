module.exports = {
    name: 'setname',
    category: 'settings',
    description: 'Set bot WhatsApp profile name',
    usage: '§setname <name>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(
                `❌ *Usage:* §setname <name>\n\n` +
                `*Example:* §setname Voltaria Nexus\n\n` +
                `*Note:* Max 25 characters`
            );
        }
        
        const name = args.join(' ');
        
        if (name.length > 25) {
            return extra.reply('❌ Name is too long. Maximum 25 characters.');
        }
        
        try {
            await sock.updateProfileName(name);
            await extra.reply(`✅ Name updated successfully!\n\n*New Name:* ${name}`);
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to update name. Please try again.');
        }
    }
};