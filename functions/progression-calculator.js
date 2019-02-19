// progression-calculator.js
// Input a player's raid progression profile to output a string translation eg "10/10 Mythic"

const config = require("../config.json");
var progress = {};

// Populate Discord Progression Fields
progress.PopulateProgressFields = function(info) {
    
    const response = info;
    var fields = [];

    for (var i = 0; i < config.WOW_current_raids; i++) {
        var raid = {
            "name" : response[2].data.progression.raids[config.WOW_last_raid_id - i].name,
            "value" : progress.FindHighestProgression(response[2].data.progression.raids[config.WOW_last_raid_id - i])
        }

        fields.push(raid);
    }

    return fields;
}

// Determine HIGHEST PROGRESSION
progress.FindHighestProgression = function(info) {

    const data = info;

    var Difficulty = "?";
    var Progress = "0";

    if (data.mythic > 0) {
        Difficulty = "Mythic";
        for (i = 0; i < data.bosses.length; i++) {
            if (data.bosses[i].mythicKills > 0) Progress++;
        }
    } else if (data.heroic > 0) {
        Difficulty = "Heroic";
        for (i = 0; i < data.bosses.length; i++) {
            if (data.bosses[i].heroicKills > 0) Progress++;
        }
    } else if (data.normal > 0) {
        Difficulty = "Normal";
        for (i = 0; i < data.bosses.length; i++) {
            if (data.bosses[i].normalKills > 0) Progress++;
        }
    }
    else {
        Difficulty = "LFR";
        for (i = 0; i < data.bosses.length; i++) {
            if (data.bosses[i].lfrKills > 0) Progress++;
        }
    }

    var progression = Progress + "/" + data.bosses.length + " " + Difficulty;
    
    return progression;
}

exports.data = progress;