require("dotenv").config();
const Discord = require("discord.js");
const client = require("../bot.js");
const con = require("../database/connection");
const emojis = require("../utils/emojis.js");
const { glob } = require("glob");
const { promisify } = require("util");
const badwords = require("../utils/badwords")

client.on("guildMemberUpdate", async (oldmember, member) => {
    
    if(member.guild.id !== process.env.ServerID) return;
    if(member.pending) return;
    const guild = client.guilds.cache.find(guild => guild.id === process.env.ServerID); // Sebis Townhall
    const role = guild.roles.cache.find(role => role.id === process.env.MemberRole); // Role Member
    const logging = await guild.channels.cache.find(ch => ch.id === process.env.LoggingChannel) // Logging Channel
    member.roles.add(role).then(logging.send(`Gave **${role.name}** to **${member.user.username}** (ID: ${member.user.id})`)).catch((err) => {logging.send(`:warning: Unable to give **${role.name}** to ${member.user.username} (ID: ${member.user.id})`)});

})