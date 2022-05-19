const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
        name: "leaderboard",
        category: 'economy',
        description: 'who the rich ?',
        options: [],
run: async(client, interaction, args)=> {
        let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
        if (!money.length) {
            let noEmbed = new MessageEmbed()
                .setAuthor(interaction.member.displayName, interaction.author.displayAvatarURL())
                .setColor("RANDOM")
                .setFooter("What do you think to get your daily?")
            return interaction.editReply({embeds : [noEmbed]})
        };

        money.length = 10;
        var finalLb = "";
        for (var i in money) {
            if (money[i].data === null) money[i].data = 0
            finalLb += `**${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]) : money[i].ID.split('_')[1]}** - ${money[i].data} :dollar:\n`;
        };

        const embed = new MessageEmbed()
            .setTitle(`Leaderboard Of ${interaction.guild.name}`)
            .setColor("RANDOM")
            .setDescription(finalLb)
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setTimestamp()
        interaction.editReply({embeds :[embed]});
    }
};