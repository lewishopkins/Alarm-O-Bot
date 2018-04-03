// 3V3
// Displays 3v3 Arena Stats

exports.run = (client, message, args) => {
 
    const config = require("../config.json");
    const colors = require("../functions/colors.js");
    const fs = require("fs");
    var blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });

    // Validation
    if (!args[0])
        message.reply("you did not enter a valid name.\nCorrect syntax: !3v3 CharacterName Realm-Name Region");
    else if (args[2] && args[2] !== ('eu' || 'us' ))
        message.reply("you did not enter a valid region.\n Available regions: EU US\nRemember: If your realm name contains two words (eg 'Argent Dawn'), type it as Argent-Dawn instead.");
    else {    

        // Set Character Variables
        var Cname = args[0];
        if (!args[1]) var Crealm = config.default_realm;
            else var Crealm = args[1];
        if (!args[2]) var Cregion = config.default_region;
            else var Cregion = args[2];

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

            });

    }
}