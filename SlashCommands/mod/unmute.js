const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'unmute',
    category: "mod",
    description: 'muting member from sending messages .',
    options: [
        {
            name: "user",
            description: "The user",
            type: 6,
            required: true
        },
    ],
    run: async (client, interaction, args) => {
        const user = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason')
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.editReply('You do not have permissions to use this command')
        if (!user) return interaction.editReply('Member not found')
        const role = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
        await user.roles.remove(role)
        interaction.editReply(`${user.displayName} is now unmuted`)
        const { guild } = interaction

        user.send

        const kk = new MessageEmbed()


            .setTimestamp()
            .setColor("BLACK")

            .setDescription(`
**Astriex Moderation**
Your punishment has been updated in ${interaction.guild.name}
**Action**
Unmuted

`)


        await user.send({ embeds: [kk], ephemeral: true })
    }
}
