module.exports = {
    name: 'vibecheck',
    category: 'fun',
    description: 'Check your vibe level',
    usage: '§vibecheck @user',
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
                'Their vibe is absolutely immaculate! ✨🌟',
                'They radiate pure positive energy! ☀️💫',
                'A walking good vibe machine! 🎵🌀',
                'They make everyone feel welcome! 🤗💖',
                'Their energy is contagious! ⚡🔥',
                'Chill vibes only with this one! 😎✌️',
                'They light up any room! 💡🌈',
                'The ultimate vibe master! 🎧👑',
                'Pure good vibes all around! 🌈✨',
                'They bring the party everywhere! 🎉🥳',
                'Their vibe is chef\'s kiss! 👨‍🍳💋',
                'They are the vibe president! 🏛️✨',
                'Vibing at maximum capacity! 📈🔥',
                'They are the human embodiment of good vibes! 🧘💫',
                'Their vibe could heal the world! 🌍💚'
            ],
            high: [
                'They radiate positive energy! 🌟✨',
                'Their energy is uplifting! 🚀💫',
                'They have great vibes! 😊🌈',
                'People love being around them! 💕👥',
                'Their vibe is refreshing! 🌊✨',
                'They spread good energy! 🦋🌟',
                'A pleasure to be around! 😌💖',
                'Their vibe is warm and inviting! 🔥🤗',
                'They bring good energy! ✨⚡',
                'Positive vibes only from them! 🌈💫',
                'They are a ray of sunshine! ☀️😊',
                'Their energy is magnetic! 🧲✨',
                'They make the world better! 🌍💚',
                'Their vibe is pure gold! 🥇✨',
                'They are a walking blessing! 🙏🌟'
            ],
            medium: [
                'Their vibe is decent, could be better! 😊👍',
                'They have average vibes today! 😐🌊',
                'Some good vibes, some bad! ⚖️😅',
                'Their vibe is a bit mixed! 🎭✨',
                'Not bad, not great! 😶🌿',
                'Their energy is neutral! 🧘😐',
                'They could use a vibe boost! 🔋⬆️',
                'Their vibe is okay-ish! 🤷‍♂️✨',
                'They have potential for better vibes! 🌱🌟',
                'Their vibe is in the middle! 🎯😐',
                'Not the best, not the worst! 😐👌',
                'Their vibe needs a little work! 🔧✨',
                'They are having an off day! 😔🌧️',
                'Their vibe is just existing! 😐🌿',
                'They could use some positive energy! 💫⬆️'
            ],
            low: [
                'Their vibe is a bit off today! 😬🚫',
                'They are giving negative energy! 😤💢',
                'Bad vibes only from this one! 🚫😒',
                'They need to check their energy! ⚠️🔋',
                'The vibe is not vibing! 💀😐',
                'They are killing the mood! 😒💀',
                'Energy drainer alert! 🪫😤',
                'The vibe is giving... nothing! 😐💨',
                'Their vibe needs a reboot! 🔄🔋',
                'They are radiating bad energy! 💢🌑',
                'Their vibe is questionable! 🤔🚫',
                'They are bringing the mood down! 📉😔',
                'Their energy is off-putting! 😬👎',
                'They need a vibe check ASAP! 🚨⚠️',
                'Their vibe is giving red flags! 🚩😬'
            ],
            verylow: [
                'Their vibe is completely dead! 💀🌑',
                'They are a walking storm cloud! ☁️⚡',
                'Their energy is toxic! ☣️😤',
                'They drain all the fun! 🪫🎉',
                'Their vibe is a disaster! 💥😬',
                'They are killing everyone\'s mood! 💀😒',
                'Their vibe needs an exorcism! 👻🙏',
                'They are a vibe vampire! 🧛‍♂️💀',
                'Their energy is pure chaos! 🌪️😤',
                'They are the vibe destroyer! 💢🔥',
                'Their vibe is radioactive! ☢️😬',
                'They are a walking red flag! 🚩💀',
                'Their energy is suffocating! 😰🌑',
                'They are the ultimate mood killer! 💀🎉',
                'Their vibe is non-existent! 👻😐'
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
            `╔ ❰ ✨ 𝗩𝗜𝗕𝗘 𝗖𝗛𝗘𝗖𝗞 ✨ ❱ ╗\n` +
            `║\n` +
            `║ 🎵 𝗔𝗻𝗮𝗹𝘆𝘇𝗶𝗻𝗴: @${target.split('@')[0]}\n` +
            `║ 🎶 𝗩𝗶𝗯𝗲 𝗟𝗲𝘃𝗲𝗹: ${level}%\n` +
            `║ [${bars}] ✨\n` +
            `║ ${comment}\n` +
            `╚═════════════╝`,
            { mentions: [target] }
        );
    }
};