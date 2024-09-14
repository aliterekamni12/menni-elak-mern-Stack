const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser")
const DB= require("./database").connectDB;
const authRoute = require("./routes/authRoute");
const projectRoute = require("./routes/projectRoute");
const donationRoute = require("./routes/donationRoute");
const postRoute = require("./routes/postRoute");
const adminRoute = require("./routes/adminRoute")

const app = express();

var cors = require('cors')

app.use(cors())


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
DB();

app.use("/api/auth" , authRoute)
app.use("/api/admin" , projectRoute);
app.use("/api" , donationRoute);
app.use("/api", postRoute);
app.use("/api/admin" , adminRoute)


app.listen(4000, ()=>{
    console.log("the server is listenning on port 4000")
});