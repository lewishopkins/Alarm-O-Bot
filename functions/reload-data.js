// reload-data.js
// Saves race and class data to config.js

const config = require("../config.json");
const blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });
const fs = require("fs");

// Data files
const wowData = require("../data/wow-data.json");

var reloadData = {};

reloadData.SaveRaceList = function() {

    blizzard.wow.data('character-races', { origin: 'us' })
        .then(response => {

            var raceList = [];

            for (var i = 0; i < Object.keys(response.data.races).length; i++) {
                raceList.push({"id": response.data.races[i].id, "name": response.data.races[i].name});
            }

            // Write access token to config file
            wowData.WOW_CORE_RaceList = raceList;
            fs.writeFile("./data/wow-data.json", JSON.stringify(wowData), (err) => console.error);

            console.log("\x1b[36m", "[RELOAD:Race] Process has completed.");

    });
    
};

reloadData.SaveClassList = function() {

    blizzard.wow.data('character-classes', { origin: 'us' })
    .then(response => {

        var classList = [];

        for (var i = 0; i < Object.keys(response.data.classes).length; i++) {
            classList.push({"id": response.data.classes[i].id, "name": response.data.classes[i].name});
        }

        // Write access token to config file
        wowData.WOW_CORE_ClassList = classList;
        fs.writeFile("./data/wow-data.json", JSON.stringify(wowData), (err) => console.error);

        console.log("\x1b[36m", "[RELOAD:Class] Process has completed.");

    });

}

exports.data = reloadData;