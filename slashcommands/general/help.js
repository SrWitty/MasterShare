const { MessageEmbed , MessageButton , MessageActionRow , Permissions } = require("discord.js")

module.exports = {
	name: 'help',
  cooldown: 3,
	UserPermission: ["SEND_MESSAGES"],
  BotPermission: ["EMBED_LINKS"],
	async execute(client, interaction) {
    
    let prefix;
    prefix = "/"
  const inv = new MessageButton()
	.setLabel(`Invite MasterShare`)
	.setStyle('LINK')
	.setURL(client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR] }))

		const sup = new MessageButton()
	.setLabel(`Support Server`)
	.setStyle('LINK')
	.setURL(`https://discord.gg/vVwzAFaJQY`)

const row = new MessageActionRow()
			.addComponents(inv)
			.addComponents(sup)
    
        let embed1 = new MessageEmbed()
          .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(interaction.user.avatarURL({ dynamic:true }))
        .addField(`🗂️ General:`, `>>> **</help:1025135586249543741>,</ping:1025135586249543740>,</bot:1025135586249543744>,</user:1034635778174767184>**`)
        .addField(`🔮 Bumping:`,`>>> **</channel:1029105993084321833>,</desc:1029105993084321834>,</share:1029105993084321835>,</preview:1029105993084321836>**`)
        .addField(`💰 Coins:`,`>>> **</coins:1030991042075443210>,</daily:1031002448409661501>,</leaderboard:1031002448409661500>**`)
        .addField(`:gem: Prime:`, `>>> **</prime preview:1034214755772137616>,</prime move:1034214755772137616>,</prime subscribe:1034214755772137616>,</banner:1034444820774653962>**`)
        .setColor("#36393f")
        return interaction.editReply({embeds : [embed1] , components : [row]})
    }
}