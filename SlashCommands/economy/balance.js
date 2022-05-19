const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'balance',
    category: "economy",

    description: 'Shows your balance.',
    options: [
        {
            name: 'user',
            description: 'User to get avatar',
            type: 6,
        },
    ],
    run: async (client, interaction, args) => {
        const user = interaction.options.getMember('user') || interaction.member;
        if (user.user.bot) return interaction.editReply({ content: `You can't use this command with bot.` });

        let bal = db.fetch(`money_${user.id}`);

        if (bal === null) bal = 0;

        let bank = await db.fetch(`bank_${user.id}`);

        if (bank === null) bank = 0;

        if (user) {

            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(
                    `${user.user.username}'s Balance\n\nPocket: \`${bal}\`\nBank: \`${bank}\``
                );

            interaction.editReply({ embeds: [embed] });
        } else {
            return interaction.editReply({ content: "Invalid user." });
        }
    }
} 
