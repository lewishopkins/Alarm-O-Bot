// progression-calculator.js
// Input a player's raid progression profile to output a string translation eg "10/10 Mythic"

const config = require("../config.json");
var progress = {};

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