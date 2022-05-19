const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'hide',
    category: "mod",
    description: 'hide the channels',
  options:[
    {
      name:"channel",
      description:"The channel you want to hide",
      type:7,
     required:false,
      channelTypes:["GUILD_TEXT"]
    },
  ],
    run: async (client, interaction, args) => {
let channel = interaction.options.getChannel("channel")
if (!channel) channel = interaction.channel
      if(!interaction.member.permissions.has('MANAGE_CHANNELS')) return;
      channel.permissionOverwrites.edit(interaction.guild.id, { VIEW_CHANNEL: false})
      const embed = new MessageEmbed()
      .setAuthor(`${interaction.user.tag} ` , interaction.user.avatarURL())
      .setTitle(`> > ${channel.name} <  permissions Updated`)
      .setDescription(`VIEW_CHANNEL => OFF`)
        interaction.editReply({embeds : [embed]})
  }
}
