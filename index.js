require('dotenv').config();
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

// Load config
const config = require('./config.json');

// Initialize client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Command collection
client.commands = new Map();
client.commands.set('menu', {
    name: 'menu',
    category: 'info',
    description: 'Show all commands',
    execute: async (sock, msg, args, extra) => {
        const categories = {
            admin: '🛡️',
            ai: '🤖',
            anime: '🎌',
            audio: '🎵',
            reactions: '💕',
            hentai: '🔞',
            info: 'ℹ️',
            settings: '⚙️',
            tools: '🔧',
            owner: '👑',
            fun: '🎉',
            download: '📥'
        };

        let menu = `╔═══════════════════════════════════╗\n`;
        menu += `║   ✦ ${config.botName} ✦   ║\n`;
        menu += `║   Version: ${config.version}   ║\n`;
        menu += `╠═══════════════════════════════════╣\n`;

        // Group commands by category
        const commandMap = {};
        for (const [name, cmd] of client.commands) {
            const category = cmd.category || 'uncategorized';
            if (!commandMap[category]) commandMap[category] = [];
            commandMap[category].push(name);
        }

        // Sort categories
        const sortedCategories = Object.keys(categories).filter(c => commandMap[c]);
        for (const category of sortedCategories) {
            if (commandMap[category]) {
                const emoji = categories[category] || '📁';
                menu += `║ ${emoji} *${category.toUpperCase()}*\n`;
                const cmds = commandMap[category].sort();
                for (let i = 0; i < cmds.length; i += 4) {
                    const row = cmds.slice(i, i + 4);
                    menu += `║ ${row.join(' │ ')}\n`;
                }
                menu += `║\n`;
            }
        }

        menu += `╠═══════════════════════════════════╣\n`;
        menu += `║ © POWERED BY NEXUS ║\n`;
        menu += `╚═══════════════════════════════════╝`;

        await extra.reply(menu);
    }
});

// Load all commands
function loadCommands() {
    const categories = ['admin', 'ai', 'anime', 'audio', 'reactions', 'hentai', 'info', 'settings', 'tools', 'owner', 'fun', 'download'];
    
    for (const category of categories) {
        const commandPath = path.join(__dirname, 'commands', category);
        if (fs.existsSync(commandPath)) {
            const files = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
            for (const file of files) {
                try {
                    const command = require(path.join(commandPath, file));
                    if (command.name && !client.commands.has(command.name)) {
                        client.commands.set(command.name, command);
                        console.log(`✅ Loaded: ${command.name} (${category})`);
                    }
                } catch (error) {
                    console.error(`❌ Failed to load ${file}:`, error.message);
                }
            }
        }
    }
}

// Message handler
client.on('message', async (msg) => {
    try {
        // Check if message has body
        if (!msg.body) return;

        // Check prefix
        const prefix = config.prefix || '§';
        if (!msg.body.startsWith(prefix)) return;

        // Parse command
        const args = msg.body.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Check if command exists
        if (!client.commands.has(commandName)) {
            // Check for custom commands
            const customPath = './database/customcmd.json';
            if (fs.existsSync(customPath)) {
                const custom = JSON.parse(fs.readFileSync(customPath));
                if (custom[commandName]) {
                    await msg.reply(custom[commandName].response || custom[commandName]);
                    return;
                }
            }
            return;
        }

        const command = client.commands.get(commandName);

        // Check if chat is disabled
        const offPath = './database/offhere.json';
        if (fs.existsSync(offPath)) {
            const offChats = JSON.parse(fs.readFileSync(offPath));
            if (offChats[msg.from]) {
                return;
            }
        }

        // Check if user is banned
        const bansPath = './database/bans.json';
        if (fs.existsSync(bansPath)) {
            const bans = JSON.parse(fs.readFileSync(bansPath));
            const sender = msg.author || msg.from;
            if (bans[sender]) {
                return await msg.reply(`🔨 You are banned from using this bot.\n*Reason:* ${bans[sender].reason || 'No reason provided'}`);
            }
        }

        // Check if command is group-only
        if (command.isGroup && !msg.from.includes('g.us')) {
            return await msg.reply('❌ This command only works in groups.');
        }

        // Check if command requires admin
        if (command.isAdmin) {
            if (!msg.from.includes('g.us')) {
                return await msg.reply('❌ This command only works in groups.');
            }
            const chat = await msg.getChat();
            const admins = await chat.getAdmins();
            const sender = msg.author || msg.from;
            const isAdmin = admins.some(admin => admin.id._serialized === sender);
            if (!isAdmin) {
                return await msg.reply('❌ Only group admins can use this command.');
            }
        }

        // Check if command requires owner
        if (command.isOwner) {
            const sender = msg.author || msg.from;
            if (!config.owner.includes(sender)) {
                return await msg.reply('❌ Only the bot owner can use this command.');
            }
        }

        // Execute command
        try {
            await command.execute(client, msg, args, {
                from: msg.from,
                reply: msg.reply.bind(msg)
            });
        } catch (error) {
            console.error(`Error executing ${commandName}:`, error);
            await msg.reply('❌ An error occurred while executing the command.');
        }

    } catch (error) {
        console.error('Message handler error:', error);
    }
});

// Client events
client.on('qr', (qr) => {
    console.log('Scan the QR code with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log(`✅ ${config.botName} v${config.version} is online!`);
    console.log(`📱 Connected as: ${client.info.wid._serialized}`);
    console.log(`📁 Commands loaded: ${client.commands.size}`);
});

client.on('auth_failure', (error) => {
    console.error('Authentication failed:', error);
});

client.on('disconnected', (reason) => {
    console.log('Client disconnected:', reason);
});

// Handle AFK
client.on('message', async (msg) => {
    if (msg.author === client.info.wid._serialized) return;
    if (!msg.body) return;

    const afkPath = './database/afk.json';
    if (fs.existsSync(afkPath)) {
        const afkData = JSON.parse(fs.readFileSync(afkPath));
        const sender = msg.author || msg.from;
        
        if (afkData[sender]) {
            const afkTime = afkData[sender].time || Date.now();
            const elapsed = Math.floor((Date.now() - afkTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            
            delete afkData[sender];
            fs.writeFileSync(afkPath, JSON.stringify(afkData, null, 2));
            
            await msg.reply(`👋 Welcome back! You were AFK for ${minutes}m ${seconds}s.`);
        }
    }
});

// Handle auto-like
client.on('message', async (msg) => {
    const ownerPath = './database/owner.json';
    if (fs.existsSync(ownerPath)) {
        const settings = JSON.parse(fs.readFileSync(ownerPath));
        if (settings.autolike) {
            try {
                await msg.react('❤️');
            } catch (e) {}
        }
    }
});

// Load commands and start
loadCommands();
client.initialize();

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down...');
    await client.destroy();
    process.exit(0);
});

console.log(`🚀 Starting ${config.botName} v${config.version}...`);