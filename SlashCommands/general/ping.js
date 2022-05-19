const Discord = require("discord.js")

const pretty = require("pretty-ms")


module.exports = {
  name:"ping",
  description:":ping_pong: returns websocket ping",
  run: async (client, interaction, args) => {
    let embed = new Discord.MessageEmbed()
    . addFields(
      {
        name:"**API Latency**",
        value:`🟢 | ${client.ws.ping}ms`
      },
      {
        name:"**Message Latency**",
        value:`🔴 | ${Date.now() - interaction.createdTimestamp}ms`
      },
      {
        name:"**Uptime**",
        value:`⏲️ | ${pretty(client.uptime)}`
      }
    )
    .setColor("#4453F5")
    .setTitle("**:ping_pong: | Pong!**")
    .setFooter({
      text:`Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({dynamic:true})
    })
    interaction.editReply({embeds:[new Discord.MessageEmbed().setDescription("🚨 Loading...").setColor("#4453F5")]}).then(() =>
      setTimeout(() => {
        interaction.editReply({embeds:[embed]})
      }, 2*1000))
  }
}