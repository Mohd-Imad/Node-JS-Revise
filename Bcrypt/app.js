const express = require('express')
const bcrypt = require('bcryptjs')
const app = express()

const port = 8000

const securePassword = async (password)=>{
    //hashing password
    const hashPassword = await bcrypt.hash(password, 10)
    console.log(hashPassword);

    //comparing password for login
    const matchPassword = await bcrypt.compare("imad@123",hashPassword)
    console.log(matchPassword);

}

securePassword("imad@123")


app.listen(port, ()=>{
    console.log(`App listening to the port:${port}`);
})