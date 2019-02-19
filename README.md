# Alarm-O-Bot

This is a simple bot for World of Warcraft Discord servers.

The main purpose of the bot is to easily access information about players, including PvP ratings and PvE progression. There are also commands to retrieve token prices, check Pathfinder progress and see pet battle information.

This bot uses:

- Node.js - A server framework which is used to create scalable network applications.
- Discord.js - A node.js module which allows for easy interaction with the Discord API.
- Blizzard.js - A node.js promise-based module which allows access to the Blizzard API.

## Set up

- Download and Install [Node.js](https://nodejs.org/en/)
- Install Discord.js

```
npm install discord.js
```

- Install Blizzard.js

```
npm install blizzard.js
```

- Rename 'config.json.template' to 'config.json'.
- Go to the [Battle.net Develop website](https://develop.battle.net/) to get your Client ID and Client Secret, and enter them into the config.
- Set "admin_role_name" to a Discord role on your server which you are happy to have access to ALL commands - preferably a role which only you have.
- A default realm and region may be set in the config so that users may leave out those part of the following commands.
- Go to the [Discord Developer Portal](https://discordapp.com/developers) and create a new application.
- Convert the application into a bot, place the discord token into "Token" in the config.
- Invite your bot to your discord server (To do this, on your bot page, go to the 'OAuth2' page, in the Scopes section tick 'Bot', and then copy and paste the link into your browser.)
- Run startAlarmOBot.bat

## Commands

- Realms with more than one word (Eg Argent Dawn) must replace spaces with dashes (Argent-Dawn).
- Set a default realm and region within your config.json file.

```!inspect [name] [realm-name] [region]``` - Displays basic character information, item level and raid progression
```!token [region]``` - Current token price (in Gold) for the specified region

```!2v2 [name] [realm-name] [region]``` - 2v2 Arena Stats (Season statistics including rating, alongside all-time wins and losses)
```!3v3 [name] [realm-name] [region]``` - 3v3 Arena Stats
```!RBG [name] [realm-name] [region]``` - RBG Arena Stats
```!PVP [name] [realm-name] [region]``` - Displays various PVP Statistics, including Duels, Battlegrounds and Honorable Kill stats.

```!pets [name] [realm-name] [region]``` - Stats on the player's pets and pet battles
```!catcheck [name] [realm-name] [region]``` - Displays how many cats the player has

```!admin reload [race | class]``` - Gathers and saves the latest set of information from the API
```!reload filename``` - Reloads the file so that commands may be edited while the bot is active
```!ping```


## Maintenance

Considerations for adjusting to API changes over time:

- When a new raid is released, update the 'current raid ID' and 'number of raids to track' in the config to adjust the ```!inspect``` command.
- When a new battleground is added to the game, the exact area in the statistics array to find RBG games played and RBG wins may have shifted.