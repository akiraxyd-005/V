const fs = require('fs');
const notesPath = './database/notes.json';

module.exports = {
    name: 'note',
    category: 'tools',
    description: 'Save a note',
    usage: '§note <title> | <content>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(
                `❌ *Usage:* §note <title> | <content>\n\n` +
                `*Example:* §note Shopping | Buy milk and eggs`
            );
        }
        
        const fullText = args.join(' ');
        const [title, ...contentParts] = fullText.split('|').map(s => s.trim());
        
        if (!contentParts.length) {
            return extra.reply('❌ Please provide content after the | separator.');
        }
        
        const content = contentParts.join(' | ');
        const userId = msg.key.participant || msg.key.remoteJid;
        
        let notes = {};
        if (fs.existsSync(notesPath)) {
            notes = JSON.parse(fs.readFileSync(notesPath));
        }
        
        if (!notes[userId]) notes[userId] = [];
        
        const noteId = notes[userId].length + 1;
        notes[userId].push({
            id: noteId,
            title: title || 'Untitled',
            content: content,
            date: new Date().toISOString()
        });
        
        fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
        
        await extra.reply(
            `📝 *Note Saved*\n\n` +
            `*Title:* ${title || 'Untitled'}\n` +
            `*Content:* ${content}\n` +
            `*ID:* #${noteId}\n` +
            `*Date:* ${new Date().toLocaleString()}`
        );
    }
};