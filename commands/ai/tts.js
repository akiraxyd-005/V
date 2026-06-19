const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: 'tts',
    category: 'ai',
    description: 'Convert text to speech',
    usage: '§tts <text>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §tts <text>\n\nExample: §tts Hello, how are you?`);
        }
        
        const text = args.join(' ');
        await extra.reply('⏳ *Generating speech...*');
        
        try {
            const response = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.openaiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'tts-1',
                    voice: 'nova',
                    input: text
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to generate speech');
            }
            
            const audioBuffer = await response.buffer();
            
            await sock.sendMessage(msg.key.remoteJid, {
                audio: audioBuffer,
                mimetype: 'audio/mpeg',
                fileName: 'tts.mp3'
            });
            
        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to generate speech. Please try again later.');
        }
    }
};