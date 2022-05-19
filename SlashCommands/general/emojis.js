const { Client, CommandInteraction, MessageEmbed } = require("discord.js") 
module.exports = {
  name: "emojis",
  description:"Show server emojis",
  options: [],
  run : async( client, interaction,args) => {
    try {  
      await interaction.editReply({content:`There Is all the emojis in ${interaction.guild.name}`})
        var emojis = interaction.guild.emojis;
        if (emojis.cache.size == 0) return interaction.editReply({content:`here is no any emoji`});
        
      
 var embed = new MessageEmbed()
            .setColor('#2F3136')
            
   .setFooter(interaction.member.user.username, interaction.member.user.displayAvatarURL({dynamic:true}))
            .setTitle('Emojis list')
          
            .setDescription(`${emojis.cache.filter(e => e).map(e => `\n${e} - \`<:${e.name}:${e.id}>\``).join(' ')}`)
                      
        interaction.editReply({ embeds: [embed] })
    } catch (err) {
      interaction.editReply({
        content:"Error ❗"
      })
      console.log(err)
}
} 
  }