// 2v2
// Displays 2v2 Arena Stats

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

            });

    }
}