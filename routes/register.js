const express = require("express")
const router = express.Router();
const userInfo = require("../models/user-model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { body, validationResult } = require('express-validator');
const { userSignupValidation } = require("../config/utility")


//TESTING REQUEST
router.get("/v4/signup", (req, res) => {
    res.send("signup Route working!!")
})


//NEW USER
router.post("/api/v4/signup",
    userSignupValidation,
    async (req, res) => {

        //DESTRUCTURING OF REQ. BODY
        const { username, email, password } = req.body;
        try {
            //TO CHECK USERS EXISTANCE
            const isUserExist = await userInfo.find({ email });
            if (isUserExist[0].email) {
                return res.status(400).json({
                    message: "User already exist"
                })
            }
            //HASHING THE PASSWORD
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) {
                    return res.status(400).json({
                        message: err.message
                    })
                }
                //USER REGISTERED
                const userData = await userInfo.create({
                    username,
                    email,
                    password: hash
                })
                return res.status(200).json({
                    message: "sucess",
                    userData
                })
            })
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }

    })

module.exports = router;