// CATCHECK
// Checks to see how many Cat pets the player has

exports.run = (client, message, args) => {
 
    const config = require("../config.json");
    const fs = require("fs");
    var blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });

    // Adjective Generator
    function RandomAdjective() {

        var AdjectiveList = ['cosy', 'snug', 'comfy', 'warm', 'happy', 'safe', 'restful', 'sleepy'];
        var RandomNumber = Math.floor(Math.random() * 8);

        return AdjectiveList[RandomNumber];
    }

    // Validation
    if (!args[0])
        message.reply("you did not enter a valid name.\nCorrect syntax: !inspect CharacterName Realm-Name Region");
    else if (args[2] && args[2] !== ('eu' || 'us' ))
        message.reply("you did not enter a valid region.\n Available regions: EU US");
    else {
        
        // Set region
        var Cname = args[0];
        if (!args[1]) var Crealm = config.default_realm;
            else var Crealm = args[1];
        if (!args[2]) var Cregion = config.default_region;
            else var Cregion = args[2];


        blizzard.wow.character(['profile', 'pets'], { realm: Crealm, name: Cname, origin: Cregion })
            .then(response => {

                var CatList = [7385, 7384, 7381, 7382, 7386, 7380, 34364, 56031, 53884, 61883, 52344, 36511, 7383, 53283, 71942, 62019, 62129, 68838, 62257, 61689, 68655, 52226, 68267, 85283, 68502];
                var CatCount = 0;

                for(i = 0; i < CatList.length; i++) {
                    for (j = 0; j < response.data.pets.collected.length ; j++) {

                        if (CatList[i] === response.data.pets.collected[j].creatureId)
                            CatCount++;
                    }
                }
                
                // Create Post
                var embed = {
                    "color": 7620737,
                    "thumbnail": {
                        "url": "https://i.imgur.com/egroRmm.png"
                    },
                    "author": {
                        "name": `${response.data.name}'s Pet Cats!`,
                        "icon_url": "http://www.pvhc.net/img139/krkhgbmuofihiwqgsiko.png"
                    },
                    "fields": [
                        {
                            "name": `${response.data.name} has ${CatCount} ${RandomAdjective()} cats!`,
                            "value": 'uwu'
                        }
                    ]
                };
                
                // Send Post
                message.channel.send({ embed });

            });
        }

    };