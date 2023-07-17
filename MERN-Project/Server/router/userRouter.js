const express = require('express')
const bcrypt = require('bcryptjs')
const Register = require('../model/Register')
let router = express.Router();

//create user 
router.post("/users", async (req, res) => {
    try {
        const password = req.body.password
        const confirm_password = req.body.confirm_password

        if(password === confirm_password){

            var registerUser = new Register({
                fname : req.body.fname,
                lname : req.body.lname,
                mobile : req.body.mobile,
                email : req.body.email,
                password:password,
                confirm_password:confirm_password,
            })
            console.log("the success part" + registerUser);
        }else{
            res.status(400).send({msg:"Passwords are not matching"})
        }
/* 
        //hashing password
        const hashPassword = await bcrypt.hash(password,10) */

        const token = await registerUser.generateAuthToken()
        console.log("the token part "  + token);

        const createUser = await registerUser.save()
        res.status(201).send({msg:"User created successful..!", createdUser:createUser })
    } catch (e) {
        res.status(400).send(e)
    }
})

//get all users
router.get("/users", async (req, res) => {
    try {
        const usersData = await Register.find()
        res.status(200).send(usersData)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get single user
router.get("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const userData = await Register.findById(_id)
        if (!userData) {
            res.status(404).send({msg:"No User found for the given ID"})
        } else {
            res.status(200).send(userData)
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

//update user data
router.patch("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const updateUser = await Register.findByIdAndUpdate(_id, req.body, { new: true })
        res.status(201).send({msg:"User data updated successfully...!", updateUser:updateUser })
    } catch (e) {
        res.status(404).send({msg:"No User found with this ID"})
    }
})

//Delete user
router.delete("/users/:id", async (req, res)=>{
    try{
        const deleteUser = await Register.findByIdAndDelete(req.params.id)
            res.send({msg:"User deleted successfully...!", deletedUser:deleteUser})
    }catch(e){
        res.status(404).send({msg:"No user found with this ID"})
    }
})

//user login
router.post("/login", async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const loginUser = await Register.findOne({email:email})

        const isMatch = await bcrypt.compare(password,loginUser.password)

        const token = await loginUser.generateAuthToken()
        console.log("the token part "  + token);

        if(isMatch){
            res.send("Login success...!")
        }else{
            res.send("InValid Password...!")
        }

    }catch(e){
res.status(400).send("InValid login credentials...!")
    }
})


module.exports = router