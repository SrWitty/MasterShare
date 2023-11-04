const { MessageEmbed } = require("discord.js")
const { Database } = require("quickmongo")
const db = new Database(process.env.share_db)
const primedb = new Database(process.env.prime_db)
const bannerdb = new Database(process.env.primecmds_db)

module.exports = {
	name: 'preview',
	cooldown: 5,
	UserPermission: ["MANAGE_GUILD"],
  BotPermission: ["EMBED_LINKS"],
	async execute(client, interaction) {
      let op = interaction.options.getString("prev")

if (!interaction.guild.me.permissions.has("CREATE_INSTANT_INVITE")) {
return interaction.editReply(`**🙄 I don't have \`CREATE_INSTANT_INVITE\` Permission**`)
}
      let invite = await interaction.channel.createInvite({ maxAge : 86400, maxUses : 0})
        let pSub = await primedb.fetch(`primeguilds_${interaction.guild.id}`)
    
		let ch = await db.fetch(`sharechannel_${interaction.guild.id}`)
		if(ch !== null) {
      ch = `**👉 Bumping channel is <#${ch}>**`
    } else {
      ch = `**👉 Channel is not selected!**`
    }
		let desc = await db.fetch(`sharedesc_${interaction.guild.id}`)
		if(desc !== null) {
      desc = desc
    } else {
      desc = `Description is not selected!`
    }
		if(op == "channel"){
			return interaction.editReply(ch)
		}else
		if(op == "desc"){
			return interaction.editReply(desc)
		}
        if(pSub !== true) {
          let msgg = desc
              let finaldesc = msgg
              .replace("%n%", `\n`)
			await interaction.editReply(`**🔍 Server: ${interaction.guild.name} - ${interaction.guild.id}\n**📫 **Desciption: ${finaldesc}**\n${invite}`)
	} else if(pSub == true) {
          let embed = new MessageEmbed()
            let banner = await bannerdb.get(`banner_${interaction.guild.id}`)
            if(banner == null) { banner = "https://miro.medium.com/max/2400/1*-H6prGWbj7F9kmiimYhCMA.png" }
        let code = await bannerdb.get(`color_${interaction.guild.id}`)
          if(code == null) code = "#4ca1b4"
      let msgg = desc
              let finaldesc = msgg
              .replace("%n%", `\n`)
embed.addField(`**📫 __Desciption__:**`, `${finaldesc}`)
          let createdd = await bannerdb.fetch(`createdatfield_${interaction.guild.id}`)
          if(createdd == true) {
            embed.addField(`**:calendar: __Created At__:**`, `**<t:${Math.floor(interaction.guild.createdAt/1000.0)}:R>**`, true)
          }
          let memberss = await bannerdb.fetch(`membersfield_${interaction.guild.id}`)
          if(memberss == true) {
            embed.addField(`**:busts_in_silhouette: __Members__:**`, `**${interaction.guild.memberCount} Members**`, true)
          }
          let boosts = await bannerdb.fetch(`boostsfield_${interaction.guild.id}`)
          if(boosts == true) {
            embed.addField(`**:sparkles: __Boosts__:**`, `**${interaction.guild.premiumSubscriptionCount} Boost**`, true)
          }
embed.setImage(banner)
embed.setFooter({ text: `Shared By: ${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
embed.setColor(`${code}`)
embed.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
embed.setTitle(interaction.guild.name)
			return interaction.editReply({content : `${invite}` , embeds : [embed]})
			/*await interaction.followUp({content : `${language.preview.st} \`${sTT}\` **` , ephemeral: true})*/
		}
    }
    }