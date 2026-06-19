const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: 'gpt',
    category: 'ai',
    description: 'Chat with GPT-4 AI',
    usage: '§gpt <question>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §gpt <question>\n\nExample: §gpt What is the meaning of life?`);
        }
        
        const question = args.join(' ');
        await extra.reply('⏳ *Generating response...*');
        
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
                        { role: 'system', content: 'You are a helpful AI assistant named Voltaria.' },
                        { role: 'user', content: question }
                    ],
                    max_tokens: 500
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                return await extra.reply(`❌ *Error:* ${data.error.message}`);
            }
            
            const reply = data.choices[0].message.content;
            await extra.reply(`🤖 *GPT-4 Response:*\n\n${reply}`);
            
        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to get response from GPT. Please try again later.');
        }
    }
};