const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("pretty-ms");

module.exports = {
        name: "weekly",
        category: "economy",
        description: "get weekly money",
    run: async (client, interaction, args) => {

        let user = interaction.member;
        let timeout = 5000;
       var amount = Math.floor( Math.random() * 5000)
        let weekly = await db.fetch(`weekly_${user.id}`);

        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly));

            let timeEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You can collect it again in ${time}.`);
            interaction.editReply({embeds : [timeEmbed]})
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You've collected ${amount} coins from weekly.`);
            interaction.editReply({embeds : [moneyEmbed]})
            db.add(`money_${user.id}`, amount)
            db.set(`weekly_${user.id}`, Date.now())


        }
    }
}