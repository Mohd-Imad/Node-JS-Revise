const express = require('express')
require("../db/conn")
const studentRouter = require('../routers/studentRouter')

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(studentRouter)


app.listen(port, () => {
    console.log(`Server listening to the port:${port}`);
})