const { MessageEmbed } = require(`discord.js`)

module.exports = {
  name: "help",
  category: "general",

  description: "Shows help command",
  options: [],
  run: async (client, interaction, args) => {

    let economyCmds = "";
    let generalCmds = "";
    let modCmds = "";
    client.commands.filter(c => c.category == "economy").map(cmd => {
        economyCmds += `> /${cmd.name} :: ${cmd.description} \n`;
    });

    client.commands.filter(c => c.category == "general").map(cmd => {
        generalCmds += `> /${cmd.name} :: ${cmd.description} \n`;
    });

    client.commands.filter(c => c.category == "mod").map(cmd => {
        modCmds += `> /${cmd.name} :: ${cmd.description} \n`;
    });



    const embed = new MessageEmbed()
        .setColor(`#0099ff`)
        .setAuthor(`${client.user.tag} | ${interaction.guild.name}` , interaction.guild.iconURL({dynamic : true}))
        .addField(`Economy Commands`, economyCmds)
        .addField(`General Commands`, generalCmds)
        .addField(`Moderation Commands`, modCmds)
        .setFooter({
          text: `${client.user.username} • Asked by ${interaction.user.tag}`,
          iconURL: client.user.displayAvatarURL()
          })
          .setTimestamp()

    await interaction.editReply({embeds: [embed]})
  }

}