// COMMANDS
// Responds a list of commands

exports.run = (client, message, args) => {

    const config = require("../config.json");
    const fs = require("fs");

    message.channel.send(`
\`\`\`!inspect CharacterName Realm-Name -- Check item level, progression and character info\n
!token region -- See current token price\n
!pets CharacterName Realm-Name -- See number of pets owned\`\`\`
                        `).catch(console.error);
}