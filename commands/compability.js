const { MessageEmbed } = require("discord.js");

module.exports={
    name:"compatibility",
    desc:"spinwheel selected from users that reacted",
    adminOnly:false,

    execute(message,args){
    try{
    if(args.length==2){
    const rnd=Math.round(Math.random()*100)+1;
    const embed=new MessageEmbed()
    .setColor(`${rnd>60 ? "RED" : "DARK_RED"}`).setTitle("Compatibility")
    .setDescription(`${args[0]} and ${args[1]} are ${rnd} % compatible`)
    message.reply(embed);

    }else{
    const embed=new MessageEmbed()
    .setColor("GOLD").setTitle("Invalid Format").setDescription("Expected format : compatibility @user1 @user2")
    message.reply(embed);
 
    }
    }
    catch(error){
        console.error(error);
    }
    
    }
}