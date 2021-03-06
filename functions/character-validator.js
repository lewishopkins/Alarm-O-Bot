// character-validator.js
// validates names, realms and regions across all commands

const config = require("../config.json");
var validator = {};

validator.ValidateCharacter = function(args) {

    // No Args
    if (!args)
        return [0, "You didn't enter any arguments."];

    // Validate Name
    if (!args[0])
        return [0, "Please enter a character name."];
    else Cname = args[0];

    // Validate Realm
    if (!args[1])
        Crealm = config.default_realm;
    else Crealm = args[1];

    // Validate Region
    if (!args[2])
        Cregion = config.default_region;
    else Cregion = args[2];

    return [Cname, Crealm, Cregion];
    
};

validator.ValidateRegion = function(args) {

    console.log(args[0]);

    if (!args[0])
        return config.default_region;
    else if (args[0] === "eu" || args[0] === "us" || args[0] === "kr" || args[0] === "tw")  // Valid Regions
        return [1, args[0]];
    else return [0, "Please enter a valid region (US, EU, KR or TW)"];
}

exports.data = validator;