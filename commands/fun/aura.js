module.exports = {
    name: 'aura',
    category: 'fun',
    description: 'Check your aura level',
    usage: '§aura @user',
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
                'Their aura is glowing brighter than the sun! ☀️✨',
                'A divine golden aura surrounds them! 👑🌟',
                'They have the aura of a celestial being! 🌌✨',
                'Their aura is blindingly beautiful! 💫😍',
                'Pure light radiates from them! ✨🙏',
                'They have the aura of a legend! 📜👑',
                'Their aura is otherworldly! 🌠✨',
                'A magical aura enchants everyone! 🪄💫',
                'They are radiating pure divinity! 🙌✨',
                'Their aura is a masterpiece! 🎨🌟',
                'They have the aura of a king/queen! 👑✨',
                'Their energy is absolutely divine! 😇💫',
                'They are walking on sunshine! ☀️🚶',
                'Their aura is priceless! 💎✨',
                'They have the aura of a warrior! ⚔️🌟'
            ],
            high: [
                'A powerful golden aura surrounds them! 🌟✨',
                'Their aura is bright and warm! ☀️😊',
                'They have a magnetic aura! 🧲💫',
                'Their energy is uplifting! 🚀✨',
                'A beautiful aura radiates from them! 🌸💖',
                'They have a protective aura! 🛡️🌟',
                'Their aura is calm and peaceful! 🕊️😌',
                'A confident aura surrounds them! 💪✨',
                'Their aura is pure and kind! 😇💫',
                'They have a leader\'s aura! 👑🌟',
                'Their aura is inspiring! 🌟🙌',
                'A loving aura embraces everyone! 💕🤗',
                'Their energy is contagious! ⚡🔥',
                'They have a radiant aura! ☀️✨',
                'Their aura is gentle and warm! 🌅😊'
            ],
            medium: [
                'Their aura is calm and steady! 🌊😐',
                'A neutral aura surrounds them! 🧘😶',
                'Their aura is a bit cloudy! ☁️😐',
                'They have an average aura! 📊😊',
                'Their energy is balanced! ⚖️😌',
                'A quiet aura rests on them! 🌙😐',
                'Their aura is ordinary today! 👤😐',
                'They have a subtle aura! 🌫️😊',
                'Their energy is in the middle! 🎯😐',
                'A standard aura surrounds them! 📏😐',
                'Their aura is nothing special! 😶🌿',
                'They have a calm aura! 🌊😌',
                'Their energy is neutral! 🧘😐',
                'A simple aura surrounds them! 🌱😊',
                'Their aura is just existing! 🌿😐'
            ],
            low: [
                'Their aura feels a bit cloudy! ☁️😬',
                'Dark energy is creeping in! 🌑😰',
                'Their aura is dim and dull! 💡😐',
                'A heavy presence surrounds them! 🌫️😤',
                'Their aura needs cleansing! 🧹🌑',
                'They have a blocked aura! 🚫✨',
                'Their energy is draining! 🪫😤',
                'A shadow hangs over them! 🌚😰',
                'Their aura is fading! 📉😬',
                'They have a weakened aura! 💔😐',
                'Their energy is low! 🔋📉',
                'A dark cloud follows them! ☁️🌑',
                'Their aura is polluted! ☣️😤',
                'They have a stagnant aura! 🪴😐',
                'Their energy is blocked! 🔒😬'
            ],
            verylow: [
                'Their aura is completely dim! 🌑💀',
                'Pure darkness radiates from them! 🌚😰',
                'Their aura is dead and lifeless! 💀🌑',
                'They have the aura of a void! 🕳️😬',
                'Their energy is toxic! ☣️😤',
                'A dark presence surrounds them! 👻🌑',
                'Their aura is corrupted! 💀⚡',
                'They have no aura left! 👻😐',
                'Their energy is suffocating! 😰🌑',
                'A demonic aura surrounds them! 😈🌑',
                'Their aura is completely blocked! 🚫💀',
                'They are radiating pure darkness! 🌑⚡',
                'Their aura is a disaster! 💥🌑',
                'They have the aura of a ghost! 👻😰',
                'Their energy is non-existent! 💀🌿'
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
            `╔ ❰ 🌟 𝗔𝗨𝗥𝗔 𝗖𝗛𝗘𝗖𝗞 🌟 ❱ ╗\n` +
            `║\n` +
            `║ 💫 𝗔𝗻𝗮𝗹𝘆𝘇𝗶𝗻𝗴: @${target.split('@')[0]}\n` +
            `║ ✨ 𝗔𝘂𝗿𝗮 𝗟𝗲𝘃𝗲𝗹: ${level}%\n` +
            `║ [${bars}] 🌟\n` +
            `║ ${comment}\n` +
            `╚═════════════╝`,
            { mentions: [target] }
        );
    }
};