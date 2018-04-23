// calculate-pathfinder-legion.js
// 

const wowDataPathfinder = require("../data/wow-data-pathfinder.json");

var pathfinder = {};

pathfinder.LegionTest = function(raceid) {

    // Returns embed for Legion pathfinder

    // Check if pathfinder is 100% COMPLETE
    if (response.data.achievements.achievementsCompleted.includes(11446)) {
        console.log("Pathfinder part 2 complete.");
    } else if (response.data.achievements.achievementsCompleted.includes(11190)) {
        console.log("Pathfinder part 2 incomplete, part 1 complete.");
    } else {
        console.log("Part 1 is incomplete. Start from part 1.")
    }
    
};

pathfinder.PlayerHasAchievement = function(achievementList, needle) {

    // Find the needle
    // Returns TICK if true, CROSS if false
    if (achievementList.includes(needle))
        return ":ballot_box_with_check:";
        else return ":warning:";

};

// How many zones has the player explored
pathfinder.PlayerHasExplored = function(achievementList) {

    var ZoneAchievements = [10665, 10666, 10667, 10668, 10669];
    var j = 0;

    for (var i = 0; i < ZoneAchievements.length; i++) {
        if (achievementList.includes(ZoneAchievements[i]))
            j++
    }

    // Return num/Maximum in array
    return [j, ZoneAchievements.length];
    
};

pathfinder.PlayerHasReputation = function(reputationList, reputation, required) {

    
}

exports.data = pathfinder;