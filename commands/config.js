const {MessageEmbed} = require('discord.js')


module.exports = {
  info: {
    name: "config",
    description: "config",
    usage: "[config]",
    aliases: ["cfg"],
  },
  
  run: async function (client, message, args) {
    if ((message.guild.channels.cache.find(c => c.name.toLowerCase() === 'preguntas-al-bot')) && (message.guild.channels.cache.find(c => c.name.toLowerCase() === 'invitacion')))    { 
      message.channel.send('El servidor ya esta configurado')   
    }
    else {
      if (!message.guild.channels.cache.find(c => c.name.toLowerCase() === 'preguntas-al-bot')){
        const newEmbed = new MessageEmbed()
          .setAuthor('Yisus_DJ')
          .setDescription('Busca aqui tu arte o duda')
          .setColor('#d32256')
          .addField('Preguntas:','Para hacerme una pregunta debes utilizar el comando "!ask tu pregunta"')
          .addField('Imagenes', 'Para que te haga un dibujo debes utilizar el comando "!imagen descripcion de lo que queres que dibuje"')
        message.guild.channels.create('preguntas-al-bot',{ 
          type: 'text'  
          }).then(channel => { 
        channel.send('Bienvenido a mi canal')
        newEmbed.type = 'EMBED'
        channel.send(newEmbed)
      })
    }
    if (!message.guild.channels.cache.find(c => c.name.toLowerCase() === 'invitacion')){
      const newEmbed = new MessageEmbed()
        .setAuthor('Yisus_DJ')
        .setTitle('Invitacion para nuevos miembros')
        .setColor('#00FF00')
        .setDescription('Utiliza este link para enviarle a tus amigos que quieran unirse a este servidor de discord: https://discord.gg/gkQQKVGRRn')
        .setImage('https://media.discordapp.net/attachments/1019693777113329675/1061878771822641172/Milton_un_logo_con_la_sigla_R_con_tematica_shooter_dark_80e6dbe9-df1e-4fe0-a9fb-84239811de49.png?width=671&height=671')
        .setFooter('Que GHOST los ampare')
      message.guild.channels.create('invitacion',{ 
        type: 'text'  
        }).then(channel => { 
      channel.send('Bienvenido al servidor')
      newEmbed.type = 'EMBED'
      channel.send(newEmbed)
    })
  }
    }
  },
};




