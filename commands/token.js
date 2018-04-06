// TOKEN
// Lists the current token price in the EU region.

exports.run = (client, message, args) => {

    const config = require("../config.json");
    const fs = require("fs");
    const blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });


    if (!args[0])
        var region = config.default_region;
    else if (args[0] !== ('eu' || 'us'))
        message.reply("you did not enter a valid region.\nAvailable regions: EU, US");
    else {
        var region = args[0];
    }

    if (region) {

        // TODO: Fix regions
        blizzard.data.token({ access_token: config.BLIZZARD_API_ACCESS_TOKEN, namespace: 'dynamic-eu', origin: region })
        .then(response => {
            console.log(response.data);

            var GoldResult = String(response.data.price);
            console.log('GoldResult = ' + GoldResult);
            
            // Remove Copper/Silver
            GoldOnly = GoldResult.slice(0,-4);
            console.log('GoldOnly = ' + GoldOnly);
            
            // TODO: Fix for if the gold price drops below or above 6 figures.
            GFirst = GoldOnly.slice(0,-3);
            console.log('GFirst = ' + GFirst);
            GLast = GoldOnly.slice(3);
            console.log('GLast = ' + GLast);
            
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