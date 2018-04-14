// reload-data.js
// Saves race and class data to config.js

const config = require("../config.json");
const blizzard = require('blizzard.js').initialize({ apikey: config.BLIZZARD_API_KEY });
const fs = require("fs");

var reloadData = {};

reloadData.SaveRaceList = function() {

    blizzard.wow.data('character-races', { origin: 'us' })
        .then(response => {

            var raceList = [];

            for (var i = 0; i < Object.keys(response.data.races).length; i++) {
                raceList.push({"id": response.data.races[i].id, "name": response.data.races[i].name});
            }

            // Write access token to config file
            config.WOW_CORE_RaceList = raceList;
            fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

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
        config.WOW_CORE_ClassList = classList;
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

    });

}

exports.data = reloadData;