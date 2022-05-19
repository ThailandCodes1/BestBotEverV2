const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	category: "general",
	description: 'Get user avatar',
	options: [
		{
			name: 'user',
			description: 'User to get avatar',
			type: 6,
		},
	],
run: async(client, interaction, args)=> {
		const member = interaction.options.getMember('user') || await interaction.guild.members.fetch(interaction.user);
		const isMemberAvatar = interaction.options.getBoolean('server_avatar');
		//if (isMemberAvatar) {
			/*
			if (!member.avatar) {
				return interaction.editReply({
					content: ":x: This user don't has avatar in this server",
					ephemeral: true,
				});
			}
			*/
			let usrAvatar = member.user.avatarURL({dynamic: true , type: "png" , size: 512});;

			/*
			const embed = new Discord.MessageEmbed()
				.setAuthor({ name: member.user.tag, iconURL: member.avatarURL({ dynamic: true }) })
				.setDescription(`[Avatar Link](${member.avatarURL({ dynamic: true, size: 4096 })})`)
				.setImage(member.avatarURL({ dynamic: true, size: 4096 }))
				.setFooter(`Requested By ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
			return interaction.editReply({ embeds: [embed] });
		}
		*/
		//}
		if(member.user.avatarURL() != null){
		const embed = new Discord.MessageEmbed()
		.setAuthor(`${member.user.tag}`, usrAvatar)
		.setDescription(`[Avatar Link](${usrAvatar})`)
			.setImage(usrAvatar)
			.setFooter(`Requested By ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
		interaction.editReply({ embeds: [embed] });
		}else{
		const embed2 = new Discord.MessageEmbed()
			.setTitle("No avatar found")
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setFooter(`Requested By ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
			interaction.editReply({ embeds: [embed2] });
		}
	},
};
