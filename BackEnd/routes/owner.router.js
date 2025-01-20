const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const ownerModel = require('./../models/owner.model')

if (process.env.NODE_ENV === 'development') {
    router.post("/create", async function (req, res) {
        let owner = await ownerModel.find();
        if (owner.length > 0) {
            return res.status(401).json({ message: "Owner already exists" });
        }
        let {fullName, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullName,
            email,
            password,
        })
        res.status(201).send(createdOwner);
    })
}

router.get("/", function (req, res) {
    res.send("owner page")
})




module.exports = router;