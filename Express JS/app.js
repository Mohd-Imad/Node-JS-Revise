//Basic Express server with Routing

const express = require('express')

let app = express();

app.get('/', (req, resp) => {
    resp.send([
        {
            id: 1,
            name: "Imad"
        },{
            id: 1,
            name: "Imad"
        },
        {
            id: 1,
            name: "Imad"
        }
    ])
})
app.get('/about', (req, resp) => {
    resp.send('<h1>This is AboutUs page</h1>')
})
app.get('/Contact', (req, resp) => {
    resp.send('<h1>This is ContactUs page</h1>')
})


app.listen(8000, () => {
    console.log('Server listening to port 8000');
})