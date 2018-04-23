// RELOAD
// Reloads a command from cache to prevent having to shut the bot down whenever editing is required

exports.run = (client, message, args) => {
  if(!args || args.size < 1) return message.reply("Please provide a command name to reload.");
  delete require.cache[require.resolve(`./${args[0]}.js`)];

  message.reply(`!${args[0]} has been reloaded.`);
  console.log(`\x1b[33m`, `[RELOAD] !${args[0]} command has been reloaded.`);
};