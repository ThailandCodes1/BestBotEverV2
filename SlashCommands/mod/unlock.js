const { Discord , MessageEmbed} = require('discord.js')
module.exports = {
  name: "unlock",
  category: "mod",
  description: "unLocks the current or selected text channels",
  options: [],
run : async (client, interaction, args) => {
      if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.editReply({content : `** ليس لديك صلاحية لإستعمال الأمر ! 🙄 **`});
interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
SEND_MESSAGES: true
      })
      .then(() => {
let locked = new MessageEmbed()
.setTitle("Unlock")
.setDescription(`
> ✅ | **Unlocked Channel**
> **Channel Name** : <#${interaction.channel.id}>
> **unLocked By** : <@${interaction.user.id}>`)
.setColor("0189A1")
.setTimestamp()
 interaction.editReply({ embeds: [locked] })
});
}
}
