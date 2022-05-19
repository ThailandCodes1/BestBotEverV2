const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
  name: "removemoney",
  category: "economy",
  description: "remove money from a user",
  options: [
    {
      name: 'user',
      description: 'User to remove money',
      type: 6,
      required: true,
    },
    {
      name: 'amount',
      description: 'amout to deposit ',
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const user = interaction.options.getMember('user')
    const input = interaction.options.getString('amount');
    if (!interaction.member.permissions.has('ADMINSTRATOR')) return;
    if (user.user.bot) return interaction.editReply({ content: `You can't use this command with bot.` });
    if (isNaN(input)) return interaction.channel.send({ content: "Enter a valid amount." });
    let bal = await db.fetch(`money_${user.id}`)
    if (input > bal) return interaction.editReply({ content: `This member does not have **${input} Coins ** in his balance` })
    db.subtract(`money_${user.id}`, input)
    let bal2 = await db.fetch(`money_${user.id}`)

    let moneyEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`User: ${user},\nAmount: ${input},\nNew balance: ${bal2}.`);
    interaction.editReply({ embeds: [moneyEmbed] })

  }
}
