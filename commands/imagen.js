const {MessageEmbed} = require('discord.js')
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const request = require("request");
const fs = require('fs');
const { channel } = require('diagnostics_channel');

module.exports = {
  info: {
    name: "imagen",
    description: "genera una imagen a partir de texto",
    usage: "!image tu-descripcion",
    aliases: ["img"],
  },
  
  run: async function (client, message, args) {
    const rol = message.guild.roles.cache.find(r => r.name === 'admin')
        if (((message.content.substring(0, 1) === "!") && (message.channel.name === 'preguntas-al-bot')) || (message.member.roles.cache.has(rol.id))){
            const text = message.content.substring(8); 
            const response = await openai.createImage({
                model: "image-alpha-001",
                prompt: text,
                n: 1,
                size: "1024x1024"
            });
            const url = response.data.data[0].url;
            message.channel.send(url);
        } else {
            message.channel.send('Debes utilizar el canal y el prefijo necesario para el comando.')
            }
  },
};

