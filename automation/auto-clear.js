const {MessageEmbed} = require('discord.js')
const config = require('../config.json');
module.exports = function (client) {
    console.log('Modulo auto-clear cargado');
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        // Iniciamos un temporizador que elimine los mensajes cada hora
        const guild = client.guilds.cache.first();
        setInterval(() => {
          // Obtenemos el canal de texto donde queremos eliminar los mensajes
          if (guild.channels.cache.find(channel => channel.name === 'preguntas-al-bot')){
            const channel = client.channels.cache.get(guild.channels.cache.find(channel => channel.name === 'preguntas-al-bot').id);
            // Obtenemos los últimos 100 mensajes del canal
            channel.messages.fetch({ limit: 100 })
              .then(messages => {
                if (messages.size > 0) {
                  messages.forEach(message => {
                    const now = new Date();
                    const messageDate = new Date(message.createdTimestamp);
                    const difference = now - messageDate;
                    if ((difference > 1000) && (message.author.username != client.user.username) || (message.embeds.length <= 0)) { // 86400000 milisegundos = 24 horas
                      message.delete();
                    }
                  });
                }
                // Iteramos sobre los mensajes y eliminamos aquellos que tengan más de 24 horas
              
              })
              .catch(console.error);
          }
        }, 20000); // 3600000 milisegundos = 1 hora
      });
};