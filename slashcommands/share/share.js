const { MessageAttachment , MessageButton , MessageActionRow, MessageEmbed , Permissions } = require('discord.js');
const humanizeDuration = require("humanize-duration");
const { Database } = require("quickmongo")
let devs = ['667753369858736148',"608275252862124074",
"612527697851318274"]
const db = new Database(process.env.share_db)
const primedb = new Database(process.env.prime_db)
const bannerdb = new Database(process.env.primecmds_db)
const coinsdb = new Database(process.env.coins_db)
const time = require("../../time.js")

module.exports = {
	name: 'share',
  cooldown: 15,
  UserPermission : ["MANAGE_MESSAGES"],
  BotPermission: ["EMBED_LINKS"],
  async execute(client, interaction) {
/*
if(!devs.includes(interaction.user.id)) return interaction.editReply(`The command has been disabled for a short time. please wait!`)*/
      let links = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
  
  
  //-----
  
   let links2 = [
   'https://',
  'http://',
  'discord.gg',
  '.gg',
  '.xyz',
  '.club',
  ]
  
  //-----
  
  let mentions = [
  '@'
  ]
  
  //--------
  
  let bw = [
  
  'مطلوب',
  'روبلوكس',
  'كس',
  'طيز',
  'بيع',
  'للبيع',
  'احا',
  'طلب',
  'شوب',
  'متناك',
  'عرص',
  'خول',
  'منيوك',
  'منيك',
  'منيوق',
  "نيك",
  "تيزك",
  
  //-------
  "كس" , "ك س" , "كث" , "ك ث" , "كص" , " ك ص" , "قسمك" , "صمق" , "صمك" , "كسمك" , "ك س م ك" , "متناك" , "متناق" , "منيوك" , "لبوه" , "وسخ" , "وصخ" , "وسخه" ,  "وصخه" ,  "نيق" , "منيكه" , "منيقه" , "شرموط" , "شرموت" , "شرمت" , "شرمط" , "شرمطه" , "شرمته" , "منكوح" , "نكح" , "طيز" , "مؤخره" , "مكواه" , "سكس" , "سيكس" , "سيكسي" , "بزاز" ,"بظاظ" , "بذاذ"
  ]
      let coinss = await coinsdb.fetch(`coins_${interaction.user.id}`)
      let channel = await db.fetch(`sharechannel_${interaction.guild.id}`)
      if(channel === null) channel = "Not Selected"
      let desc = await db.fetch(`sharedesc_${interaction.guild.id}`)
      if(desc === null) desc = "Not Selected"
      let cooldown = await db.fetch(`sharecooldown_${interaction.guild.id}`)
      if(cooldown === null) cooldown = 0
      if(channel == "Not Selected") {
        return interaction.editReply(`**⁉️ Select the bumping channel**`)
      }
      if(desc == "Not Selected") {
        return interaction.editReply(`**⁉️ Select the description**`)
      }
      let c = channel;
    let perms = interaction.guild.me.permissionsIn(c).toArray() || interaction.guild.me.permissions.toArray()
      let evP = interaction.guild.roles.everyone.permissionsIn(c).toArray()
      const pSubscription = await primedb.get(`primeguilds_${interaction.guild.id}`)
    if(!perms.includes("CREATE_INSTANT_INVITE"))return interaction.editReply(`**⁉️ I need \`Create Invite\` Permission**`)
    if(pSubscription !== true && !evP.includes("VIEW_CHANNEL") && !perms.includes("MANAGE_CHANNELS")){
        return interaction.editReply(`**🙄 Don't edit the permissions of the bumping channel.**`)
      }
      if(pSubscription !== true && !evP.includes("VIEW_CHANNEL") && perms.includes("MANAGE_CHANNELS")){
        client.channels.cache.get(c).permissionOverwrites.edit(interaction.guild.id, {VIEW_CHANNEL : true , SEND_MESSAGES: false })
        return interaction.editReply(`**🙄 Don't edit the permissions of the bumping channel.**`)
      }
      if(pSubscription !== true && !perms.includes("SEND_MESSAGES") && perms.includes("MANAGE_CHANNELS")){
        client.channels.cache.get(c).permissionOverwrites.edit(client.user.id, {VIEW_CHANNEL : true , SEND_MESSAGES: true })
        return interaction.editReply(`**🙄 Don't edit the permissions of the bumping channel.**`)
      }
      if(c.type !== "GUILD_TEXT"){
        if(c.type === "GUILD_VOICE"){
          return interaction.editReply(`**🗂️ Error**`)
        }
      
          if(c.type === "GUILD_CATEGORY"){
          return interaction.editReply(`**🗂️ Error**`)
        }
      }
         let cooldwon = cooldown;
        let times = (cooldwon - Date.now());
        if (cooldwon > Date.now()){	  
        return interaction.editReply(`**🙄 You can share again after: \`${humanizeDuration(times , {round : true})}\`**`)
        }else 
          if (mentions.some((mentions) =>  new RegExp(mentions, "i").test(interaction.guild.name))){
            return interaction.editReply(`**⁉️ You can't mentions in server name**`)
          }else
            if (!!links.test(interaction.guild.name , 'i')){
              return interaction.editReply(`**⁉️ You can't put links in server name**`)
            }
            else
            if (bw.some((bw) =>  new RegExp(bw, "i").test(interaction.guild.name))){
              let match = bw.find((w) => RegExp(w, 'i').test(interaction.guild.name))
                  return interaction.editReply(`**⁉️ You can't this word \`${match}\` in server name**`)
            }else{
                var invite = null
      if(interaction.guild.vanityURLCode !== null) {
        invite = `https://discord.gg/${interaction.guild.vanityURLCode}`
      } else {
        invite = `${await interaction.channel.createInvite({ maxAge : 0 , maxUses : 0})}`
      }
                if(pSubscription === true){
            db.set(`sharecooldown_${interaction.guild.id}`, `${parseInt(Date.now() + time.PrimeST)}`)
			            await interaction.editReply({ content : `**:gem: Your server has been shared to \`${client.guilds.cache.size}\` server**` , files : [] , attachments: [] })
                  const inv = new MessageButton()
	.setLabel(`Invite MasterShare`)
	.setStyle('LINK')
	.setURL(client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR] }))
        const reportbutton = new MessageButton()
        .setLabel(`Report`)
        .setStyle('DANGER')
        .setCustomId(`report`)
	const row = new MessageActionRow()
			.addComponents(inv)
        .addComponents(reportbutton)
            client.guilds.cache.forEach(async (g) => {
              let rooms = await db.fetch(`sharechannel_${g.id}`)
              let ptest = await primedb.get(`primeguilds_${g.id}`)
              /*if(ptest === true) {
                return
              }else
              if(ptest !== true) {*/
              let room = g.channels.cache.get(rooms);
              if (!room) return
              let Banner = await bannerdb.get(`banner_${interaction.guild.id}`)
              if(Banner == null){Banner = `https://miro.medium.com/max/2400/1*-H6prGWbj7F9kmiimYhCMA.png`}
                let code = await bannerdb.get(`color_${interaction.guild.id}`)
          if(code == null) code = "#4ca1b4"
              let msgg = desc
              let finaldesc = msgg
              .replace("%mc%", interaction.guild.memberCount)
              .replace("%boosts%", interaction.guild.premiumSubscriptionCount)
                .replace("%n%", `\n`)
              let embed = new MessageEmbed().setDescription(`**🔍 Server: ${interaction.guild.name}\n**📫 **Desciption: ${finaldesc}**`).setImage(Banner).setFooter({ text: `Server ID: ${interaction.guild.id}`, iconURL: interaction.guild.iconURL({ dynamic: true }) }).setColor(`${code}`)
              
                  room.send({content : `${invite}`, components : [row] , embeds : [embed]})
                  
            })
            
            
      }
                if(pSubscription !== true) {
                    if(coinss < 3) {
                        return interaction.editReply(`** You don't have 3 coins to share your server, Collect coins or buy a prime version.**`)
                    }
                    coinsdb.subtract(`coins_${interaction.user.id}`, 3)
  db.set(`sharecooldown_${interaction.guild.id}`, `${parseInt(Date.now() + time.ShareTime)}`)
			            await interaction.editReply({ content : `**✨ Your server has been shared to \`${client.guilds.cache.size}\` server**` , files : [] , attachments: [] })
    	
    	client.guilds.cache.forEach(async (g) => {
        let rooms = await db.fetch(`sharechannel_${g.id}`)
        let ptest = await primedb.get(`primeguilds_${g.id}`)
             /* if(ptest === true) {
                return
              }else
              if(ptest !== true) {
        if(rooms == null) {
          return
        }*/
				  const inv = new MessageButton()
	.setLabel(`Invite MasterShare`)
	.setStyle('LINK')
	.setURL(client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR] }))
        const reportbutton = new MessageButton()
        .setLabel(`Report`)
        .setStyle('DANGER')
        .setCustomId(`report`)
	const row = new MessageActionRow()
			.addComponents(inv)
        .addComponents(reportbutton)
        let room = g.channels.cache.get(rooms);
              if(!room) {
                return db.delete(`sharechannel_${g.id}`)
              }
              let msgg = desc
              let finaldesc = msgg
              .replace("%boosts%", interaction.guild.premiumSubscriptionCount)
                .replace("%n%", `\n`)
              
 room.send({ content : `**🔍 Server: ${interaction.guild.name} - ${interaction.guild.id}\n**📫 **Desciption: ${finaldesc}**\n${invite}`, components : [row] }).then(async () => {
})})
    }
            }
            }}