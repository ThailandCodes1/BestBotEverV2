const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name : 'bankpro',
    category : 'economy',
    description : 'show your profile ',
	options: [
		{
			name: 'user',
			description: 'User to get his bank profile',
			type: 6,
		},
	],
run: async(client, interaction, args)=> {
		const user = interaction.options.getMember('user') || interaction.member;
      if(user.user.bot) return interaction.editReply({content :`You can't use this command with bot.`});

        let money = db.fetch(`money_${user.id}`)
       if (money === null) money = 0;
            
        let bank = db.fetch(`bank_${user.id}`)
        if (bank === null) bank = 0;

        let bio = db.fetch(`info_${user.id}`);
        if (bank === null) bio = `${SerPrefix}setbio`
/* // will added in V3
        let bronze = db.fetch(`bronze_${user.id}`);
        if (bronze === null) bronze = 0;

        let silver = db.fetch(`silver_${user.id}`);
        if (silver === null) silver = 0;

        let diamond = db.fetch(`diamond_${user.id}`)
        if (diamond === null) diamond = 0;

        let cars = db.fetch(`car_${user.id}`);
        if (cars === null) cars = 0;

        let house = db.fetch(`house_${user.id}`);
        if (house === null) cars = 0;

        let ring = db.fetch(`ring_${user.id}`);
        if (ring === null) ring = 0;
*/

        const embed = new MessageEmbed()
        .setColor(`RANDOM`)
        .setDescription(`> User: ${user} | ${user.user.tag} | ${user.id}\n> Money: ${money}\n> Bank: ${bank}\n __Bio__: ${bio}`)

        interaction.editReply({embeds : [embed]})
    }
}