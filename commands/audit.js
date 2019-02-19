// AUDIT
// Check for errors in a player's loadout

exports.run = (client, message, args, blizzard, config) => {

	const fs = require("fs");
	const validator = require("../functions/character-validator.js");
	const auditor = require("../functions/audit-parse.js");

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
		blizzard.wow.character(['audit'], { realm: Crealm, name: Cname, origin: Cregion, token: config.BLIZZARD_API_ACCESS_TOKEN })
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
						"icon_url": "https://i.imgur.com/wWDy4Ou.jpg",
						"text": "Alarm-o-Bot"
				  	},
				  	"thumbnail": {
						"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/2000px-WoW_icon.svg.png"
				  	},
				  	"author": {
						"name": "Character Audit",
						"icon_url": "https://i.imgur.com/wWDy4Ou.jpg"
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
