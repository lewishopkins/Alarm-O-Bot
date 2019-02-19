// PETS
// Reports back number of pet battle pets unlocked.

exports.run = (client, message, args, blizzard, config) => {

    const validator = require("../functions/character-validator.js");
    const fs = require("fs");

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

        // Queries
        var Ppets = blizzard.wow.character(['profile', 'pets'], { realm: Crealm, name: Cname, origin: Cregion, token: config.BLIZZARD_API_ACCESS_TOKEN });
        //var PpetSlots = blizzard.wow.character(['petSlots'], { realm: Crealm, name: Cname, origin: Cregion });  // Not in Use
        var Pstatistics = blizzard.wow.character(['statistics'], {realm: Crealm, name: Cname, origin: Cregion, token: config.BLIZZARD_API_ACCESS_TOKEN });

        // Gather data
		var results = Promise.all([Ppets, Pstatistics]);
		results.then(response => {
            
            var embed = {
                "color": 4375684,
                "timestamp": new Date(),
                "footer": {
                    "icon_url": "https://i.imgur.com/wWDy4Ou.jpg",
                    "text": "Alarm-o-Bot"
                },
                "thumbnail": {
                    "url": "https://bnetcmsus-a.akamaihd.net/cms/content_entry_media/m0/M07PD0T0K9YZ1417452204158.png"
                },
                "author": {
                    "name": "Pet Checker",
                    "icon_url": "https://i.imgur.com/wWDy4Ou.jpg"
                },
                "fields": [
                    {
                        "name": "Pets Collected",
                        "value": response[0].data.pets.numCollected + " pets collected out of a possible " + response[0].data.pets.numNotCollected + "!"
                    },
                    {
                        "name": "Pet Battle Victories",
                        "value": response[1].data.statistics.subCategories[10].statistics[1].quantity
                    },
                    {
                        "name": "PvP Pet Battle Victories",
                        "value": response[1].data.statistics.subCategories[10].statistics[2].quantity
                    },
                    {
                        "name": "Celestial Tournament Wins",
                        "value": response[1].data.statistics.subCategories[10].statistics[4].quantity
                    }
                ]
            }

            message.channel.send({ embed });

        }).catch(err => message.reply("I was unable to find the character '" + Cname + "', on the realm '" + Crealm + "', on the '" + Cregion + "' region."));
    }
}