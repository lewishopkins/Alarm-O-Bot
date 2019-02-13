// CATCHECK
// Checks to see how many Cat pets the player has

exports.run = (client, message, args, blizzard, config) => {
     
    const fs = require("fs");

    // Adjective Generator
    function RandomAdjective() {

        var AdjectiveList = ['cosy', 'snug', 'comfy', 'warm', 'happy', 'safe', 'restful', 'sleepy'];
        var RandomNumber = Math.floor(Math.random() * 8);

        return AdjectiveList[RandomNumber];
    }

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


        blizzard.wow.character(['profile', 'pets'], { realm: Crealm, name: Cname, origin: Cregion, token: config.BLIZZARD_API_ACCESS_TOKEN })
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
                            "value": 'Wow!'
                        }
                    ]
                };
                
                // Send Post
                message.channel.send({ embed });

            }).catch(err => message.reply("I was unable to find the character '" + Cname + "', on the realm '" + Crealm + "', on the '" + Cregion + "' region."));
        }

    };