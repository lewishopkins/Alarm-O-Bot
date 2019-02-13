// TOKEN
// Lists the current token price in the EU region.

exports.run = (client, message, args, blizzard, config) => {

    const fs = require("fs");
    const validator = require("../functions/character-validator.js");

    var regionDetails = validator.data.ValidateRegion(args);
    if (regionDetails[0] === 0)
        message.reply(regionDetails[1]+`\nCorrect syntax: !token region`);
    else {
        var region = regionDetails[1];

        blizzard.data.token({ access_token: config.BLIZZARD_API_ACCESS_TOKEN, namespace: `dynamic-${region}`, origin: region })
        .then(response => {

            var GoldResult = String(response.data.price);
            //console.log('GoldResult = ' + GoldResult);
            
            // Remove Copper/Silver
            GoldOnly = GoldResult.slice(0,-4);
            //console.log('GoldOnly = ' + GoldOnly);
            
            // TODO: Fix for if the gold price drops below or above 6 figures.
            GFirst = GoldOnly.slice(0,-3);
            //console.log('GFirst = ' + GFirst);
            GLast = GoldOnly.slice(3);
            //console.log('GLast = ' + GLast);
            
            // Stick Together
            GFinal = GFirst + "," + GLast + "g";

            var embed = {
                "color": 15570176,
                "thumbnail": {
                    "url": "http://www.pvhc.net/img139/krkhgbmuofihiwqgsiko.png"
                },
                "author": {
                    "name": "WoW Token Value",
                    "icon_url": "http://www.pvhc.net/img139/krkhgbmuofihiwqgsiko.png"
                },
                "fields": [
                    {
                        "name": "Region: EU",
                        "value": GFinal
                    }
                ]
            };
            
        // Send message
        message.channel.send({ embed });
        });
    }   
}