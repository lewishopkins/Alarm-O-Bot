// RBG
// Displays Rated Battle Ground Statistics

exports.run = (client, message, args) => {
 
    const config = require("../config.json");
    const colors = require("../functions/colors.js");
    const validator = require("../functions/character-validator.js");
    const highestrating = require("../functions/highest-rating.js");
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
  
      blizzard.wow.character(['profile', 'pvp', 'statistics'], { realm: Crealm, name: Cname, origin: Cregion })
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
              "name": "RBG Rating",
              "value": response.data.pvp.brackets.ARENA_BRACKET_RBG.rating
            },
            {
              "name": "RBG Season Stats",
              "value": response.data.pvp.brackets.ARENA_BRACKET_RBG.seasonWon + " Wins, " + response.data.pvp.brackets.ARENA_BRACKET_RBG.seasonLost + " Losses"
            },
            {
              "name": "RBG All Time Stats",
              "value": response.data.statistics.subCategories[9].subCategories[1].statistics[35].quantity + " Wins, " + (response.data.statistics.subCategories[9].subCategories[1].statistics[33].quantity - response.data.statistics.subCategories[9].subCategories[1].statistics[35].quantity) + " Losses"
            }
          ]
        }
        
      message.channel.send({ embed });
  
      }).catch(err => message.reply("I was unable to find the character '" + Cname + "', on the realm '" + Crealm + "', on the '" + Cregion + "' region."));
  
      }
  }