const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { Database } = require('quickmongo');
const blacklistdb = new Database(process.env.blacklist_db);

module.exports = {
    name: 'ping',
    cooldown: 3,
    UserPermission: ["SEND_MESSAGES"],
    BotPermission: ["EMBED_LINKS"],
    async execute(client, interaction) {
        // Check if the command was used in a guild (server)
        if (!interaction.guild) {
            return interaction.reply({ content: "You can only use this command in a server (guild)!", ephemeral: true });
        }

        const supp = new MessageButton()
            .setLabel(`Support Server`)
            .setStyle('LINK')
            .setURL(`https://discord.gg/vVwzAFaJQY`);

        const roww = new MessageActionRow()
            .addComponents(supp);

        let blu = await blacklistdb.get(`usersBL_${client.user.id}`);
        if (!blu) blu = []; // Set it to an empty array if it's null

        let blg = await blacklistdb.get(`serversBL_${client.user.id}`);
        if (!blg) blg = []; // Set it to an empty array if it's null

        if (blu.includes(interaction.user.id)) {
            interaction.editReply({
                content: `**🚫 You are blacklisted from using the bot.**\nYou can know the reason in the support server!`,
                components: [roww]
            });
            return;
        }
        if (blg.includes(interaction.guild.id)) {
            interaction.editReply({
                content: `**🚫 This server has been blacklisted from using the bot.**\nYou can know the reason in the support server!`,
                components: [roww]
            });
            return;
        }

        const msg = await interaction.followUp({ content: "Pong!", fetchReply: true });

        const embed = new MessageEmbed()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            let pinging = Math.floor(msg.createdTimestamp - interaction.createdTimestamp);
        if (pinging >= 0) {
            embed.setColor("#00FF00");
            if (pinging >= 150) {
                embed.setColor("#FFFF00");
                if (pinging >= 250) {
                    embed.setColor("#FF0000");
                }
            }
        }
        embed.setTimestamp();
        embed.setDescription(
            `**Time:** ${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)} ms\n**API Ping:** ${
            client.ws.ping
            } ms`,
        );
        interaction.editReply({ embeds: [embed], ephemeral: true });
    },
};