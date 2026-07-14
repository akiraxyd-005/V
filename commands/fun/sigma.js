module.exports = {
    name: 'sigma',
    category: 'fun',
    description: 'Check your sigma level',
    usage: '§sigma @user',
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
                'The ultimate sigma! They walk alone and dominate! 🐺👑',
                'They are the alpha of alphas! 🔥🐺',
                'A true lone wolf legend! 🌟🐺',
                'They need no one to succeed! 💪👑',
                'Their sigma energy is unmatched! ⚡🐺',
                'They are the sigma of all sigmas! 🏆🐺',
                'Walking the path of greatness! 🚶👑',
                'They built their own empire! 🏰🔥',
                'A sigma among mortals! 👑🌟',
                'They are the definition of sigma! 📖🐺',
                'Their grind is legendary! 💪📈',
                'They are unstoppable! 🚀🐺',
                'A true independent spirit! 🦅👑',
                'They are the chosen one! 🔮🐺',
                'Sigma energy radiating! ⚡🌟'
            ],
            high: [
                'Strong sigma energy! Independent and unstoppable! 💪🐺',
                'They walk their own path! 🚶🌟',
                'A true lone wolf! 🐺🌙',
                'They don\'t follow, they lead! 👑🔥',
                'Their independence is inspiring! 🦅✨',
                'They have a powerful presence! ⚡👑',
                'They are a natural leader! 👑🌟',
                'Their sigma energy is strong! 💪🐺',
                'They are self-reliant! 🔧🛠️',
                'A true sigma in the making! 🌱🐺',
                'They don\'t need validation! 🚫👑',
                'Their confidence is unmatched! 💯🔥',
                'They are a force to be reckoned with! 💥🐺',
                'They have the heart of a lion! 🦁👑',
                'Their sigma is shining bright! 🌟🐺'
            ],
            medium: [
                'They have some sigma traits! 📈🐺',
                'A mix of sigma and beta! ⚖️😐',
                'They are figuring out their path! 🧐🌱',
                'Their sigma is developing! 📈🌟',
                'They show glimpses of sigma! 👀🐺',
                'They are in their sigma era! 🌊🐺',
                'Their independence is growing! 🌱🦅',
                'They have potential to be sigma! 🌟🐺',
                'A work in progress sigma! 🏗️🐺',
                'They are learning to be independent! 📚🦅',
                'Their sigma is evolving! 🔄🐺',
                'They are finding their way! 🧭🌱',
                'A budding sigma! 🌱🐺',
                'They have some alpha energy! ⚡😐',
                'Their sigma is awakening! 🌅🐺'
            ],
            low: [
                'They are following the crowd! 🐑😬',
                'They need validation from others! 📱😅',
                'They lack independence! 🧩😤',
                'Their sigma is non-existent! 👻😐',
                'They are a total beta! 🥲🐑',
                'They follow trends blindly! 🚶‍♂️🐑',
                'Their confidence is low! 📉😔',
                'They are a people pleaser! 🙏😅',
                'They can\'t stand alone! 🚫🦅',
                'They need a leader to follow! 👑🐑',
                'Their sigma is broken! 💔🐺',
                'They are easily influenced! 🌊😬',
                'They lack self-reliance! 🔧😔',
                'They are a follower! 🚶‍♂️🐑',
                'Their sigma is sleeping! 😴🐺'
            ],
            verylow: [
                'They are the opposite of sigma! 🐑💀',
                'Complete beta energy! 📉😤',
                'They are a total sheep! 🐑🚫',
                'They have no independence! 👻😐',
                'They are the weakest link! 💔🐑',
                'They follow everyone else! 🚶‍♂️🐑',
                'Their sigma is dead! 💀🐺',
                'They are a walking follower! 🚶‍♂️👻',
                'They have no alpha traits! 🚫🐺',
                'They are the pack follower! 🐑🐺',
                'Their confidence is zero! 0️⃣😐',
                'They are a beta king! 👑🥲',
                'They can\'t make decisions! 🤔😅',
                'They need constant approval! 📱😔',
                'They are the sheep of the group! 🐑💀'
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
            `╔ ❰ 🐺 𝗦𝗜𝗚𝗠𝗔 𝗖𝗛𝗘𝗖𝗞 🐺 ❱ ╗\n` +
            `║\n` +
            `║ 💫 𝗔𝗻𝗮𝗹𝘆𝘇𝗶𝗻𝗴: @${target.split('@')[0]}\n` +
            `║ 🔥 𝗦𝗶𝗴𝗺𝗮 𝗟𝗲𝘃𝗲𝗹: ${level}%\n` +
            `║ [${bars}] 🐺\n` +
            `║ ${comment}\n` +
            `╚═════════════╝`,
            { mentions: [target] }
        );
    }
};