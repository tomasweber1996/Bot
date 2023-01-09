const config = require('../config.json')
const discord = require('discord.js');
module.exports = {
    info: {
        name: "clear",
        description: "Limpiar canal",
        usage: "[clear]",
        aliases: ["clr"],
    },

    run: async function (client, message, args) {
        if (!message.member.roles.cache.has(message.guild.roles.cache.find(role => role.name === config.rol1).id)) return message.reply("No tienes tanto poder")
        const cantidad = args[0]
        if (cantidad === 'vc') {
            const guild = client.guilds.cache.first();
            // Obtener una referencia a la categoría con ID '2345678901'
            const category = guild.channels.cache.get(config.parentid);
            // Verificar que la categoría es una categoría
            if (category.type === 'category') {
            // Obtener todos los canales de la categoría
            category.children.forEach(ch => {
                if (ch.members.size === 0) {
                    ch.delete()
                    return message.author.send("Limpieza finalizada")
                }
            })
            }
        } else {
        if (!cantidad) return message.reply("Debes decirme que quieres eliminarr")

        if (isNaN(cantidad)) return message.reply("Debes que quieres eliminar")

        if (cantidad > 99) {
            return message.reply("No puedes eliminar tantos mensajes a la vez")
        }
        if (cantidad < 1) {
            return message.reply("La cantidad de mensajes no puede ser menor a 1")
        }
        
            await message.delete().then(g => {
                message.channel.bulkDelete(cantidad).then(messages => message.author.send('Mensajes eliminados')).catch(error => message.author.send('No puedes eliminar mensajes con mas de 14 dias de antiguedad'))
                
            })

        }
    }

}