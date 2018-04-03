// PETS
// Reports back number of pet battle pets unlocked.

exports.run = (client, message, args) => {
 
    const config = require("../config.json");
    const fs = require("fs");
    var blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });

    // Validation
    if (!args[0])
        message.reply("you did not enter a valid name.\nCorrect syntax: !pets CharacterName Realm-Name Region");
    else if (args[2] && args[2] !== ('eu' || 'us' ))
        message.reply("you did not enter a valid region.\n Available regions: EU US\nRemember: If your realm name contains two words (eg 'Argent Dawn'), type it as Argent-Dawn instead.");
    else {    

        // Set Character Variables
        var Cname = args[0];
        if (!args[1]) var Crealm = config.default_realm;
            else var Crealm = args[1];
        if (!args[2]) var Cregion = config.default_region;
            else var Cregion = args[2];

        blizzard.wow.character(['profile', 'pets'], { realm: Crealm, name: Cname, origin: Cregion })
            .then(response => {

            console.log(response.data);
            console.log("Pets Collected by " + response.data.name + ": " + response.data.pets.numCollected + "/" + response.data.pets.numNotCollected);
            
        });
    }
}