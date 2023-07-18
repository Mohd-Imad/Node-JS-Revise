const jwt = require('jsonwebtoken')
const Register = require('../model/Register')

const auth = async (req, res, next) => {
    try {
        const token = await req.cookies.newCookie;
        const verifyUser = await jwt.verify(token, process.env.SECRET_KEY)
        console.log(verifyUser);

        const user = await Register.findOne({_id:verifyUser._id})
        console.log(user);

        req.token = token;
        req.user = user;

        next()
    } catch (error) {
        res.status(401).send(error)
    }
}

module.exports = auth;