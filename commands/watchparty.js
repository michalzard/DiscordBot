const fetch = require("node-fetch");
require("dotenv").config();

module.exports={
    name:"watchparty",
    desc:"returns dynamically created Watch2Gether link for specific link",
    adminOnly:false,

    execute(message,args){
    try{
    if(args.length==1){
    this.handlePOSTrequest(args).then(data=>message.channel.send(data));
    }else{
        message.channel.send("YT link is missing!");
    }
    

    } catch(error){
        console.error(error);
    }
    },
    handlePOSTrequest(args){
    return fetch("https://w2g.tv/rooms/create.json",{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "w2g_api_key": `${process.env.WATCHTOGETHER_TOKEN}`,
        "share": `${args[0]}`,
        "bg_color": "#d4af37",
        "bg_opacity": "100"
    })

    }).then(res=>res.json()).
    then(data=>{return `https://w2g.tv/rooms/"${data.streamkey}?lang=cs`})
    }
}