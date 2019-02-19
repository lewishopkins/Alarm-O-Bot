// audit-parse.js
// Parses audit information

const config = require("../config.json");
const Discord = require("discord.js");
const wowDataItemSlots = require("../data/wow-data-itemslots.json");

var auditor = {};

// Specialisation check
auditor.CheckTalentsCategory = function(response) {

    var ResponseString = "";

    if (response.data.audit.noSpec)
        ResponseString += "No talent specialisation has been chosen. ";

    if (response.data.audit.unspentTalentPoints > 0)
        ResponseString += `${response.data.audit.unspentTalentPoints} talent points are currently unspent. `;

    if (response.data.audit.emptyGlyphSlots > 0)
        ResponseString +=  `${response.data.audit.emptyGlyphSlots} empty glyph slots.`;

    if (ResponseString === "")
        return {
        }
    else {
        return {
            "name": "Talents and Glyphs",
            "value": ResponseString
        }
    }
};

// Sockets Check
auditor.CheckSocketsCategory = function(response) {

    var ResponseString = "";

    if (response.data.audit.emptySockets > 0) {
        
        ResponseString += `${response.data.audit.emptySockets} unsocketed items.`;

        return {
            "name": "Gems",
            "value": ResponseString
        }

    }
    else return;
}

// Enchants Check
auditor.CheckEnchantsCategory = function(response) {

    var ResponseString = "";

    if (Object.keys(response.data.audit.unenchantedItems).length > 0) {
        ResponseString += `${Object.keys(response.data.audit.unenchantedItems).length} unenchanted items.`

        return {
            "name": "Enchants",
            "value": ResponseString
        }
    }

}

// Proffesions Check
auditor.CheckProfessionsCategory = function(response) {

    var ResponseString = "";
    var ProblemsFound = 0;

    // Check Blacksmithing
    // missingBlacksmithSockets[]

    // Check Enchanting
    // missingEnchanterEnchants[]

    // Check Engineering
    // missingEngineerEnchants[]

    // Check Inscription
    // missingScribeEnchants[]

    // Check Jewelcrafting
    // nMissingJewelcrafterGems   - Not array, flat number

    // Check Leatherworking
    // missingLeatherworkerEnchants[]

}

exports.data = auditor;