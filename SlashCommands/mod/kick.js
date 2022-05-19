const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    category: "mod",
    description: 'kick a user from the server. ',
    options:[
{
     name:"user",
     description:"The user",
     type:6,
     required:true
},
{
     name:"reason",
     description:"The reason of this kick",
     type:3,
     required:true
},
],
    run: async(client, interaction, args) => {
        const mentionedMember = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason') //join the arguments you write as reason of kickning the member



        if(! interaction.member.permissions.has('kick_MEMBERS')) { //if you (user) don't have kick member permission then
            const kickError = new MessageEmbed()
            .setDescription('**You don\'t have permissions to kick members!**')
            return interaction.editReply({ embeds: [kickError] }) //return this embed

        } else if(! interaction.guild.me.permissions.has('kick_MEMBERS')) { //if bot don't have kick member permission then
            const kickError1 = new MessageEmbed()
            .setDescription('**I don\'t have permissions to kick members!**')
            return interaction.editReply({ embeds: [kickError1] }) //return this embed
        }

        const mentionedPosition = mentionedMember.roles.highest.position //the highest role of the mentioned member
        const memberPosition = interaction.member.roles.highest.position //highest role of you
        const botPosition = interaction.guild.me.roles.highest.position //highest role of the bot

        if(memberPosition <= mentionedPosition) { //if your role is lower or equals to the mentioned member u wanna kick
            const kickErr = new MessageEmbed()
            .setDescription('**You cannot kick this member because their role is higher/equal to yours!**')
            return interaction.editReply({ embeds: [kickErr] }) //return this embed
        } else if (botPosition <= mentionedPosition) { //if bot role is lower or equals to the mentioned member u wanna kick
            const kickErr1 = new MessageEmbed()
            .setDescription('**I cannot kick this member because their role is higher/equal to mine!**')
            interaction.editReply({ embeds: [kickErr1] }) //return this embed
        }

        try{
            await mentionedMember.kick(reason).then(() => {
                const kickSuccess = new MessageEmbed()
                .setTitle(`${mentionedMember.user.tag} was kicked by ${interaction.member.user.tag}`)
                .setDescription(`Reason: ${reason}`)
                interaction.editReply({ embeds: [kickSuccess] }) //send a message in channel that you kickned that user
            })


        } catch (error) {
            const errorEmbed = new MessageEmbed()
            .setDescription(':x: **There was an error while kickning this user!**')
            return interaction.editReply({ embeds: [errorEmbed] }) //send an embed when it caught error
        }
    }
} 
