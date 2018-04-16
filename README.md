# Alarm-O-Bot

This is a simple bot for World of Warcraft Discord servers.

This bot uses:

- Node.js - A server framework which is used to create scalable network applications.
- Discord.js - A node.js module which allows for easy interaction with the Discord API.
- Blizzard.js - A node.js promise-based module which allows access to the Blizzard API.

## Config

- Rename 'config.json.template' to 'config.json'.
- Set "admin_role_name" to a Discord role on your server which you are happy to have access to ALL commands - preferably a role which only you have.
- A default realm and region may be set in the config so that users may leave out those part of the following commands.

## Commands

- Realms with more than one word (Eg Argent Dawn) must replace spaces with dashes (Argent-Dawn).
- The bot must be validated through Blizzard before it may use certain commands such as '!token'. To do this, use the '!admin validate' command, which will add the "BLIZZARD_API_ACCESS_TOKEN" to your config file for you. This token expires after 30 days. This will be automated in the future.

```
!inspect Name Realm-Name region - Displays basic character information, item level and raid progression
!token region - Current token price (in Gold) for the specified region

!2v2 - 2v2 Arena Stats (Season statistics including rating, alongside all-time wins and losses)
!3v3 - 3v3 Arena Stats
!RBG - RBG Arena Stats

!PVP - Displays various PVP Statistics, including Duels, Battlegrounds and Honorable Kill stats.
!pets - Stats on the player's pets and pet battles
!catcheck - Displays how many cats the player has

!admin validate - Assigns an access token which lasts 30 days, allowing access to commands such as !token
!admin credentials - Prints details of the credentials to console
!admin reload [race | class] - Gathers and saves the latest set of information from the API
!reload filename - Reloads the file so that commands may be edited while the bot is active
!ping
```