const config = require('../config.json');
module.exports = function (client) {
    console.log('Modulo Stats cargado');
    client.on("ready", async () => {
        var id
        var rol
        client.guilds.cache.forEach(server => {id =`${server.id}`})
        const guild = client.guilds.cache.get(id); //ID del servidor
        rol = guild.roles.cache.find(r => r.name === config.rol1)
        console.log('rol' + rol)

        setInterval(function () {
            //const c1 = (guild.roles.cache.get('').members.size); //ID del rol
            const c2 = rol.members.size;
            console.log(guild);
            const online = guild.members.cache.filter(m => m.presence?.status === 'online' && !m.user.bot).size; //usuarios en linea No bots
            console.log(`ONLINE: ${online}`); //pruebas
            //console.log(`${c1}`)
            console.log(`${c2}`)
           //guild.channels.cache.get('').setName(` ${c1}`);// modifica el nombre si es necesario introducir ID del canal a modificar
           //guild.channels.cache.get('').setName(` ${c2}`);
           guild.channels.cache.get('1053348115211632710').setName(` ${online}`);
        }, 100000)
    })
};