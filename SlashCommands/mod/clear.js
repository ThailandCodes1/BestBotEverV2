const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "clear",
    category: "mod",
    description: "clear message",
    options: [
        {
            name: "number",
            description: "num",
            type: 4,
            required: false
        },
    ],
    run: async (client, interaction, args) => {
        let num = interaction.options.getNumber("number")
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) { //if you (user) don't have ban member permission then
            const banError = new MessageEmbed()
                .setDescription('**You don\'t have permissions to delete messages!**')
            return interaction.editReply({ embeds: [banError] }) //return this embed

        } else if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES')) { //if bot don't have ban member permission then
            const banError1 = new MessageEmbed()
                .setDescription('**I don\'t have permissions to delete messages!**')
            return interaction.editReply({ embeds: [banError1] }) //return this embed
        }

        if (!num) num = 100;
        let c = interaction.channel;
        await interaction.deleteReply()
        await c.bulkDelete(num).then(async messages => {
            const embed = new MessageEmbed()
                .setDescription(`\`\`${messages.size} messages was deleted \`\``)
                .setColor("#ff0000")
            await client.channels.cache.get(interaction.channel.id).send({ embeds: [embed] }).then(msg => setTimeout(() => { msg.delete() }, 5000))
        })
    }
}