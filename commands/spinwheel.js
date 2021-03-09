module.exports={
    name:"spinwheel",
    desc:"spinwheel selected from users that reacted",
    adminOnly:false,

    execute(message,args){
    try{
    message.channel.send("https://64.media.tumblr.com/tumblr_m66px0Kj9B1r0bs4no1_500.gif");
    }
    catch(error){
        console.error(error);
    }
    
    }
}