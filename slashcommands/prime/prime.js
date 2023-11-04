const { MessageActionRow, MessageButton , MessageEmbed, WebhookClient } = require('discord.js');
const { Database } = require("quickmongo");
const time = require("../../time.js")
const humanizeDuration = require("humanize-duration");
const primedb = new Database(process.env.prime_db)
const coinsdb = new Database(process.env.coins_db)
let devs = [
    "1091118468155314306",
    "608275252862124074",
    "612527697851318274"
]
module.exports = {
	name: 'prime',
	cooldown: 5,
 	UserPermission: ["SEND_MESSAGES"],
    BotPermission: ["SEND_MESSAGES"],
	async execute(client, interaction) {
       let primeR = "1154482299493159073" // رتبة البرايم
       let primeS = await primedb.get(`primestatus_${interaction.user.id}`)
       const primeGuser = await primedb.get(`primeuserguild_${interaction.user.id}`)
       
let omP = new MessageButton()
.setCustomId('1mP')
.setLabel('1 Month (750 Coins)')
.setStyle('PRIMARY');

let tmP = new MessageButton()
.setCustomId('3mP')
.setLabel('3 Months (2250 Coins)')
.setStyle('SECONDARY');

let gID = interaction.options.getString('guild_id')
let uID = interaction.options.getUser('user_id')

const row = new MessageActionRow().addComponents(omP).addComponents(tmP)
        if (interaction.options.getSubcommand() === "subscribe" && !gID) {
            return interaction.editReply("**🙄 Wrong.**")
        }else
        if (interaction.options.getSubcommand() === "subscribe" && gID) {
            if(primeS == true){
            return interaction.editReply("**:rolling_eyes: You have a prime subscription already.**")
            }else if(primeS !== true){
            let guild = client.guilds.cache.get(gID)
            if(!guild){
                return interaction.editReply(`**:rolling_eyes: I can't find this server.**`)
            }
            let gstatus = await primedb.get(`primeguilds_${guild.id}`)
             if(primeS == gID){
                return interaction.editReply(`**:rolling_eyes: This server have a prime from you already.**`)
            }else if(gstatus == true) {
                return interaction.editReply(`**:rolling_eyes: This server have a prime already.**`)
            } else
            await interaction.editReply({content : `**⌛ You have \`3 minutes\` to select your plan.**` , components : [row]})
            const filter = u => u.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 180000 });

            collector.on("collect" , async b => {
            if(b.customId === "1mP"){
                b.deferUpdate()
                let Ucoins = await coinsdb.get(`coins_${interaction.user.id}`)
                if(Ucoins < 750){
                    await interaction.editReply({ content : `**:rolling_eyes: You don't have enough coins.**` , components : [] })
                }else if(Ucoins > 750){
                await coinsdb.subtract(`coins_${interaction.user.id}` , 750)
                 primedb.set(`primeuserguild_${interaction.user.id}` , gID)
                 primedb.set(`primetime_${interaction.user.id}` , `${parseInt(Date.now() + time.month)}`)
                 primedb.set(`primestatus_${interaction.user.id}` , true)
                 await primedb.set(`primeguilds_${gID}`, true)
                 let PU = await client.guilds.cache.get("1114522552895811655").members.cache.find(m => m.id == interaction.user.id)
                if(!PU) {
                    await interaction.editReply({ content : `**🥳 You have been purchased MasterShare Prime for \`${humanizeDuration(time.month , { units : ["mo"], round : true})}\`**` , components : []})
				let mmsg = new WebhookClient({ id: "1154481708201160866", token: "sxKZ4vmCUBGPzCEaqjZwRZzH5jYeNVegbcFKjI8CgiuY55gItrNpqtMxrzxYD8x0g9Th" });
                return mmsg.send(`**A new prime subscription.**\nBy: <@${interaction.user.id}>, ${interaction.user.id}, [${interaction.user.tag}](https://discord.com/user/${interaction.user.id})\nServer: ${guild.name} | ${guild.id}\nTime: 1 Month`)
                }
                if(PU){
                    await interaction.editReply({ content : `**🥳 You have been purchased MasterShare Prime for \`${humanizeDuration(time.month , { units : ["mo"], round : true})}\`**` , components : []})
                    PU.roles.add(primeR)
				let mmsg = new WebhookClient({ id: "1154481708201160866", token: "sxKZ4vmCUBGPzCEaqjZwRZzH5jYeNVegbcFKjI8CgiuY55gItrNpqtMxrzxYD8x0g9Th" });
                return mmsg.send(`**A new prime subscription.**\nBy: <@${interaction.user.id}>, ${interaction.user.id}, [${interaction.user.tag}](https://discord.com/user/${interaction.user.id})\nServer: ${guild.name} | ${guild.id}\nTime: 1 Month`)
                }
            }}else
            if(b.customId === "3mP"){
                b.deferUpdate()
                let Ucoins = await coinsdb.get(`coins_${interaction.user.id}`)
                if(Ucoins < 2250){
                    await interaction.editReply({ content : `**:rolling_eyes: You don't have enough coins.**` , components : [] })
                }else if(Ucoins > 2250){
                await coinsdb.subtract(`coins_${interaction.user.id}` , 2250)
                 primedb.set(`primeuserguild_${interaction.user.id}` , gID)
                 primedb.set(`primetime_${interaction.user.id}` , `${parseInt(Date.now() + time.three_months)}`)
                 primedb.set(`primestatus_${interaction.user.id}` , true)
                 await primedb.set(`primeguilds_${gID}`, true)
                 let PU = await client.guilds.cache.get("1114522552895811655").members.cache.find(m => m.id == interaction.user.id)
                if(!PU) {
                    await interaction.editReply({ content : `**🥳 You have been purchased MasterShare Prime for \`${humanizeDuration(time.three_months , { units : ["mo"], round : true})}\`**` , components : []})
				let mmsg = new WebhookClient({ id: "1154481708201160866", token: "sxKZ4vmCUBGPzCEaqjZwRZzH5jYeNVegbcFKjI8CgiuY55gItrNpqtMxrzxYD8x0g9Th" });
                return mmsg.send(`**A new prime subscription.**\nBy: <@${interaction.user.id}>, ${interaction.user.id}, [${interaction.user.tag}](https://discord.com/user/${interaction.user.id})\nServer: ${guild.name} | ${guild.id}\nTime: 3 Month`)
                }
                if(PU){
                    await interaction.editReply({ content : `**🥳 You have been purchased MasterShare Prime for \`${humanizeDuration(time.three_months , { units : ["mo"], round : true})}\`**` , components : []})
                    PU.roles.add(primeR)
				let mmsg = new WebhookClient({ id: "1154481708201160866", token: "sxKZ4vmCUBGPzCEaqjZwRZzH5jYeNVegbcFKjI8CgiuY55gItrNpqtMxrzxYD8x0g9Th" });
                return mmsg.send(`**A new prime subscription.**\nBy: <@${interaction.user.id}>, ${interaction.user.id}, [${interaction.user.tag}](https://discord.com/user/${interaction.user.id})\nServer: ${guild.name} | ${guild.id}\nTime: 3 Month`)
                }
            }}
            })
        }
}else


        if (interaction.options.getSubcommand() === "move" && !gID) {
            if(primeS === null || primeS === false){
                return interaction.editReply(`**:rolling_eyes: You don't have a prime subscription.**`)
                }else
            await interaction.editReply(`**:rolling_eyes: Wrong.**`)
        }else
    if(interaction.options.getSubcommand() === "move" && gID){
        if(primeS === null || primeS === false){
            return interaction.editReply(`**:rolling_eyes: You don't have a prime subscription.**`)
            }else{
        let guilD = client.guilds.cache.get(gID)
        if(!guilD){
        await interaction.editReply(`**:rolling_eyes: I can't find this server.**`)
        }else
        if(primeGuser == gID){
            await interaction.editReply(`**:rolling_eyes: Your prime subscription activated for this server already.**`)
        }
        else
        if(guilD){
         primedb.delete(`primeguilds_${primeGuser}`)
         await primedb.set(`primeguilds_${gID}` , true)
         await primedb.set(`primeuserguild_${interaction.user.id}` , gID)
         return interaction.editReply(`**✨ Your prime server has been moved to \`${guilD.id} - ${guilD.name}\`**`)
        }}
    }else
if (interaction.options.getSubcommand() === "preview") {
        if(primeS === null || primeS === false){
            return interaction.editReply(`**:rolling_eyes: You don't have a prime subscription.**`)
        }
        else
        if(primeS !== null){
          let G = await primedb.get(`primeuserguild_${interaction.user.id}`)
          let end = await primedb.get(`primetime_${interaction.user.id}`)
          let endT = (end - Date.now())
          if(G == null){
            return interaction.editReply(`**:rolling_eyes: You don't have a prime subscription.**`)
          }else
          if(G !== null){
            let GN = client.guilds.cache.get(G)
            if(end > Date.now()){
            await interaction.editReply(`**🗂️ Server information: \`${G} - ${GN || "Unknown"}\` \n⏳ Ends At: \`${humanizeDuration(endT , { round : true })}\` **`)
        }else
        if(end < Date.now()){  
    let guild = await primedb.get(`primeuserguild_${interaction.user.id}`)
    primedb.delete(`primetime_${interaction.user.id}`)
    primedb.delete(`primestatus_${interaction.user.id}`)
    primedb.delete(`primeguilds_${guild.id}`)
    await primedb.delete(`primeuserguild_${interaction.user.id}`)
            return interaction.editReply(`**:rolling_eyes: You don't have a prime subscription.**`)
        }
    }
        }
    }
    if (interaction.options.getSubcommand() === "transfer" && !uID) {
        if(primeS === null || primeS === false){
            return interaction.editReply(`**:rolling_eyes: You don't have a prime subscription.**`)
            }else
        await interaction.editReply(`**:rolling_eyes: Wrong.**`)
    }else
if(interaction.options.getSubcommand() === "transfer" && uID){
    let guilddd = await primedb.fetch(`primeuserguild_${interaction.user.id}`)
    let timeee = await primedb.get(`primetime_${interaction.user.id}`)
    let uuuuID = await client.users.fetch(uID)
    let USERs = await primedb.get(`primeuserguild_${uuuuID.id}`)
    if(USERs == null) USERs = false
    if(USERs !== false){
        return interaction.editReply(`**:rolling_eyes: This user is have a prime subscription activated already.**`)
        }else if(USERs == false) {
            
    primedb.set(`primetime_${uuuuID.id}`, `${timeee}`)
     primedb.set(`primestatus_${uuuuID.id}`, true)
     primedb.set(`primeguilds_${guilddd.id}`, true)
     primedb.set(`primeuserguild_${uuuuID.id}`, `${guilddd}`)
     primedb.delete(`primetime_${interaction.user.id}`)
     primedb.delete(`primestatus_${interaction.user.id}`)
     primedb.delete(`primeguilds_${guilddd.id}`)
     primedb.delete(`primeuserguild_${interaction.user.id}`)
    return interaction.editReply({ content: `**🥳 <@${interaction.user.id}> has been transferred the prime subscription to <@${uuuuID.id}> successfully!**` })
}
}
        setTimeout(async() => {
            let text = await interaction.fetchReply()
            if(!text)return;
            if(text.content == "**⌛ You have \`3 minutes\` to select your plan.**"){
                await interaction.editReply({ content : `**:x: Timeout**` , components : []})
            }
            } , 180000)

    }
}