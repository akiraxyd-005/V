const fetch = require('node-fetch');

module.exports = {
    name: 'trt',
    category: 'tools',
    description: 'Translate text',
    usage: '§trt <target_lang> <text>',
    async execute(sock, msg, args, extra) {
        if (args.length < 2) {
            return extra.reply(
                `❌ *Usage:* §trt <target_lang> <text>\n\n` +
                `*Examples:*\n` +
                `§trt es Hello world\n` +
                `§trt fr How are you?\n\n` +
                `*Common codes:* en, es, fr, de, ja, zh, ar`
            );
        }
        
        const targetLang = args[0];
        const text = args.slice(1).join(' ');
        
        try {
            const response = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
            );
            const data = await response.json();
            
            if (data.responseStatus === 200) {
                await extra.reply(
                    `🌐 *Translation*\n\n` +
                    `*Original:* ${text}\n` +
                    `*Translated:* ${data.responseData.translatedText}\n` +
                    `*Language:* ${targetLang.toUpperCase()}`
                );
            } else {
                await extra.reply(`❌ Translation failed. Please try again.`);
            }
        } catch (error) {
            await extra.reply(`❌ Failed to translate text.`);
        }
    }
};