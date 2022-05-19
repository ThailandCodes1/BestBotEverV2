const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const moment = require("moment")
const { Canvas, resolveImage } = require('canvas-constructor/cairo');
const path = require('path');
const db = require('quick.db')
const autoLineBreak = require('auto-line-breaks');
const { millify } = require("millify");
module.exports = {
  name: "bot",
  category: "general",

  description: "Shows Bot Profile.",
  run: async (client, interaction, args) => {
    let background = await resolveImage(path.resolve(__dirname, '../../All_Files/bot.png')); // لا تعدل
    let avatar = await resolveImage(client.user.displayAvatarURL({ format: 'png', size: 512 }));
    let ctx = new Canvas(background.width, background.height) // لا تعدل
      .printImage(background, 0, 0, background.width, background.height) // لا تعدل
      .printCircularImage(avatar, 129, 137, 112) // لا تعدل //x : 129, y : 137, size : 112
      .setTextFont('bold 20px monospace') // لا تعدل
      .setTextSize(35) // لا تعدل
      .setColor('#ffffff')
      .printText(client.user.tag, 20, 300) // لا تعدل //user.user.tag = x : 20, y : 300
      .printText(client.ws.ping, 350, 300) // لا تعدل //user.user.tag = x : 350, y : 300
      .printText(client.guilds.cache.size , 670, 200) // لا تعدل //client.guilds.cache.size = x : 670, y : 200
      .printText('/' , 380, 115) // لا تعدل //client.guilds.cache.size = x : 670, y : 200
      .toBuffer(); // لا تعدل

    let buf = new MessageAttachment(ctx, 'bot.png'); // لا تعدل
    await interaction.editReply({ files: [buf] })


  }
}
