const express = require('express');
const router = express.Router();
const userModel = require('./../models/user.model')
const { comparePassword, hashPassword } = require("../helpers/auth.helper");
const JWT = require("jsonwebtoken");
const {genrateToken} = require("../utils/genrateToken");

router.get("/", function (req, res) {
    res.send("user page")
})

router.post("/register", async function (req, res) {
    try {
        const { fullName, email, password} = req.body;
        //validation

        // if(!fullName || !email || !password) {
        //     return res.send({error: "All details must be required"});
        // }

        //check if email already exists
        const existingUser = await userModel.findOne({email});
        //existing user
        if(existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Email already exists.',
            })
        }

        //register new user
        const hashedPassword = await hashPassword(password);
    
        const user = await new userModel({
            fullName,
            email,
            password: hashedPassword,
        }).save();
        let token = genrateToken(user);
        res.cookie('token', token);
        res.status(200).json({user, token});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while registering the user.',
            error
        })
    }

})


router.post("/login", async function (req, res) {
    try {
        const { email, password } = req.body;
        //validation
        if(!email ||!password) {
            return res.status(400).send({
                success: false,
                message: 'Email and password are required.'
            })
        }
        //check if user exists
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found.'
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match) {
            return res.status(401).send({
                success: false,
                message: 'Invalid password.'
            })
        }
        //generate token
        const token = genrateToken(user);
        res.cookie('token', token);
        res.status(200).json({user, token});

        
        res.send({
            success: true,
            message: 'User logged in successfully.',
            user: {
                name: user.name,
                email: user.email,
            },
            token
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while logging in.',
            error
        })
    }
});


module.exports = router;