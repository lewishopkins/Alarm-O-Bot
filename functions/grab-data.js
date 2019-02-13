// grab-data.js
// Grabs local data

const wowData = require("../data/wow-data.json");

var grabData = {};

grabData.GetRaceName = function(raceid) {

    for (var i = 0; i < Object.keys(wowData.WOW_CORE_RaceList).length; i++) {

        if (wowData.WOW_CORE_RaceList[i].id === raceid)
            return wowData.WOW_CORE_RaceList[i].name;
    }
    
};

grabData.GetClassName = function(classid) {

    for (var i = 0; i < Object.keys(wowData.WOW_CORE_ClassList).length; i++) {

        if (wowData.WOW_CORE_ClassList[i].id === classid)
            return wowData.WOW_CORE_ClassList[i].name;
    }
    
};

exports.data = grabData;