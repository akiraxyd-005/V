const fs = require('fs');
const schedulePath = './database/schedule.json';

module.exports = {
    name: 'schedule',
    category: 'tools',
    description: 'Schedule a message',
    usage: '§schedule <time> <message>',
    async execute(sock, msg, args, extra) {
        if (args.length < 2) {
            return extra.reply(
                `❌ *Usage:* §schedule <time> <message>\n\n` +
                `*Time formats:*\n` +
                `• 10:30 - Today at 10:30 AM\n` +
                `• 14:00 - Today at 2:00 PM\n` +
                `• 2026-07-15 15:00 - Specific date\n\n` +
                `*Example:* §schedule 14:30 Meeting with team`
            );
        }
        
        const timeStr = args[0];
        const message = args.slice(1).join(' ');
        
        let scheduledTime;
        try {
            // Try parsing as time (HH:MM)
            if (timeStr.match(/^\d{1,2}:\d{2}$/)) {
                const [hours, minutes] = timeStr.split(':').map(Number);
                const now = new Date();
                scheduledTime = new Date(now);
                scheduledTime.setHours(hours, minutes, 0, 0);
                if (scheduledTime < now) {
                    scheduledTime.setDate(scheduledTime.getDate() + 1);
                }
            } else {
                scheduledTime = new Date(timeStr);
            }
            
            if (isNaN(scheduledTime.getTime())) {
                throw new Error('Invalid time');
            }
        } catch (error) {
            return extra.reply(
                `❌ Invalid time format.\n\n` +
                `*Examples:*\n` +
                `§schedule 14:30 Meeting\n` +
                `§schedule 2026-07-15 15:00 Reminder`
            );
        }
        
        let schedules = {};
        if (fs.existsSync(schedulePath)) {
            schedules = JSON.parse(fs.readFileSync(schedulePath));
        }
        
        const scheduleId = Date.now().toString();
        schedules[scheduleId] = {
            time: scheduledTime.toISOString(),
            message: message,
            chatId: msg.key.remoteJid,
            scheduledBy: msg.key.participant || msg.key.remoteJid
        };
        
        fs.writeFileSync(schedulePath, JSON.stringify(schedules, null, 2));
        
        await extra.reply(
            `📅 *Message Scheduled*\n\n` +
            `*Time:* ${scheduledTime.toLocaleString()}\n` +
            `*Message:* ${message}\n` +
            `*ID:* ${scheduleId}\n\n` +
            `_You will be notified when the message is sent._`
        );
    }
};