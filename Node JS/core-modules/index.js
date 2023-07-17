const fs = require('fs')

//make folder
fs.mkdirSync('core-modules-Sync')

//--Write
fs.writeFileSync('bio.txt',  "This is my bio")

//--Append
fs.appendFileSync('bio.txt',  ", My name is Mohammed Imad")

//--Read data
let data = fs.readFileSync('bio.txt')
console.log(data.toString());

//--Read encoded data
let buff_data = fs.readFileSync('bio.txt')
console.log(buff_data);

//Rename
fs.renameSync('bio.txt','myBio.txt')

//Delete
// fs.unlinkSync('myBio.txt')

//Delete folder
// fs.rmdirSync('core-modules')
