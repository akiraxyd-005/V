module.exports = {
    name: 'ai info',
    category: 'ai',
    description: 'Information about AI features',
    usage: '§ai info',
    async execute(sock, msg, args, extra) {
        await extra.reply(
            `🤖 *AI Features*\n\n` +
            `*§gpt* - Chat with AI\n` +
            `*§editimg* - Edit images with AI\n` +
            `*§enhance* - Enhance image quality\n` +
            `*§recipe* - Get recipe from ingredients\n` +
            `*§removebg* - Remove background from image\n` +
            `*§sora* - Text to video (coming soon)\n` +
            `*§summarize* - Summarize text\n` +
            `*§transcribe* - Transcribe audio to text\n` +
            `*§tts* - Text to speech\n` +
            `*§upscale* - Upscale image quality\n` +
            `*§vision* - AI image description\n\n` +
            `Powered by OpenAI & other AI services`
        );
    }
};