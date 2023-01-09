const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "help",
        description: "Ayuda",
        usage: "[command]",
        aliases: ["commands", "help me", "pls help"]
    },

    run: async function(client, message, args){
        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="`"+"!"+cmdinfo.name+" "+cmdinfo.usage+"` ~ "+cmdinfo.description+"\n"
        })

        let embed = new MessageEmbed()
        .setAuthor("Comandos "+client.user.username, "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
        .setColor("BLUE")
        .setDescription(allcmds)
        .setFooter(`escriba: ${client.config.prefix}help [command]`)

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Comando desconocido")
            let commandinfo = new MessageEmbed()
            .setTitle("Comando: "+command.info.name+" info")
            .setColor("YELLOW")
            .setDescription(`
            Nombre: ${command.info.name}
            Descripcion: ${command.info.description}
            Uso: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
            Aliado: ${command.info.aliases.join(", ")}
            `)
            message.channel.send(commandinfo)
        }
    }
}