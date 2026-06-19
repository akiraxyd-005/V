const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: 'recipe',
    category: 'ai',
    description: 'Get recipe from ingredients',
    usage: '§recipe <ingredients>',
    async execute(sock, msg, args, extra) {
        if (!args.length) {
            return extra.reply(`❌ *Usage:* §recipe <ingredients>\n\nExample: §recipe chicken, rice, tomatoes`);
        }
        
        const ingredients = args.join(' ');
        await extra.reply('⏳ *Finding recipe...*');
        
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
                            content: 'You are a chef. Provide a detailed recipe using the given ingredients.' 
                        },
                        { 
                            role: 'user', 
                            content: `Create a recipe using these ingredients: ${ingredients}` 
                        }
                    ],
                    max_tokens: 800
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                return await extra.reply(`❌ *Error:* ${data.error.message}`);
            }
            
            const reply = data.choices[0].message.content;
            await extra.reply(`🍳 *Recipe from Ingredients:*\n\n${reply}`);
            
        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to find recipe. Please try again later.');
        }
    }
};