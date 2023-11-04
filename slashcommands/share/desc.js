const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Database } = require("quickmongo")
const db = new Database(process.env.share_db)
module.exports = {
    name: 'desc',
    cooldown: 5,
    UserPermission : ["MANAGE_MESSAGES"],
    BotPermission: ["SEND_MESSAGES"],
    async execute(client, interaction) {

 let links = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');

 let links2 = [
 'https://',
'http://',
'discord.gg',
'.gg',
'.xyz',
'.club',
]

//-----

let mentions = [
'@everyone',
'@here',
'@',
'@&'
]

//--------

let bw = [

'مطلوب',
'روبلوكس',
'كس',
'طيز',
'بيع',
'للبيع',
'احا',
'طلب',
'شوب',
'متناك',
'عرص',
'خول',
'منيوك',
'منيك',
'منيوق',
"نيك",
"تيزك"
/*
//-------
"كس" , "ك س" , "كث" , "ك ث" , "كص" , " ك ص" , "قسمك" , "صمق" , "صمك" , "كسمك" , "ك س م ك" , "متناك" , "متناق" , "منيوك" , "لبوه" , "وسخ" , "وصخ" , "وسخه" ,  "وصخه" ,  "نيق" , "منيكه" , "منيقه" , "شرموط" , "شرموت" , "شرمت" , "شرمط" , "شرمطه" , "شرمته" , "منكوح" , "نكح" , "طيز" , "مؤخره" , "مكواه" , "سكس" , "سيكس" , "سيكسي" , "بزاز" ,"بظاظ" , "بذاذ"*/
]

    let Desc = interaction.options.getString('description')
    if(10 >= Desc.length){
       return interaction.editReply(`**⁉️ Description is too short**`)
    }
    else
    if(Desc.length >= 255){
       return interaction.editReply(`**⁉️ Description is too long**`)
    }
    else 
    if(255 > Desc.length) {
        if (mentions.some((mentions) =>  new RegExp(mentions, "i").test(Desc))){
    return interaction.editReply(`**⁉️ You can't put a mentions in description**`)
    }else
    
    if (!!links.test(Desc , 'i')){
    return interaction.editReply(`**⁉️ You can't put a links in description**`)
    }
    
    else
    if (links2.some((links2) =>  new RegExp(links2, "i").test(Desc))){
    return interaction.editReply(`**⁉️ You can't put a links in description**`)
    }
    else
    if (bw.some((bw) =>  new RegExp(bw, "i").test(Desc))){
    const match = bw.find((w) => RegExp(w, 'i').test(Desc))
    
    if (match) {
    
          return interaction.editReply(`**⁉️ You can't put this word \`${match}\` in description**`)
       }
    }
    
    else {
        await interaction.editReply(`**✅ Description has been changed successfully**`)
        return db.set(`sharedesc_${interaction.guild.id}`, Desc)
    }
    } 
}
}