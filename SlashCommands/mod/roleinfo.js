const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "roleinfo",
    category: "mod",
description : "show role inforamtion",
  options:[
    {
      name:"role",
      description:"The role",
      type:8,
      required:true
    },


  ],
    async run (client, interaction, args) {
let role = interaction.options.getRole("role")
        const status = {
            false: "**No**",
            true: "**Yes**"
        }
        let roleembed = new MessageEmbed()
            .setAuthor("Role Info")
            .setThumbnail(interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .addField(":id: ID", `\`${role.id}\``)
            .addField(":id: Name", `**${role.name}**`)
            .addField(":white_circle: Hex", `**${role.hexColor}**`)
            .addField(":busts_in_silhouette: Members", `**${role.members.size}**`)
            .addField(":dividers: Position", `**${role.position}**`)
            .addField(":pushpin: **Mentionable**", `**${status[role.mentionable]}**`)
            .setTimestamp()

interaction.editReply({embeds: [roleembed], allowedMentions:{repliedUser:false}})
	}
}