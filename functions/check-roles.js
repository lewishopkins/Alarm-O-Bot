// check-roles.js
// determines if someone is allowed to use a command

const config = require("../config.json");
const Discord = require("discord.js");

var RoleChecker = {};

RoleChecker.CheckPermissions = function(message, allowedRoles) {

    if (message.member.roles.some(r=>allowedRoles.includes(r.name)))
        return 1;
    else
        return 0;
    
};

exports.data = RoleChecker;