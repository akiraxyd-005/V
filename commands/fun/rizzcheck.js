module.exports = {
    name: 'rizzcheck',
    category: 'fun',
    description: 'Check your rizz (charisma) level',
    usage: '§rizzcheck @user',
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
                'Absolute rizz god! They got unlimited game! 🎯🔥',
                'Their rizz is off the charts! 📈💫',
                'They could charm anyone with a glance! 👀✨',
                'Smooth operator with legendary rizz! 🎩🌟',
                'Their rizz is unmatched in any universe! 🌌🔥',
                'They make rizz look like an art form! 🎨💫',
                'Walking rizz machine! 🤖💕',
                'Their rizz could start a revolution! 🌟🔥',
                'They were born with this rizz! 👶✨',
                'Level 100 rizz right here! 🏆💫',
                'Their rizz is dangerously good! ⚠️😍',
                'They have the rizz of a god! ⚡👑',
                'Their charisma is legendary! 📜🔥',
                'They could rizz their way out of anything! 🗣️💫',
                'Their rizz is pure magic! 🪄✨'
            ],
            high: [
                'They are a smooth operator! 🎩😎',
                'Their rizz is impressive! 🔥💫',
                'They got that natural rizz! 🌊✨',
                'People are drawn to them! 🧲😍',
                'Their charisma is strong! 💪🌟',
                'They know how to charm! 💋✨',
                'Their rizz is top tier! 🏆🔥',
                'They are a natural flirt! 😉💫',
                'Their confidence is attractive! 💯😎',
                'They have great game! 🎯🔥',
                'Their rizz is smooth like butter! 🧈✨',
                'They could talk to anyone! 🗣️💫',
                'Their presence is captivating! 🌟😍',
                'They have the gift of gab! 💬✨',
                'Their rizz is on point! 🎯🔥'
            ],
            medium: [
                'They have some rizz! 😏✨',
                'Their rizz is average! 📊😐',
                'They got a little game! 🎯😅',
                'Their charm is okay! 🤷‍♂️😊',
                'They have potential! 🌱🔥',
                'Their rizz is developing! 📈😏',
                'They are learning the game! 📚😅',
                'Their charisma is decent! 👌😊',
                'They have some smooth moments! ✨😏',
                'Their rizz is workable! 🔧💫',
                'They are getting there! 🚶➡️🔥',
                'Their game is mid! 😐🎯',
                'They have moments of rizz! ⏳✨',
                'Their rizz is a work in progress! 🏗️😅',
                'They are figuring it out! 🤔💫'
            ],
            low: [
                'Their rizz is a bit shaky! 😬🎯',
                'They need some rizz lessons! 📚😅',
                'Their game is weak! 🎮😬',
                'They are struggling! 😅💫',
                'Their charisma is low! 📉😐',
                'They lack confidence! 😔💪',
                'Their rizz is not rizzing! 😬🚫',
                'They are trying too hard! 😅💀',
                'Their game needs work! 🔧😬',
                'They are awkward! 😬🦆',
                'Their rizz is cringe! 😬💀',
                'They are fumbling! 🤦‍♂️🎯',
                'Their charisma is lacking! 😔✨',
                'They are not smooth! 😬🌊',
                'Their rizz is negative! 📉😤'
            ],
            verylow: [
                'Zero rizz detected! 📡💀',
                'They repel everyone! 🧲🚫',
                'Their rizz is non-existent! 👻😐',
                'They have anti-rizz! 🚫🔥',
                'Their game is completely broken! 💔🎯',
                'They are a rizz disaster! 💥😬',
                'Negative rizz energy! 💢📉',
                'They couldn\'t rizz their way out! 🚪😅',
                'Their rizz is dead! 💀😐',
                'They need a rizz intervention! 🚨😬',
                'Their charisma is gone! 👻💫',
                'They are a walking anti-game! 🚫🎮',
                'Their rizz is radioactive! ☢️😬',
                'They are the rizz killer! 💀🔥',
                'Their game is in the grave! 🪦🎯'
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
            `╔ ❰ 🔥 𝗥𝗜𝗭𝗭 𝗖𝗛𝗘𝗖𝗞 🔥 ❱ ╗\n` +
            `║\n` +
            `║ 💫 𝗔𝗻𝗮𝗹𝘆𝘇𝗶𝗻𝗴: @${target.split('@')[0]}\n` +
            `║ 🎯 𝗥𝗶𝘇𝘇 𝗟𝗲𝘃𝗲𝗹: ${level}%\n` +
            `║ [${bars}] 🔥\n` +
            `║ ${comment}\n` +
            `╚═════════════╝`,
            { mentions: [target] }
        );
    }
};