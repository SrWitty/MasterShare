const humanizeDuration = require("humanize-duration");
const { Collection, Permissions, MessageActionRow, MessageButton, WebhookClient } = require('discord.js');
const { Database } = require('quickmongo')
const blacklistdb = new Database(process.env.blacklist_db)

module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;
    if (!client.slash.has(interaction.commandName)) return;
    if (interaction.channel.type == "DM") return interaction.reply({ content: `**:x: You can use the bot with Slash commands in the servers only!**`, ephemeral: true })
    
    try {
        // Defer the reply immediately
        await interaction.deferReply();

        const supp = new MessageButton()
            .setLabel(`Support Server`)
            .setStyle('LINK')
            .setURL(`https://discord.gg/vVwzAFaJQY`)

        const roww = new MessageActionRow()
            .addComponents(supp)
        let blu = await blacklistdb.get(`usersBL_1029108457699295323`)
        let blg = await blacklistdb.get(`serversBL_1029108457699295323`)

        if (!client.BotPermissions.has(interaction.commandName)) {
            client.BotPermissions.set(interaction.commandName, new Collection());
        }
        const BotPermission = client.slash.get(interaction.commandName).BotPermission.toString();
        if (!interaction.guild.me.permissions.has(BotPermission)) {
            return interaction.editReply(`**🙄 I don't have \`${BotPermission}\` Permission**`)
        }

        let command = client.slash.get(interaction.commandName);
        if (!command) {
            return
        }

        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Collection());
        }
        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return interaction.editReply({ content: `**🏓 ${interaction.user.username}**, Cooldown \`(${humanizeDuration(Math.round(timeLeft) + "000")} left)\``, ephemeral: true })
            }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        //-------------------------------------

        if (!client.UserPermissions.has(command.name)) {
            client.UserPermissions.set(command.name, new Collection());
        }
        const UserPermission = command.UserPermission.toString();
        if (!interaction.member.permissions.has(UserPermission)) {
            return interaction.editReply(`**🙄 You don't have \`${UserPermission}\` Permission**`)
        }

        if (interaction.commandName != "ping") {
            if (blu && blu.includes(interaction.user.id)) {
                return interaction.editReply({ content: `**🚫 You are blacklisted from using the bot.**\nYou can know the reason in the support server!`, components: [roww] });
            }
            if (blg && blg.includes(interaction.guild.id)) {
                return interaction.editReply({ content: `**🚫 This server has been blacklisted from using the bot.**\nYou can know the reason in the support server!`, components: [roww] });
            }
        }

        await client.slash.get(interaction.commandName).execute(client, interaction);
    } catch (error) {
        const sup = new MessageButton()
            .setLabel(`Support Server`)
            .setStyle('LINK')
            .setURL(`https://discord.gg/vVwzAFaJQY`)

        const row = new MessageActionRow()
            .addComponents(sup)
        let chlog = new WebhookClient({ id: "1154481708201160866", token: "sxKZ4vmCUBGPzCEaqjZwRZzH5jYeNVegbcFKjI8CgiuY55gItrNpqtMxrzxYD8x0g9Th" })
        chlog.send({ content: `${error.message}\n**Command Name: /${interaction.commandName}**` })
        return interaction.editReply({ content: `**:x: A new problem/bug in ${__filename}**\n\`${error.message}\``, components: [row] });
    }
}
