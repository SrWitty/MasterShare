const { MessageEmbed } = require("discord.js")
const { Database } = require("quickmongo")
const coins = new Database(process.env.coins_db)

module.exports = {
	name: 'leaderboard',
	cooldown: 5,
 	UserPermission: ["SEND_MESSAGES"],
    BotPermission: ["EMBED_LINKS"],
	async execute(client, interaction) {

        const money = await coins.startsWith("coins_", { sort: ".data" });
        const rank = money.map(x => x.ID).indexOf(`coins_${interaction.user.id}`) + 1;
        money.length = 10;
        let finalLb = "";
        for (var i in money) {
          let user = `${(await client.users.fetch(money[i].ID.split('_')[1])).username ? (await client.users.fetch(money[i].ID.split('_')[1])).username : "Unknown#0000"}`
          finalLb += `#${money.indexOf(money[i])+1} - **${user}**: 💰 \`$${money[i].data}\`\n`;
        }
        let embed = new MessageEmbed()

        embed.setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
        embed.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        embed.setColor("#36393e")
        let finaldesc = finalLb
        .replace("#1", "🥇")
        .replace("#2", "🥈")
        .replace("#3", "🥉")
        embed.addField(`**📊 COINS LEADERBOARD:**`, finaldesc)

        return interaction.editReply({content : `>>> **:sparkles: Your rank: \`${rank}\`**` , embeds : [embed]})
  }
}