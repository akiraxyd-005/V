const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: 'summarize',
    category: 'ai',
    description: 'Summarize long text',
    usage: '§summarize <text>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §summarize <text>\n\nExample: §summarize [long text to summarize]`);
        }
        
        const text = args.join(' ');
        
        if (text.length < 50) {
            return extra.reply('❌ Text is too short. Provide at least 50 characters to summarize.');
        }
        
        await extra.reply('⏳ *Summarizing text...*');
        
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.openaiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { 
                            role: 'system', 
                            content: 'You are a summarization expert. Provide a concise summary of the given text.' 
                        },
                        { 
                            role: 'user', 
                            content: `Summarize this text: ${text}` 
                        }
                    ],
                    max_tokens: 500
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                return await extra.reply(`❌ *Error:* ${data.error.message}`);
            }
            
            const reply = data.choices[0].message.content;
            await extra.reply(`📄 *Summary:*\n\n${reply}`);
            
        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to summarize text. Please try again later.');
        }
    }
};