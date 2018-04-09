// ALARM-O-BOT

// Set up Bot
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

// Required packages
var blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });

// bot Active
bot.on("ready", () => {

	console.log("\x1b[33m", "Ready to accept commands on Discord!");
	bot.user.setGame(config.currently_playing);

	// Test API Validation
	blizzard.data.validate({ origin: 'eu', token: config.BLIZZARD_API_ACCESS_TOKEN })
	.then(response => {
		var daysRemaining = (response.data.exp / 86400000);
		if (!daysRemaining)
			console.log("\x1b[36m", "[Blizzard] WARNING: Blizzard API Access Token has EXPIRED.\nPlease renew your API token by typing '!admin credentials' in Discord.")
		else if (daysRemaining < 3)
			console.log("\x1b[36m", "[Blizzard] WARNING: Blizzard API Access Token expires in "+daysRemaining+" days.\nPlease renew your API token by typing '!admin credentials' in Discord.");
		else
			console.log("\x1b[36m", "[Blizzard] Your Blizzard API Access Token has "+daysRemaining+" days remaining.");
	}).catch(err => console.log("\x1b[36m", "[Blizzard] WARNING: Blizzard API Access Token has EXPIRED.\nPlease renew your API token by typing '!admin credentials' in Discord."));

});

// Someone says something
bot.on("message", message => {

	// Ignore other bots
	if (message.author.bot) return;

	// Convert to UPPER CASE
	var input = message.content.toUpperCase();
	
	// Check if correct prefix is used
	if (input.indexOf(config.prefix) !== 0) return;
	
	// Detect Commands and Arguments (!Command Argument1 Argument2)
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	console.log("\x1b[33m", "Command: "+command+" with args: "+args);

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