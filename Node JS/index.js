//Basic Server Creation

const http = require('http')

http.createServer((req,resp)=>{
    resp.write("<h1>Hello, welcome to Node JS</h1>")
    resp.end()
}).listen(5500)
