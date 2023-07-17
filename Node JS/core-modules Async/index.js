const fs = require('fs')

//--Write
fs.writeFile('bio.txt',  "This is my bio", (err)=>{
    console.log('Success..!');
})

//--Append
fs.appendFile('bio.txt',  ", My name is Mohammed Imad", (err)=>{
    console.log('Success..!');
})

//--Read data
fs.readFile('bio.txt','UTF-8', (err,data)=>{
    console.log(data);
})

//--Read encoded data
fs.readFile('bio.txt', (err,data)=>{
    console.log(data);
})

//Rename
fs.rename('bio.txt','myBio.txt', (err)=>{
    console.log('Success..!');
})

//Delete
/*  fs.unlink('myBio.txt', (err)=>{
    console.log('Deleted');
}) */

