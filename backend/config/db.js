const mongoose = require("mongoose");

const connectDb =()=>{
     mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((data)=>console.log(`Mongodb is connected with Server :${data.connection.host}`)
)
}

module.exports = connectDb;