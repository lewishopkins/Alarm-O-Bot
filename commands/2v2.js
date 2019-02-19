// 2v2
// Displays 2v2 Arena Stats

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
              "name": "2v2 All Time Stats",
              "value": response.data.statistics.subCategories[9].subCategories[0].statistics[7].quantity + " Wins, " + (response.data.statistics.subCategories[9].subCategories[0].statistics[6].quantity - response.data.statistics.subCategories[9].subCategories[0].statistics[7].quantity) + " Losses"
            }
          ]
        }

        message.channel.send({ embed });

      }).catch(err => message.reply("I was unable to find the character '" + Cname + "', on the realm '" + Crealm + "', on the '" + Cregion + "' region."));
  }
}
