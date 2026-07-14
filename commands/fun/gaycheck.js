module.exports = {
    name: 'gaycheck',
    category: 'fun',
    description: 'Check your gay level',
    usage: '§gaycheck @user',
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
                'He is serving rainbow realness! 🌈👑',
                'Gay icon material right here! 🏳️‍🌈🌟',
                'His gaydar is off the charts! 📡💫',
                'Living his truth loudly and proudly! 🎤🌈',
                'He brings the sparkle and shine! ✨🏳️‍🌈',
                'Pure gay energy radiating everywhere! 💫🌈',
                'He is the moment! 🌟🏳️‍🌈',
                'Gay and proud beyond measure! 💪🌈',
                'He walks the walk and talks the talk! 👑🏳️‍🌈',
                'The rainbow shines brighter with him! 🌈✨',
                'He is a gay legend! 📜🏳️‍🌈',
                'His gay energy is contagious! 🦋🌈',
                'He is a LGBTQ+ icon! 🏳️‍🌈🌟',
                'His gaydar is super accurate! 🎯💫',
                'He is the gay agenda! 📋🌈'
            ],
            high: [
                'He is definitely gay and proud! 🏳️‍🌈💖',
                'His gay energy is strong! 💪🌈',
                'He is embracing his truth! 💫🏳️‍🌈',
                'His gaydar is working well! 📡✨',
                'He radiates rainbow energy! 🌈😊',
                'He is confident in his identity! 💖🌟',
                'He is a proud member of the community! 🏳️‍🌈👑',
                'His gay is showing! 🌈😏',
                'He is living his best gay life! 💖✨',
                'He has strong gay vibes! 🌈💫',
                'He is comfortable in his skin! 🏳️‍🌈😌',
                'His gay energy is beautiful! 🌈💕',
                'He is a shining rainbow! 🌟🏳️‍🌈',
                'He is gay and glowing! ✨💖',
                'He is the rainbow in the storm! 🌈🌧️'
            ],
            medium: [
                'He is figuring things out! 🧐🌈',
                'His gay is developing! 🌱🏳️‍🌈',
                'He has some gay energy! 🌈😏',
                'He is experimenting! 🧪🌈',
                'He is on the spectrum! 🌈💫',
                'He has gay potential! 🌱🌟',
                'He is curious! 🤔🌈',
                'His gay is awakening! 🌅🏳️‍🌈',
                'He is exploring his identity! 🔍🌈',
                'He has gay tendencies! 🌈😐',
                'He is a work in progress! 🏗️🏳️‍🌈',
                'He is finding himself! 🧭🌈',
                'He has some rainbow vibes! 🌈😊',
                'He is in his gay era! 🌊🏳️‍🌈',
                'He is becoming more gay! 📈🌈'
            ],
            low: [
                'He is deep in the closet! 🚪😬',
                'Internalized homophobia detected! 😬💔',
                'He needs to embrace himself! 💕🏳️‍🌈',
                'The gay is suppressed! 🔒😤',
                'He is giving straight energy! 🤨🌈',
                'Still figuring things out... 🧐🌱',
                'He needs to come out! 🏳️‍🌈📢',
                'The gay is giving nothing! 😐💨',
                'He is hiding his true self! 🎭😬',
                'Denial is not just a river! 🌊😤',
                'He is fighting his true self! ⚔️🏳️‍🌈',
                'His gay is sleeping! 😴🌈',
                'He is struggling with identity! 😔💔',
                'He is in denial phase! 🚫🏳️‍🌈',
                'He needs to let go of fear! 😰🌈'
            ],
            verylow: [
                'He is in complete denial! 🚫💀',
                'He is the gayest in denial! 😤🌈',
                'He is running from himself! 🏃‍♂️🏳️‍🌈',
                'His gay is non-existent! 👻🌈',
                'He is the straightest gay ever! 🤨😬',
                'He is suppressing everything! 🔒💀',
                'He needs a gay awakening! ⏰🏳️‍🌈',
                'He is lost in heteronormativity! 🌐😤',
                'He is a walking contradiction! 🤔💔',
                'His gay is dead! 💀🌈',
                'He is the anti-gay! 🚫🏳️‍🌈',
                'He is fighting his nature! ⚔️💀',
                'He is in the shadow of denial! 🌑😰',
                'He needs to see the rainbow! 🌈👀',
                'He is the closet king! 👑🚪'
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
            `╔ ❰ 🌈 𝗚𝗔𝗬 𝗖𝗛𝗘𝗖𝗞 🌈 ❱ ╗\n` +
            `║\n` +
            `║ 💗 𝗔𝗻𝗮𝗹𝘆𝘇𝗶𝗻𝗴: @${target.split('@')[0]}\n` +
            `║ 💖 𝗚𝗮𝘆 𝗟𝗲𝘃𝗲𝗹: ${level}%\n` +
            `║ [${bars}] 🏳️‍🌈\n` +
            `║ ${comment}\n` +
            `╚═════════════╝`,
            { mentions: [target] }
        );
    }
};