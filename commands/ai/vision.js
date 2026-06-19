const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: 'vision',
    category: 'ai',
    description: 'Analyze images with AI vision',
    usage: '§vision <image> <question>',
    async execute(sock, msg, args, extra) {
        if (!msg.message.imageMessage && !msg.message.extendedTextMessage) {
            return extra.reply('❌ *Usage:* Reply to or send an image with §vision <question>');
        }
        
        let imageUrl = null;
        let question = args.join(' ') || 'What is in this image?';
        
        // Get image from message
        if (msg.message.imageMessage) {
            imageUrl = msg.message.imageMessage.url;
        } else if (msg.message.extendedTextMessage) {
            const quoted = msg.message.extendedTextMessage.contextInfo.quotedMessage;
            if (quoted && quoted.imageMessage) {
                imageUrl = quoted.imageMessage.url;
            }
        }
        
        if (!imageUrl) {
            return extra.reply('❌ Please send or reply to an image.');
        }
        
        await extra.reply('⏳ *Analyzing image...*');
        
        try {
            // Download image
            const imageResponse = await fetch(imageUrl);
            const imageBuffer = await imageResponse.buffer();
            
            // Convert to base64
            const base64Image = imageBuffer.toString('base64');
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.openaiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4-vision-preview',
                    messages: [
                        {
                            role: 'user',
                            content: [
                                { type: 'text', text: question },
                                { 
                                    type: 'image_url', 
                                    image_url: { 
                                        url: `data:image/jpeg;base64,${base64Image}` 
                                    } 
                                }
                            ]
                        }
                    ],
                    max_tokens: 300
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                return await extra.reply(`❌ *Error:* ${data.error.message}`);
            }
            
            const reply = data.choices[0].message.content;
            await extra.reply(`👁️ *Vision Analysis:*\n\n${reply}`);
            
        } catch (error) {
            console.error(error);
            await extra.reply('❌ *Error:* Failed to analyze image. Please try again later.');
        }
    }
};