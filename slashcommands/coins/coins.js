const { MessageAttachment, WebhookClient, MessageButton, MessageActionRow } = require('discord.js');
const { Database } = require("quickmongo")
const coins = new Database(process.env.coins_db)
const primedb = new Database(process.env.prime_db)
/*const { CaptchaGenerator } = require("captcha-canvas");
const { registerFont } = require('canvas')
registerFont('arial.ttf', { family: 'Arial' })
*/
module.exports = {
	name: 'coins',
	cooldown: 5,
 	UserPermission: ["SEND_MESSAGES"],
    BotPermission: ["ATTACH_FILES"],
	async execute(client, interaction) {
		
let User = interaction.options.getUser("user")
if(!User){
		User = interaction.user
	}
let prime = await primedb.fetch(`primeguilds_${interaction.guild.id}`)
    if(prime == null) {
        prime = false
    }
    if(prime !== true) {
        let uuuu = await client.guilds.cache.get(interaction.guild.id).members.cache.get(User.id)
    if(!uuuu) {
        return interaction.editReply(`**:rolling_eyes: I can't find this user.**`)
    }
    }
let Amount = interaction.options.getNumber("amount")

if(Date.now() - interaction.user.createdAt < 604800000) {
    return interaction.editReply("**😕 You can't use `/coins` command for a while.**")
  }
let ggggg = 2 + 2 == 4;
if(!Amount){
	let coinss = await coins.get(`coins_${User.id}`)
	
	if(coinss === null){
		coinss = "0"
	}
	if(User.bot){
		await interaction.editReply("**🙄 Bots doesn't have a coins**")
	}else
if(User.id == interaction.user.id){
await interaction.editReply(`**🪙 Your balance \`$${coinss}\`.**`)
}else

if(User.id !== interaction.user.id){
await interaction.editReply(`**🪙 ${User.tag} balance is \`$${coinss}\`**`)
}
    
}else

if(Amount !== null && !User){
	await interaction.editReply("**🙄 Mention a @user.**")
}else

if(User.id == interaction.user.id && Amount !== null){
await interaction.editReply("**🙄 You can't transfer to yourself.**")
}else 

if(User.id !== interaction.user.id && Amount !== null){
	if(User.bot){
		await interaction.editReply("**🙄 Bots doesn't have a coins**")
	}else
	
	if(1 == 1){
	let AuthorC = await coins.get(`coins_${interaction.user.id}`)

	if(Amount === 0){ 
	 await interaction.editReply("**:rolling_eyes: Wrong number.**")
	}else
	if(Amount.toString().includes(".") || Amount.toString().includes("-") || Amount.toString().includes(",")){ 
		await interaction.editReply("**:rolling_eyes: Wrong number.**")
	   }
	if(Amount > AuthorC){
		await interaction.editReply("**🥹 You don't have enough coins.**")
	}else if(Amount <= AuthorC && Amount > 0){
	      let tax = Math.floor(Amount*(3/100));
      let resulting = Math.floor(Amount-(Amount*(3/100))); 
      if(Amount === 1){
      	resulting = 1
      }
/*
let num = Math.floor(Math.random() * 9999) + 1000;

num.length = 4;
        
  const captcha = new CaptchaGenerator()
//.setDimension(200 , 600)
.setDimension(110 , 300)
.setCaptcha({font: "Comic Sans BOLD" , text: `${num}` , size: 40, color: "#c59186"})
.setDecoy({opacity: 10000})
.setTrace({color: "#c59186"});

//#726dff
const buffer = await captcha.generateSync();

const attachment = new MessageAttachment(buffer, interaction.userId + ".png");

*/
        const button1 = new MessageButton()
      .setStyle('SUCCESS') 
      .setCustomId('yes')
      .setLabel('Transfer')

  const button2 = new MessageButton()
      .setStyle('DANGER') 
      .setCustomId('no')
      .setLabel('Cancel')

const row = new MessageActionRow().addComponents(button1).addComponents(button2)
        interaction.editReply({content : `>>> **${interaction.user.tag} Amount: \`$${resulting}\`\nYou have 30 seconds.**`, components: [row]})

            const filter = u => u.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
		
		/*const filter = m => interaction.user.id === m.author.id;

		const collecter = interaction.channel.createMessageCollector({filter , time : 30000 , max : 1})	
*/

collector.on("collect" , async b => {
    if(b.customId == "yes") {
    	let number = parseInt(resulting)
    	await coins.subtract(`coins_${interaction.user.id}` , Amount)
    	await coins.add(`coins_${User.id}` , number)
    	await interaction.editReply({ content : `**✅ <@${interaction.user.id}> has transferred \`$${number}\` to <@${User.id}>!**` ,files : [] , attachments: [], components: []})
        await User.send(`**💰 | \`$${number}\` You have received it from: ${interaction.user.tag} - \`(${interaction.user.id})\`**`).catch(err => { return })
		let ccsend = new WebhookClient({ id: "1154481708201160866", token: "sxKZ4vmCUBGPzCEaqjZwRZzH5jYeNVegbcFKjI8CgiuY55gItrNpqtMxrzxYD8x0g9Th" });
         await ccsend.send(`_ _
**From: [${interaction.user.username}](<https://discord.com/users/${interaction.user.id}>) - \`$${Amount}\` Balance Now: \`$${await coins.fetch(`coins_${interaction.user.id}`) || "0"}\`**
**To: [${User.username}](<https://discord.com/users/${User.id}>) - \`$${number}\` Balance Now: \`$${await coins.fetch(`coins_${User.id}`) || "0"}\`**
_ _`)
        }else

if(b.customId == "no") {
	await interaction.editReply({ content : `**:x: The transfer has been cancelled.**` ,files : [] , attachments: [], components: []})
}
})

}
}
}
}
}