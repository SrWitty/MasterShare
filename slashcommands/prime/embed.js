const { Database } = require("quickmongo")
const db = new Database(process.env.primecmds_db)
const primedb = new Database(process.env.prime_db)

module.exports = {
	name: 'embed',
	cooldown: 5,
 	UserPermission: ["MANAGE_GUILD"],
    BotPermission: ["SEND_MESSAGES"],
	async execute(client, interaction) {

        let g = await primedb.get(`primeguilds_${interaction.guild.id}`)
        if(g !== true){
            return interaction.editReply(`**:rolling_eyes: This feature is for Prime subscriptions only, you can buy it and benefit from it with the best features.**`)
        }else
        if(g === true){
          if (interaction.options.getSubcommand() === "banner") {
            let Banner = interaction.options.getAttachment("banner")
            await db.set(`banner_${interaction.guild.id}`, Banner.url)
            return interaction.editReply(`**✅ The embed banner has been changed successfully.**`) 
          } else if (interaction.options.getSubcommand() === "color") {
            let Code = "#" + interaction.options.getString('hex').replaceAll('#', '');
			let color = Code;
			if (!(Code.length < 8 && /^#[0-9A-F]{6}$/i.test(Code))) {
				return interaction.editReply(`**:x: Type a vaild hex code color.**`)
			}
            await db.set(`color_${interaction.guild.id}`, Code)
            return interaction.editReply(`**✅ The embed color has been changed successfully.**`) 
          } else if(interaction.options.getSubcommand() === "fields") {
            let type = interaction.options.getString('type')
            if(type == "created_at") {
              let typedb = await db.fetch(`createdatfield_${interaction.guild.id}`)
              if(typedb == true) {
                db.delete(`createdatfield_${interaction.guild.id}`)
                return interaction.editReply({ content: `**🙁 The Created-At field has been removed from the embed.**`})
              } else if(typedb !== true) {
                db.set(`createdatfield_${interaction.guild.id}`, true)
                return interaction.editReply({ content: `**✅ The Created-At field has been added to the embed.**`})
              }
            } else if(type == "boosts") {
              let typedb = await db.fetch(`boostsfield_${interaction.guild.id}`)
              if(typedb == true) {
                db.delete(`boostsfield_${interaction.guild.id}`)
                return interaction.editReply({ content: `**🙁 The Boosts Count field has been removed from the embed.**`})
              } else if(typedb !== true) {
                db.set(`boostsfield_${interaction.guild.id}`, true)
                return interaction.editReply({ content: `**✅ The Boosts Count field has been added to the embed.**`})
              }
            } else if(type == "members") {
              let typedb = await db.fetch(`membersfield_${interaction.guild.id}`)
              if(typedb == true) {
                db.delete(`membersfield_${interaction.guild.id}`)
                return interaction.editReply({ content: `**🙁 The Members Count field has been removed from the embed.**`})
              } else if(typedb !== true) {
                db.set(`membersfield_${interaction.guild.id}`, true)
                return interaction.editReply({ content: `**✅ The Members Count field has been added to the embed.**`})
              }
            }
          }
        }
     }
}