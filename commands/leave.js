const discord = require("discord.js");

module.exports = {
    info: {
        name: "leave",
        description: "Leaves the voice channel of the messenger",
        usage: "[leave]",
        aliases: ["l"],
    },

    run: async function (client, message, args) {
        let embed = new discord.MessageEmbed()
        .setDescription("Bye nigga!")
        .setColor("YELLOW")
        .setFooter(`Requested by ${message.author.username}`)
        const voiceChannel = message.member.voice.channel;
        
        if (!voiceChannel) return message.channel.send("Debes estar en un canal de voz");
      
        await voiceChannel.leave();
        //await message.channel.send(embed);
    }
  
}


