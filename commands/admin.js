exports.run = (client, message, args, blizzard, config) => {

	const wowData = require("../data/wow-data.json");
	const reloaddata = require("../functions/reload-data.js");
    const fs = require("fs");

	// Check roles
	const RoleChecker = require("../functions/check-roles.js");
	var RoleCheck = RoleChecker.data.CheckPermissions(message, config.admin_role_name);

	// Check Permissions
	if (!RoleCheck)
		return;

    if (args[0] === "credentials") {

		console.log("\x1b[33m", `New Blizzard credentials requested by user ${message.author.username}#${message.author.discriminator} [${message.author.id}]`);

		blizzard.getApplicationToken({
			key: config.BLIZZARD_API_KEY,
			secret: config.BLIZZARD_API_SECRET,
			origin: config.default_region
		})
		.then(response => {
			// Write API Access Token
			config.BLIZZARD_API_ACCESS_TOKEN = response.data.access_token;
			fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
	
			console.log("\x1b[33m", "Credentials have been renewed and replaced in the config.");
		})
		.catch (err => {
			// Promise Error/Exception Handling
			console.log("\x1b[31m", "[ERROR] Issue validating your Battle.net credentials:");
			console.log("\x1b[31m", "[ERROR] Error Code: " + err.response.status + " " + err.response.statusText);
			return err;
		});
		}

	// Save Data
	if (args[0] === "reload") {

		if (args[1] === "race") {
			
			reloaddata.data.SaveRaceList();
			message.reply("Manually reloading race data.");

		} else if (args[1] === "class") {

			reloaddata.data.SaveClassList();
			message.reply("Manually reloading class data.");

		} else message.reply("Options: [race | class]");

	}
}