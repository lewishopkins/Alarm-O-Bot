// calculate-pathfinder-legion.js
// 

const wowDataPathfinder = require("../data/wow-data-pathfinder.json");

var pathfinder = {};

pathfinder.Legion = function(achievementList) {

    // Returns embed for Legion pathfinder

    // Check if pathfinder is 100% COMPLETE
    if (achievementList.includes(11446)) {         // Pathfinder Part 2 complete

        var output = [
            {
                "name": `:ballot_box_with_check: Legion Flying Unlocked!`,
                "value": `Player has completed all Legion Pathfinding achievements and has unlocked flying on the Broken Isles.`,
            }
        ]

        return output;

    } else if (achievementList.includes(11190)) {  // Pathfinder part 2 incomplete, part 1 complete
        
        var output = [
            {
                "name": `:ballot_box_with_check: Broken Isles Pathfinder, Part One`,
                "value": `Completed the Broken Isles Reputation, Exploration, Questing, World Quests and Class Campaign requirements.`
            },
            {
                "name": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, 11543)} Explore Broken Shore`,
                "value": `Explore the entirety of the Broken Shore zone.`,
            },
            {
                "name": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, 11545)} Legionfall Commander`,
                "value": "Earn Revered with the Armies of Legionfall reputation."
            }
        ]

        return output;

    } else {    // Part 1 incomplete
        
        var output = [
            {
                "name": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, 11188)} Broken Isles Explorer`,
                "value": `Explored all of the Broken Isles.`,
            },
            {
                "name": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, 11157)} Loremaster of Legion`,
                "value": "Complete all 5 questing zones of the Broken Isles."
            },
            {
                "name": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, 11189)} Variety is the Spice of Life`,
                "value": "Complete 100 world quests on the Broken Isles continent."
            },
            {
                "name": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, 10672)} Broken Isles Diplomat`,
                "value": "Earn Revered with all 6 Broken Isles reputations."
            },
            {
                "name": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, 10994)} A Glorious Campaign`,
                "value": "Complete your entire class order hall campaign."
            },
            {
                "name": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, 11543)} Explore Broken Shore`,
                "value": `Explore the entirety of the Broken Shore zone.`,
            },
            {
                "name": `${pathfinderCalculator.data.PlayerHasAchievement(achievementList, 11545)} Legionfall Commander`,
                "value": "Earn Revered with the Armies of Legionfall reputation."
            }
        ]

        return output;
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