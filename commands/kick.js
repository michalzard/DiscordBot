const {MessageEmbed} =require("discord.js");

module.exports={
    name:"kick",
    desc:"kicks out user from the server on <@user reason>",
    adminOnly:true,
    execute(message,args){
    try{
        if(args.length==2){
            const kickId=args[0].replace("<@!","").replace(">","")
            const embed=new MessageEmbed()
            .setTitle("Member Kicked")
            .setDescription(`${args[0]} was kicked | reason: ${args[1]}`)
            .setFooter(`${new Date(message.createdTimestamp).toLocaleTimeString("en-us")}`)
            .setColor("GOLD")
        
            message.guild.member(`${kickId}`).kick(args[1]);
            message.channel.send(embed);
            
            }else if(args.length==1){
            const kickId=args[0].replace("<@!","").replace(">","")
            const embed=new MessageEmbed()
            .setTitle("Member Kicked")
            .setDescription(`${args[0]} was kicked`)
            .setFooter(`${new Date(message.createdTimestamp).toLocaleTimeString("en-us")}`)
            .setColor("GOLD")
            message.guild.member(`${kickId}`).kick(args[1]);
            message.channel.send(embed);
            }
            else message.reply("Expected format : <kick @user> or <kick @user reason>");
    } catch(error){
        console.error(error);
    }
    

    }
}