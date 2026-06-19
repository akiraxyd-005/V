const fetch = require('node-fetch');

module.exports = {
    name: 'gpt',
    category: 'ai',
    description: 'Chat with GPT AI',
    usage: '§gpt <question>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply('❌ Ask me something!\nExample: §gpt What is the capital of France?');
        }

        const question = args.join(' ');
        const apiKey = global.config?.apiKeys?.openai || process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return extra.reply('❌ OpenAI API key not configured. Please set OPENAI_API_KEY in .env');
        }

        await extra.reply('⏳ *Thinking...*');

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: question }],
                    max_tokens: 500
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error?.message || 'API error');
            }

            const answer = data.choices[0]?.message?.content || 'No response received';
            await extra.reply(`🤖 *GPT:*\n\n${answer}`);
        } catch (error) {
            console.error('GPT Error:', error);
            await extra.reply('❌ Error: ' + error.message);
        }
    }
};