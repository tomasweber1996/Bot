const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "volume",
    description: "To change the server song queue volume",
    usage: "[volume]",
    aliases: ["v", "vol"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("Entra en un canal antes", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("No estoy reproduciendo nada.", message.channel);
    if (!args[0])return message.channel.send(`Volumen actual: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send(':notes: Solo numeros').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('No podes poner mas que 150 o menos que 0',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`Volumen cambiado a: **${args[0]/1}/100**`)
    .setAuthor("Control de volumen", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
    .setColor("BLUE")
    return message.channel.send(xd);
  },
};