const ms = require('ms');
const humanizeDuration = require('humanize-duration');

module.exports = {
	name: 'timeout',
	category: "mod",
	description: 'Timeout user from typing or joining voice channel or react to messages',
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
	],
	permissions: 'MODERATE_MEMBERS',
    run : async(client, interaction, args) => {
        const member = interaction.options.getMember('user')
        const time = interaction.options.getString('time')
        if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.editReply({content: 'You do not have permissions to use this command'})
		await member.disableCommunicationUntil(Date.now() + ms(time), `By: ${interaction.member.tag}`).catch(console.error);
		interaction.editReply({content: `**Done muted** \`${member.user.username}\` **for ${humanizeDuration(ms(time), { round: true })}.**`,
		});
	},
};