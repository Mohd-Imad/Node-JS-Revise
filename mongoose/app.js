const mongoose = require('mongoose')

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
    },
    type: String,
    videos: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

//model 
const Playlist = new mongoose.model("Playlist", playlistSchema)

//creating and saving multiple docs
const createDocuments = async () => {
    try {
        const jsPlaylist = new Playlist({
            name: "javaScript",
            type: "FrontEnd",
            videos: 120,
            active: true
        })

        const mongoPlaylist = new Playlist({
            name: "MongoDB",
            type: "Database",
            videos: 25,
            active: true
        })

        const expressPlaylist = new Playlist({
            name: "Express JS",
            type: "BackEnd",
            videos: 10,
            active: true
        })

        const saveDocuments = await Playlist.insertMany([jsPlaylist, mongoPlaylist, expressPlaylist])
        console.log(saveDocuments);
    }
    catch (err) {
        console.log(err);
    }
}

createDocuments();

//get all docs
const getDocuments = async () => {
    try {
        // const result = await Playlist.find()
        // const result = await Playlist.find({videos: {$gte:50}}).select({name:1})
        // const result = await Playlist.find({type: {$in:['BackEnd','Database']}}).select({name:1})
        // const result = await Playlist.find({ $or: [{ type: "FrontEnd"}, {author: 'TT'}] }).select({ name: 1 })
        // const result = await Playlist.find({type: {$in:['BackEnd','Database']}}).select({name:1}).countDocuments()
        const result = await Playlist.find().select({name:1}).sort({name:1})

        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

// getDocuments() 

//update docs
const updateDocs = async(_id)=>{
    try{
        const result = await Playlist.findByIdAndUpdate({_id},
            {$set : {name : "JavaScript"}}, {new : true}) 
            console.log(result);
    }catch(err){
        console.log(err);
    }
}

// updateDocs("64afcc3bf62d2c27de5c6cf8")

//Delete Docs
const deleteDocs = async (_id)=>{
    try{
        const result = await Playlist.findByIdAndDelete({_id})
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

// deleteDocs("64aff3161e14df7ac9a17037")