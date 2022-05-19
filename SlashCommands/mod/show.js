const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'show',
    category: "mod",
    description: 'show the channels',
  options:[
    {
      name:"channel",
      description:"The channel you want to unhide",
      type:7,
     required:false,
      channelTypes:["GUILD_TEXT"]
    },
  ],
    run: async (client, interaction, args) => {
let channel = interaction.options.getChannel("channel")
if (!channel) channel = interaction.channel
      if(!interaction.member.permissions.has('MANAGE_CHANNELS')) return;
      channel.permissionOverwrites.edit(interaction.guild.id, { VIEW_CHANNEL: true})
      const embed = new MessageEmbed()
      .setAuthor(`${interaction.user.tag} ` , interaction.user.avatarURL())
      .setTitle(`> > ${channel.name} <  permissions Updated`)
      .setDescription(`VIEW_CHANNEL => ON`)
        interaction.editReply({embeds : [embed]})
  }
}
