# Alarm-O-Bot

This is a simple bot for World of Warcraft Discord servers.

## Commands

- A default realm and region may be set in the config so that users may leave out those part of the following commands.
- Realms with more than one word (Eg Argent Dawn) must replace spaces with dashes (Argent-Dawn).

```
!inspect Name Realm-Name region - Displays basic character information, item level and raid progression
!token region - Current token price for each region

!2v2 - 2v2 Arena Season Stats
!3v3 - 3v3 Arena Season Stats

!catcheck - Displays how many cats the player has

!admin validate - Assigns an access token which lasts 30 days, allowing access to commands such as !token
!admin credentials - Prints details of the credentials to console
!reload filename - Reloads the file so that commands may be edited while the bot is active
!ping - pong
```