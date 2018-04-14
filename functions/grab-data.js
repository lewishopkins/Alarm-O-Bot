// grab-data.js
// Grabs local data

const config = require("../config.json");

var grabData = {};

grabData.GetRaceName = function(raceid) {

    for (var i = 0; i < Object.keys(config.WOW_CORE_RaceList).length; i++) {

        if (config.WOW_CORE_RaceList[i].id === raceid)
            return config.WOW_CORE_RaceList[i].name;
    }
    
};

grabData.GetClassName = function(classid) {

    for (var i = 0; i < Object.keys(config.WOW_CORE_ClassList).length; i++) {

        if (config.WOW_CORE_ClassList[i].id === classid)
            return config.WOW_CORE_ClassList[i].name;
    }
    
};

exports.data = grabData;