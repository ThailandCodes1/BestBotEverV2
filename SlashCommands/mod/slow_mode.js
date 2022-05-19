module.exports = {
  name:"slow_mode",
  category: "mod",
  description:"Add slow_mode to a channel",


  options:[
    {
      name:"time",
      description:"The slowmode cooldown you want / scroll to see choices",
      type:3,
      required:true,
      choices:[
        {
          name:"5 seconds",
          value:"5 seconds"
        },
        {
          name:"10 seconds",
          value:"10 seconds"
        },
        {
          name:"20 seconds",
          value:"20 seconds"
        },
        {
          name:"30 seconds",
          value:"30 seconds"
        },
        {
          name:"1 minute",
          value:"1 minute"
        },
        {
          name:"2 minutes",
          value:"2 minutes"
        },
        {
          name:"5 minutes",
          value:"5 minutes"
        },
        {
          name:"10 minutes",
          value:"10 minutes"
        },
        {
          name:"30 minutes",
          value:"30 minutes"
        },
        {
          name:"1 hour",
          value:"1 hour"
        },
        {
          name:"2 hours",
          value:"2 hours"
        },
        {
          name:"6 hours",
          value:"6 hours"
        },
      ],
    },
    {
      name:"channel",
      description:"The channel you want to active slowmode in",
      type:7,
      channelTypes:["GUILD_TEXT"]
    },
  ],
  run: async (client, interaction, args) => {
    try {
      let choice = interaction.options.getString("time")

      let channel = interaction.options.getChannel("channel")

if (!channel) channel = interaction.channel;

      if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.editReply({content:`You Dont have \`MANAGE_CHANNELS\` Permission`});
      if (!interaction.guild.me.permissions.has(`MANAGE_CHANNELS`)) return interaction.editReply({content:`I Dont have \`MANAGE_CHANNELS\` permission`});

     choice = choice.replace("5 seconds", "5")
      choice = choice.replace("10 seconds", "10")
      choice = choice.replace("20 seconds", "20")
      choice = choice.replace("30 seconds", "30")
      choice = choice.replace("1 minute", "60")
      choice = choice.replace("2 minutes", "120")
      choice = choice.replace("5 minutes", "300")
      choice = choice.replace("10 minutes", "600")
      choice = choice.replace("30 minutes", "1800")
      choice = choice.replace("1 hour", "3600")
      choice = choice.replace("2 hours", "7200")
      choice = choice.replace("6 hours", "21600")
      await channel.setRateLimitPerUser(choice)

 ///

            await interaction.editReply({
        content:`✅ | Slowmode has been activated`
      })

    } catch (err) {
      console.log(err)
      interaction.editReply({content:"❗ Error"})
    }
  }
}