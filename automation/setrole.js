module.exports = function (client) {

    console.log('setrole cargado');

    client.on("guildMemberAdd", member => {
        member.roles.add(member.guild.roles.cache.find(i => i.name === '')); //busca ID de rol por nombre
        console.log('rol asignado')
    })
};