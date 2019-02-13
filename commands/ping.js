// PING
// Simple ping test command

exports.run = (client, message, args, blizzard, config) => {
    message.channel.send("Pong!").catch(console.error);
}