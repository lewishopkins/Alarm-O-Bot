// INSPECT
// Look up raid progression

exports.run = (client, message, args, blizzard, config) => {

	const fs = require("fs");
	const colors = require("../functions/colors.js");
	const validator = require("../functions/character-validator.js");
	const progressCalc = require("../functions/progression-calculator.js");
	const grabData = require("../functions/grab-data.js");

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
				
		// Prepare data
		var Pcharacter = blizzard.wow.character(['profile'], { origin: Cregion, realm: Crealm, name: Cname, token: config.BLIZZARD_API_ACCESS_TOKEN });
		var Pitems = blizzard.wow.character(['items'], { origin: Cregion, realm: Crealm, name: Cname, token: config.BLIZZARD_API_ACCESS_TOKEN});
		var Pprogression = blizzard.wow.character(['progression'], { origin: Cregion, realm: Crealm, name: Cname, token: config.BLIZZARD_API_ACCESS_TOKEN});
		var Braces = blizzard.wow.data('character-races', { origin: Cregion, token: config.BLIZZARD_API_ACCESS_TOKEN });

		// Gather data
		var results = Promise.all([Pcharacter, Pitems, Pprogression, Braces]);
		results.then(response => {
		
			// Create Response
			var embed = {
				"title": response[0].data.name + ", Level " + response[0].data.level + " " + grabData.data.GetRaceName(response[0].data.race) + " " + grabData.data.GetClassName(response[0].data.class),
				"description": response[1].data.items.averageItemLevelEquipped + " Equipped Item Level",
				"url": "http://render-eu.worldofwarcraft.com/character/" + response[0].data.thumbnail,	// TODO: Set up bot for multiple regions
				"color": colors.data.GetFactionColor(response[0].data.faction),
				"timestamp": new Date(),
				"footer": {
					"icon_url": "http://render-eu.worldofwarcraft.com/character/" + response[0].data.thumbnail,
					"text": "Level 110 for X days"
				},
				"thumbnail": {
					"url": "http://render-eu.worldofwarcraft.com/character/" + response[0].data.thumbnail
				},
				"image": {
					"url": "https://i.imgur.com/vSBHyeV.png"
				},
				"author": {
					"name": "Raid Check",
					"url": "https://discordapp.com",
					"icon_url": "http://render-eu.worldofwarcraft.com/character/" + response[0].data.thumbnail
				},
				"fields": [
					{
						"name": response[2].data.progression.raids[config.WOW_last_raid_id].name,
						"value": progressCalc.data.FindHighestProgression(response[2].data.progression.raids[config.WOW_last_raid_id])
					},
					{
						"name": response[2].data.progression.raids[config.WOW_last_raid_id - 1].name,
						"value": progressCalc.data.FindHighestProgression(response[2].data.progression.raids[config.WOW_last_raid_id - 1])
					},
					{
						"name": response[2].data.progression.raids[config.WOW_last_raid_id - 2].name,
						"value": progressCalc.data.FindHighestProgression(response[2].data.progression.raids[config.WOW_last_raid_id - 2])
					}
				]
			};
			
			// Send message
			message.channel.send({ embed });	
			
			});
		}
    }
