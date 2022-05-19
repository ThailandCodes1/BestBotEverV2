module.exports = {
	name: 'untimeout',
	category: "mod",
	description: 'Remove timeout from user.',
	options: [
		{
			name: 'user',
			description: 'User to remove timeout from.',
			type: 6,
			required: true,
		},
	],
    run: async(client, interaction, args) => {
        const member = interaction.options.getMember('user')
        if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.editReply({content: 'You do not have permissions to use this command'})
		if (!member.isCommunicationDisabled()) {
			return interaction.editReply({content: ':x: This user is not in timeout.',ephemeral: true,})
				.catch((e) => {});
		}
		await member.disableCommunicationUntil(null, `By: ${interaction.user.tag}`);
		interaction.editReply({content: `Timeout has been removed from ${member}`,});
	},
};
