require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('./db/myconn')
const userRouter = require('./router/userRouter')

const app = express()
let port=process.env.PORT || 7000

app.use(express.json()) //to read form data
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.get('/',(request,response)=>{
   response.send('<h1>Server is running successfully</h1>')
})

app.use(userRouter)

/* //Authentication JWt
const createToken = async()=>{
   const token = await jwt.sign({_id:"64b4e367e022a752638e2dc5"},"mynameismohammedimadthisisjsonwebtokenauth",{expiresIn:"1 minute"})
   console.log(token);

   const verifyUser = await jwt.verify(token,"mynameismohammedimadthisisjsonwebtokenauth")
   console.log(verifyUser);
}
createToken() */


app.listen(port,(err)=>{
    if(err)throw err
   console.log(`Server is listening to http://localhost:${port}`);
})