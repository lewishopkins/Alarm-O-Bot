exports.run = (client, message, args) => {

	const config = require("../config.json");
	const wowData = require("../data/wow-data.json");
	const reloaddata = require("../functions/reload-data.js");
    const fs = require("fs");
	const blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });

	// Check Role/Command Permissions
	var AllowedRoles = ["Mod"];
	// Check roles
	const RoleChecker = require("../functions/check-roles.js");
	var RoleCheck = RoleChecker.data.CheckPermissions(message, AllowedRoles);
	if (!RoleCheck)
		return;

    if (args[0] === "credentials") {
		blizzard.data.credentials({id: config.BLIZZARD_API_KEY, secret: config.BLIZZARD_API_SECRET, origin: 'eu' })
			.then(response => {
				console.log('Results of authenticating credentials:');
				console.log(response.data);

				// Write access token to config file
				wowData.BLIZZARD_API_ACCESS_TOKEN = response.data.access_token;
				fs.writeFile("./data/wow-data.json", JSON.stringify(config), (err) => console.error);

				console.log('Access token is: ' + response.data.access_token + ' - Access token has been set to the following in config file: ' + wowData.BLIZZARD_API_ACCESS_TOKEN);
				message.reply("credentials have been set.");
			});
		}
		
	if (args[0] === "validate") {
	blizzard.data.validate({ origin: 'eu', token: wowData.BLIZZARD_API_ACCESS_TOKEN })
		.then(response => {
			console.log(response.data);
			message.reply("please check the console.");
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

		} else message.reply("Options: race, class");

	}
}