// backend/routes/index.js
const express = require('express');
const signupRouter = require("./signup");

const router = express.Router();

router.use("/signup", signupRouter)

module.exports = router;