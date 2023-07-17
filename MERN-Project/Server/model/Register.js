const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let registerSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
    minlength: 3,
    uppercase: true
  },
  lname: {
    type: String,
    uppercase: true
  },
  mobile: {
    type: Number,
    required: true,
    minlength: [10, "Invalid mobile number"],
    maxlength: [10, "Invalid mobile number"],
    unique: [true, "Mobile number already exists...!"]
  },
  email: {
    type: String,
    required: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error("InValid email...!")
      }
    },
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password should be min 6 chars"],
  },
  confirm_password: {
    type: String,
    required: true,
  },
  tokens : [{
    token : {
      type: String,
      required: true
    }
  }]
});

//creating token
registerSchema.methods.generateAuthToken = async function(){
  try{
    const createToken = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({token:createToken})
    console.log(createToken);
    await this.save()
    return createToken
  }catch(e){
    console.log("The error part" + e);
  }
}

//middleware function -- using to hash password, this executes before saving doc
registerSchema.pre("save", async function(next){
    if(this.isModified("password")){
        // console.log(`User entered password is :${this.password}`);
        this.password = await bcrypt.hash(this.password,10)
        // console.log(`User hashed password is :${this.password}`);
        this.confirm_password = await bcrypt.hash(this.password,10)
    }
    next()
})

let Register = mongoose.model("Register", registerSchema);
 
module.exports = Register
