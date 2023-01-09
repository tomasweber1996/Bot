const discord = require('discord.js');
module.exports = {
    info: {
        name: "module",
        description: "Recarga un modulo",
        usage: ["module [load/reload/unload][modulo]","module reloadall"],
        aliases: ["rld"],
    },

    run: async function (client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send("You don't have permission to use this command!");
          }
      
          // Get the command name from the arguments
          const commandName = args[0];
          // Check if the command exists
          if (commandName === 'reload'){
            if (!client.commands.has(args[1])) {
              return message.channel.send(`There is no command with name or alias \`${args[1]}\`, ${message.author}!`);
            }
        
            // Delete the command from the collection
            delete require.cache[require.resolve(`./${args[1]}.js`)];
        
            // Re-import the command
            client.commands.set(args[1], require(`./${args[1]}.js`));
        
            message.channel.send(`Command \`${args[1]}\` was reloaded!`);
          } else if (commandName === 'reloadall') {
              const commandNames = Array.from(client.commands.keys());

              // Loop through the commands and reload them
              for (const commandName of commandNames) {
                delete require.cache[require.resolve(`./${commandName}.js`)];
                client.commands.set(commandName, require(`./${commandName}.js`));
              }

              message.channel.send('All commands were reloaded!');
          } else if (commandName === 'load'){
              client.commands.set(args[1], require(`./${args[1]}.js`));
              message.channel.send(`Command \`${args[1]}\` was loaded!`);
            } else if (commandName === 'unload'){
                client.commands.delete(args[1])
                delete require.cache[require.resolve(`./${args[1]}.js`)];
                message.channel.send(`Command \`${args[1]}\` was unloaded!`);
            }
          

    },
}


