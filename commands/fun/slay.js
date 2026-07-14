module.exports = {
    name: 'slay',
    category: 'fun',
    description: 'Check your slay level',
    usage: '§slay @user',
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
                'Absolutely slaying! They ate and left no crumbs! 💅🔥',
                'They are serving looks that kill! 👗💀',
                'Living their best life with maximum slay! ✨👑',
                'Main character slay energy! 🎬💫',
                'They woke up like this! Flawless! 🌅✨',
                'Slay queen/king energy radiating! 👑🔥',
                'They ate the whole plate and asked for seconds! 🍽️💅',
                'Pure slay material! 💎✨',
                'They are on fire! 🔥🔥',
                'The slayest of them all! 🌟👑',
                'They are the definition of slay! 📖💅',
                'Their slay game is unmatched! 🎯🔥',
                'They are a fashion icon! 👗🌟',
                'They serve 24/7! ⏰💫',
                'Their slay is legendary! 📜🔥'
            ],
            high: [
                'They are serving looks! 👗✨',
                'They have strong slay energy! 💅🌟',
                'They are killing it! 🔥💫',
                'Their style is on point! 👌✨',
                'They are a fashionista! 👗💅',
                'They bring the heat! 🌶️🔥',
                'Their slay is impressive! 💯✨',
                'They are glowing! ✨🌟',
                'They have the drip! 💧👗',
                'They are serving confidence! 💪✨',
                'Their slay is fire! 🔥💅',
                'They are a trendsetter! 👑🌟',
                'They are slaying the game! 🎯🔥',
                'Their energy is powerful! ⚡✨',
                'They are a slay icon! 🌟💅'
            ],
            medium: [
                'They have some slay moments! 😏✨',
                'Their slay is average! 📊😐',
                'They are trying! 😅💫',
                'They have potential! 🌱🔥',
                'Their style is okay! 👌😊',
                'They are learning to slay! 📚💅',
                'Their slay is developing! 📈✨',
                'They have good days! 🌞😊',
                'Their drip is moderate! 💧😐',
                'They are a work in progress! 🏗️💅',
                'Their slay is growing! 🌱🔥',
                'They have moments of slay! ⏳✨',
                'Their fashion is decent! 👗😐',
                'They are getting there! 🚶➡️💫',
                'Their slay is evolving! 🔄✨'
            ],
            low: [
                'Their slay is weak today! 😬💅',
                'They need a glow-up! ✨⬆️',
                'Their style is questionable! 🤔👗',
                'They are not slaying! 😬🚫',
                'Their drip is dry! 💧💀',
                'They need fashion help! 👗📚',
                'Their slay is missing! 🕵️‍♂️💅',
                'They are struggling! 😅💫',
                'Their outfit is a choice! 🧐👗',
                'They need a makeover! 💄💀',
                'Their slay is broken! 💔🔥',
                'They are a fashion victim! 👗😬',
                'Their style is outdated! 📅👗',
                'They need a stylist! 👗📞',
                'Their slay is sleeping! 😴💅'
            ],
            verylow: [
                'Their slay is completely dead! 💀💅',
                'They are a fashion disaster! 👗💥',
                'Zero slay detected! 📉😬',
                'They are getting slayed! 💢💅',
                'Their drip is drowning! 💧😰',
                'They are a walking fashion crime! 👗🚔',
                'Their slay is non-existent! 👻😐',
                'They need a fashion intervention! 🚨👗',
                'Their outfit is a tragedy! 🎭😬',
                'They are the anti-slay! 🚫💅',
                'Their style is a cry for help! 😢👗',
                'They are a fashion icon... of failure! 📉💅',
                'Their drip is dehydrated! 💧😤',
                'They are the slay killer! 💀🔥',
                'Their fashion sense is gone! 👻👗'
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
            `╔ ❰ 💅 𝗦𝗟𝗔𝗬 𝗖𝗛𝗘𝗖𝗞 💅 ❱ ╗\n` +
            `║\n` +
            `║ 💫 𝗔𝗻𝗮𝗹𝘆𝘇𝗶𝗻𝗴: @${target.split('@')[0]}\n` +
            `║ ✨ 𝗦𝗹𝗮𝘆 𝗟𝗲𝘃𝗲𝗹: ${level}%\n` +
            `║ [${bars}] 💅\n` +
            `║ ${comment}\n` +
            `╚═════════════╝`,
            { mentions: [target] }
        );
    }
};