module.exports = {
    name: 'groupid',
    category: 'admin',
    description: 'Get group ID',
    usage: '§groupid',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        await extra.reply(`📌 *Group ID:*\n${msg.key.remoteJid}`);
    }
};