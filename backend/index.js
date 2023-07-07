const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const catRoute = require("./routes/category");
const userDetailRoute = require("./util/getUser")
const multer = require("multer")
const session = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Images'); 
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
      }
})
const upload = multer({storage: storage});

app.post("/blog/upload", upload.single("IMG"), (req, res) => {
    res.stblog/(200).json("Image has been uploaded");
})

app.use("/blog/auth", authRoute) 
app.use("/blog/user", userRoute) 
app.use("/blog/posts", postsRoute) 
app.use("/blog/category", catRoute) 
app.use("/blog/api", userDetailRoute) 

app.use(cookieParser());
app.use(session({
  secret: process.env.TOKEN_KEY,
  resave: false,
  saveUninitialized: false,
}));

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);


app.listen("8000", () => {
    console.log("Server is running");
})