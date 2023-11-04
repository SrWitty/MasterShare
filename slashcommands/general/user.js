const { WebhookClient, MessageEmbed } = require('discord.js');
const { Database } = require('quickmongo');
const primedb = new Database(process.env.prime_db);
const badgesdb = new Database(process.env.badges_db);
const blacklistdb = new Database(process.env.blacklist_db);
const dailytime = new Database(process.env.coinstime_db);
const humanizeDuration = require("humanize-duration");
const coins = new Database(process.env.coins_db);

module.exports = {
    name: 'user',
    cooldown: 3,
    UserPermission: ["SEND_MESSAGES"],
    BotPermission: ["EMBED_LINKS"],
    async execute(client, interaction) {
        let User = interaction.options.getUser("user");
        if (!User) {
            User = interaction.member;
        }
        if (User.bot) {
            return interaction.editReply(`**:rolling_eyes: Bots don't have information.**`);
        }
        
        // Define the 'coinss' variable here
        let coinss = await coins.get(`coins_${User.id}`);
        if (coinss === null) {
            coinss = "0";
        }

        let prime = await primedb.fetch(`primeguilds_${interaction.guild.id}`);
        if (prime == null) {
            prime = false;
        }
        if (prime !== true) {
            let uuuu = await client.guilds.cache.get(interaction.guild.id).members.cache.get(User.id);
            if (!uuuu) {
                return interaction.editReply(`**:rolling_eyes: I can't find this user.**`);
            }
        }
        var blackinfo = "**Unknown**";
        var badges = "";
        let blu = await blacklistdb.get(`usersBL_1029108457699295323`);
        if (blu && blu.includes(User.id)) {
            blackinfo = "**Blacklisted**";
        } else {
            blackinfo = "**Not Blacklisted**";
        }
        var createdat = "0";
        var joinedat = "0";
        var namee = "";
        if (User.id !== interaction.user.id) {
            createdat = User.createdTimestamp;
            joinedat = interaction.guild.members.cache.get(User.id).joinedTimestamp;
            namee = User.username;
        } else {
            createdat = User.user.createdTimestamp;
            joinedat = User.joinedAt;
            namee = User.user.username;
        }
        let sadmin = await badgesdb.fetch(`MasterShareadmin_${User.id}`);
        if (sadmin == true) {
            badges += "<:MasterShareAdmin:1034620545964191844>";
        }
        let sstaff = await badgesdb.fetch(`MasterSharestaff_${User.id}`);
        if (sstaff == true) {
            badges += "<:MasterShareStaff:1034620217990586408>";
        }
        let sverified = await badgesdb.fetch(`MasterShareverified_${User.id}`);
        if (sverified == true) {
            badges += "<:MasterShareVerified:1034625414276075621>";
        }
        let sbug = await badgesdb.fetch(`MasterSharebughunter_${User.id}`);
        if (sbug == true) {
            badges += "<:MasterShareBugHunter:1044594800013344780>";
        }
        let stranslator = await badgesdb.fetch(`MasterSharetranslator_${User.id}`);
        if (stranslator == true) {
            badges += "<:MasterShareTranslator:1044598484495515668>";
        }
        let ssugg = await badgesdb.fetch(`MasterSharesug_${User.id}`);
        if (ssugg == true) {
            badges += "<:MasterShareSuggester:1044596406138179594>";
        }
        /*
        let spartner = await badgesdb.fetch(`MasterSharepartner_${User.id}`);
        if (spartner == true) {
            badges += "<:MasterSharePartner:1034620348869660812>";
        }
        */
        let sprime = await primedb.get(`primestatus_${User.id}`);
        if (sprime == true) {
            badges += "<:MasterSharePrime:1044599396563689502>";
        }
        let sfriend = await badgesdb.fetch(`MasterSharefriend_${User.id}`);
        if (sfriend == true) {
            badges += "<:MasterShareFriend:1044599690303385650>";
        }
        let searly = await badgesdb.fetch(`MasterShareearly_${User.id}`);
        if (searly == true) {
            badges += "<:MasterShareEarly:1044594275524038666>";
        }
        let sevents = await badgesdb.fetch(`MasterShareevents_${User.id}`);
        if (sevents == true) {
            badges += "<:MasterShareEvents:1044593778880696423>";
        }
        let sbooster = await badgesdb.fetch(`MasterSharebooster_${User.id}`);
        if (sbooster == true) {
            badges += "<:MasterShareBooster:1044595105102835722>";
        }
        let timeout = 86400000;
        var daily = "";
        let dailyt = await dailytime.get(`dailycooldown_${User.id}`);
        if (dailyt !== null && timeout - (Date.now() - dailyt) > 0) {
            let time = humanizeDuration(timeout - (Date.now() - dailyt));
            daily = time;
        } else {
            daily = "You can collect it. `/daily`";
        }
        let e = new MessageEmbed()
            .setAuthor({ name: namee, iconURL: User.displayAvatarURL({ dynamic: true }) })
            .setColor("RANDOM")
            .setFooter(`By: ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(User.displayAvatarURL({ dynamic: true }))
            .addField(`Coins:`, `**$${coinss}**`, true)
            .addField(`Blacklist Status:`, blackinfo, true)
            .addField(`Daily Collect:`, `**${daily}**`, true)
            .addField(`Badges:`, `**${badges || "None"}**`, true);
        return interaction.editReply({ embeds: [e] });
    },
};
