const { Discord , MessageEmbed} = require('discord.js')
module.exports = {
  name: "lock",
  category: "mod",
  description: "locks the current or selected text channels",
  options: [],
run : async (client, interaction, args) => {
      if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.editReply({content : `** ليس لديك صلاحية لإستعمال الأمر ! 🙄 **`});
interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
SEND_MESSAGES: false
      })
      .then(() => {
let locked = new MessageEmbed()
.setTitle("lock")
.setDescription(`
> ✅ | **locked Channel**
> **Channel Name** : <#${interaction.channel.id}>
> **Locked By** : <@${interaction.user.id}>`)
.setColor("0189A1")
.setTimestamp()
 interaction.editReply({ embeds: [locked] })
});
}
}
