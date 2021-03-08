const Discord=require("discord.js");
const client=new Discord.Client();
require("dotenv").config();
const fs=require("fs");
const commandFiles=fs.readdirSync("./commands")

client.commands=new Discord.Collection(); //holds array with all commandsd

//Loads in all commands into collection
for(let i=0;i<commandFiles.length;i++){
    const cmd=require(`./commands/${commandFiles[i]}`);
    client.commands.set(cmd.name,cmd);
}

client.on("ready",()=>{
    console.log(`Logged in as ${client.user.tag}`)
})

client.login(process.env.BOT_TOKEN);


client.on("message",message=>{
if(message.author.bot) return;

if(message.content.startsWith(process.env.BOT_PREFIX)){
const [command,...args]=message.content
.trim().substring(process.env.BOT_PREFIX.length).split(/\s+/);

//handles all the client commands loaded with fs.readdirSync
commandHandler(command,message,args);

}
})



function commandHandler(commandName,message,args){
    if(client.commands.get(commandName)==null) return;
    if(client.commands.get(commandName).adminOnly){
    if(message.member.hasPermission("ADMINISTRATOR"))
    client.commands.get(commandName).execute(message,args);
    else message.reply("Insufficient permissions");
    } 
    else client.commands.get(commandName).execute(message,args);
}

//message.member.hasPermission -> check perms of people