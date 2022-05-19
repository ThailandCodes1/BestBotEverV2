module.exports = {
  name: "slow_mode_remove",
  category: "mod",
  description: "Remove slow_mode from the channel",

  options: [
    {
      name: "channel",
      description: "The channel you want to deactivate the slowmode",
      type: 7,
      channelTypes: ["GUILD_TEXT"]
    },
  ],
  run: async (client, interaction, args) => {
    try {
      let channel = interaction.options.getChannel("channel")

      if (!channel) channel = interaction.channel
      await channel.setRateLimitPerUser("0")
      await interaction.editReply({
        content: "✅ | Slowmode has been deactivated"
      })
    } catch (err) {
      console.log(err)
      interaction.editReply({ content: "❗ Error" })
    }
  }
}
