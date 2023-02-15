const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const fileupload = require("express-fileupload")
const conn = require("../config/connection");
conn();
const PORT = 8080 || process.env.PORT

//AL ROUTES 
const registerRouter = require("../routes/register")
const loginRouter = require("../routes/login");




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload())

//TESTING ROUTE
app.get("/", (req, res) => {
    res.send(" APP WORKING")
})


app.use("/", registerRouter);
app.use("/", loginRouter)
app.listen(PORT, () => { console.log(`server started at ${PORT}`) })