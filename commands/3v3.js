// 3V3
// Displays 3v3 Arena Stats

exports.run = (client, message, args, blizzard, config) => {

  const colors = require("../functions/colors.js");
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

    blizzard.wow.character(['profile', 'pvp', 'statistics'], { realm: Crealm, name: Cname, origin: Cregion, token: config.BLIZZARD_API_ACCESS_TOKEN })
    .then(response => {

      var embed = {
        "color": colors.data.GetFactionColor(response.data.faction),
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://i.imgur.com/wWDy4Ou.jpg",
          "text": "Alarm-o-Bot"
        },
        "thumbnail": {
          "url": "https://i.imgur.com/fl22N7v.png"
        },
        "author": {
          "name": "Arena Checker",
          "icon_url": "https://i.imgur.com/wWDy4Ou.jpg"
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
            "name": "3v3 All Time Stats",
            "value": response.data.statistics.subCategories[9].subCategories[0].statistics[5].quantity + " Wins, " + (response.data.statistics.subCategories[9].subCategories[0].statistics[4].quantity - response.data.statistics.subCategories[9].subCategories[0].statistics[5].quantity) + " Losses"
          }
        ]
      }
      
    message.channel.send({ embed });

    }).catch(err => message.reply("I was unable to find the character '" + Cname + "', on the realm '" + Crealm + "', on the '" + Cregion + "' region."));

    }
}