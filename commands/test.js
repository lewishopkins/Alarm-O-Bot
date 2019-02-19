// TEST INSPECT

exports.run = (client, message, args, blizzard, config) => {

    const colors = require("../functions/colors.js");
    const validator = require("../functions/character-validator.js");
    const fs = require("fs");

    // Validation
    var characterDetails = validator.data.ValidateCharacter(args);
    if (characterDetails[0] === 0)
      // Invalid Details - Send Error
      message.reply(characterDetails[1] + `\nCorrect syntax: !command CharacterName Realm-Name Region`);
    else {
      // Valid Details - Set Details
      var Cname = characterDetails[0];
      var Crealm = characterDetails[1];
      var Cregion = characterDetails[2];
  
      blizzard.wow.character(['profile', 'pvp', 'statistics'], { realm: Crealm, name: Cname, origin: Cregion, token: config.BLIZZARD_API_ACCESS_TOKEN })
        .then(response => {
  
            console.log(response.data.statistics.subCategories[9].subCategories[0]);
    });
  }
}