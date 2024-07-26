const { Client, IntentsBitField, EmbedBuilder, Events, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const WebSocket = require("ws");
const fs = require("fs");
require('dotenv').config()

const token = process.env.TOKEN
const ws = new WebSocket("ws://127.0.0.1:8765");

const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
const user_data = JSON.parse(fs.readFileSync("./userdata.json", "utf8"));
const ectdata = JSON.parse(fs.readFileSync('./ectstorage.json', "utf8"));

const music_play = false;
const checkforwomen = false;

const VERSION = '0.0.92'

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildWebhooks,
    IntentsBitField.Flags.GuildInvites,
  ],
});

function save() { 
  fs.writeFile("./userdata.json", JSON.stringify(user_data), (err) => {
    if (err) throw err;
    console.log("User data updated!");
  });
}

const player = createAudioPlayer();

if (music_play) {  
  client.on("ready", async () => { 
    try {
      const connection = joinVoiceChannel({
        channelId: "1221630585186025583",
        guildId: "1221626830059081768",
        adapterCreator: client.guilds.cache.get("1221626830059081768").voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false,
      });
  
      connection.subscribe(player);
  
      const resource = createAudioResource('C:/Users/Evypo/Downloads/gartic/src/wasd.mp3');
      player.play(resource);
  
      await new Promise(resolve => {
        player.on(AudioPlayerStatus.Idle, () => {
          setTimeout(() => {
            connection.destroy();
            resolve();
          }, 5000); 
        });
      });
  
    } catch (error) {
      console.error("Error:", error);
    }
  });
}




function save2() {
  fs.writeFile("./userdata.json", JSON.stringify(ectdata), (err) => {
    if (err) throw err;
    console.log("User data updated!");
  });
}

const messages = []
lea = messages.length;



client.on("ready", () => {
  console.log(`${client.user.username} is online!`);
  client.channels.cache
    .get("1225219212511809707")
    .send("I am awoken to this drunken world"); // bot-captures

  
});

client.on('guildMemberRemove', (user) => {
  if (user_data[user.id]) {
    ectdata[user.id] = { balance: user_data[user.id].balance, bankbalance: user_data[user.id].bankbalance }
    save2();
    delete user_data[user.id]
    save();
  }
})

client.on("messageCreate", (msg) => { // ! (random commands)
  // fucking commands

  args = msg.content.split(" ");
  args2 = msg.content.split("");
  if (!msg.author.bot) {
    messages.push(msg.content);
    if (msg.content === " " && msg.channel.id !== '1225225234165141534') {
      ws.send(
        `Message: IMAGE XOR EMPTY CONTENT, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "ERROR 1x1"`
      );
    } else if (!msg.content.startsWith("!") && msg.channel.id !== '1225225234165141534')
      ws.send(
        `Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "MESSAGE"`
      );
    else {
      /*if (msg.content.startsWith("!eval")) {
        ws.send(
          `Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`
        );
        question = [
          args[1],
          args[2],
          args[3],
          args[4],
          args[5],
          args[6],
          args[7],
          args[8],
        ].join(" ");
        msg.reply(String(eval(question))); */
      } if (msg.content.startsWith("!sqrt")) {
        ws.send(
          `Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`
        );
        msg.reply(String(Number(Math.sqrt(args[1]))));
      } else if (msg.content.startsWith("!reccomend")) {
        const ppo = msg.content.split("!reccomend");
        fs.writeFile("reccomendations.txt", ppo[1] + "\n", (err) => { 
          if (err) throw err;
          console.log("Saved!");
          ws.send(
            `Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`
          );
        });
      }
    }
    if (msg.content.startsWith("!calebrapecount")) {
      msg.reply("Caleb has raped " + data.caleb.amount + " minors");
      data.caleb.amount += 1;
      fs.writeFile("./data.json", JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log("Data updated!");
      });
      ws.send(
        `Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`
      );
    }
    else if (msg.content.startsWith('!lorem')) { 
        msg.reply('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
        ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
     }
     else if (msg.content.startsWith('!Nezuko')) {
      msg.reply('how may i assist you pookie')
      ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
     }
     else if (msg.content.startsWith('!beer')) { 
      msg.reply('*Gives you a coors* Here you go!')
      ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
     }
     else if (msg.content ===  "lmao") {
      ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
      msg.reply("HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA")
     }
     else if (msg.content === "lmaox10") {
      ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
      msg.reply("HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA")
     }
     else if (msg.content === '!pemdas') { 
      ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
      msg.reply('Parentheses, Exponent, Multiplication, Division, Addition, Subtraction')
     }
     else if (msg.content.startsWith('I need help')) {
        msg.reply('No you dont shut the fuck up!')
     }
     else if (msg.content.includes('Everett') || msg.content.toLowerCase().includes('everett')) { 
        //msg.delete()
     }
     else if (msg.content.startsWith("!userdata")) { 
      const args = msg.content.split(" ");
        if (msg.author.id === "833188958204198962") {
          user = args[1].split("<@").join("").split(">").join("");
          if (!user_data[user]) { msg.reply(`<@${user}> has no balance. So I created one for them.`); user_data[user] = {balance: 0}; ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`); save() }
          else {
            msg.reply(JSON.stringify(user_data[user]));
            ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
          }
        }
        else {
          msg.reply("You are not allowed to do that femboy!");
        }
     }
     else if (msg.content == "!calebdata") { 
      if (msg.author.id === "833188958204198962") {
          msg.reply(JSON.stringify(data.caleb));
        ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
        
      } 
      else {
        msg.reply("You are not allowed to do that femboy!");
      }
     }
     else if (msg.content === '!joke') {  
      msg.reply("Exercise? I though you said beating my kids! HAHAHAHAHAHAHAHAHAHAHAHAHAHA")
     }
     else if (msg.content.startsWith("!ping")) { 
        ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
        const args = msg.content.split(' ')
        user = args[1]
        msg.reply(`${user} hey bitch`)
     }
     else if (msg.content.startsWith('!keyboard')) { 
        msg.reply("im gonna key your board")
     }
     else if (msg.content.startsWith('!announce')) { 
      if (msg.author.id === '833188958204198962' || msg.author.id === '651957126842810401') { 
        const message = msg.content.split('!announce').join('').split('SILENT_EVERYONE').join('').split('SILENT_HERE').join('')
      var channel = '1225219855289159770'
      const isSilentEveryone = msg.content.endsWith('SILENT_EVERYONE')
      const isSilentHere = msg.content.endsWith('SILENT_HERE')
      //msg.reply(`announcing in <#${channel}>`) I just dont want to do this.
      ws.send()
      if (isSilentEveryone) { 
        client.channels.cache.get(channel).send(`${message} @everyone`)
      }
      else if (isSilentHere) {
        client.channels.cache.get(channel).send(`${message} @here`)
      }
      else {
        client.channels.cache.get(channel).send(`${message}`)
      }} else {
        msg.reply("Your not aloud to do that buddy")
      }
      
    }
  else if (msg.content.startsWith('!INFO')) { 
    const args = msg.content.split(' ')
    const user = args[1].split("<@")[1].split(">")[0];
    const userinfo = client.users.cache.get(user); // semicolon because why not???????????????????????????????????    

    ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`) 
    if (msg.author.id === '833188958204198962') { 
      msg.reply(`<@${userinfo.id}>'s info is: ID: ${userinfo.id}, NAME: ${userinfo.username}, ALL: `); // commenting on this line because why not????????????????????????????????????????????????????????
    }
    
  } else if (msg.content.startsWith('!upper')) {
    const args = msg.content.split(' ') // I dont need args but wtv
    const message = msg.content.split('!upper').join('')

    ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
    msg.reply(message.toString().toUpperCase())
  } else if (msg.content.startsWith("!lower")) {
    const args = msg.content.split(' ')
    const message = msg.content.split('!lower').join('')
    ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
    msg.reply(message.toString().toLowerCase())
  } else if (msg.content === '!version') {
    ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
    msg.reply(`v${VERSION}`)
  } else if (msg.content.startsWith('!rng')) {
    const args = msg.content.split(' ')
    const first = args[1]
    const second = args[2]
    if (!first || !second) { msg.reply("ok retard") }
    else {
      const min = parseInt(first)
      const max = parseInt(second)

            if (isNaN(min) || isNaN(max)) {
        msg.reply("Please enter a number you fucking idiot"); // adding this reply because why not??????????????????????????????????????????????????
      } else if (min > max) {
        msg.reply("no thanks.");
      } else {
        const rand = Math.floor(Math.random() * (max - min + 1)) + min;
        ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
        msg.reply(String(rand));
      }
    }
  } else if (msg.content === '!workingon') {
    msg.reply("Im currently having sex with Evan")
  } else if (msg.content.startsWith('!pfp')) {
    ws.send(`Message: ${msg.content}, Author: ${msg.author.username}, Channel: ${msg.channel.name}, Type: "COMMAND"`)
    const args = msg.content.split(' ')
    if (args[1]) {
      const recep_id = args[1].split("<@")[1].split(">")[0];
      msg.reply(client.users.cache.get(recep_id).avatarURL());
    } else {
      const recep_id = msg.author.id;
      msg.reply(msg.author.avatarURL());

    } 
  } 
  
  }

); 

client.on("messageCreate", (msg) => { // @ (coding commands)
  // fucking weird
  args = msg.content.split(" ");
  if (!msg.author.bot) {
    if (msg.content.startsWith("@")) {
      if (msg.content === "@help") {
        msg.reply(
          "Code heres. Making an interpreter in python. Current commands: print, var, help"
        );
      } else if (msg.content.startsWith("@print")) {
        message = args[3];
        ws.send(`Codeprint ${args[1]} ${msg.author.id} `); // print-rep 0 Codeprint 1 message 2 user 3
      } else if (msg.content.startsWith("@var")) {
        var_name = args[1];
        var_value = args[3];
        ws.send(`Codevar ${var_name} ${var_value} `); // var-rep 0 Codevar 1 var_name 2 var_value 3 user 4
      } else if (msg.content.startsWith("@clear")) {
        if (msg.author.id === "833188958204198962") {
          msg.reply("Cleared!");
          ws.send("clear");
        } else {
          msg.reply("You are not allowed to do that!");
        }
      } else if (msg.content.startsWith("@messageLog")) {
        if (msg.author.id === "833188958204198962") {
          if (!messages[0] || messages.toString() === "") {
            msg.reply("Empty!");
          } else {
            const processedMessages = messages.map((message) =>
              message.replace("@messageLog", "")
            );

            const joinedMessages =
              processedMessages.length > 1
                ? processedMessages.join(" | ")
                : processedMessages[0];

            msg.reply(joinedMessages);
          }
        } else {
          msg.reply("You are not allowed to do that!"); // if the user is not me
        }
      }
    }
  }
});

client.on("messageCreate", (msg) => {  // & (economy commands) [this takes up so much space omg]
  if (msg.author.bot) return;
  else {
    if (msg.content.startsWith("&")) {
      switch (msg.content) {
        case "&help": {
          msg.reply("This will be the economy side of the bot.");
          break;
        }
        case "&beg": {
          amount = Math.floor(Math.random() * 100) + 1;
          msg.reply(`You begged for ${amount} New balance is: ${user_data[msg.author.id].balance + amount}!`);

          if (!user_data[msg.author.id]) { 
            user_data[msg.author.id] = { balance: amount };
          } else {
            user_data[msg.author.id].balance += amount;
          }
          fs.writeFile("./userdata.json", JSON.stringify(user_data), (err) => {
            if (err) throw err;
            console.log("User data updated!");
          });
          break;
        }
        case "&balance": {
          if (!user_data[msg.author.id]) {  
            msg.reply(`${msg.author.username}'s balance is 0`);
          } else {
            const balance = user_data[msg.author.id].balance;
            msg.reply(`${msg.author.username}'s balance is $${balance}`);
          }
          break;
        }
        case "&bankbalance": {
          if (!user_data[msg.author.id]) { 
            msg.reply(`${msg.author.username}'s bank balance is 0`);
          } else {
            const balance = user_data[msg.author.id].bankbalance;
            msg.reply(`${msg.author.username}'s bank balance is $${balance}`);
          }
          break;
        }
        case "&ultrabeg": { // just for me and me only
          if (msg.author.id === "833188958204198962") { 
            amount = Math.floor(Math.random() * 10000) + 1;
            msg.reply(`You begged for $${amount}!`);
            user_data[msg.author.id].balance += Number(amount);
            save();
          }
          else {
            msg.reply("Shut the fuck up femboy");
          }
        }
       
      }

      if (msg.content.startsWith("&send")) {
        const args = msg.content.split(" ");
        const recep_id = args[2].split("<@")[1].split(">")[0];
        const amount = args[1];
        if (!args[0] === "&send") return
        else {

        if (!user_data[msg.author.id]) {
          msg.reply("Made a new user. New balance is 0.")
          user_data[msg.author.id] = { balance: 0 };
        }
        if (user_data[msg.author.id].balance < amount) { 
          msg.reply("You dont have that much money!");
        }
        if (!user_data[recep_id]) { 
          msg.reply("Made a new user for the recient. New balance is 0 for them.")
          user_data[recep_id] = { balance: 0 };
         }

         if (user_data[recep_id].balance && user_data[msg.author.id].balance >= amount) {
          // Convert amount to numbers
          const numericAmount = Number(amount);
          
          user_data[msg.author.id].balance -= numericAmount;
          user_data[recep_id].balance += numericAmount;
          fs.writeFile("./userdata.json", JSON.stringify(user_data), (err) => {
            if (err) throw err;
            console.log("User data updated!");
          });
          msg.reply(`You sent $${numericAmount} to <@${recep_id}>`);
        }}
        
  
      }
      else if (msg.content.startsWith("&banksend")) {
        const args = msg.content.split(" ");
        const recep_id = args[2].split("<@")[1].split('>')[0]
        const amount = parseInt(args[1])


        if (!user_data[msg.author.id]) {
          msg.reply("Made a new user. New balance is 0. And bank balance is 0")
          user_data[msg.author.id] = { balance: 0, bankbalance: 0 };
        }
        if (user_data[msg.author.id].bankbalance < amount) { 
          msg.reply("You dont have that much money!");
        }
        if (!user_data[recep_id]) { 
          msg.reply("Made a new user for the recient. New bank balance is 0 for them.")
          user_data[recep_id] = { balance: 0, bankbalance: 0 };
         }

         if (user_data[msg.author.id].bankbalance >= amount) {
          // Convert amount to numbers
          const numericAmount = Number(amount);
          
          user_data[msg.author.id].bankbalance -= numericAmount;
          user_data[recep_id].bankbalance += numericAmount;
          fs.writeFile("./userdata.json", JSON.stringify(user_data), (err) => {
            if (err) throw err;
            console.log("User data updated!");
          });
          msg.reply(`You sent $${numericAmount} to <@${recep_id}>`);
        }
        
        
      } 
      else if (msg.content.startsWith("&deposit")) {
        const args = msg.content.split(" ");
        const amount = args[1];
        if (!user_data[msg.author.id]) {
          msg.reply("Made a new user. New balance is 0.")
          user_data[msg.author.id] = { balance: 0, bankbalance: 0 };
        }
        else {
          if (amount > user_data[msg.author.id].balance) { 
            msg.reply("You dont have that much money!");
          }
          else if (amount <= user_data[msg.author.id].balance) { 
            user_data[msg.author.id].balance -= Number(amount);
            user_data[msg.author.id].bankbalance += Number(amount);
            fs.writeFile("./userdata.json", JSON.stringify(user_data), (err) => {
              if (err) throw err;
              console.log("User data updated!");
            });
            msg.reply(`You deposited $${amount} to your bank account!`);
           }
        }
      }
      else if (msg.content.startsWith("&withdraw")) { 
        const args = msg.content.split(" ");
        const amount = args[1];

        if (amount > user_data[msg.author.id].bankbalance) { 
          msg.reply("You dont have that much money in your bank!");
        }
        else if (!user_data[msg.author.id].balance) {
          msg.reply("Made a new user. New balance is 0.")  
          user_data[msg.author.id].balance = 0;
        }
        else if (amount <= user_data[msg.author.id].bankbalance) { 
          user_data[msg.author.id].balance += Number(amount);
          user_data[msg.author.id].bankbalance -= Number(amount);
          fs.writeFile("./userdata.json", JSON.stringify(user_data), (err) => {
            if (err) throw err;
            console.log("User data updated!");
          });
          msg.reply(`You withdrew $${amount} from your bank account!`);
        }
      }
      else if (msg.content === '&totalbalance') {  
        if (!user_data[msg.author.id]) { 
            user_data[msg.author.id] = { balance: 0, bankbalance: 0 }; 
        } else { 
            msg.reply(`Your total balance is $${user_data[msg.author.id].balance + user_data[msg.author.id].bankbalance}`);
        }
    } 
  
  
  }
  }
}); 


client.on("messageCreate", (msg) => { // not any commands, just random stuff
  if (msg.author.bot) return;
  else {
    if (msg.content.includes("@everyone") && !msg.author.id === "833188958204198962" || !msg.author.id == "833188958204198962") {
      msg.delete();
    }
    else if (msg.content.toLowerCase().includes('women') || msg.content.toLowerCase().includes('woman') || msg.content.toLowerCase().includes('girl') || msg.content.toLowerCase().includes('gurl') || msg.content.includes('♀') || msg.content.toLowerCase().includes('u ə w o m') || msg.content.toLowerCase().includes('mean we') || msg.content.toLowerCase().includes('we mean')) {
      if (checkforwomen) { 
        msg.delete();
        for (let i = 0; i < 100; i++) { 
        msg.author.send('no')
       }
      
      }
    }
  }
})


ws.on("open", function open() {
  console.log("Connected!");
});

ws.on("error", function error(err) {
  console.error("WebSocket error: ", err.name, " ", err.message);
});

ws.on("message", (msg) => { // handle the messages coming from python
  args = msg.toString().split(" ");
  if (msg.toString().startsWith("print-rep")) {
    args = msg.toString().split(" ");
    client.channels.cache
      .get("1225219248884945008")
      .send(`Output for <@${args[1]}>: ${args[2]} `); // this was intereseting to make, not that hard to maintain
  } else if (msg.toString().startsWith("var-rep")) {
    client.channels.cache
      .get("1225219248884945008")
      .send(`New var created: ${args[1]} = ${args[2]}`); // this took forever to make here and on the python side, but only like 1 hour
  } else {
    client.channels.cache.get("1225219212511809707").send(msg.toString());
  }
});

client.once(Events.ClientReady, c => {


  const balance = new SlashCommandBuilder()
    .setName("balance")
    .setDescription("See your balance!")
  const test = new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register yourself into the db")
  const avatar = new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("See your avatar with an embed")
  const shutup = new SlashCommandBuilder()
    .setName("shutup")
    .setDescription("Shut the fuck up please")
  

  client.application.commands.create(balance);
  client.application.commands.create(test);
  client.application.commands.create(avatar);
  client.application.commands.create(shutup);

})

client.on('interactionCreate', async interaction => {  
  // all of the handlers for the / commands
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'balance') {
    const id = interaction.user.id;
    if (!user_data[id]) {
      interaction.reply("You have 0 balance.")
      user_data[id] = { balance: 0, bankbalance: 0 };
    } else{
      interaction.reply(`Your current balance is $${user_data[id].balance}`)
    }
  } else if (interaction.commandName === 'register') {
    const firtButton = new ButtonBuilder()
     .setLabel("Click to register")
     .setStyle(ButtonStyle.Primary)
     .setCustomId('register-button')

     const secondButton = new ButtonBuilder()
     .setLabel("Click to delete account")
     .setStyle(ButtonStyle.Danger)
     .setCustomId('delete-button')

     const row = new ActionRowBuilder()
      .addComponents(firtButton, secondButton)

     const reply = await interaction.reply({content: "Choose one...", components: [row]})

     const filte = (i) => i.user.id === interaction.user.id

     const collector = reply.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter: filte,
      time: 5000
     })
     collector.on('collect', (interact) => {
      if (interact.customId === 'register-button') {
        const id = interact.user.id
        if (user_data[id]) {
          interact.reply("You already have an account, did you mean to click the delete button?")
        } else {
          user_data[id] = { balance: 0, bankbalance: 0 }
          save()
          interact.reply("Your account has been created.")
        }
      } 
      else if (interact.customId === 'delete-button') {
        const id = interact.user.id
        if (!user_data[id]) {
          interact.reply("You do not have an account, did you mean to click the register button?")
        } else {
          delete user_data[id]
          save()
          interact.reply("Your account has been deleted.")
        }
      } 
     })
  } else if (interaction.commandName === 'avatar') {
    const avatarURL = interaction.user.avatarURL()
    const embed = new EmbedBuilder()
     .setTitle(interaction.user.username)
     .setImage(avatarURL)
     .setColor("Grey")
     .setTimestamp(new Date().getTime())
    
     interaction.reply({embeds: [embed], content: `Heres your avatar, <@${interaction.user.id}>`}) // send the embed containing the avatar of the correct user that wanted their avatar to be sent to the channel that they sent it in...asdasd.asd.as[d.as[d.as[d.as[d.a[sd.a[sd.as[d.as[d.as[d.as[d.as[.d]]]]]]]]]]]
  } else if (interaction.commandName === 'shutup'){
    interaction.reply({content: "YOUUUUUU"})
  }
})

client.login(token); // last line lolololololololololololololololololol