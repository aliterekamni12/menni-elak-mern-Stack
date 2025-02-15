const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser")
const DB= require("./database").connectDB;
const authRoute = require("./routes/authRoute");
const projectRoute = require("./routes/projectRoute");
const donationRoute = require("./routes/donationRoute");
const postRoute = require("./routes/postRoute");
const adminRoute = require("./routes/adminRoute")
const path = require("path")
const app = express();


var cors = require('cors');

const corsOptions = {
    origin: "https://menni-elak-mern-stack.onrender.com/",
    Credentials: true
}

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'build')));


app.disable('etag');



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
    
});

app.get('/test', (req, res) => {
    res.send('Server is running!');
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
DB();

app.use("/api/auth" , authRoute)
app.use("/api/admin" , projectRoute);
app.use("/api" , donationRoute);
app.use("/api", postRoute);
app.use("/api/admin" , adminRoute)

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`the server is listenning on port ${PORT}`)
});