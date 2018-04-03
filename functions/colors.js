// colors.js
// Returns color values for Discord embeded messages

var colors = {};

colors.GetFactionColor = function(faction_id) {
    if (faction_id === 0)
        return 4495323;
    else return 14374468;
};

exports.data = colors;