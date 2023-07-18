require('dotenv').config()
const express = require('express')
const cors = require('cors')
const auth = require('./middleware/auth')
const cookieParser = require('cookie-parser')
require('./db/myconn')
const userRouter = require('./router/userRouter')

const app = express()
let port=process.env.PORT || 7000

app.use(express.json()) //to read form data
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.get('/',(req,res)=>{
   res.send('<h1>Server is running successfully</h1>')
})

app.get('/secret',auth,(req,res)=>{
   console.log(req.cookies.newCookie);
   res.send(`This is a cookie: ${req.cookies.newCookie}`) //to get cookie
})

app.get('/logout',auth,async (req,res)=>{
   try{

      //to logout from current device
      req.user.tokens = req.user.tokens.filter((currentDev)=>{
         return currentDev.token !== req.token
      })

      //to logout from all devices
      // req.user.tokens = []

      res.clearCookie("newCookie")
      console.log("Logout successful...!");

      await req.user.save()
      res.send("Cookie deleted")
   }catch(err){
      res.status(500).send(err)
   }
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