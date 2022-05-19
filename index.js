require("dotenv").config();
require('events').EventEmitter.defaultMaxListeners = 50;

const { Discord, Client, Collection,MessageSelectMenu, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");

const ms = require("ms")

const db = require('quick.db')

const autoLineBreak = require('auto-line-breaks');

const path = require('path');

const { Canvas, resolveImage } = require('canvas-constructor/cairo');

const fs = require("fs")

const axios = require('axios').default;

const pretty = require("pretty-ms")

const { millify } = require("millify");

  const client = new Client({
  intents: 32767,
  });
////////////////////////////////express////////////////////////////////////////
const express = require('express')
const app = express()
app.get('/', function (req, res) {
res.send('Hello World')
})
app.listen(3000)

////////////////////////////////Ready////////////////////////////////////////
client.on('ready', () => {
console.log(`[API] Logged in as ${client.user.username}`);
client.user.setStatus(`dnd`)
client.user.setActivity(`Visual Code Project`)
})




////////////////////////////////Important Files////////////////////////////////////////
let data = JSON.parse(fs.readFileSync("./All_Files/prefix.json", "utf8"));
let antibots = JSON.parse(fs.readFileSync("./All_Files/antibots.json", "utf8"));
const { chunk } = require('./All_Files/functions');
////////////////////////////////Start////////////////////////////////////////
const default_prefix = "!";
client.on('messageCreate', async message => {
if (!message.guild) return;
let SerPrefix = db.get(`prefix_${message.guild.id}`);
if (SerPrefix === null) SerPrefix = default_prefix;
//args
let command = message.content.split(" ").slice(1);
/*
let args = message.content.split(" ")
let args1 = message.content.split(" ").slice(1)
let args2 = message.content.split(" ").slice(1).join(" ")
let args3 = message.content.slice(0).trim().split(/ +/);
*/

if (message.content.startsWith(SerPrefix + 'setprefix')) {
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: `helpppppppppppp please helppppppppppppp`, allowedMentions: { repliedUser: false } })
db.set(`prefix_${message.guild.id}`, command[0]);
const embed = new MessageEmbed()
.setDescription(`This server's prefix is now \`\`${command[0]}\`\`. Commands must now use \`\`${command[0]}\`\` as their prefix. \`\`${command[0]}help\`\` For Help`)
message.channel.send({ embeds: [embed] })
return;
} else
if (message.content.startsWith(SerPrefix + "antibots on")) {
if (message.member.id !== message.guild.ownerId) return message.react('❌')
const on = new MessageEmbed()
.setDescription(`**AntiBots Has been enabled**`)
.setFooter(client.user.tag, client.user.displayAvatarURL({ size: 256, format: 'png', dynamic: true }))
.setTimestamp()
await message.reply({ embeds: [on], allowedMentions: { repliedUser: false } })
antibots[message.guild.id] = {
onoff: "On"
};
fs.writeFile("./All_Files/antibots.json", JSON.stringify(antibots), err => {
if (err)
console.error(err).catch(err => {
console.error(err);
});
});
} else
if (message.content.startsWith(SerPrefix + "antibots off")) {
if (message.member.id !== message.guild.ownerId) return message.react('❌')
const off = new MessageEmbed()
.setDescription(`**AntiBots Has been Disabled**`)
.setFooter(client.user.tag, client.user.displayAvatarURL({ size: 256, format: 'png', dynamic: true }))
.setTimestamp()
await message.reply({ embeds: [off], allowedMentions: { repliedUser: false } })
antibots[message.guild.id] = {
onoff: "Off"
};
fs.writeFile("./All_Files/antibots.json", JSON.stringify(antibots), err => {
if (err)
console.error(err).catch(err => {
console.error(err);
});
});
} else
if (message.content.startsWith(SerPrefix + "blacklist")) {
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: `only adminstator can use this command`, allowedMentions: { repliedUser: false } })
let user = message.mentions.users.first()
if (!user) return message.reply({ content: `❌ Error | You need to mention a member`, allowedMentions: { repliedUser: false } })
let data = db.get(`black_${user.id}`)
if (data) return message.reply({ content: `❌ Error | This member already in blacklist`, allowedMentions: { repliedUser: false } })
await db.set(`black_${user.id}`, user.id)
await message.reply({ content: `✅ Success | ${user} Has Been added to blacklist`, allowedMentions: { repliedUser: false } })
} else
if (message.content.startsWith(SerPrefix + "unblacklist")) {
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: `only adminstator can use this command`, allowedMentions: { repliedUser: false } })
let args = message.content.split(" ").slice(1).join(" ")
let user = message.mentions.users.first()
if (!user) return message.reply({ content: `❌ Error | You need to mention a member`, allowedMentions: { repliedUser: false } })
let data = db.get(`black_${user.id}`)
if (!data) return message.reply({ content: `❌ Error | This member is not in blacklist`, allowedMentions: { repliedUser: false } })
if (data) {
db.delete(`black_${user.id}`)
message.reply({ content: `✅ Success | ${user} Has Been removed from blacklist`, allowedMentions: { repliedUser: false } })
}
//////////////////////General//////////////////////
      }else
if (message.content.toLowerCase().startsWith(SerPrefix + "server")) {
  if (db.has(`black_${message.author.id}`)) return message.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
const bst = message.guild.premiumSubscriptionCount;
let ServerLogo = message.guild.iconURL() ? `[Download Server Logo](${message.guild.iconURL()})` : "No Server Icon"
let logo = message.guild.iconURL() ? message.guild.iconURL() : ""
let server = new MessageEmbed()
.setColor("RANDOM")
.setImage(logo)
.setThumbnail(message.author.avatarURL({ dynamic: false, size: 512 }))
.addField("**Owner :**", `** <@!${message.guild.ownerId}> **`, false)
.addField("**CreateAt :**", `** <t:${parseInt(message.guild.createdAt / 1000)}:R> **`, false)
.addField(`**Channels :**`, `**${message.guild.channels.cache.size}**`, false)
.addField(`**Members :**`, `**${message.guild.memberCount}**`, false)
.addField(`**Bots :**`, `**${message.guild.members.cache.filter(member => member.user.bot).size}**`, false)
.addField("**Emoji Count:**", `**${message.guild.emojis.cache.size}** Emoji(s)`, false)
.addField("**Roles Count :**", `**${message.guild.roles.cache.size}** Role(s)`, false)
.addField("**Boost Count :**", `**${bst}** Boosts `, false)
.addField(`**Server ID :**`, `**${message.guild.id}**`, false)
.addField(`_ _`, `${ServerLogo}`, false)
.setFooter({
text: `${client.user.username} • Asked by ${message.author.tag}`,
iconURL: client.user.displayAvatarURL()
})
.setTimestamp()
await message.reply({ embeds: [server], allowedMentions: { repliedUser: false } })

} else
if (message.content.toLowerCase().includes(SerPrefix + "profile")) {
  let user = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]) || message.author
  if (user.bot) return message.reply({ content: `You can't use this command with bot.` });
if (!message.guild.members.cache.get(user.id)) return message.channel.send("User is not in this server.")
let background = await resolveImage(path.resolve(__dirname, './All_Files/profilee.png')); // لا تعدل
let avatar = await resolveImage(user.displayAvatarURL({ format: 'png', size: 512 }));
let fetchInfo = await db.fetch(`info_${user.id}`) || "No BIO";
let balance = db.fetch(`money_${user.id}`) || "0";
let bank = await db.fetch(`bank_${user.id}`) || "0";
let ctx = new Canvas(background.width, background.height) // لا تعدل
.printImage(background, 0, 0, background.width, background.height) // لا تعدل
.printCircularImage(avatar, 102, 115, 80) // لا تعدل
// avatar, 105, 115, 90
.setTextFont('bold 20px monospace') // https://fonts.google.com/
.setTextSize(20) // لا تعدل
.setColor('#ffffff')
.printText(autoLineBreak(fetchInfo, 30), 30, 350) // لا تعدل
.printText(`${user.tag || user.user.tag}`, 20, 240) // لا تعدل
.printText(millify(parseInt(balance)), 300, 120) // لا تعدل
.printText(millify(parseInt(bank)), 300, 230) // لا تعدل
.toBuffer(); // لا تعدل
let buf = new MessageAttachment(ctx, 'profile.png'); // لا تعدل
await message.channel.sendTyping().then(message.reply({ files: [buf], allowedMentions: { repliedUser: false } }))
} else
if (message.content.toLowerCase().includes(SerPrefix + "avatar")) {
  if (db.has(`black_${message.author.id}`)) return message.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
  let uus = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]) || message.author
const avatar = new MessageEmbed()
.setAuthor(`${uus.tag}`, uus.avatarURL())
.setTitle('Avatar Link')
.setURL(uus.displayAvatarURL({ size: 2048, dynamic: true }))
.setImage(uus.avatarURL({ size: 1024, dynamic: true }))
.setFooter({
text: `${client.user.username} • Asked by ${message.author.tag}`,
iconURL: client.user.displayAvatarURL()
})
await message.reply({ embeds: [avatar], allowedMentions: { repliedUser: false } })

} else
if (message.content.toLowerCase().includes(SerPrefix + "user")) {
  if (db.has(`black_${message.author.id}`)) return message.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
let args = message.content.split(" ");
let user = await message.mentions.members.first() || await message.guild.members.cache.get(args[1]);
let member = message.member;
if (!member) return;
const MemLogo = message.author.displayAvatarURL({ size: 4096, dynamic: true });
const row1 = new MessageActionRow().addComponents(
new MessageButton()
.setStyle('LINK')
.setURL(`https://discord.com/users/${message.author.id}`)
.setEmoji('957805856244789268')
.setLabel('Profile Link'))
let embed1 = new MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.avatarURL())
.setImage(MemLogo)
.addField("**𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞 :**", `**${message.author.username}**`, true)
.addField("**𝐔𝐬𝐞𝐫 𝐓𝐚𝐠:**", `**#${message.author.discriminator}**`, true)
.addField("**𝐔𝐬𝐞𝐫 ID:**", `**${message.author.id}**`, true)
.addField("**Joined Discord :**", `** <t:${parseInt(message.author.createdAt / 1000)}:R> **`, true)
.addField("**Joined Server :**", `** <t:${parseInt(member.joinedAt / 1000)}:R> **`, true)
.addField(`_ _`, `[Download Avatar](${MemLogo})`, false)
.setFooter({
text: `${client.user.username} • Asked by ${message.author.tag}`,
iconURL: client.user.displayAvatarURL()
})
.setTimestamp()
if (!user) return await message.channel.send({ embeds: [embed1], components: [row1] })
const men = user.user.displayAvatarURL({ size: 4096, dynamic: true });
const row2 = new MessageActionRow().addComponents(
new MessageButton()
.setStyle('LINK')
.setURL(`https://discord.com/users/${user.user.id}`)
.setEmoji('957805856244789268')
.setLabel('Profile Link'))
let embed2 = new MessageEmbed()
.setAuthor(`${user.user.tag}`, user.user.avatarURL())
.setImage(men)
.addField("**𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞 :**", `**${user.user.username}**`, true)
.addField("**𝐔𝐬𝐞𝐫 𝐓𝐚𝐠:**", `**#${user.user.discriminator}**`, true)
.addField("**𝐔𝐬𝐞𝐫 ID:**", `**${user.user.id}**`, true)
.addField("**Joined Discord :**", `** <t:${parseInt(user.user.createdAt / 1000)}:R> **`, true)
.addField("**Joined Server :**", `** <t:${parseInt(user.joinedAt / 1000)}:R> **`, true)
.addField(`_ _`, `[Download Avatar](${men})`, false)
.setFooter({
text: `${client.user.username} • Asked by ${message.author.tag}`,
iconURL: client.user.displayAvatarURL()
})
.setTimestamp()
if (user) return await message.channel.send({ embeds: [embed2], components: [row2] })
} else
if (message.content.toLowerCase().includes(SerPrefix + "banner")) {
  if (db.has(`black_${message.author.id}`)) return message.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
  let user = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]) || message.author
if (user.bot) return message.reply({ content: `Bots Does not have a banner`, allowedMentions: { repliedUser: false } })
const fetchUser = await client.users.fetch(user);
await fetchUser.fetch(); // to get user banner you need to fetch user before getting banner
console.log(fetchUser.bannerURL())
if(fetchUser.bannerURL() !== null) {
const embed = new MessageEmbed()
  .setAuthor(fetchUser.tag, fetchUser.displayAvatarURL({ dynamic: true }))
  .setTitle(`Banner Link`)
  .setURL(fetchUser.bannerURL({ dynamic: true, size: 2048, dynamic: true }))
  .setImage(fetchUser.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
}
if(fetchUser.bannerURL() == null){
  const nobanner = new MessageEmbed()
  .setAuthor(fetchUser.tag, fetchUser.displayAvatarURL({ dynamic: true }))
  .setTitle(`No banner found`)
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
  await message.reply({ embeds: [nobanner], allowedMentions: { repliedUser: false } })
}


} else
if (message.content.toLowerCase().startsWith(SerPrefix + 'bot')) {
if (db.has(`black_${message.author.id}`)) return message.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
let background = await resolveImage(path.resolve(__dirname, './All_Files/bot.png')); // لا تعدل
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
  .printText(SerPrefix, 380, 115) // لا تعدل //client.guilds.cache.size = x : 670, y : 200
  .toBuffer(); // لا تعدل

let buf = new MessageAttachment(ctx, 'bot.png'); // لا تعدل
await message.reply({ files: [buf] , allowedMentions: { repliedUser: false } })
} else
if (message.content.toLowerCase().startsWith(SerPrefix + 'members')) {
if (db.has(`black_${message.author.id}`)) return message.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
let embed = new MessageEmbed()
.setTitle(`**${message.guild.name}\' Member Count**`)
.setDescription(`
**> 💻 Total Members : ${message.guild.memberCount}**
**> 👦 Humans : ${message.guild.members.cache.filter(m => !m.user.bot).size}**
**> 🤖 Bots : ${message.guild.members.cache.filter(m => m.user.bot).size}**`)
.setFooter({
text: `${client.user.username} • Asked by ${message.author.tag}`,
iconURL: client.user.displayAvatarURL()
})

message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
} else
if (message.content.toLowerCase().startsWith(SerPrefix + 'ping')) {
if (db.has(`black_${message.author.id}`)) return message.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
let embed = new MessageEmbed()
. addFields(
  {
    name:"**API Latency**",
    value:`🟢 | ${client.ws.ping}ms`
  },
  {
    name:"**Message Latency**",
    value:`🔴 | ${Date.now() - message.createdTimestamp}ms`
  },
  {
    name:"**Uptime**",
    value:`⏲️ | ${pretty(client.uptime)}`
  }
)
.setColor("#4453F5")
.setTitle("**:ping_pong: | Pong!**")
.setFooter({
  text:`Requested by ${message.author.username}`,
  iconURL: message.author.displayAvatarURL({dynamic:true})
})
message.reply({embeds:[new MessageEmbed().setDescription("🚨 Loading...").setColor("#4453F5")], allowedMentions: { repliedUser: false } }).then(() =>
  setTimeout(() => {
    message.reply({embeds:[embed], allowedMentions: { repliedUser: false } })
  }, 2*1000))
} else
if (message.content.startsWith(SerPrefix + 'tax')) {
if (db.has(`black_${message.author.id}`)) return message.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
let num = message.content.split(" ").slice(1).join(" ");
var numerr = Math.floor(num);
var tax = 5.3;
if (1 >= num) {
return message.reply(`\n>>> **:rolling_eyes: ${SerPrefix}tax 2**`)
} else
if (num > 99999999999999999999) {
return message.reply({ content: `**يجب ان يكون الرقم صحيح**` })
}
if (!num) return message.reply(`**Usage** : ${SerPrefix}tax 5000**`)
var taxval = Math.floor(numerr * (tax / 100));
var amount = Math.floor(numerr - taxval);
var amountfinal = Math.floor(numerr + taxval);
let embed = new MessageEmbed()
.setColor('#a31010')
.addField(`المبلغ:`, ` ${numerr} `)
.addField(`النسبه الي يسحبها البوت:`, ` ${tax}% `)
.addField(`المبلغ الي يسحبه البوت:`, ` ${taxval}`)
.addField(`المبلغ منغير الضريبة:`, `  ${amount} `)
.addField(`كم لازم تحول عشان يوصل المبلغ بالضبط:`, `  ${amountfinal} `)
.setTimestamp()
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setImage('https://cdn.discordapp.com/attachments/930146097115054141/972576857713156096/line.png')
.setFooter({ text: `Requested by: ${message.author.username}`, iconURL: message.author.avatarURL({ dynamic: true }) })
message.channel.send({ embeds: [embed] })

//////////////////////////////Staff//////////////////////////////////

} else
if (message.content.startsWith(SerPrefix + "timeout")) {
  if (message.member.permissions.has("ADMINISTRATOR")) {
    let args = message.content.split(" ")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
    if (!member) return message.reply({ content: `**Mention the user or him ID to shut him up !**`, allowedMentions: { repliedUser: false } })
    if (member.user.bot) return message.reply({ content: `****You can't mute a bot 🙄**!**`, allowedMentions: { repliedUser: false } })
    if (member.user == message.author) return message.reply({ content: `****You can't mute a bot 🙄**!**`, allowedMentions: { repliedUser: false } })
    const notime = new MessageEmbed()
    .setAuthor(`${message.author.tag}` , message.author.avatarURL({dynamic : true}))
    .setTitle(`Command: ban`)
    .setDescription(`Timeout a member.

    **Usage:**
    ${SerPrefix}timeout [user] (time m/h/d/mo/y)

    **Examples:**
    ${SerPrefix}timeout <@${member.user.id}> 60s
    ${SerPrefix}timeout <@${member.user.id}> 5m
    ${SerPrefix}timeout <@${member.user.id}> 10m
    ${SerPrefix}timeout <@${member.user.id}> 1h
    ${SerPrefix}timeout <@${member.user.id}> 1d
    ${SerPrefix}timeout <@${member.user.id}> 1w
    `)
    if (!args[2]) return message.reply({ embeds : [notime], allowedMentions: { repliedUser: false } })
    if (!args[2].endsWith("s")) {
      if (!args[2].endsWith("m")) {
        if (!args[2].endsWith("h")) {
          if (!args[2].endsWith("d")) {
            if (!args[2].endsWith("w")) {

              return message.reply({ content: `**Please Provide me a valid timer \`s / m / h / d / w\` ❌**`, allowedMentions: { repliedUser: false } })
            }
          }
        }
      }
    }
    if (isNaN(args[2][0])) return message.reply({ content: `**That is not a number ❌ !**`, allowedMentions: { repliedUser: false } })
    let embed = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`> **You are muted in** \`${message.guild.name}\` **for a ${args[2]}**\n> **Muted By : **${message.author}`)
      .setThumbnail(message.guild.iconURL())
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    await member.timeout(ms(args[2]))
    await message.reply(`**${message.author.tag}** Timeouted **${member.user.username}** for **${args[2]}**`)
    await member.user.send({ embeds: [embed], allowedMentions: { repliedUser: false } })
  }
}else
if (message.content.toLowerCase().startsWith(SerPrefix + 'untimeout')) {
if (!message.member.permissions.has("ADMINISTRATOR")) return;
let args = message.content.split(" ")
let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
if (!member) return message.reply("**Mention the user or him ID !**")
if (member.user.bot) return message.reply("**You can't mute a bot 🙄**");
if (member.user == message.author) return message.reply("**You can't mute yourself 🙄**")
if (!message.member.permissions.has("MUTE_MEMBERS")) return message.reply({ content: `**You do not have permissions to use this command**`, allowedMentions: { repliedUser: false } })
if (!member.isCommunicationDisabled()) {
return message.reply({ content: `**❌ This user is not in timeout.**`, allowedMentions: { repliedUser: false } })
.catch((e) => { });
}
await member.disableCommunicationUntil(null, `By: ${member.tag}`);
message.reply({ content: `Timeout has been removed from ${member}`, allowedMentions: { repliedUser: false } })




} else
if (message.content.toLowerCase().startsWith(SerPrefix + 'roleinfo')) {
if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply({ content: `You Need \`MANAGE_ROLES\` permission to use this command `, allowedMentions: { repliedUser: false } })
let args = message.content.split(" ")
let role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
if (!role) return message.reply({ content: `You need to mention a role`, allowedMentions: { repliedUser: false } })
const status = {
false: "**No**",
true: "**Yes**"
}
let roleembed = new MessageEmbed()
.setAuthor("Role Info")
.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
.addField(":id: ID", `\`${role.id}\``)
.addField(":id: Name", `**${role.name}**`)
.addField(":white_circle: Hex", `**${role.hexColor}**`)
.addField(":busts_in_silhouette: Members", `**${role.members.size}**`)
.addField(":dividers: Position", `**${role.position}**`)
.addField(":pushpin: **Mentionable**", `**${status[role.mentionable]}**`)
.setTimestamp()

message.reply({ embeds: [roleembed], allowedMentions: { repliedUser: false } })




} else
if (message.content.startsWith(SerPrefix + "mute")) {
if (!message.member.permissions.has('MUTE_MEMBERS')) {
message.channel.send('You Dont Have `MUTE_MEMBERS` Permission ');
return;
};
/*
if(!message.client.user.permissions.has("MUTE_MEMBERS")) return message.reply({ content: `You Need \`MANAGE_ROLES\` permission to use this command `, allowedMentions: { repliedUser: false } })
*/
if (message.content.startsWith()) return;
const role = message.guild.roles.cache.find(role => role.name === 'Muted');
if (!role) {
message.guild.roles.create({
data: {
name: 'Muted',
permissions: [],
color: 'blue'
}
})
}
let args = message.content.split(" ")
let tag = message.mentions.members.first() || message.guild.members.cache.get(args[1])
if (!tag) {
message.channel.send(">>> ❌ **Please mention the user**")
return;
}
tag.roles.add(role).then((m) => {
message.reply({ content: `✅ **Success | @${tag.user.username} muted from the text! 🤫 ** `, allowedMentions: { repliedUser: false } })
var time = args[2]
if(!time){
time = 0
}
setTimeout(() => {
tag.roles.remove(role);
}, ms(time))
return
})




} else
if (message.content.startsWith(SerPrefix + "unmute")) {
if (!message.member.permissions.has('MUTE_MEMBERS')) return message.channel.send('You Dont Have `MUTE_MEMBERS` Permission ');
let args = message.content.split(" ")
let tag = message.mentions.members.first() || message.guild.members.cache.get(args[1])
if (!tag) return message.channel.send(">>> ❌ **Please mention the user**")
const rr = message.guild.roles.cache.find(rr => rr.name === 'Muted');
tag.roles.remove(rr).then((m) => {
message.reply({ content: `✅ ${tag.user.username} unmuted!`, allowedMentions: { repliedUser: false } })
})



} else
if (message.content.startsWith(SerPrefix + 'clear') || message.content.startsWith(SerPrefix + 'مسح')) {
if (message.member.permissions.has("ADMINISTRATOR")) {
let args = message.content.split(" ").slice(1)
let messagecount = parseInt(args);
if (args > 100) return message.channel.send(
new MessageEmbed()
.setDescription(`\`\`\`js
i cant delete more than 100 messages
\`\`\``)
).then(messages => messages.delete({ timeout: 8000 }))
if (!messagecount) messagecount = '100';
message.channel.messages.fetch({ limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(messages => {
const embed = new MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
.setDescription(`\`\`${messages.size} messages was deleted \`\``)
.setColor("#ff0000")
message.channel.send({ embeds: [embed] }).then(message => {
setTimeout(() => message.delete(), 5000)
})

})
}


} else
if (message.content.startsWith(SerPrefix + "roles")) { // تشوف رتب عضو
if (message.member.permissions.has("ADMINISTRATOR")) {
  let args = message.content.split(" ")
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
  if (!member) return message.reply({ content: `**Please Mention The User ! ❌**`, allowedMentions: { repliedUser: false } })
  const noroles = new MessageEmbed()
  .setDescription(`<@${member.user.id}> **Have No Roles**`)
  message.channel.send({content: member._roles.size ? member._roles.map(r => `<@&${r}>`).join(' ') : noroles})
 // if(!member.roles.cache.size <= 0) return message.reply({ embeds : [noroles], allowedMentions: { repliedUser: false } })
let roles1 = member.roles.cache.filter((roles) => roles.id !== message.guild.id).map((role) => role.toString()).join(`\n`);
let haveroles = new MessageEmbed()
.setTitle(`This is all roles for ${member.user.username} :`)
.setDescription(`${roles1}`)
.setColor("333333")

message.reply({ embeds: [haveroles], allowedMentions: { repliedUser: false } })
}



} else



if (message.content.startsWith(SerPrefix + 'lock') ||
message.content.startsWith(SerPrefix + 'قفل')) {
if (db.has(`black_${message.author.id}`)) return message.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send(`** ليس لديك صلاحية لإستعمال الأمر ! 🙄 **`);
let channel = message.mentions.channels.first();
const role = message.guild.roles.cache.find(role => role.name === '@everyone')
let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
if (!channel) channel_find = message.channel;
if (!channel_find) return;
await message.channel.permissionOverwrites.edit(role, { SEND_MESSAGES: false, VIEW_CHANNEL: true });
message.reply({ content: `🔒 <#${channel_find.id}> **has been locked.**`, allowedMentions: { repliedUser: false } })



} else



if (message.content.startsWith(SerPrefix + 'unlock') || message.content.startsWith(SerPrefix + 'فتح')) {
if (db.has(`black_${message.author.id}`)) return message.reply({ content: `❌ ERROR  | YOU HAVE BEEN BLACKLISTED FROM USING THE BOT`, allowedMentions: { repliedUser: false } })
if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send(`** ليس لديك صلاحية لإستعمال الأمر ! 🙄 **`);
let channel = message.mentions.channels.first();
const role = message.guild.roles.cache.find(role => role.name === '@everyone')
let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
if (!channel) channel_find = message.channel;
if (!channel_find) return;
await message.channel.permissionOverwrites.edit(role, { SEND_MESSAGES: true, VIEW_CHANNEL: true });
message.reply({ content: `🔓 <#${channel_find.id}> **has been unlocked.**`, allowedMentions: { repliedUser: false } })

} else

if (message.content.toLowerCase().startsWith(SerPrefix + 'hide')) {
if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({ content: `** Missing Permission(s) : \`MANAGE_CHANNELS\` 🙄 **`, allowedMentions: { repliedUser: false } })
let men = message.guild.roles.cache.find(role => role.name === '@everyone');
if (!men) return;
await message.channel.permissionOverwrites.edit(men, { VIEW_CHANNEL: false });
await message.reply({ content: `Now , NoBody can See <#${message.channel.id}> !! `, allowedMentions: { repliedUser: false } })

} else

if (message.content.toLowerCase().startsWith(SerPrefix + 'show')) {
if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({ content: `** Missing Permission(s) : \`MANAGE_CHANNELS\` 🙄 **`, allowedMentions: { repliedUser: false } })
let men = message.guild.roles.cache.find(role => role.name === '@everyone');
if (!men) return;
await message.channel.permissionOverwrites.edit(men, { VIEW_CHANNEL: true });
await message.reply({ content: `Now , everyone can See <#${message.channel.id}> !! `, allowedMentions: { repliedUser: false } })

} else
if (message.content.toLowerCase().startsWith(SerPrefix + 'ban') && !message.content.toLowerCase().endsWith("ner")) {
  let args = message.content.split(" ");
if (!message.member.permissions.has('ADMINISTRATOR')) return;
let user = await message.mentions.members.first() || await message.guild.members.cache.get(args[1]);
if (!user) return message.reply(`❌ Please specify a user to banned.`);
if (!user.bannable) return message.channel.send(`${user} Is unbannedable`);
if (message.guild.ownerId === user.id) return message.channel.send(`${user} Is unbannedable`);
if (user.roles.highest.position > message.member.roles.highest.position) return message.reply(`${user}'s Roles are higher than yours`)
if (user.roles.highest.position === message.member.roles.highest.position) return message.reply(`You have the same roles as ${user}'s`);

try {
user.ban({
reason: `Has been banned by ${message.member.username}`
});

message.channel.send(`✅ ${user.user.username} banned from the server!.`);
} catch (error) {
return;
}
} else
if (message.content.startsWith(SerPrefix + "unban")) {
  if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('❌ You Dont Have Premission \`Ban\`');
if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.reply('❌ I Dont Have Premission \`Ban\`');
let user = message.content.split(" ").slice(1).join(" ");
if (!user) return message.channel.send({ content: `❌ Wrong Usage !!  \n Usage : \`${SerPrefix}unban user_id\`` })
message.guild.members.unban(user).then(m => {
message.channel.send(`☑️ ${m.username} Unbanned ! `);
}).catch(err => {
message.channel.send(`> ❌ Err Can't Found \`${user}\` In The List`);
});
} else
if (message.content.startsWith(SerPrefix + "kick")) {
if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply('❌ You Dont Have Premission \`KICK\`');
if (!message.guild.me.permissions.has('KICK_MEMBERS')) return message.reply('❌ I Dont Have Premission \`KICK\`');
let args = message.content.split(" ");
let user = await message.mentions.members.first() || await message.guild.members.cache.get(args[1]);
if (!user) return message.channel.send({ content: `❌ Wrong Usage !!  \n Usage : \`${SerPrefix}kick @user / user_id\`` })
try {
await user.kick()
await message.channel.send(`✅ @${user.user.username} has been kicked !`);
} catch (er) {
await message.channel.send('Error');
}
} else
  //////////////////////////////Bank//////////////////////////////////
if (message.content.startsWith(SerPrefix + 'daily')) {
let user = message.member;
let timeout = 86400000;
var amount = Math.floor(Math.random() * 5000)
let daily = await db.fetch(`daily_${user.user.id}`);
if (daily !== null && timeout - (Date.now() - daily) > 0) {
let time = ms(timeout - (Date.now() - daily));

let timeEmbed = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`You can collect your daily again in ${time}.`);
message.reply({ embeds: [timeEmbed], allowedMentions: { repliedUser: false } })
} else {
let moneyEmbed = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`You've collected your ${amount} from daily.`);
message.reply({ embeds: [moneyEmbed], allowedMentions: { repliedUser: false } })
db.add(`money_${user.user.id}`, amount)
db.set(`daily_${user.user.id}`, Date.now())
}
} else

if (message.content.startsWith(SerPrefix + 'balance')) {
let args = message.content.split(" ")
let user =
message.mentions.members.first() ||
message.guild.members.cache.get(args[1]) ||
message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.member;
if (user.user.bot) return message.channel.send({ content: `You can't use this command with bot.` , allowedMentions: { repliedUser: false } });
let bal = db.fetch(`money_${user.id}`);

if (bal === null) bal = 0;

let bank = await db.fetch(`bank_${user.id}`);

if (bank === null) bank = 0;

if (user) {

let embed = new MessageEmbed()
.setColor("RANDOM")
.setDescription(
`${user.user.username}'s Balance\n\nPocket: \`${bal}\`\nBank: \`${bank}\``
)
message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
} else {
return message.channel.send({ content: "Invalid user." , allowedMentions: { repliedUser: false } })

}
} else
if (message.content.startsWith(SerPrefix + 'deposit')) {
let args = message.content.split(" ").slice(1)
let user = message.member;
let member = db.fetch(`money_${user.id}`)
if (args[0] == 'all') {
let money = await db.fetch(`money_${user.id}`)
let embedbank = new MessageEmbed()
.setColor('RANDOM')
.setDescription("❌ You don't have money to deposit.")
if (!money) return message.reply({ embeds: [embedbank], allowedMentions: { repliedUser: false } })

db.subtract(`money_${user.id}`, money)
db.add(`bank_${user.id}`, money)
let sembed = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`✅ You have deposited all your coins.`);
message.reply({ embeds: [sembed], allowedMentions: { repliedUser: false } })

} else {
let embed6 = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`This amount ia not a number.`)

if (isNaN(args[0])) {
return message.reply({ embeds: [embed6], allowedMentions: { repliedUser: false } })

}
let embed4 = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`You don't have enough money.`);

if (member < args[0]) {
return message.reply({ embeds: [embed4], allowedMentions: { repliedUser: false } })
}

let embed5 = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`You have deposited ${args[0]} into bank.`);

message.reply({ embeds: [embed5], allowedMentions: { repliedUser: false } })
db.subtract(`money_${user.id}`, args[0])
db.add(`bank_${user.id}`, args[0])

}


} else


if (message.content.startsWith(SerPrefix + 'top')) {
let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
if (!money.length) {
let noEmbed = new MessageEmbed()
.setAuthor(message.member.displayName, message.author.displayAvatarURL())
.setColor("RANDOM")
.setFooter("What do you think to get your daily?")
return message.reply({ embeds: [noEmbed], allowedMentions: { repliedUser: false } })
};

money.length = 10;
var finalLb = "";
for (var i in money) {
if (money[i].data === null) money[i].data = 0
let finalLbName = await client.users.fetch(money[i].ID.split('_')[1]) + "\n"
let finalLbNameSplitted = finalLbName.split("\n")

finalLb += `**${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]) : finalLbNameSplitted[i].username}** - ${money[i].data} :dollar:\n`;
};

const embed = new MessageEmbed()
.setTitle(`Leaderboard Of ${message.guild.name}`)
.setColor("RANDOM")
.setDescription(finalLb)
.setFooter(client.user.tag, client.user.displayAvatarURL())
.setTimestamp()
message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });


} else


if (message.content.toLowerCase().startsWith(SerPrefix + 'pbank') && !message.content.toLowerCase().endsWith("ban")) {
  let args = message.content.split(" ")
let user =
message.mentions.members.first() ||
message.guild.members.cache.get(args[1]) ||
message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.member;
if (user.user.bot) return message.reply({ content: `You can't use this command with bot.` , allowedMentions: { repliedUser: false } });

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

message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })

} else
if (message.content.startsWith(SerPrefix + 'setbio')) {
let args = message.content.split(" ").slice(1)
let user = message.author;
if (!args[0]) {
let fetchInfo = await db.fetch(`info_${user.id}`)
if (fetchInfo) {
let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor('Current bio:', message.author.displayAvatarURL())
  .setDescription(`\`${fetchInfo}\``)
  .setFooter(message.guild.name, message.guild.iconURL())
  return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
}
}
let newInfo = args.join(' ');
if (!newInfo) return message.channel.send('Enter the new bio.');
if (newInfo.length > 165) return message.channel.send(`Max \`160\` characters.`);
let newsInfo = chunk(newInfo, 42).join('\n');
db.set(`info_${user.id}`, newsInfo);

let notesEmbed = new MessageEmbed()
.setColor("RANDOM")
.setAuthor(`You have changed your bio.`, message.author.displayAvatarURL())
.setDescription(`New Bio : **${newsInfo}**`)
.setFooter(message.guild.name, message.guild.iconURL())
return message.reply({ embeds: [notesEmbed], allowedMentions: { repliedUser: false } })


} else
if (message.content.startsWith(SerPrefix + 'withdraw')) {
let args = message.content.split(" ").slice(1)
let user = message.member;
let member2 = db.fetch(`bank_${user.id}`)
if (args.join(' ').toLocaleLowerCase() == 'all') {
let money = await db.fetch(`bank_${user.id}`)
let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`You don't have any money in your bank.`)
if (!money) return message.reply({ embeds: [embed] })
db.subtract(`bank_${user.id}`, money)
db.add(`money_${user.id}`, money)
let embed5 = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`✅ You have withdrawn all your coins.`);
  return message.reply({ embeds: [embed5], allowedMentions: { repliedUser: false } })

} else {

let embed2 = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`Specify an amount.`);

if (!args[0]) {
  return message.reply({ embeds: [embed2], allowedMentions: { repliedUser: false } })
}
let embed6 = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`❌ Your Amount Is Not A Number!`)
if (isNaN(args[0])) {
  return message.reply({ embeds: [embed6], allowedMentions: { repliedUser: false } })
}
let embed3 = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`You can't withdraw negative money.`);

if (message.content.includes('-')) {
  return message.reply({ embeds: [embed3], allowedMentions: { repliedUser: false } })
}
let embed4 = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`You don't have enough money.`);

if (member2 < args[0]) {
  return message.reply({ embeds: [embed4], allowedMentions: { repliedUser: false } })
}

let embed5 = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`✅ You have withdrawn ${args[0]} coins.`);
   message.reply({ embeds: [embed5], allowedMentions: { repliedUser: false } })
  db.subtract(`bank_${user.id}`, args[0])
db.add(`money_${user.id}`, args[0])

}
}
});





client.on("guildMemberAdd", user => {
if (!antibots[user.guild.id])
antibots[user.guild.id] = {
onoff: "Off"
};
if (antibots[user.guild.id].onoff === "Off") return;
if (user.user.bot) return user.kick()
fs.writeFile("./All_Files/antibots.json", JSON.stringify(antibots), err => {
if (err)
console.error(err).catch(err => {
console.error(err)
})
})
})



  process.on("unhandledRejection", error => {
    console.log(error)
});
process.on("rejectionHandled", error => {
    console.log(error)
});
process.on("uncaughtException", error => {
    console.log(error)
});



console.log(process.version)
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
require("./handlers")(client);
client.login(process.env.token);