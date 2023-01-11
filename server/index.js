const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authoRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/post.jsx");
const multer = require("multer");
var cors = require('cors')
app.use(cors())
dotenv.config();
app.use(express.json());


const connectionString = process.env.MONGODB_URL;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDb"))
  .catch((err) => console.log(err));

app.use("/api/auth", authoRoute);
app.use("/api/users", usersRoute);
app.use("/api/post", postRoute);
app.use('/images', express.static('Food_Images'));

//--------------------------------------------------------------------------------------------------------------------------


//server liten on port 3001
app.listen(3001, () => {
  console.log("server runing on port 3001");
});
