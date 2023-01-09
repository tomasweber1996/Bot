const discord = require("discord.js");
const { ask } = require("../util/ai.js");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const fs = require("fs");

module.exports = {
    info: {
        name: "ask",
        description: "preguntas al bot",
        usage: "!ask [question]",
        aliases: [""],
    },

    run: async function (client, message, args) {
        const file= './nuevo.txt'
        async function createTextFile(file,contenido) {
            fs.open(file, 'w', (error, fileHandle) => {
                if (error) throw error;
              
                // Escribe una cadena vacía en el archivo
                fs.write(fileHandle, contenido, (error) => {
                  if (error) throw error;
              
                  // Cierra el archivo
                  fs.close(fileHandle, (error) => {
                    if (error) throw error;
                  });
                });
              });
    
        }
        const rol = message.guild.roles.cache.find(r => r.name === 'admin')
        if (((message.content.substring(0, 1) === "¡") && (message.channel.name === 'preguntas-al-bot')) || (message.member.roles.cache.has(rol.id))) {
          const prompt = message.content.substring(5); //remove the exclamation mark from the message
          const answer = await ask(prompt); //prompt GPT-3function WriteToFile(passForm) {
          const channel = message.channel;
          createTextFile(file,answer);
          // Crea una promesa que se resuelve cuando el archivo se ha enviado al canal
          const filePromise = channel.send({
            content: 'By GPT-3.',
            files: [{
              attachment: file,
              name: 'respuesta.txt'
            }]
          });
      
          filePromise.then(() => {
            console.log('El archivo se ha enviado al canal');
          }).catch(error => {
            console.error(`Error al enviar el archivo: ${error}`);
          });
        } else {
            message.channel.send('Debes utilizar el canal y el prefijo necesario para el comando.')
            }
        } 
}