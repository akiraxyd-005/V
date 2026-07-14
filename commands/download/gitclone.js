const { exec } = require('child_process');
const fs = require('fs');

module.exports = {
    name: 'gitclone',
    category: 'download',
    description: 'Clone a GitHub repository',
    usage: '§gitclone <url>',
    isOwner: true,
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §gitclone <url>\n\n*Example:* §gitclone https://github.com/user/repo.git`);
        }

        const url = args[0];
        const repoName = url.split('/').pop().replace('.git', '');
        
        await extra.reply(`⏳ *Cloning repository: ${repoName}...*`);

        exec(`git clone ${url}`, (error, stdout, stderr) => {
            if (error) {
                return extra.reply(`❌ Failed to clone repository.\n\n*Error:* ${error.message}`);
            }

            extra.reply(
                `✅ *Repository Cloned Successfully!*\n\n` +
                `*Name:* ${repoName}\n` +
                `*Location:* ./${repoName}\n\n` +
                `*Output:*\n${stdout || 'Done!'}`
            );
        });
    }
};