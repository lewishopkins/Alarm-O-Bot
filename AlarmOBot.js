// ALARM-O-BOT

// Configs
const config = require("./config.json");

// Packages
const Discord = require("discord.js");
const blizzard = require('blizzard.js').initialize({ key: config.BLIZZARD_API_KEY, secret: config.BLIZZARD_API_SECRET, origin: config.default_region });
const fs = require("fs");

// Bot
const bot = new Discord.Client();

bot.on("ready", () => {

	// Validate Blizzard Token
	blizzard.getApplicationToken({
		key: config.BLIZZARD_API_KEY,
		secret: config.BLIZZARD_API_SECRET,
		origin: config.default_region
	})
	.then(response => {
		// Write API Access Token
		config.BLIZZARD_API_ACCESS_TOKEN = response.data.access_token;
		fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

		console.log("\x1b[33m", "Ready to accept commands on Discord!");
		bot.user.setGame(config.currently_playing);
	})
	.catch (err => {
		// Promise Error/Exception Handling
		console.log("\x1b[31m", "[ERROR] Issue validating your Battle.net credentials:");
		console.log("\x1b[31m", "[ERROR] Error Code: " + err.response.status + " " + err.response.statusText);
		return err;
	});

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
		commandFile.run(bot, message, args, blizzard, config);
	} catch (err) {
		if (config.DEBUG_commands)
			console.error(err);

		// Send error data to console
		console.log("\x1b[31m", `[ERROR] Command ./commands/${command}.js attempted by user ${message.author.username}#${message.author.discriminator} [${message.author.id}] failed or was not found.`);
	}
});

// Discord Token
bot.login(config.token);