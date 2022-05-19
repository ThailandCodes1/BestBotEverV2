const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: "members",
    category: "general",

description : "show members count",
options: [],
run: async(client, interaction, args)=> {
      let embed = new Discord.MessageEmbed()
      .setTitle(`**${interaction.guild.name}\' Member Count**`)
      .setDescription(
      `
  **Total Members : ${interaction.guild.memberCount}**
  **Humans : ${interaction.guild.members.cache.filter(m => !m.user.bot).size}**
  **Bots : ${interaction.guild.members.cache.filter(m => m.user.bot).size}**`)
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

		interaction.editReply({embeds: [embed]})

	}
}