const express = require("express");

const router = express.Router();

const { signupModelMongo } = require("../../db/signupsModel");
const { signupParser } = require("../../db/signupsTypes");
const { JWT_SECRET } = require("../../config");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const parsedPayload = signupParser.safeParse(req.body);
  console.log(parsedPayload);

  if (!parsedPayload.success) {
    return res.status(411).json({
      message: "Error in parsing the inputs",
    });
  }

  try {
    const user = await signupModelMongo.create({
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign(
      {
        user,
      },
      JWT_SECRET
    );

    return res.status(200).json({
      msg: "User created",
      email: req.body.email,
      token: token,
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
      console.log(error)
      return res.status(400).json({
        message: "Something is wrong at our servers, please try after sometime",
      });
    }
  }
});

module.exports = router;
