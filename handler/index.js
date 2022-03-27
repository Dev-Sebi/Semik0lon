require("dotenv").config();
const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */

 module.exports = async (client) => {

    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));
    const ApplicationCommands = await globPromise(`${process.cwd()}/ApplicationCommands/*/*/*.js`);

    const ArrayOfApplicationCommands = [];
    ApplicationCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.ArrayOfApplicationCommands.set(file.name, file);
        ArrayOfApplicationCommands.push(file);
    });


    client.on("ready", async (client) => {
        const UpdateChannel = await client.channels.cache.find(ch => ch.id === process.env.MemberUpdatesChannel)
        const guild = client.guilds.cache.get(process.env.ServerID);
        const MemberCount = guild.memberCount
        const UpdateString = `Members: ${MemberCount} ♡`

        console.log(`Logged in as ${client.user.tag}!`);
        console.log(`Currently in ${client.guilds.cache.size} ${client.guilds.cache.size == 1 ? "Server" : "Servers"}`);
        await client.guilds.cache.get(process.env.ServerID).commands.set(ArrayOfApplicationCommands); // if you want to update only one guild (instant update)
        console.log("Commands Loaded!")
        client.user.setActivity("semik0lon", { type: "WATCHING" });

        UpdateChannel.setName(UpdateString)
        setInterval(() => {
            UpdateChannel.setName(UpdateString)
        }, 60000 * 5); // All 5 Minutes
    });
};
