module.exports={
    name:"shut",
    desc:"returns video to @user tellig them to shut up",
    adminOnly:false,

    execute(message,args){
    try{
    message.channel.send(`${args[0]} https://youtu.be/IE0EnGifEI4`);  

    } catch(error){
        console.error(error);
    }
    
    }
}