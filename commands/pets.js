// PETS
// Reports back number of pet battle pets unlocked.

exports.run = (client, message, args) => {
 
    const config = require("../config.json");
    const validator = require("../functions/character-validator.js");
    const fs = require("fs");
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

        // Queries
        var Ppets = blizzard.wow.character(['profile', 'pets'], { realm: Crealm, name: Cname, origin: Cregion });
        var PpetSlots = blizzard.wow.character(['petSlots'], { realm: Crealm, name: Cname, origin: Cregion })


        // Gather data
		var results = Promise.all([Ppets, PpetSlots]);
		results.then(response => {

            console.log(response[1].data);
            console.log("Pets Collected by " + response[0].data.name + ": " + response[0].data.pets.numCollected + "/" + response[0].data.pets.numNotCollected);
            
        }).catch(err => message.reply("I was unable to find the character '" + Cname + "', on the realm '" + Crealm + "', on the '" + Cregion + "' region."));
    }
}