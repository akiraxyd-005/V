const fs = require('fs');
const settingsPath = './database/settings.json';

module.exports = {
    name: 'group',
    category: 'admin',
    description: 'View or change group settings',
    usage: '§group <info/setname/setdesc/setpp>',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        const action = args[0]?.toLowerCase();
        const groupId = msg.key.remoteJid;
        const groupMetadata = await sock.groupMetadata(groupId);
        
        if (!action || action === 'info') {
            const desc = groupMetadata.desc || 'No description';
            const total = groupMetadata.participants.length;
            const admins = groupMetadata.participants.filter(p => p.admin === 'admin').length;
            
            return extra.reply(
                `📋 *Group Info*\n\n` +
                `*Name:* ${groupMetadata.subject}\n` +
                `*ID:* ${groupId}\n` +
                `*Members:* ${total}\n` +
                `*Admins:* ${admins}\n` +
                `*Description:* ${desc}\n` +
                `*Created:* ${new Date(groupMetadata.creation * 1000).toLocaleDateString()}`
            );
        }
        
        if (action === 'setname') {
            const name = args.slice(1).join(' ');
            if (!name) return extra.reply('❌ Provide a new group name.');
            await sock.groupUpdateSubject(groupId, name);
            return extra.reply(`✅ Group name changed to: ${name}`);
        }
        
        if (action === 'setdesc') {
            const desc = args.slice(1).join(' ');
            if (!desc) return extra.reply('❌ Provide a new group description.');
            await sock.groupUpdateDescription(groupId, desc);
            return extra.reply(`✅ Group description updated.`);
        }
        
        if (action === 'setpp') {
            if (!msg.message.imageMessage) {
                return extra.reply('❌ Send an image with caption: §group setpp');
            }
            const buffer = await sock.downloadMediaMessage(msg);
            await sock.updateProfilePicture(groupId, buffer);
            return extra.reply('✅ Group profile picture updated.');
        }
        
        return extra.reply(`❌ Invalid action.\n*Available:* info, setname, setdesc, setpp`);
    }
};