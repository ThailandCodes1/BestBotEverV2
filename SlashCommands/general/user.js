
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const moment = require("moment")

module.exports = {
  name: "user",
  category: "general",

  description: "Shows information, join date, about yourself or a user.",
  options: [
    {
      name: 'user',
      description: 'the targeted user',
      type: 6
    }
  ],
  run: async (client, interaction, args) => {
    const user = interaction.options.getMember('user') || interaction.member;
    const MemLogo = user.user.avatarURL({ dynamic: true });
    const row1 = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle('LINK')
        .setURL(`https://discord.com/users/${user.user.id}`)
        .setEmoji('827619892277674025')
        .setLabel('Profile Link'))
    let embed1 = new MessageEmbed()
      .setAuthor(`${user.user.tag}`, user.user.avatarURL())
      .setImage(MemLogo)
      .setColor('#0189A1')
      .addField("**Username :**", `**${user.user.username}**`, true)
      .addField("**User Tag:**", `**#${user.user.discriminator}**`, true)
      .addField("**User ID:**", `**${user.user.id}**`, true)
      .addField("**Joined Discord :**", `** <t:${parseInt(user.user.createdAt / 1000)}:R> **`, true)
      .addField("**Joined Server :**", `** <t:${parseInt(user.joinedAt / 1000)}:R> **`, true)
      .addField(`_ _`, `[Download Avatar](${MemLogo})`, false)
      .setFooter({
        text: `${client.user.username} • Asked by ${interaction.user.tag}`,
        iconURL: client.user.displayAvatarURL()
      })
      .setTimestamp()

    await interaction.followUp({ embeds: [embed1], components: [row1] })


  }
}
