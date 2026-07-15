const mongoose = require("mongoose")
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectToDB() {
   try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server Connected Successfully...!");
   }catch(err){
    console.log(err)
   }
    
}

module.exports = connectToDB