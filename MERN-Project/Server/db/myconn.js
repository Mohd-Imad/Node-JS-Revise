const mongoose = require('mongoose')

mongoose.set({strictQuery:false})
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`,{useNewURLParser:true, useUnifiedTopology:true})

.then(()=>{
    console.log("Mongo DB connection successful....!");
}).catch((err)=>{
    console.log("Mongo DB connection failed...!");
})