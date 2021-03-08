const {MessageEmbed} = require("discord.js");
module.exports={
    name:"ban",
    desc:"bans user from the server",
    adminOnly:true,

    execute(message,args){
        try{
           if(args.length==2){
                const banId=args[0].replace("<@!","").replace(">","")
                const embed=new MessageEmbed()
                .setTitle("Member Banned")
                .setDescription(`${args[0]} was banned for ${args[1]} days`)
                .setFooter(`${new Date(message.createdTimestamp).toLocaleTimeString("en-us")}`)
                .setColor("GOLD")
                message.guild.member(`${banId}`).ban({days:args[1],reason:args[2]});
                message.channel.send(embed);
                }else if(args.length==1){
                    const banId=args[0].replace("<@!","").replace(">","")
                    const embed=new MessageEmbed()
                    .setTitle("Member Banned")
                    .setDescription(`${args[0]} was banned for ${args[1]} days`)
                    .setFooter(`${new Date(message.createdTimestamp).toLocaleTimeString("en-us")}`)
                    .setColor("GOLD")
                    
                    message.guild.member(`${banId}`).ban({days:args[1]});
                    message.channel.send(embed);    
                }
                else message.reply("Expected format : <ban @user days> or <ban @user days reason>");
        } catch(error){
            console.error(error);
        }    
    }
}