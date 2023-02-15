const express = require("express")
const router = express.Router();
const userInfo = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//TESTING REQUEST
router.get("/v4/login", (req, res) => {
    res.send("login Route working!!")
})


//NEW USER
router.post("/api/v4/login", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //TO CHECK USERS EXISTANCE
        const userData = await userInfo.find({ email });
        if (!userData[0]) {
            return res.status(400).json({
                message: "User not exist"
            })
        }
        //HASHED PASSWORD COMPARE
        bcrypt.compare(password, userData[0].password, async function (err, result) {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    message: err
                })
            }
            //SUCESSFULLY LOGIN
            if (result) {
                const Token = await jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: userData[0].id
                }, process.env.SECRET_KEY)
                return res.status(200).json({
                    message: "successfully login",
                    username: userData[0].username,
                    Token
                })
            }
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

})

module.exports = router;