const {MessageEmbed} = require('discord.js')

module.exports = async (client, message, args) => {
  let statuses = [
    "Musica en R++"
  ]

  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, {
      type: "LISTENING",
    });
  }, 1000);
  
  console.log(`[API] Logged in as ${client.user.username}`);
};
