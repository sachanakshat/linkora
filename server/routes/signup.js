// backend/routes/user.js
const express = require("express");

const router = express.Router();

const { signupModelMongo } = require("../../db/models");
const { signupParser } = require("../../db/types");

router.post("/", async (req, res) => {
  const parsedPayload = signupParser.safeParse(req.body);

  if (!parsedPayload.success) {
    return res.status(411).json({
      message: "Error in parsing the inputs",
    });
  }

  try {
    await signupModelMongo.create({
      email: req.body.email,
      password: req.body.password,
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
      return res.status(400).json({
        message: "Something is wrong at our servers, please try after sometime",
      });
    }
  }

  return res.status(200).json({
    msg: "User created",
    email: req.body.email,
  });
});

module.exports = router;
