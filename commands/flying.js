// FLYING
// Determines how much progression is required to unlock flying on a character.

exports.run = (client, message, args) => {

    const config = require("../config.json");
    const validator = require("../functions/character-validator.js");
    const blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });

    // Pathfinder Data
    const pathfinder = require("../wow-data-pathfinder.json");
    const pathfinderCalculator = require("../functions/calculate-pathfinder-legion.js");

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

        blizzard.wow.character(['profile', 'achievements', 'reputation'], { realm: Crealm, name: Cname, origin: Cregion })
        .then(response => {

            //console.log(response.data.achievements.achievementsCompleted);

            var achievementList = response.data.achievements.achievementsCompleted;

            var embed = {
                "color": 4558586,
                "timestamp": new Date(),
                "footer": {
                    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                    "text": "Alarm-o-Bot"
                },
                "thumbnail": {
                    "url": "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                "author": {
                    "name": "Pathfinder Checker",
                    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                "fields": [
                    {
                        "name": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, pathfinder.WOW_LEGION_Pathfinder[0].id)} ${pathfinder.WOW_LEGION_Pathfinder[0].name}`,
                        "value": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, pathfinder.WOW_LEGION_Pathfinder[0].META_single[0].id)} ${pathfinder.WOW_LEGION_Pathfinder[0].META_single[0].desc}`,
                        "value": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, pathfinder.WOW_LEGION_Pathfinder[0].META_single[1].id)} ${pathfinder.WOW_LEGION_Pathfinder[0].META_single[1].desc}`,
                        "value": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, pathfinder.WOW_LEGION_Pathfinder[0].META_single[2].id)} ${pathfinder.WOW_LEGION_Pathfinder[0].META_single[2].desc}`,
                        "value": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, pathfinder.WOW_LEGION_Pathfinder[0].META_reps.id)} ${pathfinder.WOW_LEGION_Pathfinder[0].META_reps.desc}`,
                        "value": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, pathfinder.WOW_LEGION_Pathfinder[0].META_loremaster.id)} ${pathfinder.WOW_LEGION_Pathfinder[0].META_loremaster.desc}`,
                    },
                    {
                        "name": "Broken Isles Pathfinder, Part Two",
                        "value": "example"
                    }
                ]
        }

        //message.channel.send({ embed });
        console.log("Attempted to use Flying command.");

        });
    }
}