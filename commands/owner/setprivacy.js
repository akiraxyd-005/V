module.exports = {
    name: 'setprivacy',
    category: 'settings',
    description: 'Set privacy settings',
    usage: '§setprivacy <setting> <value>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (args.length < 2) {
            return extra.reply(
                `❌ *Usage:* §setprivacy <setting> <value>\n\n` +
                `*Settings:*\n` +
                `• lastseen - all, contacts, none\n` +
                `• profile - all, contacts, none\n` +
                `• status - all, contacts, none\n` +
                `• readreceipts - all, none\n` +
                `• groups - all, contacts, none\n\n` +
                `*Examples:*\n` +
                `§setprivacy lastseen none\n` +
                `§setprivacy profile contacts`
            );
        }
        
        const setting = args[0].toLowerCase();
        const value = args[1].toLowerCase();
        
        const validSettings = ['lastseen', 'profile', 'status', 'readreceipts', 'groups'];
        const validValues = ['all', 'contacts', 'none'];
        
        if (!validSettings.includes(setting)) {
            return extra.reply(
                `❌ Invalid setting.\n\n` +
                `*Available settings:* ${validSettings.join(', ')}`
            );
        }
        
        if (!validValues.includes(value) && setting !== 'readreceipts') {
            return extra.reply(
                `❌ Invalid value.\n\n` +
                `*Available values:* ${validValues.join(', ')}`
            );
        }
        
        if (setting === 'readreceipts' && !['all', 'none'].includes(value)) {
            return extra.reply(
                `❌ For readreceipts, use: all or none`
            );
        }
        
        try {
            await sock.updatePrivacySettings(setting, value);
            await extra.reply(`✅ Privacy setting updated!\n\n*${setting}:* ${value}`);
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to update privacy setting. Please try again.');
        }
    }
};