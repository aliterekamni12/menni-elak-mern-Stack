const express = require("express");
require('dotenv').config();
const DB= require("./database").connectDB;
const authRoute = require("./routes/authRoute");
const projectRoute = require("./routes/projectRoute");
const donationRoute = require("./routes/donationRoute");

const app = express();


app.use(express.json());
DB();

app.use("/api/auth" , authRoute)
app.use("/api/Home" , projectRoute);
app.use("/api" , donationRoute)

app.listen(4000, ()=>{
    console.log("the server is listenning on port 4000")
});