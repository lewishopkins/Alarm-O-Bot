// TOKEN
// Lists the current token price in the EU region.

exports.run = (client, message, args, blizzard, config) => {

    const fs = require("fs");
    const validator = require("../functions/character-validator.js");

    var regionDetails = validator.data.ValidateRegion(args);
    if (regionDetails[0] === 0)
        message.reply(regionDetails[1]+`\nCorrect syntax: !token region`);
    else {
        var Cregion = regionDetails[1];

        blizzard.wow.token({ region: "eu", token: config.BLIZZARD_API_ACCESS_TOKEN })
        .then(response => {

            console.log(response.data);

            var GoldResult = String(response.data.price);
            
            // Remove Copper/Silver
            // TODO: Fix for if the gold price drops below or above 6 figures.
            GoldOnly = GoldResult.slice(0,-4);
            
            // Make number readable
            GFirst = GoldOnly.slice(0,-3);
            GLast = GoldOnly.slice(3);
            
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