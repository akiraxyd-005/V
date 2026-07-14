const { exec } = require('child_process');

module.exports = {
    name: 'update',
    category: 'owner',
    description: 'Update bot from GitHub',
    usage: '§update',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        await extra.reply('⏳ *Updating bot from GitHub...*');

        exec('git pull', (error, stdout, stderr) => {
            if (error) {
                return extra.reply(`❌ Update failed.\n\n*Error:* ${error.message}`);
            }

            if (stdout.includes('Already up to date')) {
                return extra.reply('✅ Bot is already up to date.');
            }

            extra.reply(
                `✅ *Update Successful!*\n\n` +
                `*Output:*\n${stdout.substring(0, 500)}\n\n` +
                `_Bot will restart to apply changes._`
            );

            setTimeout(() => {
                exec('npm install');
                setTimeout(() => {
                    process.exit(0);
                }, 2000);
            }, 3000);
        });
    }
};