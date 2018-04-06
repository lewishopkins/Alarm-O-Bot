// PETS
// Reports back number of pet battle pets unlocked.

exports.run = (client, message, args) => {
 
    const config = require("../config.json");
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


        blizzard.wow.character(['profile', 'pets'], { realm: Crealm, name: Cname, origin: Cregion })
            .then(response => {

            console.log(response.data);
            console.log("Pets Collected by " + response.data.name + ": " + response.data.pets.numCollected + "/" + response.data.pets.numNotCollected);
            
        }).catch(err => message.reply("I was unable to find the character '" + Cname + "', on the realm '" + Crealm + "', on the '" + Cregion + "' region."));
    }
}