const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error")

module.exports = {
  info: {
    name: "nowplaying",
    description: "Muestra lo que se esta reproduciendo",
    usage: "",
    aliases: ["np"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Estoy fuera de linea", message.channel);
    
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Reproduciendo", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Nombre", song.title, true)
      .addField("Duracion", song.duration, true)
      .addField("Pedido por:", song.req.tag, true)
      .setFooter(`Vistas ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  },
}