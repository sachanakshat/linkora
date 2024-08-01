const mongoose = require("mongoose");

// Load environment variables from .env file
require("dotenv").config();

// Access environment variables
// const databaseUrl = process.env.MONGO_URL;
const { DATABASE_URL } = require("../config");

mongoose.connect(DATABASE_URL);

const signupSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email",
        },
        required: [true, "Email required"],
    },
    password: String,
});

const signupModel = mongoose.model("signup", signupSchema);

module.exports = {
    signupModelMongo: signupModel,
};
