const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/students-api", {
    useNewURLParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log("mongo DB connection successful...!");
}).catch((e)=>{
    console.log("mongo DB connection error");
})

