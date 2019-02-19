// FLYING
// Determines how much progression is required to unlock flying on a character.

exports.run = (client, message, args, blizzard, config) => {

    const validator = require("../functions/character-validator.js");

    // Pathfinder Data
    const pathfinder = require("../data/wow-data-pathfinder.json");
    const pathfinderCalculator = require("../functions/calculate-pathfinder.js");
    const colors = require("../functions/colors.js");


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

        blizzard.wow.character(['profile', 'achievements', 'reputation'], { realm: Crealm, name: Cname, origin: Cregion, token: config.BLIZZARD_API_ACCESS_TOKEN })
        .then(response => {

            //console.log(response.data.achievements.achievementsCompleted);

            var achievementList = response.data.achievements.achievementsCompleted;

            var embed = {
				"color": colors.data.GetFactionColor(response.data.faction),
                "timestamp": new Date(),
                "footer": {
                    "icon_url": "https://i.imgur.com/wWDy4Ou.jpg",
                    "text": "Alarm-o-Bot"
                },
                "thumbnail": {
					"url": "http://render-eu.worldofwarcraft.com/character/" + response.data.thumbnail
				},
                "author": {
                    "name": "Pathfinder Checker",
                    "icon_url": "https://i.imgur.com/wWDy4Ou.jpg"
                },
                "fields": pathfinderCalculator.data.Battle(achievementList)
        }

        message.channel.send({ embed });

        });
    }
}