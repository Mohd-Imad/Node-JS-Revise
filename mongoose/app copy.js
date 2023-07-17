const mongoose = require('mongoose')
const validator = require('validator')

//mongo DB connection
mongoose.connect("mongodb://127.0.0.1:27017/mydb", { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection Successful...!");
    })
    .catch((err) => {
        console.log(err);
    })

//Schema
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        //builtin validations
        lowercase: true,
        trim: true,
        minlength: [2, "name should be atleast of 2 letters"],
        maxlength: 20
    },
    type: {
        type: String,
        enum: ["FrontEnd", "BackEnd", "Database"]
    },
    videos: {
        type: Number,
        //custom validation method1
        validate(value) {
            if (value < 0) {
                throw new Error("videos count shouldn't be in negative")
            }
        }
        //custom validation method2
        /*  validate: {
             // validator: (val) => val.length < 0,
             validator: function (val) {
                 return val.length < 0
             }, 
             message: "videos count shouldn't be in negative"
         } */
    },
    author: String,
    email: {
        type: String,
        required: true,
        unique: true,
        //npm validation
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("email is inValid..!")
            }
        }
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

//model 
const Playlist = new mongoose.model("Playlist", playlistSchema)

//creating and saving single doc
const createDocument = async () => {
    try {
        const mongoosePlaylist = new Playlist({
            name: "     Mongoo3",
            type: "BackEnd",
            videos: 12,
            author: "TT",
            email: "tt@utube.com",
            active: true
        })

        const saveDocument = await mongoosePlaylist.save()
        console.log(saveDocument);
    }
    catch (err) {
        console.log(err);
    }
}

createDocument();

//get single doc
const getDocument = async () => {
    try {
        const result = await Playlist.find({ type: "FrontEnd" }).select({ name: 1 }).limit(1)
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

// getDocument()