const { Client, CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
  name:"role",
  category: "mod",
  description:"Give / Remove role to/from a user",
  cooldown:1,
  userPerms:["MANAGE_ROLES"],
  options:[
    {
      name:"give_or_remove",
      description:"Pick a type",
      type:3,
      required:true,
      choices:[
        {
          name:"Give",
          value:"Give"
        },
        {
          name:"Remove",
          value:"Remove"
        },
      ],
    },
    {
      name:"user",
      description:"User to give/remove role",
      type:6,
      required:true
    },
    {
      name:"role",
      description:"The role to give/remove",
      type:8,
      required: true
    }
  ],
    async run (client, interaction, args) {
    try {
      let user = interaction.options.getMember("user")
      let choice = interaction.options.getString("give_or_remove")
      let role = interaction.options.getRole("role")

      let embed = new MessageEmbed()
      .setColor("#1ABF00")
      .setDescription(`✅ | ${user.user.username} Changed roles, **+${role.name}**`)
      let embed2 = new MessageEmbed()
      .setColor("#1ABF00")
      .setDescription(`✅ | ${user.user.username} Changed roles, **-${role.name}**`)
      if (interaction.member.roles.highest.position <= role.position && interaction.guild.ownerId !== interaction.member.id ) return interaction.editReply({
        content:`🙄 - This role is higher than yours`
      })
      if (user.roles.highest.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== user.user.id ) return interaction.editReply({
        content:"🙄 - This user is higher than you or you both have the same role "
      })
      if (choice == "Give" ) {
       await user.roles.add(role)
       await interaction.editReply({
          embeds:[embed]
        })
      }

      if (choice == "Remove" ) {
        if (!user.roles.cache.some(rol => rol == role )) return interaction.editReply({
          content:`❌ | **${user.user.username} doesn't have this role** , \`@${role.name}\``
        })
        await user.roles.remove(role)
        await interaction.editReply({
          embeds:[embed2]
        })
      }

    } catch (err) {
      console.log(err)
      interaction.editReply({
        content:"❗ Please check my permissions and role position"
      })
    }
  }
}