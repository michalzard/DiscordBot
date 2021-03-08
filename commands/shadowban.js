const {MessageEmbed,RoleManager} = require("discord.js");
module.exports={
    name:"shadowban",
    desc:"shadowbans user on the server,user is unable to chat/join voice",
    adminOnly:true,

    execute(message,args){
    try{
    if(args.length>=1){
    const roleName="shadowbanned"
    const role=message.guild.roles.cache.find(role=>role.name===roleName);
    if(role===undefined){
    this.createShadowBanRole(message);
    message.channel.send("`'shadowbanned' role created`,please repeat command to assign in to user");
    }else  {
    const shadowBanID=args[0].replace("<@!","").replace(">","")
    const diffroles= message.guild.member(`${shadowBanID}`).roles.cache.filter(role=>role.name!==roleName);  
    if(args.length==2 && args[1]>0){
    //removes all roles from member
    message.guild.member(`${shadowBanID}`).roles.remove(diffroles)
    .then(()=>{
    //adds shadowbanned role so user is restricted from typing/joining voicechats
    message.guild.member(`${shadowBanID}`).roles.add(role);
    });
    setTimeout(()=>{message.guild.member(`${shadowBanID}`).roles.add(diffroles)},args[1] *60000);}
    else{
    const embed=new MessageEmbed()
    .setColor("GOLD").setTitle("Unexpected Value").setDescription("Expected value : 1 or above , cannot shadowban user for 0 minutes!")
    .setFooter(`${new Date(message.createdTimestamp).toLocaleTimeString("en-us")}`);
    message.reply(embed);
    }}
    }else{
    const embed=new MessageEmbed()
    .setColor("GOLD").setTitle("Unexpected Format").setDescription("Expected format : shadowban @user  or shadowban @user minutes")
    .setFooter(`${new Date(message.createdTimestamp).toLocaleTimeString("en-us")}`);
    message.reply(embed);

    }
    }catch(error){console.error(error);}    
    },
    createShadowBanRole(message){
    try{
    const roleName="shadowbanned";
    const role=message.guild.roles.cache.find(role=>role.name===roleName);
    if(role===undefined || role.name!==roleName){
        new RoleManager(message.guild).create({data:{hoist:true,name:roleName,color:"RED",permissions:["VIEW_CHANNEL"]}}) 
    }
    } catch(error){console.log(error);}
}
}