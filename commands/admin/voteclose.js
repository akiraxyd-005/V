const fs = require('fs');
const votesPath = './database/votes.json';

module.exports = {
    name: 'voteclose',
    category: 'admin',
    description: 'Start a vote to close the group',
    usage: '§voteclose',
    isGroup: true,
    isAdmin: true,
    async execute(sock, msg, args, extra) {
        const groupMetadata = await sock.groupMetadata(msg.key.remoteJid);
        const total = groupMetadata.participants.length;
        const needed = Math.floor(total / 2) + 1;
        
        let votes = {};
        if (fs.existsSync(votesPath)) {
            votes = JSON.parse(fs.readFileSync(votesPath));
        }
        
        const voteId = Date.now().toString();
        votes[voteId] = {
            groupId: extra.from,
            initiatedBy: msg.key.participant || msg.key.remoteJid,
            time: Date.now(),
            needed: needed,
            votes: []
        };
        
        fs.writeFileSync(votesPath, JSON.stringify(votes, null, 2));
        
        await extra.reply(
            `🗳️ *Vote to Close Group*\n\n` +
            `*Vote ID:* ${voteId}\n` +
            `*Initiated by:* @${(msg.key.participant || msg.key.remoteJid).split('@')[0]}\n` +
            `*Votes needed:* ${needed}/${total}\n\n` +
            `Reply with §vote yes or §vote no to participate.`
        );
    }
};