// highest-rating.js
// Determines the highest PvP rating a character has

var highestrating = {};

highestrating.FindHighestRating = function(response) {

    var Rating5v5 = response.data.statistics.subCategories[9].subCategories[0].statistics[23].quantity;
    var Rating3v3 = response.data.statistics.subCategories[9].subCategories[0].statistics[24].quantity;
    var Rating2v2 = response.data.statistics.subCategories[9].subCategories[0].statistics[25].quantity;

    var HighestRating = Math.max(Rating5v5, Rating3v3, Rating2v2);
    var HighestBracket = "N/A";

    if (HighestRating === Rating5v5)
        HighestBracket = "(5v5 Bracket)";
    else if (HighestRating === Rating3v3)
        HighestBracket = "(3v3 Bracket)";
    else if (HighestRating === Rating2v2)
        HighestBracket = "(2v2 Bracket)";

    return (HighestRating + " " + HighestBracket);
    
};

exports.data = highestrating;