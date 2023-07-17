const mongoose = require('mongoose')
const validator = require('validator')

const studentSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        minlength:3,
        uppercase:true
    },
    email : {
        type:String,
        required:true,
        unique:[true, "Email already exists...!"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid Email...!")
            }
        }
    },
    mobile : {
        type:Number,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    address : {
        type:String,
        required:true
    }
})

//create collection
const Student = new mongoose.model('Student', studentSchema)

module.exports = Student