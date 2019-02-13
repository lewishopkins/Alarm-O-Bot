// PVP
// Displays Player versus Player statistics

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

            //console.log(response.data.statistics.subCategories[9]);
            console.log(response.data.statistics.subCategories[9].subCategories[1]);

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
                    "name": "PvP Statistics",
                    "icon_url": "https://i.imgur.com/fl22N7v.png"
                },
                "fields": [
                        {
                            "name": "Duels Won",
                            "value": response.data.statistics.subCategories[9].subCategories[2].statistics[0].quantity,
                            "inline": true
                        },
                        {
                            "name": "Duels Lost",
                            "value": response.data.statistics.subCategories[9].subCategories[2].statistics[1].quantity,
                            "inline": true
                        },
                
                        {
                            "name": "Total PvP Deaths",
                            "value": response.data.statistics.subCategories[9].statistics[0].quantity,
                            "inline": true
                        },
                        {
                            "name": "Total Honorable Kills",
                            "value": response.data.totalHonorableKills,
                            "inline": true
                        },
                        
                        {
                            "name": "Battlegrounds Won",
                            "value": response.data.statistics.subCategories[9].subCategories[1].statistics[2].quantity,
                            "inline": true
                        },
                        {
                            "name": "Battlegrounds Lost",
                            "value": response.data.statistics.subCategories[9].subCategories[1].statistics[0].quantity - response.data.statistics.subCategories[9].subCategories[1].statistics[2].quantity,
                            "inline": true
                        },
                        
                        {
                            "name": "Most Played",
                            "value": response.data.statistics.subCategories[9].subCategories[1].statistics[1].highest + " (" + response.data.statistics.subCategories[9].subCategories[1].statistics[1].quantity + ")",
                            "inline": true
                        },
                        {
                            "name": "Most Victories",
                            "value": response.data.statistics.subCategories[9].subCategories[1].statistics[3].highest + " (" + response.data.statistics.subCategories[9].subCategories[1].statistics[3].quantity + ")",
                            "inline": true
                        }
                    ]
                }

            message.channel.send({ embed });
  
        }).catch(err => message.reply("I was unable to find the character '" + Cname + "', on the realm '" + Crealm + "', on the '" + Cregion + "' region."));
  
    }
}