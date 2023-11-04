require('dotenv').config()
const { Client, WebhookClient } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = async (client) => {
	/*client.user.setPresence({ activities: [{ name: '/help' }], status: 'online' });*/
    console.log('Ready');
    
    
    const commands = [
	
      {
        name: 'ping',
        description: `🏓 ${client.user.username}'s latency`
      }, {
        name: 'help',
        description: `🔎 Feeling lost?`
      }, {
        name: 'bot',
        description: `🤖 ${client.user.username} Stats`
      }, {
            name: 'channel',
            description: '⚙️ Select the bumping channel',
            options: [{
                name: 'channel',
                type: 7,
                description: '🤔 Mention/Name/ID Channel.',
                required: true,
            }],
      }, {
            name: 'desc',
            description: '⚙️ Type your customize description',
            options: [{
                name: 'description',
                type: 3,
                description: '🤔 Welcome to my server. We have %mc% Member!',
                required: true,
            }],
      }, {
            name: 'share',
            description: `🤩 Let's go! Share your server now.`
      }, {
            name: "preview",
            description: "🔮 Preview your advertising",
            options: [{
                name: "prev",
                description: "🤔 Show your selected (Channel, Description)",
                type: 3,
                required: false,
                choices: [{
                    name: "channel",
                    description: "🔮 View the bumping channel",
                    value: "channel"
                }, {
                    name: "desc",
                    description: "🔮 View the description",
                    value: "desc"
                }]
            }]
      },
        {
            name: 'coins',
            description: '🪙 Coins System. Show and transfer it!',
            options: [{
                name: 'user',
                type: 6,
                description: '👥 The User',
                required: false,
            }, {
                name: 'amount',
                type: 10,
                description: '💰 Amount',
                required: false,
            }],
        },
        {
            name: 'leaderboard',
            description: `🤼 Show the leaderboards and compete with them!`
        },
        {
            name: 'daily',
            description: `💰 Get the daily salary!`
        },
        {
            name : "manage_coins",
            description : "🎗️ Developers Only.",
            options : [{
            name : "user",
            description : "User ID",
            type : 3,
            required : true,
        }, {
        name : "action",
        description : "The Action",
        type : 3,
        required : true,
        choices : [{
            name : "add",
            value : "add"
        }, {
            name : "remove",
            value : "remove"
        }] 
        },{
        name : "amount",
        description : "Amount?",
        type : 3,
        required : true
        }]
        }, {
           name : "blacklist",
           description : "🎗️ Developers Only.",
           options : [{
               name : "type",
               description : "User or Server?",
               type : 3,
               required : true,
               choices : [{
                   name : "user",
                   value : "user"
               }, {
                   name : "server",
                   value : "server"
               }]
           },{
            name : "id",
            description : "User/Server ID!",
            type : 3,
            required : true
           },{
               name : "action",
               description : "The Action.",
               type : 3,
               required : true,
               choices : [{
                   name : "add",
                   value : "add"
               }, {
                   name : "remove",
                   value : "remove"
               }, {
                   name : "check",
                   value : "check"
               }]
           }, {
			   name : "reason",
			   description : "Reason",
			   type : 3,
               min_length : 10,
		    	max_length : 1024,
			   required : false
		   }]
        }, {
        name: 'prime',
        description: '🗂️ Manage and but a prime!',
        options: [{
          name: 'subscribe',
          type: 1,
          description: '🗂️ Buy a prime subscription and upgrade your server.',
            options: [{
                name: 'guild_id',
                description : 'Server ID',
                type : 3,
                required : true
            }]
        }, {
          name: 'move',
          type: 1,
          description: '🗂️ Move the server of the prime.',
          options: [{
                name: 'guild_id',
                description : 'Server ID',
                type : 3,
                required : true
            }]
        }, {
          name: 'preview',
          type: 1,
          description: '🗂️ Show your prime subscription information.',
        }, {
          name: 'transfer',
          type: 1,
          description: '🗂️ Move the ownership of the prime to another user! [NEW]',
          options: [{
                name: 'user_id',
                description : 'User ID',
                type : 6,
                required : true
            }]
        }]
      }, {
            name : "vip",
            description : "🎗️ Developers Only.",
            options : [{
            name : "user",
            description : "User ID",
            type : 3,
            required : true,
        },{
        name : "action",
        description : "The Action.",
        type : 3,
        required : true,
        choices : [{
            name : "add",
            value : "add"
        }, {
            name : "remove",
            value : "remove"
        }, {
            name : "check",
            value : "check"
        }] 
        },
         {
        name : "guild",
        description : "Server ID",
        type : 3,
        required : false
        }, {
            name : "time",
            description : "Time",
            type : 3,
            required : false
            }]
    }, {
        name: 'user',
        description: '🗃️ Show user information or someone.',
        options: [{
          name: 'user',
          description: 'The User.',
          type: 6,
          required: false
        }]
      },
      {
        name: 'embed',
        description: '🔮 Now you can customize your embed message.',
        options: [{
          name: 'banner',
          type: 1,
          description: '🖼️ Set your banner, to show it in the bump message',
            options: [{
            name: 'banner',
            description: 'Upload the banner.',
            type: 11,
            required: true
        }]
        }, {
          name: 'color',
          type: 1,
          description: '🗂️ You can change the color of the embed!',
          options: [{
                name: 'hex',
                description : 'Give me a hex code color.',
                type : 3,
                required : true
            }]
        }, {
          name: 'fields',
          type: 1,
          description: '🗂️ You can customize all the embed with that command! That\'s magic.',
          options: [{
            name: 'type',
            description: ':sparkles: Select the type.',
            type: 3,
            required: true,
            choices : [{
                   name : "Created_At",
                   value : "created_at"
               }, {
                   name : "Boosts",
                   value : "boosts"
               }, {
                   name : "Members",
                   value : "members"
               }]
          }]
        }]
      }
    ]

    const rest = new REST({ version: '9' }).setToken(process.env.token);

    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );

        } catch (error) {
            console.error(error);
        }
    })();
    
}
