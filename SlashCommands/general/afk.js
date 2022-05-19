const { Client, Message, MessageEmbed } = require('discord.js');
const { afk } = require("../../utils/afk")


module.exports = {
    name: 'afk',
    category: "general",
    memberpermissions: ["SEND_MESSAGES"],
    description: 'Put User in AFK',
    options: [
        {
            name: "reason",
            description: "The reason of this ban",
            type: 3,
            required: false
        },
    ],

    run: async (client, interaction, args) => {
        const reason = interaction.options.getString('reason') || 'No reason';
        if (interaction.guild.ownerId === interaction.user.id) return interaction.editReply({ content: `you are the owner of the server so i can't change your name` })
        afk.set(interaction.user.id, [Date.now(), reason]);
        interaction.member.setNickname(`[AFK] ${interaction.user.username}`)
        interaction.editReply({ content: `You have been set as AFK. \`${reason}\`` })
    }
}