const { Client, IntentsBitField, EmbedBuilder, Events, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const WebSocket = require("ws");
const fs = require("fs");

const token = "YOUR_TOKEN_HERE"
// const ws = new WebSocket("ws://127.0.0.1:8765");

// const data = JSON.parse(fs.readFileSync("./data.json", "utf8")); no :-)
// const user_data = JSON.parse(fs.readFileSync("./userdata.json", "utf8")); no :-)
// const ectdata = JSON.parse(fs.readFileSync('./ectstorage.json', "utf8")); no :-)



const VERSION = '0.0.1'

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

client.login(token)