const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'banner',
	category: "general",
	description: 'Get user banner',
	options: [
		{
			name: 'user_id',
			description: 'user to get banner for',
			type: 3,
		},
	],
	timeout: 3000,
	category: 'general',
	run: async (client, interaction, args) => {
		const user = interaction.options.getString('user_id') || interaction.user;
		if (isNaN(user)) {
			return interaction.editReply(':x: user id must be a number');
		}
		try {
			await client.users.fetch(user);
		} catch (e) {
			return interaction.editReply({ content: ":x: i can't find this user" });
		}
		const fetchUser = await client.users.fetch(user);
		await fetchUser.fetch(); // to get user banner you need to fetch user before getting banner
		console.log(fetchUser.bannerURL())
		if(fetchUser.bannerURL() !== null) {
		const embed = new MessageEmbed()
			.setAuthor(fetchUser.tag, fetchUser.displayAvatarURL({ dynamic: true }))
			.setTitle(`Banner Link`)
			.setURL(fetchUser.bannerURL({ dynamic: true, size: 2048, dynamic: true }))
			.setImage(fetchUser.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
			.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
		interaction.editReply({ embeds: [embed] });
		}
		if(fetchUser.bannerURL() == null){
			const nobanner = new MessageEmbed()
			.setAuthor(fetchUser.tag, fetchUser.displayAvatarURL({ dynamic: true }))
			.setTitle(`No banner found`)
			.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
			interaction.editReply({ embeds: [nobanner] });
		}
	},
};