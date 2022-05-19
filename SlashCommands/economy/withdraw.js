const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = {
        name: "withdraw",
        category: "economy",
        description: "withdraw to your balance",
  	options: [
  		{
  			name: 'amount',
  			description: 'amout to deposit ',
  			type: 3,
  			required: true,
  		},
  	],
      run : async(client, interaction, args) => {
        const input = interaction.options.getString('amount');
        let user = interaction.member;
        let member2 = db.fetch(`bank_${user.id}`)

        if (args.join(' ').toLocaleLowerCase() == 'all') {
            let money = await db.fetch(`bank_${user.id}`)
            let embed = new MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`You don't have any money in your bank.`)
            if (!money) return interaction.editReply({embeds :[embed]})
            db.subtract(`bank_${user.id}`, money)
            db.add(`money_${user.id}`, money)
            let embed5 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`✅ You have withdrawn all your coins.`);
           interaction.editReply({embeds :[embed5]})

        } else {

            let embed2 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Specify an amount.`);

            if (!args[0]) {
                return interaction.editReply({embeds :[embed2]})
            }
            let embed6 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`❌ Your Amount Is Not A Number!`)

            if(isNaN(args[0])) {
                return interaction.editReply({embeds :[embed6]})
            }
            let embed4 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You don't have enough money.`);

            if (member2 < args[0]) {
                return interaction.editReply({embeds :[embed4]})
            }

            let embed5 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`✅ You have withdrawn ${args[0]} coins.`);

            interaction.editReply({embeds :[embed5]})
            db.subtract(`bank_${user.id}`, args[0])
            db.add(`money_${user.id}`, args[0])
        }
    }
}