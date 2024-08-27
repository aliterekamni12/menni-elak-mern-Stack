const mongoose = require("mongoose");
require("dotenv").config();


module.exports.connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected")
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}