const humanizeDuration = require("humanize-duration");
const { Collection, Permissions, MessageActionRow, MessageButton, WebhookClient } = require('discord.js');
const { Database } = require('quickmongo');
const blacklistdb = new Database(process.env.blacklist_db);

module.exports = {
    name: 'vip',
    cooldown: 5,
    UserPermission: ["SEND_MESSAGES"],
    BotPermission: ["EMBED_LINKS"],
    async execute(client, interaction) {
        let devs = ["1091118468155314306", "608275252862124074", "612527697851318274"];

        if (!devs.includes(interaction.user.id)) return interaction.editReply(`**:x: Developers Only.**`);

        const primedb = new Database(process.env.prime_db);
        const time = require("../../time.js");
        const ms = require("ms");
        const { MessageEmbed, WebhookClient } = require("discord.js");
        const humanizeDuration = require("humanize-duration");

        try {
            let primeR = "1154482299493159073";
            let ac = interaction.options.getString("action");
            let iddd = interaction.options.getString("user");
            let guildd = interaction.options.getString("guild");
            let timee = interaction.options.getString("time");
            let idd = await client.users.fetch(iddd);

            if (guildd !== null) {
                let guild = client.guilds.cache.get(guildd);
                if (ac == "add" && !guild) return interaction.editReply(`**:rolling_eyes: I can't find this server.**`);
                if (ac == "add" && guild) {
                    if (!timee) {
                        timee = Date.now() + time.month;
                    } else {
                        timee = Date.now() + parseInt(ms(timee));
                    }
                    primedb.set(`primeuserguild_${idd.id}`, guild.id);
                    primedb.set(`primetime_${idd.id}`, `${parseInt(timee)}`);
                    primedb.set(`primestatus_${idd.id}`, true);
                    let ppp = await primedb.get(`primeguilds_${guild.id}`);
                    if (ppp !== true) {
                        await primedb.set(`primeguilds_${guild.id}`, true);
                        let PU = await guild.members.fetch(idd.id);
                        if (!PU) {
                            let tttttt = timee - Date.now();
                            let mmsg = new WebhookClient({ id: "1154481708201160866", token: "sxKZ4vmCUBGPzCEaqjZwRZzH5jYeNVegbcFKjI8CgiuY55gItrNpqtMxrzxYD8x0g9Th" });
                            await mmsg.send(`**PRODE has been given a prime for: <@${idd.id}>, ${idd.id}, [${idd.tag}](https://discord.com/user/${idd.id})\nServer: ${guild.name} | ${guild.id}\nTime: ${humanizeDuration(tttttt, { round: true })}**`);
                            return interaction.editReply(`**:v: Done.**`);
                        }
                        if (PU) {
                            let tttttt = timee - Date.now();
                            PU.roles.add(primeR);
                            let mmsg = new WebhookClient({ id: "1154481708201160866", token: "sxKZ4vmCUBGPzCEaqjZwRZzH5jYeNVegbcFKjI8CgiuY55gItrNpqtMxrzxYD8x0g9Th" });
                            await mmsg.send(`**PRODE has been given a prime for: <@${idd.id}>, ${idd.id}, [${idd.tag}](https://discord.com/user/${idd.id})\nServer: ${guild.name} | ${guild.id}\nTime: ${humanizeDuration(tttttt, { round: true })}**`);
                            return interaction.editReply(`**:v: Done.**`);
                        }
                    } else if (ppp === true) {
                        return interaction.editReply(`**:rolling_eyes: This server already has a prime subscription.**`);
                    }
                }
            }

            if (ac == "remove") {
                let ss = await primedb.fetch(`primestatus_${idd.id}`);
                if (ss !== true) {
                    return interaction.editReply(`**:rolling_eyes: This user doesn't have a prime subscription.**`);
                }
                let guildddddd = await primedb.fetch(`primeuserguild_${idd.id}`);
                let ser = await primedb.fetch(`primeguilds_${guildddddd}`);
                if (ser === null) return interaction.editReply(`**:rolling_eyes: This server doesn't have a prime subscription.**`);
                if (ser === true) {
                    primedb.delete(`primeguilds_${guildddddd}`);
                    primedb.delete(`primetime_${idd.id}`);
                    primedb.delete(`primestatus_${idd.id}`);
                    primedb.delete(`primeuserguild_${idd.id}`);
                    let PU = await guild.members.fetch(idd.id);
                    if (!PU) {
                        let mmsg = new WebhookClient({ id: "1154481708201160866", token: "sxKZ4vmCUBGPzCEaqjZwRZzH5jYeNVegbcFKjI8CgiuY55gItrNpqtMxrzxYD8x0g9Th" });
                        await mmsg.send(`**PRODE has had their prime removed from: <@${idd.id}>, ${idd.id}, [${idd.tag}](https://discord.com/user/${idd.id}) **`);
                        await interaction.editReply(`**:v: Done.**`);
                        return idd.send(`أهلاً يا **@${idd.username}**،\nنود أن نعلمك بأن اشتراك برايم الخاص بك تم إزالته بواسطة المطورين، لمعرفة السبب يمكنك التواصل مع المطورين من خلال خادم الدعم الفني لدينا\n\nHello **@${idd.username}**,\nWe would like to inform you that your Prime subscription has been removed by the developers, to find out why you can contact the developers through our technical support server\n\n- https://discord.gg/qGnSnVYUvD`);
                    }
                    if (PU) {
                        PU.roles.remove(primeR);
                        let mmsg = new WebhookClient({ id: "1154481708201160866", token: "sxKZ4vmCUBGPzCEaqjZwRZzH5jYeNVegbcFKjI8CgiuY55gItrNpqtMxrzxYD8x0g9Th" });
                        await mmsg.send(`**PRODE has had their prime removed from: <@${idd.id}>, ${idd.id}, [${idd.tag}](https://discord.com/user/${idd.id}) **`);
                        await interaction.editReply(`**:v: Done.**`);
                        return idd.send(`أهلاً يا **@${idd.username}**،\nنود أن نعلمك بأن اشتراك برايم الخاص بك تم إزالته بواسطة المطورين، لمعرفة السبب يمكنك التواصل مع المطورين من خلال خادم الدعم الفني لدينا\n\nHello **@${idd.username}**,\nWe would like to inform you that your Prime subscription has been removed by the developers, to find out why you can contact the developers through our technical support server\n\n- https://discord.gg/qGnSnVYUvD`);
                    }
                }
            }

            if (ac == "check") {
                let dd = await primedb.get(`primestatus_${idd.id}`);
                if (dd == null) {
                    let embed = new MessageEmbed()
                        .setDescription(`**This user doesn't have a prime subscription.**`)
                        .setColor("#ff0000");
                    return interaction.editReply({ embeds: [embed] });
                }
                if (dd == true) {
                    let pt = await primedb.get(`primetime_${idd.id}`);
                    let fpt = pt - Date.now();
                    let pgu = await primedb.get(`primeuserguild_${idd.id}`);
                    let GN = client.guilds.cache.get(pgu);
                    let embed = new MessageEmbed()
                        .addField(`User:`, `<@${idd.id}> - ${idd.id} - ${idd.tag}`, true)
                        .addField(`Status:`, `🟢 Activated`, true)
                        .addField(`Server:`, `${GN} - ${pgu}`, true)
                        .addField(`Ends At:`, `${humanizeDuration(fpt, { round: true })}`, true)
                        .setColor("RANDOM");
                    return interaction.editReply({ embeds: [embed] });
                }
            }
        } catch (error) {
            console.error(error);
            // Handle the error here
            // You can send a message or log it, depending on your preference
            return interaction.editReply(`**:x: An error occurred.**`);
        }
    },
};
