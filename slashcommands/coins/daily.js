const { Discord } = require('discord.js');
const humanizeDuration = require("humanize-duration");
const { Database } = require("quickmongo")
const coins = new Database(process.env.coins_db)
const timee = new Database(process.env.coinstime_db)

module.exports = {
	name: 'daily',
	cooldown: 5,
 	UserPermission: ["SEND_MESSAGES"],
    BotPermission: ["SEND_MESSAGES"],
	async execute(client, interaction) {
	 let timeout = 86400000;
          let amount = Math.floor(Math.random() * 50) + 5
        let daily = await timee.get(`dailycooldown_${interaction.user.id}`)
         if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = humanizeDuration(timeout - (Date.now() - daily));
   
   await interaction.editReply(`**⌛ You need to wait \`${time}\` to receive the daily coins.**`)
    } else {
                
timee.set(`dailycooldown_${interaction.user.id}` , Date.now())
                coins.add(`coins_${interaction.user.id}` , amount)
              await interaction.editReply(`**🥳 You have received \`$${amount}\` coins.**`);
}

	}
}