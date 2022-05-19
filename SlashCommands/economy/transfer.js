const Discord = require("discord.js");
const db = require("quick.db")
const { CaptchaGenerator } = require("captcha-canvas");
const ms = require("ms");
module.exports = {
  name: "transfer",
  category: "economy",
  description: "transfer money for a user",
  options: [
    {
      name: 'user',
      description: 'User to add moeny',
      type: 6,
      required: true,
    },
    {
      name: 'amount',
      description: 'amount to transfer',
      type: 3,
      required: true,
    },
    {
      name: "reason",
      description: "The reason of this kick",
      type: 3,
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const user = interaction.options.getMember('user')
    const input = interaction.options.getString('amount')
    const reason = interaction.options.getString('reason') || "No reason provided "
    let tax = Math.floor(input - (input * (5.3 / 100)))
    if (user.user.bot) return interaction.editReply({ content: `You can't use this command with bot.` });
    let member = db.fetch(`money_${interaction.user.id}`)
    if (member == null) {
      member = 0;
    }
    let embed4 = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`:Cross: You don't have that much money`);
    if (member < input) {
      return interaction.editReply({ embeds: [embed4] })
    }

    let error = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`you can't trasfer coins to your self`);
    if (user.id === interaction.user.id) {
      return interaction.editReply({ embeds: [error] })
    }

    let num = Math.floor(Math.random() * 999999) + 1000;

    num.length = 6;
      const captcha = new CaptchaGenerator()
    //.setDimension(200 , 600)
    .setDimension(110 , 300)
    .setCaptcha({font: "Comic Sans BOLD" , text: `${num}` , size: 40, color: "#21ff00"})
    .setDecoy({opacity: 0.5})
    .setTrace({color: "#21ff00"});

    //#726dff
    const buffer = await captcha.generateSync();

    const attachment = new Discord.MessageAttachment(buffer, interaction.userId + ".png");


    interaction.editReply({ content: `type the captch to confirm to transfer ${Math.floor(input - (input * (5.3 / 100)))} to \`${user.user.username}\``, files: [attachment] })
            const filter = m => interaction.user.id === m.author.id;
        const collecter = interaction.channel.createMessageCollector({filter , time : 30000 , max : 1})
    collecter.on("collect" , async c => {
        if(c.content == num){
          if(c.content === null){
                        "Nothing"
          }
          c.delete()
                  let embed5 = new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setDescription(`<@!${interaction.user.id}> transfered  ${tax} coins to <@!${user.user.id}> `);
        interaction.channel.send({ embeds: [embed5] })
        let tle = new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setDescription(`You have received ${tax} from user \`${user.user.username}\` (ID: ${user.user.id}) \n Reason : ${reason}`);
        user.send({ embeds: [tle], content: ' 🏧| You Got Coins transfer' })
        db.add(`money_${user.id}`, tax)
        db.subtract(`money_${interaction.user.id}`, input)

      }
    })

    collecter.on('end', collected => {
      interaction.deleteReply().catch(() => { })
    })




  }
} 