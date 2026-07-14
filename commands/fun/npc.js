module.exports = {
    name: 'npc',
    category: 'fun',
    description: 'Check if someone is an NPC',
    usage: '§npc @user',
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
                'They are the main character! Absolutely iconic! 🎮👑',
                'Protagonist energy on another level! 🌟🔥',
                'They are the hero of this story! 🦸✨',
                'Living their life like a blockbuster movie! 🎬💫',
                'They make their own rules and destiny! 📜👑',
                'Destined for greatness! ⭐🌟',
                'They are the chosen one! 🔮✨',
                'Main character energy radiating! 💫🎮',
                'They lead, others follow! 👑🚶',
                'Walking plot armor! 🛡️🌟',
                'They are the legend in their own story! 📖🔥',
                'Their life is a masterpiece! 🎨👑',
                'They are the one everyone remembers! 🌟🎬',
                'They are the star of the show! ⭐🎭',
                'They have the ultimate protagonist aura! 👑✨'
            ],
            high: [
                'They have strong main character energy! 🌟🎮',
                'They are the hero of their own story! 🦸✨',
                'People remember them! 👀👑',
                'They stand out from the crowd! 🌟🚶',
                'They have a unique personality! 🎭💫',
                'They are a leader, not a follower! 👑🔥',
                'Their energy is captivating! ⚡✨',
                'They are a force of nature! 🌊💪',
                'They have a magnetic presence! 🧲🌟',
                'They are a trendsetter! 🔥👑',
                'They make an impact on others! 💥✨',
                'They are a shining star! ⭐🌟',
                'Their confidence is inspiring! 💯🔥',
                'They are the life of the party! 🎉👑',
                'They have the aura of a leader! 👑✨'
            ],
            medium: [
                'They are a mix of NPC and main character! 🎭😐',
                'They have moments of greatness! ⏳✨',
                'They blend in sometimes! 🫥😐',
                'Average Joe energy! 👤😊',
                'They are neither here nor there! 😐🌿',
                'They have some main character moments! 🌟😏',
                'They are just going with the flow! 🌊😐',
                'Their personality is developing! 🌱✨',
                'They have potential to be more! 🌟📈',
                'They are in the background sometimes! 🎬😐',
                'They follow the crowd sometimes! 🐑😐',
                'They are just vibing through life! 🎵😊',
                'Their story is still being written! 📖✨',
                'They are a side character! 👤😐',
                'They are the friend of the main character! 🤝✨'
            ],
            low: [
                'They are just following the crowd! 🐑😬',
                'Going through the motions! 💤😐',
                'Living in the background! 🎬👻',
                'Default dialogue mode! 📝🤖',
                'Side quest energy! 🗺️😐',
                'Rendering personality... ⏳🔄',
                'Loading character... 💻💤',
                'Just vibing in the background! 🌊😐',
                'No original thoughts detected! 🧠💀',
                'They are filler content! 📺😐',
                'They follow the script! 📜🐑',
                'They have no personality! 👻😐',
                'Just another face in the crowd! 😶🌿',
                'They are background noise! 🔊😐',
                'They don\'t stand out! 🫥👤'
            ],
            verylow: [
                'Complete NPC! They have no original thoughts! 🤖💀',
                'They are filler content! Just background noise! 📺😐',
                'Zero personality detected! 👻📉',
                'They are a walking robot! 🤖🚶',
                'Their brain is on autopilot! 🧠✈️',
                'They have no agency! 🚫🦅',
                'They are a ghost in the system! 👻💻',
                'Their existence is background filler! 🎨😐',
                'They are a waste of dialogue! 💬😬',
                'They have no soul! 👻🌑',
                'They are just a texture on the wall! 🖼️😐',
                'Their life is a loading screen! ⏳💤',
                'They are a glitch in the matrix! 💻😬',
                'They have no purpose! 🎯👻',
                'They are the definition of NPC! 📖🤖'
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
            `╔ ❰ 🎮 𝗡𝗣𝗖 𝗖𝗛𝗘𝗖𝗞 🎮 ❱ ╗\n` +
            `║\n` +
            `║ 💫 𝗔𝗻𝗮𝗹𝘆𝘇𝗶𝗻𝗴: @${target.split('@')[0]}\n` +
            `║ 🤖 𝗡𝗣𝗖 𝗟𝗲𝘃𝗲𝗹: ${level}%\n` +
            `║ [${bars}] 🎮\n` +
            `║ ${comment}\n` +
            `╚═════════════╝`,
            { mentions: [target] }
        );
    }
};