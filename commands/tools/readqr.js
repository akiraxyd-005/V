const jimp = require('jimp');
const jsQR = require('jsqr');

module.exports = {
    name: 'readqr',
    category: 'tools',
    description: 'Read QR code from image',
    usage: '§readqr <image> or reply to an image',
    async execute(sock, msg, args, extra) {
        let imageUrl = null;
        
        if (msg.message.imageMessage) {
            imageUrl = msg.message.imageMessage.url;
        } else if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
            imageUrl = msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.url;
        }
        
        if (!imageUrl) {
            return extra.reply('❌ *Usage:* Reply to or send an image containing a QR code.');
        }
        
        await extra.reply('⏳ *Reading QR code...*');
        
        try {
            const response = await fetch(imageUrl);
            const buffer = await response.buffer();
            
            const image = await jimp.read(buffer);
            const { width, height } = image.bitmap;
            
            // Convert to grayscale and get pixel data
            const pixels = [];
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const pixel = jimp.intToRGBA(image.getPixelColor(x, y));
                    pixels.push((pixel.r + pixel.g + pixel.b) / 3);
                }
            }
            
            const code = jsQR(pixels, width, height);
            
            if (code && code.data) {
                await extra.reply(
                    `📱 *QR Code Scanned*\n\n` +
                    `*Content:*\n${code.data}`
                );
            } else {
                await extra.reply('❌ No QR code found in the image.');
            }
        } catch (error) {
            console.error(error);
            await extra.reply('❌ Failed to read QR code. Please try again.');
        }
    }
};