// 3V3
// Displays 3v3 Arena Stats

exports.run = (client, message, args) => {
 
  const config = require("../config.json");
  const colors = require("../functions/colors.js");
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

    blizzard.wow.character(['profile', 'pvp'], { realm: Crealm, name: Cname, origin: Cregion })
    .then(response => {
      console.log(response.data.pvp.brackets);
      console.log(colors);
      console.log(colors.data);
      console.log(colors.data.GetFactionColor);

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
            "name": "3v3 Rating",
            "value": response.data.pvp.brackets.ARENA_BRACKET_3v3.rating
          },
          {
            "name": "3v3 Season Stats",
            "value": response.data.pvp.brackets.ARENA_BRACKET_3v3.seasonWon + " Wins, " + response.data.pvp.brackets.ARENA_BRACKET_3v3.seasonLost + " Losses"
          },
          {
            "name": "3v3 Weekly Stats",
            "value": response.data.pvp.brackets.ARENA_BRACKET_3v3.weeklyWon + " Wins, " + response.data.pvp.brackets.ARENA_BRACKET_3v3.weeklyLost + " Losses"
          }
        ]
      }
      
    message.channel.send({ embed });

    }).catch(err => message.reply("I was unable to find the character '" + Cname + "', on the realm '" + Crealm + "', on the '" + Cregion + "' region."));

    }
}