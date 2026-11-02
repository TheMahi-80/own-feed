const express = require("express");
const multer = require("multer");

const app = express()
app.use(express.json());


const upload=multer({storage:multer.memoryStorage()})

// const upload=multer({storage:multer.memoryStorage()})

//routes

// app.post("/create-post",upload.single("image"),async(req,res)=>{
    

// })

//post req route
app.post("/create-post",upload.single("image"),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
})


module.exports= app