const express = require("express");

const router = express.Router();

const { signupModelMongo } = require("../../db/models");
const { signinParser } = require("../../db/types");
const { JWT_SECRET } = require("../../config");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const { success } = signinParser.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Please provide inputs in correct format",
        });
    }

    try {
        const user = await signupModelMongo.findOne({
            email: req.body.email,
            password: req.body.password,
        });

        if (user) {
            const token = jwt.sign(
                {
                    userId: user._id,
                },
                JWT_SECRET
            );

            res.status(200).json({
                status: "Signin Success",
                email: req.body.email,
                token: token,
            });
            return;
        }

        res.status(411).json({
            status: "Failed",
            message: "User not found!",
        });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            return res.status(400).json({
                message: "Email already exists",
            });
        } else if (error.name === "ValidationError") {
            // Handle Mongoose validation error
            return res.status(400).json({
                message: error.errors.email.message || "Validation error",
            });
        } else {
            console.log(error);
            return res.status(400).json({
                message:
                    "Something is wrong at our servers, please try after sometime",
            });
        }
    }
});

module.exports = router;
