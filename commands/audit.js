// AUDIT
// Check for errors in a player's loadout

exports.run = (client, message, args) => {

	const config = require("../config.json");
	const fs = require("fs");
	const validator = require("../functions/character-validator.js");
	const auditor = require("../functions/audit-parse.js");
    const blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });

	// Validation
	var characterDetails = validator.data.ValidateCharacter(args);
	if (characterDetails[0] === 0)

		// Invalid Details - Send Error
		message.reply(characterDetails[1]+`\nCorrect syntax: !command CharacterName Realm-Name Region`);
		
	else {

		// Valid Details - Set Details
		var Cname = characterDetails[0];
		var Crealm = characterDetails[1];
		var Cregion = characterDetails[2];

		// Gather data
		blizzard.wow.character(['audit'], { realm: Crealm, name: Cname, origin: Cregion })
	    .then(response => {

			console.log(response.data);

			console.log(response.data.audit.unenchantedItems);
			console.log(Object.keys(response.data.audit.unenchantedItems).length);

			var SectionTalents


				var embed = {
					"title": `Audit for ${Cname}-${Crealm} has found ${response.data.audit.numberOfIssues} problems.`,
				  	"color": 2019349,
				  	"timestamp": new Date(),
				  	"footer": {
						"icon_url": "https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/thumb/2/27/Legion-Icon.png/120px-Legion-Icon.png?version=40b0077c5c9e566ee62fd575c9b25580",
						"text": "Alarm-o-Bot"
				  	},
				  	"thumbnail": {
						"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/2000px-WoW_icon.svg.png"
				  	},
				  	"author": {
						"name": "Character Audit",
						"icon_url": "https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/thumb/2/27/Legion-Icon.png/120px-Legion-Icon.png?version=40b0077c5c9e566ee62fd575c9b25580"
					},
					"fields": [
						auditor.data.CheckTalentsCategory(response),
						auditor.data.CheckSocketsCategory(response),
						auditor.data.CheckEnchantsCategory(response),
					]
				}

			// Send Post
			message.channel.send({ embed });
			
        });
    }
}
