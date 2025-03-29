const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const app = express();
app.use(express.json()); 
app.use(cors());


app.use("/routes/auth", authRoutes);
const MONGODB_URI = 'mongodb+srv://1kvats9:kunal19@xblog.tntxe7o.mongodb.net/?retryWrites=true&w=majority&appName=xblog'
const JWT_SECRET = 'kunalisgood'


//Connecting to mongodb uri
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/routes/auth", authRoutes);
app.get("/",(req,res)=>{
    res.send("Running the server")
})

//running the server on port 3000

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
