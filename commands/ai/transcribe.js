const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: 'transcribe',
    category: 'ai',
    description: 'Transcribe audio to text',
    usage: '§transcribe <audio>',
    async execute(sock, msg, args, extra) {
        if (!msg.message.audioMessage && !msg.message.extendedTextMessage) {
            return extra.reply('❌ *Usage:* Reply to or send an audio file with §transcribe');
        }
        
        let audioUrl = null;
        
        if (msg.message.audioMessage) {
            audioUrl = msg.message.audioMessage.url;
        } else if (msg.message.extendedTextMessage) {
            const quoted = msg.message.extendedTextMessage.contextInfo.quotedMessage;
            if (quoted && quoted.audioMessage) {
                audioUrl = quoted.audioMessage.url;
            }
        }
        
        if (!audioUrl) {
            return extra.reply('❌ Please send or reply to an audio file.');
        }
        
        await extra.reply('⏳ *Transcribing audio...*');
        
        try {
            const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.openaiKey}`,
                },
                body: JSON.stringify({
                    file: audioUrl,
                    model: 'whisper-1'
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                return await extra.reply(`❌ *Error:* ${data.error.message}`);
            }
            
            await extra.reply(`📝 *Transcription:*\n\n${data.text}`);
            
        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to transcribe audio. Please try again later.');
        }
    }
};