const {MessageEmbed} = require("discord.js");

module.exports={
    name:"chatclear",
    desc:"deletes bulk of messages from chat",
    adminOnly:true,
    waitTime:20,//in seconds
    countdownIndex:5,//in seconds
    clearMsgsAfter:5,//in seconds

    execute(message,args){
        try{
        const embed=new MessageEmbed()
        .setTitle("Invalid Amount")
        .setDescription(`Invalid Amount, chatclear is limited to 100 messages per clear`)
        .setFooter(`${new Date(message.createdTimestamp).toLocaleTimeString("en-us")}`)
        .setColor("GOLD")

        const reactionFilter = (reaction,user)=>{
            return reaction.emoji.name == "✅" || reaction.emoji.name == "❌" && user.id===message.author.id ;
        } 
        if(args.length==1 && args[0]>0 && args[0]<=100){
        message.channel.bulkDelete(args[0]);//limited to 100
        }
        else if(args.length==0){
        message.reply("Do you want to `Nuke` this channel ? Respond with `✅` or `❌` to proceed ")
        .then(message=>{message.react("✅");message.react("❌");
            
        message.awaitReactions(reactionFilter,{max:2,time:this.waitTime*1000,errors:["time"]})
        .then(collected=>{ 
        if(collected.get("✅").count==2) {
        message.reply("`"+"Nuking channel : "+`${message.channel.name}`+"`");
        let countdown=setInterval(()=>{
        if(this.countdownIndex>0) message.channel.send(this.countdownIndex);
        if(this.countdownIndex==1) message.channel.send("💥");
        if(this.countdownIndex<=0){clearInterval(countdown);
        let nuke=setInterval( ()=>{
        let fetched=message.channel.messages.fetch({limit:100});
        fetched.then(msg=>{if(msg.size>=2) message.channel.bulkDelete(msg.size)});
        if(this.countdownIndex<=0){clearInterval(nuke);setTimeout(()=>message.channel.send("*Chat was cleared*"),500)}},1000);
        }
        this.countdownIndex--;
        },1000);
        
        }else if(collected.get("❌").count==2) {
        message.channel.send("`Aborting nuke command`");
        message.delete({timeout:this.clearMsgsAfter*1000});
        }
        else return;
        }).catch(err=>console.log(err));
        
        }).catch(err=>console.error("One of the reactions failed to load/react",err));
        }
        else {
            message.reply(embed);
        }
        }catch(error){
            console.error(error);
        }    
    }
}