module.exports = {
    name: 'lescheck',
    category: 'fun',
    description: 'Check your lesbian level',
    usage: '§lescheck @user',
    async execute(sock, msg, args, extra) {
        let target = msg.key.participant || msg.key.remoteJid;
        
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            target = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            target = msg.message.extendedTextMessage.contextInfo.participant;
        }
        
        const level = Math.floor(Math.random() * 100) + 1;
        const bars = '▓'.repeat(Math.floor(level / 10)) + '░'.repeat(10 - Math.floor(level / 10));
        
        const comments = {
            legendary: [
                'She looks at her bestie at a different angle 🤧💕',
                'Sapphic queen vibes on another level! 👑🌸',
                'She definitely notices women everywhere! 💕👀',
                'Her heart skips for the right ones! 💗✨',
                'Pure lesbian energy radiating! 🌸💫',
                'She walked the sapphic path with pride! 🌺🏳️‍🌈',
                'Living her best sapphic life! 💖🌟',
                'She brings the feminine energy perfectly! 🌙🌸',
                'She knows exactly what she wants! 💎💕',
                'Sapphic love is pure love with her! 🌹💗',
                'She is a lesbian icon! 🌸👑',
                'Her sapphic energy is unmatched! 💫🏳️‍🌈',
                'She is the queen of sapphic love! 👑🌺',
                'Her gay is showing and it\'s beautiful! 💖🌈',
                'She is the definition of sapphic! 📖🌸'
            ],
            high: [
                'Sapphic queen vibes! 👑💕',
                'She definitely notices women! 👀🌸',
                'Her heart is full of sapphic love! 💗✨',
                'She is embracing her truth! 🌸🏳️‍🌈',
                'She has strong sapphic energy! 💫💕',
                'She walks the sapphic walk! 🚶‍♀️🌺',
                'Her sapphic side is shining! ✨🌸',
                'She is a proud member of the community! 💖🏳️‍🌈',
                'She radiates sapphic energy! 🌸🌟',
                'She is confident in her love! 💕💪',
                'Her sapphic energy is beautiful! 🌺💖',
                'She is a sapphic goddess! 🌸👑',
                'She brings the rainbow! 🌈💕',
                'She is living her sapphic truth! 💖✨',
                'Her sapphic vibes are strong! 🌸💫'
            ],
            medium: [
                'She\'s figuring out her sapphic side! 🌸🧐',
                'She has some sapphic energy! 💕😏',
                'She is exploring her identity! 🔍🌺',
                'Her sapphic side is awakening! 🌅🌸',
                'She has sapphic potential! 🌱💕',
                'She is curious about her feelings! 🤔🌸',
                'She is on the sapphic spectrum! 🌈💫',
                'She is discovering herself! 🧭🌸',
                'She has sapphic tendencies! 💕😐',
                'She is finding her path! 🌱🏳️‍🌈',
                'Her sapphic side is growing! 📈🌸',
                'She is becoming more sapphic! 🌊💕',
                'She has some rainbow vibes! 🌈😊',
                'She is in her sapphic era! 🌸🌊',
                'She is learning about herself! 📚💕'
            ],
            low: [
                'She\'s still in the "just friends" phase! 👭😬',
                'Comphet is real with this one! 😬💔',
                'She needs to embrace her truth! 🌸💕',
                'Still looking for the right one! 🔍😐',
                'She\'s in her denial era! 🚫😤',
                'Hiding behind "best friends"! 🤫😬',
                'She needs to figure things out! 🧐🌱',
                'The sapphic is suppressed! 🔒😤',
                'She\'s fighting the gay! ⚔️💀',
                'She needs to free her inner sapphic! 🦋🌸',
                'She is in the closet! 🚪😰',
                'She is scared of her feelings! 😨💕',
                'She is denying her truth! 🚫🌸',
                'She is playing it straight! 🤨🏳️‍🌈',
                'She needs a sapphic awakening! ⏰🌸'
            ],
            verylow: [
                'She\'s in complete denial about her feelings! 🚫💀',
                'She is the sapphic queen of denial! 👑🚫',
                'She is running from her truth! 🏃‍♀️🌸',
                'Her sapphic side is dead! 💀💕',
                'She is the straightest sapphic ever! 🤨😬',
                'She is suppressing everything! 🔒💀',
                'She needs a sapphic intervention! 🚨🌸',
                'She is lost in comphet! 🌐😤',
                'She is fighting her nature! ⚔️💀',
                'Her sapphic is non-existent! 👻🌸',
                'She is in the shadow of denial! 🌑😰',
                'She needs to see the rainbow! 🌈👀',
                'She is the closet queen! 👑🚪',
                'She is playing pretend! 🎭💀',
                'She needs to embrace her sapphic self! 🌸💪'
            ]
        };
        
        let comment;
        if (level >= 90) {
            comment = comments.legendary[Math.floor(Math.random() * comments.legendary.length)];
        } else if (level >= 70) {
            comment = comments.high[Math.floor(Math.random() * comments.high.length)];
        } else if (level >= 50) {
            comment = comments.medium[Math.floor(Math.random() * comments.medium.length)];
        } else if (level >= 30) {
            comment = comments.low[Math.floor(Math.random() * comments.low.length)];
        } else {
            comment = comments.verylow[Math.floor(Math.random() * comments.verylow.length)];
        }
        
        await extra.reply(
            `╔ ❰ 🌸 𝗟𝗘𝗦𝗕𝗜𝗔𝗡 𝗖𝗛𝗘𝗖𝗞 🌸 ❱ ╗\n` +
            `║\n` +
            `║ 💗 𝗔𝗻𝗮𝗹𝘆𝘇𝗶𝗻𝗴: @${target.split('@')[0]}\n` +
            `║ 💖 𝗟𝗲𝘀𝗯𝗶𝗮𝗻 𝗟𝗲𝘃𝗲𝗹: ${level}%\n` +
            `║ [${bars}] 💕\n` +
            `║ ${comment}\n` +
            `╚═════════════╝`,
            { mentions: [target] }
        );
    }
};