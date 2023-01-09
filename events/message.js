const config = require("../config")
module.exports = async (client, message) => {
    if (message.author.bot) return;
  
    if (message.channel.type === 'dm') {
      return;
    } else if (message.content.substring(0, 1) === config.PREFIX) {
      const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
      const prefix = message.content.match(prefixMention) ?   message.content.match(prefixMention)[0] : client.config.prefix;
      const serverQueue = message.client.queue.get(message.guild.id);

      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      
      const command = args.shift().toLowerCase();
    
      const cmd = client.commands.get(command);
      
      const aliases = client.commands.find(x => x.info.aliases.includes(command))
    
      
    process.on("unhandledRejection", (reason, promise) => {
        try {
            console.error("Unhandled Rejection at: ", promise, "reason: ", reason.stack || reason);
        } catch {
            console.error(reason);
        }
    });
    require('events').EventEmitter.defaultMaxListeners = 25
    
    
    
      
      if(cmd){
        cmd.run(client, message, args);
      }else if(aliases){
        aliases.run(client, message, args);
      }else return
    }
    
  };