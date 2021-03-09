const Filter=require("bad-words");
const list=require("badwords-list");
const filter=new Filter();
filter.addWords(...list.array);

module.exports={
    name:"filter",
    desc:"enables profanity filter",
    adminOnly:true,
    isEnabled:true,
    
    execute(message,args){
    try{
    if(message)this.isEnabled=!this.isEnabled;
    
    if(this.isEnabled)message.reply("Filter is `enabled`");
    else message.reply("Filter is `disabled`");

    } catch(error){
        console.error(error);
    }
    
    },
    filterInput(message){
    if(filter.isProfane(message.content)) message.delete();
    }
}