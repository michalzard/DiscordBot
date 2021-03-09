module.exports={
    name:"invite",
    desc:"creates invite link to guild",
    adminOnly:false,

    async execute(message,args){
    try{
    await message.channel.createInvite(
        {
            maxAge: 60000,//hour by default
            maxUses:100,
            unique:true,
        },
    ).then(invite=>{
    message.channel.send(`www.discord.com/invite/${invite.code}`)
    setTimeout(()=>message.delete(),1000);
    });
    
    } catch(error){
        console.error(error);
    }
    
    }
}