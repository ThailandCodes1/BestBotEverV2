const Discord = require('discord.js');

module.exports = {
	name: 'server',
	description: 'Get info about server',
	timeout: 3000,
	category: 'general',
run: async(client, interaction, args)=> {
		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
			.setColor('RANDOM')
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			.addFields(
				{
					name: ':id: Server ID:',
					value: interaction.guild.id,
					inline: false,
				},
				{
					name: ':calendar: Created On:',
					value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:f> | <t:${Math.floor(
						interaction.guild.createdTimestamp / 1000,
					)}:R>`,
					inline: false,
				},
				{
					name: ':crown: Owned By:',
					value: `<@${interaction.guild.ownerId}>`,
					inline: false,
				},
				{
					name: `:busts_in_silhouette: Members: (${interaction.guild.memberCount})`,
					value: `${interaction.guild.premiumSubscriptionCount} Boosts :sparkles:`,
					inline: false,
				},
				{
					name: `:speech_balloon: Channels (${interaction.guild.channels.cache.size})`,
					value: `**${interaction.guild.channels.cache.filter((r) => r.type == 'GUILD_TEXT').size}** Text | **${
						interaction.guild.channels.cache.filter((r) => r.type == 'GUILD_VOICE').size
					}** Voice | **${interaction.guild.channels.cache.filter((r) => r.type === 'GUILD_CATEGORY').size}** Category`,
					inline: false,
				},
				{
					name: ':earth_africa: Others',
					value: `**Verification Level:** ${interaction.guild.verificationLevel}`,
					inline: false,
				},
			);
		interaction.editReply({
			embeds: [embed],
		});
	},
};