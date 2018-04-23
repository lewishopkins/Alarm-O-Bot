// ALARM-O-BOT

// Configs
const config = require("./config.json");

// Packages
const Discord = require("discord.js");
const blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });

// Bot
const bot = new Discord.Client();

bot.on("ready", () => {

	console.log("\x1b[33m", "Ready to accept commands on Discord!");
	bot.user.setGame(config.currently_playing);

	// Test Blizzard API Validation
	blizzard.data.validate({ origin: 'eu', token: config.BLIZZARD_API_ACCESS_TOKEN })
	.then(response => {
		console.log("\x1b[36m", "[Blizzard] Your Blizzard API Access Token is currently ACTIVE.");
	}).catch(err => console.log("\x1b[36m", "[Blizzard] WARNING: Blizzard API Access Token has EXPIRED.\nPlease renew your API token by typing '!admin credentials' in Discord."));

});


bot.on("message", message => {

	// Ignore other bots
	if (message.author.bot) return;

	// Convert to upper case
	var input = message.content.toUpperCase();
	
	// Check if correct prefix is used
	if (input.indexOf(config.prefix) !== 0) return;
	
	// Split command and arguments
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	if (config.DEBUG_commands) console.log("\x1b[33m", "Command: "+command+" with args: "+args);

	// Find command in commands folder
	try {
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(bot, message, args);
	} catch (err) {
		console.error(err);
	}
	
});

// Discord Token
bot.login(config.token);