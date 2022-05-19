const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const moment = require("moment")
const { Canvas, resolveImage } = require('canvas-constructor/cairo');
const path = require('path');
const db = require('quick.db')
const autoLineBreak = require('auto-line-breaks');
const { millify } = require("millify");
module.exports = {
  name: "profile",
  category: "general",

  description: "Shows Yours or someone Proile card.",
  options: [
    {
      name: 'user',
      description: 'the targeted user',
      type: 6
    }
  ],
  run: async (client, interaction, args) => {
    const user = interaction.options.getMember('user') || interaction.member;
    if (!interaction.guild.members.cache.get(user.id)) return interaction.channel.send("User is not in this server.")
    if (user.user.bot) return;
    let background = await resolveImage(path.resolve(__dirname, '../../All_Files/profilee.png')); // لا تعدل
    let avatar = await resolveImage(user.user.displayAvatarURL({ format: 'png', size: 512 }));
    let fetchInfo = await db.fetch(`info_${user.id}`) || "No BIO";
    let balance = db.fetch(`money_${user.id}`) || "0";
    let bank = await db.fetch(`bank_${user.id}`) || "0";
    let ctx = new Canvas(background.width, background.height) // لا تعدل
      .printImage(background, 0, 0, background.width, background.height) // لا تعدل
      .printCircularImage(avatar, 102, 115, 80) // لا تعدل    //x : 102, y : 115, size : 100
      .setTextFont('bold 20px monospace') // لا تعدل
      .setTextSize(20) // لا تعدل
      .setColor('#ffffff')
      .printText(autoLineBreak(fetchInfo, 30),  30, 350) // لا تعدل
      .printText(user.user.tag, 20, 240) // لا تعدل    //user.user.tag = x : 20, y : 280
      .printText(millify(parseInt(balance)), 300, 120) // لا تعدل
      .printText(millify(parseInt(bank)), 300, 230) // لا تعدل
      .toBuffer(); // لا تعدل

    let buf = new MessageAttachment(ctx, 'profile.png'); // لا تعدل
    await interaction.editReply({ files: [buf] })


  }
}
