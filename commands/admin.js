exports.run = (client, message, args) => {

	const config = require("../config.json");
    const fs = require("fs");
    var blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });


    if (args[0] === "credentials") {
		blizzard.data.credentials({id: 'qyachx38hdwh52ut2sxkxh74hvkffmxy', secret: config.BLIZZARD_SECRET, origin: 'eu' })
			.then(response => {
				console.log('Results of authenticating credentials:');
				console.log(response.data);

				// Write access token to config file
				config.BLIZZARD_API_ACCESS_TOKEN = response.data.access_token;
				fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

				console.log('Access token is: ' + response.data.access_token + ' - Access token has been set to the following in config file: ' + config.BLIZZARD_API_ACCESS_TOKEN);
				message.reply("credentials have been set.");
			});
		}
		
		if (args[0] === "validate") {
		blizzard.data.validate({ origin: 'eu', token: config.BLIZZARD_API_ACCESS_TOKEN })
			.then(response => {
				console.log(response.data);
				message.reply("please check the console.");
			});
        }
        
}