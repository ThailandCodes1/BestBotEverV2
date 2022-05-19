const { Message, MessageEmbed } = require('discord.js')
const ms = require('ms')
const humanizeDuration = require('humanize-duration');


module.exports = {
    name: 'mute',
    category: "mod",
    description: 'muting member from sending messages .',
    options: [
        {
            name: 'user',
            description: 'User to timeout.',
            type: 6,
            required: true,
        },
        {
            name: 'time',
            description: 'Time for user to timeout. example: (1m, 1d, 1mo).',
            type: 3,
            required: true,
        },
        {
            name: "reason",
            description: "The reason of this kick",
            type: 3,
            required: false
        },
    ],
    /**
     * @param {Message} message
     */
    run: async (client, interaction, args) => {
        const user = interaction.options.getMember('user')
        const time = interaction.options.getString('time')
        const reason = interaction.options.getString('reason')
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.editReply('You do not have permissions to use this command')
        if (!user) return interaction.editReply({ content: "Member is not found." })
        const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if (!role) {
            try {
                interaction.editReply('Muted role is not found, Please Make role named `muted`.')

                let muterole = await interaction.guild.roles.create({
                    data: {
                        name: 'muted',
                        permissions: []
                    }
                });
                interaction.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                interaction.editReplyinteraction.editReply({ content: "Muted role has sucessfully been created." })
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if (user.roles.cache.has(role2.id)) return interaction.editReply(`${user.displayName} has already been muted.`)
        await user.roles.add(role2)
        interaction.editReply({ content: `${user.displayName} is now muted for ${humanizeDuration(ms(time), { round: true })}.` })
        setTimeout(() => {
            user.roles.remove(role2);
        }, ms(time))
        return


        const { guild } = interaction.user.send

        const kk = new MessageEmbed()
            .setTimestamp()
            .setColor("BLACK")

            .setDescription(`
**Astriex Moderation**
Your punishment has been updated in ${interaction.guild.name}
**action**
Muted
**Reason**
${reason}`, true);
        await user.send({ embeds: [kk], ephemeral: true })

    }
}
