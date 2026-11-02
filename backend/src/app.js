const express = require("express");
const multer = require("multer");
const { uploadImage } = require("./services/storage.service.js");
const postModel = require("./models/post.model.js")

const app = express()
app.use(express.json());


const upload=multer({storage:multer.memoryStorage()})

// const upload=multer({storage:multer.memoryStorage()})

//routes

// app.post("/create-post",upload.single("image"),async(req,res)=>{
    

// })

//post req route
app.post("/create-post",upload.single("image"),async(req,res)=>{
    const result = await uploadImage(req.file.buffer)

    const post = await postModel.create({
        image : result.secure_url,
        caption : req.body.caption
    })
    return res.status(200).json({
        message: "photo and caption posted successfully ✅",
        post
    })
})

app.get("/posts",async(req,res)=>{
    const post = await postModel.find()

    res.status(200).json({
        message : "successfully data fetched 📌",
        post
    })
})

app.delete("/posts/:id",async(req,res)=>{
    const id = req.params.id

    await postModel.findOneAndDelete({
        _id : id
    })

    res.status(200).json({
        message : "note deleted successfully 🚮"
    })
})

app.patch("/posts/:id",async(req,res)=>{
    const id = req.params.id
    const caption = req.body.caption

    await postModel.findOneAndUpdate({
        _id:id
    },{
        caption  : caption 
    })

    res.status(200).json({
        message : "caption successfully updated ✅"
    })
})


module.exports= app