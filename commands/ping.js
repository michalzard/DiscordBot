const {MessageEmbed} = require("discord.js");
module.exports={
    name:"ping",
    desc:"returns latency of the bot",
    adminOnly:false,

    execute(message,args){
    try{
    if(args.length==0){
    const embed=new MessageEmbed()
    .setDescription(`Latency is ${message.createdTimestamp-Date.now()}ms.`)
    .setColor("GOLD")
        
    message.channel.send(embed);
    }
    } catch(error){
        console.error(error);
    }
    
    }
}