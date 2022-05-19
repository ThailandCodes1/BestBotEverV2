const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    category: "mod",
    description: 'Ban a user from the server. ',
    options:[
{
     name:"user",
     description:"The user",
     type:6,
     required:true
},
{
     name:"reason",
     description:"The reason of this ban",
     type:3,
     required:true
},
],
    run: async(client, interaction, args) => {
        const mentionedMember = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason') //join the arguments you write as reason of banning the member



        if(! interaction.member.permissions.has('BAN_MEMBERS')) { //if you (user) don't have ban member permission then
            const banError = new MessageEmbed()
            .setDescription('**You don\'t have permissions to ban members!**')
            return interaction.editReply({ embeds: [banError] }) //return this embed

        } else if(!interaction.guild.me.permissions.has('BAN_MEMBERS')) { //if bot don't have ban member permission then
            const banError1 = new MessageEmbed()
            .setDescription('**I don\'t have permissions to ban members!**')
            return interaction.editReply({ embeds: [banError1] }) //return this embed
        }

        const mentionedPosition = mentionedMember.roles.highest.position //the highest role of the mentioned member
        const memberPosition = interaction.member.roles.highest.position //highest role of you
        const botPosition = interaction.guild.me.roles.highest.position //highest role of the bot

        if(memberPosition <= mentionedPosition) { //if your role is lower or equals to the mentioned member u wanna ban
            const banErr = new MessageEmbed()
            .setDescription('**You cannot ban this member because their role is higher/equal to yours!**')
            return interaction.editReply({ embeds: [banErr] }) //return this embed
        } else if (botPosition <= mentionedPosition) { //if bot role is lower or equals to the mentioned member u wanna ban
            const banErr1 = new MessageEmbed()
            .setDescription('**I cannot ban this member because their role is higher/equal to mine!**')
            interaction.editReply({ embeds: [banErr1] }) //return this embed
        }

        try{
            const reasonDm = new MessageEmbed() //DM the banned user, tell him/her the reason of being banned
            .setTitle(`You were banned by ${interaction.member.user.tag}!`)
            .setDescription(`Reason: ${reason}`)
            await mentionedMember.send({ embeds: [reasonDm] }) //send the embed to DM
            await mentionedMember.ban({ reason: reason }).then(() => { //then ban the user

                const banSuccess = new MessageEmbed()
                .setTitle(`${mentionedMember.user.tag} was banned\nby ${interaction.member.user.tag}`)
                .setDescription(`Reason: ${reason}`)
                interaction.editReply({ embeds: [banSuccess] }) //send a message in channel that you banned that user
            })


        } catch (error) {
            const errorEmbed = new MessageEmbed()
            .setDescription(':x: **There was an error while banning this user!**')
            return interaction.editReply({ embeds: [errorEmbed] }) //send an embed when it caught error
        }
    }
} 
