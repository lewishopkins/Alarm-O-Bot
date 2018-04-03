// INSPECT
// Look up raid progression

exports.run = (client, message, args) => {

	const config = require("../config.json");
    const fs = require("fs");
    var blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });

		// Validation
		if (!args[0])
			message.reply("you did not enter a valid name.\nCorrect syntax: !inspect CharacterName Realm-Name Region");
		else if (args[2] && args[2] !== ('eu' || 'us' ))
			message.reply("you did not enter a valid region.\n Available regions: EU US");
		else {
		
			message.reply("Looking...");
			
			// Set region
			var Cname = args[0];
			if (!args[1]) var Crealm = config.default_realm;
				else var Crealm = args[1];
			if (!args[2]) var Cregion = config.default_region;
				else var Cregion = args[2];
					
			// Prepare data
			var Pcharacter = blizzard.wow.character(['profile'], { origin: Cregion, realm: Crealm, name: Cname });
			var Pitems = blizzard.wow.character(['items'], { origin: Cregion, realm: Crealm, name: Cname});
			var Pprogression = blizzard.wow.character(['progression'], { origin: Cregion, realm: Crealm, name: Cname});

			// Gather data
			var results = Promise.all([Pcharacter, Pitems, Pprogression]);
			results.then(response => {
			
				// Determine HIGHEST PROGRESSION
				function FindHighestProgression(info) {

					const data = info;

					var Difficulty = "?";
					var Progress = "0";

					console.log("bosses = " + data.bosses[0]);
					
					if (data.mythic > 0) {
						Difficulty = "Mythic";
						for (i = 0; i < data.bosses.length; i++) {
							if (data.bosses[i].mythicKills > 0) Progress++;
						}
					} else if (data.heroic > 0) {
						Difficulty = "Heroic";
						for (i = 0; i < data.bosses.length; i++) {
							if (data.bosses[i].heroicKills > 0) Progress++;
						}
					} else if (data.normal > 0) {
						Difficulty = "Normal";
						for (i = 0; i < data.bosses.length; i++) {
							if (data.bosses[i].normalKills > 0) Progress++;
						}
					}
					else {
						Difficulty = "LFR";
						for (i = 0; i < data.bosses.length; i++) {
							if (data.bosses[i].lfrKills > 0) Progress++;
						}
					}

					var progression = Progress + "/" + data.bosses.length + " " + Difficulty;
					
					return progression;
				}

				// Create Response
				var embed = {
					"title": response[0].data.name + ", Level " + response[0].data.level + " " + config.WOW_RaceList[response[0].data.race] + " " + config.WOW_ClassList[response[0].data.class],
					"description": response[1].data.items.averageItemLevelEquipped + " Equipped Item Level",
					"url": "http://render-eu.worldofwarcraft.com/character/" + response[0].data.thumbnail,	// TODO: Set up bot for multiple regions
					"color": 123456,
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
							"value": FindHighestProgression(response[2].data.progression.raids[config.WOW_last_raid_id])
						},
						{
							"name": response[2].data.progression.raids[config.WOW_last_raid_id - 1].name,
							"value": FindHighestProgression(response[2].data.progression.raids[config.WOW_last_raid_id - 1])
						},
						{
							"name": response[2].data.progression.raids[config.WOW_last_raid_id - 2].name,
							"value": FindHighestProgression(response[2].data.progression.raids[config.WOW_last_raid_id - 2])
						}
					]
				};
				
				// Send message
				message.channel.send({ embed });	
				
				});
		}
    }
