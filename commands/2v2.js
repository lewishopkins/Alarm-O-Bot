// 2v2
// Displays 2v2 Arena Stats

exports.run = (client, message, args) => {
 
  const config = require("../config.json");
  const colors = require("../functions/colors.js");
  const validator = require("../functions/character-validator.js");
  const fs = require("fs");
  var blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });

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

    var request = blizzard.wow.character(['profile', 'pvp'], { realm: Crealm, name: Cname, origin: Cregion })
    .then(response => {

      var embed = {
          "color": colors.data.GetFactionColor(response.data.faction),
          "timestamp": new Date(),
          "footer": {
            "icon_url": "https://i.imgur.com/fl22N7v.png",
            "text": "Alarm-o-Bot"
          },
          "thumbnail": {
            "url": "https://i.imgur.com/fl22N7v.png"
          },
          "author": {
            "name": "Arena Checker",
            "icon_url": "https://i.imgur.com/fl22N7v.png"
          },
          "fields": [
            {
              "name": "2v2 Rating",
              "value": response.data.pvp.brackets.ARENA_BRACKET_2v2.rating
            },
            {
              "name": "2v2 Season Stats",
              "value": response.data.pvp.brackets.ARENA_BRACKET_2v2.seasonWon + " Wins, " + response.data.pvp.brackets.ARENA_BRACKET_2v2.seasonLost + " Losses"
            },
            {
              "name": "2v2 Weekly Stats",
              "value": response.data.pvp.brackets.ARENA_BRACKET_2v2.weeklyWon + " Wins, " + response.data.pvp.brackets.ARENA_BRACKET_2v2.weeklyLost + " Losses"
            }
          ]
        }
      
      message.channel.send({ embed });

    }).catch(err => message.reply("I was unable to find the character '" + Cname + "', on the realm '" + Crealm + "', on the '" + Cregion + "' region."));
  }
}
