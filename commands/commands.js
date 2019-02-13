// COMMANDS
// Responds a list of commands

exports.run = (client, message, args, blizzard, config) => {

    const fs = require("fs");

    message.channel.send(`
_If you leave [realm] or [region] blank, they will default to [${config.default_realm}] and [${config.default_region}] respectively._
**PVE (Player Commands)**
${config.prefix}inspect [name] [realm] [region] - Progression and gear information.
${config.prefix}audit [name] [realm] [region] - Finds problems found with player's gear, talents and more.
${config.prefix}pets [name] [realm] [region] - Pets and Pet Battle information.
${config.prefix}catcheck [name] [realm] [region] - Displays how many cats the player has.

**PVP (Player Commands)**
${config.prefix}2v2 [name] [realm] [region] - Shows current rating in this bracket, along with win/loss ratio.
${config.prefix}3v3 [name] [realm] [region]
${config.prefix}rbg [name] [realm] [region]
${config.prefix}pvp [name] [realm] [region] - Displays general PVP statistics, including duels, honorable kills and most played battlegrounds.

**DATA** 
${config.prefix}token [region] - Grabs token information. Valid regions: EU, US, KR, TW.
                        `).catch(console.error);
}