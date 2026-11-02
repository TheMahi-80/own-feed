//for database connection

const mongoose = require("mongoose")

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Successfully connected to DB ✅")
}

module.exports = connectDB