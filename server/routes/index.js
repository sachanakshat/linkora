// backend/routes/index.js
const express = require('express');
const signupRouter = require("./signup");
const signinRouter = require("./signin");

const router = express.Router();

router.use("/signup", signupRouter)
router.use("/signin", signinRouter)

module.exports = router;