const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { chunk } = require('../../All_Files/functions');

module.exports = {
    name: "setbio",
    description: "set bio for your bank profile",
    category: 'economy',
    options: [
        {
            name: 'input',
            description: 'amout to deposit ',
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction, args) => {
        const input = interaction.options.getString('input');
        let user = interaction.member;
        if (!input) {
            let fetchInfo = await db.fetch(`info_${user.id}`)
            if (fetchInfo) {
                let embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor('Current bio:', interaction.user.avatarURL())
                    .setDescription(`\`${fetchInfo}\``)
                    .setFooter(interaction.guild.name, interaction.guild.iconURL())
                return interaction.editReply({ embeds: [embed] })
            }
        }
        let newInfo = input;
        if (!newInfo) return interaction.editReply({ content: 'Enter the new bio.' });
        if (newInfo.length > 60) return interaction.editReply({ content: `Max \`60\` characters.` });
        db.set(`info_${user.id}`, newInfo);

        let notesEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`You have changed your bio.`, interaction.user.avatarURL())
            .setDescription(`New Bio is : **${newInfo}**`)
            .setFooter(interaction.guild.name, interaction.guild.iconURL())
        interaction.editReply({ embeds: [notesEmbed] });
    }
};