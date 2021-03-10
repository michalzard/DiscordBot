const {MessageEmbed} = require("discord.js");
const fs=require("fs");
const commandFiles=fs.readdirSync("./commands")
const commands=new Map();

for(let i=0;i<commandFiles.length;i++){
    const cmd=require(`./${commandFiles[i]}`);
    commands.set(cmd.name,cmd);
}

module.exports={
    name:"help",
    desc:"returns list of commans available",
    adminOnly:false,
    execute(message,args){
    try{
    let formattedCmds=[];
    for(let i=0;i<commands.size;i++){  
    if(commands.get(commandFiles[i].replace(".js",""))!==undefined){
    formattedCmds.push(
    {name:commands.get(commandFiles[i].replace(".js","")).name,
     desc:commands.get(commandFiles[i].replace(".js","")).desc,
    });
    }
    }

    const embed=new MessageEmbed()
    .setColor("GOLD").setTitle("Available Commands")
    //.addField(names)
    for(let index in formattedCmds){
    if(formattedCmds[index]!==undefined) embed.addField(`${formattedCmds[index].name}`,`${formattedCmds[index].desc}`)
    }

    message.channel.send(embed);
    } catch(error){
        console.error(error);
    }
    
    }
}